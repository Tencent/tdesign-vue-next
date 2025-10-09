import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Fragment, nextTick } from 'vue';
import { AppIcon, CloseIcon } from 'tdesign-icons-vue-next';
import log from '@tdesign/common-js/log/index';

// 共享的 mock 存储与方法（避免 vi.mock 提升造成初始化问题）
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

// 部分 mock @tdesign/shared-utils：保留原导出（例如 withInstall），覆盖 on/off/addClass
vi.mock('@tdesign/shared-utils', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    on: h.onMock,
    off: h.offMock,
    addClass: h.addClassMock,
  };
});

// 在 mock 之后导入组件，使其使用上述模拟
import { Alert } from '@tdesign/components/alert';

describe('Alert API extra coverage', () => {
  describe(':lifecycle & events', () => {
    it(':onClosed triggered only when transitionend on alert root and opacity', async () => {
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

    it(':onClosed not triggered when propertyName is not opacity', async () => {
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
  });

  describe(':props branches', () => {
    it(':close (deprecated) triggers warnOnce and renders CloseIcon', async () => {
      const warnSpy = vi.spyOn(log, 'warnOnce');
      const wrapper = mount(() => <Alert close>text</Alert>);
      const close = wrapper.find('.t-alert__close');
      expect(close.exists()).toBeTruthy();
      expect(wrapper.findComponent(CloseIcon).exists()).toBeTruthy();
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it(':closeBtn as string', () => {
      const wrapper = mount(() => <Alert closeBtn="关闭">text</Alert>);
      const close = wrapper.find('.t-alert__close');
      expect(close.exists()).toBeTruthy();
      expect(close.text()).toBe('关闭');
    });

    it(':closeBtn via slot', () => {
      const slots = {
        closeBtn: () => <span>自定义关闭</span>,
      };
      const wrapper = mount(() => <Alert v-slots={slots}>text</Alert>);
      const close = wrapper.find('.t-alert__close');
      expect(close.exists()).toBeTruthy();
      expect(close.text()).toBe('自定义关闭');
    });

    it(':icon as function prop', () => {
      const wrapper = mount(() => <Alert icon={() => <AppIcon />}>text</Alert>);
      const icon = wrapper.find('.t-alert__icon');
      expect(icon.exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
    });

    it(':maxLine no collapse when maxLine=0', () => {
      const wrapper = mount(() => (
        <Alert maxLine={0} title="title">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Alert>
      ));
      const description = wrapper.find('.t-alert__description');
      expect(description.exists()).toBeTruthy();
      expect(description.find('.t-alert__collapse').exists()).toBeFalsy();
    });

    it(':theme invalid value triggers validator branch', () => {
      const wrapper = mount(() => <Alert theme={'unknown' as any} message="text" />);
      const alert = wrapper.find('.t-alert');
      // 即便 validator 警告，类名仍会跟随传入值，覆盖该分支
      expect(alert.classes()).toContain('t-alert--unknown');
    });

    it(':operation as function prop (in addition to slot case)', () => {
      const wrapper = mount(() => <Alert operation={() => <Fragment>op-area</Fragment>}>text</Alert>);
      const operation = wrapper.find('.t-alert__operation');
      expect(operation.exists()).toBeTruthy();
      expect(operation.text()).toBe('op-area');
    });
  });
});