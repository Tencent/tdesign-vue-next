<template>
  <t-space direction="vertical" class="tdesign-demo-select-input-status" style="width: 100%">
    <t-space align="center">
      <span>禁用状态：</span>
      <t-select-input :value="selectValue" disabled tips="这是禁用状态文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </t-space>

    <t-space align="center">
      <span>只读状态：</span>
      <t-select-input :value="selectValue" readonly tips="这是普通状态的文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </t-space>

    <t-space align="center">
      <span>成功状态：</span>
      <t-select-input :value="selectValue" status="success" tips="校验通过文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </t-space>

    <t-space align="center">
      <span>警告状态：</span>
      <t-select-input :value="selectValue" status="warning" tips="校验不通过文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </t-space>

    <t-space align="center">
      <span>错误状态：</span>
      <t-select-input :value="selectValue" status="error" tips="校验存在严重问题文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { SelectInputProps } from 'tdesign-vue-next';
const selectValue: SelectInputProps['value'] = 'TDesign';
</script>
<style>
.tdesign-demo__select-empty-status {
  text-align: center;
  color: var(--td-text-color-disabled);
  line-height: 32px;
}
.tdesign-demo-select-input-status > div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.tdesign-demo-select-input-status .t-select-input__wrap {
  width: 300px;
  height: 32px;
}
</style>
