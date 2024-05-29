import { mount } from '@vue/test-utils';
import { expect, it } from 'vitest';
import { Badge } from 'tdesign-vue-next';

// every component needs four parts: props/events/slots/functions.
describe('badge', () => {
  // test props api
  describe(':props', () => {
    it(':color', () => {
      const wrapper = mount(() => (
        <Badge color="green" count={99}>
          Tdesign
        </Badge>
      ));
      const badge = wrapper.find('.t-badge');
      const circle = badge.find('.t-badge--circle');
      expect(badge.exists()).toBeTruthy();
      expect(circle.exists()).toBeTruthy();
      expect(getComputedStyle(circle.element, null).background).toBe('green');
    });

    it(':count', () => {
      const wrapper = mount({
        render() {
          return <Badge count={2}>Tdesign</Badge>;
        },
      });
      const badge = wrapper.find('.t-badge');
      const circle = badge.find('.t-badge--circle');
      expect(circle.text()).toBe('2');
    });

    it(':dot', () => {
      const wrapper = mount({
        render() {
          return (
            <Badge dot={true} count={2}>
              Tdesign
            </Badge>
          );
        },
      });
      const dot = wrapper.find('.t-badge--dot');
      expect(dot.exists()).toBeTruthy();
    });

    it(':maxCount', () => {
      const wrapper = mount({
        render() {
          return (
            <Badge maxCount={10} count={20}>
              Tdesign
            </Badge>
          );
        },
      });
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(circle.text()).toBe('10+');
    });

    it(':count:text', () => {
      const wrapper = mount({
        render() {
          return <Badge count="new">Tdesign</Badge>;
        },
      });
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(circle.text()).toBe('new');
    });

    it(':size', () => {
      const wrapper = mount(() => (
        <Badge size="small" count={2}>
          Tdesign
        </Badge>
      ));
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(circle.classes()).toContain('t-size-s');
    });

    it(':shape', () => {
      const wrapper = mount({
        render() {
          return (
            <Badge shape="round" count={2}>
              Tdesign
            </Badge>
          );
        },
      });
      const round = wrapper.find('.t-badge--round');
      expect(round.exists()).toBeTruthy();
    });

    it(':showZero', () => {
      const wrapper = mount({
        render() {
          return (
            <Badge showZero={true} count={0}>
              Tdesign
            </Badge>
          );
        },
      });
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(circle.text()).toBe('0');
    });

    it(':offset', () => {
      const wrapper = mount({
        render() {
          return (
            <Badge offset={[10, 10]} count={2}>
              Tdesign
            </Badge>
          );
        },
      });
      const circle = wrapper.find('.t-badge--circle');
      expect(circle.exists()).toBeTruthy();
      expect(getComputedStyle(circle.element, null).top).toBe('10px');
      expect(getComputedStyle(circle.element, null).right).toBe('10px');
    });
  });

  // test slots
  describe('<slot>', () => {
    it('default', () => {
      const wrapper = mount({
        render() {
          return (
            <Badge count={2}>
              <div class="text">Tdesign</div>
            </Badge>
          );
        },
      });
      const text = wrapper.find('.text');
      expect(text.exists()).toBeTruthy();
      expect(text.text()).toBe('Tdesign');
    });
    it('content', () => {
      const wrapper = mount(Badge, {
        slots: {
          content: <div class="text">Tdesign</div>,
        },
      });
      const text = wrapper.find('.text');
      expect(text.exists()).toBeTruthy();
      expect(text.text()).toBe('Tdesign');
    });

    it('count', () => {
      const wrapper = mount(Badge, {
        slots: {
          count: '66',
        },
      });
      const count = wrapper.find('.t-badge--circle');
      expect(count.exists()).toBeTruthy();
      expect(count.text()).toBe('66');
    });
  });
});
