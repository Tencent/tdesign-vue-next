<template>
  <div class="tdesign-demo-select-input-status">
    <div>
      <span>禁用状态：</span>
      <t-select-input :value="selectValue" disabled tips="这是禁用状态文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>只读状态：</span>
      <t-select-input :value="selectValue" readonly tips="这是普通状态的文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </div>
    <br /><br />

    <div>
      <span>成功状态：</span>
      <t-select-input :value="selectValue" status="success" tips="校验通过文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>警告状态：</span>
      <t-select-input :value="selectValue" status="warning" tips="校验不通过文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>错误状态：</span>
      <t-select-input :value="selectValue" status="error" tips="校验存在严重问题文本提示" placeholder="Please Select">
        <template #panel>
          <div class="tdesign-demo__select-empty-status">暂无数据</div>
        </template>
      </t-select-input>
    </div>
    <br />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SelectInputSingle',
  setup() {
    return {
      selectValue: 'TDesign',
    };
  },
});
</script>

<style>
.tdesign-demo__select-empty-status {
  text-align: center;
  color: var(--td-text-color-disabled);
  line-height: 32px;
}

.tdesign-demo-select-input-status .t-select-input__wrap {
  width: 300px;
  vertical-align: -26px;
}
</style>
