<template>
  <t-space direction="vertical">
    <h3>String / Slot</h3>
    <t-breadcrumb :max-items="5" :items-before-collapse="3" :items-after-collapse="2" ellipsis="...">
      <t-breadcrumb-item v-for="index in 8" :key="index"> 页面{{ index }} </t-breadcrumb-item>
    </t-breadcrumb>
    <t-breadcrumb :max-items="5" :items-before-collapse="3" :items-after-collapse="2">
      <t-breadcrumb-item v-for="index in 8" :key="index" :disabled="index === 5"> 页面{{ index }} </t-breadcrumb-item>
      <template #ellipsis="{ items, separator }">
        <div class="t-breadcrumb__item">
          <div v-for="item in items" :key="item" class="t-breadcrumb--text-overflow t-breadcrumb__ellipsis--custom">
            <span>{{ item.content }}</span>
            <component :is="separator" v-if="!item.isLast" />
          </div>
        </div>
      </template>
    </t-breadcrumb>
    <!---->
    <h3>Function</h3>
    <t-breadcrumb
      :options="options"
      :max-items="5"
      :items-before-collapse="2"
      :items-after-collapse="3"
      :ellipsis="renderEllipsis"
    >
    </t-breadcrumb>
  </t-space>
</template>

<script setup lang="jsx">
import { EllipsisIcon } from 'tdesign-icons-vue-next';

const options = [
  { content: '页面1' },
  { content: '页面2' },
  { content: '页面3' },
  { content: '页面4' },
  { content: '页面5 (禁用)', disabled: true },
  { content: '页面6' },
  { content: '页面7' },
  { content: '页面8', href: 'https://www.tencent.com' },
];

const renderEllipsis = (h, { items, separator }) => {
  return (
    <t-dropdown
      trigger="click"
      options={items.map((item, index) => {
        return {
          value: index,
          content: item.content,
          disabled: item.disabled,
          onClick: () => {
            console.log('点击了：', item);
          },
        };
      })}
    >
      <t-button variant="outline" size="small" shape="square">
        <EllipsisIcon />
      </t-button>
    </t-dropdown>
  );
};
</script>
