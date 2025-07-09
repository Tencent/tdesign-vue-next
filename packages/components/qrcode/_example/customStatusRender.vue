<template>
  <t-space>
    <!-- 自定义状态-使用Function -->
    <t-qrcode value="https://tdesign.tencent.com/" status="loading" :status-render="renderStatus" />
    <!-- 自定义状态-使用插槽 -->
    <t-qrcode value="https://tdesign.tencent.com/" status="expired">
      <template #status-render>
        <div style="display: flex; align-items: center; flex-direction: column">
          <p style="display: flex; align-items: center; gap: 8px">
            <CloseCircleFilledIcon style="color: var(--td-error-color)" size="16" />
            <span>二维码过期</span>
          </p>
          <p
            style="
              display: flex;
              align-items: center;
              gap: 8px;
              color: var(--td-brand-color);
              cursor: pointer;
              line-height: 32px;
            "
            @click="handleRefresh"
          >
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

const renderStatus = () => {
  return (
    <t-space direction="vertical" size="4px">
      <t-loading size="32px" />
      <p>加载中...</p>
    </t-space>
  );
};

const handleRefresh = () => {
  console.log('Click Refresh');
};
</script>
