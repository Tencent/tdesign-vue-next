import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { expect } from 'vitest';
import { CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { FormItem, Form, Input } from '@tdesign/components';
import formItemProps from '@tdesign/components/form/form-item-props';

describe('FormItem', () => {
  describe('props', () => {
    it('for[string]', () => {
      const wrapper = mount(
        <Form>
          <FormItem label="label" name="name" for="name">
            <Input />
          </FormItem>
        </Form>,
      );

      expect(wrapper.find('label').attributes()).toMatchObject({ for: 'name' });
    });

    it('help[string]', () => {
      const wrapper = mount(
        <Form>
          <FormItem label="label" name="name" help="help text">
            <Input />
          </FormItem>
        </Form>,
      );
      expect(wrapper.find('.t-input__help').text()).toBe('help text');
    });

    it('help[slot/function]', () => {
      const wrapperSlot = mount(
        <Form>
          <FormItem label="label" name="name" v-slots={{ help: () => 'help text' }}>
            <Input />
          </FormItem>
        </Form>,
      );
      expect(wrapperSlot.find('.t-input__help').text()).toBe('help text');

      const renderHelp = () => <CheckCircleFilledIcon />;
      const wrapperFunction = mount(
        <Form>
          <FormItem label="label" name="name" help={renderHelp}>
            <Input />
          </FormItem>
        </Form>,
      );
      expect(wrapperFunction.findComponent(CheckCircleFilledIcon).exists()).toBe(true);
    });

    it('label[string]', () => {
      const wrapper = mount(
        <Form>
          <FormItem label="label" name="name">
            <Input />
          </FormItem>
        </Form>,
      );
      expect(wrapper.find('label').text()).toBe('label');
    });

    it('label[slot/function]', () => {
      const wrapperSlot = mount(
        <Form>
          <FormItem name="name" v-slots={{ label: () => 'label' }}>
            <Input />
          </FormItem>
        </Form>,
      );
      expect(wrapperSlot.find('label').text()).toBe('label');

      const renderHelp = () => <CheckCircleFilledIcon />;
      const wrapperFunction = mount(
        <Form>
          <FormItem name="name" label={renderHelp}>
            <Input />
          </FormItem>
        </Form>,
      );
      expect(wrapperFunction.find('label').findComponent(CheckCircleFilledIcon).exists()).toBe(true);
    });

    it('labelAlign[string]', () => {
      mount(
        <FormItem label="label" name="name">
          <Input />
        </FormItem>,
      );

      const validator = formItemProps.labelAlign.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      const getWrapper = (align?: 'left' | 'right' | 'top') =>
        mount(
          <Form label-align="right">
            <FormItem label="label" name="name" labelAlign={align}>
              <Input />
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
              <Input />
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
                <Input />
              </FormItem>
            </Form>
          );
        },
      });

      const form = wrapper.findComponent(Form);
      await form.vm.$.exposed.validate();

      expect(wrapper.find('.t-input__extra').text()).toBe('name is required');
    });

    it.todo('requiredMark[boolean]');

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
      expect(wrapper.find('.t-input__extra').exists()).toBe(false);
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
      expect(classes.length).toBe(1);
      expect(classes[0]).toBe('t-form__controls');

      for (const status of ['error', 'warning', 'success'] as const) {
        const wrapper = getWrapper(status);
        await wrapper.findComponent(Form).vm.$.exposed.validate();
        const classes = wrapper.find('.t-form__controls').classes();
        expect(classes.length).toBe(status === 'success' ? 3 : 2);
        expect(classes[1]).toBe(`t-is-${status}`);
        if (status === 'success') {
          expect(classes[2]).toBe('t-form--success-border');
        }
      }
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
      expect(wrapper.findComponent(CloseCircleFilledIcon).exists()).toBe(false);
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
      expect(slotWrapper.findComponent(CheckCircleFilledIcon).exists()).toBe(true);

      const renderIcon = () => <CheckCircleFilledIcon />;
      const functionWrapper = mount(
        <Form rules={rules} data={formData} statusIcon={false}>
          <FormItem label="name" name="name" statusIcon={renderIcon}>
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );
      await functionWrapper.findComponent(Form).vm.$.exposed.validate();
      expect(functionWrapper.findComponent(CheckCircleFilledIcon).exists()).toBe(true);
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
      expect(wrapper.find('.t-input--success').exists()).toBe(false);
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
      expect(wrapper.find('.t-form-item-tips').exists()).toBe(true);
      const classes = wrapper.find('.t-form-item-tips').classes();
      expect(classes).toContain('t-is-default');
      expect(wrapper.find('.t-form-item-tips').text()).toBe(tips);
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
      expect(slotWrapper.find('.t-form-item-tips').text()).toBe(tips);

      const renderIcon = () => <CheckCircleFilledIcon />;
      const functionWrapper = mount(
        <Form rules={rules} data={formData}>
          <FormItem label="name" name="name" tips={renderIcon}>
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );
      expect(slotWrapper.find('.t-form-item-tips').text()).toBe(tips);
      expect(functionWrapper.find('.t-form-item-tips').findComponent(CheckCircleFilledIcon).exists()).toBe(true);
    });
  });

  describe('scenarios', () => {
    describe('--last', () => {
      // 借 `t-form-item__{name}` 反解出被标记为末位的表单项，避免断言依赖 DOM 顺序
      const getLastItemNames = (wrapper: VueWrapper<any>) =>
        wrapper.findAll('.t-form__item--last').map((item) =>
          item
            .classes()
            .find((name) => name.startsWith('t-form-item__'))
            ?.slice('t-form-item__'.length),
        );

      it('标记直接子元素中的末位表单项', async () => {
        const wrapper = mount(
          <Form>
            <FormItem name="a" />
            <FormItem name="b" />
          </Form>,
        );
        await flushPromises();

        expect(getLastItemNames(wrapper)).toEqual(['b']);
      });

      it('按父容器分组，各自标记末位表单项', async () => {
        const wrapper = mount(
          <Form>
            <div>
              <FormItem name="a" />
              <FormItem name="b" />
            </div>
            <div>
              <FormItem name="c" />
              <FormItem name="d" />
            </div>
          </Form>,
        );
        await flushPromises();

        expect(getLastItemNames(wrapper)).toEqual(['b', 'd']);
      });

      it('未设置 name 的表单项不参与末位判定', async () => {
        const wrapper = mount(
          <Form>
            <FormItem name="a" />
            <FormItem name="b" />
            <FormItem>
              <button type="submit">提交</button>
            </FormItem>
          </Form>,
        );
        await flushPromises();

        expect(getLastItemNames(wrapper)).toEqual(['b']);
      });

      it('inline 布局下不标记末位表单项', async () => {
        const wrapper = mount(
          <Form layout="inline">
            <FormItem name="a" />
            <FormItem name="b" />
          </Form>,
        );
        await flushPromises();

        expect(getLastItemNames(wrapper)).toEqual([]);
      });

      it('末位表单项被移除后重新标记', async () => {
        const wrapper = mount(
          defineComponent({
            data() {
              return { names: ['a', 'b'] };
            },
            render() {
              return (
                <Form>
                  {this.names.map((name) => (
                    <FormItem key={name} name={name} />
                  ))}
                </Form>
              );
            },
          }),
        );
        await flushPromises();
        expect(getLastItemNames(wrapper)).toEqual(['b']);

        wrapper.vm.names = ['a'];
        await flushPromises();

        expect(getLastItemNames(wrapper)).toEqual(['a']);
      });
    });
  });
});
