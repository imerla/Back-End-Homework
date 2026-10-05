import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';
import { SocketEvents, RoomJoinedPayload } from '../shared/types';

interface LobbyProps {
  onJoinRoom: (payload: RoomJoinedPayload, username: string) => void;
}

export const Lobby: React.FC<LobbyProps> = ({ onJoinRoom }) => {
  const { socket } = useSocket();
  const [username, setUsername] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || username.length < 2 || username.length > 20) {
      setError('Username must be 2-20 characters');
      return;
    }

    setError('');
    setIsJoining(true);

    const handleJoined = (data: RoomJoinedPayload) => {
      onJoinRoom(data, username.trim());
    };

    const handleError = (data: { message: string }) => {
      setError(data.message);
      setIsJoining(false);
    };

    socket?.once(SocketEvents.ROOM_JOINED, handleJoined);
    socket?.once(SocketEvents.ERROR, handleError);

    socket?.emit(SocketEvents.ROOM_CREATE, { username: username.trim() });
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || username.length < 2 || username.length > 20) {
      setError('Username must be 2-20 characters');
      return;
    }
    if (!joinCode.trim() || joinCode.length !== 6) {
      setError('Room code must be 6 characters');
      return;
    }

    setError('');
    setIsJoining(true);

    const handleJoined = (data: RoomJoinedPayload) => {
      onJoinRoom(data, username.trim());
    };

    const handleError = (data: { message: string }) => {
      setError(data.message);
      setIsJoining(false);
    };

    socket?.once(SocketEvents.ROOM_JOINED, handleJoined);
    socket?.once(SocketEvents.ERROR, handleError);

    socket?.emit(SocketEvents.ROOM_JOIN, {
      code: joinCode.toUpperCase().trim(),
      username: username.trim(),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-white mb-6 text-center"
        >
          Chat Room
        </motion.h1>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              maxLength={20}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateRoom}
            disabled={isJoining}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isJoining ? 'Creating...' : 'Create Room'}
          </motion.button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">or</span>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Room Code
            </label>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter 6-character code"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase"
              maxLength={6}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleJoinRoom}
            disabled={isJoining}
            className="w-full py-3 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isJoining ? 'Joining...' : 'Join Room'}
          </motion.button>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
