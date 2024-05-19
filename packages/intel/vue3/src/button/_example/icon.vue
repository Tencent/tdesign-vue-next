<template>
  <t-space size="24px">
    <t-button theme="primary">
      <template #icon><add-icon /></template>
      新建
    </t-button>
    <t-button variant="outline">
      <template #icon><cloud-upload-icon /></template>
      上传文件
    </t-button>
    <t-button shape="circle" theme="primary">
      <template #icon><discount-icon /></template>
    </t-button>
    <t-button shape="circle" theme="primary">
      <template #icon> <cloud-download-icon /></template>
    </t-button>
    <t-button variant="outline" :icon="renderIcon"> 搜索 </t-button>
  </t-space>
</template>
<script setup lang="jsx">
import { AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon } from 'tdesign-icons-vue-next';

const renderIcon = () => {
  return <SearchIcon />;
};
</script>
