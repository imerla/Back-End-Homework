import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SocketProvider } from './context/SocketContext';
import { Lobby } from './components/Lobby';
import { Room } from './components/Room';
import { RoomJoinedPayload } from './shared/types';

type ViewState = 'lobby' | 'room';

function App() {
  const [view, setView] = useState<ViewState>('lobby');
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  const [initialUsers, setInitialUsers] = useState<string[]>([]);

  const handleJoinRoom = (payload: RoomJoinedPayload, user: string) => {
    setRoomCode(payload.code);
    setUsername(user);
    setInitialUsers(payload.users);
    setView('room');
  };

  const handleLeaveRoom = () => {
    setRoomCode('');
    setUsername('');
    setInitialUsers([]);
    setView('lobby');
  };

  return (
    <SocketProvider>
      <AnimatePresence mode="wait">
        {view === 'lobby' ? (
          <Lobby key="lobby" onJoinRoom={handleJoinRoom} />
        ) : (
          <Room key="room" roomCode={roomCode} username={username} onLeave={handleLeaveRoom} initialUsers={initialUsers} />
        )}
      </AnimatePresence>
    </SocketProvider>
  );
}

export default App;
