import { mount } from '@vue/test-utils';
import demo from '@/src/upload/index.ts';

// unit test for component in examples.
describe('Upload', () => {
  it('base demo works fine', () => {
    const wrapper = mount(demo);
    expect(wrapper.element).toMatchSnapshot();
  });
});
