# Real-time Room-based Chat Application

A modern real-time chat application built with NestJS backend and React frontend, featuring room-based messaging with join codes, typing indicators, and smooth animations.

## Features

- **Room-based Chat**: Create rooms with unique 6-character codes or join existing rooms
- **Real-time Messaging**: Instant message delivery using Socket.IO
- **Typing Indicators**: See when others are typing with animated dots (excludes self)
- **Fresh Start**: New users only see messages sent after they join (no history)
- **Responsive Design**: Modern UI with dark mode support
- **Smooth Animations**: Powered by Framer Motion
- **Auto-scroll**: Automatically scrolls to new messages (unless scrolled up)

## Tech Stack

### Backend
- NestJS with TypeScript
- Socket.IO with @nestjs/websockets
- class-validator for DTO validation
- In-memory storage (Map-based, structured for Redis migration)

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Motion for animations
- socket.io-client

## Project Structure

```
Lec40/
├── backend/
│   ├── src/
│   │   ├── shared/
│   │   │   └── types.ts          # Shared type definitions
│   │   ├── rooms/
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   ├── rooms.gateway.ts  # Socket.IO gateway
│   │   │   ├── rooms.service.ts  # Business logic
│   │   │   └── rooms.service.spec.ts  # Unit tests
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env                      # Environment variables
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── shared/
│   │   │   └── types.ts          # Shared type definitions
│   │   ├── context/
│   │   │   └── SocketContext.tsx  # Socket connection management
│   │   ├── hooks/
│   │   │   └── useTyping.ts      # Typing indicator hook
│   │   ├── components/
│   │   │   ├── Lobby.tsx         # Room creation/join screen
│   │   │   └── Room.tsx          # Chat room interface
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional):
```bash
# The .env file is already configured with defaults
# PORT=3001
# CORS_ORIGIN=http://localhost:5173
```

4. Run the backend in development mode:
```bash
npm run start:dev
```

The backend will start on `http://localhost:3001`

5. Run tests (optional):
```bash
npm run test
```

### Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the frontend in development mode:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Running the Application

1. Start the backend server (from `backend/` directory):
```bash
npm run start:dev
```

2. Start the frontend server (from `frontend/` directory):
```bash
npm run dev
```

3. Open `http://localhost:5173` in your browser

## Usage

1. **Create a Room**:
   - Enter a username (2-20 characters)
   - Click "Create Room"
   - Share the 6-character room code with others

2. **Join a Room**:
   - Enter a username
   - Enter the 6-character room code
   - Click "Join Room"

3. **Chat**:
   - Type messages and press Enter or click Send
   - See typing indicators when others are typing
   - Messages are limited to 500 characters

4. **Leave a Room**:
   - Click the "Leave" button in the room header

## Socket Events

### Client → Server
- `room:create` - Create a new room
- `room:join` - Join an existing room
- `room:leave` - Leave the current room
- `message:send` - Send a message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator

### Server → Client
- `room:joined` - Successfully joined a room
- `room:user-joined` - Another user joined
- `room:user-left` - Another user left
- `message:new` - New message received
- `typing:update` - Typing indicator update
- `error` - Error notification

## Validation Rules

- **Username**: 2-20 characters, trimmed
- **Room Code**: 6 uppercase alphanumeric characters (excludes 0, O, 1, I)
- **Message**: 1-500 characters, trimmed

## Next Steps / Possible Enhancements

1. **Redis Integration**: Replace in-memory Map with Redis for persistent room state across multiple server instances
2. **Authentication**: Add user authentication with JWT or session-based auth
3. **Persistent History**: Store message history in a database (PostgreSQL, MongoDB)
4. **Private Messaging**: Add direct messaging between users
5. **File Sharing**: Enable image/file uploads in chat
6. **Room Persistence**: Keep rooms active even when empty (with expiration)
7. **User Profiles**: Add avatars and user profiles
8. **Message Reactions**: Add emoji reactions to messages
9. **Search**: Search through message history
10. **Rate Limiting**: Implement rate limiting for message sending
11. **Moderation**: Add moderation tools (kick, ban, mute)
12. **Mobile App**: Build React Native or PWA version

## Environment Variables

### Backend (.env)
```
PORT=3001                    # Server port
CORS_ORIGIN=http://localhost:5173  # Frontend URL for CORS
```

## Development Notes

- The backend uses in-memory storage (Map) for rooms. Rooms are deleted when empty.
- Typing indicators auto-clear after 3 seconds of inactivity on the server with real timers.
- Typing indicators are broadcast per-socket (users don't see themselves as typing).
- Message history is limited to the last 50 messages per room (for in-memory tracking).
- New users joining a room do NOT receive message history - they only see messages sent after joining.
- The code is structured to easily swap the in-memory storage for Redis.
- TypeScript types are shared between frontend and backend via `src/shared/types.ts` in each project.

## License

MIT
