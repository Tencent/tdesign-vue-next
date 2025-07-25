import { getNormalTableMount, getEmptyDataTableMount } from './mount';

describe('BaseTable Component', () => {
  it('props.bordered works fine', () => {
    // bordered default value is false
    const wrapper1 = getNormalTableMount();
    expect(wrapper1.classes('t-table--bordered')).toBeFalsy();
    // bordered = true
    const wrapper2 = getNormalTableMount({ bordered: true });
    expect(wrapper2.classes('t-table--bordered')).toBeTruthy();
    // bordered = false
    const wrapper3 = getNormalTableMount({ bordered: false });
    expect(wrapper3.classes('t-table--bordered')).toBeFalsy();
  });

  it('props.bottomContent works fine', () => {
    const wrapper = getNormalTableMount({ bottomContent: () => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.bottomContent works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { bottomContent: () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.bottom-content works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { 'bottom-content': () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.cellEmptyContent works fine', () => {
    const wrapper = getNormalTableMount({ cellEmptyContent: () => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.cellEmptyContent works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { cellEmptyContent: () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.cell-empty-content works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { 'cell-empty-content': () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.empty works fine', () => {
    const wrapper = getEmptyDataTableMount({ empty: () => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.empty works fine', () => {
    const wrapper = getEmptyDataTableMount({
      'v-slots': { empty: () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.firstFullRow works fine', () => {
    const wrapper = getNormalTableMount({ firstFullRow: () => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__first-full-row').exists()).toBeTruthy();
    expect(wrapper.find('td[colspan="3"]').exists()).toBeTruthy();
  });

  it('slots.firstFullRow works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { firstFullRow: () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__first-full-row').exists()).toBeTruthy();
    expect(wrapper.find('td[colspan="3"]').exists()).toBeTruthy();
  });
  it('slots.first-full-row works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { 'first-full-row': () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__first-full-row').exists()).toBeTruthy();
    expect(wrapper.find('td[colspan="3"]').exists()).toBeTruthy();
  });

  it('props.fixedRows is equal [3, 1]', () => {
    const wrapper = getNormalTableMount({ fixedRows: [3, 1] });
    expect(wrapper.findAll('.t-table__row--fixed-top').length).toBe(3);
    expect(wrapper.findAll('.t-table__row--fixed-bottom').length).toBe(1);
  });

  it('props.footData works fine. `"tfoot.t-table__footer"` should exist', () => {
    const wrapper = getNormalTableMount();
    expect(wrapper.find('tfoot.t-table__footer').exists()).toBeTruthy();
  });

  it('props.footData works fine. `{"tfoot > tr":2}` should exist', () => {
    const wrapper = getNormalTableMount();
    expect(wrapper.findAll('tfoot > tr').length).toBe(2);
  });

  it('props.footerSummary works fine', () => {
    const wrapper = getNormalTableMount({ footerSummary: () => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__footer').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__row-full-element').exists()).toBeTruthy();
    expect(wrapper.find('td[colspan="3"]').exists()).toBeTruthy();
  });

  it('slots.footerSummary works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { footerSummary: () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__footer').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__row-full-element').exists()).toBeTruthy();
    expect(wrapper.find('td[colspan="3"]').exists()).toBeTruthy();
  });
  it('slots.footer-summary works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { 'footer-summary': () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__footer').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__row-full-element').exists()).toBeTruthy();
    expect(wrapper.find('td[colspan="3"]').exists()).toBeTruthy();
  });

  it('props.hover works fine', () => {
    // hover default value is false
    const wrapper1 = getNormalTableMount();
    expect(wrapper1.classes('t-table--hoverable')).toBeFalsy();
    // hover = true
    const wrapper2 = getNormalTableMount({ hover: true });
    expect(wrapper2.classes('t-table--hoverable')).toBeTruthy();
    // hover = false
    const wrapper3 = getNormalTableMount({ hover: false });
    expect(wrapper3.classes('t-table--hoverable')).toBeFalsy();
  });

  it('props.lastFullRow works fine', () => {
    const wrapper = getNormalTableMount({ lastFullRow: () => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__last-full-row').exists()).toBeTruthy();
    expect(wrapper.find('td[colspan="3"]').exists()).toBeTruthy();
  });

  it('slots.lastFullRow works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { lastFullRow: () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__last-full-row').exists()).toBeTruthy();
    expect(wrapper.find('td[colspan="3"]').exists()).toBeTruthy();
  });
  it('slots.last-full-row works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { 'last-full-row': () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__last-full-row').exists()).toBeTruthy();
    expect(wrapper.find('td[colspan="3"]').exists()).toBeTruthy();
  });

  it('props.loading works fine', () => {
    const wrapper = getNormalTableMount({ loading: () => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-loading').exists()).toBeTruthy();
  });

  it('slots.loading works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { loading: () => <span class="custom-node">TNode</span> },
      loading: true,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-loading').exists()).toBeTruthy();
  });

  it('props.loading: BaseTable contains element `.t-loading`', () => {
    // loading default value is undefined
    const wrapper = getNormalTableMount();
    expect(wrapper.find('.t-loading').exists()).toBeFalsy();
    // loading = false
    const wrapper1 = getNormalTableMount({ loading: false });
    expect(wrapper1.find('.t-loading').exists()).toBeFalsy();
    // loading = true
    const wrapper2 = getNormalTableMount({ loading: true });
    expect(wrapper2.find('.t-loading').exists()).toBeTruthy();
  });

  it('props.resizable works fine', () => {
    // resizable default value is false
    const wrapper1 = getNormalTableMount();
    expect(wrapper1.classes('t-table--column-resizable')).toBeFalsy();
    // resizable = true
    const wrapper2 = getNormalTableMount({ resizable: true });
    expect(wrapper2.classes('t-table--column-resizable')).toBeTruthy();
    // resizable = false
    const wrapper3 = getNormalTableMount({ resizable: false });
    expect(wrapper3.classes('t-table--column-resizable')).toBeFalsy();
  });

  it(`props.rowAttributes is equal to { 'data-level': 'level-1' }`, () => {
    const wrapper = getNormalTableMount({ rowAttributes: { 'data-level': 'level-1' } });
    const domWrapper = wrapper.find('tbody > tr');
    expect(domWrapper.attributes('data-level')).toBe('level-1');
  });
  it(`props.rowAttributes is equal to [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }]`, () => {
    const wrapper = getNormalTableMount({
      rowAttributes: [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }],
    });
    const domWrapper = wrapper.find('tbody > tr');
    expect(domWrapper.attributes('data-level')).toBe('level-1');
    expect(domWrapper.attributes('data-name')).toBe('tdesign');
  });
  it(`props.rowAttributes is equal to () => [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }]`, () => {
    const wrapper = getNormalTableMount({
      rowAttributes: () => [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }],
    });
    const domWrapper = wrapper.find('tbody > tr');
    expect(domWrapper.attributes('data-level')).toBe('level-1');
    expect(domWrapper.attributes('data-name')).toBe('tdesign');
  });
  it(`props.rowAttributes is equal to [() => [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }]]`, () => {
    const wrapper = getNormalTableMount({
      rowAttributes: [() => [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }]],
    });
    const domWrapper = wrapper.find('tbody > tr');
    expect(domWrapper.attributes('data-level')).toBe('level-1');
    expect(domWrapper.attributes('data-name')).toBe('tdesign');
  });

  it(`props.rowClassName is equal to 'tdesign-class'`, () => {
    const wrapper = getNormalTableMount({ rowClassName: 'tdesign-class' });
    const domWrapper = wrapper.find('tbody > tr');
    expect(domWrapper.classes('tdesign-class')).toBeTruthy();
  });
  it(`props.rowClassName is equal to { 'tdesign-class': true, 'tdesign-class-next': false }`, () => {
    const wrapper = getNormalTableMount({
      rowClassName: { 'tdesign-class': true, 'tdesign-class-next': false },
    });
    const domWrapper = wrapper.find('tbody > tr');
    expect(domWrapper.classes('tdesign-class')).toBeTruthy();
    expect(domWrapper.classes('tdesign-class-next')).toBeFalsy();
  });
  it(`props.rowClassName is equal to ['tdesign-class-default', { 'tdesign-class': true, 'tdesign-class-next': false }]`, () => {
    const wrapper = getNormalTableMount({
      rowClassName: ['tdesign-class-default', { 'tdesign-class': true, 'tdesign-class-next': false }],
    });
    const domWrapper = wrapper.find('tbody > tr');
    expect(domWrapper.classes('tdesign-class-default')).toBeTruthy();
    expect(domWrapper.classes('tdesign-class')).toBeTruthy();
    expect(domWrapper.classes('tdesign-class-next')).toBeFalsy();
  });
  it(`props.rowClassName is equal to () => ({ 'tdesign-class': true, 'tdesign-class-next': false })`, () => {
    const wrapper = getNormalTableMount({
      rowClassName: () => ({ 'tdesign-class': true, 'tdesign-class-next': false }),
    });
    const domWrapper = wrapper.find('tbody > tr');
    expect(domWrapper.classes('tdesign-class')).toBeTruthy();
    expect(domWrapper.classes('tdesign-class-next')).toBeFalsy();
  });

  it('props.showHeader: BaseTable contains element `thead`', () => {
    // showHeader default value is true
    const wrapper = getNormalTableMount();
    expect(wrapper.find('thead').exists()).toBeTruthy();
    // showHeader = false
    const wrapper1 = getNormalTableMount({ showHeader: false });
    expect(wrapper1.find('thead').exists()).toBeFalsy();
    // showHeader = true
    const wrapper2 = getNormalTableMount({ showHeader: true });
    expect(wrapper2.find('thead').exists()).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = getNormalTableMount({ size: item });
      if (typeof sizeClassNameList[index] === 'string') {
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      } else if (typeof sizeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(sizeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.stripe works fine', () => {
    // stripe default value is false
    const wrapper1 = getNormalTableMount();
    expect(wrapper1.classes('t-table--striped')).toBeFalsy();
    // stripe = true
    const wrapper2 = getNormalTableMount({ stripe: true });
    expect(wrapper2.classes('t-table--striped')).toBeTruthy();
    // stripe = false
    const wrapper3 = getNormalTableMount({ stripe: false });
    expect(wrapper3.classes('t-table--striped')).toBeFalsy();
  });

  const tableLayoutExpectedDom = ['table.t-table--layout-auto', 'table.t-table--layout-fixed'];
  ['auto', 'fixed'].forEach((item, index) => {
    it(`props.tableLayout is equal to ${item}`, () => {
      const wrapper = getNormalTableMount({ tableLayout: item });
      expect(wrapper.find(tableLayoutExpectedDom[index]).exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.topContent works fine', () => {
    const wrapper = getNormalTableMount({ topContent: () => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.topContent works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { topContent: () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.top-content works fine', () => {
    const wrapper = getNormalTableMount({
      'v-slots': { 'top-content': () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  const verticalAlignClassNameList = [
    't-vertical-align-top',
    { 't-vertical-align-middle': false },
    't-vertical-align-bottom',
  ];
  ['top', 'middle', 'bottom'].forEach((item, index) => {
    it(`props.verticalAlign is equal to ${item}`, () => {
      const wrapper = getNormalTableMount({ verticalAlign: item });
      if (typeof verticalAlignClassNameList[index] === 'string') {
        expect(wrapper.classes(verticalAlignClassNameList[index])).toBeTruthy();
      } else if (typeof verticalAlignClassNameList[index] === 'object') {
        const classNameKey = Object.keys(verticalAlignClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });
});
