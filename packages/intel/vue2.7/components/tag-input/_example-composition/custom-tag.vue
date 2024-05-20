<template>
  <t-space direction="vertical">
    <!-- 方式一：使用 tag 定义标签内部内容。也可以使用同名渲染函数 tag -->
    <t-tag-input v-model="tags" clearable :min-collapsed-num="2">
      <template #tag="{ value }">
        <img
          src="https://tdesign.gtimg.com/site/avatar.jpg"
          style="max-width: 20px; max-height: 20px; border-radius: 50%; vertical-align: text-top"
        />
        <span>&nbsp;&nbsp;{{ value }}</span>
      </template>
    </t-tag-input>
    <!-- 方式二：使用 valueDisplay 定义全部内容。也可以使用同名渲染函数 valueDisplay -->
    <t-tag-input v-model="tags" clearable>
      <template #valueDisplay="{ value, onClose }">
        <t-tag
          v-for="(item, index) in value"
          :key="item"
          closable
          style="margin-right: 4px"
          @close="() => onClose(index)"
        >
          <img
            src="https://tdesign.gtimg.com/site/avatar.jpg"
            style="max-width: 20px; max-height: 20px; border-radius: 50%; vertical-align: text-top"
          />
          <span>&nbsp;&nbsp;{{ item }}</span>
        </t-tag>
      </template>
    </t-tag-input>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const tags = ref(['StudentA', 'StudentB', 'StudentC']);
</script>
