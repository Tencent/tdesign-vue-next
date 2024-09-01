<template>
  <t-row :gutter="40">
    <t-col>
      <t-empty description="暂无数据">
        <template #image>
          <error-circle-icon size="64" color="var(--td-text-color-placeholder)" />
        </template>
      </t-empty>
    </t-col>
    <t-col>
      <t-empty description="暂无数据">
        <template #image>
          <div
            style="
              width: 64px;
              height: 64px;
              background-image: url(https://tdesign.gtimg.com/demo/demo-image-1.png);
              background-size: 100% 100%;
            "
          ></div>
        </template>
      </t-empty>
    </t-col>
  </t-row>
</template>
<script lang="ts" setup>
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';
</script>
