<template>
  <div>
    <div class="t-tdesign-demo__tag-input">
      <label>只读状态：</label>
      <t-tag-input :value="tags" readonly />
    </div>
    <br /><br />
    <div class="t-tdesign-demo__tag-input">
      <label>成功状态：</label>
      <t-tag-input :value="tags" status="success" tips="校验通过文本提示" clearable @change="onChange" />
    </div>
    <br />
    <div class="t-tdesign-demo__tag-input">
      <label>告警状态：</label>
      <t-tag-input :value="tags" status="warning" tips="校验不通过文本提示" clearable @change="onChange" />
    </div>
    <br />
    <div class="t-tdesign-demo__tag-input">
      <label>错误状态：</label>
      <t-tag-input :value="tags" status="error" tips="校验存在严重问题文本提示" clearable @change="onChange" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TTagInputStatus',
  data() {
    return {
      tags: ['Vue', 'React', 'Miniprogram'],
    };
  },
  methods: {
    onChange(val) {
      this.tags = val;
    },
  },
});
</script>

<style lang="less">
.t-tdesign-demo__tag-input {
  display: flex;
  align-items: baseline;
  > label {
    width: 100px;
  }
}
</style>
