<template>
  <t-space direction="vertical">
    <t-space>
      <span>选中节点:</span>
      <t-input-adornment prepend="checked:">
        <t-input :value="allChecked" />
      </t-input-adornment>
    </t-space>
    <t-space>
      <span>展开节点:</span>
      <t-input-adornment prepend="expanded:">
        <t-input :value="allExpanded" />
      </t-input-adornment>
    </t-space>
    <t-space>
      <span>高亮节点:</span>
      <t-input-adornment prepend="actived:">
        <t-input :value="allActived" />
      </t-input-adornment>
    </t-space>
    <t-space>
      <span>可选:</span>
      <t-switch v-model="checkable" />
    </t-space>
    <t-space>
      <span>节点可高亮: </span>
      <t-switch v-model="activable" />
    </t-space>
    <t-space>
      <span>受控同步节点:</span>
      <t-switch v-model="syncProps" />
    </t-space>
    <t-space>
      <t-button theme="primary" variant="outline" @click="selectNode">选中节点 1.1</t-button>
      <t-button theme="primary" variant="outline" @click="activeNode">激活节点 2</t-button>
      <t-button theme="primary" variant="outline" @click="expandNode">展开节点 1.2</t-button>
    </t-space>
    <t-tree
      :data="items"
      :activable="activable"
      :checkable="checkable"
      :expand-on-click-node="false"
      :active-multiple="false"
      :expanded="expanded"
      :actived="actived"
      :value="checked"
      :value-mode="valueMode"
      @expand="onExpand"
      @change="onChange"
      @active="onActive"
      @click="onClick"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import { TreeProps, InputProps, ButtonProps } from 'tdesign-vue-next';
const syncProps = ref(false);
const checkable = ref(true);
const activable = ref(false);
const valueMode = ref<TreeProps['valueMode']>('onlyLeaf');
const checked = ref<TreeProps['value']>(['1.2.1', '1.2.2']);
const expanded = ref<TreeProps['expanded']>(['1', '1.1']);
const actived = ref<TreeProps['actived']>([]);
const items = ref<TreeProps['data']>([
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '1.1',
        label: '1.1',
        children: [
          {
            value: '1.1.1',
            label: '1.1.1',
          },
          {
            value: '1.1.2',
            label: '1.1.2',
          },
        ],
      },
      {
        value: '1.2',
        label: '1.2',
        children: [
          {
            value: '1.2.1',
            label: '1.2.1',
          },
          {
            value: '1.2.2',
            label: '1.2.2',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: '2',
    checkable: false,
    children: [
      {
        value: '2.1',
        label: '2.1 这个节点不允许选中',
      },
      {
        value: '2.2',
        label: '2.2 这个节点不允许激活',
        checkable: false,
      },
      {
        value: '2.3',
        label: '2.3 这个节点不允许展开',
        checkable: false,
        children: [
          {
            value: '2.3.1',
            label: '2.3.1',
            checkable: false,
          },
          {
            value: '2.3.2',
            label: '2.3.2',
            checkable: false,
          },
        ],
      },
    ],
  },
]);
const allChecked = computed<InputProps['value']>(() => {
  let arr: TreeProps['value'] = [];
  if (Array.isArray(checked.value)) {
    arr = checked.value;
  }
  return arr.join(', ');
});
const allExpanded = computed<InputProps['value']>(() => {
  let arr: TreeProps['value'] = [];
  if (Array.isArray(expanded.value)) {
    arr = expanded.value;
  }
  return arr.join(', ');
});
const allActived = computed<InputProps['value']>(() => {
  let arr: TreeProps['value'] = [];
  if (Array.isArray(actived.value)) {
    arr = actived.value;
  }
  return arr.join(', ');
});
const selectNode: ButtonProps['onClick'] = () => {
  checked.value = ['1.1'];
};
const activeNode: ButtonProps['onClick'] = () => {
  actived.value = ['2'];
};
const expandNode: ButtonProps['onClick'] = () => {
  expanded.value = ['1', '1.2'];
};
const onClick: TreeProps['onClick'] = (context) => {
  console.info('onClick context:', context);
};
const onChange: TreeProps['onChange'] = (vals, context) => {
  console.info('onChange value:', vals, 'context:', context);
  const { node } = context;
  // onChange 事件发生时，context.node 状态预先发生变更，此时拿到预先变更的节点状态
  console.info(node.value, 'context.node.checked:', node.checked);
  if (syncProps.value) {
    const tmpChecked = vals.filter((val) => {
      if (val === '2.1') {
        console.info('节点 2.1 不允许选中');
        return false;
      }
      return true;
    });
    // 受控状态下, tree 的 props.value 可被修改为预期的值
    console.log('before set this.checked, expect checked:', checked);
    checked.value = tmpChecked;
  }
  // 赋值变更后的选中态之后，nextTick 之后触发视图更新
  // node.checked 状态发生变更，符合 tree 的 props.value 的取值
  nextTick(() => {
    console.info(node.value, 'nextTick context.node.checked:', node.checked);
  });
};
const onActive: TreeProps['onActive'] = (vals, context) => {
  console.info('onActive actived:', vals, 'context:', context);
  const { node } = context;
  console.info(node.value, 'context.node.actived:', node.actived);
  const filterActived: TreeProps['actived'] = vals.filter((val) => {
    if (val === '2.2') {
      console.info('节点 2.2 不允许激活');
      return false;
    }
    return true;
  });
  if (syncProps.value) {
    actived.value = filterActived;
  }
};
const onExpand: TreeProps['onExpand'] = (vals, context) => {
  console.info('onExpand expanded:', vals, 'context:', context);
  const { node } = context;
  console.info(node.value, 'context.node.expanded:', node.expanded);
  const filterExpanded: TreeProps['expanded'] = vals.filter((val) => {
    if (val === '2.3') {
      console.info('节点 2.3 不允许展开');
      return false;
    }
    return true;
  });
  if (syncProps.value) {
    expanded.value = filterExpanded;
  }
};
</script>
