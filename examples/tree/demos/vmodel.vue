<template>
  <div class="tdesign-tree-base">
    <t-addon prepend="checked:">
      <t-input :value="allChecked"/>
    </t-addon>
    <t-addon prepend="expanded:">
      <t-input :value="allExpanded"/>
    </t-addon>
    <t-addon prepend="actived:">
      <t-input :value="allActived"/>
    </t-addon>
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
      @update="onUpdate"
      @click="onClick"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueMode: 'onlyLeaf',
      checked: ['1.1.1.1', '1.1.1.2'],
      expanded: ['1', '1.1', '1.1.1', '2'],
      actived: ['2'],
      items: [{
        value: '1',
        label: '1',
        children: [{
          value: '1.1',
          label: '1.1',
          children: [{
            value: '1.1.1',
            label: '1.1.1',
            children: [{
              value: '1.1.1.1',
              label: '1.1.1.1',
            }, {
              value: '1.1.1.2',
              label: '1.1.1.2',
            }],
          }, {
            value: '1.1.2',
            label: '1.1.2',
            children: [{
              value: '1.1.2.1',
              label: '1.1.2.1',
            }, {
              value: '1.1.2.2',
              label: '1.1.2.2',
            }],
          }],
        }, {
          value: '1.2',
          label: '1.2',
          children: [{
            value: '1.2.1',
            label: '1.2.1',
            children: [{
              value: '1.2.1.1',
              label: '1.2.1.1',
            }, {
              value: '1.2.1.2',
              label: '1.2.1.2',
            }],
          }, {
            value: '1.2.2',
            label: '1.2.2',
            children: [{
              value: '1.2.2.1',
              label: '1.2.2.1',
            }, {
              value: '1.2.2.2',
              label: '1.2.2.2',
            }],
          }],
        }],
      }, {
        value: '2',
        label: '2',
        checkable: false,
        children: [{
          value: '2.1',
          label: '2.1',
          checkable: false,
        }, {
          value: '2.2',
          label: '2.2',
          checkable: false,
        }],
      }],
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
    onClick(state) {
      console.log('on click:', state);
    },
    onChange(vals, state) {
      console.log('on change:', vals, state);
      const checked = vals.filter(val => (val !== '2.1'));
      console.log('节点 2.1 不允许选中');
      this.checked = checked;
    },
    onExpand(vals, state) {
      console.log('on expand:', vals, state);
      const expanded = vals.filter(val => (val !== '2'));
      console.log('节点 2 不允许展开');
      this.expanded = expanded;
    },
    onActive(vals, state) {
      console.log('on active:', vals, state);
      const actived = vals.filter(val => (val !== '2'));
      console.log('节点 2 不允许激活');
      this.actived = actived;
    },
    onUpdate(state) {
      console.log('on update:', state);
    },
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>
