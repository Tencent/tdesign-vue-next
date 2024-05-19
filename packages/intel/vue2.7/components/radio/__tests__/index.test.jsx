import { mount } from '@vue/test-utils';
import Radio, { RadioGroup, RadioButton } from '@/src/radio/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Radio', () => {
  // test props api
  describe(':props', () => {
    it(':checked', () => {
      const wrapper = mount({
        render() {
          return <Radio checked={true}></Radio>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':defaultChecked', () => {
      const wrapper = mount({
        render() {
          return <Radio defaultChecked={true}></Radio>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Radio disabled={true}></Radio>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':name', () => {
      const wrapper = mount({
        render() {
          return <Radio name={'radio-name'}></Radio>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
  // test events
  describe('@event', () => {
    it('Event passthrough ', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Radio onChange={fn}>Radio</Radio>;
        },
      });
      wrapper.find('.t-radio').trigger('click');
      expect(fn).toHaveBeenCalled();

      // vue-test-utils, `radioInput.setChecked();` is a bug, https://github.com/vuejs/vue-test-utils/issues/1930
      // const wrapper = mount(Radio);
      // const radioInput = wrapper.find('input[type="radio"]');
      // await radioInput.setChecked();
      // expect(radioInput.element.checked).toBeTruthy();
      // expect(wrapper.emitted().change?.length).toBe(1);
      // expect(wrapper.emitted().change[0][0]).toBeTruthy();
    });
  });
});

describe('Radio RadioGroup', () => {
  // test props api
  describe(':props', () => {
    it(':defaultValue', () => {
      const wrapper = mount({
        render() {
          return (
            <RadioGroup defaultValue={'sz'}>
              <Radio value="gz">广州</Radio>
              <Radio value="sz" disabled>
                深圳
              </Radio>
            </RadioGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':value', () => {
      const wrapper = mount({
        render() {
          return (
            <RadioGroup value={'sz'}>
              <Radio value="gz">广州</Radio>
              <Radio value="sz" disabled>
                深圳
              </Radio>
            </RadioGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return (
            <RadioGroup disabled={true}>
              <Radio value="bj">北京</Radio>
              <Radio value="gz">广州</Radio>
              <Radio value="sz" disabled={false}>
                深圳
              </Radio>
            </RadioGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':options', () => {
      const options = [
        { value: 'gz', label: '广州', disabled: true },
        { value: 'sz', label: '深圳' },
      ];
      const wrapper = mount({
        render() {
          return <RadioGroup options={options}></RadioGroup>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':name', () => {
      const wrapper = mount({
        render() {
          return (
            <RadioGroup name={'radio-name'}>
              <Radio value="gz">广州</Radio>
              <Radio value="sz" disabled>
                深圳
              </Radio>
            </RadioGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':variant', () => {
      const wrapper = mount({
        render() {
          return (
            <RadioGroup variant={'default-filled'}>
              <RadioButton value="gz">广州</RadioButton>
              <RadioButton value="sz" disabled>
                深圳
              </RadioButton>
            </RadioGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return (
            <RadioGroup size={'small'}>
              <RadioButton value="gz">广州</RadioButton>
              <RadioButton value="sz" disabled>
                深圳
              </RadioButton>
            </RadioGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('Event passthrough ', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <RadioGroup onChange={fn}>
              <Radio value="gz">广州</Radio>
              <Radio value="sz" disabled>
                深圳
              </Radio>
            </RadioGroup>
          );
        },
      });
      await wrapper.find('.t-radio').trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });
});
