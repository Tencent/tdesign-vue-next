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
    describe('panelHeader', () => {
      it('should render panelHeader slot for each panel', async () => {
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                value="1.1"
                v-slots={{
                  panelHeader: ({ panelIndex }) => <div class="custom-header">Header {panelIndex}</div>,
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

      it('should render panelHeader with filter functionality', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
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
    });

    describe('panelFooter', () => {
      it('should render panelFooter slot for each panel', async () => {
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                value="1.1"
                v-slots={{
                  panelFooter: ({ panelIndex }) => <div class="custom-footer">Footer {panelIndex}</div>,
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

      it('should render panelFooter with panel options context', async () => {
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                value="1.1"
                v-slots={{
                  panelFooter: ({ panelIndex, options }) => (
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
    });

    it('should render both panelHeader and panelFooter slots', async () => {
      const wrapper = mount({
        render() {
          return (
            <Cascader
              options={options}
              value="1.1"
              v-slots={{
                panelHeader: ({ panelIndex }) => <div class="custom-header">Header {panelIndex}</div>,
                panelFooter: ({ panelIndex }) => <div class="custom-footer">Footer {panelIndex}</div>,
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
                  panelHeader: ({ onFilter }) => {
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
        expect(items.length).toBe(1);
        expect(items[0].textContent).toContain('选项一');
        cleanupPanel();
      });

      it('should filter nodes with function filter', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
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
        expect(items.length).toBe(1);
        cleanupPanel();
      });

      it('should clear filter with empty string', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
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
        expect(document.querySelectorAll('.t-cascader__item').length).toBe(1);

        filterFn('');
        await nextTick();
        expect(document.querySelectorAll('.t-cascader__item').length).toBe(2);
        cleanupPanel();
      });

      it('should handle whitespace-only filter strings', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        filterFn('   ');
        await nextTick();

        expect(document.querySelectorAll('.t-cascader__item').length).toBe(2);
        cleanupPanel();
      });

      it('should handle function filter that returns false for all items', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
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
      });

      it('should handle function filter that returns true for all items', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
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
        expect(items.length).toBe(2);
        cleanupPanel();
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
                  panelHeader: ({ onFilter }) => {
                    filterFn = onFilter;
                    return <div class="filter-header">Filter</div>;
                  },
                }}
              ></Cascader>
            );
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });

        expect(document.querySelectorAll('.t-cascader__menu').length).toBe(1);

        filterFn('选项一', { cascade: true });
        await nextTick();

        expect(document.querySelectorAll('.t-cascader__menu').length).toBe(1);

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBe(1);
        expect(items[0].textContent).toContain('选项一');
        cleanupPanel();
      });

      it('should support cascade filtering with function filter', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
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
        expect(items.length).toBe(2);
        cleanupPanel();
      });

      it('should show child panel when expanding node in cascade mode', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
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

        expect(document.querySelectorAll('.t-cascader__menu').length).toBe(1);
        expect(document.querySelectorAll('.t-cascader__item').length).toBe(2);

        const firstItem = document.querySelector('.t-cascader__item');
        firstItem.click();
        await nextTick();

        expect(document.querySelectorAll('.t-cascader__menu').length).toBe(2);
        cleanupPanel();
      });

      it('should hide child panels when no matches in parent cascade filter', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
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

        expect(document.querySelectorAll('.t-cascader__menu').length).toBe(1);
        expect(document.querySelectorAll('.t-cascader__item').length).toBe(0);
        cleanupPanel();
      });

      it('should clear filter when empty string is provided in cascade mode', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
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
        expect(document.querySelectorAll('.t-cascader__item').length).toBe(1);

        filterFn('', { cascade: true });
        await nextTick();
        expect(document.querySelectorAll('.t-cascader__item').length).toBe(2);
        cleanupPanel();
      });

      it('should handle multiple panel filtering with independent filters', async () => {
        let filterFn = null;
        const wrapper = mount({
          render() {
            return (
              <Cascader
                options={options}
                v-slots={{
                  panelHeader: ({ onFilter }) => {
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

        const menus = document.querySelectorAll('.t-cascader__menu');
        const parentItems = menus[0].querySelectorAll('.t-cascader__item');
        expect(parentItems.length).toBe(1);
        expect(parentItems[0].textContent).toContain('选项一');

        filterFn('');
        await nextTick();

        const firstItem = document.querySelector('.t-cascader__item');
        firstItem.click();
        await nextTick();

        filterFn('子选项一');
        await nextTick();

        const updatedMenus = document.querySelectorAll('.t-cascader__menu');
        const childItems = updatedMenus[1].querySelectorAll('.t-cascader__item');
        expect(childItems.length).toBe(1);
        expect(childItems[0].textContent).toContain('子选项一');
        cleanupPanel();
      });
    });
  });
});
