import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { CloseCircleIcon } from 'tdesign-icons-vue-next';

import { Tag } from '@tdesign/components/tag';
import ConfigProvider from '@tdesign/components/config-provider';
import props from '@tdesign/components/tag/props';

const TAG = '.t-tag';
const TAG_TEXT = '.t-tag--text';
const TAG_CLOSE_ICON = '.t-tag__icon-close';

describe('Tag', () => {
  describe('props', () => {
    it(':closable[boolean]', () => {
      // default: false
      expect(
        mount(<Tag />)
          .find(TAG_CLOSE_ICON)
          .exists(),
      ).toBe(false);

      // true
      expect(
        mount(<Tag closable />)
          .find(TAG_CLOSE_ICON)
          .exists(),
      ).toBe(true);

      // false
      expect(
        mount(<Tag closable={false} />)
          .find(TAG_CLOSE_ICON)
          .exists(),
      ).toBe(false);
    });

    it(':color[string]', () => {
      // 未设置 color 时不追加任何颜色样式
      const wrapper = mount(<Tag />);
      expect(wrapper.element.style.backgroundColor).toBe('');
      expect(wrapper.element.style.color).toBe('');

      // variant: dark（默认）
      const dark = mount(<Tag color="#ff0000" />);
      expect(dark.element.style.backgroundColor).toBe('rgb(255, 0, 0)');
      expect(dark.element.style.color).toBe('white');

      // variant: light
      const light = mount(<Tag color="#ff0000" variant="light" />);
      expect(light.element.style.backgroundColor).toBe('rgba(255, 0, 0, 0.1)');
      expect(light.element.style.color).toBe('rgb(255, 0, 0)');

      // variant: outline
      const outline = mount(<Tag color="#ff0000" variant="outline" />);
      expect(outline.element.style.borderColor).toBe('#ff0000');
      expect(outline.element.style.color).toBe('rgb(255, 0, 0)');
      expect(outline.element.style.backgroundColor).toBe('');

      // variant: light-outline
      const lightOutline = mount(<Tag color="#ff0000" variant="light-outline" />);
      expect(lightOutline.element.style.borderColor).toBe('#ff0000');
      expect(lightOutline.element.style.color).toBe('rgb(255, 0, 0)');
      expect(lightOutline.element.style.backgroundColor).toBe('rgba(255, 0, 0, 0.1)');
    });

    it(':color[luminance]', () => {
      // 亮度大于 0.5，dark 变体下文字为黑色
      expect(mount(<Tag color="#ffffff" variant="dark" />).element.style.color).toBe('black');

      // 亮度小于等于 0.5，dark 变体下文字为白色
      expect(mount(<Tag color="#000000" variant="dark" />).element.style.color).toBe('white');
    });

    it(':content[string/function]', () => {
      expect(mount(<Tag content="Hello World" />).text()).toContain('Hello World');

      const wrapper = mount(<Tag content={() => <span class="custom-node">TNode</span>} />);
      expect(wrapper.find('.custom-node').exists()).toBe(true);
    });

    it(':default[string/function]', () => {
      expect(mount(<Tag default="Default Content" />).text()).toContain('Default Content');

      const wrapper = mount(<Tag default={() => <span class="custom-node">TNode</span>} />);
      expect(wrapper.find('.custom-node').exists()).toBe(true);
    });

    it(':disabled[boolean]', () => {
      // default: false
      expect(mount(<Tag />).classes()).not.toContain('t-tag--disabled');

      // true
      expect(mount(<Tag disabled />).classes()).toContain('t-tag--disabled');

      // false
      expect(mount(<Tag disabled={false} />).classes()).not.toContain('t-tag--disabled');
    });

    it(':icon[function]', () => {
      const wrapper = mount(<Tag icon={() => <span class="custom-icon">Icon</span>} />);
      expect(wrapper.find('.custom-icon').exists()).toBe(true);
    });

    it(':maxWidth[string/number]', () => {
      const content = 'This is a long long long long long tag';

      const wrapper = mount(<Tag maxWidth={150} content={content} />);
      const text = wrapper.find(TAG_TEXT);
      expect(text.attributes('title')).toBe(content);
      expect((text.element as HTMLElement).style.maxWidth).toBe('150px');
      expect(wrapper.classes()).toContain('t-tag--ellipsis');

      const wrapper2 = mount(<Tag maxWidth="150px" content={content} />);
      const text2 = wrapper2.find(TAG_TEXT);
      expect(text2.attributes('title')).toBe(content);
      expect((text2.element as HTMLElement).style.maxWidth).toBe('150px');
    });

    it(':shape[square/round/mark]', () => {
      const { validator } = props.shape;
      expect(validator('square')).toBe(true);
      expect(validator('round')).toBe(true);
      expect(validator('mark')).toBe(true);
      // @ts-expect-error 校验非法枚举值
      expect(validator('circle')).toBe(false);
      // @ts-expect-error 空值不参与校验
      expect(validator('')).toBe(true);
      expect(validator(undefined)).toBe(true);

      // default: square，不追加形状类名
      expect(mount(<Tag />).classes()).not.toContain('t-tag--square');
      expect(mount(<Tag shape="square" />).classes()).not.toContain('t-tag--square');

      expect(mount(<Tag shape="round" />).classes()).toContain('t-tag--round');
      expect(mount(<Tag shape="mark" />).classes()).toContain('t-tag--mark');
    });

    it(':size[small/medium/large]', () => {
      const { validator } = props.size;
      expect(validator('small')).toBe(true);
      expect(validator('medium')).toBe(true);
      expect(validator('large')).toBe(true);
      // @ts-expect-error 校验非法枚举值
      expect(validator('mini')).toBe(false);
      // @ts-expect-error 空值不参与校验
      expect(validator('')).toBe(true);
      expect(validator(undefined)).toBe(true);

      expect(mount(<Tag size="small" />).classes()).toContain('t-size-s');
      // medium 为默认值，不追加尺寸类名
      expect(mount(<Tag size="medium" />).classes()).not.toContain('t-size-m');
      expect(mount(<Tag size="large" />).classes()).toContain('t-size-l');
    });

    it(':theme[default/primary/warning/danger/success]', () => {
      const { validator } = props.theme;
      expect(validator('default')).toBe(true);
      expect(validator('primary')).toBe(true);
      expect(validator('warning')).toBe(true);
      expect(validator('danger')).toBe(true);
      expect(validator('success')).toBe(true);
      // @ts-expect-error 校验非法枚举值
      expect(validator('info')).toBe(false);
      // @ts-expect-error 空值不参与校验
      expect(validator('')).toBe(true);
      expect(validator(undefined)).toBe(true);

      (['default', 'primary', 'warning', 'danger', 'success'] as const).forEach((theme) => {
        expect(mount(<Tag theme={theme} />).classes()).toContain(`t-tag--${theme}`);
      });
    });

    it(':title[string]', () => {
      // 未显式传入 title 时，默认展示标签内容
      expect(
        mount(<Tag content="Default Title Content" />)
          .find(`${TAG} > span`)
          .attributes('title'),
      ).toBe('Default Title Content');

      // 默认插槽内容作为 title
      expect(
        mount(<Tag>Default Title Content</Tag>)
          .find(`${TAG} > span`)
          .attributes('title'),
      ).toBe('Default Title Content');

      // 多个子节点时拼接文本
      const wrapper = mount(
        <Tag>
          <span>Content</span>
          <span>Text</span>
        </Tag>,
      );
      expect(wrapper.find(`${TAG} > span`).attributes('title')).toBe('Content Text');

      // 自定义 title 优先
      const title = 'This is a title';
      expect(
        mount(<Tag title={title} content="This is a content" />)
          .find(`${TAG} > span`)
          .attributes('title'),
      ).toBe(title);

      // 空字符串等价于不展示 title
      expect(
        mount(<Tag title="" content="This is a content" />)
          .find(`${TAG} > span`)
          .attributes('title'),
      ).toBe(undefined);
    });

    it(':title[boolean]', () => {
      expect(
        mount(<Tag title content="Tag Content" />)
          .find(`${TAG} > span`)
          .attributes('title'),
      ).toBe('Tag Content');

      // 标签无内容时，即使 title 为 true 也不展示
      expect(
        mount(<Tag title />)
          .find(`${TAG} > span`)
          .attributes('title'),
      ).toBe(undefined);

      expect(
        mount(<Tag title={false} content="Tag Content" />)
          .find(`${TAG} > span`)
          .attributes('title'),
      ).toBe(undefined);
    });

    it(':variant[dark/light/outline/light-outline]', () => {
      const { validator } = props.variant;
      expect(validator('dark')).toBe(true);
      expect(validator('light')).toBe(true);
      expect(validator('outline')).toBe(true);
      expect(validator('light-outline')).toBe(true);
      // @ts-expect-error 校验非法枚举值
      expect(validator('plain')).toBe(false);
      // @ts-expect-error 空值不参与校验
      expect(validator('')).toBe(true);
      expect(validator(undefined)).toBe(true);

      // dark 为默认值
      expect(mount(<Tag />).classes()).toContain('t-tag--dark');
      expect(mount(<Tag variant="dark" />).classes()).toContain('t-tag--dark');
      expect(mount(<Tag variant="light" />).classes()).toContain('t-tag--light');
      expect(mount(<Tag variant="outline" />).classes()).toContain('t-tag--outline');
      expect(mount(<Tag variant="light-outline" />).classes()).toContain('t-tag--light-outline');
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(<Tag>Default Slot</Tag>);
      expect(wrapper.text()).toBe('Default Slot');
    });

    it('icon', () => {
      const wrapper = mount(<Tag v-slots={{ icon: () => <span class="slot-icon">Icon</span> }} />);
      expect(wrapper.find('.slot-icon').exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('onClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Tag onClick={fn} />);
      await wrapper.find(TAG).trigger('click');

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn.mock.calls[0][0].e.type).toBe('click');
    });

    it('onClick: should not be triggered when disabled', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Tag disabled onClick={fn} />);
      await wrapper.find(TAG).trigger('click');

      expect(fn).not.toHaveBeenCalled();
    });

    it('onClick: should not be triggered when clicking the close icon', async () => {
      const onClickFn = vi.fn();
      const onCloseFn = vi.fn();
      const wrapper = mount(<Tag closable onClick={onClickFn} onClose={onCloseFn} />);
      await wrapper.find(TAG_CLOSE_ICON).trigger('click');

      expect(onCloseFn).toHaveBeenCalledTimes(1);
      expect(onCloseFn.mock.calls[0][0].e.type).toBe('click');
      expect(onClickFn).not.toHaveBeenCalled();
    });

    it('onClick: no handler', async () => {
      const wrapper = mount(<Tag />);
      await wrapper.find(TAG).trigger('click');

      expect(wrapper.find(TAG).exists()).toBe(true);
    });

    it('onClose', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Tag closable onClose={fn} />);
      await wrapper.find(TAG_CLOSE_ICON).trigger('click');

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn.mock.calls[0][0].e.type).toBe('click');
    });

    it('onClose: no handler', async () => {
      const wrapper = mount(<Tag closable />);
      await wrapper.find(TAG_CLOSE_ICON).trigger('click');

      expect(wrapper.find(TAG_CLOSE_ICON).exists()).toBe(true);
    });

    it('onClose: close icon is not rendered when disabled', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Tag closable disabled onClose={fn} />);
      expect(wrapper.find(TAG_CLOSE_ICON).exists()).toBe(false);

      await wrapper.find(TAG).trigger('click');
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe('globalConfig', () => {
    it('closeIcon', async () => {
      const onCloseFn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <ConfigProvider globalConfig={{ tag: { closeIcon: () => <CloseCircleIcon class="custom-close-icon" /> } }}>
              <Tag closable onClose={onCloseFn} />
            </ConfigProvider>
          );
        },
      });

      // 使用全局配置的关闭图标
      expect(wrapper.find('.custom-close-icon').exists()).toBe(true);
      expect(wrapper.find(TAG_CLOSE_ICON).classes()).toContain('custom-close-icon');

      // 自定义关闭图标同样需要触发 onClose
      await wrapper.find(TAG_CLOSE_ICON).trigger('click');
      expect(onCloseFn).toHaveBeenCalledTimes(1);
      expect(onCloseFn.mock.calls[0][0].e.type).toBe('click');
    });
  });
});
