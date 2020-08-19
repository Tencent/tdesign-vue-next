import { mount } from '@vue/test-utils';
import Select from '@/src/select/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Select', () => {
  // test props api
  it(':disabled', () => {
    const wrapper = mount({
      render() {
        return <Select disabled={true}></Select>;
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it(':size', () => {
    const wrapper = mount({
      render() {
        return <Select size="large"></Select>;
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
