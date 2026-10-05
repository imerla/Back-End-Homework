import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { Message } from '../shared/types';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  afterEach(() => {
    // Clear all rooms after each test
    (service as any).rooms.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateRoomCode', () => {
    it('should generate a 6-character code', () => {
      const code = service.generateRoomCode();
      expect(code).toHaveLength(6);
    });

    it('should generate uppercase alphanumeric codes without ambiguous characters', () => {
      const code = service.generateRoomCode();
      const ambiguousChars = ['0', 'O', '1', 'I'];
      for (const char of ambiguousChars) {
        expect(code).not.toContain(char);
      }
    });

    it('should generate unique codes', () => {
      const codes = new Set<string>();
      for (let i = 0; i < 100; i++) {
        const code = service.generateRoomCode();
        codes.add(code);
      }
      expect(codes.size).toBeGreaterThan(90); // Allow some collisions but mostly unique
    });
  });

  describe('createRoom', () => {
    it('should create a room with the given code', () => {
      const code = 'ABC123';
      const room = service.createRoom(code);
      expect(room.code).toBe(code);
      expect(room.users.size).toBe(0);
      expect(room.messages).toEqual([]);
      expect(room.typingUsers.size).toBe(0);
    });

    it('should store the room', () => {
      const code = 'ABC123';
      service.createRoom(code);
      expect(service.hasRoom(code)).toBe(true);
    });
  });

  describe('getRoom', () => {
    it('should return the room if it exists', () => {
      const code = 'ABC123';
      service.createRoom(code);
      const room = service.getRoom(code);
      expect(room).toBeDefined();
      expect(room?.code).toBe(code);
    });

    it('should return undefined if room does not exist', () => {
      const room = service.getRoom('NONEXIST');
      expect(room).toBeUndefined();
    });
  });

  describe('hasRoom', () => {
    it('should return true for existing room', () => {
      const code = 'ABC123';
      service.createRoom(code);
      expect(service.hasRoom(code)).toBe(true);
    });

    it('should return false for non-existing room', () => {
      expect(service.hasRoom('NONEXIST')).toBe(false);
    });
  });

  describe('addUserToRoom', () => {
    it('should add user to room', () => {
      const code = 'ABC123';
      service.createRoom(code);
      const result = service.addUserToRoom(code, 'socket1', 'Alice');
      expect(result).toBe(true);
      expect(service.getUsers(code)).toContain('Alice');
    });

    it('should not add duplicate username', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      const result = service.addUserToRoom(code, 'socket2', 'Alice');
      expect(result).toBe(false);
      expect(service.getUsers(code)).toEqual(['Alice']);
    });

    it('should return false for non-existing room', () => {
      const result = service.addUserToRoom('NONEXIST', 'socket1', 'Alice');
      expect(result).toBe(false);
    });
  });

  describe('removeUserFromRoom', () => {
    it('should remove user from room', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      const username = service.removeUserFromRoom(code, 'socket1');
      expect(username).toBe('Alice');
      expect(service.getUsers(code)).not.toContain('Alice');
    });

    it('should delete room when empty', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      service.removeUserFromRoom(code, 'socket1');
      expect(service.hasRoom(code)).toBe(false);
    });

    it('should return null for non-existing room', () => {
      const username = service.removeUserFromRoom('NONEXIST', 'socket1');
      expect(username).toBeNull();
    });

    it('should clear typing state on user removal', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      service.setTyping(code, 'socket1');
      service.removeUserFromRoom(code, 'socket1');
      const room = service.getRoom(code);
      expect(room).toBeUndefined(); // Room should be deleted
    });
  });

  describe('addMessage', () => {
    it('should add message to room', () => {
      const code = 'ABC123';
      service.createRoom(code);
      const message: Message = {
        id: '1',
        username: 'Alice',
        text: 'Hello',
        timestamp: Date.now(),
      };
      service.addMessage(code, message);
      expect(service.getMessages(code)).toContain(message);
    });

    it('should keep only last 50 messages', () => {
      const code = 'ABC123';
      service.createRoom(code);
      for (let i = 0; i < 60; i++) {
        const message: Message = {
          id: `${i}`,
          username: 'Alice',
          text: `Message ${i}`,
          timestamp: Date.now(),
        };
        service.addMessage(code, message);
      }
      const messages = service.getMessages(code);
      expect(messages.length).toBe(50);
      expect(messages[0].id).toBe('10'); // First 10 should be removed
    });
  });

  describe('getMessages', () => {
    it('should return empty array for non-existing room', () => {
      const messages = service.getMessages('NONEXIST');
      expect(messages).toEqual([]);
    });
  });

  describe('getUsers', () => {
    it('should return empty array for non-existing room', () => {
      const users = service.getUsers('NONEXIST');
      expect(users).toEqual([]);
    });
  });

  describe('typing functionality', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should set typing user', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      service.setTyping(code, 'socket1');
      const typingUsers = service.getTypingUsers(code);
      expect(typingUsers).toContain('Alice');
    });

    it('should return false when user was already typing', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      const wasAlreadyTyping1 = service.setTyping(code, 'socket1');
      const wasAlreadyTyping2 = service.setTyping(code, 'socket1');
      expect(wasAlreadyTyping1).toBe(false);
      expect(wasAlreadyTyping2).toBe(true);
    });

    it('should exclude specified socket from typing users', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      service.addUserToRoom(code, 'socket2', 'Bob');
      service.setTyping(code, 'socket1');
      service.setTyping(code, 'socket2');
      const typingUsers = service.getTypingUsers(code, 'socket1');
      expect(typingUsers).not.toContain('Alice');
      expect(typingUsers).toContain('Bob');
    });

    it('should clear typing user', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      service.setTyping(code, 'socket1');
      service.clearTyping(code, 'socket1');
      const typingUsers = service.getTypingUsers(code);
      expect(typingUsers).not.toContain('Alice');
    });

    it('should auto-clear expired typing indicators after timeout', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      service.setTyping(code, 'socket1');
      
      // Fast-forward past the 3 second timeout
      jest.advanceTimersByTime(3100);
      
      const typingUsers = service.getTypingUsers(code);
      expect(typingUsers).not.toContain('Alice');
    });

    it('should clearTyping cancel the typing timer', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      service.setTyping(code, 'socket1');
      
      service.clearTyping(code, 'socket1');
      
      // Fast-forward past the 3 second timeout
      jest.advanceTimersByTime(3100);
      
      // User should still not be in typing list (timer was cancelled)
      const typingUsers = service.getTypingUsers(code);
      expect(typingUsers).not.toContain('Alice');
    });

    it('should removeUserFromRoom cancel the typing timer', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      service.addUserToRoom(code, 'socket2', 'Bob');
      service.setTyping(code, 'socket1');
      
      service.removeUserFromRoom(code, 'socket1');
      
      // Fast-forward past the 3 second timeout
      jest.advanceTimersByTime(3100);
      
      // Room should still exist (Bob is still there)
      expect(service.hasRoom(code)).toBe(true);
      const typingUsers = service.getTypingUsers(code);
      expect(typingUsers).not.toContain('Alice');
    });

    it('should call callback when typing expires', () => {
      const code = 'ABC123';
      service.createRoom(code);
      service.addUserToRoom(code, 'socket1', 'Alice');
      
      const callback = jest.fn();
      service.registerTypingExpiredCallback(callback);
      
      service.setTyping(code, 'socket1');
      
      // Fast-forward past the 3 second timeout
      jest.advanceTimersByTime(3100);
      
      expect(callback).toHaveBeenCalledWith(code, 'socket1');
    });
  });

  describe('getRoomCount', () => {
    it('should return correct room count', () => {
      expect(service.getRoomCount()).toBe(0);
      service.createRoom('ABC123');
      expect(service.getRoomCount()).toBe(1);
      service.createRoom('DEF456');
      expect(service.getRoomCount()).toBe(2);
    });
  });
});
