# 🔌 Realtime WebSocket Server

This is a simple, lightweight Socket.IO server designed to support the realtime features of your 3D Portfolio.

## 🚀 Features Enabled
* 👥 **Online presence** - live user count in the header (e.g. "4 people here")
* 💬 **Live Chat** - user chat with replies, edits, reactions, and messages database
* 🖱️ **Live cursors** - see cursors of other online users in real-time

---

## 🛠️ Deployment on Render

You can deploy this server to Render as a **Web Service** in 1 minute:

1. **Create a new GitHub Repository** named `portfolio-websocket-server`.
2. **Upload/commit** these two files into it:
   * `package.json`
   * `server.js`
3. **Log into Render** (render.com).
4. Click **New +** -> **Web Service**.
5. Connect your new `portfolio-websocket-server` repository.
6. Use the following configuration settings:
   * **Name:** `portfolio-websocket-server`
   * **Language:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `npm run start`
   * **Instance Type:** `Free` ($0/month)
7. Click **Create Web Service**.
8. Once deployed, copy your Web Service URL (e.g., `https://portfolio-websocket-server-xxxx.onrender.com`).
9. Go to your **frontend** Render settings and add:
   * **Key:** `NEXT_PUBLIC_WS_URL`
   * **Value:** `https://portfolio-websocket-server-xxxx.onrender.com`
10. **Redeploy your frontend** portfolio to activate the features!
