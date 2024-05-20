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

<script>
export default {
  data() {
    return {
      syncProps: false,
      checkable: true,
      activable: false,
      valueMode: 'onlyLeaf',
      checked: ['1.2.1', '1.2.2'],
      expanded: ['1', '1.1'],
      actived: [],
      items: [
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
      ],
    };
  },
  computed: {
    allChecked() {
      let arr = [];
      if (Array.isArray(this.checked)) {
        arr = this.checked;
      }
      return arr.join(', ');
    },
    allExpanded() {
      let arr = [];
      if (Array.isArray(this.expanded)) {
        arr = this.expanded;
      }
      return arr.join(', ');
    },
    allActived() {
      let arr = [];
      if (Array.isArray(this.actived)) {
        arr = this.actived;
      }
      return arr.join(', ');
    },
  },
  methods: {
    selectNode() {
      this.checked = ['1.1'];
    },
    activeNode() {
      this.actived = ['2'];
    },
    expandNode() {
      this.expanded = ['1', '1.2'];
    },
    onClick(context) {
      console.info('onClick context:', context);
    },
    onChange(vals, context) {
      console.info('onChange value:', vals, 'context:', context);
      const { node } = context;
      // onChange 事件发生时，context.node 状态预先发生变更，此时拿到预先变更的节点状态
      console.info(node.value, 'context.node.checked:', node.checked);
      if (this.syncProps) {
        const tmpChecked = vals.filter((val) => {
          if (val === '2.1') {
            console.info('节点 2.1 不允许选中');
            return false;
          }
          return true;
        });
        // 受控状态下, tree 的 props.value 可被修改为预期的值
        console.log('before set this.checked, expect checked:', tmpChecked);
        this.checked = tmpChecked;
      }
      // 赋值变更后的选中态之后，nextTick 之后触发视图更新
      // node.checked 状态发生变更，符合 tree 的 props.value 的取值
      this.$nextTick(() => {
        console.info(node.value, 'nextTick context.node.checked:', node.checked);
      });
    },
    onActive(vals, context) {
      console.info('onActive actived:', vals, 'context:', context);
      const { node } = context;
      console.info(node.value, 'context.node.actived:', node.actived);
      const actived = vals.filter((val) => {
        if (val === '2.2') {
          console.info('节点 2.2 不允许激活');
          return false;
        }
        return true;
      });
      if (this.syncProps) {
        this.actived = actived;
      }
    },
    onExpand(vals, context) {
      console.info('onExpand expanded:', vals, 'context:', context);
      const { node } = context;
      console.info(node.value, 'context.node.expanded:', node.expanded);
      const expanded = vals.filter((val) => {
        if (val === '2.3') {
          console.info('节点 2.3 不允许展开');
          return false;
        }
        return true;
      });
      if (this.syncProps) {
        this.expanded = expanded;
      }
    },
  },
};
</script>
