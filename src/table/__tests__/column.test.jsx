import { mount } from '@vue/test-utils';
import { Table, BaseTable, PrimaryTable, EnhancedTable } from '@/src/table/index.ts';

const data = new Array(5).fill(null).map((item, index) => ({
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
    it('Props.columns.align', () => {
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

    it('Props.columns.attrs', () => {
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

    it('Props.columns.className works fine', () => {
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

    // 校验逻辑与上面columns.className一致
    it('Props.columns.thClassName works fine', () => {
      const columns = [
        { title: 'Index', colKey: 'index', thClassName: () => ['th-class'] },
        { title: 'Instance', colKey: 'instance', thClassName: 'th-class' },
        { title: 'description', colKey: 'instance', thClassName: [{ 'th-class': true }] },
        { title: 'Owner', colKey: 'owner', thClassName: { 'th-class': true, 'th-class1': false } },
      ];
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns}></TTable>;
        },
      });
      const thWrapper = wrapper.find('thead > tr');
      const thList = thWrapper.findAll('th');
      expect(thList[0].classes('th-class')).toBeTruthy();
      expect(thList[1].classes('th-class')).toBeTruthy();
      expect(thList[2].classes('th-class')).toBeTruthy();
      expect(thList[3].classes('th-class')).toBeTruthy();
      expect(thList[3].classes('th-class1')).toBeFalsy();
    });
  });
});
