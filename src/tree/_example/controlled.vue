<template>
  <t-space :size="32" direction="vertical" class="tdesign-tree-demo">
    <t-space :size="10" direction="vertical">
      <t-form label-align="left" :label-width="80">
        <t-form-item>
          <template #label>选中节点</template>
          <t-input-adornment prepend="checked:">
            <t-input :value="allChecked" />
          </t-input-adornment>
        </t-form-item>
        <t-form-item>
          <template #label>展开节点</template>
          <t-input-adornment prepend="expanded:">
            <t-input :value="allExpanded" />
          </t-input-adornment>
        </t-form-item>
        <t-form-item>
          <template #label>高亮节点</template>
          <t-input-adornment prepend="actived:">
            <t-input :value="allActived" />
          </t-input-adornment>
        </t-form-item>
      </t-form>
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
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      valueMode: 'onlyLeaf',
      checked: ['1.1.1.1', '1.1.1.2'],
      expanded: ['1', '1.1', '1.1.1', '2'],
      actived: ['2'],
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
                  children: [
                    {
                      value: '1.1.1.1',
                      label: '1.1.1.1',
                    },
                    {
                      value: '1.1.1.2',
                      label: '1.1.1.2',
                    },
                  ],
                },
                {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [
                    {
                      value: '1.1.2.1',
                      label: '1.1.2.1',
                    },
                    {
                      value: '1.1.2.2',
                      label: '1.1.2.2',
                    },
                  ],
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
                  children: [
                    {
                      value: '1.2.1.1',
                      label: '1.2.1.1',
                    },
                    {
                      value: '1.2.1.2',
                      label: '1.2.1.2',
                    },
                  ],
                },
                {
                  value: '1.2.2',
                  label: '1.2.2',
                  children: [
                    {
                      value: '1.2.2.1',
                      label: '1.2.2.1',
                    },
                    {
                      value: '1.2.2.2',
                      label: '1.2.2.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2 这个节点不允许展开, 不允许激活',
          checkable: false,
          children: [
            {
              value: '2.1',
              label: '2.1 这个节点不允许选中',
              checkable: false,
            },
            {
              value: '2.2',
              label: '2.2',
              checkable: false,
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
    onExpand(vals, context) {
      console.info('onExpand:', vals, context);
      const expanded = vals.filter((val) => val !== '2');
      console.info('节点 2 不允许展开');
      this.expanded = expanded;
      const { node } = context;
      console.info(node.value, 'expanded:', node.expanded);
    },
    onActive(vals, context) {
      console.info('onActive:', vals, context);
      const actived = vals.filter((val) => val !== '2');
      console.info('节点 2 不允许激活');
      this.actived = actived;
      const { node } = context;
      console.info(node.value, 'actived:', node.actived);
    },
  },
};
</script>
