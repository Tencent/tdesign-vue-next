<template>
  <t-form class="tdesign-demo-block-column tdesign-demo__table">
    <!-- 是否显示表格边框 和 对齐方式都决定着 排序图标 和 筛选图标的排列位置 -->
    <div>
      <t-radio-group v-model="align" variant="default-filled">
        <t-radio-button value="left">左对齐</t-radio-button>
        <t-radio-button value="center">居中对齐</t-radio-button>
        <t-radio-button value="right">右对齐</t-radio-button>
      </t-radio-group>
      <t-button @click="setFilters" variant="text" style="margin-left: 36px">清除筛选条件</t-button>
      <span style="padding-left: 36px">已选筛选条件：{{ filterValue }}</span>
    </div>
    <div>
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

    <!-- 1. v-model:sync 等同于 filter-value + filter-change -->
    <!-- 2. :filter-row="() => null" 用于隐藏过滤结果行 -->
    <!-- 3. <template #filterRow><p>这是自定义的过滤结果行</p></template> ，可使用插槽完全自定义结果行内容-->
    <!-- 4. :attach="getAttach" 统一控制浮层挂载元素 -->
    <!-- 5. 每一列自定义不同筛选图标：
      <template #filterIcon="{ col, colIndex }">
        <div><FilterIcon /> {{ colIndex }}</div>
      </template>
    -->
    <t-table
      rowKey="key"
      :columns="columns"
      :data="data"
      :filter-value="filterValue"
      :bordered="bordered"
      table-layout="fixed"
      resizable
      lazyLoad
      @filter-change="onFilterChange"
      @change="onChange"
    ></t-table>
  </t-form>
</template>

<script lang="jsx">
import {
  DateRangePickerPanel,
  // Textarea,
} from 'tdesign-vue';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';
import isNumber from 'lodash/isNumber';

const initialData = new Array(5).fill(null).map((_, i) => ({
  key: String(i + 1),
  applicant: ['贾明', '张三', '王芳'][i % 3],
  status: (i % 3) + 1,
  channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
  detail: {
    email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
  },
  matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
  time: [2, 3, 1, 4][i % 4],
  createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
}));

export default {
  data() {
    return {
      data: initialData,
      filterValue: {
        createTime: [],
      },
      bordered: true,
      align: 'left',
    };
  },

  computed: {
    columns() {
      return [
        {
          colKey: 'applicant',
          title: '申请人',
          width: 100,
          foot: '-',
        },
        {
          title: () => '申请状态',
          colKey: 'status',
          align: this.align,
          // 单选过滤配置
          filter: {
            // 当 title 字段使用复杂的函数或插槽动态定义时，筛选结果又只需显示简单的文本时，可以使用 filter.label
            // label: '申请状态',
            type: 'single',
            list: [
              { label: '审批通过', value: 1 },
              { label: '已过期', value: 2 },
              { label: '审批失败', value: 3 },
            ],
            // you can also set listFilterConfig to be `true`
            listFilterConfig: {
              props: { placeholder: 'Search' },
              style: { width: '120px' },
              // className: '',
              // slots: {},
              // filterMethod: (option, keyword) => option.label.includes(keyword),
            },
            // confirm to search and hide filter popup
            confirmEvents: ['onChange'],
            // 支持透传全部 Popup 组件属性
            popupProps: {
              overlayInnerClassName: 't-table__list-filter-input--sticky',
              // overlayInnerStyle: { maxHeight: '280px', overflow: 'auto' },
              // attach: () => document.body,
            },
          },
          cell: (h, { row }) => {
            const statusNameListMap = {
              1: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
              2: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
              3: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
            };
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
              { label: 'Check All', checkAll: true },
              { label: '电子签署', value: '电子签署' },
              { label: '纸质签署', value: '纸质签署' },
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
              onChange: this.oneEmailChange,
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
            attrs: {
              'data-id': 'attribute-id-value',
            },
            classNames: 'custom-class-name',
            styles: { fontSize: '14px' },
            // 是否显示重置取消按钮，一般情况不需要显示
            showConfirmAndReset: true,
            // 日期范围是一个组件，重置时需赋值为 []
            resetValue: [],
          },
        },
      ];
    },
  },

  methods: {
    // filters 参数包含自定义过滤组件 日期选择器 的值
    onFilterChange(filters, ctx) {
      console.log('filter-change', filters, ctx);
      // 保证日期是一个数组
      this.filterValue = filters;
      // 模拟异步请求进行数据过滤
      this.request(this.filterValue);
    },
    // 筛选、分页、排序等功能发生变化时，均会出发 change 事件
    onChange(info, context) {
      console.log('change', info, context, '筛选、分页、排序等功能发生变化均会触发');
    },
    setFilters() {
      this.filterValue = {};
      this.data = initialData;
    },
    // filterIcon(h) {
    //   console.log(h);
    //   return <i>icon</i>;
    // },
    oneEmailChange(val, ctx) {
      console.log(val, ctx);
    },
    // // 统一配置筛选、省略等浮层绑定的位置
    // getAttach() {
    //   return document.body;
    // },
    request(filters) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.data = initialData.filter((item) => {
          let result = true;
          if (isNumber(filters.status)) {
            result = item.status === filters.status;
          }
          if (result && filters.channel && filters.channel.length) {
            result = filters.channel.includes(item.channel);
          }
          if (result && filters.email) {
            result = item.email.indexOf(filters.email) !== -1;
          }
          if (result && filters.createTime && filters.createTime.length) {
            result = item.createTime === filters.createTime;
          }
          return result;
        });
      }, 100);
    },
  },
};
</script>
