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
      v-model:value="checked"
      v-model:expanded="expanded"
      v-model:actived="actived"
      :data="items"
      checkable
      activable
      :expand-on-click-node="false"
      :active-multiple="false"
      :value-mode="valueMode"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { TreeProps, InputProps, InputValue } from 'tdesign-vue-next';
const valueMode = ref<TreeProps['valueMode']>('onlyLeaf');
const checked = ref<TreeProps['value']>(['1.1.1.1', '1.1.1.2']);
const expanded = ref<TreeProps['expanded']>(['1', '1.1', '1.1.1', '2']);
const actived = ref<TreeProps['actived']>(['2']);
const items = ref<TreeProps['data']>([
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
]);
const allChecked = computed<InputProps['value']>(() => {
  let arr: TreeProps['value'] = [];
  if (Array.isArray(checked.value)) {
    arr = checked.value;
  }
  return arr.map((val) => `{${val}}`).join(', ');
});
const allExpanded = computed<InputProps['value']>(() => {
  let arr: TreeProps['value'] = [];
  if (Array.isArray(expanded.value)) {
    arr = expanded.value;
  }
  return arr.map((val) => `{${val}}`).join(', ');
});
const allActived = computed<InputProps['value']>(() => {
  let arr: TreeProps['value'] = [];
  if (Array.isArray(actived.value)) {
    arr = actived.value;
  }
  return arr.map((val) => `{${val}}`).join(', ');
});
const getValueFromString = (val: InputValue) => {
  const arr = String(val).split(',');
  const vals: TreeProps['value'] = [];
  arr
    .map((str) => str.trim())
    .forEach((tag) => {
      const match = /^\{([^{}]+)\}$/.exec(tag);
      if (match && match[1]) {
        vals.push(match[1]);
      }
    });
  return vals;
};
const onAllCheckedInput: InputProps['onChange'] = (val) => {
  console.log('checked input on change', val);
  const vals = getValueFromString(val);
  checked.value = vals;
};
const onAllExpandedInput: InputProps['onChange'] = (val) => {
  console.log('expanded input on change', val);
  const vals = getValueFromString(val);
  expanded.value = vals;
};
const onAllActivedInput: InputProps['onChange'] = (val) => {
  console.log('actived input on change', val);
  const vals = getValueFromString(val);
  actived.value = vals;
};
</script>
