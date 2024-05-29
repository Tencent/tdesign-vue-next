import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { Switch } from 'tdesign-vue-next';

describe('switch', () => {
  describe('behavior test', () => {
    describe('behavior for props.disabled', () => {
      it('disabled={true} can forbbid onChange event', async () => {
        const defaultValue = false;
        const wrapper = mount({
          render() {
            return <Switch disabled defaultValue={defaultValue} />;
          },
        });
        await wrapper.trigger('click');
        const ele = wrapper.find('.t-switch');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-is-checked')).toBeFalsy();
      });
    });
    describe('behavior for props.customValue', () => {
      it('prop customValue works fine with defaultValue', () => {
        const defaultValue = 1;
        const customValue = [1, 2];
        const wrapper = mount({
          render() {
            return <Switch customValue={customValue} defaultValue={defaultValue} />;
          },
        });
        const ele = wrapper.find('.t-switch');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-is-checked')).toBe(true);
      });
      it('prop customValue works fine with onChange event', async () => {
        let onChangeEventCallbackValue;
        const customValue = ['a', 'b'];
        const onChangeFn = (val) => {
          onChangeEventCallbackValue = val;
        };
        const wrapper = mount({
          render() {
            return <Switch customValue={customValue} defaultValue="a" onChange={onChangeFn} />;
          },
        });
        await wrapper.trigger('click');
        expect(customValue.includes(onChangeEventCallbackValue)).toBe(true);
      });
    });
    describe('behavior for props.loading', () => {
      it('loading={true} can forbbid onChange event', async () => {
        let isChangeEventTrigger = false;
        const onChangeFn = (val) => {
          isChangeEventTrigger = true;
        };
        const wrapper = mount({
          render() {
            return <Switch loading={true} onChange={onChangeFn} />;
          },
        });
        await wrapper.trigger('click');
        expect(isChangeEventTrigger === false).toBe(true);
      });
    });
  });
});
