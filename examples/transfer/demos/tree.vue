<template>
  <div>
    <t-transfer
      :data="items"
      v-model="targetValue"
      v-model:checked="checked"
      @change="onChange"
      @checkedChange="handleCheckedChange"
    >
      <template v-slot:tree="slotProps">
        <t-tree  v-bind="slotProps" checkable hover expand-all transition />
      </template>
    </t-transfer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [{
        value: '1',
        label: '1',
        children: [{
          value: '1.1',
          label: '1.1',
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
      targetValue: [],
      checked: [],
    };
  },
  methods: {
    handleCheckedChange({
      checked, sourceChecked, targetChecked, type,
    }) {
      console.log('handleCheckedChange', {
        checked, sourceChecked, targetChecked, type,
      });
    },
    onChange(newTargetValue) {
      console.log('onChange', newTargetValue);
    },
  },
};
</script>
