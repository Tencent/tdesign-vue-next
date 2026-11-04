import { mount } from '@vue/test-utils';
import { BaseTable } from '@tdesign/components/table';

/**
 * 表格测试公共数据与挂载工具
 */

export const SIMPLE_COLUMNS = [
  { title: 'Index', colKey: 'index' },
  { title: 'Applicant', colKey: 'applicant' },
  { title: 'Time', colKey: 'createTime' },
];

export function getTableData(total = 5) {
  const data = [];
  for (let i = 0; i < total; i++) {
    data.push({
      id: i + 1,
      index: i + 1,
      applicant: ['贾明', '张三', '王芳'][i % 3],
      status: i % 3,
      channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
      detail: {
        email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
      },
      matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
      time: [2, 3, 1, 4][i % 4],
      // 第一条为空字符串，用于测试 cellEmptyContent
      createTime: ['', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
    });
  }
  return data;
}

type TableSlots = Parameters<typeof mount>[1]['slots'];

interface MountOptions {
  'v-slots'?: TableSlots;
  [key: string]: unknown;
}

/**
 * 挂载一个包含表尾数据的基础表格
 * 支持通过 v-slots 传入插槽
 */
export function getNormalTableMount(props: MountOptions = {}) {
  const { 'v-slots': slots, ...restProps } = props;
  return mount(BaseTable, {
    props: {
      rowKey: 'index',
      data: getTableData(),
      footData: getTableData(2),
      columns: SIMPLE_COLUMNS,
      ...restProps,
    },
    slots,
  });
}

/** 挂载一个空数据表格 */
export function getEmptyDataTableMount(props: MountOptions = {}) {
  const { 'v-slots': slots, ...restProps } = props;
  return mount(BaseTable, {
    props: { rowKey: 'index', data: [], columns: SIMPLE_COLUMNS, ...restProps },
    slots,
  });
}
