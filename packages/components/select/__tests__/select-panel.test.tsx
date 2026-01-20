// @ts-nocheck
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { vi, describe, it, expect, afterEach, beforeAll } from 'vitest';
import { Select, OptionGroup, Option } from '@tdesign/components/select';

// Mock scrollTo for jsdom
beforeAll(() => {
  Element.prototype.scrollTo = vi.fn();
});

// 简单选项
const simpleOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
];

// 辅助函数：清理 DOM
const cleanupDOM = () => {
  // 清理 select 面板容器
  const panels = document.querySelectorAll('.t-select__list, .t-select__dropdown-inner');
  panels.forEach((panel) => {
    if (panel && panel.parentNode) {
      try {
        panel.parentNode.removeChild(panel);
      } catch (e) {
        // 忽略已卸载的元素
      }
    }
  });

  // 清理弹窗容器
  const popups = document.querySelectorAll('.t-popup');
  popups.forEach((popup) => {
    if (popup && popup.parentNode) {
      try {
        popup.parentNode.removeChild(popup);
      } catch (e) {
        // 忽略已卸载的元素
      }
    }
  });

  // 清理其他可能的残留元素
  const overlays = document.querySelectorAll('.t-popup__content');
  overlays.forEach((overlay) => {
    if (overlay && overlay.parentNode) {
      try {
        overlay.parentNode.removeChild(overlay);
      } catch (e) {
        // 忽略
      }
    }
  });
};

describe('Select Panel', () => {
  afterEach(() => {
    cleanupDOM();
  });

  describe(':base', () => {
    it('should render panel with options', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__dropdown-inner')).toBeTruthy();
      expect(document.querySelectorAll('.t-select-option').length).toBe(3);
    });

    it('should render empty state', async () => {
      const wrapper = mount({
        render() {
          return <Select options={[]}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__empty')).toBeTruthy();
    });

    it('should render loading state', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} loading></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__loading-tips')).toBeTruthy();
    });

    it('should render create option when creatable and filterable', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} filterable creatable></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.setValue('新选项');
      await nextTick();

      expect(document.querySelector('.t-select__create-option--special')).toBeTruthy();
    });
  });

  describe(':props.size', () => {
    it('should apply small size class', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} size="small"></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__dropdown-inner--size-s')).toBeTruthy();
    });

    it('should apply medium size class', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} size="medium"></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__dropdown-inner--size-m')).toBeTruthy();
    });

    it('should apply large size class', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} size="large"></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__dropdown-inner--size-l')).toBeTruthy();
    });
  });

  describe(':slots.panel', () => {
    it('should render panelTopContent', async () => {
      const wrapper = mount({
        render() {
          return (
            <Select options={simpleOptions} panelTopContent={() => <div class="custom-top">顶部内容</div>}></Select>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.custom-top')).toBeTruthy();
    });

    it('should render panelBottomContent', async () => {
      const wrapper = mount({
        render() {
          return (
            <Select
              options={simpleOptions}
              panelBottomContent={() => <div class="custom-bottom">底部内容</div>}
            ></Select>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.custom-bottom')).toBeTruthy();
    });

    it('should render both panelTopContent and panelBottomContent with virtual scroll', async () => {
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const wrapper = mount({
        render() {
          return (
            <Select
              options={manyOptions}
              scroll={{ type: 'virtual', threshold: 100 }}
              panelTopContent={() => <div class="custom-top">顶部内容</div>}
              panelBottomContent={() => <div class="custom-bottom">底部内容</div>}
            ></Select>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.custom-top')).toBeTruthy();
      expect(document.querySelector('.custom-bottom')).toBeTruthy();
    });
  });

  describe(':props.options.group', () => {
    it('should render grouped options', async () => {
      const groupedOptions = [
        {
          group: '分组1',
          children: [
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
          ],
        },
        {
          group: '分组2',
          children: [
            { label: '选项3', value: '3' },
            { label: '选项4', value: '4' },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Select options={groupedOptions}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelectorAll('.t-select-option-group').length).toBe(2);
      expect(document.querySelectorAll('.t-select-option').length).toBe(4);
    });

    it('should render grouped options with divider', async () => {
      const wrapper = mount({
        render() {
          return (
            <Select>
              <OptionGroup label="group1" divider>
                <Option value="1" label="1"></Option>
              </OptionGroup>
            </Select>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select-option-group__divider')).toBeTruthy();
    });
  });

  describe(':props.scroll', () => {
    it('should render virtual scroll panel', async () => {
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const wrapper = mount({
        render() {
          return <Select options={manyOptions} scroll={{ type: 'virtual', threshold: 100 }}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__dropdown-inner')).toBeTruthy();
    });

    it('should render virtual scroll with fixed row height', async () => {
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const wrapper = mount({
        render() {
          return (
            <Select
              options={manyOptions}
              scroll={{ type: 'virtual', threshold: 100, rowHeight: 30, isFixedRowHeight: true }}
            ></Select>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });

    it('should render virtual scroll with custom buffer size', async () => {
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const wrapper = mount({
        render() {
          return <Select options={manyOptions} scroll={{ type: 'virtual', threshold: 100, bufferSize: 10 }}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });
  });

  describe(':props.keys', () => {
    it('should handle custom keys', async () => {
      const customOptions = [
        { name: '选项1', id: '1' },
        { name: '选项2', id: '2' },
      ];
      const customKeys = { label: 'name', value: 'id' };
      const wrapper = mount({
        render() {
          return <Select options={customOptions} keys={customKeys}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const firstOption = document.querySelector('.t-select-option');
      expect(firstOption?.textContent).toContain('选项1');
    });

    it('should handle keys with content property', async () => {
      // 覆盖行 81: shouldOmitContent
      const customOptions = [
        { name: '选项1', content: '1' },
        { name: '选项2', content: '2' },
      ];
      const customKeys = { label: 'name', value: 'content' };
      const wrapper = mount({
        render() {
          return <Select options={customOptions} keys={customKeys}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelectorAll('.t-select-option').length).toBe(2);
    });
  });

  describe(':props.multiple', () => {
    it('should render checkboxes in multiple mode', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} multiple></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelectorAll('.t-checkbox').length).toBe(3);
    });

    it('should render checkAll option in multiple mode', async () => {
      const optionsWithCheckAll = [
        { label: '全选', checkAll: true },
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ];
      const wrapper = mount({
        render() {
          return <Select options={optionsWithCheckAll} multiple></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('li[title="全选"]')).toBeTruthy();
    });
  });

  describe(':props.options.content', () => {
    it('should render option with custom content function', async () => {
      const optionsWithContent = [
        {
          label: '选项1',
          value: '1',
          content: () => <span class="custom-content">自定义内容</span>,
        },
      ];
      const wrapper = mount({
        render() {
          return <Select options={optionsWithContent}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.custom-content')).toBeTruthy();
    });
  });

  describe(':props.options.disabled', () => {
    it('should render disabled options', async () => {
      const optionsWithDisabled = [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2', disabled: true },
        { label: '选项3', value: '3' },
      ];
      const wrapper = mount({
        render() {
          return <Select options={optionsWithDisabled}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelectorAll('.t-is-disabled').length).toBe(1);
    });
  });

  describe(':slots.empty', () => {
    it('should render custom empty content', async () => {
      const wrapper = mount({
        render() {
          return <Select options={[]}>{{ empty: () => <div class="custom-empty">没有数据</div> }}</Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.custom-empty')).toBeTruthy();
    });
  });

  describe(':props.loadingText', () => {
    it('should render custom loading text', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} loading loadingText="自定义加载中..."></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      // 断言弹窗内容包含自定义 loadingText 文本（不依赖 class，兼容实现变动）
      expect(document.querySelector('.t-select__dropdown-inner').textContent).toContain('自定义加载中');
    });

    it('should render loading text slot', async () => {
      const wrapper = mount({
        render() {
          return (
            <Select options={simpleOptions} loading>
              {{ loadingText: () => <div class="custom-loading">加载中...</div> }}
            </Select>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.custom-loading')).toBeTruthy();
    });
  });

  describe(':props.filterable', () => {
    it('should render filtered options', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} filterable></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.setValue('选项1');
      await nextTick();

      expect(document.querySelectorAll('.t-select-option').length).toBe(1);
    });

    it('should show empty state when filter has no results', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} filterable></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.setValue('不存在的选项');
      await nextTick();

      expect(document.querySelector('.t-select__empty')).toBeTruthy();
    });
  });
});
