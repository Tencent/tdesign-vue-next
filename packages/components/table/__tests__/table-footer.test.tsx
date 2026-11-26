import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { Table, BaseTable, PrimaryTable, EnhancedTable } from '@tdesign/components/table';
import type { BaseTableCol } from '@tdesign/components/table';
import ConfigProvider from '@tdesign/components/config-provider';
import TFoot from '../components/tfoot';
import type { RowAndColFixedPosition } from '../types';

const columns: BaseTableCol[] = [
  { title: 'Default', colKey: 'default' },
  { title: 'Left', colKey: 'left', align: 'left' },
  { title: 'Center', colKey: 'center', align: 'center' },
  { title: 'Right', colKey: 'right', align: 'right' },
];
const data = [{ id: 1, default: 'Total', left: 10, center: 20, right: 30 }];
const wrappers: VueWrapper[] = [];

afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
});

describe.each([
  ['Table', Table],
  ['BaseTable', BaseTable],
  ['PrimaryTable', PrimaryTable],
  ['EnhancedTable', EnhancedTable],
] as const)('%s', (_name, component) => {
  describe('props', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6003
    it('applies columns.align consistently to header, body, and footer cells', async () => {
      const wrapper = mount(component, { props: { columns, data, footData: data, rowKey: 'id' } });
      wrappers.push(wrapper);

      for (const selector of ['thead > tr > th', 'tbody > tr > td', 'tfoot > tr > td']) {
        const cells = wrapper.findAll(selector);
        expect(cells).toHaveLength(4);
        expect(cells[0].classes()).not.toContain('t-align-left');
        expect(cells[1].classes()).not.toContain('t-align-left');
        expect(cells[2].classes()).toContain('t-align-center');
        expect(cells[3].classes()).toContain('t-align-right');
      }

      await wrapper.setProps({ columns: columns.map((col) => ({ ...col, align: 'right' as const })) });
      const cells = wrapper.findAll('tfoot > tr > td');
      expect(cells.every((cell) => cell.classes().includes('t-align-right'))).toBe(true);
      expect(cells[2].classes()).not.toContain('t-align-center');
    });
  });
});

describe('TFoot', () => {
  describe('scenarios', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6003
    it('preserves fixed-column styles and uses the configured class prefix for footer alignment', () => {
      const fixedPositions: RowAndColFixedPosition = new Map([
        ['left', { left: 0, lastLeftFixedCol: true }],
        ['right', { right: 0, firstRightFixedCol: true }],
      ]);
      const wrapper = mount(() => (
        <ConfigProvider globalConfig={{ classPrefix: 'custom' }}>
          <TFoot
            rowKey="id"
            footData={data}
            rowAttributes={undefined}
            rowClassName={undefined}
            rowspanAndColspanInFooter={undefined}
            rowAndColFixedPosition={fixedPositions}
            thWidthList={{ left: 120, right: 90 }}
            columns={[
              { title: 'Left', colKey: 'left', align: 'center', fixed: 'left', width: 100 },
              { title: 'Center', colKey: 'center', width: 100 },
              { title: 'Right', colKey: 'right', align: 'right', fixed: 'right', width: 100 },
            ]}
          />
        </ConfigProvider>
      ));
      wrappers.push(wrapper);

      const cells = wrapper.findAll('tfoot > tr > td');
      expect(cells[0].classes()).toContain('custom-align-center');
      expect(cells[0].classes()).toContain('custom-table__cell--fixed-left');
      expect((cells[0].element as HTMLElement).style.left).toBe('0px');
      expect((cells[0].element as HTMLElement).style.width).toBe('120px');
      expect(cells[2].classes()).toContain('custom-align-right');
      expect(cells[2].classes()).toContain('custom-table__cell--fixed-right');
      expect((cells[2].element as HTMLElement).style.right).toBe('0px');
      expect((cells[2].element as HTMLElement).style.width).toBe('90px');
    });
  });
});
