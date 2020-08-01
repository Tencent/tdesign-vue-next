import { mount } from '@vue/test-utils';
import Radio, { Group, RadioButton } from '@/src/radio/index.ts';

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
      expect(wrapper).toMatchSnapshot();
    });
    it(':defaultChecked', () => {
      const wrapper = mount({
        render() {
          return <Radio defaultChecked={true}></Radio>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Radio disabled={true}></Radio>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':name', () => {
      const wrapper = mount({
        render() {
          return <Radio name={'radio-name'}></Radio>;
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
          return <Radio onChange={fn}>Radio</Radio>;
        },
      });
      wrapper.find(Radio).trigger('click');
      expect(fn).toHaveBeenCalled();;
    });
  });
});

describe('Radio Group', () => {
  // test props api
  describe(':props', () => {
    it(':defaultValue', () => {
      const wrapper = mount({
        render() {
          return (
            <Group defaultValue={'sz'}>
              <Radio value="gz">广州</Radio>
              <Radio value="sz" disabled>深圳</Radio>
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
            <Group value={'sz'}>
              <Radio value="gz">广州</Radio>
              <Radio value="sz" disabled>深圳</Radio>
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
              <Radio value="bj">北京</Radio>
              <Radio value="gz">广州</Radio>
              <Radio value="sz" disabled={false}>深圳</Radio>
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
            <Group name={'radio-name'}>
              <Radio value="gz">广州</Radio>
              <Radio value="sz" disabled>深圳</Radio>
            </Group>
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':buttonStyle', () => {
      const wrapper = mount({
        render() {
          return (
            <Group buttonStyle={'solid'}>
              <RadioButton value="gz">广州</RadioButton>
              <RadioButton value="sz" disabled>深圳</RadioButton>
            </Group>
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return (
            <Group size={'small'}>
              <RadioButton value="gz">广州</RadioButton>
              <RadioButton value="sz" disabled>深圳</RadioButton>
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
              <Radio value="gz">广州</Radio>
              <Radio value="sz" disabled>深圳</Radio>
            </Group>
          );
        },
      });
      wrapper.find(Radio).trigger('click');
      expect(fn).toHaveBeenCalled();;
    });
  });
});
