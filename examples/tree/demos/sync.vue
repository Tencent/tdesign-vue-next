<template>
  <div class="tdesign-tree-base">
    <t-addon prepend="checked:">
      <t-input :value="allChecked" @input="onAllCheckedInput"/>
    </t-addon>
    <t-addon prepend="expanded:">
      <t-input :value="allExpanded" @input="onAllExpandedInput"/>
    </t-addon>
    <t-addon prepend="actived:">
      <t-input :value="allActived" @input="onAllActivedInput"/>
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
      return arr.map((val) => `{${val}}`).join(', ');
    },
    allExpanded() {
      let arr = [];
      if (Array.isArray(this.expanded)) {
        arr = this.expanded;
      }
      return arr.map((val) => `{${val}}`).join(', ');
    },
    allActived() {
      let arr = [];
      if (Array.isArray(this.actived)) {
        arr = this.actived;
      }
      return arr.map((val) => `{${val}}`).join(', ');
    },
  },
  methods: {
    getValueFromString(val) {
      const arr = val.split(',');
      const vals = [];
      arr.map((str) => str.trim()).forEach((tag) => {
        const match = (/^\{([^{}]+)\}$/).exec(tag);
        if (match && match[1]) {
          vals.push(match[1]);
        }
      });
      return vals;
    },
    onAllCheckedInput(val) {
      console.log('checked input on change', val);
      const vals = this.getValueFromString(val);
      this.checked = vals;
    },
    onAllExpandedInput(val) {
      console.log('expanded input on change', val);
      const vals = this.getValueFromString(val);
      this.expanded = vals;
    },
    onAllActivedInput(val) {
      console.log('actived input on change', val);
      const vals = this.getValueFromString(val);
      this.actived = vals;
    },
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>
