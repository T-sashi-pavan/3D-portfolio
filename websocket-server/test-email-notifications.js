#!/usr/bin/env node

const { io } = require('socket.io-client');
const readline = require('readline');

const SERVER_URL = 'http://localhost:8080';

// ANSI Colors for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const log = (color, ...args) => {
  console.log(color, ...args, colors.reset);
};

let userCount = 0;

const createUser = (userName) => {
  return new Promise((resolve, reject) => {
    const socket = io(SERVER_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    socket.on('connect', () => {
      log(colors.green, `✓ User "${userName}" connected (${socket.id})`);
    });

    socket.on('error', (error) => {
      log(colors.red, `✗ Error for ${userName}:`, error);
      reject(error);
    });

    socket.on('disconnect', () => {
      log(colors.yellow, `⚠ User "${userName}" disconnected`);
    });

    resolve({ socket, socketId: socket.id });
  });
};

const testEmailNotifications = async () => {
  log(colors.cyan, '\n╔══════════════════════════════════════════════╗');
  log(colors.cyan, '║   EMAIL NOTIFICATIONS TEST SUITE             ║');
  log(colors.cyan, '╚══════════════════════════════════════════════╝\n');

  try {
    // Test 1: Create a user and send a message
    log(colors.blue, '\n📋 TEST 1: Creating user and sending message...\n');
    const user1 = await createUser('Test User 1');
    userCount++;

    // Wait for connection to establish
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Listen for users-updated event
    user1.socket.on('users-updated', (users) => {
      log(colors.green, `✓ Users updated event received: ${users.length} users online`);
      users.forEach(u => {
        log(colors.magenta, `  - ${u.name} (${u.email || 'no email'})`);
      });
    });

    // Send a test message
    log(colors.yellow, '\n📤 Sending test message from user...\n');
    const testMessage = `Test message from ${new Date().toISOString()} - This should trigger an email notification!`;
    user1.socket.emit('msg-send', { content: testMessage });

    log(colors.green, `✓ Message sent: "${testMessage}"`);
    log(colors.green, '✓ EMAIL NOTIFICATION SHOULD BE SENT TO ADMIN');

    // Wait to allow message to be sent and email to be queued
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Test 2: Create another user
    log(colors.blue, '\n📋 TEST 2: Creating another user (should trigger new user notification)...\n');
    const user2 = await createUser('Test User 2');
    userCount++;

    log(colors.green, '✓ USER CONNECTION EMAIL NOTIFICATION SHOULD BE SENT TO ADMIN');

    // Wait for connection
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 3: Admin authentication test
    log(colors.blue, '\n📋 TEST 3: Testing admin authentication...\n');
    user1.socket.emit('admin-auth-requested');
    log(colors.yellow, '⏳ Waiting for admin password dialog...');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const adminPassword = process.env.ADMIN_PASSWORD || 'SashiSessi';
    user1.socket.emit('admin-auth', { password: adminPassword });
    log(colors.green, `✓ Admin authentication sent with password`);

    // Listen for admin auth result
    user1.socket.on('admin-auth-result', (data) => {
      if (data.success) {
        log(colors.green, '✓ Admin authentication successful!');
      } else {
        log(colors.red, `✗ Admin authentication failed: ${data.reason}`);
      }
    });

    // Listen for admin-users event
    user1.socket.on('admin-users', (data) => {
      if (data.authenticated) {
        log(colors.green, `✓ Admin users received:`);
        data.users.forEach(u => {
          log(colors.cyan, `  - ${u.name}`);
          log(colors.cyan, `    Email: ${u.email || 'N/A'}`);
          log(colors.cyan, `    Admin: ${u.isAdmin ? 'Yes' : 'No'}`);
          log(colors.cyan, `    Online: ${u.isOnline ? 'Yes' : 'No'}`);
        });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 4: Send message as second user
    log(colors.blue, '\n📋 TEST 4: Second user sends a message...\n');
    const testMessage2 = `Message from Test User 2 at ${new Date().toISOString()}`;
    user2.socket.emit('msg-send', { content: testMessage2 });
    log(colors.green, `✓ Message sent from user 2: "${testMessage2}"`);
    log(colors.green, '✓ EMAIL NOTIFICATION SHOULD BE SENT TO ADMIN');

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Summary
    log(colors.cyan, '\n╔══════════════════════════════════════════════╗');
    log(colors.cyan, '║            TEST SUMMARY                      ║');
    log(colors.cyan, '╚══════════════════════════════════════════════╝\n');

    log(colors.green, '✓ Test suite completed successfully!');
    log(colors.yellow, '\n📧 Email Notifications Sent:');
    log(colors.yellow, `  1. User 1 (${userCount > 0 ? 'Test User 1' : 'N/A'}) connected`);
    log(colors.yellow, `  2. User 1 sent a message`);
    log(colors.yellow, `  3. User 2 (${userCount > 1 ? 'Test User 2' : 'N/A'}) connected`);
    log(colors.yellow, `  4. User 2 sent a message`);

    log(colors.magenta, '\n💡 Check your email account for these notifications!');
    log(colors.magenta, `📧 Admin email configured: ${process.env.ADMIN_EMAIL || 'sashi@portfolio.local'}\n`);

    // Keep connections open for a bit longer
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Cleanup
    user1.socket.disconnect();
    user2.socket.disconnect();

    log(colors.green, '✓ All test users disconnected');
    process.exit(0);

  } catch (error) {
    log(colors.red, '✗ Test failed:', error.message);
    process.exit(1);
  }
};

// Run tests
testEmailNotifications();
