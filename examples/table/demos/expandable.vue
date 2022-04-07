<template>
  <div class="tdesign-demo-block-column tdesign-table-expandable-demo" style="width: 100%">
    <!-- expanded-row-keys 为受控属性 -->
    <!-- default-expanded-row-keys 为非受控属性 -->
    <div>
      <t-radio-group v-model="expandControl" variant="default-filled">
        <t-radio-button value="true"> 显示展开图标 </t-radio-button>
        <t-radio-button value="false"> 隐藏展开图标 </t-radio-button>
        <t-radio-button value="custom"> 自由控制展开图标 </t-radio-button>
      </t-radio-group>
    </div>

    <div>
      <t-checkbox v-model="expandOnRowClick">允许点击行之后展开/收起</t-checkbox>
      <t-checkbox v-model="fixedColums" style="margin-left: 32px">固定列</t-checkbox>
      <t-checkbox v-model="emptyData" style="margin-left: 32px">空数据</t-checkbox>
    </div>

    <!-- :defaultExpandedRowKeys="defaultExpandedRowKeys" -->
    <t-table
      row-key="id"
      :columns="columns"
      :data="emptyData ? [] : data"
      :expanded-row-keys="expandedRowKeys"
      :expanded-row="expandedRow"
      :expand-on-row-click="expandOnRowClick"
      :expand-icon="expandIcon"
      table-layout="auto"
      table-content-width="1200"
      @expand-change="rehandleExpandChange"
    >
      <template #status="{ row }">
        <p v-if="row.status === 0" class="status">健康</p>
        <p v-if="row.status === 1" class="status unhealth">异常</p>
      </template>
      <template #op-column><p>操作</p></template>
      <template #op="slotProps">
        <a class="link" @click="rehandleClickOp(slotProps)">管理</a>
        <a class="link" @click="rehandleClickOp(slotProps)">删除</a>
      </template>
    </t-table>

    <!-- !! 也可以使用具名插槽 `expandedRow` 自定义展开行内容 !! -->
    <!-- <template #expandedRow="{ row }">
      <div class="more-detail">
        <p class="title"><b>集群名称:</b></p><p class="content">{{row.instance}}</p><br/>
        <p class="title"><b>管理员:</b></p><p class="content">{{row.owner}}</p><br/>
        <p class="title"><b>描述:</b></p><p class="content">{{row.description}}</p>
      </div>
    </template> -->
  </div>
</template>

<script setup lang="jsx">
import { ref, watch, computed } from 'vue';

import { ChevronRightCircleIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';

const getColums = (isFixedColumn) => [
  { colKey: 'instance', title: '集群名称', fixed: isFixedColumn ? 'left' : '' },
  {
    colKey: 'status',
    title: '状态',
    cell: 'status',
  },
  { colKey: 'owner', title: '管理员' },
  { colKey: 'description', title: '描述' },
  { colKey: 'field1', title: '字段 1' },
  { colKey: 'field2', title: '字段 2' },
  { colKey: 'field3', title: '字段 3' },
  { colKey: 'field4', title: '字段 4' },
  { colKey: 'field5', title: '字段 5' },
  { colKey: 'field6', title: '字段 6' },
  {
    colKey: 'op',
    title: 'op-column',
    cell: 'op',
    fixed: isFixedColumn ? 'right' : '',
  },
];

const data = new Array(5).fill(null).map((item, index) => ({
  id: index + 100,
  instance: `JQTest${index + 1}`,
  status: index % 2,
  owner: 'jenny;peter',
  description: 'description',
  field1: 'field1',
  field2: 'field2',
  field3: 'field3',
  field4: 'field4',
  field5: 'field5',
  field6: 'field6',
}));

const expandControl = ref('true');
const expandIcon = ref(true);
const expandOnRowClick = ref(true);
const expandedRowKeys = ref(['2']);
const fixedColums = ref(false);
const emptyData = ref(false);

const columns = computed(() => getColums(fixedColums.value));

const expandedRow = (h, { row }) => (
  <div class="more-detail">
    <p class="title">
      <b>集群名称:</b>
    </p>
    <p class="content">{row.instance}</p>
    <br />
    <p class="title">
      <b>管理员:</b>
    </p>
    <p class="content">{row.owner}</p>
    <br />
    <p class="title">
      <b>描述:</b>
    </p>
    <p class="content">{row.description}</p>
  </div>
);

const rehandleExpandChange = (value, { expandedRowData }) => {
  expandedRowKeys.value = value;
  console.log('rehandleExpandChange', value, expandedRowData);
};

const rehandleClickOp = ({ text, row }) => {
  console.log(text, row);
};

watch(
  () => expandControl.value,
  (val) => {
    if (val === 'true') {
      // expandIcon 默认为 true，表示显示默认展开图标
      expandIcon.value = true;
    } else if (val === 'false') {
      // expandIcon 值为 false，则表示隐藏全部展开图标
      expandIcon.value = false;
    } else if (val === 'custom') {
      // 完全自由控制表格的每一行是否显示展开图标，以及显示什么内容
      expandIcon.value = (h, { row, index }) => {
        // 第一行不显示展开图标
        if (index === 0) return false;
        // 第三行，使用自定义展开图标
        if (row.id === 103) return <ChevronRightIcon />;
        // 其他行，使用表格同款展开图标
        return <ChevronRightCircleIcon />;
      };
    }
  },
);
</script>

<style lang="less">
:deep([class*='t-table-expandable-icon-cell']) .t-icon {
  background-color: transparent;
}
.link {
  cursor: pointer;
  margin-right: 15px;
}
.status {
  position: relative;
  color: #00a870;
  margin-left: 10px;
  &::before {
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    content: '';
    background-color: #00a870;
    width: 6px;
    height: 6px;
    margin-left: -10px;
    border-radius: 50%;
  }
}
.status.unhealth {
  color: #e34d59;
  &::before {
    background-color: #e34d59;
  }
}
.more-detail {
  > p {
    display: inline-block;
    margin: 5px;
  }
  > p.title {
    width: 100px;
  }
}
</style>
