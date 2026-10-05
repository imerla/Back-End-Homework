import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';
import { useTyping } from '../hooks/useTyping';
import { SocketEvents, Message } from '../shared/types';

interface RoomProps {
  roomCode: string;
  username: string;
  onLeave: () => void;
  initialUsers?: string[];
}

export const Room: React.FC<RoomProps> = ({ roomCode, username, onLeave, initialUsers = [] }) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>(initialUsers);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [messageText, setMessageText] = useState('');
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  const { onInputChange, stopTyping } = useTyping(socket);

  useEffect(() => {
    socket?.on(SocketEvents.ROOM_JOINED, (data: { code: string; users: string[]; history: Message[] }) => {
      setUsers(data.users);
      setMessages(data.history);
    });

    socket?.on(SocketEvents.ROOM_USER_JOINED, (data: { username: string }) => {
      setUsers((prev) => [...prev, data.username]);
    });

    socket?.on(SocketEvents.ROOM_USER_LEFT, (data: { username: string }) => {
      setUsers((prev) => prev.filter((u) => u !== data.username));
    });

    socket?.on(SocketEvents.MESSAGE_NEW, (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket?.on(SocketEvents.TYPING_UPDATE, (data: { users: string[] }) => {
      setTypingUsers(data.users);
    });

    return () => {
      socket?.off(SocketEvents.ROOM_USER_JOINED);
      socket?.off(SocketEvents.ROOM_USER_LEFT);
      socket?.off(SocketEvents.MESSAGE_NEW);
      socket?.off(SocketEvents.TYPING_UPDATE);
    };
  }, [socket]);

  useEffect(() => {
    if (!isScrolledUp && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isScrolledUp]);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setIsScrolledUp(!isAtBottom);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || messageText.trim().length > 500) return;

    stopTyping();
    socket?.emit(SocketEvents.MESSAGE_SEND, { text: messageText.trim() });
    setMessageText('');
  };

  const handleLeave = () => {
    socket?.emit(SocketEvents.ROOM_LEAVE);
    onLeave();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTypingText = () => {
    if (typingUsers.length === 0) return null;
    if (typingUsers.length === 1) return `${typingUsers[0]} is typing...`;
    if (typingUsers.length === 2) return `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
    return 'Several people are typing...';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-white font-semibold">Room: {roomCode}</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyCode}
              className="text-slate-400 text-sm hover:text-white transition"
            >
              {copied ? (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-green-400"
                >
                  Copied!
                </motion.span>
              ) : (
                'Click to copy'
              )}
            </motion.button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLeave}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-medium"
        >
          Leave
        </motion.button>
      </motion.header>

      <div className="flex-1 flex overflow-hidden">
        {/* Participants Sidebar */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-slate-800 border-r border-slate-700 p-4 hidden md:block"
        >
          <h3 className="text-slate-300 font-semibold mb-3">Participants ({users.length})</h3>
          <div className="space-y-2">
            <AnimatePresence>
              {users.map((user) => (
                <motion.div
                  key={user}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  layout
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    user === username ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-slate-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                    {user[0].toUpperCase()}
                  </div>
                  <span className={`text-sm ${user === username ? 'text-blue-400' : 'text-slate-300'}`}>
                    {user} {user === username && '(you)'}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.aside>

        {/* Messages Area */}
        <main className="flex-1 flex flex-col">
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className={`flex ${message.username === username ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
                      message.username === username
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-slate-700 text-slate-100 rounded-bl-md'
                    }`}
                  >
                    {message.username !== username && (
                      <p className="text-xs text-slate-400 mb-1">{message.username}</p>
                    )}
                    <p className="break-words">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.username === username ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Typing Indicator */}
          <AnimatePresence>
            {typingUsers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="px-4 py-2"
              >
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="w-2 h-2 bg-slate-400 rounded-full"
                      />
                    ))}
                  </div>
                  <span>{getTypingText()}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value);
                  onInputChange(e.target.value);
                }}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                maxLength={500}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!messageText.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
              >
                Send
              </motion.button>
            </div>
            <p className="text-slate-500 text-xs mt-1 text-right">
              {messageText.length}/500
            </p>
          </form>
        </main>
      </div>
    </div>
  );
};
