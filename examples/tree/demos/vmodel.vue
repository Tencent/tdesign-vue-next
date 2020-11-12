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
      :checkable="true"
      :activable="true"
      :expand-on-click-node="false"
      :active-multiple="false"
      :default-expanded="expanded"
      :default-actived="actived"
      :default-value="checked"
      :value-mode="valueMode"
      @expand="onExpand"
      @change="onChange"
      @active="onActive"
      @click="onClick"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueMode: 'all',
      checked: ['1.1.1.1', '1.1.1.2'],
      expanded: ['1', '2'],
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
    onChange(state) {
      console.log('on change:', state);
      this.checked = state;
    },
    onExpand(state) {
      console.log('on expand:', state);
      this.expanded = state;
    },
    onActive(state) {
      console.log('on active:', state);
      this.actived = state;
    },
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>
