import { mount } from '@vue/test-utils';
import { CloseCircleFilledIcon, InfoCircleIcon } from 'tdesign-icons-vue';
import { FormItem, Form } from '../index.ts';
import { Input } from '@/src/index.ts';

const delay = (time = 0) => new Promise((res, rej) => {
  setTimeout(() => {
    res();
  }, time);
});

// every component needs four parts: props/events/slots/functions.
describe('Form', () => {
  // test props api
  describe(':props', () => {
    it(':labelAlign', async () => {
      let wrapper = mount({
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
      // Form labelAlign default value: right
      expect(wrapper.find('.t-form__label').classes('t-form__label--right')).eq(true);

      wrapper = mount({
        render() {
          return (
            <Form labelAlign="top">
              <FormItem label="name" name="name">
                <Input placeholder="请输入内容" />
              </FormItem>
            </Form>
          );
        },
      });
      expect(wrapper.find('.t-form__label').classes('t-form__label--top')).eq(true);

      wrapper = mount({
        render() {
          return (
            <Form labelAlign="left">
              <FormItem label="name" name="name">
                <Input placeholder="请输入内容" />
              </FormItem>
            </Form>
          );
        },
      });
      expect(wrapper.find('.t-form__label').classes('t-form__label--left')).eq(true);
    });

    it(':labelWidth', async () => {
      let wrapper = mount({
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

      expect(wrapper.find('.t-form__label').element.style.width).eq('100px');
      expect(wrapper.find('.t-form__controls').element.style.marginLeft).eq('100px');

      wrapper = mount({
        render() {
          return (
            <Form labelWidth="200px">
              <FormItem label="name" name="name">
                <Input placeholder="请输入内容" />
              </FormItem>
            </Form>
          );
        },
      });
      expect(wrapper.find('.t-form__label').element.style.width).eq('200px');
      expect(wrapper.find('.t-form__controls').element.style.marginLeft).eq('200px');
    });

    it(':layout', async () => {
      let wrapper = mount({
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
      expect(wrapper.find('.t-form').classes('t-form-inline')).eq(false);

      wrapper = mount({
        render() {
          return (
            <Form layout="inline">
              <FormItem label="name" name="name">
                <Input placeholder="请输入内容" />
              </FormItem>
            </Form>
          );
        },
      });
      expect(wrapper.find('.t-form').classes('t-form-inline')).eq(true);
    });

    it(':colon', async () => {
      const wrapper = mount({
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
      expect(getComputedStyle(wrapper.find('label').element, '::after').content).eq('');
    });

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
      const formComp = wrapper.findComponent(Form);
      await formComp.vm.validate();
      expect(wrapper.find('.t-input__extra').text()).eq('姓名必填');
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

      expect(formData.name).eq('defaultName');
      form.vm.reset();
      expect(formData.name).eq('');
    });

    it(':statusIcon', async () => {
      const rules = {
        name: [{ required: true }],
      };
      const formData = {
        name: '',
      };

      let wrapper = mount({
        render() {
          return (
            <Form rules={rules} data={formData} statusIcon>
              <FormItem label="name" name="name">
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });

      let form = wrapper.findComponent(Form);

      await form.vm.validate();
      expect(form.findComponent(CloseCircleFilledIcon).exists()).eq(true);

      // function
      wrapper = mount({
        render() {
          return (
            <Form rules={rules} data={formData} statusIcon={() => <InfoCircleIcon />}>
              <FormItem label="name" name="name">
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });

      form = wrapper.findComponent(Form);
      await form.vm.validate();
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
      const data = {
        name: '',
        age: undefined,
      };
      const onValidate = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Form rules={rules} data={data} onValidate={onValidate}>
              <FormItem label="name" name="name">
                <Input v-model={data.name} />
              </FormItem>
              <FormItem label="age" name="age">
                <Input v-model={data.age} />
              </FormItem>
            </Form>
          );
        },
      });

      const form = wrapper.findComponent(Form);
      expect(onValidate).not.toBeCalled();

      await form.vm.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate.mock.calls[0][0]).toMatchSnapshot();

      form.vm.submit();
      await delay();
      expect(onValidate).toHaveBeenCalledTimes(2);
      expect(onValidate.mock.calls[1][0]).toMatchSnapshot();

      data.name = 'test';
      await form.vm.validate();
      expect(onValidate.mock.calls[2][0]).toMatchSnapshot();

      data.age = 18;
      await form.vm.validate();
      expect(onValidate.mock.calls[3][0]).toMatchSnapshot();
    });

    it('reset', async () => {
      const onReset = vi.fn();
      const rules = {
        name: [{ required: true }],
      };
      const data = {
        name: '',
      };

      const wrapper = mount({
        render() {
          return (
            <Form rules={rules} data={data} onReset={onReset}>
              <FormItem label="name" name="name">
                <Input v-model={data.name} />
              </FormItem>
            </Form>
          );
        },
      });

      const form = wrapper.findComponent(Form);
      expect(onReset).not.toBeCalled();

      await form.trigger('reset');
      expect(onReset).toHaveBeenCalledTimes(1);
      expect(onReset.mock.calls[0][0].e).toBeInstanceOf(Event);
    });
  });
});
