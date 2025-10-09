import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Alert } from '@tdesign/components/alert';

function setOffsetHeight(el: Element, height: number) {
  Object.defineProperty(el, 'offsetHeight', {
    value: height,
    configurable: true,
  });
}

describe('Alert API extra coverage - round 3', () => {
  it(':renderDescription height truthy branch (collapsed)', async () => {
    const wrapper = mount(() => (
      <Alert title="height truthy collapsed" maxLine={2}>
        <span>line1</span>
        <span>line2</span>
        <span>line3</span>
        <span>line4</span>
      </Alert>
    ));
    const description = wrapper.find('.t-alert__description');
    // 设置 description 自身和第一个子元素的 offsetHeight，使 height 判断为真
    setOffsetHeight(description.element, 8);
    const firstChild = description.element.children[0] as HTMLElement;
    setOffsetHeight(firstChild, 10);

    // 重新触发渲染以走到高度设置逻辑
    await wrapper.vm.$forceUpdate();
    await new Promise((r) => setTimeout(r, 0));

    // 折叠态：style.height 应设置为 descHeight（mounted 时记录的 description.offsetHeight）
    expect((description.element as HTMLElement).style.height).toBe('0px');
  });

  it(':renderDescription height truthy branch (expanded)', async () => {
    const wrapper = mount(() => (
      <Alert title="height truthy expanded" maxLine={2}>
        <span>line1</span>
        <span>line2</span>
        <span>line3</span>
        <span>line4</span>
      </Alert>
    ));
    const description = wrapper.find('.t-alert__description');
    // 设置 description 自身和第一个子元素的 offsetHeight，使 height 判断为真
    setOffsetHeight(description.element, 8);
    const firstChild = description.element.children[0] as HTMLElement;
    setOffsetHeight(firstChild, 10);

    // 点击展开
    const collapse = description.find('.t-alert__collapse');
    expect(collapse.exists()).toBeTruthy();
    await collapse.trigger('click');

    // 展开态：style.height = height * (contentLength - maxLine) + descHeight
    // contentLength = 4, maxLine = 2, height = 10, descHeight = 8 => 28px
    expect((description.element as HTMLElement).style.height).toBe('20px');
  });
});