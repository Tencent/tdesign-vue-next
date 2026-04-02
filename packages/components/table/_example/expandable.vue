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
      <t-checkbox v-model="fixedColumns" style="margin-left: 32px">固定列</t-checkbox>
      <t-checkbox v-model="emptyData" style="margin-left: 32px">空数据</t-checkbox>
    </div>

    <!-- :defaultExpandedRowKeys="defaultExpandedRowKeys" -->
    <t-table
      row-key="index"
      :columns="columns"
      :data="emptyData ? [] : data"
      :expanded-row-keys="expandedRowKeys"
      :expanded-row="expandedRow"
      :expand-on-row-click="expandOnRowClick"
      :expand-icon="expandIcon"
      table-layout="auto"
      table-content-width="1200"
      lazy-load
      @expand-change="rehandleExpandChange"
    >
      <template #operation="{ row }">
        <t-link hover="color" theme="primary" @click="rehandleClickOp(row)">
          {{ row.status === 0 ? '查看详情' : '再次申请' }}
        </t-link>
      </template>
    </t-table>

    <!-- !! 也可以使用具名插槽 `expandedRow` 自定义展开行内容 !! -->
    <!-- <t-table
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
      <template #expandedRow="{ row }">
        <div class="more-detail">
          <p class="title"><b>集群名称:</b></p>
          <p class="content">{{ row.instance }}</p>
          <br />
          <p class="title"><b>管理员:</b></p>
          <p class="content">{{ row.owner }}</p>
          <br />
          <p class="title"><b>描述:</b></p>
          <p class="content">{{ row.description }}</p>
        </div>
      </template>
    </t-table> -->
  </div>
</template>

<script lang="tsx" setup>
import { ref, watch, computed } from 'vue';
import { TableProps, TableRowData } from 'tdesign-vue-next';
import {
  ChevronRightCircleIcon,
  ChevronRightIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  CloseCircleFilledIcon,
} from 'tdesign-icons-vue-next';
const statusNameListMap = {
  0: {
    label: '审批通过',
    theme: 'success',
    icon: <CheckCircleFilledIcon />,
  },
  1: {
    label: '审批失败',
    theme: 'danger',
    icon: <CloseCircleFilledIcon />,
  },
  2: {
    label: '审批过期',
    theme: 'warning',
    icon: <ErrorCircleFilledIcon />,
  },
};
const getColumns = (isFixedColumn: boolean) => {
  const columns: TableProps['columns'] = [
    {
      colKey: 'applicant',
      title: '申请人',
      width: '80',
      fixed: isFixedColumn ? 'left' : undefined,
    },
    {
      colKey: 'status',
      title: '申请状态',
      cell: (h, { row }) => {
        return (
          <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
            {statusNameListMap[row.status].icon}
            {statusNameListMap[row.status].label}
          </t-tag>
        );
      },
    },
    {
      colKey: 'channel',
      title: '签署方式',
    },
    {
      colKey: 'detail.email',
      title: '邮箱地址',
      ellipsis: true,
    },
    {
      colKey: 'createTime',
      title: '申请时间',
    },
    {
      colKey: 'operation',
      title: '操作',
      fixed: isFixedColumn ? 'right' : undefined,
    },
  ];
  return columns;
};
const data = new Array(5).fill(null).map((item, i) => ({
  index: i + 1,
  applicant: ['贾明', '张三', '王芳'][i % 3],
  status: i % 3,
  channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
  detail: {
    email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
  },
  matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
  time: [2, 3, 1, 4][i % 4],
  createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
}));
const expandControl = ref('true');
const expandIcon = ref<TableProps['expandIcon']>(true);
const expandOnRowClick = ref(true);
const expandedRowKeys = ref<TableProps['expandedRowKeys']>(['2']);
const fixedColumns = ref(false);
const emptyData = ref(false);
const columns = computed<TableProps['columns']>(() => getColumns(fixedColumns.value));
const expandedRow: TableProps['expandedRow'] = (h, { row }) => (
  <div class="more-detail">
    <p class="title">
      <b>申请人:</b>
    </p>
    <p class="content">{row.applicant}</p>
    <br />
    <p class="title">
      <b>邮箱地址:</b>
    </p>
    <p class="content">{row.detail.email}</p>
    <br />
    <p class="title">
      <b>签署方式:</b>
    </p>
    <p class="content">{row.channel}</p>
  </div>
);
const rehandleExpandChange: TableProps['onExpandChange'] = (value, params) => {
  expandedRowKeys.value = value;
  console.log('rehandleExpandChange', value, params);
};
const rehandleClickOp = ({ text, row }: TableRowData) => {
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
      expandIcon.value = (h, { index }) => {
        // 第一行不显示展开图标
        if (index === 0) return false;
        // 第三行，使用自定义展开图标
        if (index === 3) return <ChevronRightIcon />;
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

.more-detail {
  line-height: 22px;

  > p {
    display: inline-block;
    margin: 4px 0;
  }

  > p.title {
    width: 120px;
  }
}
</style>
