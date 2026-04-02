<template>
  <t-space direction="vertical">
    <t-cascader v-model="value" :options="options" :on-remove="handleBlur" multiple :min-collapsed-num="1" />
    <t-cascader v-model="value" :options="options" :collapsed-items="collapsedItems" multiple :min-collapsed-num="1" />
    <t-cascader v-model="value" :options="options" multiple clearable :min-collapsed-num="1">
      <template #collapsedItems="{ collapsedSelectedItems, count }">
        <t-popup>
          <template #content>
            <p v-for="(item, index) in collapsedSelectedItems" :key="index" style="padding: 10px">
              {{ item }}
            </p>
          </template>
          <span v-show="count > 0" style="color: #00a870; margin-left: 10px">+{{ count - 1 }}</span>
        </t-popup>
      </template>
    </t-cascader>
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CascaderProps } from 'tdesign-vue-next';
const options: CascaderProps['options'] = [
  {
    label: '选项一',
    value: '1',
    children: [
      {
        label: '子选项一',
        value: '1.1',
      },
      {
        label: '子选项二',
        value: '1.2',
      },
      {
        label: '子选项三',
        value: '1.3',
      },
    ],
  },
  {
    label: '选项二',
    value: '2',
    children: [
      {
        label: '子选项一',
        value: '2.1',
      },
      {
        label: '子选项二',
        value: '2.2',
      },
    ],
  },
];
const value = ref(['1.1', '1.2', '1.3']);
const handleBlur: CascaderProps['onRemove'] = (e) => {
  console.log(e);
};
const collapsedItems: CascaderProps['collapsedItems'] = (h, { value, count }) => {
  if (!(value instanceof Array) || !count) return;
  return (
    <t-popup
      v-slots={{
        content: () => (
          <div>
            {value.map((item) => (
              <p style="padding: 10px;">{item}</p>
            ))}
          </div>
        ),
      }}
    >
      <span v-show={count > 0} style="color: #ED7B2F; margin-left: 10px;">
        +{count - 1}
      </span>
    </t-popup>
  );
};
</script>
