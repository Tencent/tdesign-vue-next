import { nextTick, ref, onMounted } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Icon } from 'tdesign-icons-vue-next';
import { FormItem, Form } from '../index.ts';
import { Input, Button } from '@/src/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Form', () => {
  // test props api
  describe(':props', () => {
    let wrapper = null;
    beforeEach(() => {
      wrapper = mount({
        render() {
          return (
            <Form>
              <FormItem label="name" name="name">
                <Input placeholder="请输入内容" />
              </FormItem>
            </Form>
          );
        },
      });
    });
    it('exists', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it(':labelAlign', async () => {
      expect(wrapper.find('.t-form__label').classes()).includes('t-form__label--right');

      await wrapper.setProps({ labelAlign: 'top' });
      expect(wrapper.find('.t-form__label').classes()).includes('t-form__label--top');

      await wrapper.setProps({ labelAlign: 'left' });
      expect(wrapper.find('.t-form__label').classes()).includes('t-form__label--left');
    });

    it(':labelWidth', async () => {
      expect(wrapper.find('.t-form__label').element.style.width).toBe('100px');
      expect(wrapper.find('.t-form__controls').element.style.marginLeft).toBe('100px');

      await wrapper.setProps({ labelWidth: '200px' });
      expect(wrapper.find('.t-form__label').element.style.width).toBe('200px');
      expect(wrapper.find('.t-form__controls').element.style.marginLeft).toBe('200px');
    });

    it(':layout', async () => {
      expect(wrapper.find('.t-form').classes()).not.includes('t-form-inline');

      await wrapper.setProps({ layout: 'inline' });
      expect(wrapper.find('.t-form').classes()).includes('t-form-inline');
    });

    // it(':colon', async () => {
    //   expect(window.getComputedStyle(wrapper.find('label').element, '::after').content).toBe('none');

    //   await wrapper.setProps({ colon: true });
    //   expect(window.getComputedStyle(wrapper.find('label').element, '::after').content).toBe('":"');
    // });

    it(':showErrorMessage', async () => {
      const rules = {
        name: [{ required: true }],
      };
      const formData = {
        name: '',
      };

      const wrapper = mount({
        render() {
          return (
            <Form rules={rules} data={formData}>
              <FormItem label="name" name="name">
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-input__extra').exists()).toBe(true);

      await wrapper.setProps({ showErrorMessage: false });
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-input__extra').exists()).toBe(false);
    });

    it(':disabled', async () => {
      expect(wrapper.find('.t-input').classes()).not.includes('t-is-disabled');

      await wrapper.setProps({ disabled: true });
      expect(wrapper.find('.t-input').classes()).includes('t-is-disabled');
    });

    it(':resetType', async () => {
      const rules = {
        name: [{ required: true }],
      };
      const formData = {
        name: 'defaultName',
      };

      const wrapper = mount({
        render() {
          return (
            <Form rules={rules} data={formData}>
              <FormItem label="name" name="name">
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });

      const form = wrapper.findComponent(Form);

      expect(form.vm.data.name).toBe('defaultName');
      form.vm.$.exposed.reset();
      expect(form.vm.data.name).toBe('');

      await wrapper.setProps({ resetType: 'initial' });
      form.vm.$.exposed.reset();
      expect(form.vm.data.name).toBe('defaultName');
    });

    it(':statusIcon', async () => {
      const rules = {
        name: [{ required: true }],
      };
      const formData = {
        name: '',
      };

      const getStatusIcon = () => <Icon name="help-circle" size="16px" style={{ color: '#0006' }} />;

      const wrapper = mount({
        render() {
          return (
            <Form rules={rules} data={formData}>
              <FormItem label="name" name="name">
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });

      const form = wrapper.findComponent(Form);
      await form.vm.$.exposed.validate();
      expect(form.find('.t-form__status').exists()).toBe(false);

      await wrapper.setProps({ statusIcon: true });
      await form.vm.$.exposed.validate();
      expect(form.find('.t-form__status').exists()).toBe(true);

      await wrapper.setProps({ statusIcon: getStatusIcon });
      await form.vm.$.exposed.validate();
      expect(form.find('svg.t-icon-help-circle').exists()).toBe(true);
    });
  });

  // test events
  // describe('@event', () => {});

  // test slots
  // describe('<slot>', () => {
  //   it('', () => {});
  // });

  // test exposure function
  // describe('function', () => {
  //   it('', () => {});
  // });
});
