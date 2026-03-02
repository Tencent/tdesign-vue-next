import { nextTick, ref, Fragment } from 'vue';
import type { Ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { CheckCircleFilledIcon, CloseCircleFilledIcon, InfoCircleIcon } from 'tdesign-icons-vue-next';
import { isObject } from 'lodash-es';
import { FormItem, Form, Input, Switch, InputNumber } from '@tdesign/components';
import formProps from '@tdesign/components/form/props';
import { FormRules, Data, TdFormProps, IsDateOptions } from '@tdesign/components/form/type';
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

    afterEach(() => {
      wrapper?.unmount();
      wrapper = null;
    });

    it(':colon[boolean]', async () => {
      expect(wrapper.find('.t-form__label').element.children.length).toBe(1);

      await wrapper.setProps({ colon: true });
      expect(wrapper.find('.t-form__label').element.childNodes[1].textContent).toBe('：');
    });

    it.todo(':data[object]');

    it(':disabled[boolean]', async () => {
      expect(wrapper.find('.t-input').classes('t-is-disabled')).toBe(false);

      await wrapper.setProps({ disabled: true });
      expect(wrapper.find('.t-input').classes('t-is-disabled')).toBe(true);
    });

    it(':errorMessage[object]', async () => {
      const rules = {
        name: [{ required: true }],
      };
      const formData = { name: '' };
      const errorMessage = {
        required: '${name}不能为空',
      };
      const wrapper = mount(
        <Form rules={rules} data={formData} errorMessage={errorMessage}>
          <FormItem label="姓名" name="name">
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );

      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-input__extra').text()).toBe('姓名不能为空');
      wrapper.unmount();
    });

    it(':id[string]', async () => {
      expect(wrapper.find('.t-form').attributes('id')).toBe(undefined);
      const id = 'tdesign';
      await wrapper.setProps({ id });
      expect(wrapper.find('.t-form').attributes('id')).toBe(id);
    });

    it(':labelAlign[string]', async () => {
      const validator = formProps.labelAlign.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      expect(wrapper.find('.t-form__label').classes('t-form__label--right')).toBe(true);

      await wrapper.setProps({ labelAlign: 'top' });
      expect(wrapper.find('.t-form__label').classes('t-form__label--top')).toBe(true);

      await wrapper.setProps({ labelAlign: 'left' });
      expect(wrapper.find('.t-form__label').classes('t-form__label--left')).toBe(true);
    });

    it(':labelWidth[string/number]', async () => {
      expect((wrapper.find('.t-form__label').element as HTMLElement).style.width).toBe('100px');
      expect((wrapper.find('.t-form__controls').element as HTMLElement).style.marginLeft).toBe('100px');

      await wrapper.setProps({ labelWidth: '200px' });
      expect((wrapper.find('.t-form__label').element as HTMLElement).style.width).toBe('200px');
      expect((wrapper.find('.t-form__controls').element as HTMLElement).style.marginLeft).toBe('200px');

      await wrapper.setProps({ labelWidth: 300 });
      expect((wrapper.find('.t-form__label').element as HTMLElement).style.width).toBe('300px');
      expect((wrapper.find('.t-form__controls').element as HTMLElement).style.marginLeft).toBe('300px');
    });

    it(':layout[vertical/inline]', async () => {
      const validator = formProps.layout.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      expect(wrapper.find('.t-form').classes('t-form-inline')).toBe(false);

      await wrapper.setProps({ layout: 'inline' });
      expect(wrapper.find('.t-form').classes('t-form-inline')).toBe(true);
    });

    it(':preventSubmitDefault[boolean]', async () => {
      const event1 = new Event('submit', { bubbles: true, cancelable: true });
      const spy1 = vi.spyOn(event1, 'preventDefault');
      wrapper.element.dispatchEvent(event1);
      expect(spy1).toHaveBeenCalled();

      await wrapper.setProps({ preventSubmitDefault: false });
      const event2 = new Event('submit', { bubbles: true, cancelable: true });
      const spy2 = vi.spyOn(event2, 'preventDefault');
      wrapper.element.dispatchEvent(event2);
      expect(spy2).not.toHaveBeenCalled();
    });

    it(':readonly[boolean]', async () => {
      expect(wrapper.find('.t-input').classes('t-is-readonly')).toBe(false);

      await wrapper.setProps({ readonly: true });
      expect(wrapper.find('.t-input').classes('t-is-readonly')).toBe(true);
    });

    it(':requiredMark[boolean] + requiredMarkPosition[left/right]', async () => {
      const validator = formProps.requiredMarkPosition.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      const rules = { name: [{ required: true, message: '姓名必填' }] };
      await wrapper.setProps({ rules });
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

      const validator = formProps.resetType.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      const form = wrapper.findComponent(Form);
      expect(formData.value.name).toBe('defaultName');
      form.vm.$.exposed.reset();
      expect(formData.value.name).toBe('');

      await wrapper.setProps({ resetType: 'initial' });
      form.vm.$.exposed.reset();
      expect(formData.value.name).toBe('defaultName');
      wrapper.unmount();
    });

    describe('rules[object]', () => {
      let wrapper: VueWrapper;
      let rules: Ref<FormRules<Data> | undefined>;
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
          props: { rules: rules as unknown as FormRules<Data>, data: formData, onValidate },
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

      afterEach(() => {
        wrapper?.unmount();
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

        rules.value = { time: [{ date: { delimiters: ['-', '/'] } as Partial<IsDateOptions> as IsDateOptions }] };
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

        rules.value = { name: [{ pattern: '[a-zA-Z]{8}' }] };
        formData.value.name = 'abcdefg';
        res = await validate();
        expectToFailure(res);

        rules.value = { name: [{ pattern: '[a-zA-Z]{8}' }] };
        formData.value.name = '12345678';
        res = await validate();
        expectToFailure(res);

        formData.value.name = 'abcdefgh';
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

      it('async validator', async () => {
        rules.value = {
          name: [
            {
              validator: (val: any) =>
                new Promise((resolve) => {
                  setTimeout(() => resolve(val === 'valid'), 10);
                }),
            },
          ],
        };

        formData.value.name = 'invalid';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'valid';
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
      const validator = formProps.scrollToFirstError.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      const rules = { name: [{ required: true, message: '姓名必填' }] };
      const formData = { name: '' };
      const scrollIntoViewMock = vi.fn();
      const originalScrollIntoView = Element.prototype.scrollIntoView;
      Element.prototype.scrollIntoView = scrollIntoViewMock;

      const wrapper = mount(
        <Form rules={rules} data={formData} scrollToFirstError="smooth">
          <FormItem label="name" name="name">
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );

      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(scrollIntoViewMock).toHaveBeenCalled();

      Element.prototype.scrollIntoView = originalScrollIntoView;
      wrapper.unmount();
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
      expect(wrapper.find('.t-input__extra').text()).toBe('姓名必填');

      await wrapper.setProps({ showErrorMessage: false });
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-input__extra').exists()).toBe(false);
      wrapper.unmount();
    });

    it(':statusIcon[boolean/function]', async () => {
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
      expect(form.find('.t-form__status').exists()).toBe(false);

      await wrapper.setProps({ statusIcon: true });
      await form.vm.$.exposed.validate();
      expect(form.findComponent(CloseCircleFilledIcon).exists()).toBe(true);
      formData.value.name = 'test';
      await form.vm.$.exposed.validate();
      expect(form.findComponent(CheckCircleFilledIcon).exists()).toBe(true);

      await wrapper.setProps({ statusIcon: () => <InfoCircleIcon /> });
      await form.vm.$.exposed.validate();
      expect(form.findComponent(InfoCircleIcon).exists()).toBe(true);
      wrapper.unmount();
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
      expect(form.findComponent(InfoCircleIcon).exists()).toBe(true);
      wrapper.unmount();
    });

    // submitWithWarningMessage prop is defined in types but not yet implemented (marked as 【讨论中】)
    it.todo(':submitWithWarningMessage[boolean]');
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

      // validate: both fields fail
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      const call1 = onValidate.mock.calls[0][0];
      expect(call1.firstError).toBe('姓名必填');
      expect(call1.validateResult.name[0].result).toBe(false);
      expect(call1.validateResult.name[0].message).toBe('姓名必填');
      expect(call1.validateResult.age[0].result).toBe(false);

      // submit: triggers validate with same result
      form.vm.$.exposed.submit();
      await sleep(16);
      expect(onValidate).toHaveBeenCalledTimes(2);
      const call2 = onValidate.mock.calls[1][0];
      expect(call2.firstError).toBe('姓名必填');
      expect(call2.validateResult.name[0].result).toBe(false);
      expect(call2.validateResult.age[0].result).toBe(false);

      // validate: only age fails
      data.value.name = 'test';
      await form.vm.$.exposed.validate();
      const call3 = onValidate.mock.calls[2][0];
      expect(call3.validateResult.name).toBeUndefined();
      expect(call3.validateResult.age[0].result).toBe(false);

      // validate: all pass
      data.value.age = 18;
      await form.vm.$.exposed.validate();
      const call4 = onValidate.mock.calls[3][0];
      expect(call4.firstError).toBe('');
      expect(call4.validateResult).toBe(true);

      wrapper.unmount();
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
      const submitResult = onSubmit.mock.calls[0][0];
      expect(submitResult.e).toBeInstanceOf(Event);
      expect(submitResult.validateResult).toBe(true);
      expect(submitResult.firstError).toBe('');

      wrapper.unmount();
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

      wrapper.unmount();
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

    afterEach(() => {
      wrapper?.unmount();
    });

    const checkDefaultStyle = () => {
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(0);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(0);
      expect(form.find('.t-input__extra').exists()).toBe(false);
      expect(form.find('.t-form__status').exists()).toBe(false);
      expect(form.find('.t-is-error').exists()).toBe(false);
    };

    it('clearValidate', async () => {
      // default
      checkDefaultStyle();
      expect(onValidate).toHaveBeenCalledTimes(0);

      // validate failed
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      const extras1 = form.findAll('.t-input__extra');
      expect(extras1).toHaveLength(2);
      expect(extras1[0].text()).toBe('姓名必填');
      expect(extras1[1].text()).toBe('age必填');
      expect(form.findAll('.t-is-error')).toHaveLength(2);

      form.vm.$.exposed.clearValidate(['name']);
      await nextTick();
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(1);
      const extras2 = form.findAll('.t-input__extra');
      expect(extras2).toHaveLength(1);
      expect(extras2[0].text()).toBe('age必填');
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
      expect(form.find('.t-input__extra').exists()).toBe(false);
      expect(form.find('.t-is-error').exists()).toBe(false);

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
      expect(form.find('.t-input__extra').exists()).toBe(false);
      expect(form.find('.t-is-error').exists()).toBe(false);

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
      const extras1 = form.findAll('.t-input__extra');
      expect(extras1).toHaveLength(2);
      expect(extras1[0].text()).toBe('姓名必填');
      expect(extras1[1].text()).toBe('age必填');
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
      const extras2 = form.findAll('.t-input__extra');
      expect(extras2).toHaveLength(2);
      expect(extras2[0].text()).toBe('姓名校验失败');
      expect(extras2[1].text()).toBe('年龄校验失败');
      expect(form.findAll('.t-is-error')).toHaveLength(2);

      // reset "name" to empty value
      form.vm.$.exposed.reset({ fields: ['name'] });
      await sleep(16);
      expect(onReset).toHaveBeenCalledTimes(3);
      expect(data.value).toMatchObject({ name: '', age: 18 });

      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(1);
      const extras3 = form.findAll('.t-input__extra');
      expect(extras3).toHaveLength(1);
      expect(extras3[0].text()).toBe('年龄校验失败');
      expect(form.findAll('.t-is-error')).toHaveLength(1);
    });

    it('setValidateMessage', async () => {
      await form.vm.$.exposed.validate();
      expect(wrapper.findAll('.t-input__extra')[0].text()).toBe('姓名必填');
      expect(wrapper.findAll('.t-form__controls')[0].classes('t-is-error')).toBe(true);

      form.vm.$.exposed.setValidateMessage({
        name: [{ type: 'warning', message: '自定义用户名校验信息提示' }],
      });
      await nextTick();
      expect(wrapper.findAll('.t-input__extra')[0].text()).toBe('自定义用户名校验信息提示');
      expect(wrapper.findAll('.t-form__controls')[0].classes('t-is-warning')).toBe(true);
    });

    it('submit', async () => {
      await form.vm.$.exposed.submit({ showErrorMessage: false });
      await sleep(16);

      expect(form.find('.t-input__extra').exists()).toBe(false);
      expect(form.find('.t-is-error').exists()).toBe(false);
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
      expect(isObject(res)).toBe(true);
      expect(res.name[0].result).toBe(false);
      expect(res.name[0].message).toBe('姓名必填');
      expect(res.age[0].result).toBe(false);

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      const extras1 = form.findAll('.t-input__extra');
      expect(extras1).toHaveLength(2);
      expect(extras1[0].text()).toBe('姓名必填');
      expect(extras1[1].text()).toBe('age必填');
      expect(form.findAll('.t-is-error')).toHaveLength(2);

      // validate success
      data.value = {
        name: 'test',
        age: 18,
      };
      res = await form.vm.$.exposed.validate();
      expect(res).toBe(true);

      expect(onValidate).toHaveBeenCalledTimes(2);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(2);
      expect(form.find('.t-input__extra').exists()).toBe(false);
      expect(form.find('.t-is-error').exists()).toBe(false);

      // trigger
      rules = {
        name: [{ validator: () => false, message: '姓名校验失败', trigger: 'blur' }],
        age: [{ validator: () => false, message: '年龄校验失败', trigger: 'change' }],
      };
      wrapper.setProps({ rules });
      await nextTick();
      res = await form.vm.$.exposed.validate({ trigger: 'blur' });
      expect(isObject(res)).toBe(true);
      expect(res.name[0].message).toBe('姓名校验失败');
      expect(res.age).toBeUndefined();
      expect(form.find('.t-input__extra').text()).toBe('姓名校验失败');
      expect(form.findAll('.t-is-error')).toHaveLength(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(1);

      // showErrorMessage
      res = await form.vm.$.exposed.validate({ showErrorMessage: false });
      expect(isObject(res)).toBe(true);
      expect(res.name[0].message).toBe('姓名校验失败');
      expect(res.age[0].message).toBe('年龄校验失败');
      expect(form.findAll('.t-input__extra')).toHaveLength(0);
      expect(form.findAll('.t-is-error')).toHaveLength(0);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);

      // fields
      form.vm.$.exposed.reset();
      expect(onReset).toHaveBeenCalledTimes(1);

      res = await form.vm.$.exposed.validate({ fields: ['name'] });
      expect(isObject(res)).toBe(true);
      expect(res.name[0].message).toBe('姓名校验失败');
      expect(res.age).toBeUndefined();
      expect(form.find('.t-input__extra').text()).toBe('姓名校验失败');
      expect(form.findAll('.t-is-error')).toHaveLength(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(1);

      expect(onSubmit).not.toBeCalled();
    });

    it('validateOnly', async () => {
      checkDefaultStyle();

      // validateOnly failed should not change the style
      let res = await form.vm.$.exposed.validateOnly();
      expect(isObject(res)).toBe(true);
      expect(res.name[0].result).toBe(false);
      expect(res.age[0].result).toBe(false);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(0);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(0);
      expect(form.find('.t-input__extra').exists()).toBe(false);
      expect(form.find('.t-form__status').exists()).toBe(false);
      expect(form.find('.t-is-error').exists()).toBe(false);

      expect(onValidate).not.toBeCalled();

      // set validate fail style
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      const extras1 = form.findAll('.t-input__extra');
      expect(extras1).toHaveLength(2);
      expect(extras1[0].text()).toBe('姓名必填');
      expect(extras1[1].text()).toBe('age必填');
      expect(form.findAll('.t-is-error')).toHaveLength(2);

      // validateOnly success should not change the style
      data.value = {
        name: 'test',
        age: 18,
      };
      res = await form.vm.$.exposed.validateOnly();
      expect(res).toBe(true);

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      const extras2 = form.findAll('.t-input__extra');
      expect(extras2).toHaveLength(2);
      expect(extras2[0].text()).toBe('姓名必填');
      expect(extras2[1].text()).toBe('age必填');
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
      expect(isObject(res)).toBe(true);
      expect(res.name[0].message).toBe('姓名校验失败');
      expect(res.age).toBeUndefined();
      checkDefaultStyle();

      // fields
      res = await form.vm.$.exposed.validateOnly({ fields: ['name'] });
      expect(isObject(res)).toBe(true);
      expect(res.name[0].message).toBe('姓名校验失败');
      expect(res.age).toBeUndefined();
      checkDefaultStyle();

      expect(onSubmit).not.toBeCalled();
    });
  });
});
