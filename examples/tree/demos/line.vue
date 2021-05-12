<template>
  <div class="tdesign-tree-line">
    <div class="operations">
      <t-button :variant="showLine ? 'base' : 'outline'"  @click="toggleLine">显示连线</t-button>
      <t-button :variant="showIcon ? 'base' : 'outline'"  @click="toggleIcon">显示图标</t-button>
    </div>
    <t-tree
      :data="items"
      :line="showLine"
      :icon="showIcon"
      expand-all
    />
    <h3>render</h3>
    <t-tree
      :data="items"
      :icon="showIcon"
      expand-all
      :line="renderLine"
    />
    <h3>scope slot</h3>
    <t-tree
      :data="items"
      :icon="showIcon"
      line
      expand-all
    >
      <template #line="{node}">
        <div v-if="showLine" :class="lineClass(node)">
          <div class="custom-line-box">
            <span
              v-for="(item, index) in getLineNodes(node)"
              :key="index"
              :class="{'custom-line-cross': item.cross}"
            ></span>
          </div>
          <i class="custom-line-icon" v-if="node.isLeaf()">
            <t-icon name="heart-filled"/>
          </i>
        </div>
      </template>
    </t-tree>
  </div>
</template>

<script>
import TIcon from '@/src/icon/svg';

export default {
  components: { TIcon },
  data() {
    return {
      showLine: true,
      showIcon: true,
      items: [{
        value: '1',
        label: '1',
        children: [{
          value: '1.1',
          label: '1.1',
        }, {
          value: '1.2',
          label: '1.2',
        }],
      }, {
        value: '2',
        label: '2',
        children: [{
          value: '2.1',
          label: '2.1',
          children: [{
            value: '2.1.1',
            label: '2.1.1',
            children: [{
              value: '2.1.1.1',
              label: '2.1.1.1',
              children: [{
                value: '2.1.1.1.1',
                label: '2.1.1.1.1',
              }, {
                value: '2.1.1.1.2',
                label: '2.1.1.1.2',
              }],
            }],
          }, {
            value: '2.1.2',
            label: '2.1.2',
          }],
        }, {
          value: '2.2',
          label: '2.2',
        }],
      }, {
        value: '3',
        label: '3',
        children: [{
          value: '3.1',
          label: '3.1',
        }, {
          value: '3.2',
          label: '3.2',
        }],
      }, {
        value: '4',
        label: '4',
      }],
    };
  },
  methods: {
    toggleLine() {
      this.showLine = !this.showLine;
    },
    toggleIcon() {
      this.showIcon = !this.showIcon;
    },
    getLineNodes(node) {
      const nodes = node.getParents().reverse();
      const lineNodes = [];
      nodes.forEach((item, index) => {
        const line = {};
        const nextItem = nodes[index + 1];
        if (index < nodes.length - 1 && nextItem) {
          line.cross = !nextItem.isLast();
        }
        lineNodes.push(line);
      });
      return lineNodes;
    },
    lineClass(node) {
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
    },
    renderLine(createElement, node) {
      if (!this.showLine) return null;

      const lineChildren = [];

      const lines = this.getLineNodes(node)
        .map(item => createElement('span', {
          class: {
            'custom-line-cross': item.cross,
          },
        }));

      lineChildren.push(createElement('div', {
        class: 'custom-line-box',
      }, lines));

      if (node.isLeaf()) {
        const tIcon = createElement('t-icon', {
          props: {
            name: 'heart-filled',
          },
        });
        const iconNode = createElement('i', {
          class: 'custom-line-icon',
        }, [tIcon]);
        lineChildren.push(iconNode);
      }

      return createElement('div', {
        class: this.lineClass(node),
      }, lineChildren);
    },
  },
};
</script>
<style>
.tdesign-tree-line .operations .t-button{
  margin: 0 10px 10px 0;
}
.tdesign-tree-line .custom-line{
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
.tdesign-tree-line .custom-line-box{
  display: flex;
  flex: 0 0 auto;
}
.tdesign-tree-line .custom-line span {
  position: relative;
  flex: 0 0 auto;
  width: 24px;
  height: 40px;
}
.tdesign-tree-line .custom-line span:last-child:before{
  content: '';
  position: absolute;
  display: block;
  bottom: 20px;
  left: 12px;
  width: 12px;
  height: 30px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #0052D9;
}
.tdesign-tree-line .custom-line-leaf span:last-child:before{
  width: 24px;
}
.tdesign-tree-line .custom-line-cross:before{
  content: '';
  display: block;
  position: absolute;
  left: 12px;
  top: -15px;
  height: 44px;
  width: 1px;
  border-left: 1px solid #ddd;
}
.tdesign-tree-line .custom-line-icon{
  position: absolute;
  top: 12px;
  right: -20px;
  display: flex;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border: 1px solid #0052D9;
  background-color: #fff;
  justify-content: center;
  align-items: center;
}
.tdesign-tree-line .custom-line span:last-child:after{
  content: '';
  position: absolute;
  display: block;
  box-sizing: border-box;
  top: 16px;
  left: 8px;
  z-index: 1;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  border: 1px solid #0052D9;
  background-color: #fff;
  transform: rotate(45deg);
  transform-origin: 50%, 50%;
}
</style>
