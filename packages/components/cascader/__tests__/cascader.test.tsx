import { defineComponent, nextTick, ref, watch } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, afterEach } from 'vitest';
import Cascader from '@tdesign/components/cascader';
import type { TreeOptionData } from '@tdesign/components/common';

// ─── Types ──────────────────────────────────────────────────────────────────

type FilterValue = string | ((node: TreeOptionData, panelIndex: number) => boolean);

interface ColumnHeaderSlotParams {
  panelIndex: number;
  options: TreeOptionData[];
  filteredOptions: TreeOptionData[];
  onFilter: (filter: FilterValue) => void;
}

interface ColumnFooterSlotParams {
  panelIndex: number;
  options: TreeOptionData[];
  filteredOptions: TreeOptionData[];
  onFilter: (filter: FilterValue) => void;
}

// ─── Test Data ──────────────────────────────────────────────────────────────

const options: TreeOptionData[] = [
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

// ─── Helpers ────────────────────────────────────────────────────────────────

const cleanupPanel = () => {
  document.querySelectorAll('.t-cascader__panel, .t-cascader__panel--content').forEach((node) => {
    node.parentNode?.removeChild(node);
  });
};

const setPopupVisible = async (wrapper: ReturnType<typeof mount>) =>
  wrapper.setProps({ popupProps: { visible: true } });

/**
 * 模拟用户在 slot 内的真实搜索框交互。
 *
 * 原来的模式是在 slot 渲染函数里 "偷" onFilter 引用到外部闭包，
 * 然后在测试里命令式调用 filterFn!('xxx')，这有几个问题：
 * 1. 不模拟用户行为 — 绕过了真实交互路径
 * 2. 依赖渲染时机 — filterFn 只有在 slot 被渲染后才非 null
 * 3. 18 个 no-non-null-assertion warning 全来自 filterFn!()
 *
 * 新的方案：构建一个真实的 FilterSlot 组件，渲染 <input> + 可选 <button>。
 * - 字符串过滤：用户输入 → watch → 调用 onFilter。测试通过 input 事件驱动。
 * - 函数过滤：点击 <button> → 调用 onFilter(fn)。测试通过 button.click() 驱动。
 *
 * 通过 props 控制模式，避免在每个测试中创建内联 defineComponent。
 */
const FilterSlot = defineComponent({
  name: 'FilterSlot',
  props: {
    onFilter: { type: Function, required: true },
    /** 函数过滤器，非空时渲染 button 触发此函数过滤 */
    fnFilter: { type: Function, default: undefined },
  },
  setup(props) {
    const keyword = ref('');
    watch(keyword, (val) => {
      props.onFilter(val);
    });
    const handleBtnClick = () => {
      if (props.fnFilter) {
        props.onFilter(props.fnFilter);
      }
    };
    return () => (
      <div class="filter-slot">
        <input
          class="panel-filter-input"
          value={keyword.value}
          onInput={(e: Event) => {
            keyword.value = (e.target as HTMLInputElement).value;
          }}
        />
        {props.fnFilter && (
          <button class="fn-filter-btn" onClick={handleBtnClick}>
            Apply
          </button>
        )}
      </div>
    );
  },
});

/** 模拟用户在 slot 搜索框中输入关键词 */
const typeInFilterInput = async (value: string, index = 0) => {
  const inputs = document.querySelectorAll('.panel-filter-input');
  const input = inputs[index] as HTMLInputElement | undefined;
  if (!input) throw new Error(`Filter input at index ${index} not found`);
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  nativeInputValueSetter?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
  await nextTick();
};

/** 模拟用户点击函数过滤按钮 */
const clickFnFilterButton = async (index = 0) => {
  const btns = document.querySelectorAll('.fn-filter-btn');
  const btn = btns[index] as HTMLButtonElement | undefined;
  if (!btn) throw new Error(`Function filter button at index ${index} not found`);
  btn.click();
  await nextTick();
};

/** 获取指定面板（从 0 开始）的选项列表 */
const getPanelItems = (panelIndex = 0) => {
  const menus = document.querySelectorAll('.t-cascader__menu');
  return Array.from(menus[panelIndex]?.querySelectorAll('.t-cascader__item') ?? []);
};

/** 获取所有面板的选项总数 */
const getAllItemCount = () => document.querySelectorAll('.t-cascader__item').length;

/** 获取所有面板数量 */
const getMenuCount = () => document.querySelectorAll('.t-cascader__menu').length;

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('Cascader', () => {
  afterEach(() => {
    cleanupPanel();
  });

  describe(':props', () => {
    describe(':base', () => {
      it('should render correctly in single mode', async () => {
        const wrapper = mount({
          render: () => <Cascader options={options} />,
        });
        await setPopupVisible(wrapper);

        expect(getMenuCount()).toBe(1);
        expect(getAllItemCount()).toBe(2);
        wrapper.unmount();
      });

      it('should render correctly in multiple mode', async () => {
        const wrapper = mount({
          render: () => <Cascader options={options} multiple />,
        });
        await setPopupVisible(wrapper);

        expect(getMenuCount()).toBe(1);
        expect(document.querySelectorAll('.t-checkbox').length).toBe(2);
        wrapper.unmount();
      });

      it('should render disabled state correctly', () => {
        const wrapper = mount({
          render: () => <Cascader disabled options={options} />,
        });
        expect(wrapper.find('.t-is-disabled').exists()).toBe(true);
        wrapper.unmount();
      });
    });

    describe(':value[string]', () => {
      it('should render correctly with single value', async () => {
        const wrapper = mount({
          render: () => <Cascader value="1.1" options={options} />,
        });
        await setPopupVisible(wrapper);

        expect(getMenuCount()).toBe(2);
        expect(getAllItemCount()).toBe(5);
        wrapper.unmount();
      });
    });

    describe(':value[array]', () => {
      it('should render correctly with multiple values', async () => {
        const wrapper = mount({
          render: () => <Cascader value={['1.1']} multiple options={options} />,
        });
        await setPopupVisible(wrapper);

        expect(getMenuCount()).toBe(2);
        expect(getAllItemCount()).toBe(5);
        expect(document.querySelectorAll('.t-checkbox').length).toBe(5);
        wrapper.unmount();
      });
    });

    describe(':size[string]', () => {
      const sizeMap: Record<string, string> = { small: 's', large: 'l' };

      (['small', 'large'] as const).forEach((item) => {
        it(`should render correctly with size ${item}`, async () => {
          const wrapper = mount({
            render: () => <Cascader options={options} size={item} />,
          });
          await setPopupVisible(wrapper);

          expect(document.querySelectorAll(`.t-size-${sizeMap[item]}`).length).toBe(2);
          wrapper.unmount();
        });
      });
    });
  });

  // ─── Slot Rendering Tests ─────────────────────────────────────────────────

  describe(':slots', () => {
    describe('columnHeader', () => {
      it('should render columnHeader slot for each panel', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              value="1.1"
              v-slots={{
                columnHeader: ({ panelIndex }: ColumnHeaderSlotParams) => (
                  <div class="custom-header">Header {panelIndex}</div>
                ),
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        const headers = document.querySelectorAll('.custom-header');
        expect(headers.length).toBe(2);
        expect(headers[0].textContent).toBe('Header 0');
        expect(headers[1].textContent).toBe('Header 1');
        wrapper.unmount();
      });

      it('should render columnHeader with filter input and apply filter via user input', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);
        expect(getAllItemCount()).toBe(2);

        await typeInFilterInput('选项一');

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBe(1);
        expect(items[0].textContent).toContain('选项一');
        wrapper.unmount();
      });

      it('should provide filteredOptions that update after user input', async () => {
        let capturedOptionsLength = 0;
        let capturedFilteredLength = 0;

        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ options: opts, filteredOptions, onFilter }: ColumnHeaderSlotParams) => {
                  capturedOptionsLength = opts.length;
                  capturedFilteredLength = filteredOptions.length;
                  return <FilterSlot onFilter={onFilter} />;
                },
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        expect(capturedOptionsLength).toBe(2);
        expect(capturedFilteredLength).toBe(2);

        await typeInFilterInput('选项一');

        expect(capturedOptionsLength).toBe(2);
        expect(capturedFilteredLength).toBe(1);
        wrapper.unmount();
      });
    });

    describe('columnFooter', () => {
      it('should render columnFooter slot for each panel', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              value="1.1"
              v-slots={{
                columnFooter: ({ panelIndex }: ColumnFooterSlotParams) => (
                  <div class="custom-footer">Footer {panelIndex}</div>
                ),
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        const footers = document.querySelectorAll('.custom-footer');
        expect(footers.length).toBe(2);
        expect(footers[0].textContent).toBe('Footer 0');
        expect(footers[1].textContent).toBe('Footer 1');
        wrapper.unmount();
      });

      it('should render columnFooter with panel options context', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              value="1.1"
              v-slots={{
                columnFooter: ({ panelIndex, options: opts }: ColumnFooterSlotParams) => (
                  <div class="custom-footer">
                    Footer {panelIndex} - {opts.length} items
                  </div>
                ),
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        const footers = document.querySelectorAll('.custom-footer');
        expect(footers.length).toBe(2);
        expect(footers[0].textContent).toContain('Footer 0 - 2 items');
        expect(footers[1].textContent).toContain('Footer 1 - 3 items');
        wrapper.unmount();
      });

      it('should provide filteredOptions equal to options when no filter is applied', async () => {
        let capturedOptions: TreeOptionData[] = [];
        let capturedFilteredOptions: TreeOptionData[] = [];

        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnFooter: ({ options: opts, filteredOptions }: ColumnFooterSlotParams) => {
                  capturedOptions = opts;
                  capturedFilteredOptions = filteredOptions;
                  return (
                    <div class="custom-footer">
                      Options: {opts.length}, Filtered: {filteredOptions.length}
                    </div>
                  );
                },
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        expect(capturedOptions.length).toBe(2);
        expect(capturedFilteredOptions.length).toBe(2);
        expect(capturedFilteredOptions.map((o) => o.value)).toEqual(capturedOptions.map((o) => o.value));
        wrapper.unmount();
      });

      it('should provide correct filteredOptions when filter is applied via columnHeader input', async () => {
        let capturedOptionsLength = 0;
        let capturedFilteredLength = 0;
        let capturedFilteredLabels: string[] = [];

        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
                columnFooter: ({ options: opts, filteredOptions }: ColumnFooterSlotParams) => {
                  capturedOptionsLength = opts.length;
                  capturedFilteredLength = filteredOptions.length;
                  capturedFilteredLabels = filteredOptions.map((o) => String(o.label));
                  return <div class="custom-footer">Filtered: {filteredOptions.length}</div>;
                },
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        expect(capturedOptionsLength).toBe(2);
        expect(capturedFilteredLength).toBe(2);

        await typeInFilterInput('选项一');

        expect(capturedOptionsLength).toBe(2);
        expect(capturedFilteredLength).toBe(1);
        expect(capturedFilteredLabels).toContain('选项一');
        expect(capturedFilteredLabels).not.toContain('选项二');
        wrapper.unmount();
      });

      it('should reset filteredOptions when filter input is cleared', async () => {
        let capturedFilteredLength = 0;

        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
                columnFooter: ({ filteredOptions }: ColumnFooterSlotParams) => {
                  capturedFilteredLength = filteredOptions.length;
                  return <div class="custom-footer">Filtered: {filteredOptions.length}</div>;
                },
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        await typeInFilterInput('选项一');
        expect(capturedFilteredLength).toBe(1);

        await typeInFilterInput('');
        expect(capturedFilteredLength).toBe(2);
        wrapper.unmount();
      });
    });

    it('should render both columnHeader and columnFooter slots', async () => {
      const wrapper = mount({
        render: () => (
          <Cascader
            options={options}
            value="1.1"
            v-slots={{
              columnHeader: ({ panelIndex }: ColumnHeaderSlotParams) => (
                <div class="custom-header">Header {panelIndex}</div>
              ),
              columnFooter: ({ panelIndex }: ColumnFooterSlotParams) => (
                <div class="custom-footer">Footer {panelIndex}</div>
              ),
            }}
          />
        ),
      });
      await setPopupVisible(wrapper);

      expect(document.querySelectorAll('.custom-header').length).toBe(2);
      expect(document.querySelectorAll('.custom-footer').length).toBe(2);
      wrapper.unmount();
    });

    it('should render slots when filterable prop is set', async () => {
      const wrapper = mount({
        render: () => (
          <Cascader
            options={options}
            filterable
            v-slots={{
              columnHeader: ({ panelIndex }: ColumnHeaderSlotParams) => (
                <div class="custom-header">Header {panelIndex}</div>
              ),
              columnFooter: ({ panelIndex }: ColumnFooterSlotParams) => (
                <div class="custom-footer">Footer {panelIndex}</div>
              ),
            }}
          />
        ),
      });
      await setPopupVisible(wrapper);

      expect(document.querySelectorAll('.custom-header').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.custom-footer').length).toBeGreaterThan(0);
      expect(getMenuCount()).toBeGreaterThan(0);
      wrapper.unmount();
    });

    it('should render slots without filterable prop', async () => {
      const wrapper = mount({
        render: () => (
          <Cascader
            options={options}
            v-slots={{
              columnHeader: ({ panelIndex }: ColumnHeaderSlotParams) => (
                <div class="custom-header">Header {panelIndex}</div>
              ),
              columnFooter: ({ panelIndex }: ColumnFooterSlotParams) => (
                <div class="custom-footer">Footer {panelIndex}</div>
              ),
            }}
          />
        ),
      });
      await setPopupVisible(wrapper);

      expect(document.querySelectorAll('.custom-header').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.custom-footer').length).toBeGreaterThan(0);
      wrapper.unmount();
    });
  });

  // ─── Filter Behavior Tests ────────────────────────────────────────────────

  describe(':behavior', () => {
    describe('filter in basic mode', () => {
      it('should filter nodes with string input', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        await typeInFilterInput('选项一');

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBeGreaterThan(0);
        expect(Array.from(items).some((item) => item.textContent?.includes('选项一'))).toBe(true);
        wrapper.unmount();
      });

      it('should filter nodes with function filter via button click', async () => {
        const matchByValue = (node: TreeOptionData) => node.value === '1';

        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => (
                  <FilterSlot onFilter={onFilter} fnFilter={matchByValue} />
                ),
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        await clickFnFilterButton();

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBeGreaterThan(0);
        wrapper.unmount();
      });

      it('should clear filter when input is emptied', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        const initialCount = getAllItemCount();
        await typeInFilterInput('选项一');
        expect(getAllItemCount()).toBeLessThan(initialCount);

        await typeInFilterInput('');
        expect(getAllItemCount()).toBeGreaterThanOrEqual(initialCount);
        wrapper.unmount();
      });

      it('should treat whitespace-only input as no filter', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        const initialCount = getAllItemCount();
        await typeInFilterInput('   ');

        expect(getAllItemCount()).toBeGreaterThanOrEqual(initialCount);
        wrapper.unmount();
      });

      it('should show zero items when function filter rejects all', async () => {
        const rejectAll = () => false;

        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => (
                  <FilterSlot onFilter={onFilter} fnFilter={rejectAll} />
                ),
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        await clickFnFilterButton();

        expect(getPanelItems(0).length).toBe(0);
        wrapper.unmount();
      });

      it('should keep all items when function filter accepts all', async () => {
        const acceptAll = () => true;

        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => (
                  <FilterSlot onFilter={onFilter} fnFilter={acceptAll} />
                ),
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        await clickFnFilterButton();

        expect(getPanelItems(0).length).toBeGreaterThan(0);
        wrapper.unmount();
      });

      it('should not match options with empty labels', async () => {
        const optionsWithEmptyLabels: TreeOptionData[] = [
          { label: '选项一', value: '1' },
          { label: '', value: '2' },
          { label: '选项三', value: '3' },
        ];

        const wrapper = mount({
          render: () => (
            <Cascader
              options={optionsWithEmptyLabels}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        await typeInFilterInput('选项');

        const items = document.querySelectorAll('.t-cascader__item');
        const itemTexts = Array.from(items).map((item) => item.textContent);
        expect(itemTexts.some((text) => text?.includes('选项一'))).toBe(true);
        expect(itemTexts.some((text) => text?.includes('选项三'))).toBe(true);
        wrapper.unmount();
      });
    });

    describe('filter in cascade mode', () => {
      it('should support cascade filtering with string input', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        await typeInFilterInput('选项一');

        const items = document.querySelectorAll('.t-cascader__item');
        expect(items.length).toBeGreaterThan(0);
        expect(items[0].textContent).toContain('选项一');
        wrapper.unmount();
      });

      it('should support cascade filtering with function filter', async () => {
        const matchByLabel = (node: TreeOptionData) => String(node.label).includes('选项');

        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => (
                  <FilterSlot onFilter={onFilter} fnFilter={matchByLabel} />
                ),
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        await clickFnFilterButton();

        expect(getAllItemCount()).toBeGreaterThan(0);
        wrapper.unmount();
      });

      it('should show child panel when expanding node in cascade mode', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        await typeInFilterInput('选项');

        expect(getAllItemCount()).toBeGreaterThan(0);

        const firstItem = document.querySelector('.t-cascader__item') as HTMLElement | null;
        firstItem?.click();
        await nextTick();

        expect(getMenuCount()).toBeGreaterThan(0);
        wrapper.unmount();
      });

      it('should hide child panels when no matches in parent cascade filter', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        await typeInFilterInput('不存在的选项');

        expect(getAllItemCount()).toBe(0);
        wrapper.unmount();
      });

      it('should clear filter when input is emptied in cascade mode', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        const initialCount = getAllItemCount();

        await typeInFilterInput('选项一');
        const filteredCount = getAllItemCount();
        expect(filteredCount).toBeLessThan(initialCount);

        await typeInFilterInput('');
        expect(getAllItemCount()).toBeGreaterThanOrEqual(filteredCount);
        wrapper.unmount();
      });

      it('should handle independent filters on different panels', async () => {
        const wrapper = mount({
          render: () => (
            <Cascader
              options={options}
              v-slots={{
                columnHeader: ({ onFilter }: ColumnHeaderSlotParams) => <FilterSlot onFilter={onFilter} />,
              }}
            />
          ),
        });
        await setPopupVisible(wrapper);

        // 在第一列过滤
        await typeInFilterInput('选项一', 0);

        const parentItems = getPanelItems(0);
        expect(parentItems.length).toBeGreaterThan(0);
        expect(parentItems[0].textContent).toContain('选项一');

        // 清除过滤后，点击展开子面板
        await typeInFilterInput('', 0);

        const firstItem = document.querySelector('.t-cascader__item') as HTMLElement | null;
        firstItem?.click();
        await nextTick();

        // 验证第二列出现后，在第二列搜索
        const secondInputs = document.querySelectorAll('.panel-filter-input');
        expect(secondInputs.length).toBeGreaterThanOrEqual(2);

        await typeInFilterInput('子选项一', 1);

        const childItems = getPanelItems(1);
        expect(childItems.length).toBeGreaterThan(0);
        expect(childItems[0].textContent).toContain('子选项一');
        wrapper.unmount();
      });
    });
  });
});
