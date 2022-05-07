import { mount } from '@vue/test-utils';
// import Button from '@/src/button/index.ts';
import { emitEvent } from '@/src/utils/event';

const Component = {
  props: {
    onClick: Function,
    onValueChange: Function,
  },
  render() {
    return <div>test</div>;
  },
};

describe('utils/event', () => {
  describe('emitEvent', () => {
    it('Emit event ', async () => {
      const onClick = jest.fn();
      const onValueChange = jest.fn();

      const wrapper = mount(Component, {
        listeners: {
          click: onClick,
          'value-change': onValueChange,
        },
      });
      emitEvent(wrapper.vm, 'click');
      emitEvent(wrapper.vm, 'value-change');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().click).toBeTruthy();
      expect(wrapper.emitted()['value-change']).toBeTruthy();
    });

    it('Call event function ', async () => {
      const handleValueChange = jest.fn();
      const handleClick = jest.fn();

      const wrapper = mount(Component, {
        propsData: {
          onValueChange: handleValueChange,
          onClick: handleClick,
        },
      });
      emitEvent(wrapper.vm, 'click');
      emitEvent(wrapper.vm, 'value-change');
      await wrapper.vm.$nextTick();
      expect(handleClick).toHaveBeenCalled();
      expect(handleValueChange).toHaveBeenCalled();
    });
  });
});
