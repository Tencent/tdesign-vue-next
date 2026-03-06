import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Select, Option, OptionGroup } from '@tdesign/components/select';
import optionGroupProps from '@tdesign/components/select/option-group-props';

// Mock scrollTo for jsdom
beforeAll(() => {
  Element.prototype.scrollTo = vi.fn();
});

const simpleOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
];

const openPopup = async (wrapper: ReturnType<typeof mount>) => {
  await wrapper.setProps({ popupProps: { visible: true } });
  await nextTick();
};

describe('SelectPanel', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('rendering', () => {
    it('renders dropdown inner with size class', async () => {
      const wrapper1 = mount({ render: () => <Select options={simpleOptions} size="small" /> });
      await openPopup(wrapper1);
      expect(document.querySelector('.t-select__dropdown-inner--size-s')).toBeTruthy();
      wrapper1.unmount();

      const wrapper2 = mount({ render: () => <Select options={simpleOptions} size="medium" /> });
      await openPopup(wrapper2);
      expect(document.querySelector('.t-select__dropdown-inner--size-m')).toBeTruthy();
      wrapper2.unmount();

      const wrapper3 = mount({ render: () => <Select options={simpleOptions} size="large" /> });
      await openPopup(wrapper3);
      expect(document.querySelector('.t-select__dropdown-inner--size-l')).toBeTruthy();
      wrapper3.unmount();
    });

    it('renders options list', async () => {
      const wrapper = mount({ render: () => <Select options={simpleOptions} /> });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__list')).toBeTruthy();
      expect(document.querySelectorAll('.t-select-option').length).toBe(3);
      wrapper.unmount();
    });

    it('renders empty state', async () => {
      const wrapper = mount({ render: () => <Select options={[]} /> });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__empty')).toBeTruthy();
      wrapper.unmount();
    });

    it('renders loading state', async () => {
      const wrapper = mount({ render: () => <Select options={simpleOptions} loading /> });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__loading-tips')).toBeTruthy();
      // loading 状态下不显示空状态
      expect(document.querySelector('.t-select__empty')).toBeFalsy();
      wrapper.unmount();
    });

    it('renders create option when creatable + filterable + has input', async () => {
      const wrapper = mount({ render: () => <Select options={simpleOptions} filterable creatable /> });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__create-option--special')).toBeFalsy();

      await wrapper.find('input').setValue('新选项');
      await nextTick();
      expect(document.querySelector('.t-select__create-option--special')).toBeTruthy();
      wrapper.unmount();
    });

    it('does not render empty when creatable has input', async () => {
      const wrapper = mount({ render: () => <Select options={[]} filterable creatable /> });
      await openPopup(wrapper);
      // 空选项但没输入时显示 empty
      expect(document.querySelector('.t-select__empty')).toBeTruthy();

      await wrapper.find('input').setValue('新选项');
      await nextTick();
      // 有输入后显示创建选项，不显示 empty
      expect(document.querySelector('.t-select__create-option--special')).toBeTruthy();
      expect(document.querySelector('.t-select__empty')).toBeFalsy();
      wrapper.unmount();
    });

    it('renders panelTopContent and panelBottomContent', async () => {
      const wrapper = mount({
        render: () => (
          <Select
            options={simpleOptions}
            panelTopContent={() => <div class="panel-top">top</div>}
            panelBottomContent={() => <div class="panel-bottom">bottom</div>}
          />
        ),
      });
      await openPopup(wrapper);
      expect(document.querySelector('.panel-top')).toBeTruthy();
      expect(document.querySelector('.panel-bottom')).toBeTruthy();
      wrapper.unmount();
    });

    it('renders panelTopContent/panelBottomContent with virtual scroll', async () => {
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const wrapper = mount({
        render: () => (
          <Select
            options={manyOptions}
            scroll={{ type: 'virtual', threshold: 100 }}
            panelTopContent={() => <div class="panel-top">top</div>}
            panelBottomContent={() => <div class="panel-bottom">bottom</div>}
          />
        ),
      });
      await openPopup(wrapper);
      expect(document.querySelector('.panel-top')).toBeTruthy();
      expect(document.querySelector('.panel-bottom')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('Option', () => {
    it(':disabled[boolean]', async () => {
      const optionsWithDisabled = [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2', disabled: true },
        { label: '选项3', value: '3' },
      ];
      const wrapper = mount({ render: () => <Select options={optionsWithDisabled} /> });
      await openPopup(wrapper);
      expect(document.querySelectorAll('.t-is-disabled').length).toBe(1);

      // 点击 disabled 选项不应触发 onChange
      const value = ref('');
      const onChangeFn = vi.fn();
      const wrapper2 = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} options={optionsWithDisabled} onChange={onChangeFn} />,
      });
      await openPopup(wrapper2);
      (document.querySelectorAll('.t-select-option')[1] as HTMLElement).click();
      await nextTick();
      expect(onChangeFn).not.toHaveBeenCalled();
      expect(value.value).toBe('');
      wrapper.unmount();
      wrapper2.unmount();
    });

    it(':content[slot/function]', async () => {
      const optionsWithContent = [
        { label: '选项1', value: '1', content: () => <span class="custom-opt">自定义内容</span> },
      ];
      const wrapper = mount({ render: () => <Select options={optionsWithContent} /> });
      await openPopup(wrapper);
      expect(document.querySelector('.custom-opt')).toBeTruthy();
      expect(document.querySelector('.custom-opt')?.textContent).toBe('自定义内容');
      wrapper.unmount();
    });

    it(':label fallback to value', async () => {
      const optionsWithoutLabel = [{ value: 'no-label' }];
      const wrapper = mount({ render: () => <Select options={optionsWithoutLabel} /> });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select-option')?.textContent).toContain('no-label');
      wrapper.unmount();
    });

    it(':title rendering', async () => {
      const wrapper = mount({
        render: () => (
          <Select>
            <Option value="1" label="选项1" title="custom-title" />
          </Select>
        ),
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select-option')?.getAttribute('title')).toBe('custom-title');
      wrapper.unmount();
    });

    it('hover class', async () => {
      const wrapper = mount({ render: () => <Select options={simpleOptions} /> });
      await openPopup(wrapper);
      const option = document.querySelector('.t-select-option') as HTMLElement;
      option.dispatchEvent(new Event('mouseenter'));
      await nextTick();
      expect(option.classList.contains('t-select-option__hover')).toBe(true);
      option.dispatchEvent(new Event('mouseleave'));
      await nextTick();
      expect(option.classList.contains('t-select-option__hover')).toBe(false);
      wrapper.unmount();
    });

    it('selected class', async () => {
      const wrapper = mount({ render: () => <Select options={simpleOptions} defaultValue="1" /> });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select-option.t-is-selected')).toBeTruthy();
      wrapper.unmount();
    });

    it(':checkAll renders indeterminate state', async () => {
      const optionsWithCheckAll = [
        { label: '全选', checkAll: true },
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' },
      ];

      // 部分选中 → indeterminate
      const wrapper = mount({
        render: () => <Select options={optionsWithCheckAll} multiple defaultValue={['1']} />,
      });
      await openPopup(wrapper);
      const checkAllLi = document.querySelector('li[title="全选"]');
      expect(checkAllLi).toBeTruthy();
      expect(checkAllLi?.querySelector('.t-checkbox')).toBeTruthy();
      wrapper.unmount();
    });

    it('max disables unselected options', async () => {
      const value = ref(['1', '2']);
      const wrapper = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} options={simpleOptions} multiple max={2} />,
      });
      await openPopup(wrapper);
      // 第三个选项应变为 disabled
      const allOptions = document.querySelectorAll('.t-select-option');
      expect(allOptions[2].classList.contains('t-is-disabled')).toBe(true);
      // 已选的不 disabled
      expect(allOptions[0].classList.contains('t-is-disabled')).toBe(false);
      wrapper.unmount();
    });
  });

  describe('OptionGroup', () => {
    it(':divider[boolean]', async () => {
      // divider 默认 true
      expect(optionGroupProps.divider.default).toBe(true);

      const wrapper1 = mount({
        render: () => (
          <Select>
            <OptionGroup label="group1" divider>
              <Option value="1" label="选项1" />
            </OptionGroup>
          </Select>
        ),
      });
      await openPopup(wrapper1);
      expect(document.querySelector('.t-select-option-group__divider')).toBeTruthy();
      wrapper1.unmount();

      // divider=false
      const wrapper2 = mount({
        render: () => (
          <Select>
            <OptionGroup label="group1" divider={false}>
              <Option value="1" label="选项1" />
            </OptionGroup>
          </Select>
        ),
      });
      await openPopup(wrapper2);
      expect(document.querySelector('.t-select-option-group__divider')).toBeFalsy();
      wrapper2.unmount();
    });

    it(':label[string]', async () => {
      const wrapper = mount({
        render: () => (
          <Select>
            <OptionGroup label="分组标题">
              <Option value="1" label="选项1" />
            </OptionGroup>
          </Select>
        ),
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select-option-group__header')?.textContent).toBe('分组标题');
      wrapper.unmount();
    });

    it('no label renders no header', async () => {
      const wrapper = mount({
        render: () => (
          <Select>
            <OptionGroup>
              <Option value="1" label="选项1" />
            </OptionGroup>
          </Select>
        ),
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select-option-group__header')).toBeFalsy();
      wrapper.unmount();
    });

    it('grouped options via options prop', async () => {
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
          divider: false,
          children: [{ label: '选项3', value: '3' }],
        },
      ];
      const wrapper = mount({ render: () => <Select options={groupedOptions} /> });
      await openPopup(wrapper);
      expect(document.querySelectorAll('.t-select-option-group').length).toBe(2);
      expect(document.querySelectorAll('.t-select-option-group__header').length).toBe(2);
      expect(document.querySelectorAll('.t-select-option').length).toBe(3);
      wrapper.unmount();
    });
  });

  describe('virtual scroll', () => {
    const manyOptions = Array.from({ length: 150 }, (_, i) => ({
      label: `选项${i + 1}`,
      value: `${i + 1}`,
    }));

    it('renders virtual scroll panel', async () => {
      const wrapper = mount({
        render: () => <Select options={manyOptions} scroll={{ type: 'virtual', threshold: 100 }} />,
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__dropdown-inner')).toBeTruthy();
      wrapper.unmount();
    });

    it('renders with fixed row height', async () => {
      const wrapper = mount({
        render: () => (
          <Select
            options={manyOptions}
            scroll={{ type: 'virtual', threshold: 100, rowHeight: 30, isFixedRowHeight: true }}
          />
        ),
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__list')).toBeTruthy();
      wrapper.unmount();
    });

    it('renders with custom buffer size', async () => {
      const wrapper = mount({
        render: () => <Select options={manyOptions} scroll={{ type: 'virtual', threshold: 100, bufferSize: 10 }} />,
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__list')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('keys', () => {
    it('maps custom label/value keys', async () => {
      const customOptions = [
        { name: '选项1', id: '1' },
        { name: '选项2', id: '2' },
      ];
      const wrapper = mount({
        render: () => <Select options={customOptions} keys={{ label: 'name', value: 'id' }} />,
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select-option')?.textContent).toContain('选项1');
      expect(document.querySelectorAll('.t-select-option').length).toBe(2);
      wrapper.unmount();
    });

    it('omits content when content is used as key', async () => {
      const customOptions = [
        { name: '选项1', content: '1' },
        { name: '选项2', content: '2' },
      ];
      const wrapper = mount({
        render: () => <Select options={customOptions} keys={{ label: 'name', value: 'content' }} />,
      });
      await openPopup(wrapper);
      // content 作为 value key 时应被 omit，不作为自定义内容渲染
      expect(document.querySelectorAll('.t-select-option').length).toBe(2);
      wrapper.unmount();
    });
  });
});
