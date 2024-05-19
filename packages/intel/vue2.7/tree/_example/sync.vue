<template>
  <t-space direction="vertical">
    <t-space>
      <t-input-adornment prepend="checked:">
        <t-input :value="allChecked" @change="onAllCheckedInput" />
      </t-input-adornment>
    </t-space>
    <t-space>
      <t-input-adornment prepend="expanded:">
        <t-input :value="allExpanded" @change="onAllExpandedInput" />
      </t-input-adornment>
    </t-space>
    <t-space>
      <t-input-adornment prepend="actived:">
        <t-input :value="allActived" @change="onAllActivedInput" />
      </t-input-adornment>
    </t-space>
    <t-tree
      v-model="checked"
      :expanded.sync="expanded"
      :actived.sync="actived"
      :data="items"
      checkable
      activable
      :expand-on-click-node="false"
      :active-multiple="false"
      :value-mode="valueMode"
    />
  </t-space>
</template>

<script>
// 注意这个示例，同步属性的赋值方式与 vue3 api 不同
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
          label: '2',
          checkable: false,
          children: [
            {
              value: '2.1',
              label: '2.1',
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
      arr
        .map((str) => str.trim())
        .forEach((tag) => {
          const match = /^\{([^{}]+)\}$/.exec(tag);
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
