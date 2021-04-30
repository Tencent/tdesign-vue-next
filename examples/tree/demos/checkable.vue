<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-button :variant="checkable ? 'base' : 'outline'" @click="toggleCheckAble">可选</t-button>
      <t-button :variant="checkStrictly ? 'base' : 'outline' " @click="toggleCheckStrictly">严格模式</t-button>
      <t-radio-group
        name="value-mode"
        v-model="valueMode"
        :options="valueOptions"
      ></t-radio-group>
    </div>
    <t-tree
      :data="items"
      hover
      expand-all
      :checkable="checkable"
      :check-strictly="checkStrictly"
      :value-mode="valueMode"
      @change="onChange"
      @click="onClick"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueMode: 'onlyLeaf',
      checkable: true,
      checkStrictly: false,
      valueOptions: [
        {
          value: 'onlyLeaf',
          label: 'onlyLeaf',
        },
        {
          value: 'parentFirst',
          label: 'parentFirst',
        },
        {
          value: 'all',
          label: 'all',
        },
      ],
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
        children: [{
          value: '2.1',
          label: '2.1',
        }, {
          value: '2.2',
          label: '2.2',
        }],
      }],
    };
  },
  methods: {
    onClick(context) {
      console.info('onClick:', context);
    },
    onChange(checked, context) {
      console.info('onChange:', checked, context);
    },
    propOnChange(checked, context) {
      console.info('propOnChange:', checked, context);
    },
    toggleCheckAble() {
      this.checkable = !this.checkable;
    },
    toggleCheckStrictly() {
      this.checkStrictly = !this.checkStrictly;
    },
  },
};
</script>
<style scoped>
  .tdesign-tree-base .t-button{
    margin: 0 10px 10px 0;
  }
</style>
