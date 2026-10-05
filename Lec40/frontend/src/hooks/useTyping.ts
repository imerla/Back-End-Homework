import { useEffect, useRef } from 'react';
import { SocketEvents } from '../shared/types';

export const useTyping = (socket: any) => {
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartbeatTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasSentTypingStart = useRef(false);
  const lastTypingStartRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      stopTyping();
    };
  }, [socket]);

  const onInputChange = (value: string) => {
    if (!value) {
      stopTyping();
      return;
    }

    const now = Date.now();
    const HEARTBEAT_INTERVAL = 2000;
    const INACTIVITY_TIMEOUT = 1500;

    // Emit typing:start if not sent yet or heartbeat interval passed
    if (!hasSentTypingStart.current || now - lastTypingStartRef.current > HEARTBEAT_INTERVAL) {
      socket?.emit(SocketEvents.TYPING_START);
      hasSentTypingStart.current = true;
      lastTypingStartRef.current = now;
    }

    // Reset inactivity timer
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, INACTIVITY_TIMEOUT);
  };

  const stopTyping = () => {
    if (hasSentTypingStart.current) {
      socket?.emit(SocketEvents.TYPING_STOP);
      hasSentTypingStart.current = false;
      lastTypingStartRef.current = 0;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (heartbeatTimeoutRef.current) {
      clearTimeout(heartbeatTimeoutRef.current);
      heartbeatTimeoutRef.current = null;
    }
  };

  return { onInputChange, stopTyping };
};
