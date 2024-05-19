import { mount } from '@vue/test-utils';
import Checkbox, { CheckboxGroup } from '@/src/checkbox/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Checkbox', () => {
  // test props api
  describe(':props', () => {
    it(':checked', () => {
      const wrapper = mount({
        render() {
          return <Checkbox checked={true}></Checkbox>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':defaultChecked', () => {
      const wrapper = mount({
        render() {
          return <Checkbox defaultChecked={true}></Checkbox>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Checkbox disabled={true}></Checkbox>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':indeterminate', () => {
      const wrapper = mount({
        render() {
          return <Checkbox indeterminate={true}></Checkbox>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':name', () => {
      const wrapper = mount({
        render() {
          return <Checkbox name={'checkbox-name'}></Checkbox>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('Event passthrough', async () => {
      const wrapper = mount(Checkbox);
      const checkboxInput = wrapper.find('input[type="checkbox"]');
      await checkboxInput.setChecked();
      expect(checkboxInput.element.checked).toBeTruthy();

      // TODO emitted return undefined in vue 2.7
      // expect(wrapper.emitted().change.length).toBe(1);
      // expect(wrapper.emitted().change[0][0]).toBeTruthy();
    });
  });
});

describe('Checkbox CheckboxGroup', () => {
  // test props api
  describe(':props', () => {
    it(':defaultChecked', () => {
      const wrapper = mount({
        render() {
          return (
            <CheckboxGroup defaultChecked={['sz']}>
              <Checkbox value="gz">广州</Checkbox>
              <Checkbox value="sz" disabled>
                深圳
              </Checkbox>
            </CheckboxGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':checked', () => {
      const wrapper = mount({
        render() {
          return (
            <CheckboxGroup checked={['sz']}>
              <Checkbox value="gz">广州</Checkbox>
              <Checkbox value="sz" disabled>
                深圳
              </Checkbox>
            </CheckboxGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return (
            <CheckboxGroup disabled={true}>
              <Checkbox value="bj">北京</Checkbox>
              <Checkbox value="gz">广州</Checkbox>
              <Checkbox value="sz" disabled={false}>
                深圳
              </Checkbox>
            </CheckboxGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':max', () => {
      const options = [
        { value: 'bj', label: '北京' },
        { value: 'gz', label: '广州' },
        { value: 'sz', label: '深圳' },
      ];
      const wrapper = mount({
        render() {
          return <CheckboxGroup options={options} value={['sz', 'gz']} max={2} />;
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
          return <CheckboxGroup options={options}></CheckboxGroup>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':name', () => {
      const wrapper = mount({
        render() {
          return (
            <CheckboxGroup name={'checkbox-name'}>
              <Checkbox value="gz">广州</Checkbox>
              <Checkbox value="sz" disabled>
                深圳
              </Checkbox>
            </CheckboxGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('Event passthrough', async () => {
      const wrapper = mount({
        render() {
          return (
            <CheckboxGroup>
              <Checkbox value="gz">广州</Checkbox>
              <Checkbox value="sz" disabled>
                深圳
              </Checkbox>
            </CheckboxGroup>
          );
        },
      });
      const checkboxInput = wrapper.find('input[type="checkbox"]');
      await checkboxInput.setChecked();
      // const checkboxGroup = wrapper.findComponent(CheckboxGroup);
      // const checkbox = wrapper.findComponent(Checkbox);
      // expect(checkbox.emitted().change.length).toBe(1);
      // expect(checkboxGroup.emitted().change.length).toBe(1);
      // 选中单项时间参数为 true
      // expect(checkbox.emitted().change[0][0]).toBeTruthy();
      // checkboxGroup 事件参数为 ['gz']
      // expect(checkboxGroup.emitted().change[0][0]).toEqual(['gz']);
    });
  });
});
