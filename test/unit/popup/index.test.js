import { mount } from "@vue/test-utils";
import Popup from "@/popup";

describe("Popup", () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(Popup,{
      propsData: {
        disabled: true,
        placement: 'topLeft',
        visible: false,
        trigger: 'click',
        content: 'txt',
        visibleArrow: true,
        destroyOnHide: true,
      }
    });
  });

  it("equals disabled to true", () => {
    expect(cmp.vm.disabled).toEqual(true);
  });

  it("equals disabled to true", () => {
    expect(cmp.vm.clickTrigger).toEqual(true);
  });
});