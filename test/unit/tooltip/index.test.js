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

  it('equals disabled to true', () => {
    expect(cmp.vm.disabled).toEqual(true);
  });

  it('equals disabled to true', () => {
    expect(cmp.vm.clickTrigger).toEqual(true);
  });
});
