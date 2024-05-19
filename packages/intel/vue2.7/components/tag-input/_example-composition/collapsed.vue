<template>
  <t-space direction="vertical" style="width: 80%">
    <t-tag-input v-model="tags" :min-collapsed-num="1" />

    <!-- 方式一：使用渲染函数自定义折叠项 -->
    <t-tag-input v-model="tags" :min-collapsed-num="2" :collapsed-items="renderCollapsedItems" />

    <!-- 方式二：使用插槽自定义折叠项 -->
    <t-tag-input v-model="tags" :min-collapsed-num="3">
      <template #collapsedItems="{ collapsedTags }">
        <t-popup>
          <t-tag>More({{ collapsedTags.length }})</t-tag>
          <template #content>
            <t-tag v-for="item in collapsedTags" :key="item" style="margin-right: 4px">
              {{ item }}
            </t-tag>
          </template>
        </t-popup>
      </template>
    </t-tag-input>
  </t-space>
</template>
<script setup lang="jsx">
import { ref } from 'vue';
import { Tag } from 'tdesign-vue';

const tags = ref(['Vue', 'React', 'Miniprogram', 'Angular', 'Flutter']);

const renderCollapsedItems = (_, { collapsedTags }) => <Tag>更多({collapsedTags.length})</Tag>;
</script>
