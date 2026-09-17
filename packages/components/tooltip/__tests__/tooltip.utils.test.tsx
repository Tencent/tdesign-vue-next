import { defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { useMouse } from '@tdesign/components/tooltip/utils';

describe('useMouse', () => {
  it('tracks pointer coordinates and removes the listener on unmount', async () => {
    const addEventListener = vi.spyOn(window, 'addEventListener');
    const removeEventListener = vi.spyOn(window, 'removeEventListener');
    let mouse!: ReturnType<typeof useMouse>;
    const Component = defineComponent({
      setup() {
        mouse = useMouse();
        return () => <div data-x={mouse.x.value} data-y={mouse.y.value} />;
      },
    });
    const wrapper = mount(Component);

    expect(addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function), { passive: true });
    expect(wrapper.attributes('data-x')).toBe('0');
    expect(wrapper.attributes('data-y')).toBe('0');

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 24, clientY: 36 }));
    await nextTick();
    expect(wrapper.attributes('data-x')).toBe('24');
    expect(wrapper.attributes('data-y')).toBe('36');

    wrapper.unmount();
    expect(removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 48, clientY: 72 }));
    expect(mouse.x.value).toBe(24);
    expect(mouse.y.value).toBe(36);
  });
});
