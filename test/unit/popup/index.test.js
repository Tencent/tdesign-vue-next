import { mount } from '@vue/test-utils';
import Popup from '@/src/popup/index.ts';

describe('Popup', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(Popup, {
      propsData: {
        disabled: true,
        placement: 'top-left',
        visible: false,
        trigger: 'click',
        content: 'txt',
        visibleArrow: true,
        destroyOnHide: true,
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
