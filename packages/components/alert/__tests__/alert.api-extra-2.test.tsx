import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Fragment } from 'vue';
import { Alert } from '@tdesign/components/alert';

describe('Alert API extra coverage - round 2', () => {
  describe(':branches', () => {
    it(':renderIcon returns null when icon function returns null', () => {
      const wrapper = mount(() => <Alert icon={() => null}>text</Alert>);
      // 不应渲染 icon 容器
      expect(wrapper.find('.t-alert__icon').exists()).toBeFalsy();
    });

    it(':renderClose uses "close" slot when provided (isUsingClose = true)', async () => {
      const slots = {
        close: () => <span>关闭插槽</span>,
      };
      const wrapper = mount(() => <Alert v-slots={slots}>text</Alert>);
      const close = wrapper.find('.t-alert__close');
      expect(close.exists()).toBeTruthy();
      expect(close.text()).toBe('关闭插槽');
    });

    it(':renderDescription height short-circuit false branch in collapsed and expanded', async () => {
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
      expect((description.element as HTMLElement).style.height).toBe('');

      // 展开后也应保持未设置 height（覆盖展开路径的 false 分支）
      const collapse = description.find('.t-alert__collapse');
      expect(collapse.exists()).toBeTruthy();
      await collapse.trigger('click');
      expect((description.element as HTMLElement).style.height).toBe('');
    });

    it(':props.theme validator falsy branch (val is empty string)', () => {
      const wrapper = mount(() => <Alert theme={'' as any} message="text" />);
      const alert = wrapper.find('.t-alert');
      // 传入空字符串使 validator 走 !val 分支；类名将拼接为空后缀
      expect(alert.classes()).toContain('t-alert--');
    });
  });

  describe(':operation function prop (redundant guard)', () => {
    it(':operation via function still renders (sanity)', () => {
      const wrapper = mount(() => <Alert operation={() => <Fragment>op</Fragment>}>text</Alert>);
      const operation = wrapper.find('.t-alert__operation');
      expect(operation.exists()).toBeTruthy();
      expect(operation.text()).toBe('op');
    });
  });
});