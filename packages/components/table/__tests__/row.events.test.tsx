import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Table, BaseTable, PrimaryTable, EnhancedTable } from '@tdesign/components';

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
          return <TTable rowKey="index" bordered data={data} onCellClick={fn} columns={SIMPLE_COLUMNS}></TTable>;
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
          return <TTable rowKey="index" bordered data={data} onRowClick={fn} columns={SIMPLE_COLUMNS}></TTable>;
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
          return <TTable rowKey="index" bordered data={data} onRowDblclick={fn} columns={SIMPLE_COLUMNS}></TTable>;
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
          return <TTable rowKey="index" bordered data={data} onRowMouseup={fn} columns={SIMPLE_COLUMNS}></TTable>;
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
          return <TTable rowKey="index" bordered data={data} onRowMousedown={fn} columns={SIMPLE_COLUMNS}></TTable>;
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
          return <TTable rowKey="index" bordered data={data} onRowMouseenter={fn} columns={SIMPLE_COLUMNS}></TTable>;
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
          return <TTable rowKey="index" bordered data={data} onRowMouseleave={fn} columns={SIMPLE_COLUMNS}></TTable>;
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
          return <TTable rowKey="index" bordered data={data} onRowMouseover={fn} columns={SIMPLE_COLUMNS}></TTable>;
        },
      });
      wrapper.find('tbody').find('tr').trigger('mouseover');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
    });
  });
});
