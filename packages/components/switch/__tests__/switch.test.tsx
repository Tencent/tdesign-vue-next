import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Switch from '@tdesign/components/switch';

describe('Switch', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Switch />;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':customValue', () => {
      const wrapper = mount({
        render() {
          return <Switch customValue={[true, false]} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Switch disabled={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':label', () => {
      const wrapper = mount({
        render() {
          return <Switch label={['open', 'close']} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':loading', () => {
      const wrapper = mount({
        render() {
          return <Switch loading={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Switch size={'small'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':modelValue', () => {
      const value = '1';
      const wrapper = mount({
        render() {
          return <Switch v-model={value} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Switch value={false} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':defaultValue', () => {
      const wrapper = mount({
        render() {
          return <Switch defaultValue={1} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':onChange', () => {
      const wrapper = mount({
        render() {
          return <Switch onChange={() => {}} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('exposes switch semantics and updates aria-checked', async () => {
      const wrapper = mount(Switch, { props: { defaultValue: false } });
      const root = wrapper.get('.t-switch');

      expect(root.attributes()).toMatchObject({ role: 'switch', 'aria-checked': 'false', tabindex: '0' });

      await root.trigger('click');

      expect(root.attributes('aria-checked')).toBe('true');
    });

    it('exposes disabled and loading states to assistive technology', () => {
      const disabled = mount(Switch, { props: { disabled: true } });
      const loading = mount(Switch, { props: { loading: true } });

      expect(disabled.get('.t-switch').attributes('aria-disabled')).toBe('true');
      expect(disabled.get('.t-switch').attributes('aria-busy')).toBeUndefined();
      expect(disabled.get('.t-switch').attributes('tabindex')).toBeUndefined();
      expect(loading.get('.t-switch').attributes()).toMatchObject({
        'aria-disabled': 'true',
        'aria-busy': 'true',
      });
      expect(loading.get('.t-switch').attributes('tabindex')).toBeUndefined();
    });
  });

  describe('@event', () => {
    it('Event passthrough: change', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Switch onChange={fn}></Switch>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      wrapper.find('.t-switch').trigger('click');
      expect(fn).toHaveBeenCalled();
    });

    it.each([' ', 'Enter'])('toggles with the %j key', async (key) => {
      const beforeChange = vi.fn(() => true);
      const onChange = vi.fn();
      const wrapper = mount(Switch, { props: { beforeChange, defaultValue: false, onChange } });
      const root = wrapper.get('.t-switch');

      await root.trigger('keydown', { key });
      await Promise.resolve();

      expect(beforeChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(MouseEvent) });
      expect(root.attributes('aria-checked')).toBe('true');
    });

    it('prevents Space scrolling and ignores unrelated keys', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, { props: { onChange } });
      const root = wrapper.get('.t-switch');
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });

      root.element.dispatchEvent(spaceEvent);
      await root.trigger('keydown', { key: 'ArrowRight' });

      expect(spaceEvent.defaultPrevented).toBe(true);
      expect(onChange).toHaveBeenCalledOnce();
    });

    it.each([{ disabled: true }, { loading: true }])('blocks keyboard toggles with %o', async (props) => {
      const beforeChange = vi.fn(() => true);
      const onChange = vi.fn();
      const wrapper = mount(Switch, { props: { ...props, beforeChange, onChange } });

      await wrapper.get('.t-switch').trigger('keydown', { key: ' ' });

      expect(beforeChange).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('<slot>', () => {
    it('<label>', () => {
      const wrapper = mount({
        render() {
          return (
            <Switch
              v-slots={{
                label: () => 'TDesign',
              }}
            ></Switch>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
