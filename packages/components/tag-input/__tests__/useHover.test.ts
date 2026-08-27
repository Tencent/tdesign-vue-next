import { useHover } from '../hooks/useHover';

describe('useHover', () => {
  describe('events', () => {
    it(':addHover', () => {
      const onMouseenter = vi.fn();
      const context = { e: new MouseEvent('mouseenter') };
      const { isHover, addHover } = useHover({
        disabled: false,
        readonly: false,
        onMouseenter,
        onMouseleave: vi.fn(),
      });

      addHover(context);

      expect(isHover.value).toBe(true);
      expect(onMouseenter).toHaveBeenCalledWith(context);
    });

    it(':cancelHover', () => {
      const onMouseleave = vi.fn();
      const context = { e: new MouseEvent('mouseleave') };
      const { isHover, addHover, cancelHover } = useHover({
        disabled: false,
        readonly: false,
        onMouseenter: vi.fn(),
        onMouseleave,
      });

      addHover({ e: new MouseEvent('mouseenter') });
      cancelHover(context);

      expect(isHover.value).toBe(false);
      expect(onMouseleave).toHaveBeenCalledWith(context);
    });

    it(':addHover[disabled]', () => {
      const onMouseenter = vi.fn();
      const { isHover, addHover } = useHover({
        disabled: true,
        readonly: false,
        onMouseenter,
        onMouseleave: vi.fn(),
      });

      addHover({ e: new MouseEvent('mouseenter') });

      expect(isHover.value).toBe(false);
      expect(onMouseenter).not.toHaveBeenCalled();
    });

    it(':cancelHover[disabled]', () => {
      const onMouseleave = vi.fn();
      const { isHover, cancelHover } = useHover({
        disabled: true,
        readonly: false,
        onMouseenter: vi.fn(),
        onMouseleave,
      });

      cancelHover({ e: new MouseEvent('mouseleave') });

      expect(isHover.value).toBe(false);
      expect(onMouseleave).not.toHaveBeenCalled();
    });

    it(':addHover[readonly]', () => {
      const onMouseenter = vi.fn();
      const { isHover, addHover } = useHover({
        disabled: false,
        readonly: true,
        onMouseenter,
        onMouseleave: vi.fn(),
      });

      addHover({ e: new MouseEvent('mouseenter') });

      expect(isHover.value).toBe(false);
      expect(onMouseenter).not.toHaveBeenCalled();
    });

    it(':cancelHover[readonly]', () => {
      const onMouseleave = vi.fn();
      const { isHover, cancelHover } = useHover({
        disabled: false,
        readonly: true,
        onMouseenter: vi.fn(),
        onMouseleave,
      });

      cancelHover({ e: new MouseEvent('mouseleave') });

      expect(isHover.value).toBe(false);
      expect(onMouseleave).not.toHaveBeenCalled();
    });
  });
});
