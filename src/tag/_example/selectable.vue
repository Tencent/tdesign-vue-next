<template>
  <t-space>
    <t-check-tag
      v-for="(tag, index) in tags"
      :key="index"
      :default-checked="tag.defaultChecked"
      :disabled="!!tag.disabled"
      @click="handleClick(tag, index)"
      @change="handleChange"
    >
      {{ tag.name }}
    </t-check-tag>
  </t-space>
</template>
<script setup>
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
