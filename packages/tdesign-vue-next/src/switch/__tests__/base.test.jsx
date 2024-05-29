import { mount } from '@vue/test-utils';
import { nextTick } from '@td/adapter-vue';
import { describe, expect, it } from 'vitest';
import { Switch } from 'tdesign-vue-next';

describe('switch', () => {
  describe('ui render test', () => {
    // test prop disabled
    describe(':props.disabled', () => {
      it('disabled default value is false', () => {
        const wrapper = mount(Switch);
        const ele = wrapper.find('.t-switch');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-is-disabled')).toBe(false);
      });
      it('disabled={true} works fine', () => {
        const wrapper = mount({
          render() {
            return <Switch disabled />;
          },
        });
        const ele = wrapper.find('.t-switch');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-is-disabled')).toBe(true);
      });
    });

    // test props label
    describe(':props.label', () => {
      it('label default value is empty', () => {
        const wrapper = mount(Switch);
        const contentEle = wrapper.find('.t-switch__content');
        const text = contentEle.element.textContent;
        expect(!text).toBe(true);
      });
      it('label={Array<string>} works find', () => {
        const label = ['open', 'close'];
        const wrapper = mount({
          render() {
            return <Switch disabled label={label} />;
          },
        });
        const contentEle = wrapper.find('.t-switch__content');
        const text = contentEle.element.innerHTML;
        expect(text === label[1]).toBe(true);
      });
      it('label={Array<TNode>} works find', () => {
        const TnodeOpen = () => <span id="switch_open">open</span>;
        const TnodeClose = () => <span id="switch_close">close</span>;
        const label = [TnodeOpen, TnodeClose];
        const wrapper = mount({
          render() {
            return <Switch disabled label={label} />;
          },
        });
        const contentEle = wrapper.find('.t-switch__content');
        const text = contentEle.find('#switch_close').element.innerHTML;
        expect(text === 'close').toBe(true);
      });
      it('label={TNode<value>} works find', () => {
        const label = val => (val ? <span id="switch_open">open</span> : <span id="switch_close">close</span>);
        const wrapper = mount({
          render() {
            return <Switch disabled label={label} />;
          },
        });
        const contentEle = wrapper.find('.t-switch__content');
        const text = contentEle.find('#switch_open').element.innerHTML;
        expect(text === 'open').toBe(true);
      });
    });
    // test props defaultValue
    describe(':props.defaultValue', () => {
      it('defaultValue is false', () => {
        const wrapper = mount(Switch);
        const ele = wrapper.find('.t-switch');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-is-checked')).toBeFalsy();
      });
      it('defaultValue={true} works find', () => {
        const wrapper = mount({
          render() {
            return <Switch defaultValue={true} />;
          },
        });
        const ele = wrapper.find('.t-switch');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-is-checked')).toBe(true);
      });
    });
    // test props loading
    describe(':props.loading', () => {
      it('loading default value is false', () => {
        const wrapper = mount(Switch);
        const ele = wrapper.find('.t-switch');
        const loadingEle = ele.find('.t-is-loading');
        expect(loadingEle.exists() === false).toBe(true);
      });
      it('loading={true} works find', () => {
        const wrapper = mount({
          render() {
            return <Switch loading={true} />;
          },
        });
        const ele = wrapper.find('.t-switch');
        const loadingEle = ele.find('.t-is-loading');
        expect(loadingEle.exists() === true).toBe(true);
      });
    });
    // test props size
    describe(':props.size', () => {
      it('size default value is medium', () => {
        const wrapper = mount(Switch);
        const ele = wrapper.find('.t-switch');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-size-m')).toBe(true);
      });
      it('size={large} works find', () => {
        const wrapper = mount({
          render() {
            return <Switch size="large" />;
          },
        });
        const ele = wrapper.find('.t-switch');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-size-l')).toBe(true);
      });
      it('size={small} works find', () => {
        const wrapper = mount({
          render() {
            return <Switch size="small" />;
          },
        });
        const ele = wrapper.find('.t-switch');
        const eleCls = ele.classes();
        expect(eleCls.includes('t-size-s')).toBe(true);
      });
    });
  });
});
