<template>
  <t-space>
    <!-- 自定义状态-使用Function -->
    <t-qrcode value="https://tdesign.tencent.com/" status="loading" :status-render="renderStatus" />
    <!-- 自定义状态-使用插槽 -->
    <t-qrcode value="https://tdesign.tencent.com/" status="expired">
      <template #status-render="{ status }">
        <div v-if="status === 'expired'" class="tdesign-demo-qrcode__status-render">
          <p class="tdesign-demo-qrcode__status-render-title">
            <CloseCircleFilledIcon size="16" />
            <span>二维码过期</span>
          </p>
          <p class="tdesign-demo-qrcode__status-render-action" @click="handleRefresh">
            <RefreshIcon size="16" />
            <span>点击刷新</span>
          </p>
        </div>
      </template>
    </t-qrcode>
    <!-- 默认状态 -->
    <t-qrcode value="https://tdesign.tencent.com/" status="scanned" />
  </t-space>
</template>

<script lang="jsx" setup>
import { CloseCircleFilledIcon, RefreshIcon } from 'tdesign-icons-vue-next';

const renderStatus = (_h, { status }) => {
  return (
    status === 'loading' && (
      <t-space direction="vertical" size="4px">
        <t-loading size="32px" />
        <p>加载中...</p>
      </t-space>
    )
  );
};

const handleRefresh = () => {
  console.log('Click Refresh');
};
</script>

<style>
.tdesign-demo-qrcode__status-render {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.tdesign-demo-qrcode__status-render-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tdesign-demo-qrcode__status-render-title .t-icon {
  color: var(--td-error-color);
}

.tdesign-demo-qrcode__status-render-action {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--td-brand-color);
  cursor: pointer;
  line-height: 32px;
}
</style>
