<template>
  <div class="demo-button-icon">
    <div class="demo-button-row">
      <div class="demo-button-col">
        <t-button theme="primary">
          <template #icon>
            <add-icon />
          </template>
          新建
        </t-button>
        <t-button variant="outline">
          <template #icon>
            <cloud-upload-icon />
          </template>
          上传文件
        </t-button>
      </div>
      <div class="demo-button-col">
        <t-button shape="circle" theme="primary">
          <template #icon>
            <t-icon name="discount" />
          </template>
        </t-button>
        <t-button shape="circle" theme="primary">
          <template #icon>
            <cloud-download-icon />
          </template>
        </t-button>
      </div>
      <!-- 使用 function 的形式定义 icon -->
      <div class="demo-button-col">
        <t-button variant="outline" :icon="renderIcon"> Function Icon </t-button>
      </div>
    </div>
  </div>
</template>
<script lang="jsx">
import { defineComponent } from 'vue';
import { AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: {
    AddIcon,
    CloudUploadIcon,
    CloudDownloadIcon,
  },
  setup() {
    return {
      renderIcon() {
        return <SearchIcon />;
      },
    };
  },
});
</script>

<style scoped>
.demo-button-row {
  display: flex;
}
.demo-button-col {
  margin-right: 32px;
}
.t-button + .t-button {
  margin-left: 16px;
}
</style>
