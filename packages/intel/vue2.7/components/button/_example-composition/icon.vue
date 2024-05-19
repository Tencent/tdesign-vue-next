<template>
  <t-space size="24px">
    <t-button theme="primary">
      <add-icon slot="icon" />
      新建
    </t-button>
    <t-button variant="outline">
      <cloud-upload-icon slot="icon" />
      上传文件
    </t-button>
    <t-button shape="circle" theme="primary">
      <discount-icon slot="icon" />
    </t-button>
    <t-button shape="circle" theme="primary">
      <cloud-download-icon slot="icon" />
    </t-button>
    <t-button variant="outline" :icon="renderIcon"> 搜索 </t-button>
  </t-space>
</template>

<script setup lang="jsx">
import {
  AddIcon, CloudUploadIcon, SearchIcon, DiscountIcon, CloudDownloadIcon,
} from 'tdesign-icons-vue';

const renderIcon = () => <SearchIcon />;
</script>
