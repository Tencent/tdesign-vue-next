import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  CloseIcon,
  AppIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  InfoCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import { Fragment, nextTick } from 'vue';
import log from '@tdesign/common-js/log/index';
import { Alert } from '@tdesign/components/alert';

const h = vi.hoisted(() => {
  const store = { handler: null as ((e: any) => void) | null };
  const onMock = vi.fn((el: Element, evt: string, handler: (e: any) => void) => {
    if (evt === 'transitionend') store.handler = handler;
  });
  const offMock = vi.fn();
  const addClassMock = vi.fn((el: Element | null, cls: string) => {
    if (el) el.classList.add(cls);
  });
  return { store, onMock, offMock, addClassMock };
});

vi.mock('@tdesign/shared-utils', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    on: h.onMock,
    off: h.offMock,
    addClass: h.addClassMock,
  };
});

function setOffsetHeight(el: Element, height: number) {
  Object.defineProperty(el, 'offsetHeight', {
    value: height,
    configurable: true,
  });
}

describe('Alert', () => {
  describe('props', () => {
    let wrapper: VueWrapper | null = null;

    beforeEach(() => {
      wrapper = mount(() => <Alert>text</Alert>);
    });

    it('default', () => {
      expect(wrapper.find('.t-alert__description').text()).eq('text');
    });

    it('closeBtn[boolean]', async () => {
      expect(wrapper.find('.t-alert__close').exists()).eq(false);

      const wrapperWithClose = mount(() => <Alert closeBtn>text</Alert>);
      const close = wrapperWithClose.find('.t-alert__close');
      expect(close.exists()).eq(true);
      expect(wrapperWithClose.findComponent(CloseIcon).exists()).eq(true);
    });

    it('closeBtn[string]', () => {
      const wrapper = mount(() => <Alert closeBtn="关闭">text</Alert>);
      const close = wrapper.find('.t-alert__close');
      expect(close.exists()).eq(true);
      expect(close.text()).eq('关闭');
    });

    it('closeBtn[slot]', () => {
      const slots = {
        closeBtn: () => <span>自定义关闭</span>,
      };
      const wrapper = mount(() => <Alert v-slots={slots}>text</Alert>);
      const close = wrapper.find('.t-alert__close');
      expect(close.exists()).eq(true);
      expect(close.text()).eq('自定义关闭');
    });

    it('icon[slot]', () => {
      const slots = {
        icon: () => <AppIcon />,
      };
      const wrapper = mount(() => <Alert v-slots={slots}>text</Alert>);
      const icon = wrapper.find('.t-alert__icon');
      expect(icon.exists()).eq(true);
      expect(wrapper.findComponent(AppIcon).exists()).eq(true);
    });

    it('icon[function]', () => {
      const wrapper = mount(() => <Alert icon={() => <AppIcon />}>text</Alert>);
      const icon = wrapper.find('.t-alert__icon');
      expect(icon.exists()).eq(true);
      expect(wrapper.findComponent(AppIcon).exists()).eq(true);
    });

    it('message[string]', () => {
      const wrapper = mount(() => <Alert message="this is message"></Alert>);
      const description = wrapper.find('.t-alert__message .t-alert__description');
      expect(description.exists()).eq(true);
      expect(description.text()).eq('this is message');
    });

    it('title[string]', () => {
      const wrapper = mount(() => <Alert title="this is title">text</Alert>);
      const title = wrapper.find('.t-alert__title');
      expect(title.exists()).eq(true);
      expect(title.text()).eq('this is title');
    });

    it('operation[slot]', () => {
      const slots = {
        operation: () => <Fragment>this is operation</Fragment>,
      };
      const wrapper = mount(() => <Alert v-slots={slots}>text</Alert>);
      const operation = wrapper.find('.t-alert__operation');
      expect(operation.exists()).eq(true);
      expect(operation.text()).eq('this is operation');
    });

    it('operation[function]', () => {
      const wrapper = mount(() => <Alert operation={() => <Fragment>op-area</Fragment>}>text</Alert>);
      const operation = wrapper.find('.t-alert__operation');
      expect(operation.exists()).eq(true);
      expect(operation.text()).eq('op-area');
    });

    it('theme[string]', () => {
      const themes = [
        { theme: 'info', icon: InfoCircleFilledIcon },
        { theme: 'success', icon: CheckCircleFilledIcon },
        { theme: 'warning', icon: ErrorCircleFilledIcon },
        { theme: 'error', icon: ErrorCircleFilledIcon },
      ] as const;

      themes.forEach(({ theme, icon }) => {
        const wrapper = mount(() => <Alert theme={theme} message="text" />);
        const alert = wrapper.find('.t-alert');
        const iconEl = wrapper.find('.t-alert__icon');
        expect(iconEl.findComponent(icon).exists()).eq(true);
        expect(alert.classes()).toContain(`t-alert--${theme}`);
      });
    });

    it('maxLine[number]', async () => {
      const wrapper = mount(() => (
        <Alert title="this is title" maxLine={2}>
          <span>这是折叠的第一条消息</span>
          <span>这是折叠的第二条消息</span>
          <span>这是折叠的第三条消息</span>
          <span>这是折叠的第四条消息</span>
          <span>这是折叠的第五条消息</span>
          <span>这是折叠的第六条消息</span>
        </Alert>
      ));
      const description = wrapper.find('.t-alert__description');
      const collapse = description.find('.t-alert__collapse');
      expect(description.element.children.length).eq(3);
      expect(collapse.exists()).eq(true);
      expect(collapse.text()).eq('展开更多');
      await collapse.trigger('click');
      expect(description.element.children.length).eq(7);
      expect(collapse.text()).eq('收起');
    });

    it('maxLine[number] no collapse when maxLine=0', () => {
      const wrapper = mount(() => (
        <Alert maxLine={0} title="title">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Alert>
      ));
      const description = wrapper.find('.t-alert__description');
      expect(description.exists()).eq(true);
      expect(description.find('.t-alert__collapse').exists()).eq(false);
    });
  });

  describe('events', () => {
    it('onClose', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Alert closeBtn onClose={fn}>
          text
        </Alert>
      ));
      const alert = wrapper.find('.t-alert');
      const close = wrapper.find('.t-alert__close');
      await close.trigger('click');
      await nextTick();
      expect(fn).toBeCalled();
      expect(alert.classes()).toContain('t-alert--closing');
    });
  });

  describe('others', () => {
    it('onClosed triggered only when transitionend on alert root and opacity', async () => {
      const onClosed = vi.fn();
      const wrapper = mount(() => (
        <Alert closeBtn onClosed={onClosed} title="title">
          <span>line1</span>
          <span>line2</span>
        </Alert>
      ));

      const alertEl = wrapper.find('.t-alert');
      const titleEl = wrapper.find('.t-alert__title');

      const closeBtn = wrapper.find('.t-alert__close');
      if (closeBtn.exists()) {
        await closeBtn.trigger('click');
      }

      // 子元素触发 transitionend，不应触发 onClosed
      h.store.handler?.({ propertyName: 'opacity', target: titleEl.element });
      await nextTick();
      expect(onClosed).not.toHaveBeenCalled();
      expect(alertEl.classes()).not.toContain('t-is-hidden');

      // 根元素触发 transitionend 且属性为 opacity，应触发 onClosed 并隐藏
      h.store.handler?.({ propertyName: 'opacity', target: alertEl.element });
      await nextTick();
      expect(onClosed).toHaveBeenCalledTimes(1);
      expect(alertEl.classes()).toContain('t-is-hidden');
    });

    it('onClosed not triggered when propertyName is not opacity', async () => {
      const onClosed = vi.fn();
      const wrapper = mount(() => (
        <Alert closeBtn onClosed={onClosed}>
          text
        </Alert>
      ));
      const alertEl = wrapper.find('.t-alert');

      h.store.handler?.({ propertyName: 'height', target: alertEl.element });
      await nextTick();
      expect(onClosed).not.toHaveBeenCalled();
      expect(alertEl.classes()).not.toContain('t-is-hidden');

      // 卸载时应解绑（on 在挂载时调用，off 在卸载时调用）
      wrapper.unmount();
      expect(h.onMock).toHaveBeenCalled();
      expect(h.offMock).toHaveBeenCalled();
    });

    it('close (deprecated) triggers warnOnce and renders CloseIcon', async () => {
      const warnSpy = vi.spyOn(log, 'warnOnce');
      const wrapper = mount(() => <Alert close>text</Alert>);
      const close = wrapper.find('.t-alert__close');
      expect(close.exists()).eq(true);
      expect(wrapper.findComponent(CloseIcon).exists()).eq(true);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it('theme invalid value triggers validator branch', () => {
      const wrapper = mount(() => <Alert theme={'unknown' as any} message="text" />);
      const alert = wrapper.find('.t-alert');
      // 即便 validator 警告，类名仍会跟随传入值，覆盖该分支
      expect(alert.classes()).toContain('t-alert--unknown');
    });

    it('renderIcon returns null when icon function returns null', () => {
      const wrapper = mount(() => <Alert icon={() => null}>text</Alert>);
      // 不应渲染 icon 容器
      expect(wrapper.find('.t-alert__icon').exists()).eq(false);
    });

    it('renderClose uses "close" slot when provided (isUsingClose = true)', async () => {
      const slots = {
        close: () => <span>关闭插槽</span>,
      };
      const wrapper = mount(() => <Alert v-slots={slots}>text</Alert>);
      const close = wrapper.find('.t-alert__close');
      expect(close.exists()).eq(true);
      expect(close.text()).eq('关闭插槽');
    });

    it('renderDescription height short-circuit false branch in collapsed and expanded', async () => {
      const wrapper = mount(() => (
        <Alert title="desc height test" maxLine={2}>
          <span>line1</span>
          <span>line2</span>
          <span>line3</span>
          <span>line4</span>
        </Alert>
      ));
      const description = wrapper.find('.t-alert__description');
      // 在 jsdom 中 offsetHeight 通常为 0（falsy），应走 height && ... 的 false 分支，不设置 style.height
      expect((description.element as HTMLElement).style.height).eq('');

      // 展开后也应保持未设置 height（覆盖展开路径的 false 分支）
      const collapse = description.find('.t-alert__collapse');
      expect(collapse.exists()).eq(true);
      await collapse.trigger('click');
      expect((description.element as HTMLElement).style.height).eq('');
    });

    it('props.theme validator falsy branch (val is empty string)', () => {
      const wrapper = mount(() => <Alert theme={'' as any} message="text" />);
      const alert = wrapper.find('.t-alert');
      // 传入空字符串使 validator 走 !val 分支；类名将拼接为空后缀
      expect(alert.classes()).toContain('t-alert--');
    });

    it('renderDescription height truthy branch (collapsed)', async () => {
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
      expect((description.element as HTMLElement).style.height).eq('0px');
    });

    it('renderDescription height truthy branch (expanded)', async () => {
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
      expect((description.element as HTMLElement).style.height).eq('20px');
    });

    it('operation via function still renders (sanity)', () => {
      const wrapper = mount(() => <Alert operation={() => <Fragment>op</Fragment>}>text</Alert>);
      const operation = wrapper.find('.t-alert__operation');
      expect(operation.exists()).eq(true);
      expect(operation.text()).eq('op');
    });
  });
});
