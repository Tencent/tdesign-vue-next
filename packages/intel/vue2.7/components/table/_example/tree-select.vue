<template>
  <t-space direction="vertical">
    <t-space>
      <t-radio-group v-model="checkStrictly" variant="default-filled">
        <t-radio-button value="true">父子行选中独立</t-radio-button>
        <t-radio-button value="false">
          <t-popup
            content="「父子行选中关联」由于表格数据的特殊性，父节点选中或者取消选中，会影响子节点；但子节点选中或取消不影响父元素"
          >
            父子行选中关联
          </t-popup>
        </t-radio-button>
      </t-radio-group>

      <t-button theme="default" @click="getTreeExpandedRow">获取树形结构展开的节点</t-button>
      <t-button theme="default" @click="scrollToElement">滚动到指定元素</t-button>
    </t-space>
    <!-- 子节点字段不是 children，而是 childrenList -->
    <!-- expandedRow 和 expanded-row-keys 控制是否显示展开收起行，以及哪些行展开 -->
    <!-- !!! EnhancedTable 才支持，普通 Table 不支持 !!! -->
    <t-enhanced-table
      ref="enhancedTableRef"
      row-key="key"
      :expandedRow="expandedRowRender"
      :expanded-row-keys="expandedRowKeys"
      @expand-change="onExpandChange"
      :columns="columns"
      :data="data"
      :tree="{
        childrenKey: 'childrenList',
        checkStrictly: checkStrictly === 'true' ? true : false,
        // 第 3 列显示树形结构展开节点
        treeNodeColumnIndex: 2,
        expandTreeNodeOnClick: true,
      }"
      :height="300"
      :scroll="{ type: 'virtual', rowHeight: 49, bufferSize: 10 }"
      :selected-row-keys="selectedRowKeys"
      lazyLoad
      @select-change="rehandleSelectChange"
      @row-click="onRowClick"
    ></t-enhanced-table>
  </t-space>
</template>

<script lang="jsx">
import { EnhancedTable, MessagePlugin } from 'tdesign-vue';
import { cloneDeep } from 'lodash-es';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';

const initialData = [];
for (let i = 0; i < 500; i++) {
  const obj = {
    key: `first_level_${i}`,
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 3, 1, 4][i % 4],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
  };
  obj.childrenList = new Array(5).fill(null).map((t, j) => {
    const secondIndex = 100 * j + (i + 1) * 10;
    const secondObj = {
      ...obj,
      status: secondIndex % 3,
      key: `second_level_${secondIndex}`,
      applicant: ['贾明', '张三', '王芳'][secondIndex % 3],
    };
    secondObj.childrenList = new Array(5).fill(null).map((m, n) => {
      const thirdIndex = secondIndex * 1000 + 100 * m + (n + 1) * 10;
      return {
        ...obj,
        status: thirdIndex % 3,
        key: `third_level_${thirdIndex}`,
        applicant: ['贾明', '张三', '王芳'][thirdIndex % 3],
      };
    });
    return secondObj;
  });
  initialData.push(obj);
}

export default {
  components: { TEnhancedTable: EnhancedTable },

  data() {
    return {
      checkStrictly: 'true',
      selectedRowKeys: [],
      expandedRowKeys: [],
      columns: [
        {
          colKey: 'row-select',
          type: 'multiple',
          // 禁用行选中方式一：使用 disabled 禁用行（示例代码有效，勿删）。disabled 参数：{row: RowData; rowIndex: number })
          // 这种方式禁用行选中，当前行会添加行类名 t-table__row--disabled，禁用行文字变灰
          // disabled: ({ rowIndex }) => rowIndex === 1 || rowIndex === 3,

          // 禁用行选中方式二：使用 checkProps 禁用行（示例代码有效，勿删）
          // 这种方式禁用行选中，行文本不会变灰
          checkProps: ({ row }) => ({ disabled: !row.childrenList && row.status !== 0 }),
          // 自由调整宽度，如果发现元素看不见，请加大宽度
          width: 50,
        },
        { colKey: 'serial-number', width: 80, title: '编号' },
        { colKey: 'applicant', title: '申请人', width: 120 },
        {
          colKey: 'status',
          title: '状态',
          width: 144,
          cell: (h, { row }) => {
            const statusNameListMap = {
              0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
              1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
              2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
            };
            return (
              <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
                {statusNameListMap[row.status].icon}
                {statusNameListMap[row.status].label}
              </t-tag>
            );
          },
        },
        { colKey: 'matters', title: '申请事项', width: '150' },
        { colKey: 'email', title: '邮箱地址' },
      ],
      data: initialData,
    };
  },

  watch: {
    // 切换模式，重置数据，避免互相影响
    checkStrictly() {
      this.selectedRowKeys = [];
      this.data = cloneDeep(initialData);
    },
  },

  methods: {
    // rehandleClickOp(context) {
    //   console.log(context);
    // },

    rehandleSelectChange(value, { selectedRowData }) {
      this.selectedRowKeys = value;
      console.log(value, selectedRowData);
    },

    expandedRowRender(h, { row }) {
      return <div>这是展开项数据，我是 {row.key} 号</div>;
    },

    onExpandChange(val) {
      this.expandedRowKeys = val;
    },

    getTreeExpandedRow() {
      const treeExpandedRowKeys = this.$refs.enhancedTableRef.getTreeExpandedRow('unique');
      console.log('行唯一标识值：', treeExpandedRowKeys);

      const treeExpandedRow = this.$refs.enhancedTableRef.getTreeExpandedRow('data');
      console.log('行数据：', treeExpandedRow);

      const treeExpandedRowState = this.$refs.enhancedTableRef.getTreeExpandedRow('all');
      console.log('全部行信息：', treeExpandedRowState);

      MessagePlugin.success('获取成功，请打开控制台查看');
    },

    // 虚拟滚动场景：滚动到指定行
    scrollToElement() {
      const { enhancedTableRef } = this.$refs;

      // 方式一：通过行唯一标识跳转到指定行
      enhancedTableRef.scrollToElement({
        // 滚动到指定元素
        key: 'first_level_150',
        // 如果元素没有被展开，则跳转到父元素所在位置
        // key: 'second_level_1510',
        // 滚动元素距离顶部的距离（如表头高度）
        top: 47,
        // 高度动态变化场景下，即 isFixedRowHeight = false。延迟设置元素位置，一般用于依赖不同高度异步渲染等场景，单位：毫秒。（固定高度不需要这个）
        time: 60,
      });

      // 方式二：通过行下标跳转到指定行（示例代码有效：勿删）
      // const treeNodeData = enhancedTableRef.getData('first_level_150');
      // enhancedTableRef.primaryTableRef.scrollToElement({
      //   // 跳转元素下标（第 151 个元素位置）
      //   index: treeNodeData.rowIndex - this.expandedRowKeys.length,
      //   // 滚动元素距离顶部的距离（如表头高度）
      //   top: 47,
      //   // 高度动态变化场景下，即 isFixedRowHeight = false。延迟设置元素位置，一般用于依赖不同高度异步渲染等场景，单位：毫秒。（固定高度不需要这个）
      //   time: 60,
      // });
    },

    onRowClick(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="less">
.t-table-tree-select-demo {
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
      left: 0;
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
}
</style>
