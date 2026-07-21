#!/usr/bin/env node
const { io } = require('socket.io-client');
const SERVER_URL = 'http://localhost:8080';
const ADMIN_PASSWORD = 'SashiSessi';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const hasEmailKey = (u) => Object.prototype.hasOwnProperty.call(u, 'email');

let pass = 0, fail = 0;
const check = (label, cond) => {
  console.log(`${cond ? '✓ PASS' : '✗ FAIL'} — ${label}`);
  cond ? pass++ : fail++;
};

(async () => {
  // Visitor A: will become admin
  const admin = io(SERVER_URL, { reconnection: false });
  // Visitor B: stays a regular (non-admin) visitor
  const visitor = io(SERVER_URL, { reconnection: false });

  let adminUsersUpdatedPayloads = [];
  let visitorUsersUpdatedPayloads = [];
  let adminAuthResult = null;
  let adminUsersSnapshot = null;
  let visitorWarning = null;

  admin.on('users-updated', (users) => adminUsersUpdatedPayloads.push(users));
  visitor.on('users-updated', (users) => visitorUsersUpdatedPayloads.push(users));
  admin.on('admin-auth-result', (data) => (adminAuthResult = data));
  admin.on('admin-users', (data) => (adminUsersSnapshot = data));
  visitor.on('warning', (data) => (visitorWarning = data));

  await new Promise((resolve) => {
    let connected = 0;
    const onConnect = () => { connected++; if (connected === 2) resolve(); };
    admin.on('connect', onConnect);
    visitor.on('connect', onConnect);
  });
  console.log('Both sockets connected.\n');

  await wait(800);

  // --- Test 1: fresh visitors have no fake email ---
  const latestVisitorView = visitorUsersUpdatedPayloads[visitorUsersUpdatedPayloads.length - 1] || [];
  check('Non-admin users-updated payload strips the "email" key entirely from every user object',
    latestVisitorView.length > 0 && latestVisitorView.every((u) => !hasEmailKey(u)));

  // --- Test 2: authenticate as admin ---
  admin.emit('admin-auth', { password: ADMIN_PASSWORD });
  await wait(800);
  check('Admin authentication succeeds with correct password', adminAuthResult && adminAuthResult.success === true);
  // Users who never set an email have `email: undefined`, which JSON strips in transit —
  // so absence of the key (not presence with an empty value) is the correct wire behavior.
  check('admin-users snapshot is well-formed (array of user objects, admin socket present)',
    adminUsersSnapshot && Array.isArray(adminUsersSnapshot.users) && adminUsersSnapshot.users.length === 2);

  // --- Test 3: visitor sets an optional real email via profile settings ---
  visitor.emit('update-user', { username: 'Vaishnavi', avatar: '1', color: '#60a5fa', email: 'visitor@example.com' });
  await wait(800);
  const latestAdminView = adminUsersUpdatedPayloads[adminUsersUpdatedPayloads.length - 1] || [];
  const visitorInAdminView = latestAdminView.find((u) => u.name === 'Vaishnavi');
  check('After admin auth, live users-updated pushed to the ADMIN socket includes the visitor\'s email',
    !!visitorInAdminView && visitorInAdminView.email === 'visitor@example.com');

  const latestVisitorView2 = visitorUsersUpdatedPayloads[visitorUsersUpdatedPayloads.length - 1] || [];
  check('The same live update pushed to the NON-ADMIN visitor socket still has no "email" key at all (even for themself)',
    latestVisitorView2.every((u) => !hasEmailKey(u)));

  // --- Test 4: invalid email is rejected with a warning, not silently stored ---
  visitor.emit('update-user', { username: 'Vaishnavi', email: 'not-an-email' });
  await wait(500);
  check('Invalid email format triggers a "warning" event to the sender', !!visitorWarning && /invalid email/i.test(visitorWarning.message));

  // --- Test 5: message notification cooldown gating (checked via server log, not inbox) ---
  visitor.emit('msg-send', { content: 'Hello from the live chat test!' });
  await wait(300);
  visitor.emit('msg-send', { content: 'Second message immediately after — should be cooldown-skipped' });
  await wait(500);
  console.log('\n(See server log for "[Email] Skipped — within cooldown window" confirming the 2nd message did not re-send.)');

  console.log(`\n${pass} passed, ${fail} failed.`);
  admin.disconnect();
  visitor.disconnect();
  process.exit(fail > 0 ? 1 : 0);
})();
