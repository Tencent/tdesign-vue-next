import {
  defaultWindow,
  tryOnScopeDispose,
  unrefElement,
  useMutationObserver,
} from '@tdesign/components/watermark/hooks';

describe('Watermark Hooks', () => {
  describe('defaultWindow', () => {
    it('should be defined', () => {
      expect(defaultWindow).toBeDefined();
    });
  });
});
