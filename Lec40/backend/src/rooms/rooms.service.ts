import { Injectable } from '@nestjs/common';
import { Message } from '../shared/types';

export interface Room {
  code: string;
  users: Map<string, string>; // socketId -> username
  messages: Message[];
  typingUsers: Map<string, number>; // socketId -> lastTypingTimestamp
  typingTimers: Map<string, ReturnType<typeof setTimeout>>; // socketId -> timer
}

@Injectable()
export class RoomsService {
  private rooms: Map<string, Room> = new Map();
  private readonly MAX_MESSAGES = 50;
  private readonly TYPING_TIMEOUT = 3000; // 3 seconds
  private onTypingExpired: ((roomCode: string, socketId: string) => void) | null = null;

  registerTypingExpiredCallback(callback: (roomCode: string, socketId: string) => void) {
    this.onTypingExpired = callback;
  }

  // Characters to use for room codes (excluding ambiguous 0, O, 1, I)
  private readonly CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  private readonly CODE_LENGTH = 6;

  generateRoomCode(): string {
    let code: string;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      code = '';
      for (let i = 0; i < this.CODE_LENGTH; i++) {
        const randomIndex = Math.floor(Math.random() * this.CODE_CHARS.length);
        code += this.CODE_CHARS[randomIndex];
      }
      attempts++;
    } while (this.rooms.has(code) && attempts < maxAttempts);

    if (this.rooms.has(code)) {
      throw new Error('Failed to generate unique room code');
    }

    return code;
  }

  createRoom(code: string): Room {
    const room: Room = {
      code,
      users: new Map(),
      messages: [],
      typingUsers: new Map(),
      typingTimers: new Map(),
    };
    this.rooms.set(code, room);
    return room;
  }

  getRoom(code: string): Room | undefined {
    return this.rooms.get(code);
  }

  hasRoom(code: string): boolean {
    return this.rooms.has(code);
  }

  addUserToRoom(code: string, socketId: string, username: string): boolean {
    const room = this.rooms.get(code);
    if (!room) return false;

    // Check if username is already taken
    for (const existingUsername of room.users.values()) {
      if (existingUsername === username) {
        return false;
      }
    }

    room.users.set(socketId, username);
    return true;
  }

  removeUserFromRoom(code: string, socketId: string): string | null {
    const room = this.rooms.get(code);
    if (!room) return null;

    const username = room.users.get(socketId) || null;
    room.users.delete(socketId);
    room.typingUsers.delete(socketId);

    // Clear typing timer
    const timer = room.typingTimers.get(socketId);
    if (timer) {
      clearTimeout(timer);
      room.typingTimers.delete(socketId);
    }

    // Delete room if empty
    if (room.users.size === 0) {
      this.rooms.delete(code);
    }

    return username;
  }

  addMessage(code: string, message: Message): void {
    const room = this.rooms.get(code);
    if (!room) return;

    room.messages.push(message);

    // Keep only last MAX_MESSAGES
    if (room.messages.length > this.MAX_MESSAGES) {
      room.messages = room.messages.slice(-this.MAX_MESSAGES);
    }
  }

  getMessages(code: string): Message[] {
    const room = this.rooms.get(code);
    return room ? room.messages : [];
  }

  getUsers(code: string): string[] {
    const room = this.rooms.get(code);
    return room ? Array.from(room.users.values()) : [];
  }

  setTyping(code: string, socketId: string): boolean {
    const room = this.rooms.get(code);
    if (!room) return false;

    const wasAlreadyTyping = room.typingUsers.has(socketId);
    room.typingUsers.set(socketId, Date.now());

    // Clear existing timer if any
    const existingTimer = room.typingTimers.get(socketId);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      this.handleTypingExpired(code, socketId);
    }, this.TYPING_TIMEOUT);
    room.typingTimers.set(socketId, timer);

    return wasAlreadyTyping;
  }

  private handleTypingExpired(code: string, socketId: string): void {
    const room = this.rooms.get(code);
    if (!room) return;

    room.typingUsers.delete(socketId);
    room.typingTimers.delete(socketId);

    if (this.onTypingExpired) {
      this.onTypingExpired(code, socketId);
    }
  }

  clearTyping(code: string, socketId: string): void {
    const room = this.rooms.get(code);
    if (!room) return;

    room.typingUsers.delete(socketId);

    // Clear typing timer
    const timer = room.typingTimers.get(socketId);
    if (timer) {
      clearTimeout(timer);
      room.typingTimers.delete(socketId);
    }
  }

  getTypingUsers(code: string, excludeSocketId?: string): string[] {
    const room = this.rooms.get(code);
    if (!room) return [];

    const typingUsernames: string[] = [];

    for (const [socketId] of room.typingUsers.entries()) {
      if (socketId !== excludeSocketId) {
        const username = room.users.get(socketId);
        if (username) {
          typingUsernames.push(username);
        }
      }
    }

    return typingUsernames;
  }

  cleanupTypingForSocket(code: string, socketId: string): void {
    const room = this.rooms.get(code);
    if (!room) return;

    room.typingUsers.delete(socketId);
  }

  getRoomCount(): number {
    return this.rooms.size;
  }
}
