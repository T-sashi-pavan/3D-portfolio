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
    avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    isOnline: true,
    location: "Unknown Location",
    flag: "🏳️",
    lastSeen: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
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

  // Broadcast updated user list
  const broadcastUsers = () => {
    const activeUserArray = Array.from(activeUsers.values());
    console.log(`[WebSocket] Broadcasting users-updated event with ${activeUserArray.length} users`);
    io.emit('users-updated', activeUserArray);
  };
  broadcastUsers();

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

  // Handle profile updates (name/avatar/color changes)
  socket.on('profile-update', (profileData) => {
    const currentUser = activeUsers.get(socket.id);
    if (currentUser) {
      currentUser.name = profileData.name || currentUser.name;
      currentUser.avatar = profileData.avatar || currentUser.avatar;
      currentUser.color = profileData.color || currentUser.color;
      broadcastUsers();
    }
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
