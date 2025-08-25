import { describe, it, expect, vi, beforeEach } from 'vitest';
import aiService from '../../services/aiService';

describe('AIService', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  describe('getLocalResponse', () => {
    it('should return greeting response for hello message', () => {
      const response = aiService.getLocalResponse('hello');
      expect(response).toContain('Halo!');
      expect(response).toContain('Nixia');
    });

    it('should return skills information for skills query', () => {
      const response = aiService.getLocalResponse('what are your skills?');
      expect(response).toContain('React');
      expect(response).toContain('Node.js');
    });

    it('should return null for unrecognized queries', () => {
      const response = aiService.getLocalResponse('random unrecognized query');
      expect(response).toBeNull();
    });
  });

  describe('getFallbackResponse', () => {
    it('should return intelligent fallback for JavaScript questions', () => {
      const response = aiService.getFallbackResponse('tell me about javascript');
      expect(response).toContain('JavaScript');
      expect(response).toContain('powerful');
    });

    it('should return general fallback for unknown queries', () => {
      const response = aiService.getFallbackResponse('unknown query');
      expect(response).toContain('API');
      expect(response.length).toBeGreaterThan(50);
    });
  });

  describe('chat', () => {
    it('should return prompt message for empty input', async () => {
      const response = await aiService.chat('');
      expect(response).toContain('Silakan tanyakan sesuatu');
    });

    it('should return local response when available', async () => {
      const response = await aiService.chat('hello');
      expect(response).toContain('Halo!');
    });
  });
});
