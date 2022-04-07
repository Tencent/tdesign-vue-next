<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="renderCode" :config-list="configList">
    <template #default="data">
      <component :is="renderComp(data)" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';

import configList from './props.json';
const renderCode = `
          <t-form __pointerProps__>
            <t-form-item label="姓名" name="name" initialData="TDesign">
              <t-input placeholder="请输入内容" />
            </t-form-item>
            <t-form-item label="手机号码" name="tel" initialData="123456">
              <t-input placeholder="请输入内容" />
            </t-form-item>
            <t-form-item label="课程" name="course" initialData={['1']}>
              <t-checkbox-group>
                <t-checkbox value="1">语文</t-checkbox>
                <t-checkbox value="2">数学</t-checkbox>
                <t-checkbox value="3">英语</t-checkbox>
                <t-checkbox value="4">体育</t-checkbox>
              </t-checkbox-group>
            </t-form-item>
          </t-form>
        `;

const renderComp = (data) => {
  return data?.usageCode ? compile(data.usageCode) : null;
};
</script>
