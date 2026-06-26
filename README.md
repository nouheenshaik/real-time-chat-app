# Real-Time Chat App

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

A full-stack real-time chat application where users can register, log in, and exchange messages instantly. Built to demonstrate WebSocket communication, JWT-based authentication, and secure password handling.

---

## Live Demo

> Open `client/index.html` in two browser tabs to see real-time messaging in action.

---

## Features

- User registration and login with form validation
- Passwords hashed using bcryptjs before storing in MongoDB
- JWT tokens issued on login and verified on every WebSocket connection
- Real-time messaging powered by Socket.IO
- Live join and leave notifications for all connected users
- Auto-login if a valid token exists in localStorage
- Clean, responsive single-page frontend — no frameworks needed

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Node.js | Server-side JavaScript |
| Framework | Express.js | REST API routing |
| Real-time | Socket.IO | WebSocket communication |
| Database | MongoDB + Mongoose | Storing users |
| Auth | JSON Web Tokens | Secure session management |
| Security | bcryptjs | Password hashing |
| Frontend | HTML, CSS, Vanilla JS | Client interface |

---

## Project Structure
realtime-chat-app/

├── server/

│   ├── index.js          # Express server + Socket.IO setup + JWT middleware

│   ├── authRoutes.js     # /auth/register and /auth/login endpoints

│   ├── User.js           # Mongoose schema with pre-save password hashing

│   ├── package.json      # Dependencies

│   └── .env.example      # Environment variable template

├── client/

│   └── index.html        # Complete frontend — auth forms + chat UI

├── .gitignore

└── README.md
---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) running locally

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/realtime-chat-app.git
cd realtime-chat-app

# Install backend dependencies
cd server
npm install

# Set up environment variables
cp .env.example .env
```

Open `.env` and fill in your values:

```env
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

### Running the App

```bash
# Terminal 1 — start MongoDB
mongod

# Terminal 2 — start the server
cd server
node index.js
```

Then open `client/index.html` in your browser. Open a second tab and register a different user to test live messaging between two users.

---

## How Authentication Works

1. User registers via `POST /auth/register` — password is hashed with bcryptjs and saved to MongoDB
2. User logs in via `POST /auth/login` — server verifies password and returns a signed JWT
3. Client stores the JWT in localStorage and passes it when connecting to Socket.IO
4. Server's `io.use()` middleware verifies the JWT on every WebSocket handshake — unauthenticated connections are rejected
5. Once verified, the user's identity is attached to the socket and used for all messages

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive a JWT token |

---

## Socket.IO Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `sendMessage` | Client → Server | User sends a chat message |
| `message` | Server → All clients | Broadcast a message or notification |

---

## What I Learned

- How to protect WebSocket connections using JWT middleware in Socket.IO
- Implementing secure password storage with salted hashing
- Managing real-time state across multiple connected clients
- Structuring a full-stack Node.js project cleanly for maintainability

---

## Future Improvements

- [ ] Private/direct messaging between users
- [ ] Multiple chat rooms
- [ ] Message history stored in MongoDB
- [ ] Online user list displayed in the sidebar
- [ ] Deploy backend to Render and frontend to Vercel

---

## License

MIT ©nouheen_shaik
