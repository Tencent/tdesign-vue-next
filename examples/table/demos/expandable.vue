<template>
  <div class="tdesign-demo-block-column">
    <!-- expanded-row-keys 为受控属性 -->
    <!-- default-expanded-row-keys 为非受控属性 -->
    <div>
      <t-radio-group
        v-model="expandControl"
        variant="default-filled"
      >
        <t-radio-button value="true">
          显示展开图标
        </t-radio-button>
        <t-radio-button value="false">
          隐藏展开图标
        </t-radio-button>
        <t-radio-button value="custom">
          自由控制展开图标
        </t-radio-button>
      </t-radio-group>
    </div>

    <div>
      允许点击行之后展开/收起: <t-switch v-model="expandOnRowClick" /> <br>
    </div>

    <t-table
      row-key="id"
      :columns="columns"
      :data="data"
      :expanded-row-keys="expandedRowKeys"
      :expanded-row="expandedRow"
      :expand-icon="expandIcon"
      :expand-on-row-click="expandOnRowClick"
      @expand-change="rehandleExpandChange"
    >
      <template #status="{ row }">
        <p
          v-if="row.status === 0"
          class="status"
        >
          健康
        </p>
        <p
          v-if="row.status === 1"
          class="status unhealth"
        >
          异常
        </p>
      </template>
      <template #op-column>
        <p>操作</p>
      </template>
      <template #op="slotProps">
        <a
          class="link"
          @click="rehandleClickOp(slotProps)"
        >管理</a>
        <a
          class="link"
          @click="rehandleClickOp(slotProps)"
        >删除</a>
      </template>
    </t-table>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref, watch } from 'vue';

import TIconChevronDownCircle from '@tencent/tdesign-vue-next/icon/chevron-down-circle';
import TIconChevronDown from '@tencent/tdesign-vue-next/icon/chevron-down';

const columns = [
  { colKey: 'instance', title: '集群名称', width: 150 },
  {
    colKey: 'status', title: '状态', width: 100, cell: 'status',
  },
  { colKey: 'owner', title: '管理员' },
  { colKey: 'description', title: '描述' },
  {
    colKey: 'op', width: 200, title: 'op-column', cell: 'op',
  },
];

const data = [
  {
    id: 1, instance: 'JQTest1', status: 0, owner: 'jenny;peter', description: 'test',
  },
  {
    id: '2', instance: 'JQTest2', status: 1, owner: 'jenny', description: 'test',
  },
  {
    id: 3, instance: 'JQTest3', status: 0, owner: 'jenny', description: 'test',
  },
  {
    id: 4, instance: 'JQTest4', status: 1, owner: 'peter', description: 'test',
  },
];

export default defineComponent({
  setup() {
    const expandControl = ref('true');
    const expandIcon = ref(true);
    const expandOnRowClick = ref(true);
    const expandedRowKeys = ref(['2']);

    const expandedRow = (h, { row }) => {
      <div class="more-detail">
        <p class="title"><b>集群名称:</b></p><p class="content">{row.instance}</p><br/>
        <p class="title"><b>管理员:</b></p><p class="content">{row.owner}</p><br/>
        <p class="title"><b>描述:</b></p><p class="content">{row.description}</p>
      </div>;
    };

    watch(() => expandControl.value, (val) => {
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
          if (row.id === 3) return <TIconChevronDown />;
          // 其他行，使用表格同款展开图标
          return <TIconChevronDownCircle />;
        };
      }
    });

    const rehandleClickOp = ({ text, row }) => {
      console.log(text, row);
    };

    const rehandleExpandChange = (value, { expandedRowData }) => {
      expandedRowKeys.value = value;
      console.log('rehandleExpandChange', value, expandedRowData);
    };

    return {
      columns,
      data,
      expandControl,
      expandIcon,
      expandOnRowClick,
      expandedRowKeys,
      expandedRow,
      rehandleClickOp,
      rehandleExpandChange,
    };
  },
});
</script>

<style lang="less" scoped>
@import '@common/style/web/_variables.less';
:deep([class*='t-table-expandable-icon-cell']) .t-icon {
  background-color: transparent;
}
.link {
  cursor: pointer;
  margin-right: 15px;
}
.status {
  position: relative;
  color: @success-color;
  margin-left: 10px;
  &::before {
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    content: '';
    background-color: @success-color;
    width: 6px;
    height: 6px;
    margin-left: -10px;
    border-radius: 50%;
  }
}
.status.unhealth {
  color: @error-color;
  &::before {
    background-color: @error-color;
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
