import { mount } from "@vue/test-utils";
import Button from "@/button";

describe("Button", () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(Button,{
      propsData: {
        round: true
      }
    })
  });

  it("equals round to true", () => {
    expect(cmp.vm.round).toEqual(true);
  });
});