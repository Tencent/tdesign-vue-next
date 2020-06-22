import { mount } from '@vue/test-utils';
import Steps from '@/src/steps/index.ts';

describe('Steps', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(Steps, {
      propsData: {
        direction: 'vertical',
        type: 'dot',
      },
    });
  });

  it('equals direction to "vertical"', () => {
    expect(cmp.vm.direction).toEqual('vertical');
  });
  it('equals type to "dot"', () => {
    expect(cmp.vm.type).toEqual('dot');
  });
  it('equals status to "wait"', () => {
    expect(cmp.vm.status).toEqual('wait');
  });
  it('equals sequence to "positive"', () => {
    expect(cmp.vm.sequence).toEqual('positive');
  });
});
