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
  // describe('@event', () => {
  //   it('Event passthrough ', () => {
  //     const fn = jest.fn();
  //     const wrapper = mount({
  //       render() {
  //         return <Checkbox onChange={fn}>Checkbox</Checkbox>;
  //       },
  //     });
  //     wrapper.findComponent(Checkbox).trigger('click');
  //     expect(fn).toHaveBeenCalled();
  //   });
  // });
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
  // describe('@event', () => {
  //   it('Event passthrough ', () => {
  //     const fn = jest.fn();
  //     const wrapper = mount({
  //       render() {
  //         return (
  //           <CheckboxGroup onChange={fn}>
  //             <Checkbox value="gz">广州</Checkbox>
  //             <Checkbox value="sz" disabled>深圳</Checkbox>
  //           </CheckboxGroup>
  //         );
  //       },
  //     });
  //     wrapper.findComponent(Checkbox).trigger('click');
  //     expect(fn).toHaveBeenCalled();
  //   });
  // });
});
