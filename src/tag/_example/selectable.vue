<template>
  <t-space direction="vertical">
    <t-space>
      <label>StyleA</label>
      <t-check-tag v-model="checked1" style="margin-right: 32px">选中/未选态</t-check-tag>
      <t-check-tag :checked="true">选中态</t-check-tag>
      <t-check-tag :checked="false">未选态</t-check-tag>
      <t-check-tag :checked="true" disabled>选中禁用</t-check-tag>
      <t-check-tag :checked="false" disabled>未选禁用</t-check-tag>
    </t-space>

    <t-space>
      <label>StyleB</label>
      <t-check-tag
        v-model="checked2"
        :unchecked-props="{ theme: 'default', variant: 'outline' }"
        style="margin-right: 32px"
        >选中/未选态</t-check-tag
      >
      <t-check-tag :checked="true">选中态</t-check-tag>
      <t-check-tag :checked="false" :unchecked-props="{ theme: 'default', variant: 'outline' }">未选态</t-check-tag>
      <t-check-tag :checked="true" disabled>选中禁用</t-check-tag>
      <t-check-tag :checked="false" disabled :unchecked-props="{ theme: 'default', variant: 'outline' }"
        >未选禁用</t-check-tag
      >
    </t-space>

    <t-space>
      <label>StyleC</label>
      <t-check-tag
        v-model="checked3"
        :checked-props="{ theme: 'primary', variant: 'outline' }"
        :unchecked-props="{ theme: 'default', variant: 'outline' }"
        style="margin-right: 32px"
        >选中/未选态</t-check-tag
      >
      <t-check-tag :checked="true" :checked-props="{ theme: 'primary', variant: 'outline' }">选中态</t-check-tag>
      <t-check-tag :checked="false" :unchecked-props="{ theme: 'default', variant: 'outline' }">未选态</t-check-tag>
      <t-check-tag :checked="true" disabled :checked-props="{ theme: 'primary', variant: 'outline' }"
        >选中禁用</t-check-tag
      >
      <t-check-tag :checked="false" disabled :unchecked-props="{ theme: 'default', variant: 'outline' }"
        >未选禁用</t-check-tag
      >
    </t-space>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const checked1 = ref(false);
const checked2 = ref(false);
const checked3 = ref(false);

const tags = [
  {
    name: '选中',
    defaultChecked: true,
  },
  {
    name: '未选',
  },
  {
    name: 'Disabled',
    disabled: true,
  },
];

const handleClick = (tag, index) => {
  console.log(tag, index);
};

const handleChange = (isChecked) => {
  console.log(isChecked);
};
</script>
