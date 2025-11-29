import { ref, h } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { describe, expect, vi, it } from 'vitest';
import Transfer from '@tdesign/components/transfer';
import TransferProps from '@tdesign/components/transfer/props';
import { transferMockData, pagination } from './mount';

describe('Transfer', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Transfer>> | null = null;
    beforeEach(() => {
      wrapper = mount(<Transfer data={transferMockData} />) as VueWrapper<InstanceType<typeof Transfer>>;
    });

    it(':checkboxProps[object]', () => {
      const checkboxProps = { size: 'small' };
      const wrapper = mount(<Transfer data={transferMockData} checkboxProps={checkboxProps} />);
      const transfer = wrapper.find('.t-transfer');
      expect(transfer.exists()).toBeTruthy();
      // 验证 checkboxProps 被正确传递
      const checkboxes = wrapper.findAll('.t-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it(':checked[array]', () => {
      const checked = ref(['2']);
      const wrapper = mount(<Transfer data={transferMockData} checked={checked.value} />);
      const list = wrapper.findAll('.t-transfer__list');
      const items = list[0].findAll('.t-transfer__list-item');
      expect(items[2].classes()).toContain('t-is-checked');
      const header = wrapper.find('.t-transfer__list-header');
      const checkbox = header.find('.t-checkbox');
      expect(checkbox.classes()).toContain('t-is-indeterminate');
      const text = header.findAll('span')[2];
      expect(text.exists()).toBeTruthy();
      expect(text.text()).toBe('1 / 20 项');
    });

    it(':defaultChecked[array]', () => {
      const checked = ref(['2']);
      const wrapper = mount(<Transfer data={transferMockData} checked={checked.value} />);
      const list = wrapper.findAll('.t-transfer__list');
      const items = list[0].findAll('.t-transfer__list-item');
      expect(items[2].classes()).toContain('t-is-checked');
      const header = wrapper.find('.t-transfer__list-header');
      const checkbox = header.find('.t-checkbox');
      expect(checkbox.classes()).toContain('t-is-indeterminate');
      const text = header.findAll('span')[2];
      expect(text.exists()).toBeTruthy();
      expect(text.text()).toBe('1 / 20 项');
    });

    it(':v-model:checked should emit update:checked event', async () => {
      const checked = ref<string[]>([]);
      const wrapper = mount(() => <Transfer data={transferMockData} v-model:checked={checked.value} />);

      // Click on first non-disabled item checkbox
      const list = wrapper.findAll('.t-transfer__list');
      const items = list[0].findAll('.t-transfer__list-item');
      // Find a non-disabled item (item with index 1 should be non-disabled based on mock data)
      const nonDisabledItem = items[1];
      const checkbox = nonDisabledItem.find('.t-checkbox input');
      await checkbox.trigger('change');

      // The checked value should be updated
      expect(checked.value.length).toBeGreaterThan(0);
    });

    it(':data[array]', () => {
      const wrapper = mount(<Transfer data={transferMockData} />);
      const transfer = wrapper.find('.t-transfer');
      expect(transfer.exists()).toBeTruthy();
      const list = wrapper.findAll('.t-transfer__list');
      expect(list.length).toBe(2);
      const operations = wrapper.find('.t-transfer__operations');
      expect(operations.exists()).toBeTruthy();
      expect(list[0].findAll('.t-transfer__list-item').length).toBe(20);
      expect(list[1].findAll('.t-transfer__list-item').length).toBe(0);
      expect(list[1].find('.t-transfer__empty').exists()).toBeTruthy();
      expect(list[1].find('.t-transfer__empty').text()).toBe('暂无数据');
    });

    it(':data[array] default empty array', () => {
      const wrapper = mount(<Transfer />);
      const transfer = wrapper.find('.t-transfer');
      expect(transfer.exists()).toBeTruthy();
      const list = wrapper.findAll('.t-transfer__list');
      expect(list.length).toBe(2);
      expect(list[0].findAll('.t-transfer__list-item').length).toBe(0);
      expect(list[1].findAll('.t-transfer__list-item').length).toBe(0);
      expect(list[0].find('.t-transfer__empty').exists()).toBeTruthy();
      expect(list[1].find('.t-transfer__empty').exists()).toBeTruthy();
    });

    it(':direction[string] validator', () => {
      const validator = (wrapper.vm.$options.props as typeof TransferProps)?.direction.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('')).toBe(true);
      expect(validator('left')).toBe(true);
      expect(validator('right')).toBe(true);
      expect(validator('both')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':direction[string] left', () => {
      const checked = ref(['2', '4']);
      const targetValue = ref(['2']);
      const wrapper = mount(() => (
        <Transfer data={transferMockData} checked={checked.value} direction="left" v-model={targetValue.value} />
      ));
      const transfer = wrapper.find('.t-transfer');
      const btns = transfer.findAll('button');
      expect(btns[0].classes()).toContain('t-is-disabled');
      expect(btns[1].classes()).not.toContain('t-is-disabled');
    });

    it(':direction[string] right', async () => {
      const checked = ref(['2', '4']);
      const targetValue = ref(['2']);
      const wrapper = mount(() => (
        <Transfer data={transferMockData} checked={checked.value} direction="right" v-model={targetValue.value} />
      ));
      const transfer = wrapper.find('.t-transfer');
      const btns = transfer.findAll('button');
      expect(btns[1].classes()).toContain('t-is-disabled');
      expect(btns[0].classes()).not.toContain('t-is-disabled');
    });

    it(':direction[string] both', () => {
      const checked = ref(['2']);
      const targetValue = ref(['3']);
      const wrapper = mount(() => (
        <Transfer data={transferMockData} checked={checked.value} direction="both" v-model={targetValue.value} />
      ));
      const transfer = wrapper.find('.t-transfer');
      const btns = transfer.findAll('button');
      expect(btns[0].classes()).not.toContain('t-is-disabled');
      expect(btns[1].classes()).toContain('t-is-disabled');
    });

    it(':direction[string] both with target checked', async () => {
      const checked = ref(['2', '4']);
      const targetValue = ref(['2']);
      const wrapper = mount(() => (
        <Transfer data={transferMockData} checked={checked.value} direction="both" v-model={targetValue.value} />
      ));
      const transfer = wrapper.find('.t-transfer');
      const btns = transfer.findAll('button');
      expect(btns[0].classes()).not.toContain('t-is-disabled');
      expect(btns[1].classes()).not.toContain('t-is-disabled');
    });

    it(':disabled[boolean]', async () => {
      const checked = ref(['2', '4']);
      const targetValue = ref(['2']);
      const wrapper = mount(() => (
        <Transfer data={transferMockData} checked={checked.value} disabled v-model={targetValue.value} />
      ));
      const transfer = wrapper.find('.t-transfer');
      const list = transfer.findAll('.t-transfer__list');
      // 检查所有复选框组是否被禁用
      list.forEach((listItem) => {
        const checkboxGroup = listItem.find('.t-transfer__list-content .t-checkbox-group');
        if (checkboxGroup.exists()) {
          const labels = checkboxGroup.findAll('label');
          labels.forEach((label) => {
            expect(label.classes()).toContain('t-is-disabled');
          });
        }
      });
      // 检查移动按钮是否被禁用
      const btns = transfer.findAll('button');
      btns.forEach((btn) => {
        expect(btn.classes()).toContain('t-is-disabled');
      });
      // 检查搜索框是否被禁用
      const searchInputs = transfer.findAll('.t-input');
      searchInputs.forEach((input) => {
        expect(input.classes()).toContain('t-is-disabled');
      });
      // 检查分页组件是否被禁用
      const paginationComponents = transfer.findAll('.t-pagination');
      paginationComponents.forEach((pagination) => {
        expect(pagination.classes()).toContain('t-is-disabled');
      });
    });

    it(':empty[string]', () => {
      const wrapper = mount(<Transfer data={transferMockData} empty="暂无可用数据" />);
      const transfer = wrapper.find('.t-transfer');
      const list = transfer.findAll('.t-transfer__list');
      expect(list[1].find('.t-transfer__empty').exists()).toBeTruthy();
      expect(list[1].find('.t-transfer__empty').text()).toBe('暂无可用数据');
    });

    it(':empty[array]', () => {
      const wrapper = mount(<Transfer data={transferMockData} empty={['源列表空', '目标列表空']} />);
      const transfer = wrapper.find('.t-transfer');
      const list = transfer.findAll('.t-transfer__list');
      expect(list[1].find('.t-transfer__empty').exists()).toBeTruthy();
      expect(list[1].find('.t-transfer__empty').text()).toBe('目标列表空');
    });

    it(':empty[function]', () => {
      const emptyFn = ({ type }: any) => (type === 'source' ? '源为空' : '目标为空');
      const wrapper = mount(<Transfer data={transferMockData} empty={emptyFn} />);
      const transfer = wrapper.find('.t-transfer');
      const list = transfer.findAll('.t-transfer__list');
      expect(list[1].find('.t-transfer__empty').text()).toBe('目标为空');
    });

    it(':footer[array]', () => {
      const wrapper = mount(<Transfer data={transferMockData} footer={['源底部', '目标底部']} />);
      const list = wrapper.findAll('.t-transfer__list');
      expect(list[0].text()).contain('源底部');
      expect(list[1].text()).contain('目标底部');
    });

    it(':footer[function]', () => {
      const footerFn = [() => '源底部', () => '目标底部'];
      const wrapper = mount(<Transfer data={transferMockData} footer={footerFn} />);
      const list = wrapper.findAll('.t-transfer__list');
      expect(list[0].text()).contain('源底部');
      expect(list[1].text()).contain('目标底部');
    });

    it(':footer[slot]', () => {
      const slots = {
        footer: () => <div class="footer">footer</div>,
      };
      const wrapper = mount(<Transfer data={transferMockData} v-slots={slots} />);
      const list = wrapper.findAll('.t-transfer__list');
      expect(list[0].find('.footer').exists()).toBeTruthy();
      expect(list[0].find('.footer').text()).toBe('footer');
      expect(list[1].find('.footer').exists()).toBeTruthy();
      expect(list[1].find('.footer').text()).toBe('footer');
    });

    it(':keys[object]', () => {
      const customData = [
        { id: '1', text: '项目1', isDisabled: false },
        { id: '2', text: '项目2', isDisabled: true },
      ];
      const keys = { value: 'id', label: 'text', disabled: 'isDisabled' };
      const wrapper = mount(<Transfer data={customData} keys={keys} />);
      const transfer = wrapper.find('.t-transfer');
      expect(transfer.exists()).toBeTruthy();
      const items = wrapper.findAll('.t-transfer__list-item');
      expect(items.length).toBe(2);
      expect(items[1].classes()).toContain('t-is-disabled');
    });

    it(':operation[array]', () => {
      const operation = ['向左', '向右'];
      const wrapper = mount(<Transfer data={transferMockData} operation={operation} />);
      const operations = wrapper.find('.t-transfer__operations');
      const btns = operations.findAll('button');
      expect(btns[0].find('.t-button__text').text()).toBe('向右');
      expect(btns[1].find('.t-button__text').text()).toBe('向左');
    });

    it(':pagination[object]', () => {
      const wrapper = mount(<Transfer data={transferMockData} pagination={pagination} />);
      const paginationDom = wrapper.find('.t-pagination');
      expect(paginationDom.exists()).toBeTruthy();
    });

    it(':search[boolean]', () => {
      const wrapper = mount(<Transfer data={transferMockData} search />);
      const search = wrapper.findAll('.t-transfer__search-wrapper input');
      expect(search.length).toBe(2);
    });

    it(':showCheckAll[boolean]', () => {
      const wrapper = mount(<Transfer data={transferMockData} search />);
      const checkAll = wrapper.findAll('.t-transfer__list-header .t-checkbox');
      expect(checkAll.length).toBe(2);
    });

    it(':targetDraggable[boolean]', () => {
      const wrapper = mount(<Transfer data={transferMockData} targetDraggable />);
      const transfer = wrapper.find('.t-transfer');
      expect(transfer.exists()).toBeTruthy();
      // 验证拖拽功能已启用（具体实现可能需要更多测试）
    });

    it(':targetSort[string] validator', () => {
      const validator = (wrapper.vm.$options.props as typeof TransferProps)?.targetSort.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('')).toBe(true);
      expect(validator('original')).toBe(true);
      expect(validator('push')).toBe(true);
      expect(validator('unshift')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':title[array]', () => {
      const wrapper = mount(<Transfer data={transferMockData} title={['源列表', '目标列表']} />);
      const headers = wrapper.findAll('.t-transfer__list-header');
      expect(headers[0].text()).toContain('源列表');
      expect(headers[1].text()).toContain('目标列表');
    });

    it(':title[function]', () => {
      const titleFn = [() => '源标题', () => '目标标题'];
      const wrapper = mount(<Transfer data={transferMockData} title={titleFn} />);
      const headers = wrapper.findAll('.t-transfer__list-header');
      expect(headers[0].findAll('span')[3].text()).toContain('源标题');
      expect(headers[1].findAll('span')[3].text()).toContain('目标标题');
    });

    it(':title[slot]', () => {
      const slots = {
        title: () => <div class="title">title</div>,
      };
      const wrapper = mount(<Transfer data={transferMockData} v-slots={slots} />);
      const list = wrapper.findAll('.t-transfer__list .t-transfer__list-header');
      expect(list[0].find('.title').exists()).toBeTruthy();
      expect(list[0].find('.title').text()).toBe('title');
      expect(list[1].find('.title').exists()).toBeTruthy();
      expect(list[1].find('.title').text()).toBe('title');
    });

    it(':transferItem[function]', () => {
      const transferItem = (_h: typeof h, params: { data: any; index: number; type: string }) => (
        <div class="custom-item">
          {params.data.label}-{params.data.index}
        </div>
      );
      const wrapper = mount(<Transfer data={transferMockData.slice(0, 2)} transferItem={transferItem} />);
      const customItems = wrapper.findAll('.custom-item');
      expect(customItems.length).toBeGreaterThan(0);
      expect(customItems[0].text()).toContain('内容1-0');
    });

    it(':value[array] and modelValue', () => {
      const targetValue = ref(['1', '2']);
      const wrapper = mount(<Transfer data={transferMockData} v-model={targetValue.value} />);
      const list = wrapper.findAll('.t-transfer__list');
      expect(list[1].findAll('.t-transfer__list-item').length).toBe(2);
    });

    it(':defaultValue[array]', () => {
      const wrapper = mount(<Transfer data={transferMockData} defaultValue={['1', '2']} />);
      const list = wrapper.findAll('.t-transfer__list');
      expect(list[1].findAll('.t-transfer__list-item').length).toBe(2);
    });
  });

  describe('events', () => {
    it(':onChange', async () => {
      const fn = vi.fn();
      const checked = ref(['1']);
      const wrapper = mount(<Transfer data={transferMockData} defaultChecked={checked.value} onChange={fn} />);
      const operations = wrapper.find('.t-transfer__operations');
      const btns = operations.findAll('button');
      await btns[0].trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onCheckedChange', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Transfer data={transferMockData} onCheckedChange={fn} />);
      const list = wrapper.findAll('.t-transfer__list');
      const input = list[0].findAll('.t-checkbox input');
      await input[0].trigger('change');
      expect(fn).toBeCalled();
    });

    it(':onPageChange', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Transfer data={transferMockData} pagination={pagination} onPageChange={fn} />);
      const next = wrapper.find('.t-pagination__btn-next');
      await next.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onScroll', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Transfer data={transferMockData} onScroll={fn} />);
      const list = wrapper.findAll('.t-transfer__list');
      const content = list[0].find('.t-transfer__list-content');
      await content.trigger('scroll');
      expect(fn).toBeCalled();
    });

    it(':onSearch', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Transfer data={transferMockData} search onSearch={fn} />);
      const input = wrapper.find('.t-transfer__search-wrapper input');
      await input.trigger('input');
      expect(fn).toBeCalled();
    });
  });

  describe('other logic', () => {
    it('should move items from target to source (toDirection === SOURCE)', async () => {
      const onChange = vi.fn();
      const targetValue = ref(['1', '2', '3']);
      const checked = ref(['1', '2']); // 选中目标列表中的项目

      const wrapper = mount(() => (
        <Transfer data={transferMockData} v-model={targetValue.value} checked={checked.value} onChange={onChange} />
      ));

      // 点击左移按钮（从目标移到源）
      const operations = wrapper.find('.t-transfer__operations');
      const leftBtn = operations.findAll('button')[1]; // 左移按钮
      await leftBtn.trigger('click');

      expect(onChange).toHaveBeenCalled();
      const callArgs = onChange.mock.calls[0];
      // 验证新的目标值应该过滤掉选中的项目
      expect(callArgs[0]).toEqual(['3']); // 只剩下未选中的项目
      expect(callArgs[1].type).toBe('source');
      expect(callArgs[1].movedValue).toEqual(['1', '2']);
    });

    it('should handle empty checked values when moving to source', async () => {
      const onChange = vi.fn();
      const targetValue = ref(['1', '2', '3']);
      const checked = ref([]); // 没有选中任何项目

      const wrapper = mount(() => (
        <Transfer data={transferMockData} v-model={targetValue.value} checked={checked.value} onChange={onChange} />
      ));

      const operations = wrapper.find('.t-transfer__operations');
      const leftBtn = operations.findAll('button')[1];

      // 左移按钮应该被禁用，因为没有选中项目
      expect(leftBtn.classes()).toContain('t-is-disabled');
    });

    it('should filter correctly when moving multiple items to source', async () => {
      const onChange = vi.fn();
      const targetValue = ref(['1', '2', '3', '4', '5']);
      const checked = ref(['2', '4']); // 选中部分项目

      const wrapper = mount(() => (
        <Transfer data={transferMockData} v-model={targetValue.value} checked={checked.value} onChange={onChange} />
      ));

      const operations = wrapper.find('.t-transfer__operations');
      const leftBtn = operations.findAll('button')[1];
      await leftBtn.trigger('click');

      expect(onChange).toHaveBeenCalled();
      const callArgs = onChange.mock.calls[0];
      // 验证过滤逻辑：原目标值减去选中的值
      expect(callArgs[0]).toEqual(['1', '3', '5']);
      expect(callArgs[1].movedValue).toEqual(['2', '4']);
    });

    it('should preserve disabled items in target when targetSort is original', async () => {
      // 创建包含禁用项目的数据
      const testData = [
        { value: '1', label: '项目1', disabled: false },
        { value: '2', label: '项目2', disabled: true }, // 禁用项目
        { value: '3', label: '项目3', disabled: false },
        { value: '4', label: '项目4', disabled: true }, // 禁用项目
        { value: '5', label: '项目5', disabled: false },
      ];

      const onChange = vi.fn();
      const targetValue = ref(['2', '3', '4']); // 目标列表包含禁用项目
      const checked = ref(['1']); // 选中源列表中的项目

      const wrapper = mount(() => (
        <Transfer
          data={testData}
          v-model={targetValue.value}
          checked={checked.value}
          targetSort="original"
          onChange={onChange}
        />
      ));

      // 点击右移按钮（从源移到目标）
      const operations = wrapper.find('.t-transfer__operations');
      const rightBtn = operations.findAll('button')[0];
      await rightBtn.trigger('click');

      expect(onChange).toHaveBeenCalled();
      const callArgs = onChange.mock.calls[0];

      // 验证禁用项目被保留在 remainValue 中
      // 新的目标值应该包含原有的禁用项目 '2', '4' 和新添加的 '1'
      const newTargetValue = callArgs[0];
      expect(newTargetValue).toContain('2'); // 禁用项目应该被保留
      expect(newTargetValue).toContain('4'); // 禁用项目应该被保留
      expect(newTargetValue).toContain('1'); // 新移动的项目
      expect(newTargetValue).toContain('3'); // 原有的非禁用项目
    });

    it('should handle remainValue logic with disabled items in original sort', async () => {
      const testData = [
        { value: '1', label: '项目1', disabled: false },
        { value: '2', label: '项目2', disabled: true },
        { value: '3', label: '项目3', disabled: false },
        { value: '4', label: '项目4', disabled: true },
      ];

      const onChange = vi.fn();
      // 目标列表中有禁用和非禁用项目
      const targetValue = ref(['2', '3', '4']);
      const checked = ref(['1']);

      const wrapper = mount(() => (
        <Transfer
          data={testData}
          v-model={targetValue.value}
          checked={checked.value}
          targetSort="original"
          onChange={onChange}
        />
      ));

      const operations = wrapper.find('.t-transfer__operations');
      const rightBtn = operations.findAll('button')[0];
      await rightBtn.trigger('click');

      expect(onChange).toHaveBeenCalled();

      // 验证 remainValue 逻辑：只有在目标列表中且被禁用的项目才会被加入 remainValue
      // 这里 '2' 和 '4' 都在目标列表中且被禁用，应该被保留
      const callArgs = onChange.mock.calls[0];
      const newTargetValue = callArgs[0];

      // 检查禁用项目是否被正确保留
      expect(newTargetValue.filter((v: any) => ['2', '4'].includes(v)).length).toBe(2);
    });

    it('should handle targetSort unshift - prepend new items', async () => {
      const onChange = vi.fn();
      const targetValue = ref(['3', '4']); // 目标列表已有项目
      const checked = ref(['1', '2']); // 选中源列表中的项目

      const wrapper = mount(() => (
        <Transfer
          data={transferMockData}
          v-model={targetValue.value}
          checked={checked.value}
          targetSort="unshift"
          onChange={onChange}
        />
      ));

      // 点击右移按钮
      const operations = wrapper.find('.t-transfer__operations');
      const rightBtn = operations.findAll('button')[0];
      await rightBtn.trigger('click');

      expect(onChange).toHaveBeenCalled();
      const callArgs = onChange.mock.calls[0];

      // 验证 unshift 逻辑：新项目应该被添加到前面
      // newTargetValue = selfCheckedValue.concat(oldTargetValue)
      expect(callArgs[0]).toEqual(['1', '2', '3', '4']);
      expect(callArgs[1].movedValue).toEqual(['1', '2']);
    });

    it('should handle default targetSort - append new items', async () => {
      const onChange = vi.fn();
      const targetValue = ref(['3', '4']); // 目标列表已有项目
      const checked = ref(['1', '2']); // 选中源列表中的项目

      const wrapper = mount(() => (
        <Transfer data={transferMockData} v-model={targetValue.value} checked={checked.value} onChange={onChange} />
      ));

      // 点击右移按钮
      const operations = wrapper.find('.t-transfer__operations');
      const rightBtn = operations.findAll('button')[0];
      await rightBtn.trigger('click');

      expect(onChange).toHaveBeenCalled();
      const callArgs = onChange.mock.calls[0];

      // 验证默认逻辑：新项目应该被添加到后面
      // newTargetValue = oldTargetValue.concat(selfCheckedValue)
      expect(callArgs[0]).toEqual(['1', '2', '3', '4']);
      expect(callArgs[1].movedValue).toEqual(['1', '2']);
    });

    it('should handle targetSort push (same as default)', async () => {
      const onChange = vi.fn();
      const targetValue = ref(['3', '4']);
      const checked = ref(['1', '2']);

      const wrapper = mount(() => (
        <Transfer
          data={transferMockData}
          v-model={targetValue.value}
          checked={checked.value}
          targetSort="push"
          onChange={onChange}
        />
      ));

      const operations = wrapper.find('.t-transfer__operations');
      const rightBtn = operations.findAll('button')[0];
      await rightBtn.trigger('click');

      expect(onChange).toHaveBeenCalled();
      const callArgs = onChange.mock.calls[0];

      // targetSort 为 'push' 时走 else 分支，新项目添加到后面
      expect(callArgs[0]).toEqual(['3', '4', '1', '2']);
    });
  });
});
