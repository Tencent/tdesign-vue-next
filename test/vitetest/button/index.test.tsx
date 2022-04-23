import { mount } from '@vue/test-utils';
import Button from './components/hello';

test('mount component', async () => {
  expect(Button).toBeTruthy();

  const wrapper = mount(Button);
});
