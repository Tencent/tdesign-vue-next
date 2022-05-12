import { mount } from '@vue/test-utils';
import Steps from '@/src/steps/index.ts';

describe('Steps', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(Steps, {
      propsData: {
        layout: 'vertical',
        theme: 'dot',
      },
    });
  });

  it('equals direction to "vertical"', () => {
    expect(cmp.vm.layout).toEqual('vertical');
  });
  it('equals type to "dot"', () => {
    expect(cmp.vm.theme).toEqual('dot');
  });
  it('equals sequence to "positive"', () => {
    expect(cmp.vm.sequence).toEqual('positive');
  });
});
