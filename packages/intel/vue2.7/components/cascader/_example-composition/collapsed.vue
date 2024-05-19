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
          <span v-show="count > 0" style="color: #00a870; margin-left: 10px">+{{ count }}</span>
        </t-popup>
      </template>
    </t-cascader>
  </t-space>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

const options = ref([
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
]);
const value = ref(['1.1', '1.2', '1.3']);
const collapsedItems = (h, { value: selectedValue, count }) => {
  if (!count) return;
  const value = selectedValue instanceof Array ? selectedValue : [selectedValue];
  // hover展示全部已选项
  return (
    <t-popup>
      <div slot="content">
        {value.map((item) => (
          <p style="padding: 10px;">{item.label}</p>
        ))}
      </div>
      <span v-show={count > 0} style="color: #ED7B2F; margin-left: 10px;">
        +{count}
      </span>
    </t-popup>
  );
};
const handleBlur = (e) => {
  console.log(e);
};
</script>
