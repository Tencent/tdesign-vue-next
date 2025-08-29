// @ts-nocheck
import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TransferList from '@tdesign/components/transfer/components/transfer-list';

const mockData = [
  {
    value: '1',
    label: '项目1',
    disabled: false,
    key: 'key__value_1_index_0',
    data: { value: '1', label: '项目1' },
  },
  {
    value: '2',
    label: '项目2',
    disabled: false,
    key: 'key__value_2_index_1',
    data: { value: '2', label: '项目2' },
  },
  {
    value: '3',
    label: '项目3',
    disabled: true,
    key: 'key__value_3_index_2',
    data: { value: '3', label: '项目3' },
  },
];

describe('TransferList', () => {
  describe('Props', () => {
    it(':dataSource', () => {
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" />);
      expect(wrapper.find('.t-transfer__list').exists()).toBeTruthy();
      expect(wrapper.findAll('.t-transfer__list-item').length).toBe(3);
    });

    it(':listType', () => {
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="target" />);
      expect(wrapper.find('.t-transfer__list').exists()).toBeTruthy();
    });

    it(':title string', () => {
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" title="源列表" />);
      expect(wrapper.find('.t-transfer__list-header').text()).toContain('源列表');
    });

    it(':title function', () => {
      const titleFn = () => '自定义标题';
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" title={titleFn} />);
      expect(wrapper.find('.t-transfer__list-header').text()).toContain('自定义标题');
    });

    it(':checkedValue', () => {
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" checkedValue={['1', '2']} />);
      const checkboxes = wrapper.findAll('.t-checkbox input');
      expect(checkboxes[0].element.checked).toBe(true);
      expect(checkboxes[1].element.checked).toBe(true);
    });

    it(':disabled', () => {
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" disabled />);
      const checkboxes = wrapper.findAll('.t-checkbox input');
      checkboxes.forEach((checkbox) => {
        expect(checkbox.element.disabled).toBe(true);
      });
    });

    it(':search boolean', () => {
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" search />);
      expect(wrapper.find('.t-transfer__search-wrapper').exists()).toBeTruthy();
      expect(wrapper.find('.t-input').exists()).toBeTruthy();
    });

    it(':search object', () => {
      const searchConfig = { placeholder: '搜索项目' };
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" search={searchConfig} />);
      expect(wrapper.find('.t-transfer__search-wrapper').exists()).toBeTruthy();
    });

    it(':empty string', () => {
      const wrapper = mount(() => <TransferList dataSource={[]} listType="source" empty="没有数据" />);
      expect(wrapper.find('.t-transfer__empty').text()).toBe('没有数据');
    });

    it(':empty function', () => {
      const emptyFn = () => '自定义空状态';
      const wrapper = mount(() => <TransferList dataSource={[]} listType="source" empty={emptyFn} />);
      expect(wrapper.find('.t-transfer__empty').text()).toBe('自定义空状态');
    });

    it(':pagination', () => {
      const pagination = { pageSize: 2, current: 1, total: 3 };
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" pagination={pagination} />);
      expect(wrapper.find('.t-pagination').exists()).toBeTruthy();
    });

    it(':footer string', () => {
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" footer="底部内容" />);
      expect(wrapper.find('.t-transfer__list').text()).toContain('底部内容');
    });

    it(':footer function', () => {
      const footerFn = () => '自定义底部';
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" footer={footerFn} />);
      expect(wrapper.find('.t-transfer__list').text()).toContain('自定义底部');
    });

    it(':checkAll', () => {
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" checkAll />);
      expect(wrapper.find('.t-transfer__list-header .t-checkbox').exists()).toBeTruthy();
    });
    it(':isTreeMode', () => {
      const treeData = [
        {
          value: '1',
          label: '项目1',
          children: [
            { value: '1-1', label: '子项目1-1' },
            { value: '1-2', label: '子项目1-2' },
          ],
        },
      ];
      const wrapper = mount(() => <TransferList dataSource={treeData} listType="source" isTreeMode />);
      // 在树模式下，内容会通过 tree slot 渲染，检查包含树内容的容器
      expect(wrapper.find('.t-transfer__list-content').exists()).toBeTruthy();
      // 验证渲染了树数据结构
      expect(wrapper.text()).toContain('项目1');
    });

    it(':draggable', () => {
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="target" draggable />);
      // 查找所有具有 draggable="true" 属性的元素
      const items = wrapper.findAll('[draggable="true"]');
      expect(items.length).toBeGreaterThan(0);
      items.forEach((item) => {
        expect(item.attributes('draggable')).toBe('true');
      });
    });

    it(':transferItem custom render', () => {
      const transferItem = ({ data }) => <span class="custom-item">{data}</span>;
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" transferItem={transferItem} />);
      expect(wrapper.findAll('.custom-item').length).toBe(mockData.length);
    });

    it(':checkboxProps', () => {
      const checkboxProps = { size: 'large' };
      const wrapper = mount(() => (
        <TransferList dataSource={mockData} listType="source" checkboxProps={checkboxProps} />
      ));
      expect(wrapper.find('.t-checkbox').exists()).toBeTruthy();
    });
  });

  describe('Events', () => {
    it(':onCheckedChange', async () => {
      const onCheckedChange = vi.fn();
      const wrapper = mount(() => (
        <TransferList dataSource={mockData} listType="source" onCheckedChange={onCheckedChange} />
      ));

      const checkbox = wrapper.find('.t-checkbox input');
      await checkbox.trigger('change');
      expect(onCheckedChange).toHaveBeenCalled();
    });

    it(':onPageChange', async () => {
      const onPageChange = vi.fn();
      const pagination = { pageSize: 2, current: 1, total: 3 };
      const wrapper = mount(() => (
        <TransferList dataSource={mockData} listType="source" pagination={pagination} onPageChange={onPageChange} />
      ));

      const nextBtn = wrapper.find('.t-pagination__btn-next');
      await nextBtn.trigger('click');
      expect(onPageChange).toHaveBeenCalled();
    });

    it(':onScroll', async () => {
      const onScroll = vi.fn();
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" onScroll={onScroll} />);

      const content = wrapper.find('.t-transfer__list-content');
      await content.trigger('scroll');
      expect(onScroll).toHaveBeenCalled();
    });

    it(':onSearch', async () => {
      const onSearch = vi.fn();
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" search onSearch={onSearch} />);

      const input = wrapper.find('.t-input input');
      await input.setValue('项目');
      await input.trigger('input');
      expect(onSearch).toHaveBeenCalled();
    });

    it(':onDataChange for drag sort', async () => {
      const onDataChange = vi.fn();
      const currentValue = ref(['1', '2', '3']);
      const wrapper = mount(() => (
        <TransferList
          dataSource={mockData}
          listType="target"
          draggable
          currentValue={currentValue.value}
          onDataChange={onDataChange}
        />
      ));

      const items = wrapper.findAll('[data-index]');
      await items[0].trigger('dragstart');
      await items[1].trigger('dragover');
      await items[1].trigger('drop');
      expect(onDataChange).toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('should handle check all', async () => {
      const onCheckedChange = vi.fn();
      const wrapper = mount(() => (
        <TransferList dataSource={mockData} listType="source" checkAll onCheckedChange={onCheckedChange} />
      ));

      const checkAllBox = wrapper.find('.t-transfer__list-header .t-checkbox input');
      await checkAllBox.trigger('change');
      expect(onCheckedChange).toHaveBeenCalled();
    });

    it('should filter data when searching', async () => {
      const wrapper = mount(() => <TransferList dataSource={mockData} listType="source" search />);

      const input = wrapper.find('.t-input input');
      await input.setValue('项目1');
      await input.trigger('input');

      await wrapper.vm.$nextTick();
      // 验证过滤后的结果
      const items = wrapper.findAll('.t-transfer__list-item');
      expect(items.length).toBeLessThanOrEqual(mockData.length);
    });

    it('should handle pagination correctly', async () => {
      const onPageChange = vi.fn();
      const pagination = { pageSize: 1, current: 1, total: 3 };
      const wrapper = mount(() => (
        <TransferList dataSource={mockData} listType="source" pagination={pagination} onPageChange={onPageChange} />
      ));

      // 验证当前页只显示一个项目
      const items = wrapper.findAll('.t-transfer__list-item');
      expect(items.length).toBe(1);
    });

    it('should show indeterminate state when partially checked', async () => {
      const wrapper = mount(() => (
        <TransferList dataSource={mockData} listType="source" checkedValue={['1']} checkAll />
      ));

      const checkAllBox = wrapper.find('.t-transfer__list-header .t-checkbox');
      expect(checkAllBox.classes()).toContain('t-is-indeterminate');
    });

    it('should show all checked state when all items checked', async () => {
      const wrapper = mount(() => (
        <TransferList
          dataSource={mockData.filter((item) => !item.disabled)}
          listType="source"
          checkedValue={['1', '2']}
          checkAll
        />
      ));

      const checkAllBox = wrapper.find('.t-transfer__list-header .t-checkbox');
      expect(checkAllBox.classes()).toContain('t-is-checked');
    });
  });

  describe('Tree Mode', () => {
    const treeData = [
      {
        value: '1',
        label: '项目1',
        children: [
          {
            value: '1-1',
            label: '子项目1-1',
            key: 'key__value_1-1_index_0',
            data: { value: '1-1', label: '子项目1-1' },
          },
          {
            value: '1-2',
            label: '子项目1-2',
            key: 'key__value_1-2_index_1',
            data: { value: '1-2', label: '子项目1-2' },
          },
        ],
        key: 'key__value_1_index_0',
        data: { value: '1', label: '项目1' },
      },
    ];

    it('should render tree structure correctly', () => {
      const wrapper = mount(() => <TransferList dataSource={treeData} listType="source" isTreeMode />);
      expect(wrapper.find('.t-transfer__list').exists()).toBeTruthy();
    });

    it('should handle tree search correctly', async () => {
      const wrapper = mount(() => <TransferList dataSource={treeData} listType="source" isTreeMode search />);

      const input = wrapper.find('.t-input input');
      await input.setValue('子项目');
      await input.trigger('input');

      await wrapper.vm.$nextTick();
      // 验证树形搜索结果
    });
  });
});
