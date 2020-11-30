<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-button :theme="checkable ? 'primary' : 'ghost'" @click="toggleCheckAble">可选</t-button>
      <t-button :theme="checkStrictly ? 'primary' : 'ghost' " @click="toggleCheckStrictly">严格模式</t-button>
    </div>
    <t-tree
      :data="items"
      :hover="true"
      :checkable="checkable"
      :check-strictly="checkStrictly"
      :expand-all="true"
      @change="onChange"
      @click="onClick"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkable: true,
      checkStrictly: false,
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
    onClick(state) {
      console.log('on click:', state);
    },
    onChange(state) {
      console.log('on change:', state);
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
