// Shared types between frontend and backend

export interface CreateRoomPayload {
  username: string;
}

export interface CreateRoomResponse {
  code: string;
}

export interface JoinRoomPayload {
  code: string;
  username: string;
}

export interface RoomJoinedPayload {
  code: string;
  users: string[];
}

export interface UserEventPayload {
  username: string;
}

export interface SendMessagePayload {
  text: string;
}

export interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: number;
}

export interface TypingUpdatePayload {
  users: string[];
}

export interface ErrorPayload {
  message: string;
}

// Socket event names
export const SocketEvents = {
  // Client -> Server
  ROOM_CREATE: 'room:create',
  ROOM_JOIN: 'room:join',
  ROOM_LEAVE: 'room:leave',
  MESSAGE_SEND: 'message:send',
  TYPING_START: 'typing:start',
  TYPING_STOP: 'typing:stop',

  // Server -> Client
  ROOM_JOINED: 'room:joined',
  ROOM_USER_JOINED: 'room:user-joined',
  ROOM_USER_LEFT: 'room:user-left',
  MESSAGE_NEW: 'message:new',
  TYPING_UPDATE: 'typing:update',
  ERROR: 'error',
} as const;
