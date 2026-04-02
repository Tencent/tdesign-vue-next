<template>
  <t-space :size="32" direction="vertical">
    <t-space direction="vertical">
      <t-space>
        <span>显示连线:</span>
        <t-switch v-model="showLine" />
      </t-space>
      <t-space>
        <span>显示图标:</span>
        <t-switch v-model="showIcon" />
      </t-space>
    </t-space>
    <t-space direction="vertical">
      <h3>默认样式</h3>
      <t-tree :data="items" :line="showLine" :icon="showIcon" expand-all />
    </t-space>
    <t-space direction="vertical" class="tdesign-tree-line">
      <h3>使用属性结合 jsx 来自定义呈现</h3>
      <t-tree :data="items" :icon="showIcon" expand-all :line="renderLine" />
    </t-space>
    <t-space direction="vertical" class="tdesign-tree-line">
      <h3>slot 形式</h3>
      <t-tree :data="items" :icon="showIcon" line expand-all>
        <template #line="{ node }">
          <div v-if="showLine" :class="lineClass(node)">
            <div class="custom-line-box">
              <span
                v-for="(item, index) in getLineNodes(node)"
                :key="index"
                :class="{ 'custom-line-cross': item.cross }"
              ></span>
            </div>
            <i v-if="node.isLeaf()" class="custom-line-icon">
              <icon name="heart-filled" />
            </i>
          </div>
        </template>
      </t-tree>
    </t-space>
  </t-space>
</template>

<script lang="tsx" setup>
import { TypeCreateElement } from '../adapt';
import { ref } from 'vue';
import { TreeProps, TypeTreeNodeModel } from 'tdesign-vue-next';
import { Icon } from 'tdesign-icons-vue-next';
const showLine = ref<TreeProps['line']>(true);
const showIcon = ref<TreeProps['icon']>(true);
const items = ref<TreeProps['data']>([
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '1.1',
        label: '1.1',
      },
      {
        value: '1.2',
        label: '1.2',
      },
    ],
  },
  {
    value: '2',
    label: '2',
    children: [
      {
        value: '2.1',
        label: '2.1',
        children: [
          {
            value: '2.1.1',
            label: '2.1.1',
            children: [
              {
                value: '2.1.1.1',
                label: '2.1.1.1',
                children: [
                  {
                    value: '2.1.1.1.1',
                    label: '2.1.1.1.1',
                  },
                  {
                    value: '2.1.1.1.2',
                    label: '2.1.1.1.2',
                  },
                ],
              },
            ],
          },
          {
            value: '2.1.2',
            label: '2.1.2',
          },
        ],
      },
      {
        value: '2.2',
        label: '2.2',
      },
    ],
  },
  {
    value: '3',
    label: '3',
    children: [
      {
        value: '3.1',
        label: '3.1',
      },
      {
        value: '3.2',
        label: '3.2',
      },
    ],
  },
  {
    value: '4',
    label: '4',
  },
]);
type lineNodes = {
  cross?: boolean;
};
const getLineNodes = (node: TypeTreeNodeModel) => {
  const nodes = node.getParents().reverse();
  const lineNodes: lineNodes[] = [];
  nodes.forEach((item, index) => {
    const line: lineNodes = {};
    const nextItem = nodes[index + 1];
    if (index < nodes.length - 1 && nextItem) {
      line.cross = !nextItem.isLast();
    }
    lineNodes.push(line);
  });
  return lineNodes;
};
const lineClass = (node: TypeTreeNodeModel) => {
  const list = ['custom-line'];
  if (node.isFirst()) {
    list.push('custom-line-first');
  }
  if (node.isLeaf()) {
    list.push('custom-line-leaf');
  }
  if (node.isLast()) {
    list.push('custom-line-last');
  }
  return list;
};
const renderLine = (h: TypeCreateElement, node: TypeTreeNodeModel) => {
  if (!showLine.value) return null;
  const lineChildren = [];
  const lines = getLineNodes(node).map((item) =>
    h('span', {
      class: {
        'custom-line-cross': item.cross,
      },
    }),
  );
  lineChildren.push(
    h(
      'div',
      {
        class: 'custom-line-box',
      },
      lines,
    ),
  );
  if (node.isLeaf()) {
    const tIcon = <Icon name="heart-filled" />;
    const iconNode = h(
      'i',
      {
        class: 'custom-line-icon',
      },
      [tIcon],
    );
    lineChildren.push(iconNode);
  }
  return h(
    'div',
    {
      class: lineClass(node),
    },
    lineChildren,
  );
};
</script>
<style scoped>
.tdesign-tree-line .custom-line {
  display: flex;
  position: absolute;
  top: 2px;
  left: 9px;
}
.tdesign-tree-line .custom-line-box {
  display: flex;
  flex: 0 0 auto;
}
.tdesign-tree-line .custom-line span {
  position: relative;
  flex: 0 0 auto;
  width: 24px;
  height: 40px;
}
.tdesign-tree-line .custom-line span:last-child:before {
  content: '';
  position: absolute;
  display: block;
  bottom: 22px;
  left: 6px;
  width: 12px;
  height: 26px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #0052d9;
}
.tdesign-tree-line .custom-line-leaf span:last-child:before {
  width: 16px;
}
.tdesign-tree-line .custom-line-cross:before {
  content: '';
  display: block;
  position: absolute;
  left: 6px;
  top: -15px;
  height: 44px;
  width: 1px;
  border-left: 1px solid #ddd;
}
.tdesign-tree-line .custom-line-icon {
  position: absolute;
  top: 10px;
  right: -14px;
  display: flex;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border: 1px solid #0052d9;
  background-color: #fff;
  justify-content: center;
  align-items: center;
}
.tdesign-tree-line .custom-line span:last-child:after {
  content: '';
  position: absolute;
  display: block;
  box-sizing: border-box;
  top: 14px;
  left: 3px;
  z-index: 1;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  border: 1px solid #0052d9;
  background-color: #fff;
  transform: rotate(45deg);
  transform-origin: 50% 50%;
}
</style>
