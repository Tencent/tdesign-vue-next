<template>
  <div class="demo-button-icon">
    <div class="demo-button-row">
      <div class="demo-button-col">
        <t-button>
          <t-icon-add slot="icon"/>
          新建
        </t-button>
        <t-button variant="outline">
          <t-icon-cloud-upload slot="icon"/>
          上传文件
        </t-button>
      </div>
      <div class="demo-button-col">
        <t-button shape="circle">
          <t-icon-discount slot="icon"/>
        </t-button>
        <t-button shape="circle">
          <t-icon-cloud-download slot="icon"/>
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
<script>
import TIconAdd from '@tencent/tdesign-vue/lib/icon/add';
import TIconCloudUpload from '@tencent/tdesign-vue/lib/icon/cloud-upload';
import TIconCloudDownload from '@tencent/tdesign-vue/lib/icon/cloud-download';
import TIconDiscount from '@tencent/tdesign-vue/lib/icon/discount';
import TIconSearch from '@tencent/tdesign-vue/lib/icon/search';

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
