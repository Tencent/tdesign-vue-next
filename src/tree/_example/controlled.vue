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
      <t-button theme="primary" @click="selectNode">选中节点 1.1</t-button>
      <t-button theme="primary" @click="activeNode">激活节点 2</t-button>
      <t-button theme="primary" @click="expandNode">展开节点 1.2</t-button>
    </t-space>
    <t-tree
      :data="items"
      checkable
      activable
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
      console.info('onClick:', context);
      const { node } = context;
      console.info(node.value, 'checked:', node.checked);
      console.info(node.value, 'expanded:', node.expanded);
      console.info(node.value, 'actived:', node.actived);
    },
    onChange(vals, context) {
      console.info('onChange:', vals, context);
      const checked = vals.filter((val) => val !== '2.1');
      console.info('节点 2.1 不允许选中');
      this.checked = checked;
      const { node } = context;
      console.info(node.value, 'checked:', node.checked);
    },
    onActive(vals, context) {
      console.info('onActive:', vals, context);
      const actived = vals.filter((val) => val !== '2.2');
      console.info('节点 2.2 不允许激活', actived);
      this.actived = actived;
      const { node } = context;
      console.info(node.value, 'actived:', node.actived);
    },
    onExpand(vals, context) {
      console.info('onExpand:', vals, context);
      const expanded = vals.filter((val) => val !== '2.3');
      console.info('节点 2.3 不允许展开', expanded);
      this.expanded = expanded;
      const { node } = context;
      console.info(node.value, 'expanded:', node.expanded);
    },
  },
};
</script>
