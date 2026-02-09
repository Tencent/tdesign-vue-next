import { expect, describe, it } from 'vitest';
import { getOverlay } from '../utils';

describe('ImageViewer utils', () => {
  describe('getOverlay', () => {
    it('should return showOverlay value when explicitly set', () => {
      const props = { showOverlay: true };
      expect(getOverlay(props)).toBe(true);

      const props2 = { showOverlay: false };
      expect(getOverlay(props2)).toBe(false);
    });

    it('should return true for modal mode when showOverlay not set', () => {
      const props = { mode: 'modal' };
      expect(getOverlay(props)).toBe(true);

      const props2 = { mode: 'modal', showOverlay: undefined };
      expect(getOverlay(props2)).toBe(true);
    });

    it('should return false for modeless mode when showOverlay not set', () => {
      const props = { mode: 'modeless' };
      expect(getOverlay(props)).toBe(false);

      const props2 = { mode: 'modeless', showOverlay: undefined };
      expect(getOverlay(props2)).toBe(false);
    });

    it('should prioritize explicit showOverlay over mode', () => {
      const props = { mode: 'modal', showOverlay: false };
      expect(getOverlay(props)).toBe(false);

      const props2 = { mode: 'modeless', showOverlay: true };
      expect(getOverlay(props2)).toBe(true);
    });
  });
});
