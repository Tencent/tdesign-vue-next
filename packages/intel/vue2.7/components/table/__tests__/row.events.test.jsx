import { mount } from '@vue/test-utils';
import {
  Table, BaseTable, PrimaryTable, EnhancedTable,
} from '@/src/table/index.ts';

const data = new Array(5).fill(null).map((item, index) => ({
  id: index + 100,
  index: index + 100,
  instance: `JQTest${index + 1}`,
  status: index % 2,
  owner: 'jenny;peter',
  description: 'test',
}));

const SIMPLE_COLUMNS = [
  { title: 'Index', colKey: 'index' },
  { title: 'Instance', colKey: 'instance' },
];

// 4 类表格组件同时测试
const TABLES = [Table, BaseTable, PrimaryTable, EnhancedTable];

TABLES.forEach((TTable) => {
  describe(TTable.name, () => {
    it('Events.onCellClick', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          const on = { 'cell-click': fn };
          return <TTable rowKey="index" bordered data={data} on={on} columns={SIMPLE_COLUMNS}></TTable>;
        },
      });
      wrapper.find('td').trigger('click');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it('Events.onRowClick', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          const on = { 'row-click': fn };
          return <TTable rowKey="index" bordered data={data} on={on} columns={SIMPLE_COLUMNS}></TTable>;
        },
      });
      wrapper.find('tbody').find('tr').trigger('click');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it('Events.onRowDblclick', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          const on = { 'row-dblclick': fn };
          return <TTable rowKey="index" bordered data={data} on={on} columns={SIMPLE_COLUMNS}></TTable>;
        },
      });
      wrapper.find('tbody').find('tr').trigger('dblclick');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it('Events.onRowMouseup', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          const on = { 'row-mouseup': fn };
          return <TTable rowKey="index" bordered data={data} on={on} columns={SIMPLE_COLUMNS}></TTable>;
        },
      });
      wrapper.find('tbody').find('tr').trigger('mouseup');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it('Events.onRowMousedown', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          const on = { 'row-mousedown': fn };
          return <TTable rowKey="index" bordered data={data} on={on} columns={SIMPLE_COLUMNS}></TTable>;
        },
      });
      wrapper.find('tbody').find('tr').trigger('mousedown');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it('Events.onRowMouseenter', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          const on = { 'row-mouseenter': fn };
          return <TTable rowKey="index" bordered data={data} on={on} columns={SIMPLE_COLUMNS}></TTable>;
        },
      });
      wrapper.find('tbody').find('tr').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it('Events.onRowMouseleave', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          const on = { 'row-mouseleave': fn };
          return <TTable rowKey="index" bordered data={data} on={on} columns={SIMPLE_COLUMNS}></TTable>;
        },
      });
      wrapper.find('tbody').find('tr').trigger('mouseleave');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
    });

    it('Events.onRowMouseover', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          const on = { 'row-mouseover': fn };
          return <TTable rowKey="index" bordered data={data} on={on} columns={SIMPLE_COLUMNS}></TTable>;
        },
      });
      wrapper.find('tbody').find('tr').trigger('mouseover');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
    });
  });
});
