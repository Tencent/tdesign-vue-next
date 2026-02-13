import { vi } from 'vitest';
import guideProps from '@tdesign/components/guide/props';
import { sleep } from '@tdesign/internal-utils';
import { mountSingleStep, mountMultiStep, mountCustomStep, mountCustomMultiStep } from './mount';

const cleanup = () => {
  document.querySelector('.t-guide__overlay')?.remove();
  document.querySelector('.t-guide__highlight--popup')?.remove();
  document.querySelector('.t-guide__highlight--dialog')?.remove();
  document.querySelector('.t-guide__reference')?.remove();
  document.querySelector('.t-guide__highlight--mask')?.remove();
  document.querySelector('.t-guide__highlight--nomask')?.remove();
  document.querySelector('.t-guide__wrapper')?.remove();
  document.querySelector('.t-popup')?.remove();
};

describe('Guide', () => {
  afterEach(cleanup);

  describe('props', () => {
    it(':current[number]', async () => {
      // current=0: 第一步，无 prev，有 skip + next，无 finish
      const wrapper1 = mountMultiStep({ current: 0 });
      await sleep(200);
      expect(document.querySelector('.t-guide__counter')?.textContent).toBe('1/3');
      expect(document.querySelector('.t-guide__title')).toBeTruthy();
      expect(document.querySelector('.t-guide__desc')).toBeTruthy();
      expect(document.querySelector('.t-guide__skip')).toBeTruthy();
      expect(document.querySelector('.t-guide__prev')).toBeFalsy();
      expect(document.querySelector('.t-guide__next')).toBeTruthy();
      expect(document.querySelector('.t-guide__finish')).toBeFalsy();
      wrapper1.unmount();
      cleanup();

      // current=1: 中间步骤，有 skip + prev + next，无 finish
      const wrapper2 = mountMultiStep({ current: 1 });
      await sleep(200);
      expect(document.querySelector('.t-guide__counter')?.textContent).toBe('2/3');
      expect(document.querySelector('.t-guide__skip')).toBeTruthy();
      expect(document.querySelector('.t-guide__prev')).toBeTruthy();
      expect(document.querySelector('.t-guide__next')).toBeTruthy();
      expect(document.querySelector('.t-guide__finish')).toBeFalsy();
      wrapper2.unmount();
      cleanup();

      // current=2: 最后一步，无 skip + next，有 prev + finish
      const wrapper3 = mountMultiStep({ current: 2 });
      await sleep(200);
      expect(document.querySelector('.t-guide__counter')?.textContent).toBe('3/3');
      expect(document.querySelector('.t-guide__skip')).toBeFalsy();
      expect(document.querySelector('.t-guide__prev')).toBeTruthy();
      expect(document.querySelector('.t-guide__next')).toBeFalsy();
      expect(document.querySelector('.t-guide__finish')).toBeTruthy();
      wrapper3.unmount();
      cleanup();

      // current=-1: 不展示
      const wrapper4 = mountMultiStep({ current: -1 });
      await sleep(200);
      expect(document.querySelector('.t-guide__counter')).toBeFalsy();
      wrapper4.unmount();
    });

    it(':steps[array]', async () => {
      // 单步引导：无 skip/prev/next，只有 finish
      const wrapper = mountSingleStep();
      await sleep(200);
      expect(document.querySelector('.t-guide__counter')?.textContent).toBe('1/1');
      expect(document.querySelector('.t-guide__title')).toBeTruthy();
      expect(document.querySelector('.t-guide__desc')).toBeTruthy();
      expect(document.querySelector('.t-guide__skip')).toBeFalsy();
      expect(document.querySelector('.t-guide__prev')).toBeFalsy();
      expect(document.querySelector('.t-guide__next')).toBeFalsy();
      expect(document.querySelector('.t-guide__finish')).toBeTruthy();
      wrapper.unmount();
    });

    it(':mode[popup/dialog]', async () => {
      const validator = guideProps.mode.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('popup')).toBe(true);
      expect(validator('dialog')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':hideCounter[boolean]', async () => {
      // 默认显示计数
      const wrapper1 = mountSingleStep();
      await sleep(200);
      expect(document.querySelector('.t-guide__counter')).toBeTruthy();
      wrapper1.unmount();
      cleanup();

      // hideCounter=true 隐藏计数
      const wrapper2 = mountSingleStep({ hideCounter: true });
      await sleep(200);
      expect(document.querySelector('.t-guide__counter')).toBeFalsy();
      wrapper2.unmount();
    });

    it(':hidePrev[boolean]', async () => {
      // current=1 默认显示上一步
      const wrapper1 = mountMultiStep({ current: 1 });
      await sleep(200);
      expect(document.querySelector('.t-guide__prev')).toBeTruthy();
      wrapper1.unmount();
      cleanup();

      // hidePrev=true 隐藏上一步
      const wrapper2 = mountMultiStep({ current: 1, hidePrev: true });
      await sleep(200);
      expect(document.querySelector('.t-guide__prev')).toBeFalsy();
      wrapper2.unmount();
    });

    it(':hideSkip[boolean]', async () => {
      // current=0 默认显示跳过
      const wrapper1 = mountMultiStep({ current: 0 });
      await sleep(200);
      expect(document.querySelector('.t-guide__skip')).toBeTruthy();
      wrapper1.unmount();
      cleanup();

      // hideSkip=true 隐藏跳过
      const wrapper2 = mountMultiStep({ current: 0, hideSkip: true });
      await sleep(200);
      expect(document.querySelector('.t-guide__skip')).toBeFalsy();
      wrapper2.unmount();
    });

    it(':highlightPadding[number]', async () => {
      const wrapper = mountSingleStep({ highlightPadding: 32 });
      await sleep(200);
      const highlight = document.querySelector('.t-guide__highlight--mask') as HTMLElement;
      expect(highlight.style.width).toBe('64px');
      expect(highlight.style.height).toBe('64px');
      expect(highlight.style.top).toBe('-32px');
      expect(highlight.style.left).toBe('-32px');
      const reference = document.querySelector('.t-guide__reference') as HTMLElement;
      expect(reference.style.width).toBe('64px');
      expect(reference.style.height).toBe('64px');
      expect(reference.style.top).toBe('-32px');
      expect(reference.style.left).toBe('-32px');
      wrapper.unmount();
    });

    it(':showOverlay[boolean]', async () => {
      // 默认 showOverlay=true，渲染 mask
      const wrapper1 = mountSingleStep({ showOverlay: true });
      await sleep(200);
      expect(document.querySelector('.t-guide__highlight--mask')).toBeTruthy();
      expect(document.querySelector('.t-guide__highlight--nomask')).toBeFalsy();
      wrapper1.unmount();
      cleanup();

      // showOverlay=false，渲染 nomask
      const wrapper2 = mountSingleStep({ showOverlay: false });
      await sleep(200);
      expect(document.querySelector('.t-guide__highlight--mask')).toBeFalsy();
      expect(document.querySelector('.t-guide__highlight--nomask')).toBeTruthy();
      wrapper2.unmount();
    });

    it(':zIndex[number]', async () => {
      const wrapper = mountSingleStep({ zIndex: 5000 });
      await sleep(200);
      const overlay = document.querySelector('.t-guide__overlay') as HTMLElement;
      expect(overlay.style.zIndex).toBe('4998');
      const highlight = document.querySelector('.t-guide__highlight--mask') as HTMLElement;
      expect(highlight.style.zIndex).toBe('4999');
      wrapper.unmount();
    });

    it(':counter[slot/function]', async () => {
      // props function 参数
      const fn = vi.fn();
      const wrapper1 = mountSingleStep({ counter: fn });
      await sleep(200);
      expect(fn).toHaveBeenCalled();
      expect(fn.mock.calls[0][1].total).toBe(1);
      expect(fn.mock.calls[0][1].current).toBe(0);
      wrapper1.unmount();
      cleanup();

      // props render node
      const wrapper2 = mountSingleStep({
        counter: () => <span class="custom-counter">自定义计数</span>,
      });
      await sleep(200);
      expect(document.querySelector('.custom-counter')).toBeTruthy();
      expect(document.querySelector('.t-guide__counter')).toBeTruthy();
      wrapper2.unmount();
      cleanup();

      // slot 参数
      const slotFn = vi.fn();
      const wrapper3 = mountSingleStep({}, { counter: slotFn });
      await sleep(200);
      expect(slotFn).toHaveBeenCalled();
      expect(slotFn.mock.calls[0][0].total).toBe(1);
      expect(slotFn.mock.calls[0][0].current).toBe(0);
      wrapper3.unmount();
    });

    it(':finishButtonProps[object]', async () => {
      const wrapper = mountMultiStep({ current: 2, finishButtonProps: { theme: 'warning' } });
      await sleep(200);
      expect(document.querySelector('.t-guide__finish')?.classList.contains('t-button--theme-warning')).toBe(true);
      wrapper.unmount();
    });

    it(':nextButtonProps[object]', async () => {
      const wrapper = mountMultiStep({ current: 1, nextButtonProps: { theme: 'warning' } });
      await sleep(200);
      expect(document.querySelector('.t-guide__next')?.classList.contains('t-button--theme-warning')).toBe(true);
      wrapper.unmount();
    });

    it(':prevButtonProps[object]', async () => {
      const wrapper = mountMultiStep({ current: 2, prevButtonProps: { theme: 'warning' } });
      await sleep(200);
      expect(document.querySelector('.t-guide__prev')?.classList.contains('t-button--theme-warning')).toBe(true);
      wrapper.unmount();
    });

    it(':skipButtonProps[object]', async () => {
      const wrapper = mountMultiStep({ current: 0, skipButtonProps: { theme: 'warning' } });
      await sleep(200);
      expect(document.querySelector('.t-guide__skip')?.classList.contains('t-button--theme-warning')).toBe(true);
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('onChange', async () => {
      // 点击下一步
      const onChangeFn1 = vi.fn();
      const wrapper1 = mountMultiStep({ current: 0, onChange: onChangeFn1 });
      await sleep(200);
      (document.querySelector('.t-guide__next') as HTMLElement).click();
      await wrapper1.vm.$nextTick();
      expect(onChangeFn1).toHaveBeenCalled();
      expect(onChangeFn1.mock.calls[0][0]).toBe(1);
      expect(onChangeFn1.mock.calls[0][1].e.type).toBe('click');
      expect(onChangeFn1.mock.calls[0][1].total).toBe(3);
      wrapper1.unmount();
      cleanup();

      // 点击上一步
      const onChangeFn2 = vi.fn();
      const wrapper2 = mountMultiStep({ current: 1, onChange: onChangeFn2 });
      await sleep(200);
      (document.querySelector('.t-guide__prev') as HTMLElement).click();
      await wrapper2.vm.$nextTick();
      expect(onChangeFn2).toHaveBeenCalled();
      expect(onChangeFn2.mock.calls[0][0]).toBe(0);
      expect(onChangeFn2.mock.calls[0][1].total).toBe(3);
      wrapper2.unmount();
    });

    it('onFinish', async () => {
      const onFinishFn = vi.fn();
      const wrapper = mountMultiStep({ current: 2, onFinish: onFinishFn });
      await sleep(200);
      (document.querySelector('.t-guide__finish') as HTMLElement).click();
      await wrapper.vm.$nextTick();
      expect(onFinishFn).toHaveBeenCalled();
      expect(onFinishFn.mock.calls[0][0].current).toBe(2);
      expect(onFinishFn.mock.calls[0][0].e.type).toBe('click');
      expect(onFinishFn.mock.calls[0][0].total).toBe(3);
      wrapper.unmount();
    });

    it('onNextStepClick', async () => {
      const onNextStepClickFn = vi.fn();
      const wrapper = mountMultiStep({ current: 1, onNextStepClick: onNextStepClickFn });
      await sleep(200);
      (document.querySelector('.t-guide__next') as HTMLElement).click();
      await wrapper.vm.$nextTick();
      expect(onNextStepClickFn).toHaveBeenCalled();
      expect(onNextStepClickFn.mock.calls[0][0].current).toBe(1);
      expect(onNextStepClickFn.mock.calls[0][0].next).toBe(2);
      expect(onNextStepClickFn.mock.calls[0][0].e.type).toBe('click');
      expect(onNextStepClickFn.mock.calls[0][0].total).toBe(3);
      wrapper.unmount();
    });

    it('onPrevStepClick', async () => {
      const onPrevStepClickFn = vi.fn();
      const wrapper = mountMultiStep({ current: 1, onPrevStepClick: onPrevStepClickFn });
      await sleep(200);
      (document.querySelector('.t-guide__prev') as HTMLElement).click();
      await wrapper.vm.$nextTick();
      expect(onPrevStepClickFn).toHaveBeenCalled();
      expect(onPrevStepClickFn.mock.calls[0][0].current).toBe(1);
      expect(onPrevStepClickFn.mock.calls[0][0].prev).toBe(0);
      expect(onPrevStepClickFn.mock.calls[0][0].e.type).toBe('click');
      expect(onPrevStepClickFn.mock.calls[0][0].total).toBe(3);
      wrapper.unmount();
    });

    it('onSkip', async () => {
      const onSkipFn = vi.fn();
      const wrapper = mountMultiStep({ current: 0, onSkip: onSkipFn });
      await sleep(200);
      (document.querySelector('.t-guide__skip') as HTMLElement).click();
      await wrapper.vm.$nextTick();
      expect(onSkipFn).toHaveBeenCalled();
      expect(onSkipFn.mock.calls[0][0].current).toBe(0);
      expect(onSkipFn.mock.calls[0][0].e.type).toBe('click');
      expect(onSkipFn.mock.calls[0][0].total).toBe(3);
      wrapper.unmount();
    });
  });
});

describe('GuideStep', () => {
  afterEach(cleanup);

  it(':body[slot/function]', async () => {
    // function
    const wrapper1 = mountCustomStep({ body: () => <span class="custom-body">自定义内容</span> });
    await sleep(200);
    expect(document.querySelector('.t-guide__desc .custom-body')).toBeTruthy();
    wrapper1.unmount();
    cleanup();

    // slot
    const wrapper2 = mountCustomStep({}, { body: () => <span class="slot-body">slot 内容</span> });
    await sleep(200);
    expect(document.querySelector('.slot-body')).toBeTruthy();
    wrapper2.unmount();
  });

  it(':content[slot/function]', async () => {
    // function — 自定义 content 后渲染 popup--content class
    const wrapper1 = mountCustomStep({ content: () => <span class="custom-content">自定义</span> });
    await sleep(200);
    expect(document.querySelector('.custom-content')).toBeTruthy();
    expect(document.querySelector('.t-guide__popup--content')).toBeTruthy();
    wrapper1.unmount();
    cleanup();

    // slot
    const wrapper2 = mountCustomStep({}, { content: () => <span class="slot-content">slot</span> });
    await sleep(200);
    expect(document.querySelector('.slot-content')).toBeTruthy();
    wrapper2.unmount();
  });

  it(':title[string]', async () => {
    // STEPS 中设定的字符串 title
    const wrapper1 = mountCustomStep();
    await sleep(200);
    expect(document.querySelector('.t-guide__title')?.textContent).toBe('新手引导标题');
    wrapper1.unmount();
    cleanup();

    // 自定义字符串
    const wrapper2 = mountCustomStep({ title: '自定义标题' });
    await sleep(200);
    expect(document.querySelector('.t-guide__title')?.textContent).toBe('自定义标题');
    wrapper2.unmount();
  });

  it(':title[slot]', async () => {
    const wrapper = mountCustomStep({}, { title: () => <span class="slot-title">slot 标题</span> });
    await sleep(200);
    expect(document.querySelector('.slot-title')).toBeTruthy();
    wrapper.unmount();
  });

  it(':highlightContent[slot/function]', async () => {
    // function
    const wrapper1 = mountCustomStep({
      highlightContent: () => <span class="custom-hl">高亮</span>,
    });
    await sleep(200);
    expect(document.querySelector('.custom-hl')).toBeTruthy();
    wrapper1.unmount();
    cleanup();

    // slot highlightContent (camelCase)
    const wrapper2 = mountCustomStep({}, { highlightContent: () => <span class="slot-hl-camel">camel</span> });
    await sleep(200);
    expect(document.querySelector('.slot-hl-camel')).toBeTruthy();
    wrapper2.unmount();
    cleanup();

    // slot highlight-content (kebab-case)
    const wrapper3 = mountCustomStep({}, { 'highlight-content': () => <span class="slot-hl-kebab">kebab</span> });
    await sleep(200);
    expect(document.querySelector('.slot-hl-kebab')).toBeTruthy();
    wrapper3.unmount();
  });

  it(':highlightPadding[number]', async () => {
    const wrapper = mountCustomStep({ highlightPadding: 32 });
    await sleep(200);
    const highlight = document.querySelector('.t-guide__highlight--mask') as HTMLElement;
    expect(highlight.style.width).toBe('64px');
    expect(highlight.style.height).toBe('64px');
    expect(highlight.style.top).toBe('-32px');
    expect(highlight.style.left).toBe('-32px');
    const reference = document.querySelector('.t-guide__reference') as HTMLElement;
    expect(reference.style.width).toBe('64px');
    expect(reference.style.height).toBe('64px');
    expect(reference.style.top).toBe('-32px');
    expect(reference.style.left).toBe('-32px');
    wrapper.unmount();
  });

  it(':mode[popup/dialog]', async () => {
    // popup
    const wrapper1 = mountCustomStep({ mode: 'popup' });
    await sleep(200);
    expect(document.querySelector('.t-popup')).toBeTruthy();
    expect(document.querySelector('.t-guide__dialog')).toBeFalsy();
    wrapper1.unmount();
    cleanup();

    // dialog
    const wrapper2 = mountCustomStep({ mode: 'dialog' });
    await sleep(200);
    expect(document.querySelector('.t-guide__dialog')).toBeTruthy();
    wrapper2.unmount();
  });

  it(':showOverlay[boolean]', async () => {
    const wrapper1 = mountCustomMultiStep({ showOverlay: true });
    await sleep(200);
    expect(document.querySelector('.t-guide__highlight--mask')).toBeTruthy();
    wrapper1.unmount();
    cleanup();

    const wrapper2 = mountCustomMultiStep({ showOverlay: false });
    await sleep(200);
    expect(document.querySelector('.t-guide__highlight--mask')).toBeFalsy();
    wrapper2.unmount();
  });

  it(':placement[string]', async () => {
    const wrapper = mountCustomStep({ placement: 'bottom-left' });
    await sleep(200);
    expect(document.querySelector('.t-popup')?.getAttribute('data-popper-placement')).toBe('bottom-start');
    wrapper.unmount();
  });

  it(':popupProps[object]', async () => {
    const wrapper = mountCustomStep({ popupProps: { placement: 'top-left' } });
    await sleep(200);
    expect(document.querySelector('.t-popup')?.getAttribute('data-popper-placement')).toBe('top-start');
    wrapper.unmount();
  });

  it(':stepOverlayClass[string]', async () => {
    const wrapper = mountCustomStep({ stepOverlayClass: 'my-overlay' });
    await sleep(200);
    expect(document.querySelector('.t-popup')?.classList.contains('my-overlay')).toBe(true);
    wrapper.unmount();
  });

  it(':nextButtonProps[object]', async () => {
    const wrapper = mountCustomMultiStep({ current: 1, nextButtonProps: { theme: 'warning' } });
    await sleep(200);
    expect(document.querySelector('.t-guide__next')?.classList.contains('t-button--theme-warning')).toBe(true);
    wrapper.unmount();
  });

  it(':prevButtonProps[object]', async () => {
    const wrapper = mountCustomMultiStep({ current: 2, prevButtonProps: { theme: 'warning' } });
    await sleep(200);
    expect(document.querySelector('.t-guide__prev')?.classList.contains('t-button--theme-warning')).toBe(true);
    wrapper.unmount();
  });

  it(':skipButtonProps[object]', async () => {
    const wrapper = mountCustomMultiStep({ current: 1, skipButtonProps: { theme: 'warning' } });
    await sleep(200);
    expect(document.querySelector('.t-guide__skip')?.classList.contains('t-button--theme-warning')).toBe(true);
    wrapper.unmount();
  });
});
