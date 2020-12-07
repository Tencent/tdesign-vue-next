import { mount } from '@vue/test-utils';
import Tooltip from '@/src/tooltip/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Tooltip', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(Tooltip, {
      propsData: {
        disabled: true,
        placement: 'topLeft',
        visible: false,
        trigger: 'click',
        content: 'txt',
        visibleArrow: true,
        destroyOnHide: true,
        theme: 'primary',
      },
    });
  });

  it('equals theme to primary', () => {
    expect(cmp.vm.theme).toEqual('primary');
  });
});
