import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Switch } from 'tdesign-vue-next';

describe('switch', () => {
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
          return <Switch size="small" />;
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
  });

  describe('@event', () => {
    it('event passthrough: change', () => {
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
            >
            </Switch>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
