import { nextTick, ref } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import Skeleton from '@tdesign/components/skeleton';

describe('Skeleton', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  // ==================== Props Tests ====================
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Skeleton>> | null = null;

    beforeEach(() => {
      wrapper = mount(Skeleton, {
        props: { loading: true },
      }) as VueWrapper<InstanceType<typeof Skeleton>>;
    });

    it(':theme[text] default', () => {
      // theme defaults to 'text'
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(rows.length).toBe(1);
      expect(cols.length).toBe(1);
      expect(wrapper.find('.t-skeleton--type-text').exists()).toBeTruthy();
    });

    it(':theme[avatar]', async () => {
      await wrapper.setProps({ theme: 'avatar' });
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(rows.length).toBe(1);
      expect(cols.length).toBe(1);
      expect(wrapper.find('.t-skeleton--type-circle').exists()).toBeTruthy();
    });

    it(':theme[paragraph]', async () => {
      await wrapper.setProps({ theme: 'paragraph' });
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(rows.length).toBe(3);
      expect(cols.length).toBe(3);
      expect(wrapper.findAll('.t-skeleton--type-text').length).toBe(3);
    });

    it(':theme[avatar-text]', async () => {
      await wrapper.setProps({ theme: 'avatar-text' });
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(rows.length).toBe(1);
      expect(cols.length).toBe(2);
      expect(wrapper.find('.t-skeleton--type-circle').exists()).toBeTruthy();
      expect(wrapper.find('.t-skeleton--type-text').exists()).toBeTruthy();
    });

    it(':theme[tab]', async () => {
      await wrapper.setProps({ theme: 'tab' });
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(rows.length).toBe(2);
      expect(cols.length).toBe(2);
    });

    it(':theme[article]', async () => {
      await wrapper.setProps({ theme: 'article' });
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(rows.length).toBe(6);
      expect(cols.length).toBe(11);
      expect(wrapper.findAll('.t-skeleton--type-rect').length).toBe(2);
    });

    it(':theme validator', () => {
      const validator = (Skeleton as any).props?.theme?.validator;
      if (validator) {
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('')).toBe(true);
        expect(validator('text')).toBe(true);
        expect(validator('avatar')).toBe(true);
        expect(validator('paragraph')).toBe(true);
        expect(validator('avatar-text')).toBe(true);
        expect(validator('tab')).toBe(true);
        expect(validator('article')).toBe(true);
        expect(validator('invalid')).toBe(false);
      }
    });

    it(':animation[none] default', () => {
      // animation defaults to 'none'
      const col = wrapper.find('.t-skeleton__col');
      expect(col.classes()).toContain('t-skeleton--animation-none');
    });

    it(':animation[gradient]', async () => {
      await wrapper.setProps({ animation: 'gradient' });
      const col = wrapper.find('.t-skeleton__col');
      expect(col.classes()).toContain('t-skeleton--animation-gradient');
    });

    it(':animation[flashed]', async () => {
      await wrapper.setProps({ animation: 'flashed' });
      const col = wrapper.find('.t-skeleton__col');
      expect(col.classes()).toContain('t-skeleton--animation-flashed');
    });

    it(':animation validator', () => {
      const validator = (Skeleton as any).props?.animation?.validator;
      if (validator) {
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('')).toBe(true);
        expect(validator('gradient')).toBe(true);
        expect(validator('flashed')).toBe(true);
        expect(validator('none')).toBe(true);
        expect(validator('invalid')).toBe(false);
      }
    });

    it(':loading[boolean] true shows skeleton', () => {
      expect(wrapper.find('.t-skeleton').exists()).toBeTruthy();
      expect(wrapper.findAll('.t-skeleton__row').length).toBeGreaterThan(0);
    });

    it(':loading[boolean] false hides skeleton without slot', async () => {
      await wrapper.setProps({ loading: false });
      await nextTick();
      expect(wrapper.find('.t-skeleton').exists()).toBeFalsy();
      expect(wrapper.find('.t-skeleton__row').exists()).toBeFalsy();
    });

    it(':loading[boolean] false shows default slot content', () => {
      const slotWrapper = mount(Skeleton, {
        props: { loading: false },
        slots: { default: () => <div class="loaded-content">Loaded</div> },
      });
      expect(slotWrapper.find('.t-skeleton').exists()).toBeFalsy();
      expect(slotWrapper.find('.loaded-content').exists()).toBeTruthy();
      expect(slotWrapper.find('.loaded-content').text()).toBe('Loaded');
    });

    it(':loading[boolean] true with default slot shows skeleton', () => {
      const slotWrapper = mount(Skeleton, {
        props: { loading: true },
        slots: { default: () => <div class="loaded-content">Loaded</div> },
      });
      expect(slotWrapper.find('.t-skeleton').exists()).toBeTruthy();
      expect(slotWrapper.find('.loaded-content').exists()).toBeFalsy();
    });

    it(':loading toggle from true to false with slot', async () => {
      const loading = ref(true);
      const slotWrapper = mount({
        render() {
          return (
            <Skeleton loading={loading.value}>
              <div class="text">加载完成的内容</div>
            </Skeleton>
          );
        },
      });
      expect(slotWrapper.findAll('.t-skeleton__row').length).toBe(1);
      loading.value = false;
      await nextTick();
      expect(slotWrapper.findAll('.t-skeleton__row').length).toBe(0);
      expect(slotWrapper.find('.text').exists()).toBeTruthy();
      expect(slotWrapper.find('.text').text()).toBe('加载完成的内容');
    });

    it(':delay[number] shows skeleton after delay', async () => {
      const delayWrapper = mount(Skeleton, {
        props: { loading: true, delay: 1000 },
      });
      await nextTick();
      // Before delay, skeleton should not show
      expect(delayWrapper.find('.t-skeleton').exists()).toBeFalsy();

      // After delay, skeleton should show
      vi.advanceTimersByTime(1000);
      await nextTick();
      expect(delayWrapper.find('.t-skeleton').exists()).toBeTruthy();
    });

    it(':delay[number] loading set to false before delay completes', async () => {
      const delayWrapper = mount(Skeleton, {
        props: { loading: true, delay: 1000 },
      });
      await nextTick();
      expect(delayWrapper.find('.t-skeleton').exists()).toBeFalsy();

      // Set loading to false before delay completes
      await delayWrapper.setProps({ loading: false });
      await nextTick();

      // Advance timer - skeleton should still not show
      vi.advanceTimersByTime(1000);
      await nextTick();
      expect(delayWrapper.find('.t-skeleton').exists()).toBeFalsy();
    });

    it(':delay[number] 0 shows skeleton immediately', () => {
      const delayWrapper = mount(Skeleton, {
        props: { loading: true, delay: 0 },
      });
      expect(delayWrapper.find('.t-skeleton').exists()).toBeTruthy();
    });

    it(':rowCol[array] with number items', async () => {
      await wrapper.setProps({ rowCol: [1, 1, 2] });
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(rows.length).toBe(3);
      expect(cols.length).toBe(4);
      expect(rows[0].element.children.length).toBe(1);
      expect(rows[1].element.children.length).toBe(1);
      expect(rows[2].element.children.length).toBe(2);
    });

    it(':rowCol[array] with object items', async () => {
      await wrapper.setProps({
        rowCol: [
          { width: '100px', height: '30px', type: 'rect' },
          { width: '200px', height: '50px', type: 'circle' },
        ],
      });
      const rows = wrapper.findAll('.t-skeleton__row');
      expect(rows.length).toBe(2);
      expect(wrapper.find('.t-skeleton--type-rect').exists()).toBeTruthy();
      expect(wrapper.find('.t-skeleton--type-circle').exists()).toBeTruthy();
    });

    it(':rowCol[array] with nested array items', async () => {
      await wrapper.setProps({
        rowCol: [
          [
            { width: '60px', height: '60px', type: 'circle' },
            { type: 'text', height: '32px' },
          ],
        ],
      });
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(rows.length).toBe(1);
      expect(cols.length).toBe(2);
      expect(wrapper.find('.t-skeleton--type-circle').exists()).toBeTruthy();
      expect(wrapper.find('.t-skeleton--type-text').exists()).toBeTruthy();
    });

    it(':rowCol overrides theme', async () => {
      await wrapper.setProps({ theme: 'avatar', rowCol: [1, 1] });
      const rows = wrapper.findAll('.t-skeleton__row');
      // rowCol takes precedence over theme
      expect(rows.length).toBe(2);
      expect(wrapper.find('.t-skeleton--type-circle').exists()).toBeFalsy();
    });

    it(':rowCol with style properties (marginRight, marginLeft)', async () => {
      await wrapper.setProps({
        rowCol: [
          {
            width: '100px',
            height: '30px',
            marginRight: '10px',
            marginLeft: '5px',
          },
        ],
      });
      const col = wrapper.find('.t-skeleton__col');
      const style = col.attributes('style');
      expect(style).toContain('width: 100px');
      expect(style).toContain('height: 30px');
      expect(style).toContain('margin-right: 10px');
      expect(style).toContain('margin-left: 5px');
    });

    it(':rowCol with margin property', async () => {
      await wrapper.setProps({
        rowCol: [{ width: '100px', margin: '20px' }],
      });
      const col = wrapper.find('.t-skeleton__col');
      const style = col.attributes('style');
      expect(style).toContain('margin: 20px');
    });

    it(':rowCol with size property sets width and height', async () => {
      await wrapper.setProps({
        rowCol: [{ size: '40px', type: 'circle' }],
      });
      const col = wrapper.find('.t-skeleton__col');
      const style = col.attributes('style');
      expect(style).toContain('width: 40px');
      expect(style).toContain('height: 40px');
    });

    it(':rowCol with numeric style values', async () => {
      await wrapper.setProps({
        // @ts-expect-error testing numeric values for style properties
        rowCol: [{ width: 100, height: 30 }],
      });
      const col = wrapper.find('.t-skeleton__col');
      const style = col.attributes('style');
      expect(style).toContain('width: 100px');
      expect(style).toContain('height: 30px');
    });

    it(':rowCol with numeric size value', async () => {
      await wrapper.setProps({
        // @ts-expect-error testing numeric size value
        rowCol: [{ size: 50, type: 'circle' }],
      });
      const col = wrapper.find('.t-skeleton__col');
      const style = col.attributes('style');
      expect(style).toContain('width: 50px');
      expect(style).toContain('height: 50px');
    });

    it(':rowCol with content as string', async () => {
      await wrapper.setProps({
        rowCol: [{ content: 'Loading text...' }],
      });
      const col = wrapper.find('.t-skeleton__col');
      expect(col.text()).toBe('Loading text...');
    });

    it(':rowCol with content as function', async () => {
      await wrapper.setProps({
        rowCol: [{ content: () => <span class="custom-content">Custom</span> }],
      });
      expect(wrapper.find('.custom-content').exists()).toBeTruthy();
      expect(wrapper.find('.custom-content').text()).toBe('Custom');
    });

    it(':rowCol with object without type defaults to text', async () => {
      await wrapper.setProps({
        rowCol: [{ width: '100px' }],
      });
      expect(wrapper.find('.t-skeleton--type-text').exists()).toBeTruthy();
    });

    it(':content[string] renders via default slot', () => {
      // content prop is rendered through renderContent('default', 'content')
      // which requires slots.default to exist for the content to show when loading=false
      const contentWrapper = mount(Skeleton, {
        props: { loading: false },
        slots: { default: 'Content loaded' },
      });
      expect(contentWrapper.text()).toContain('Content loaded');
    });

    it(':content[function] renders via default slot with function', () => {
      const contentWrapper = mount(Skeleton, {
        props: { loading: false },
        slots: { default: () => <div class="fn-content">Function content</div> },
      });
      expect(contentWrapper.find('.fn-content').exists()).toBeTruthy();
    });

    it(':content[slot] default slot', () => {
      const slotWrapper = mount(Skeleton, {
        props: { loading: false },
        slots: { default: () => <div class="slot-content">Slot content</div> },
      });
      expect(slotWrapper.find('.slot-content').exists()).toBeTruthy();
    });

    it('no theme and no rowCol renders default skeleton', () => {
      // theme defaults to 'text', so we must pass empty string to make it falsy
      const noThemeWrapper = mount(Skeleton, {
        props: { loading: true, theme: '' as any },
      });
      const rows = noThemeWrapper.findAll('.t-skeleton__row');
      // Default rowCol: [1, 1, 1, { width: '70%' }]
      expect(rows.length).toBe(4);
    });
  });

  // ==================== Snapshot Tests ====================
  describe('snapshots', () => {
    it('default render', async () => {
      const wrapper = mount(Skeleton, {
        props: { loading: true },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('theme avatar-text render', async () => {
      const wrapper = mount(Skeleton, {
        props: { loading: true, theme: 'avatar-text', animation: 'gradient' },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('custom rowCol render', async () => {
      const wrapper = mount(Skeleton, {
        props: {
          loading: true,
          rowCol: [
            { type: 'circle', size: '48px' },
            { type: 'text', height: '16px' },
            [
              { type: 'text', width: '60%' },
              { type: 'text', width: '40%' },
            ],
          ],
          animation: 'flashed',
        },
      });
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // ==================== Edge Cases Tests ====================
  describe('edge cases', () => {
    it('should handle component unmount gracefully', async () => {
      const wrapper = mount(Skeleton, {
        props: { loading: true },
      });
      await nextTick();
      wrapper.unmount();
      expect(true).toBe(true);
    });

    it('should handle unmount during delay', async () => {
      const wrapper = mount(Skeleton, {
        props: { loading: true, delay: 1000 },
      });
      await nextTick();
      wrapper.unmount();
      // Advance timer after unmount - should not crash
      vi.advanceTimersByTime(1000);
      expect(true).toBe(true);
    });

    it('delay with loading toggle true → false → true', async () => {
      const wrapper = mount(Skeleton, {
        props: { loading: false, delay: 500 },
      });
      await nextTick();
      expect(wrapper.find('.t-skeleton').exists()).toBeFalsy();

      // Toggle loading to true
      await wrapper.setProps({ loading: true });
      await nextTick();
      // Not visible yet due to delay
      expect(wrapper.find('.t-skeleton').exists()).toBeFalsy();

      // Toggle loading back to false before delay completes
      await wrapper.setProps({ loading: false });
      await nextTick();
      vi.advanceTimersByTime(500);
      await nextTick();
      // Should still not show skeleton
      expect(wrapper.find('.t-skeleton').exists()).toBeFalsy();

      // Toggle loading to true again
      await wrapper.setProps({ loading: true });
      await nextTick();
      vi.advanceTimersByTime(500);
      await nextTick();
      // Now skeleton should show
      expect(wrapper.find('.t-skeleton').exists()).toBeTruthy();
    });

    it('rowCol with single object (not wrapped in array)', async () => {
      const wrapper = mount(Skeleton, {
        props: {
          loading: true,
          rowCol: [{ width: '200px', height: '20px' }],
        },
      });
      const col = wrapper.find('.t-skeleton__col');
      expect(col.exists()).toBeTruthy();
    });
  });
});
