const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Load .env file if present (simple parser so dotenv package isn't required)
const ENV_PATH = path.join(__dirname, '.env');
if (fs.existsSync(ENV_PATH)) {
  try {
    const envRaw = fs.readFileSync(ENV_PATH, 'utf8');
    envRaw.split(/\r?\n/).forEach((line) => {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
      if (!m) return;
      let key = m[1];
      let val = m[2] || '';
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    });
  } catch (e) {
    console.error('Error reading .env file:', e);
  }
}

const app = express();
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Socket server is running! 🚀');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allows connection from local development and deployed portfolio
    methods: ["GET", "POST"]
  }
});

// Simple JSON database for persistence
const DB_PATH = path.join(__dirname, 'db.json');
let db = { messages: [], reactions: {} };

try {
  if (fs.existsSync(DB_PATH)) {
    db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } else {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  }
} catch (err) {
  console.error("Error reading database:", err);
}

const saveDb = () => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error("Error writing to database:", err);
  }
};

// Keep track of active sockets and profiles
const activeUsers = new Map();

// Random adjectives & nouns for default usernames
const ADJECTIVES = ["Speedy", "Clever", "Vibrant", "Creative", "Brave", "Chill", "Swift", "Sharp", "Mighty", "Witty"];
const NOUNS = ["Coder", "Developer", "Creator", "Hacker", "Designer", "Geek", "Techie", "Ninja", "Wizard", "Artist"];
const COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#ef4444", "#14b8a6", "#6366f1"];
const AVATARS = [
  "https://api.dicebear.com/7.x/bottts/svg?seed=Felix",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Jack",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Bozo",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Scooter"
];

const generateRandomUser = (socketId) => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return {
    id: uuidv4(),
    socketId: socketId,
    name: `${adj} ${noun}`,
    // No real email is known until the visitor voluntarily provides one via profile settings.
    email: undefined,
    avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    isOnline: true,
    location: "Unknown Location",
    flag: "🏳️",
    lastSeen: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
};

const EMAIL_RE = /^\S+@\S+\.\S+$/;

// Strips fields non-admin viewers should never see (e.g. a visitor's self-provided email)
const stripSensitive = (u) => {
  const { email, ...rest } = u;
  return rest;
};

// Email notification helper using Resend API
const sendEmailNotification = async (to, subject, html) => {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email] RESEND_API_KEY not configured, skipping email');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: to,
        subject: subject,
        html: html,
      }),
    });

    const data = await response.json();
    if (data.id) {
      console.log(`[Email] Notification sent to ${to}: ${data.id}`);
      return true;
    } else {
      console.error(`[Email] Failed to send: ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    console.error('[Email] Error sending notification:', error.message);
    return false;
  }
};

// Get admin email from env
const getAdminEmail = () => {
  return process.env.ADMIN_EMAIL || 'admin@portfolio.local';
};

// Public URL of the deployed frontend, used in "click to reply" links inside notification emails
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

// Throttle notification emails so a burst of joins/messages sends at most one email per window
const EMAIL_COOLDOWN_MS = Number(process.env.EMAIL_COOLDOWN_MS) || 2 * 60 * 1000; // default 2 minutes
let lastNotificationSentAt = 0;

const canSendNotification = () => {
  const now = Date.now();
  if (now - lastNotificationSentAt < EMAIL_COOLDOWN_MS) {
    console.log('[Email] Skipped — within cooldown window');
    return false;
  }
  lastNotificationSentAt = now;
  return true;
};

io.on('connection', (socket) => {
  console.log(`[WebSocket] New client connected: socketId=${socket.id}`);

  let sessionId = socket.handshake.auth.sessionId;
  
  if (!sessionId) {
    sessionId = uuidv4();
    socket.emit('session', { sessionId });
  }

  // Set up user profile
  let user = generateRandomUser(socket.id);
  // Persist session if user reconnects with same sessionId
  for (const [_, existingUser] of activeUsers.entries()) {
    if (existingUser.id === sessionId) {
      user = { ...existingUser, socketId: socket.id, isOnline: true };
      break;
    }
  }
  
  // Set the user id to match the sessionId so profile editing survives refreshes
  user.id = sessionId;
  activeUsers.set(socket.id, user);

  // Broadcast updated user list. Emails are only ever sent to sockets currently
  // marked as admin — everyone else gets the list with `email` stripped out.
  const broadcastUsers = () => {
    const activeUserArray = Array.from(activeUsers.values());
    console.log(`[WebSocket] Broadcasting users-updated event to ${activeUserArray.length} users`);
    for (const [sockId, viewer] of activeUsers.entries()) {
      const targetSocket = io.sockets.sockets.get(sockId);
      if (!targetSocket) continue;
      const payload = viewer.isAdmin ? activeUserArray : activeUserArray.map(stripSensitive);
      targetSocket.emit('users-updated', payload);
    }
  };
  broadcastUsers();

  // Send email notification to admin when user joins (throttled)
  const adminEmail = getAdminEmail();
  if (canSendNotification()) {
    const newUserHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
        <h2 style="color: #333;">🎉 New User Connected!</h2>
        <p style="color: #666; font-size: 14px;">A new visitor just joined your portfolio chat:</p>
        <div style="background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email || 'Not provided'}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Total Online:</strong> ${Array.from(activeUsers.values()).length}</p>
        </div>
        <p style="color: #999; font-size: 12px;">Check your admin panel to chat with them!</p>
      </div>
    `;
    sendEmailNotification(adminEmail, `🎉 New User Connected: ${user.name}`, newUserHtml);
  }


  // Send initial chat history and reactions
  socket.on('msgs-fetch-init', () => {
    socket.emit('msgs-receive-init', db.messages.slice(-50)); // Last 50 messages
    socket.emit('reactions-init', db.reactions);
  });

  // Fetch older messages (history pagination)
  socket.on('msgs-fetch-history', (data) => {
    const beforeId = data.before;
    const index = db.messages.findIndex(m => Number(m.id) === Number(beforeId));
    let history = [];
    let hasMore = false;
    if (index > 0) {
      history = db.messages.slice(Math.max(0, index - 30), index);
      hasMore = index - 30 > 0;
    }
    socket.emit('msgs-receive-history', { messages: history, hasMore, reactions: db.reactions });
  });

  // Handle incoming chat messages
  socket.on('msg-send', (data) => {
    const newMessage = {
      id: String(Date.now()),
      sessionId: sessionId,
      flag: user.flag,
      country: user.location,
      username: user.name,
      avatar: user.avatar,
      color: user.color,
      email: user.email,
      content: data.content,
      createdAt: new Date().toISOString(),
      replyTo: data.replyTo || undefined
    };

    db.messages.push(newMessage);
    // Keep DB size reasonable (limit to last 500 messages)
    if (db.messages.length > 500) {
      db.messages.shift();
    }
    saveDb();
    io.emit('msg-receive', newMessage);

    // Send email notification to admin about new message (throttled)
    if (canSendNotification()) {
      const adminEmail = getAdminEmail();
      const messageHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #333;">💬 New Message in Live Chat!</h2>
          <div style="background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0;">
            <p><strong>From:</strong> ${user.name}${user.email ? ` (${user.email})` : ''}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #f0f0f0; padding: 10px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${data.content}
            </p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #999; font-size: 12px;">
            <a href="${SITE_URL}" style="color: #007bff; text-decoration: none;">Click here to reply in your chat</a>
          </p>
        </div>
      `;
      sendEmailNotification(adminEmail, `💬 New Message from ${user.name}`, messageHtml);
    }
  });

  // Handle message updates/edits
  socket.on('msg-update', (data) => {
    const msg = db.messages.find(m => String(m.id) === String(data.id));
    if (msg && msg.sessionId === sessionId) {
      msg.content = data.content;
      msg.editedAt = new Date().toISOString();
      saveDb();
      io.emit('msg-update', { id: data.id, content: data.content, editedAt: msg.editedAt });
    }
  });

  // Handle message deletion
  socket.on('msg-delete', (data) => {
    const index = db.messages.findIndex(m => String(m.id) === String(data.id));
    if (index !== -1 && db.messages[index].sessionId === sessionId) {
      db.messages.splice(index, 1);
      saveDb();
      io.emit('msg-delete', { id: data.id });
    }
  });

  // Log /admin command requests for debugging
  socket.on('admin-auth-requested', () => {
    const currentUser = activeUsers.get(socket.id);
    console.log(`[Admin] /admin command detected for ${currentUser?.name || 'unknown user'} (${socket.id})`);
    console.log('[Admin] Waiting for password...');
  });

  // Handle live cursor updates
  socket.on('cursor-changed', (pos) => {
    socket.broadcast.emit('cursor-changed', { pos, socketId: socket.id });
  });

  // Handle profile updates (name/avatar/color/email changes).
  // NOTE: the frontend emits "update-user" (not "profile-update") with a
  // "username" field (not "name") — this listener matches that shape.
  socket.on('update-user', (profileData) => {
    const currentUser = activeUsers.get(socket.id);
    if (!currentUser) return;

    currentUser.name = profileData.username || currentUser.name;
    currentUser.avatar = profileData.avatar || currentUser.avatar;
    currentUser.color = profileData.color || currentUser.color;

    if (profileData.email !== undefined) {
      const trimmed = String(profileData.email).trim();
      if (!trimmed) {
        currentUser.email = undefined;
      } else if (EMAIL_RE.test(trimmed)) {
        currentUser.email = trimmed;
      } else {
        socket.emit('warning', { message: 'update-user: ignored invalid email format' });
      }
    }

    broadcastUsers();
  });

  // Handle reactions toggling
  socket.on('reaction-toggle', (data) => {
    const { messageId, emoji } = data;
    if (!db.reactions[messageId]) {
      db.reactions[messageId] = [];
    }
    
    let reactions = db.reactions[messageId];
    let reaction = reactions.find(r => r.emoji === emoji);
    
    if (reaction) {
      const idx = reaction.sessionIds.indexOf(sessionId);
      if (idx !== -1) {
        reaction.sessionIds.splice(idx, 1); // remove reaction
      } else {
        reaction.sessionIds.push(sessionId); // add reaction
      }
    } else {
      reactions.push({ emoji, sessionIds: [sessionId] });
    }

    // Clean up empty reaction types
    db.reactions[messageId] = reactions.filter(r => r.sessionIds.length > 0);
    if (db.reactions[messageId].length === 0) {
      delete db.reactions[messageId];
    }
    
    saveDb();
    io.emit('reaction-update', { messageId, reactions: db.reactions[messageId] || [] });
  });

  // Admin authentication: mark the current user as admin and broadcast update
  socket.on('admin-auth', (data) => {
    try {
      const password = data && data.password ? data.password : undefined;
      const expected = process.env.ADMIN_PASSWORD || 'letmein';
      const currentUser = activeUsers.get(socket.id);
      const username = currentUser?.name || 'unknown user';
      
      console.log('[Admin] Password received');
      console.log('[Admin] Authenticating...');

      if (!password) {
        console.warn(`[Admin] Authentication FAILED for ${username} (${socket.id}) — no password provided.`);
        socket.emit('admin-auth-result', { success: false, reason: 'no password provided' });
        return;
      }

      if (password === expected) {
        if (currentUser) {
          currentUser.isAdmin = true;
        }

        console.log(`[Admin] Password verified successfully for ${username} (${socket.id}).`);
        console.log('[Admin] Authentication SUCCESS');

        let activeUserArray = [];
        try {
          activeUserArray = Array.from(activeUsers.values());
          console.log(`[Admin] Fetching active users... Retrieved ${activeUserArray.length} users.`);
        } catch (userFetchError) {
          console.error('[ERROR] Failed to fetch active users', userFetchError);
          socket.emit('admin-auth-result', { success: false });
          return;
        }

        try {
          socket.emit('admin-auth-result', { success: true });
          socket.emit('admin-users', { authenticated: true, users: activeUserArray });
          socket.emit('adminUsers', { authenticated: true, users: activeUserArray });
          console.log('[Admin] Sending user list...');
          console.log('[WebSocket] User list emitted successfully');
        } catch (emitError) {
          console.error('[ERROR] Failed to emit admin user list', emitError);
        }

        try {
          broadcastUsers();
          console.log('[Admin] Broadcasted users-updated event to all clients');
        } catch (broadcastError) {
          console.error('[ERROR] Failed to broadcast users-updated event', broadcastError);
        }
      } else {
        console.warn(`[Admin] Authentication FAILED for ${username} (${socket.id}) — invalid password.`);
        socket.emit('admin-auth-result', { success: false, reason: 'invalid password' });
      }
    } catch (err) {
      console.error('[ERROR] Admin authentication failed with exception:', err);
      socket.emit('admin-auth-result', { success: false });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`[WebSocket] Client disconnected: socketId=${socket.id}`);
    activeUsers.delete(socket.id);
    broadcastUsers();
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server is listening on port ${PORT} 🚀`);
});
