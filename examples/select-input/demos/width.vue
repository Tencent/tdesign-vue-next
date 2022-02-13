<template>
  <div class="tdesign-demo-select-input-width">
    <div>
      <span>下拉框默认宽度：</span>
      <t-select-input :value="selectValue" placeholder="Please Select" class="t-demo-normal">
        <template #panel>
          <div class="tdesign-demo__select-empty">下拉框宽度和触发元素宽度保持一致（默认）</div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>下拉框最大宽度：</span>
      <t-select-input :value="selectValue" placeholder="Please Select" class="t-demo-normal">
        <template #panel>
          <div class="tdesign-demo__select-empty">
            下拉框宽度和触发元素宽度保持一致，但是当下拉框内容宽度超出时，自动撑开下拉框宽度，最大不超过 1000px（默认）
          </div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>与内容宽度一致：</span>
      <t-select-input
        :value="selectValue"
        :popup-props="{
          overlayStyle: { width: 'auto' },
        }"
        placeholder="Please Select"
        class="t-demo-normal"
      >
        <template #panel>
          <div class="tdesign-demo__select-empty">宽度随内容宽度自适应</div>
        </template>
      </t-select-input>
    </div>
    <br />

    <div>
      <span>下拉框固定宽度：</span>
      <t-select-input
        :value="selectValue"
        :popup-props="{
          overlayStyle: { width: '360px' },
        }"
        placeholder="Please Select"
        class="t-demo-normal"
      >
        <template #panel>
          <div class="tdesign-demo__select-empty">固定宽度 360px</div>
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
.tdesign-demo__select-empty {
  text-align: center;
  color: var(--td-text-color-disabled);
  line-height: 32px;
}

.tdesign-demo-select-input-width .t-select-input {
  width: 380px;
}
</style>
