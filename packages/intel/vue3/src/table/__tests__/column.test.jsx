import { mount } from '@vue/test-utils';
import { BaseTable, EnhancedTable, PrimaryTable, Table } from 'tdesign-vue-next';

const data = Array.from({ length: 5 }).fill(null).map((item, index) => ({
  id: index + 100,
  index: index + 100,
  instance: `JQTest${index + 1}`,
  status: index % 2,
  owner: 'jenny;peter',
  description: 'test',
}));

// 4 类表格组件同时测试
const TABLES = [Table, BaseTable, PrimaryTable, EnhancedTable];

TABLES.forEach((TTable) => {
  describe(TTable.name, () => {
    it('props.columns.align', () => {
      const columns = [
        { title: 'Index', colKey: 'index', align: 'center' },
        { title: 'Instance', colKey: 'instance', align: 'left' },
        { title: 'description', colKey: 'instance' },
        { title: 'Owner', colKey: 'owner', align: 'right' },
      ];
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns}></TTable>;
        },
      });
      const firstTrWrapper = wrapper.find('tbody > tr');
      const tdList = firstTrWrapper.findAll('td');
      expect(tdList[0].classes('t-align-center')).toBeTruthy();
      expect(tdList[1].classes('t-align-left')).toBeFalsy();
      expect(tdList[2].classes('t-align-left')).toBeFalsy();
      expect(tdList[3].classes('t-align-right')).toBeTruthy();
    });

    it('props.columns.attrs', () => {
      const columns = [
        { title: 'Index', colKey: 'index' },
        { title: 'Instance', colKey: 'instance', attrs: { 'col-key': 'instance' } },
        { title: 'description', colKey: 'instance' },
        { title: 'Owner', colKey: 'owner' },
      ];
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns}></TTable>;
        },
      });
      const firstTrWrapper = wrapper.find('tbody > tr');
      const tdList = firstTrWrapper.findAll('td');
      expect(tdList[1].attributes('col-key')).toBe('instance');
    });

    it('props.columns.className works fine', () => {
      const columns = [
        { title: 'Index', colKey: 'index', className: () => ['tdesign-class'] },
        { title: 'Instance', colKey: 'instance', className: 'tdesign-class' },
        { title: 'description', colKey: 'instance', className: [{ 'tdesign-class': true }] },
        { title: 'Owner', colKey: 'owner', className: { 'tdesign-class': true, 'tdesign-class1': false } },
      ];
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns}></TTable>;
        },
      });
      const firstTrWrapper = wrapper.find('tbody > tr');
      const tdList = firstTrWrapper.findAll('td');
      expect(tdList[0].classes('tdesign-class')).toBeTruthy();
      expect(tdList[1].classes('tdesign-class')).toBeTruthy();
      expect(tdList[2].classes('tdesign-class')).toBeTruthy();
      expect(tdList[3].classes('tdesign-class')).toBeTruthy();
      expect(tdList[3].classes('tdesign-class1')).toBeFalsy();
    });
  });
});
