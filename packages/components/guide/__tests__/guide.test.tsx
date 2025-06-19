import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import {
  getGuideDefaultMount,
  getGuideMultipleStepsMount,
  getCustomGuideStepMount,
  getCustomMultipleGuideStepMount,
} from './mount';
import { mockDelay } from '@tdesign/internal-tests/utils';

describe('Guide Component', () => {
  afterEach(() => {
    document.querySelector('.t-guide__overlay')?.remove();
    document.querySelector('.t-guide__highlight--popup')?.remove();
    document.querySelector('.t-guide__reference')?.remove();
    document.querySelector('.t-guide__highlight--mask')?.remove();
    document.querySelector('.t-popup')?.remove();
  });

  it('props.counter works fine', async () => {
    getGuideDefaultMount({ counter: () => <span class="custom-node">TNode</span> });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    const tGuideCounterDom = document.querySelector('.t-guide__counter');
    expect(tGuideCounterDom).toBeTruthy();
  });

  it('slots.counter works fine', async () => {
    getGuideDefaultMount({ 'v-slots': { counter: () => <span class="custom-node">TNode</span> } });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    const tGuideCounterDom = document.querySelector('.t-guide__counter');
    expect(tGuideCounterDom).toBeTruthy();
  });

  it('props.counter is a function with params', async () => {
    const fn = vi.fn();
    getGuideDefaultMount({ counter: fn });
    await mockDelay(200);
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].total).toBe(1);
    expect(fn.mock.calls[0][1].current).toBe(0);
  });
  it('slots.counter: a function with params', async () => {
    const fn = vi.fn();
    getGuideDefaultMount({ 'v-slots': { counter: fn } });
    await mockDelay(200);
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].total).toBe(1);
    expect(fn.mock.calls[0][0].current).toBe(0);
  });

  it('props.current works fine.', async () => {
    getGuideMultipleStepsMount({ current: 0 });
    await mockDelay(200);
    const tGuideCounterDom = document.querySelector('.t-guide__counter');
    expect(tGuideCounterDom.textContent).toBe('1/3');
    const tGuideTitleDom = document.querySelectorAll('.t-guide__title');
    expect(tGuideTitleDom.length).toBe(1);
    const tGuideDescDom = document.querySelectorAll('.t-guide__desc');
    expect(tGuideDescDom.length).toBe(1);
    const tGuideActionTGuideSkipDom = document.querySelectorAll('.t-guide__action .t-guide__skip');
    expect(tGuideActionTGuideSkipDom.length).toBe(1);
    const tGuideActionTGuidePrevDom = document.querySelector('.t-guide__action .t-guide__prev');
    expect(tGuideActionTGuidePrevDom).toBeFalsy();
    const tGuideActionTGuideNextDom = document.querySelectorAll('.t-guide__action .t-guide__next');
    expect(tGuideActionTGuideNextDom.length).toBe(1);
    const tGuideActionTGuideFinishDom = document.querySelector('.t-guide__action .t-guide__finish');
    expect(tGuideActionTGuideFinishDom).toBeFalsy();
  });

  it('props.current works fine.', async () => {
    getGuideMultipleStepsMount({ current: 1 });
    await mockDelay(200);
    const tGuideCounterDom = document.querySelector('.t-guide__counter');
    expect(tGuideCounterDom.textContent).toBe('2/3');
    const tGuideTitleDom = document.querySelectorAll('.t-guide__title');
    expect(tGuideTitleDom.length).toBe(1);
    const tGuideDescDom = document.querySelectorAll('.t-guide__desc');
    expect(tGuideDescDom.length).toBe(1);
    const tGuideActionTGuideSkipDom = document.querySelectorAll('.t-guide__action .t-guide__skip');
    expect(tGuideActionTGuideSkipDom.length).toBe(1);
    const tGuideActionTGuidePrevDom = document.querySelectorAll('.t-guide__action .t-guide__prev');
    expect(tGuideActionTGuidePrevDom.length).toBe(1);
    const tGuideActionTGuideNextDom = document.querySelectorAll('.t-guide__action .t-guide__next');
    expect(tGuideActionTGuideNextDom.length).toBe(1);
    const tGuideActionTGuideFinishDom = document.querySelector('.t-guide__action .t-guide__finish');
    expect(tGuideActionTGuideFinishDom).toBeFalsy();
  });

  it('props.current works fine.', async () => {
    getGuideMultipleStepsMount({ current: 2 });
    await mockDelay(200);
    const tGuideCounterDom = document.querySelector('.t-guide__counter');
    expect(tGuideCounterDom.textContent).toBe('3/3');
    const tGuideTitleDom = document.querySelectorAll('.t-guide__title');
    expect(tGuideTitleDom.length).toBe(1);
    const tGuideDescDom = document.querySelectorAll('.t-guide__desc');
    expect(tGuideDescDom.length).toBe(1);
    const tGuideActionTGuideSkipDom = document.querySelector('.t-guide__action .t-guide__skip');
    expect(tGuideActionTGuideSkipDom).toBeFalsy();
    const tGuideActionTGuidePrevDom = document.querySelectorAll('.t-guide__action .t-guide__prev');
    expect(tGuideActionTGuidePrevDom.length).toBe(1);
    const tGuideActionTGuideNextDom = document.querySelector('.t-guide__action .t-guide__next');
    expect(tGuideActionTGuideNextDom).toBeFalsy();
    const tGuideActionTGuideFinishDom = document.querySelectorAll('.t-guide__action .t-guide__finish');
    expect(tGuideActionTGuideFinishDom.length).toBe(1);
  });

  it('props.current works fine. `{"document.t-guide__counter":false}` should exist', async () => {
    getGuideMultipleStepsMount({ current: -1 });
    await mockDelay(200);
    const tGuideCounterDom = document.querySelector('.t-guide__counter');
    expect(tGuideCounterDom).toBeFalsy();
  });

  it(`props.finishButtonProps is equal to {theme: 'warning'}`, async () => {
    getGuideMultipleStepsMount({ current: 2, finishButtonProps: { theme: 'warning' } });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-guide__finish');
    expect(domWrapper.classList.contains('t-button--theme-warning')).toBeTruthy();
  });

  it('props.hideCounter works fine. `{"document.t-guide__counter":false}` should exist', async () => {
    getGuideDefaultMount({ hideCounter: true });
    await mockDelay(200);
    const tGuideCounterDom = document.querySelector('.t-guide__counter');
    expect(tGuideCounterDom).toBeFalsy();
  });

  it('props.hidePrev works fine. `{"document.t-guide__action .t-guide__prev":false}` should exist', async () => {
    getGuideMultipleStepsMount({ current: 1, hidePrev: true });
    await mockDelay(200);
    const tGuideActionTGuidePrevDom = document.querySelector('.t-guide__action .t-guide__prev');
    expect(tGuideActionTGuidePrevDom).toBeFalsy();
  });

  it('props.hideSkip works fine. `{"document.t-guide__action .t-guide__skip":false}` should exist', async () => {
    getGuideMultipleStepsMount({ current: 1, hideSkip: true });
    await mockDelay(200);
    const tGuideActionTGuideSkipDom = document.querySelector('.t-guide__action .t-guide__skip');
    expect(tGuideActionTGuideSkipDom).toBeFalsy();
  });

  it(`props.highlightPadding is equal to 32`, async () => {
    getGuideDefaultMount({ highlightPadding: 32 });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-guide__highlight--mask');
    expect(domWrapper.style.width).toBe('64px');
    expect(domWrapper.style.height).toBe('64px');
    expect(domWrapper.style.top).toBe('-32px');
    expect(domWrapper.style.left).toBe('-32px');
    const domWrapper1 = document.querySelector('.t-guide__reference');
    expect(domWrapper1.style.width).toBe('64px');
    expect(domWrapper1.style.height).toBe('64px');
    expect(domWrapper1.style.top).toBe('-32px');
    expect(domWrapper1.style.left).toBe('-32px');
  });

  it(`props.nextButtonProps is equal to {theme: 'warning'}`, async () => {
    getGuideMultipleStepsMount({ current: 1, nextButtonProps: { theme: 'warning' } });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-guide__next');
    expect(domWrapper.classList.contains('t-button--theme-warning')).toBeTruthy();
  });

  it(`props.prevButtonProps is equal to {theme: 'warning'}`, async () => {
    getGuideMultipleStepsMount({ current: 2, prevButtonProps: { theme: 'warning' } });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-guide__prev');
    expect(domWrapper.classList.contains('t-button--theme-warning')).toBeTruthy();
  });

  it('props.showOverlay works fine. `{"document.t-guide__highlight--mask":1}` should exist', async () => {
    getGuideDefaultMount({ showOverlay: true });
    await mockDelay(200);
    const tGuideHighlightMaskDom = document.querySelectorAll('.t-guide__highlight--mask');
    expect(tGuideHighlightMaskDom.length).toBe(1);
  });

  it('props.showOverlay works fine. `{"document.t-guide__highlight--mask":false}` should exist', async () => {
    getGuideDefaultMount({ showOverlay: false });
    await mockDelay(200);
    const tGuideHighlightMaskDom = document.querySelector('.t-guide__highlight--mask');
    expect(tGuideHighlightMaskDom).toBeFalsy();
  });

  it(`props.skipButtonProps is equal to {theme: 'warning'}`, async () => {
    getGuideMultipleStepsMount({ current: 0, skipButtonProps: { theme: 'warning' } });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-guide__skip');
    expect(domWrapper.classList.contains('t-button--theme-warning')).toBeTruthy();
  });

  it('props.steps works fine.', async () => {
    getGuideDefaultMount();
    await mockDelay(200);
    const tGuideCounterDom = document.querySelector('.t-guide__counter');
    expect(tGuideCounterDom.textContent).toBe('1/1');
    const tGuideTitleDom = document.querySelectorAll('.t-guide__title');
    expect(tGuideTitleDom.length).toBe(1);
    const tGuideDescDom = document.querySelectorAll('.t-guide__desc');
    expect(tGuideDescDom.length).toBe(1);
    const tGuideActionTGuideSkipDom = document.querySelector('.t-guide__action .t-guide__skip');
    expect(tGuideActionTGuideSkipDom).toBeFalsy();
    const tGuideActionTGuidePrevDom = document.querySelector('.t-guide__action .t-guide__prev');
    expect(tGuideActionTGuidePrevDom).toBeFalsy();
    const tGuideActionTGuideNextDom = document.querySelector('.t-guide__action .t-guide__next');
    expect(tGuideActionTGuideNextDom).toBeFalsy();
    const tGuideActionTGuideFinishDom = document.querySelectorAll('.t-guide__action .t-guide__finish');
    expect(tGuideActionTGuideFinishDom.length).toBe(1);
  });

  it(`props.zIndex is equal to 5000`, async () => {
    getGuideDefaultMount({ zIndex: 5000 });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-guide__overlay');
    expect(domWrapper.style.zIndex).toBe('4998');
    const domWrapper1 = document.querySelector('.t-guide__highlight--mask');
    expect(domWrapper1.style.zIndex).toBe('4999');
  });

  it('events.change works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getGuideMultipleStepsMount({ current: 0 }, { onChange: onChangeFn });
    await mockDelay(200);
    document.querySelector('.t-guide__next').click();
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(1);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    expect(onChangeFn.mock.calls[0][1].total).toBe(3);
  });

  it('events.change works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getGuideMultipleStepsMount({ current: 1 }, { onChange: onChangeFn });
    await mockDelay(200);
    document.querySelector('.t-guide__prev').click();
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(0);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
    expect(onChangeFn.mock.calls[0][1].total).toBe(3);
  });

  it('events.finish works fine', async () => {
    const onFinishFn = vi.fn();
    const wrapper = getGuideMultipleStepsMount({ current: 2 }, { onFinish: onFinishFn });
    await mockDelay(200);
    document.querySelector('.t-guide__finish').click();
    await wrapper.vm.$nextTick();
    expect(onFinishFn).toHaveBeenCalled();
    expect(onFinishFn.mock.calls[0][0].current).toBe(2);
    expect(onFinishFn.mock.calls[0][0].e.type).toBe('click');
    expect(onFinishFn.mock.calls[0][0].total).toBe(3);
  });

  it('events.nextStepClick works fine', async () => {
    const onNextStepClickFn = vi.fn();
    const wrapper = getGuideMultipleStepsMount({ current: 1 }, { onNextStepClick: onNextStepClickFn });
    await mockDelay(200);
    document.querySelector('.t-guide__next').click();
    await wrapper.vm.$nextTick();
    expect(onNextStepClickFn).toHaveBeenCalled();
    expect(onNextStepClickFn.mock.calls[0][0].current).toBe(1);
    expect(onNextStepClickFn.mock.calls[0][0].next).toBe(2);
    expect(onNextStepClickFn.mock.calls[0][0].e.type).toBe('click');
    expect(onNextStepClickFn.mock.calls[0][0].total).toBe(3);
  });

  it('events.prevStepClick works fine', async () => {
    const onPrevStepClickFn = vi.fn();
    const wrapper = getGuideMultipleStepsMount({ current: 1 }, { onPrevStepClick: onPrevStepClickFn });
    await mockDelay(200);
    document.querySelector('.t-guide__prev').click();
    await wrapper.vm.$nextTick();
    expect(onPrevStepClickFn).toHaveBeenCalled();
    expect(onPrevStepClickFn.mock.calls[0][0].current).toBe(1);
    expect(onPrevStepClickFn.mock.calls[0][0].prev).toBe(0);
    expect(onPrevStepClickFn.mock.calls[0][0].e.type).toBe('click');
    expect(onPrevStepClickFn.mock.calls[0][0].total).toBe(3);
  });

  it('events.skip works fine', async () => {
    const onSkipFn = vi.fn();
    const wrapper = getGuideMultipleStepsMount({ current: 0 }, { onSkip: onSkipFn });
    await mockDelay(200);
    document.querySelector('.t-guide__skip').click();
    await wrapper.vm.$nextTick();
    expect(onSkipFn).toHaveBeenCalled();
    expect(onSkipFn.mock.calls[0][0].current).toBe(0);
    expect(onSkipFn.mock.calls[0][0].e.type).toBe('click');
    expect(onSkipFn.mock.calls[0][0].total).toBe(3);
  });
});

describe('Guide Component', () => {
  afterEach(() => {
    document.querySelector('.t-guide__overlay')?.remove();
    document.querySelector('.t-guide__highlight--popup')?.remove();
    document.querySelector('.t-guide__reference')?.remove();
    document.querySelector('.t-guide__highlight--mask')?.remove();
    document.querySelector('.t-popup')?.remove();
  });

  it('GuideStep.body works fine', async () => {
    getCustomGuideStepMount({ body: () => <span class="custom-node">TNode</span> });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });

  it('slots.body works fine', async () => {
    getCustomGuideStepMount({ 'v-slots': { body: () => <span class="custom-node">TNode</span> } });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });

  it('GuideStep.content works fine', async () => {
    getCustomGuideStepMount({ content: () => <span class="custom-node">TNode</span> });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });

  it('slots.content works fine', async () => {
    getCustomGuideStepMount({ 'v-slots': { content: () => <span class="custom-node">TNode</span> } });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });

  it('GuideStep.highlightContent works fine', async () => {
    getCustomGuideStepMount({ highlightContent: () => <span class="custom-node">TNode</span> });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });

  it('slots.highlightContent works fine', async () => {
    getCustomGuideStepMount({ 'v-slots': { highlightContent: () => <span class="custom-node">TNode</span> } });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });
  it('slots.highlight-content works fine', async () => {
    getCustomGuideStepMount({
      'v-slots': { 'highlight-content': () => <span class="custom-node">TNode</span> },
    });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });

  it(`GuideStep.highlightPadding is equal to 32`, async () => {
    getCustomGuideStepMount({ highlightPadding: 32 });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-guide__highlight--mask');
    expect(domWrapper.style.width).toBe('64px');
    expect(domWrapper.style.height).toBe('64px');
    expect(domWrapper.style.top).toBe('-32px');
    expect(domWrapper.style.left).toBe('-32px');
    const domWrapper1 = document.querySelector('.t-guide__reference');
    expect(domWrapper1.style.width).toBe('64px');
    expect(domWrapper1.style.height).toBe('64px');
    expect(domWrapper1.style.top).toBe('-32px');
    expect(domWrapper1.style.left).toBe('-32px');
  });

  const modeExpectedDom = ['.t-popup', '.t-guide__dialog'];
  ['popup', 'dialog'].forEach((item, index) => {
    it(`GuideStep.mode is equal to ${item}`, async () => {
      const wrapper = getCustomGuideStepMount({ mode: item });
      await mockDelay(200);
      const modeExpectedDomIndexDom = document.querySelector(modeExpectedDom[index]);
      expect(modeExpectedDomIndexDom).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it(`GuideStep.nextButtonProps is equal to {theme: 'warning'}`, async () => {
    getCustomMultipleGuideStepMount({ current: 1, nextButtonProps: { theme: 'warning' } });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-guide__next');
    expect(domWrapper.classList.contains('t-button--theme-warning')).toBeTruthy();
  });

  it(`GuideStep.placement is equal to bottom-left`, async () => {
    getCustomGuideStepMount({ placement: 'bottom-left' });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-popup');
    expect(domWrapper.getAttribute('data-popper-placement')).toBe('bottom-start');
    expect(document.body).toMatchSnapshot();
  });

  it(`GuideStep.popupProps is equal to {placement: 'top-left'}`, async () => {
    getCustomGuideStepMount({ popupProps: { placement: 'top-left' } });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-popup');
    expect(domWrapper.getAttribute('data-popper-placement')).toBe('top-start');
  });

  it(`GuideStep.prevButtonProps is equal to {theme: 'warning'}`, async () => {
    getCustomMultipleGuideStepMount({ current: 2, prevButtonProps: { theme: 'warning' } });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-guide__prev');
    expect(domWrapper.classList.contains('t-button--theme-warning')).toBeTruthy();
  });

  it('props.showOverlay: .t-guide__highlight--mask should exit if showOverlay=true', async () => {
    getCustomMultipleGuideStepMount({ showOverlay: true });
    await mockDelay(200);
    const tGuideHighlightMaskDom = document.querySelectorAll('.t-guide__highlight--mask');
    expect(tGuideHighlightMaskDom.length).toBe(1);
  });

  it('props.showOverlay: .t-guide__highlight--mask should not exit if showOverlay=false', async () => {
    getCustomMultipleGuideStepMount({ showOverlay: false });
    await mockDelay(200);
    const tGuideHighlightMaskDom = document.querySelector('.t-guide__highlight--mask');
    expect(tGuideHighlightMaskDom).toBeFalsy();
  });

  it(`GuideStep.skipButtonProps is equal to {theme: 'warning'}`, async () => {
    getCustomMultipleGuideStepMount({ current: 1, skipButtonProps: { theme: 'warning' } });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-guide__skip');
    expect(domWrapper.classList.contains('t-button--theme-warning')).toBeTruthy();
  });

  it(`GuideStep.stepOverlayClass is equal to t-test-guide-step-overlay`, async () => {
    getCustomGuideStepMount({ stepOverlayClass: 't-test-guide-step-overlay' });
    await mockDelay(200);
    const domWrapper = document.querySelector('.t-popup');
    expect(domWrapper.classList.contains('t-test-guide-step-overlay')).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });

  it('GuideStep.title works fine', async () => {
    getCustomGuideStepMount({ title: () => <span class="custom-node">TNode</span> });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });

  it('slots.title works fine', async () => {
    getCustomGuideStepMount({ 'v-slots': { title: () => <span class="custom-node">TNode</span> } });
    await mockDelay(200);
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });
});
