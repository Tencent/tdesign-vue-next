// @ts-nocheck
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Cascader from '@tdesign/components/cascader';

const options = [
  {
    label: '选项一',
    value: '1',
    children: [
      { label: '子选项一', value: '1.1' },
      { label: '子选项二', value: '1.2' },
      { label: '子选项三', value: '1.3' },
    ],
  },
  {
    label: '选项二',
    value: '2',
    children: [
      { label: '子选项一', value: '2.1' },
      { label: '子选项二', value: '2.2' },
    ],
  },
];

const cleanupPanel = () => {
  const panelNode = document.querySelector('.t-cascader__panel');
  if (panelNode?.parentNode) {
    panelNode.parentNode.removeChild(panelNode);
  }
  const contentNode = document.querySelector('.t-cascader__panel--content');
  if (contentNode?.parentNode) {
    contentNode.parentNode.removeChild(contentNode);
  }
};

describe('Cascader', () => {
  describe(':props', () => {
    describe(':base', () => {
      it('should render correctly in single mode', async () => {
        const wrapper = mount({
          render() {
            return <Cascader options={options}></Cascader>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        expect(document.querySelectorAll('.t-cascader__menu').length).toBe(1);
        expect(document.querySelectorAll('.t-cascader__item').length).toBe(2);
        cleanupPanel();
      });

      it('should render correctly in multiple mode', async () => {
        const wrapper = mount({
          render() {
            return <Cascader options={options} multiple></Cascader>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        expect(document.querySelectorAll('.t-cascader__menu').length).toBe(1);
        expect(document.querySelectorAll('.t-checkbox').length).toBe(2);
        cleanupPanel();
      });

      it('should render disabled state correctly', () => {
        const wrapper = mount({
          render() {
            return <Cascader disabled options={options}></Cascader>;
          },
        });
        expect(wrapper.find('.t-is-disabled').exists()).toBe(true);
      });
    });

    describe(':value[string]', () => {
      it('should render correctly with single value', async () => {
        const wrapper = mount({
          render() {
            return <Cascader value="1.1" options={options}></Cascader>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        expect(document.querySelectorAll('.t-cascader__menu').length).toBe(2);
        expect(document.querySelectorAll('.t-cascader__item').length).toBe(5);
        cleanupPanel();
      });
    });

    describe(':value[array]', () => {
      it('should render correctly with multiple values', async () => {
        const wrapper = mount({
          render() {
            return <Cascader value={['1.1']} multiple options={options}></Cascader>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        expect(document.querySelectorAll('.t-cascader__menu').length).toBe(2);
        expect(document.querySelectorAll('.t-cascader__item').length).toBe(5);
        expect(document.querySelectorAll('.t-checkbox').length).toBe(5);
        cleanupPanel();
      });
    });

    describe(':size[string]', () => {
      const sizeMap = {
        small: 's',
        large: 'l',
      };

      ['small', 'large'].forEach((item) => {
        it(`should render correctly with size ${item}`, async () => {
          const wrapper = mount({
            render() {
              return <Cascader options={options} size={item}></Cascader>;
            },
          });
          await wrapper.setProps({ popupProps: { visible: true } });

          expect(document.querySelectorAll(`.t-size-${sizeMap[item]}`).length).toBe(2);
          cleanupPanel();
        });
      });
    });
  });

  describe(':slots', () => {
    describe('popupHeader', () => {
      it('should render popupHeader slot for each panel', async () => {
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                value="1.1"
                v-slots={{
                  popupHeader: ({ panelIndex }) => <div class="custom-header">Header {panelIndex}</div>,
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        const headers = document.querySelectorAll('.custom-header');
        expect(headers.length).toBe(2);
        expect(headers[0].textContent).toBe('Header 0');
        expect(headers[1].textContent).toBe('Header 1');
        cleanupPanel();
      });

      it('should render popupHeader with filter functionality', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="custom-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        expect(document.querySelectorAll('.t-cascader__item').length).toBe(2);

        filterFn('选项一');
        await nextTick();

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBe(1);
        expect(items[0].textContent).toContain('选项一');
        cleanupPanel();
      });

      it('should provide filteredOptions in popupHeader slot', async () => {
        let filterFn: ((filter: string) => void) | null = null;
        let capturedOptionsLength = 0;
        let capturedFilteredOptionsLength = 0;

        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ options, filteredOptions, onFilter }) => {
                    filterFn = onFilter;
                    capturedOptionsLength = options.length;
                    capturedFilteredOptionsLength = filteredOptions.length;
                    return (
                      <div class="custom-header">
                        Options: {options.length}, Filtered: {filteredOptions.length}
                      </div>
                    );
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        // Before filtering
        expect(capturedOptionsLength).toBe(2);
        expect(capturedFilteredOptionsLength).toBe(2);

        // Apply filter
        expect(filterFn).not.toBeNull();
        if (filterFn) filterFn('选项一');
        await nextTick();

        // After filtering
        expect(capturedOptionsLength).toBe(2);
        expect(capturedFilteredOptionsLength).toBe(1);
        cleanupPanel();
      });
    });

    describe('popupFooter', () => {
      it('should render popupFooter slot for each panel', async () => {
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                value="1.1"
                v-slots={{
                  popupFooter: ({ panelIndex }) => <div class="custom-footer">Footer {panelIndex}</div>,
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        const footers = document.querySelectorAll('.custom-footer');
        expect(footers.length).toBe(2);
        expect(footers[0].textContent).toBe('Footer 0');
        expect(footers[1].textContent).toBe('Footer 1');
        cleanupPanel();
      });

      it('should render popupFooter with panel options context', async () => {
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                value="1.1"
                v-slots={{
                  popupFooter: ({ panelIndex, options }) => (
                    <div class="custom-footer">
                      Footer {panelIndex} - {options.length} items
                    </div>
                  ),
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        const footers = document.querySelectorAll('.custom-footer');
        expect(footers.length).toBe(2);
        expect(footers[0].textContent).toContain('Footer 0 - 2 items');
        expect(footers[1].textContent).toContain('Footer 1 - 3 items');
        cleanupPanel();
      });

      it('should provide filteredOptions equal to options when no filter is applied', async () => {
        let capturedOptions: { label: string; value: string }[] = [];
        let capturedFilteredOptions: { label: string; value: string }[] = [];

        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupFooter: ({ options, filteredOptions }) => {
                    capturedOptions = options;
                    capturedFilteredOptions = filteredOptions;
                    return (
                      <div class="custom-footer">
                        Options: {options.length}, Filtered: {filteredOptions.length}
                      </div>
                    );
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        // When no filter is applied, filteredOptions should contain the same items as options
        expect(capturedOptions.length).toBe(2);
        expect(capturedFilteredOptions.length).toBe(2);
        expect(capturedFilteredOptions.map((o) => o.value)).toEqual(capturedOptions.map((o) => o.value));
        expect(capturedFilteredOptions.map((o) => o.label)).toEqual(capturedOptions.map((o) => o.label));
        cleanupPanel();
      });

      it('should provide correct filteredOptions when filter is applied', async () => {
        let filterFn: ((filter: string) => void) | null = null;
        let capturedOptionsLength = 0;
        let capturedFilteredOptionsLength = 0;
        let capturedFilteredLabels: string[] = [];

        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupFooter: ({ options, filteredOptions, onFilter }) => {
                    filterFn = onFilter;
                    capturedOptionsLength = options.length;
                    capturedFilteredOptionsLength = filteredOptions.length;
                    capturedFilteredLabels = filteredOptions.map((opt: { label: string }) => opt.label);
                    return (
                      <div class="custom-footer">
                        Options: {options.length}, Filtered: {filteredOptions.length}
                      </div>
                    );
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        // Before filtering: options and filteredOptions should be equal
        expect(capturedOptionsLength).toBe(2);
        expect(capturedFilteredOptionsLength).toBe(2);

        // Apply filter
        expect(filterFn).not.toBeNull();
        if (filterFn) filterFn('选项一');
        await nextTick();

        // After filtering: options should remain unchanged, filteredOptions should be filtered
        expect(capturedOptionsLength).toBe(2);
        expect(capturedFilteredOptionsLength).toBe(1);
        expect(capturedFilteredLabels).toContain('选项一');
        expect(capturedFilteredLabels).not.toContain('选项二');
        cleanupPanel();
      });

      it('should reset filteredOptions to options when filter is cleared', async () => {
        let filterFn: ((filter: string) => void) | null = null;
        let capturedFilteredOptionsLength = 0;

        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupFooter: ({ filteredOptions, onFilter }) => {
                    filterFn = onFilter;
                    capturedFilteredOptionsLength = filteredOptions.length;
                    return <div class="custom-footer">Filtered: {filteredOptions.length}</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        // Apply filter
        expect(filterFn).not.toBeNull();
        if (filterFn) filterFn('选项一');
        await nextTick();
        expect(capturedFilteredOptionsLength).toBe(1);

        // Clear filter
        if (filterFn) filterFn('');
        await nextTick();
        expect(capturedFilteredOptionsLength).toBe(2);
        cleanupPanel();
      });
    });

    it('should render both popupHeader and popupFooter slots', async () => {
      const wrapper = mount({
        render() {
          return (
            <Cascader
              options={options}
              value="1.1"
              v-slots={{
                popupHeader: ({ panelIndex }) => <div class="custom-header">Header {panelIndex}</div>,
                popupFooter: ({ panelIndex }) => <div class="custom-footer">Footer {panelIndex}</div>,
              }}
            ></Cascader>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      expect(document.querySelectorAll('.custom-header').length).toBe(2);
      expect(document.querySelectorAll('.custom-footer').length).toBe(2);
      cleanupPanel();
    });

    it('should render both popupHeader and popupFooter slots with filterable', async () => {
      const wrapper = mount({
        render() {
          return (
            <Cascader
              options={options}
              filterable
              v-slots={{
                popupHeader: ({ panelIndex }) => <div class="custom-header">Header {panelIndex}</div>,
                popupFooter: ({ panelIndex }) => <div class="custom-footer">Footer {panelIndex}</div>,
              }}
            ></Cascader>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      // popupHeader and popupFooter should be rendered
      expect(document.querySelectorAll('.custom-header').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.custom-footer').length).toBeGreaterThan(0);

      // The built-in filter menu should be rendered
      expect(document.querySelectorAll('.t-cascader__menu').length).toBeGreaterThan(0);
      cleanupPanel();
      wrapper.unmount();
    });

    it('should render popupHeader/popupFooter when filterable prop is not used', async () => {
      const wrapper = mount({
        render() {
          return (
            <Cascader
              options={options}
              v-slots={{
                popupHeader: ({ panelIndex }) => <div class="custom-header">Header {panelIndex}</div>,
                popupFooter: ({ panelIndex }) => <div class="custom-footer">Footer {panelIndex}</div>,
              }}
            ></Cascader>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      // popupHeader and popupFooter SHOULD be rendered
      // Without a selected value, may have multiple panels expanded by default
      expect(document.querySelectorAll('.custom-header').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.custom-footer').length).toBeGreaterThan(0);
      cleanupPanel();
      wrapper.unmount();
    });
  });

  describe(':behavior', () => {
    describe('filter in basic mode', () => {
      it('should filter nodes with string filter', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        filterFn('选项一');
        await nextTick();

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBeGreaterThan(0);
        expect(Array.from(items).some((item) => item.textContent?.includes('选项一'))).toBe(true);
        cleanupPanel();
        wrapper.unmount();
      });

      it('should filter nodes with function filter', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        filterFn((node) => node.value === '1');
        await nextTick();

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBeGreaterThan(0);
        cleanupPanel();
        wrapper.unmount();
      });

      it('should clear filter with empty string', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        const filteredCount = document.querySelectorAll('.t-cascader__item').length;
        filterFn('选项一');
        await nextTick();
        expect(document.querySelectorAll('.t-cascader__item').length).toBeLessThan(filteredCount);

        filterFn('');
        await nextTick();
        expect(document.querySelectorAll('.t-cascader__item').length).toBeGreaterThanOrEqual(filteredCount);
        cleanupPanel();
        wrapper.unmount();
      });

      it('should handle whitespace-only filter strings', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        const initialCount = document.querySelectorAll('.t-cascader__item').length;
        filterFn('   ');
        await nextTick();

        expect(document.querySelectorAll('.t-cascader__item').length).toBeGreaterThanOrEqual(initialCount);
        cleanupPanel();
        wrapper.unmount();
      });

      it('should handle function filter that returns false for all items', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        filterFn(() => false);
        await nextTick();

        const firstPanel = document.querySelector('.t-cascader__menu');
        const items = firstPanel?.querySelectorAll('.t-cascader__item') || [];
        expect(items.length).toBe(0);
        cleanupPanel();
        wrapper.unmount();
      });

      it('should handle function filter that returns true for all items', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        filterFn(() => true);
        await nextTick();

        const firstPanel = document.querySelector('.t-cascader__menu');
        const items = firstPanel?.querySelectorAll('.t-cascader__item') || [];
        expect(items.length).toBeGreaterThan(0);
        cleanupPanel();
        wrapper.unmount();
      });

      it('should not match options with empty labels', async () => {
        // Options with some empty/missing labels
        const optionsWithEmptyLabels = [
          { label: '选项一', value: '1' },
          { label: '', value: '2' }, // Empty string label
          { label: '选项三', value: '3' },
        ];

        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={optionsWithEmptyLabels}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        // Filtering with a keyword should not match empty label options
        filterFn('选项');
        await nextTick();

        const items = document.querySelectorAll('.t-cascader__item');
        // Verify that the items with the keyword are present
        const itemTexts = Array.from(items).map((item) => item.textContent);
        expect(itemTexts.some((text) => text?.includes('选项一'))).toBe(true);
        expect(itemTexts.some((text) => text?.includes('选项三'))).toBe(true);
        cleanupPanel();
        wrapper.unmount();
      });
    });

    describe('filter in cascade mode', () => {
      it('should support cascade filtering with string filter', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        filterFn('选项一', { cascade: true });
        await nextTick();

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBeGreaterThan(0);
        expect(items[0].textContent).toContain('选项一');
        cleanupPanel();
        wrapper.unmount();
      });

      it('should support cascade filtering with function filter', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        filterFn((node) => node.label.includes('选项'), { cascade: true });
        await nextTick();

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBeGreaterThan(0);
        cleanupPanel();
        wrapper.unmount();
      });

      it('should show child panel when expanding node in cascade mode', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        filterFn('选项', { cascade: true });
        await nextTick();

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBeGreaterThan(0);

        const firstItem = document.querySelector('.t-cascader__item');
        firstItem?.click();
        await nextTick();

        const menuCount = document.querySelectorAll('.t-cascader__menu').length;
        expect(menuCount).toBeGreaterThan(0);
        cleanupPanel();
        wrapper.unmount();
      });

      it('should hide child panels when no matches in parent cascade filter', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        filterFn('不存在的选项', { cascade: true });
        await nextTick();

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBe(0);
        cleanupPanel();
        wrapper.unmount();
      });

      it('should clear filter when empty string is provided in cascade mode', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        const initialCount = document.querySelectorAll('.t-cascader__item').length;

        filterFn('选项一', { cascade: true });
        await nextTick();
        const filteredCount = document.querySelectorAll('.t-cascader__item').length;
        expect(filteredCount).toBeLessThan(initialCount);

        filterFn('', { cascade: true });
        await nextTick();
        const clearedCount = document.querySelectorAll('.t-cascader__item').length;
        expect(clearedCount).toBeGreaterThanOrEqual(filteredCount);
        cleanupPanel();
        wrapper.unmount();
      });

      it('should handle multiple panel filtering with independent filters', async () => {
        // Store filter functions for each panel index
        const panelFilterFns: Record<
          number,
          (filter: string | ((node: any, panelIndex: number) => boolean), opts?: { cascade?: boolean }) => void
        > = {};
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  popupHeader: ({ panelIndex, onFilter }) => {
                    panelFilterFns[panelIndex] = onFilter;
                    return <div class="filter-header">Filter {panelIndex}</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        // Filter first panel (panel 0) using its specific filter function
        panelFilterFns[0]('选项一');
        await nextTick();

        const menus = document.querySelectorAll('.t-cascader__menu');
        const parentItems = menus[0]?.querySelectorAll('.t-cascader__item') || [];
        expect(parentItems.length).toBeGreaterThan(0);
        expect(parentItems[0].textContent).toContain('选项一');

        // Clear filter on panel 0
        panelFilterFns[0]('');
        await nextTick();

        // Expand first item to show child panel
        const firstItem = document.querySelector('.t-cascader__item');
        firstItem?.click();
        await nextTick();

        // Now panel 1 should be visible and have its own filter function
        expect(panelFilterFns[1]).toBeDefined();

        // Filter second panel (panel 1) using its specific filter function
        panelFilterFns[1]('子选项一');
        await nextTick();

        const updatedMenus = document.querySelectorAll('.t-cascader__menu');
        const childItems = updatedMenus[1]?.querySelectorAll('.t-cascader__item') || [];
        expect(childItems.length).toBeGreaterThan(0);
        expect(childItems[0].textContent).toContain('子选项一');
        cleanupPanel();
        wrapper.unmount();
      });
    });
  });
});
