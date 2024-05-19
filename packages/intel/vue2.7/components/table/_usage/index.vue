<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import { CheckCircleFilledIcon, CloseCircleFilledIcon, ErrorCircleFilledIcon } from 'tdesign-icons-vue';
import baseConfigJson from './base-table-props.json';

const data = ref(
  Array(4)
    .fill(0)
    .map((_, i) => ({
      index: i,
      applicant: ['贾明', '张三', '王芳'][i % 3],
      status: i % 3,
      channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
      detail: {
        email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
      },
    })),
);

const columns = ref([
  { colKey: 'applicant', title: '申请人', width: '120' },
  {
    colKey: 'status',
    title: '审批状态',
    width: '120',
    cell: (h, { row }) => {
      const statusNameListMap = {
        0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
        1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
        2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
      };
      return (
        <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
          {statusNameListMap[row.status].icon}
          {statusNameListMap[row.status].label}
        </t-tag>
      );
    },
  },
  { colKey: 'channel', title: '签署方式' },
  { colKey: 'detail.email', title: '电子邮件' },
]);

const configList = ref(baseConfigJson);
const panelList = [{ label: 'Table', value: 'baseTable', config: baseConfigJson }];

const usageCodeMap = {
  baseTable:
    '<t-table\n        v-bind="configProps"\n        row-key="index"\n        :data="data"\n        :columns="columns"\n      />',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  configList.value = panelList.find(item => item.value === panel).config;
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #baseTable="{ configProps }">
      <t-table v-bind="configProps" row-key="index" :data="data" :columns="columns" />
    </template>
  </base-usage>
</template>
