<template>
  <div>
    <div>
      <t-radio-group v-model="align" variant="default-filled">
        <t-radio-button value="left">左对齐</t-radio-button>
        <t-radio-button value="center">居中对齐</t-radio-button>
        <t-radio-button value="right">右对齐</t-radio-button>
      </t-radio-group>
      <t-button variant="text" style="margin-left: 36px" @click="setFilters">清除筛选条件</t-button>
      <span style="padding-left: 36px">已选筛选条件：{{ filterValue }}</span>
    </div>
    <div style="margin: 16px">
      <t-checkbox v-model="bordered">是否显示表格边框</t-checkbox>
    </div>

    <!-- 1. 此处代码有效，勿删！支持语法糖 filter-value.sync ， 支持非受控属性 defaultFilterValue -->
    <!-- 2. 其中，filterIcon 用于自定义筛选图标，支持渲染函数 props.filterIcon，支持插槽 filterIcon。 -->
    <!-- 3. filterRow={() => null}，则不会显示过滤行 -->
    <!-- <t-table
      rowKey='key'
      :columns="columns"
      :data="data"
      :filter-value.sync="filterValue"
      :filterIcon="filterIcon"
    >
      <template #filterRow>自定义过滤行信息</template>
    </t-table> -->

    <!-- 1. v-model:filter-value 等同于 filter-value + filter-change -->
    <!-- 2. :filter-row="null" 用于隐藏过滤结果行 -->
    <!-- 3. <template #filterRow><p>这是自定义的过滤结果行</p></template> ，可使用插槽完全自定义结果行内容-->
    <!-- 4. :attach="getAttach" 统一控制浮层挂载元素 -->
    <!-- 5. 每一列自定义不同筛选图标：
      <template #filterIcon="{ col, colIndex }">
        <div><FilterIcon /> {{ colIndex }}</div>
      </template>
    -->
    <t-table
      row-key="key"
      :columns="columns"
      :data="data"
      :filter-value="filterValue"
      :bordered="bordered"
      lazy-load
      @filter-change="onFilterChange"
    />
  </div>
</template>

<script lang="tsx" setup>
import { isNumber } from 'lodash-es';
import { ref, computed } from 'vue';
import { DateRangePickerPanel, TableProps, ButtonProps, BaseTableCol, FilterValue, InputProps } from 'tdesign-vue-next';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
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
const initData = new Array(5).fill(null).map((_, i) => ({
  key: String(i + 1),
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
const align = ref<BaseTableCol['align']>('left');
const onEmailChange: InputProps['onChange'] = (val, ctx) => {
  console.log(val, ctx);
};
const columns = computed<TableProps['columns']>(() => {
  const columns: TableProps['columns'] = [
    {
      colKey: 'applicant',
      title: '申请人',
      width: 100,
      foot: '-',
    },
    {
      title: () => '申请状态',
      colKey: 'status',
      align: align.value,
      // 单选过滤配置
      filter: {
        // 过滤行中的列标题别名
        // label: '申请状态 A',
        type: 'single',
        list: [
          {
            label: '审批通过',
            value: 0,
          },
          {
            label: '已过期',
            value: 1,
          },
          {
            label: '审批失败',
            value: 2,
          },
        ],
        // confirm to search and hide filter popup
        confirmEvents: ['onChange'],
        // 支持透传全部 Popup 组件属性
        // popupProps: {
        //   attach: () => document.body,
        // },
      },
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
      title: '签署方式',
      colKey: 'channel',
      // 多选过滤配置
      filter: {
        type: 'multiple',
        resetValue: [],
        list: [
          {
            label: 'All',
            checkAll: true,
          },
          {
            label: '电子签署',
            value: '电子签署',
          },
          {
            label: '纸质签署',
            value: '纸质签署',
          },
        ],
        // 是否显示重置取消按钮，一般情况不需要显示
        showConfirmAndReset: true,
      },
    },
    {
      title: '邮箱地址',
      colKey: 'detail.email',
      // 输入框过滤配置
      filter: {
        type: 'input',
        // 文本域搜索
        // component: Textarea,

        resetValue: '',
        // 按下 Enter 键时也触发确认搜索
        confirmEvents: ['onEnter'],
        props: {
          placeholder: '输入关键词过滤',
          onChange: onEmailChange,
        },
        // 是否显示重置取消按钮，一般情况不需要显示
        showConfirmAndReset: true,
      },
    },
    {
      title: '申请时间',
      colKey: 'createTime',
      // 用于查看同时存在排序和过滤时的图标显示是否正常
      sorter: true,
      // 自定义过滤组件：日期过滤配置，请确保自定义组件包含 value 和 onChange 属性
      filter: {
        component: DateRangePickerPanel,
        props: {
          firstDayOfWeek: 7,
        },
        style: {
          fontSize: '14px',
        },
        classNames: 'custom-class-name',
        attrs: {
          'data-type': 'date-range-picker',
        },
        // 是否显示重置取消按钮，一般情况不需要显示
        showConfirmAndReset: true,
        // 日期范围是一个组件，重置时需赋值为 []
        resetValue: [],
      },
    },
  ];
  return columns;
});
const filterValue = ref<TableProps['filterValue']>({
  channel: [],
});
const data = ref<TableProps['data']>([...initData]);
const bordered = ref(true);
const request = (filters: FilterValue) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    const newData = initData.filter((item) => {
      let result = true;
      if (isNumber(filters.status)) {
        result = item.status === filters.status;
      }
      if (result && filters.channel && filters.channel.length) {
        result = filters.channel.includes(item.channel);
      }
      if (result && filters.email) {
        result = item.detail.email.indexOf(filters.email) !== -1;
      }
      if (result && filters.createTime && filters.createTime.length) {
        result = item.createTime === filters.createTime;
      }
      return result;
    });
    data.value = newData;
  }, 100);
};
const onFilterChange: TableProps['onFilterChange'] = (filters, ctx) => {
  console.log('filter-change', filters, ctx);
  filterValue.value = {
    ...filters,
    createTime: filters.createTime || [],
    channel: filters.channel || [],
  };
  console.log(filters);
  request(filters);
};
const setFilters: ButtonProps['onClick'] = () => {
  filterValue.value = {};
  data.value = [...initData];
};

// const getAttach = () => document.body;
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
