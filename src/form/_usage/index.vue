<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #form="{ configProps }"
      ><t-form v-bind="configProps">
        <t-form-item label="姓名" name="name" initial-data="TDesign">
          <t-input placeholder="请输入内容" />
        </t-form-item>
        <t-form-item label="手机号码" name="tel" initial-data="123456">
          <t-input placeholder="请输入内容" />
        </t-form-item>
        <t-form-item label="课程" name="course" initial-data="['1']">
          <t-checkbox-group>
            <t-checkbox value="1">语文</t-checkbox>
            <t-checkbox value="2">数学</t-checkbox>
            <t-checkbox value="3">英语</t-checkbox>
            <t-checkbox value="4">体育</t-checkbox>
          </t-checkbox-group>
        </t-form-item>
      </t-form></template
    >
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'form', value: 'form' }];

const usageCodeMap = {
  form: '\n        <t-form v-bind="configProps">\n          <t-form-item label="姓名" name="name" initial-data="TDesign">\n            <t-input placeholder="请输入内容" />\n          </t-form-item>\n          <t-form-item label="手机号码" name="tel" initial-data="123456">\n            <t-input placeholder="请输入内容" />\n          </t-form-item>\n          <t-form-item label="课程" name="course" initial-data="[\'1\']">\n            <t-checkbox-group>\n              <t-checkbox value="1">语文</t-checkbox>\n              <t-checkbox value="2">数学</t-checkbox>\n              <t-checkbox value="3">英语</t-checkbox>\n              <t-checkbox value="4">体育</t-checkbox>\n            </t-checkbox-group>\n          </t-form-item>\n        </t-form>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
