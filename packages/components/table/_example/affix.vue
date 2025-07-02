<template>
  <t-space direction="vertical">
    <t-space>
      <t-radio-group v-model="checkStrictly" variant="default-filled">
        <t-radio-button value="1"> value1 </t-radio-button>
        <t-radio-button value="2"> value2 </t-radio-button>
      </t-radio-group>
    </t-space>
    <t-enhanced-table
      ref="enhancedTableRef"
      row-key="key"
      :columns="columns"
      :data="data"
      :tree="{
        childrenKey: 'childrenList',
        checkStrictly: false,
        treeNodeColumnIndex: 2,
      }"
      :selected-row-keys="selectedRowKeys"
      :height="300"
      :scroll="{ type: 'virtual', rowHeight: 49, bufferSize: 10 }"
      @select-change="rehandleSelectChange"
      @row-click="onRowClick"
    />
  </t-space>
</template>

<script setup lang="jsx">
import { ref, watch } from 'vue';
import { EnhancedTable as TEnhancedTable } from 'tdesign-vue-next';

const [data1, data2] = [
  [
    {
      key: 'first_level_0',
      applicant: '贾明',
      childrenList: [
        {
          key: 'second_level_9235',
          applicant: '张三',
        },
        {
          key: 'second_level_931',
          applicant: '张三',
        },
        {
          key: 'second_level_8740',
          applicant: '张三',
        },
        {
          key: 'second_level_1053',
          applicant: '贾明',
        },
        {
          key: 'second_level_5372',
          applicant: '王芳',
        },
      ],
    },
  ],
  [
    {
      key: 'first_level_0',
      applicant: '贾明',
      childrenList: [
        {
          key: 'second_level_9053',
          applicant: '王芳',
        },
        {
          key: 'second_level_3528',
          applicant: '贾明',
        },
        {
          key: 'second_level_987',
          applicant: '贾明',
        },
        {
          key: 'second_level_5128',
          applicant: '张三',
        },
        {
          key: 'second_level_5974',
          applicant: '张三',
        },
      ],
    },
  ],
];

const enhancedTableRef = ref();

const columns = [
  {
    colKey: 'row-select',
    type: 'multiple',
    // 禁用行选中方式一：使用 disabled 禁用行（示例代码有效，勿删）。disabled 参数：{row: RowData; rowIndex: number })
    // 这种方式禁用行选中，当前行会添加行类名 t-table__row--disabled，禁用行文字变灰
    // disabled: ({ rowIndex }) => rowIndex === 1 || rowIndex === 3,

    // 禁用行选中方式二：使用 checkProps 禁用行（示例代码有效，勿删）
    // 这种方式禁用行选中，行文本不会变灰
    checkProps: ({ row }) => ({}),
    // 自由调整宽度，如果发现元素看不见，请加大宽度
    width: 50,
  },
  { colKey: 'key', width: 80, title: '编号' },
  { colKey: 'applicant', title: '申请人', width: 120 },
];

const data = ref(data1);
const checkStrictly = ref('1');
const selectedRowKeys = ref([]);

watch(
  () => checkStrictly.value,
  (newValue) => {
    selectedRowKeys.value = [];

    if (newValue === '1') {
      data.value = data1;
    } else {
      data.value = data2;
    }
  },
);

const rehandleSelectChange = (value, { selectedRowData }) => {
  selectedRowKeys.value = value; // 父节点、子节点
  console.log(444, value, selectedRowData); // selectedRowData 父节点、子节点
};

// 这个没有触发
const onRowClick = (data) => {
  console.log(333, data);
};
</script>
