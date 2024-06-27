import { mount } from '@vue/test-utils';
import TTypography from '@/src/typography/index.ts';
describe('Typography', () => {
  it('', async () => {
    const wrapper = mount(() => <TTypography />);
    expect(wrapper.findComponent(TTypography).exists()).toBeTruthy();
  });
});
