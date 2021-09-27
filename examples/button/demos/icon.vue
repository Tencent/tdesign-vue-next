<template>
  <div class="demo-button-icon">
    <div class="demo-button-row">
      <div class="demo-button-col">
        <t-button theme="primary">
          <template #icon>
            <t-icon-add/>
          </template>
          新建
        </t-button>
        <t-button variant="outline">
          <template #icon>
            <t-icon-cloud-upload />
          </template>
          上传文件
        </t-button>
      </div>
      <div class="demo-button-col">
        <t-button shape="circle" theme="primary">
          <template #icon>
            <t-icon-discount/>
          </template>
        </t-button>
        <t-button shape="circle" theme="primary">
          <template #icon>
            <t-icon-cloud-download/>
          </template>
        </t-button>
      </div>
      <!-- 使用 function 的形式定义 icon -->
      <div class="demo-button-col">
        <t-button
          variant="outline"
          :icon="renderIcon"
        >
          Function Icon
        </t-button>
      </div>

    </div>
  </div>
</template>
<script lang="jsx">
import TIconAdd from '@tencent/tdesign-vue-next/icon/add';
import TIconCloudUpload from '@tencent/tdesign-vue-next/icon/cloud-upload';
import TIconCloudDownload from '@tencent/tdesign-vue-next/icon/cloud-download';
import TIconDiscount from '@tencent/tdesign-vue-next/icon/discount';
import TIconSearch from '@tencent/tdesign-vue-next/icon/search';

export default {
  components: {
    TIconAdd,
    TIconCloudUpload,
    TIconCloudDownload,
    TIconDiscount,
  },
  methods: {
    renderIcon() {
      return <TIconSearch />;
    },
  },
};
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
