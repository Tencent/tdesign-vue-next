import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { CheckCircleFilledIcon, CloseCircleFilledIcon, InfoCircleIcon } from 'tdesign-icons-vue-next';
import { FormItem, Form } from '../index.ts';
import { Input, CheckboxGroup } from '@/src/index.ts';

const delay = (time = 0) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  });

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
      expect(wrapper.exists()).eq(true);
    });

    it(':labelAlign', async () => {
      expect(wrapper.find('.t-form__label').classes()).includes('t-form__label--right');

      await wrapper.setProps({ labelAlign: 'top' });
      expect(wrapper.find('.t-form__label').classes()).includes('t-form__label--top');

      await wrapper.setProps({ labelAlign: 'left' });
      expect(wrapper.find('.t-form__label').classes()).includes('t-form__label--left');
    });

    it(':labelWidth', async () => {
      expect(wrapper.find('.t-form__label').element.style.width).eq('100px');
      expect(wrapper.find('.t-form__controls').element.style.marginLeft).eq('100px');

      await wrapper.setProps({ labelWidth: '200px' });
      expect(wrapper.find('.t-form__label').element.style.width).eq('200px');
      expect(wrapper.find('.t-form__controls').element.style.marginLeft).eq('200px');
    });

    it(':layout', async () => {
      expect(wrapper.find('.t-form').classes()).not.includes('t-form-inline');

      await wrapper.setProps({ layout: 'inline' });
      expect(wrapper.find('.t-form').classes()).includes('t-form-inline');
    });

    // it(':colon', async () => {
    //   expect(window.getComputedStyle(wrapper.find('label').element, '::after').content).eq('none');

    //   await wrapper.setProps({ colon: true });
    //   expect(window.getComputedStyle(wrapper.find('label').element, '::after').content).eq('":"');
    // });

    it(':showErrorMessage', async () => {
      const rules = {
        name: [{ required: true, message: '姓名必填' }],
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
      expect(wrapper.find('.t-input__extra').text()).eq('姓名必填');

      await wrapper.setProps({ showErrorMessage: false });
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find('.t-input__extra').exists()).eq(false);
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
      const formData = ref({
        name: 'defaultName',
      });

      const wrapper = mount({
        render() {
          return (
            <Form rules={rules} data={formData.value}>
              <FormItem label="name" name="name">
                <Input v-model={formData.value.name} />
              </FormItem>
            </Form>
          );
        },
      });

      const form = wrapper.findComponent(Form);

      expect(formData.value.name).eq('defaultName');
      form.vm.$.exposed.reset();
      expect(formData.value.name).eq('');

      await wrapper.setProps({ resetType: 'initial' });
      form.vm.$.exposed.reset();
      expect(formData.value.name).eq('defaultName');
    });

    it(':statusIcon', async () => {
      const rules = {
        name: [{ required: true }],
      };
      const formData = ref({
        name: '',
      });

      const wrapper = mount({
        render() {
          return (
            <Form rules={rules} data={formData.value}>
              <FormItem label="name" name="name">
                <Input v-model={formData.value.name} />
              </FormItem>
            </Form>
          );
        },
      });

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
  });

  // test events
  describe('@event', () => {
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
          default: {
            render() {
              return (
                <>
                  <FormItem label="name" name="name">
                    <Input v-model={data.value.name} />
                  </FormItem>
                  <FormItem label="age" name="age">
                    <Input v-model={data.value.age} />
                  </FormItem>
                </>
              );
            },
          },
        },
      });
      const form = wrapper.findComponent(Form);
      expect(onValidate).not.toBeCalled();
      // expect(wrapper.find('.t-input__extra').exists()).eq(false);

      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate.mock.calls[0][0]).toMatchSnapshot();
      // expect(wrapper.find('.t-input__extra').text()).eq('姓名必填');

      form.vm.$.exposed.submit();
      await delay();
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
      expect(onValidate).not.toBeCalled();

      await form.trigger('submit');
      await delay();
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0].e).toBeInstanceOf(Event);
      delete onSubmit.mock.calls[0][0].e;
      expect(onSubmit.mock.calls[0][0]).toMatchSnapshot();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate.mock.calls[0][0]).toMatchSnapshot();
    });

    it('reset', async () => {
      const onReset = vi.fn();
      const rules = {
        name: [{ required: true }],
        age: [{ required: true }],
      };
      const data = ref({
        name: '',
        age: 12,
        course: ['1'],
      });

      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          onReset,
          rules,
          data,
        },
        slots: {
          default: {
            render() {
              return (
                <>
                  <FormItem label="name" name="name">
                    <Input v-model={data.value.name} />
                  </FormItem>
                  <FormItem label="age" name="age">
                    <Input v-model={data.value.age} />
                  </FormItem>
                  <FormItem label="course" name="course">
                    <CheckboxGroup v-model={data.value.course} />
                  </FormItem>
                </>
              );
            },
          },
        },
      });

      const form = wrapper.findComponent(Form);
      expect(onReset).not.toBeCalled();

      await form.trigger('reset');
      expect(onReset).toHaveBeenCalledTimes(1);
      // context.e
      expect(onReset.mock.calls[0][0].e).toBeInstanceOf(Event);
      // set value empty
      expect(data.value.name).eq('');
      expect(data.value.age).eq(undefined);
      expect(data.value.course.length).eq(0);
    });
  });

  // test slots
  describe('<slot>', () => {
    it('default', () => {
      const wrapper = mount({
        render() {
          return (
            <Form>
              <FormItem label="name" name="name">
                <Input />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.findComponent(FormItem).exists()).toBeTruthy();
    });
  });

  // test exposure function
  describe('function', () => {
    let wrapper;
    let form;
    let data;
    let onValidate;
    let onSubmit;
    let onReset;
    let checkDefaultStyle;

    beforeEach(() => {
      const rules = {
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
          default: {
            render() {
              return (
                <>
                  <FormItem label="name" name="name">
                    <Input v-model={data.value.name} />
                  </FormItem>
                  <FormItem label="age" name="age">
                    <Input v-model={data.value.age} />
                  </FormItem>
                </>
              );
            },
          },
        },
      });
      form = wrapper.findComponent(Form);

      checkDefaultStyle = () => {
        expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(0);
        expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(0);
        expect(form.find('.t-input__extra').exists()).eq(false);
        expect(form.find('.t-form__status').exists()).eq(false);
        expect(form.find('.t-is-error').exists()).eq(false);
      };
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
      expect(form.findAll('.t-is-error')).toMatchSnapshot();

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

      expect(onSubmit).not.toBeCalled();
      expect(onReset).not.toBeCalled();
    });

    it('validateOnly', async () => {
      checkDefaultStyle();

      // validateOnly failed
      let res = await form.vm.$.exposed.validateOnly();
      expect(res).toMatchSnapshot();
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(0);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(0);
      expect(form.find('.t-input__extra').exists()).eq(false);
      expect(form.find('.t-form__status').exists()).eq(false);
      expect(form.find('.t-is-error').exists()).eq(false);

      expect(onValidate).not.toBeCalled();

      // validate failed
      res = await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toMatchSnapshot();

      // validateOnly success
      data.value = {
        name: 'test',
        age: 18,
      };
      res = await form.vm.$.exposed.validateOnly();
      expect(res).toMatchSnapshot();

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toMatchSnapshot();

      expect(onSubmit).not.toBeCalled();
      expect(onReset).not.toBeCalled();
    });

    it('submit', async () => {
      await form.vm.$.exposed.submit();
      await delay();

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onReset).not.toBeCalled();
    });

    it('clearValidate', async () => {
      // default
      checkDefaultStyle();
      expect(onValidate).toHaveBeenCalledTimes(0);

      // validate failed
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toMatchSnapshot();

      // clearValidate
      form.vm.$.exposed.clearValidate();
      await form.vm.$nextTick();
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
      await form.vm.$nextTick();
      checkDefaultStyle();
    });

    it('reset', async () => {
      const rules = {
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
          default: {
            render() {
              return (
                <>
                  <FormItem label="name" name="name">
                    <Input v-model={data.value.name} />
                  </FormItem>
                  <FormItem label="age" name="age">
                    <Input v-model={data.value.age} />
                  </FormItem>
                </>
              );
            },
          },
        },
      });
      form = wrapper.findComponent(Form);

      // default
      checkDefaultStyle();
      expect(onValidate).toHaveBeenCalledTimes(0);

      // set validate success style
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(2);
      expect(form.find('.t-input__extra').exists()).eq(false);
      expect(form.find('.t-is-error').exists()).eq(false);
      expect(onSubmit).not.toBeCalled();

      // reset to empty value & clear style
      form.vm.$.exposed.reset();
      await delay();
      expect(onReset).toHaveBeenCalledTimes(1);
      checkDefaultStyle();
      expect(data.value).toMatchObject({ name: '', age: undefined });

      // set validate fail style
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(2);
      expect(form.findAllComponents(CloseCircleFilledIcon)).toHaveLength(2);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toMatchSnapshot();

      // reset to initial value & clear style
      form.vm.$.exposed.reset({ type: 'initial' });
      await delay();
      expect(onReset).toHaveBeenCalledTimes(2);
      checkDefaultStyle();
      expect(data.value).toMatchObject({ name: 'test', age: 18 });

      // set validate success style
      await form.vm.$.exposed.validate();
      // reset "name" to empty value
      form.vm.$.exposed.reset({ fields: ['name'] });
      await delay();
      expect(onReset).toHaveBeenCalledTimes(3);
      expect(form.findAllComponents(CheckCircleFilledIcon)).toHaveLength(1);
      expect(form.findAll('.t-input__extra')).toMatchSnapshot();
      expect(form.findAll('.t-is-error')).toMatchSnapshot();
      expect(data.value).toMatchObject({ name: '', age: 18 });
    });

    it('setValidateMessage', async () => {
      await form.vm.$.exposed.validate();
      expect(wrapper.findAll('.t-input__extra')[0].text()).eq('姓名必填');
      expect(wrapper.findAll('.t-form__controls')[0].classes()).toContain('t-is-error');

      form.vm.$.exposed.setValidateMessage({
        name: [{ type: 'warning', message: '自定义用户名校验信息提示' }],
      });
      await form.vm.$nextTick();
      expect(wrapper.findAll('.t-input__extra')[0].text()).eq('自定义用户名校验信息提示');
      expect(wrapper.findAll('.t-form__controls')[0].classes()).toContain('t-is-warning');
    });
  });
});

// describe('FormItem', () => {
//   describe(':props', () => {});
// });
