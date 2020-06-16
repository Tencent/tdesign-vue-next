import { mount } from '@vue/test-utils';
import Checkbox, { Group } from '@/src/checkbox/index.ts';

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
      expect(wrapper).toMatchSnapshot();
    });
    it(':defaultChecked', () => {
      const wrapper = mount({
        render() {
          return <Checkbox defaultChecked={true}></Checkbox>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Checkbox disabled={true}></Checkbox>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':indeterminate', () => {
      const wrapper = mount({
        render() {
          return <Checkbox indeterminate={true}></Checkbox>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':name', () => {
      const wrapper = mount({
        render() {
          return <Checkbox name={'checkbox-name'}></Checkbox>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('Event passthrough ', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Checkbox onChange={fn}>Checkbox</Checkbox>;
        },
      });
      wrapper.find(Checkbox).trigger('click');
      expect(fn).toHaveBeenCalled();;
    });
  });
});

describe('Checkbox Group', () => {
  // test props api
  describe(':props', () => {
    it(':defaultValue', () => {
      const wrapper = mount({
        render() {
          return (
            <Group checked={['sz']}>
              <Checkbox value="gz">广州</Checkbox>
              <Checkbox value="sz" disabled>深圳</Checkbox>
            </Group>
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':value', () => {
      const wrapper = mount({
        render() {
          return (
            <Group value={['sz']}>
              <Checkbox value="gz">广州</Checkbox>
              <Checkbox value="sz" disabled>深圳</Checkbox>
            </Group>
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return (
            <Group disabled={true}>
              <Checkbox value="gz">广州</Checkbox>
              <Checkbox value="sz" disabled>深圳</Checkbox>
            </Group>
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':options', () => {
      const options = [
        { value: 'gz', label: '广州', disabled: true },
        { value: 'sz', label: '深圳' },
      ];
      const wrapper = mount({
        render() {
          return <Group options={options}></Group>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':name', () => {
      const wrapper = mount({
        render() {
          return (
            <Group name={'checkbox-name'}>
              <Checkbox value="gz">广州</Checkbox>
              <Checkbox value="sz" disabled>深圳</Checkbox>
            </Group>
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('Event passthrough ', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return (
            <Group onChange={fn}>
              <Checkbox value="gz">广州</Checkbox>
              <Checkbox value="sz" disabled>深圳</Checkbox>
            </Group>
          );
        },
      });
      wrapper.find(Checkbox).trigger('click');
      expect(fn).toHaveBeenCalled();;
    });
  });
});
