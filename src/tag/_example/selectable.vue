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
<script setup lang="ts">
type Tag = {
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
};
const tags: Tag[] = [
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

const handleClick = (tag: Tag, index: number) => {
  console.log(tag, index);
};

const handleChange = (isChecked: boolean) => {
  console.log(isChecked);
};
</script>
