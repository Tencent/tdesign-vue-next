import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { FormItem, Form, Input } from '@tdesign/components';
import FormItemProps from '@tdesign/components/form/form-item-props';

describe('FormItem', () => {
  describe('props', () => {
    it('for[string]', () => {
      const wrapper = mount(
        <Form>
          <FormItem label="label" name="name" for="name">
            <Input id="name" />
          </FormItem>
        </Form>,
      );

      expect(wrapper.find('label').attributes()).toMatchObject({ for: 'name' });
    });

    it('help[string]', () => {
      const wrapper = mount(
        <Form>
          <FormItem label="label" name="name" help="help text">
            <Input id="name" />
          </FormItem>
        </Form>,
      );
      expect(wrapper.find('.t-input__help').text()).toBe('help text');
    });

    it('help[slot/function]', () => {
      const wrapperSlot = mount(
        <Form>
          <FormItem label="label" name="name" v-slots={{ help: () => 'help text' }}>
            <Input id="name" />
          </FormItem>
        </Form>,
      );
      expect(wrapperSlot.find('.t-input__help').text()).toBe('help text');

      const renderHelp = () => <CheckCircleFilledIcon />;
      const wrapperFunction = mount(
        <Form>
          <FormItem label="label" name="name" help={renderHelp}>
            <Input id="name" />
          </FormItem>
        </Form>,
      );
      expect(wrapperFunction.findComponent(CheckCircleFilledIcon).exists()).toBe(true);
    });

    it('label[string]', () => {
      const wrapper = mount(
        <Form>
          <FormItem label="label" name="name">
            <Input id="name" />
          </FormItem>
        </Form>,
      );
      expect(wrapper.find('label').text()).toBe('label');
    });

    it('label[slot/function]', () => {
      const wrapperSlot = mount(
        <Form>
          <FormItem name="name" v-slots={{ label: () => 'label' }}>
            <Input id="name" />
          </FormItem>
        </Form>,
      );
      expect(wrapperSlot.find('label').text()).toBe('label');

      const renderHelp = () => <CheckCircleFilledIcon />;
      const wrapperFunction = mount(
        <Form>
          <FormItem name="name" label={renderHelp}>
            <Input id="name" />
          </FormItem>
        </Form>,
      );
      expect(wrapperFunction.find('label').findComponent(CheckCircleFilledIcon).exists()).toBe(true);
    });

    it('labelAlign[string]', () => {
      const formItemWrapper = mount(
        <FormItem label="label" name="name">
          <Input id="name" />
        </FormItem>,
      );

      const validator = (formItemWrapper.vm.$options.props as typeof FormItemProps)?.labelAlign.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      const getWrapper = (align?: 'left' | 'right' | 'top') =>
        mount(
          <Form label-align="right">
            <FormItem label="label" name="name" labelAlign={align}>
              <Input id="name" />
            </FormItem>
          </Form>,
        );

      (['left', 'right', 'top'] as const).forEach((align) => {
        expect(getWrapper(align).find('.t-form__label').classes(`t-form__label--${align}`)).toBe(true);
      });
    });

    it('labelWidth[string/number]', async () => {
      const getWrapper = (labelWidth: string | number) =>
        mount(
          <Form label-width="100px">
            <FormItem label="label" name="name" labelWidth={labelWidth}>
              <Input id="name" />
            </FormItem>
          </Form>,
        );
      const element = getWrapper('200px').find('.t-form__label').element as HTMLElement;
      expect(element.style.width).toBe('200px');
      expect(getWrapper(0).find('.t-form__label').exists()).toBe(false);
    });

    it('name[string]', async () => {
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

    it('requiredMark[bookean]', () => {});

    it('rules[array]', async () => {
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

    it('showErrorMessage[boolean]', async () => {
      const rules = { name: [{ required: true, message: '姓名必填' }] };
      const formData = { name: '' };

      const wrapper = mount(
        <Form rules={rules} data={formData} showErrorMessage>
          <FormItem label="name" name="name" showErrorMessage={false}>
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-input__extra').exists()).eq(false);
    });

    it('status[string]', async () => {
      const rules = { name: [{ required: true, message: '姓名必填' }] };
      const formData = { name: '' };
      const getWrapper = (status?: 'error' | 'warning' | 'success') =>
        mount(
          <Form rules={rules} data={formData}>
            <FormItem label="name" name="name" status={status}>
              <Input v-model={formData.name} />
            </FormItem>
          </Form>,
        );
      const classes = getWrapper().find('.t-form__controls').classes();
      expect(classes.length).eq(1);
      expect(classes[0]).eq('t-form__controls');

      (['error', 'warning', 'success'] as const).forEach(async (status) => {
        const wrapper = getWrapper(status);
        await wrapper.findComponent(Form).vm.$.exposed.validate();
        const classes = wrapper.find('.t-form__controls').classes();
        expect(classes.length).eq(status === 'success' ? 3 : 2);
        expect(classes[1]).eq(`t-is-${status}`);
        status === 'success' && expect(classes[2]).eq('t-form--success-border');
      });
    });

    it('statusIcon[boolean]', async () => {
      const rules = { name: [{ required: true, message: '姓名必填' }] };
      const formData = { name: '' };
      const wrapper = mount(
        <Form rules={rules} data={formData} statusIcon>
          <FormItem label="name" name="name" statusIcon={false}>
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.findComponent(CloseCircleFilledIcon).exists()).eq(false);
    });

    it('statusIcon[slot/function]', async () => {
      const rules = { name: [{ required: true, message: '姓名必填' }] };
      const formData = { name: '' };
      const slotWrapper = mount(
        <Form rules={rules} data={formData} statusIcon={false}>
          <FormItem label="name" name="name" v-slots={{ statusIcon: () => <CheckCircleFilledIcon /> }}>
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );
      await slotWrapper.findComponent(Form).vm.$.exposed.validate();
      expect(slotWrapper.findComponent(CheckCircleFilledIcon).exists()).eq(true);

      const renderIcon = () => <CheckCircleFilledIcon />;
      const functionWrapper = mount(
        <Form rules={rules} data={formData} statusIcon={false}>
          <FormItem label="name" name="name" statusIcon={renderIcon}>
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );
      await functionWrapper.findComponent(Form).vm.$.exposed.validate();
      expect(functionWrapper.findComponent(CheckCircleFilledIcon).exists()).eq(true);
    });

    it('successBorder[boolean]', async () => {
      const rules = { name: [{ required: true, message: '姓名必填' }] };
      const formData = { name: '' };
      const wrapper = mount(
        <Form rules={rules} data={formData}>
          <FormItem label="name" name="name">
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-input--success').exists()).eq(false);
    });

    it('tips[boolean]', async () => {
      const rules = { name: [{ required: true, message: '姓名必填' }] };
      const formData = { name: '' };
      const tips = '测试 tip';
      const wrapper = mount(
        <Form rules={rules} data={formData}>
          <FormItem label="name" name="name" tips={tips}>
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-form-item-tips').exists()).eq(true);
      const classes = wrapper.find('.t-form-item-tips').classes();
      expect(classes).toContain('t-is-default');
      expect(wrapper.find('.t-form-item-tips').text()).eq(tips);
    });

    it('tips[slot/function]', async () => {
      const rules = { name: [{ required: true, message: '姓名必填' }] };
      const formData = { name: '' };
      const tips = '测试 tip';
      const slotWrapper = mount(
        <Form rules={rules} data={formData}>
          <FormItem label="name" name="name" v-slots={{ tips: () => tips }}>
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );
      expect(slotWrapper.find('.t-form-item-tips').text()).eq(tips);

      const renderIcon = () => <CheckCircleFilledIcon />;
      const functionWrapper = mount(
        <Form rules={rules} data={formData}>
          <FormItem label="name" name="name" tips={renderIcon}>
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );
      expect(slotWrapper.find('.t-form-item-tips').text()).eq(tips);
      expect(functionWrapper.find('.t-form-item-tips').findComponent(CheckCircleFilledIcon).exists()).eq(true);
    });
  });
});
