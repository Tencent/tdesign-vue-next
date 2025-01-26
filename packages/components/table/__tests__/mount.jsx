import { mount } from '@vue/test-utils';

function getTableData(total = 5) {
  const data = [];
  for (let i = 0; i < total; i++) {
    data.push({
      index: i + 1,
      applicant: ['贾明', '张三', '王芳'][i % 3],
      status: i % 3,
      channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
      detail: {
        email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
      },
      matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
      time: [2, 3, 1, 4][i % 4],
      // 最后一个空数据 ''，用于测试 cellEmptyContent
      createTime: ['', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
    });
  }
  return data;
}

const SIMPLE_COLUMNS = [
  { title: 'Index', colKey: 'index' },
  { title: 'Applicant', colKey: 'applicant' },
  { title: 'Time', colKey: 'createTime' },
];

/** 基础表格，用于基础测试用例，第一个参数必须是组件名，第二个参数为组件属性 */
export function getNormalTableMount(TTable, props = {}) {
  const slots = props['v-slots'];
  delete props['v-slots'];
  return mount(
    <TTable
      rowKey="index"
      data={getTableData()}
      footData={getTableData(2)}
      columns={SIMPLE_COLUMNS}
      {...props}
      v-slots={slots}
    ></TTable>,
  );
}

export function getEmptyDataTableMount(TTable, props = {}) {
  const slots = props['v-slots'];
  delete props['v-slots'];
  return mount(<TTable rowKey="index" data={[]} columns={SIMPLE_COLUMNS} {...props} v-slots={slots}></TTable>);
}
