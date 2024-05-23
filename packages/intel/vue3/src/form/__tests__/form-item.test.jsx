import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { Form, FormItem, Input } from 'tdesign-vue-next';

describe('formItem', () => {
  describe(':props', () => {
    it(':for', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" for="name">
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find('label').attributes()).toMatchObject({ for: 'name' });
    });

    it(':help', () => {
      let wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" help="help text">
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find('.t-input__help').text()).toBe('help text');

      wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" v-slots={{ help: () => 'help text' }}>
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find('.t-input__help').text()).toBe('help text');

      wrapper = mount({
        setup(_, { slots }) {
          const renderHelp = () => <CheckCircleFilledIcon />;

          return () => (
            <Form>
              <FormItem label="label" name="name" help={renderHelp}>
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.findComponent(CheckCircleFilledIcon).exists()).toBe(true);
    });

    it(':label', () => {
      let wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name">
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find('label').text()).toBe('label');

      wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem name="name" v-slots={{ label: () => 'label' }}>
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find('label').text()).toBe('label');

      wrapper = mount({
        setup(_, { slots }) {
          const renderHelp = () => <CheckCircleFilledIcon />;

          return () => (
            <Form>
              <FormItem name="name" label={renderHelp}>
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find('label').findComponent(CheckCircleFilledIcon).exists()).toBe(true);
    });

    it(':labelAlign', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form label-align="right">
              <FormItem label="label" name="name" labelAlign="left">
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find('.t-form__label').classes('t-form__label--left')).toBe(true);
    });

    it(':labelWidth', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form label-width="100px">
              <FormItem label="label" name="name" labelWidth="200px">
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find('.t-form__label').element.style.width).toBe('200px');
    });

    it(':name', async () => {
      const wrapper = mount({
        setup() {
          const rules = {
            name: [{ required: true, message: 'name is required' }],
            age: [{ required: true, message: 'age is required' }],
          };

          return () => (
            <Form rules={rules}>
              <FormItem label="label" name="name">
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      const form = wrapper.findComponent(Form);
      await form.vm.$.exposed.validate();

      expect(wrapper.find('.t-input__extra').text()).toBe('name is required');
    });

    it(':rules', async () => {
      const wrapper = mount({
        setup() {
          const rules = {
            url: [{ required: true, message: 'name is required' }],
          };
          const itemRules = [
            {
              url: {
                protocols: ['http', 'https', 'ftp'],
                require_protocol: true,
              },
              message: 'url is invalid',
            },
          ];

          const data = {
            url: 'hello',
          };

          return () => (
            <Form rules={rules} data={data}>
              <FormItem label="label" name="url" rules={itemRules}>
                <Input value={data.url} />
              </FormItem>
            </Form>
          );
        },
      });

      const form = wrapper.findComponent(Form);
      await form.vm.$.exposed.validate();

      expect(wrapper.find('.t-input__extra').text()).toBe('url is invalid');
    });

    it(':showErrorMessage', async () => {
      const rules = {
        name: [{ required: true, message: '姓名必填' }],
      };
      const formData = {
        name: '',
      };

      const wrapper = mount({
        setup() {
          return () => (
            <Form rules={rules} data={formData} showErrorMessage>
              <FormItem label="name" name="name" showErrorMessage={false}>
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-input__extra').exists()).eq(false);
    });

    it(':statusIcon', async () => {
      const rules = {
        name: [{ required: true, message: '姓名必填' }],
      };
      const formData = {
        name: '',
      };

      let wrapper = mount({
        setup() {
          return () => (
            <Form rules={rules} data={formData} statusIcon>
              <FormItem label="name" name="name" statusIcon={false}>
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.findComponent(CloseCircleFilledIcon).exists()).eq(false);

      wrapper = mount({
        setup() {
          return () => (
            <Form rules={rules} data={formData} statusIcon={false}>
              <FormItem label="name" name="name" v-slots={{ statusIcon: () => <CheckCircleFilledIcon /> }}>
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.findComponent(CheckCircleFilledIcon).exists()).eq(true);

      wrapper = mount({
        setup() {
          const renderIcon = () => <CheckCircleFilledIcon />;
          return () => (
            <Form rules={rules} data={formData} statusIcon={false}>
              <FormItem label="name" name="name" statusIcon={renderIcon}>
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.findComponent(CheckCircleFilledIcon).exists()).eq(true);
    });

    it(':successBorder', async () => {
      const rules = {
        name: [{ required: true, message: '姓名必填' }],
      };
      const formData = {
        name: '',
      };

      const wrapper = mount({
        setup() {
          return () => (
            <Form rules={rules} data={formData}>
              <FormItem label="name" name="name">
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-input--success').exists()).eq(false);
    });
  });
});
