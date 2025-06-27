import { nextTick, ref, Fragment } from 'vue';
import type { Ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { CheckCircleFilledIcon, CloseCircleFilledIcon, InfoCircleIcon } from 'tdesign-icons-vue-next';
import { omit, isObject } from 'lodash-es';
import { FormItem, Form, Input, Switch, InputNumber } from '@tdesign/components';
import FormProps from '@tdesign/components/form/props';
import { FormRules, Data, TdFormProps } from '@tdesign/components/form/type';
import { sleep } from '@tdesign/internal-utils';

describe('Form', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Form>> | null = null;
    beforeEach(() => {
      wrapper = mount(
        <Form>
          <FormItem label="姓名" name="name">
            <Input placeholder="请输入内容" />
          </FormItem>
          <FormItem label="接收短信" name="status">
            <Switch />
          </FormItem>
        </Form>,
      ) as VueWrapper<InstanceType<typeof Form>>;
    });

    it(':colon[boolean]', async () => {
      expect(wrapper.find('.t-form__label').element.children.length).eq(1);

      await wrapper.setProps({ colon: true });
      expect(wrapper.find('.t-form__label').element.childNodes[1].textContent).eq('：');
    });

    it(':data[object]', async () => {});

    it(':disabled[boolean]', async () => {
      expect(wrapper.find('.t-input').classes('t-is-disabled')).eq(false);

      await wrapper.setProps({ disabled: true });
      expect(wrapper.find('.t-input').classes('t-is-disabled')).eq(true);
    });

    it(':errorMessage[object]', async () => {});

    it(':id[string]', async () => {
      expect(wrapper.find('.t-form').attributes('id')).eq(undefined);
      const id = 'tdesign';
      await wrapper.setProps({ id });
      expect(wrapper.find('.t-form').attributes('id')).eq(id);
    });

    it(':labelAlign[string]', async () => {
      const validator = (wrapper.vm.$options.props as typeof FormProps)?.labelAlign.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      expect(wrapper.find('.t-form__label').classes('t-form__label--right')).eq(true);

      await wrapper.setProps({ labelAlign: 'top' });
      expect(wrapper.find('.t-form__label').classes('t-form__label--top')).eq(true);

      await wrapper.setProps({ labelAlign: 'left' });
      expect(wrapper.find('.t-form__label').classes('t-form__label--left')).eq(true);
    });

    it(':labelWidth[string/number]', async () => {
      expect((wrapper.find('.t-form__label').element as HTMLElement).style.width).eq('100px');
      expect((wrapper.find('.t-form__controls').element as HTMLElement).style.marginLeft).eq('100px');

      await wrapper.setProps({ labelWidth: '200px' });
      expect((wrapper.find('.t-form__label').element as HTMLElement).style.width).eq('200px');
      expect((wrapper.find('.t-form__controls').element as HTMLElement).style.marginLeft).eq('200px');

      await wrapper.setProps({ labelWidth: 300 });
      expect((wrapper.find('.t-form__label').element as HTMLElement).style.width).eq('300px');
      expect((wrapper.find('.t-form__controls').element as HTMLElement).style.marginLeft).eq('300px');
    });

    it(':layout[vertical/inline]', async () => {
      const validator = (wrapper.vm.$options.props as typeof FormProps)?.layout.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      expect(wrapper.find('.t-form').classes('t-form-inline')).eq(false);

      await wrapper.setProps({ layout: 'inline' });
      expect(wrapper.find('.t-form').classes('t-form-inline')).eq(true);
    });

    it(':preventSubmitDefault[boolean]', async () => {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');
      await wrapper.element.dispatchEvent(submitEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
      preventDefaultSpy.mockRestore();

      await wrapper.setProps({ preventSubmitDefault: false });
      await wrapper.element.dispatchEvent(submitEvent);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it(':readonly[boolean]', async () => {
      expect(wrapper.find('.t-input').classes('t-is-readonly')).eq(false);

      await wrapper.setProps({ readonly: true });
      expect(wrapper.find('.t-input').classes('t-is-readonly')).eq(true);

      // todo
      // 更进一步可以模拟点击和键盘行为，然后看只读下是否无法输入
    });

    it(':requiredMark[boolean] + requiredMarkPosition[left/right]', async () => {
      const validator = (wrapper.vm.$options.props as typeof FormProps)?.requiredMarkPosition.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      const rules = { name: [{ required: true, message: '姓名必填' }] };
      await wrapper.setProps({ rules });
      // TODO:JSDOM 不支持伪元素样式的获取，调用 getComputedStyle(el, '::before') 会报错 Not implemented，那怎么测呢
      // const label = wrapper.find('.t-form-item__name').element;
      // expect(getComputedStyle(label, '::before').content).toBe('"*"');
    });

    it(':resetType[empty/initial]', async () => {
      const rules = { name: [{ required: true }] };
      const formData = ref({ name: 'defaultName' });
      const wrapper = mount(
        <Form rules={rules} data={formData.value}>
          <FormItem label="name" name="name">
            <Input v-model={formData.value.name} />
          </FormItem>
        </Form>,
      );

      const validator = (wrapper.vm.$options.props as typeof FormProps)?.resetType.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      const form = wrapper.findComponent(Form);
      expect(formData.value.name).eq('defaultName');
      form.vm.$.exposed.reset();
      expect(formData.value.name).eq('');

      await wrapper.setProps({ resetType: 'initial' });
      form.vm.$.exposed.reset();
      expect(formData.value.name).eq('defaultName');
    });

    describe('rules[object]', () => {
      let wrapper: VueWrapper;
      let rules: any; // TODO
      let formData: Ref<Record<string, any>>;
      let form: VueWrapper;
      let onValidate;

      beforeEach(() => {
        rules = ref();
        formData = ref({
          name: '',
          time: undefined,
        });
        onValidate = vi.fn();
        wrapper = mount(Form, {
          attachTo: document.body,
          props: { rules, data: formData, onValidate },
          slots: {
            default: () => (
              <Fragment>
                <FormItem label="name" name="name">
                  <InputNumber v-model={formData.value.name} />
                </FormItem>
                <FormItem label="radio" name="radio"></FormItem>
                <FormItem label="time" name="time"></FormItem>
              </Fragment>
            ),
          },
        });
        form = wrapper.findComponent(Form);
      });

      const validate = async (...args: any) => {
        const res = await form.vm.$.exposed.validate(args);
        return res;
      };

      const reset = (...args: any) => {
        form.vm.$.exposed.reset(args);
      };

      const expectToFailure = (res: any) => {
        expect(isObject(res)).toBe(true);
      };

      const expectToSuccess = (res: any) => {
        expect(res).toBe(true);
      };

      it('boolean', async () => {
        rules.value = { radio: [{ boolean: true }] };

        formData.value.radio = 'true';
        let res = await validate();
        expectToFailure(res);

        formData.value.radio = true;
        res = await validate();
        expectToSuccess(res);
      });

      it('date', async () => {
        rules.value = { time: [{ date: true }] };

        formData.value.time = '123';
        let res = await validate();
        expectToFailure(res);

        formData.value.time = new Date();
        res = await validate();
        expectToSuccess(res);

        rules.value = { time: [{ date: { delimiters: ['-', '/'] } }] };
        formData.value.time = '2022.10.24';
        res = await validate();
        expectToFailure(res);

        formData.value.time = '2022-10-24';
        res = await validate();
        expectToSuccess(res);
      });

      it('email', async () => {
        rules.value = { name: [{ email: true }] };

        formData.value.name = '123.com';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'test@gmail.com';
        res = await validate();
        expectToSuccess(res);
      });

      it('enum', async () => {
        rules.value = { name: [{ enum: ['primary', 'info', 'warning'] }] };

        formData.value.name = '123';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'info';
        res = await validate();
        expectToSuccess(res);
      });

      it('idcard', async () => {
        rules.value = { name: [{ idcard: true }] };

        formData.value.name = '123456789012345678';
        let res = await validate();
        expectToSuccess(res);

        formData.value.name = '12345678901234567x';
        res = await validate();
        expectToSuccess(res);

        formData.value.name = '123456789012345';
        res = await validate();
        expectToSuccess(res);
      });

      it('len', async () => {
        rules.value = { name: [{ len: 7 }] };

        formData.value.name = '12345';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = '1234567';
        res = await validate();
        expectToSuccess(res);

        formData.value.name = 'success';
        res = await validate();
        expectToSuccess(res);
      });

      it('max', async () => {
        rules.value = { name: [{ max: 7 }] };

        formData.value.name = 'failure!';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'success';
        res = await validate();
        expectToSuccess(res);

        formData.value.name = '12345';
        res = await validate();
        expectToSuccess(res);
      });

      it('min', async () => {
        rules.value = { name: [{ min: 5 }] };

        formData.value.name = 'fail';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'success';
        res = await validate();
        expectToSuccess(res);

        formData.value.name = '12345';
        res = await validate();
        expectToSuccess(res);
      });

      it('message', async () => {
        rules.value = { name: [{ required: true, message: 'custom error message' }] };
        await validate();
        expect(form.find('.t-input__extra').text()).toBe('custom error message');
      });

      it('number', async () => {
        rules.value = { name: [{ number: true }] };

        formData.value.name = 'fail';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 123.4;
        res = await validate();
        expectToSuccess(res);

        formData.value.name = 0x123;
        res = await validate();
        expectToSuccess(res);

        formData.value.name = 0o110;
        res = await validate();
        expectToSuccess(res);

        formData.value.name = 0b110;
        res = await validate();
        expectToSuccess(res);

        formData.value.name = 1e5;
        res = await validate();
        expectToSuccess(res);
      });

      it('pattern', async () => {
        rules.value = { name: [{ pattern: /@qq.com/ }] };

        formData.value.name = 'test@fail.com';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'test@qq.com';
        res = await validate();
        expectToSuccess(res);
      });

      it('required', async () => {
        rules.value = { name: [{ required: true }] };

        formData.value.name = '';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'test';
        res = await validate();
        expectToSuccess(res);
      });

      it('telnumber', async () => {
        rules.value = { name: [{ telnumber: true }] };

        formData.value.name = '19999';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = '15333333333';
        res = await validate();
        expectToSuccess(res);
      });

      it('trigger', async () => {
        rules.value = { name: [{ required: true, trigger: 'change' }] };

        formData.value.name = 'test';
        formData.value.name = undefined;
        await sleep(16);
        expect(form.find('.t-input__extra').exists()).toBe(true);

        await reset();
        await nextTick();
        rules.value = { name: [{ required: true, trigger: 'blur' }] };
        await form.findComponent(Input).vm.$.exposed.focus();
        await form.findComponent(Input).vm.$.exposed.blur();
        await sleep(16);
        expect(form.find('.t-input__extra').exists()).toBe(true);

        await reset();
        await nextTick();
        rules.value = { name: [{ required: true, trigger: 'submit' }] };
        await form.trigger('submit');
        await sleep(16);
        expect(form.find('.t-input__extra').exists()).toBe(true);
      });

      it('type', async () => {
        rules.value = { name: [{ required: true, type: 'error' }] };
        await validate();
        expect(form.find('.t-is-error').exists()).toBe(true);

        rules.value = { name: [{ required: true, type: 'warning' }] };
        await validate();
        expect(form.find('.t-is-warning').exists()).toBe(true);
      });
      it('url', async () => {
        rules.value = { name: [{ url: true }] };
        formData.value.name = 'test';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'tdesign.tencent.com/vue-next';
        res = await validate();
        expectToSuccess(res);
      });
      it('validator', async () => {
        const isNumber = (val: any) => typeof val === 'number';
        rules.value = { name: [{ validator: (val: any) => isNumber(val) }] };
        formData.value.name = 'string';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 123;
        res = await validate();
        expectToSuccess(res);
      });

      it('whitespace', async () => {
        rules.value = { name: [{ whitespace: true }] };
        formData.value.name = ' ';
        let res = await validate();
        expectToFailure(res);
        formData.value.name = '';
        res = await validate();
        expectToSuccess(res);
      });
    });

    it(':scrollToFirstError[smooth/auto]', async () => {
      const validator = (wrapper.vm.$options.props as typeof FormProps)?.scrollToFirstError.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      // TODO 怎么测表现呢？
    });

    it(':showErrorMessage[boolean]', async () => {
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
      expect(wrapper.find('.t-input__extra').text()).eq('姓名必填');

      await wrapper.setProps({ showErrorMessage: false });
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-input__extra').exists()).eq(false);
    });

    it(':statusIcon[boolean]', async () => {
      const rules = { name: [{ required: true }] };
      const formData = ref({ name: '' });

      const wrapper = mount(
        <Form rules={rules} data={formData.value}>
          <FormItem label="name" name="name">
            <Input v-model={formData.value.name} />
          </FormItem>
        </Form>,
      );

      const form = wrapper.findComponent(Form);
      await form.vm.$.exposed.validate();
      expect(form.find('.t-form__status').exists()).eq(false);

      await wrapper.setProps({ statusIcon: true });
      await form.vm.$.exposed.validate();
      expect(form.findComponent(CloseCircleFilledIcon).exists()).eq(true);
      formData.value.name = 'test';
      await form.vm.$.exposed.validate();
      expect(form.findComponent(CheckCircleFilledIcon).exists()).eq(true);

      await wrapper.setProps({ statusIcon: () => <InfoCircleIcon /> });
      await form.vm.$.exposed.validate();
      expect(form.findComponent(InfoCircleIcon).exists()).eq(true);
    });

    it(':statusIcon[slot]', async () => {
      const rules = { name: [{ required: true }] };
      const formData = ref({ name: '' });
      const wrapper = mount(
        <Form rules={rules} data={formData.value} v-slots={{ statusIcon: () => <InfoCircleIcon /> }}>
          <FormItem label="name" name="name">
            <Input v-model={formData.value.name} />
            {formData.value.name}
          </FormItem>
        </Form>,
      );
      const form = wrapper.findComponent(Form);
      await form.vm.$.exposed.validate();
      expect(form.findComponent(InfoCircleIcon).exists()).eq(true);
    });
  });

  describe('events', () => {
    it('validate', async () => {
      const rules = {
        name: [{ required: true, message: '姓名必填' }],
        age: [{ required: true }],
      };
      const data = ref({
        name: '',
        age: undefined,
      });
      const onValidate = vi.fn();

      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          onValidate,
          rules,
          data,
        },
        slots: {
          default: () => (
            <Fragment>
              <FormItem label="name" name="name">
                <Input v-model={data.value.name} />
              </FormItem>
              <FormItem label="age" name="age">
                <InputNumber v-model={data.value.age} />
              </FormItem>
            </Fragment>
          ),
        },
      });
      const form = wrapper.findComponent(Form);
      expect(onValidate).not.toBeCalled();

      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate.mock.calls[0][0]).toMatchSnapshot();

      form.vm.$.exposed.submit();
      await sleep(16);
      expect(onValidate).toHaveBeenCalledTimes(2);
      expect(onValidate.mock.calls[1][0]).toMatchSnapshot();

      data.value.name = 'test';
      await form.vm.$.exposed.validate();
      expect(onValidate.mock.calls[2][0]).toMatchSnapshot();

      data.value.age = 18;
      await form.vm.$.exposed.validate();
      expect(onValidate.mock.calls[3][0]).toMatchSnapshot();
    });

    it('submit', async () => {
      const onSubmit = vi.fn();
      const onValidate = vi.fn();

      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          onSubmit,
          onValidate,
        },
      });

      const form = wrapper.findComponent(Form);
      expect(onSubmit).not.toBeCalled();

      await form.trigger('submit');
      await sleep(16);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0].e).toBeInstanceOf(Event);
      expect(omit(onSubmit.mock.calls[0][0], 'e')).toMatchSnapshot();
    });

    it('reset', async () => {
      const onReset = vi.fn();
      const rules = {
        name: [{ required: true }],
      };
      const data = {
        name: '',
      };

      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          onReset,
          rules,
          data,
        },
        slots: {
          default: () => (
            <FormItem label="name" name="name">
              <Input v-model={data.name} />
            </FormItem>
          ),
        },
      });

      const form = wrapper.findComponent(Form);
      expect(onReset).not.toBeCalled();

      await form.trigger('reset');
      expect(onReset).toHaveBeenCalledTimes(1);
      expect(onReset.mock.calls[0][0].e).toBeInstanceOf(Event);
    });
  });

  describe('instanceFunctions', () => {
    let wrapper: VueWrapper;
    let form: VueWrapper;
    let data: Ref<Record<string, any>>;
    let rules: FormRules<Data>;
    let onValidate: TdFormProps['onValidate'];
    let onSubmit: TdFormProps['onSubmit'];
    let onReset: TdFormProps['onReset'];

    beforeEach(() => {
      rules = {
        name: [{ required: true, message: '姓名必填', trigger: 'blur' }],
        age: [{ required: true, trigger: 'blur' }],
      };
      data = ref({
        name: '',
        age: undefined,
      });
      onValidate = vi.fn();
      onSubmit = vi.fn();
      onReset = vi.fn();

      wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          rules,
          data,
          statusIcon: true,
          onValidate,
          onSubmit,
          onReset,
        },
        slots: {
          default: () => (
            <Fragment>
              <FormItem label="name" name="name">
                <Input v-model={data.value.name} />
              </FormItem>
              <FormItem label="age" name="age">
                <InputNumber v-model={data.value.age} />
              </FormItem>
            </Fragment>
          ),
        },
      });
      form = wrapper.findComponent(Form);
    });

    const checkDefaultStyle = () => {
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(0);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(0);
      expect(form.find('.t-input__extra').exists()).eq(false);
      expect(form.find('.t-form__status').exists()).eq(false);
      expect(form.find('.t-is-error').exists()).eq(false);
    };

    it('clearValidate', async () => {
      // default
      checkDefaultStyle();
      expect(onValidate).toHaveBeenCalledTimes(0);

      // validate failed
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toHaveLength(2);

      form.vm.$.exposed.clearValidate(['name']);
      await nextTick();
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(1);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toHaveLength(1);

      // clearValidate
      form.vm.$.exposed.clearValidate();
      await nextTick();
      checkDefaultStyle();

      // validate success
      data.value = {
        name: 'test',
        age: 18,
      };
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(2);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(2);
      expect(form.find('.t-input__extra').exists()).eq(false);
      expect(form.find('.t-is-error').exists()).eq(false);

      expect(onSubmit).not.toBeCalled();
      expect(onReset).not.toBeCalled();

      // clearValidate
      form.vm.$.exposed.clearValidate();
      await nextTick();
      checkDefaultStyle();
    });

    it('reset', async () => {
      let rules: FormRules<Data> = {
        name: [{ required: true, message: '姓名必填', trigger: 'blur' }],
        age: [{ required: true, trigger: 'blur' }],
      };
      const data = ref({
        name: 'test',
        age: 18,
      });
      wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          rules,
          data,
          statusIcon: true,
          onValidate,
          onSubmit,
          onReset,
        },
        slots: {
          default: () => (
            <Fragment>
              <FormItem label="name" name="name">
                <Input v-model={data.value.name} />
              </FormItem>
              <FormItem label="age" name="age">
                <InputNumber v-model={data.value.age} />
              </FormItem>
            </Fragment>
          ),
        },
      });
      form = wrapper.findComponent(Form);

      // default
      checkDefaultStyle();
      expect(onValidate).toHaveBeenCalledTimes(0);

      // set validate success style
      await form.vm.$.exposed.validate();
      expect(onSubmit).not.toBeCalled();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(2);
      expect(form.find('.t-input__extra').exists()).eq(false);
      expect(form.find('.t-is-error').exists()).eq(false);

      // reset to empty value & clear style
      form.vm.$.exposed.reset();
      await sleep(16);
      expect(onReset).toHaveBeenCalledTimes(1);
      checkDefaultStyle();
      expect(data.value).toMatchObject({ name: '', age: undefined });

      // set validate fail style
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(2);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toHaveLength(2);

      // reset to initial value & clear style
      form.vm.$.exposed.reset({ type: 'initial' });
      await sleep(16);
      expect(onReset).toHaveBeenCalledTimes(2);
      checkDefaultStyle();
      expect(data.value).toMatchObject({ name: 'test', age: 18 });

      // set validate fail style
      rules = {
        name: [{ validator: () => false, message: '姓名校验失败', trigger: 'blur' }],
        age: [{ validator: () => false, message: '年龄校验失败', trigger: 'blur' }],
      };
      await wrapper.setProps({ rules });
      await form.vm.$.exposed.validate();
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toHaveLength(2);
      // reset "name" to empty value
      form.vm.$.exposed.reset({ fields: ['name'] });
      await sleep(16);
      expect(onReset).toHaveBeenCalledTimes(3);
      expect(data.value).toMatchObject({ name: '', age: 18 });

      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(1);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toHaveLength(1);
    });

    it('setValidateMessage', async () => {
      await form.vm.$.exposed.validate();
      expect(wrapper.findAll('.t-input__extra')[0].text()).eq('姓名必填');
      expect(wrapper.findAll('.t-form__controls')[0].classes('t-is-error')).eq(true);

      form.vm.$.exposed.setValidateMessage({
        name: [{ type: 'warning', message: '自定义用户名校验信息提示' }],
      });
      await nextTick();
      expect(wrapper.findAll('.t-input__extra')[0].text()).eq('自定义用户名校验信息提示');
      expect(wrapper.findAll('.t-form__controls')[0].classes('t-is-warning')).eq(true);
    });

    it('submit', async () => {
      await form.vm.$.exposed.submit({ showErrorMessage: false });
      await sleep(16);

      expect(form.find('.t-input__extra').exists()).eq(false);
      expect(form.find('.t-is-error').exists()).eq(false);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenCalledTimes(1);

      await form.vm.$.exposed.submit({ showErrorMessage: false });
      await sleep(16);

      expect(form.findAll('.t-input__extra')).toHaveLength(0);
      expect(form.findAll('.t-is-error')).toHaveLength(0);
      expect(onSubmit).toHaveBeenCalledTimes(2);
      expect(onValidate).toHaveBeenCalledTimes(2);

      expect(onReset).not.toBeCalled();
    });

    it('validate', async () => {
      // default
      checkDefaultStyle();
      expect(onValidate).toHaveBeenCalledTimes(0);

      // validate failed
      let res = await form.vm.$.exposed.validate();
      expect(res).toMatchSnapshot();

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toHaveLength(2);

      // validate success
      data.value = {
        name: 'test',
        age: 18,
      };
      res = await form.vm.$.exposed.validate();
      expect(res).toMatchSnapshot();

      expect(onValidate).toHaveBeenCalledTimes(2);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(2);
      expect(form.find('.t-input__extra').exists()).eq(false);
      expect(form.find('.t-is-error').exists()).eq(false);

      // trigger
      rules = {
        name: [{ validator: () => false, message: '姓名校验失败', trigger: 'blur' }],
        age: [{ validator: () => false, message: '年龄校验失败', trigger: 'change' }],
      };
      wrapper.setProps({ rules });
      await nextTick();
      res = await form.vm.$.exposed.validate({ trigger: 'blur' });
      expect(res).toMatchSnapshot();
      expect(form.find('.t-input__extra').text()).eq('姓名校验失败');
      expect(form.findAll('.t-is-error')).toHaveLength(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(1);

      // showErrorMessage
      res = await form.vm.$.exposed.validate({ showErrorMessage: false });
      expect(res).toMatchSnapshot();
      expect(form.findAll('.t-input__extra')).toHaveLength(0);
      expect(form.findAll('.t-is-error')).toHaveLength(0);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);

      // fields
      form.vm.$.exposed.reset();
      expect(onReset).toHaveBeenCalledTimes(1);

      res = await form.vm.$.exposed.validate({ fields: ['name'] });
      expect(res).toMatchSnapshot();
      expect(form.find('.t-input__extra').text()).eq('姓名校验失败');
      expect(form.findAll('.t-is-error')).toHaveLength(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(1);

      expect(onSubmit).not.toBeCalled();
    });

    it('validateOnly', async () => {
      checkDefaultStyle();

      // validateOnly failed should not be change the style
      let res = await form.vm.$.exposed.validateOnly();
      expect(res).toMatchSnapshot();
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(0);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(0);
      expect(form.find('.t-input__extra').exists()).eq(false);
      expect(form.find('.t-form__status').exists()).eq(false);
      expect(form.find('.t-is-error').exists()).eq(false);

      expect(onValidate).not.toBeCalled();

      // set validate fail style
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toHaveLength(2);

      // validateOnly success should not be change the style
      data.value = {
        name: 'test',
        age: 18,
      };
      res = await form.vm.$.exposed.validateOnly();
      expect(res).toMatchSnapshot();

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toHaveLength(2);

      form.vm.$.exposed.reset();
      expect(onReset).toHaveBeenCalledTimes(1);
      // trigger
      rules = {
        name: [{ validator: () => false, message: '姓名校验失败', trigger: 'blur' }],
        age: [{ validator: () => false, message: '年龄校验失败', trigger: 'change' }],
      };
      await wrapper.setProps({ rules });
      res = await form.vm.$.exposed.validateOnly({ trigger: 'blur' });
      expect(res).toMatchSnapshot();
      checkDefaultStyle();

      // fields
      res = await form.vm.$.exposed.validateOnly({ fields: ['name'] });
      expect(res).toMatchSnapshot();
      checkDefaultStyle();

      expect(onSubmit).not.toBeCalled();
    });
  });
});
