const transferMockData: {
  value: string;
  label: string;
  disabled: boolean;
  index: number;
}[] = [];

(() => {
  for (let i = 0; i < 20; i++) {
    transferMockData.push({
      value: i.toString(),
      label: `内容${i + 1}`,
      disabled: i % 3 < 1,
      index: i,
    });
  }
})();

const transferListMockData = [
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

const pagination = {
  pageSize: 5,
  total: 20,
  current: 1,
};

export { transferMockData, pagination, transferListMockData };
