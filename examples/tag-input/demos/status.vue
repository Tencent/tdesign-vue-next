<template>
  <div>
    <div class="t-tdesign-demo__tag-input">
      <label>禁用状态：</label>
      <t-tag-input :value="tags1" disabled />
    </div>
    <br /><br />
    <div class="t-tdesign-demo__tag-input">
      <label>只读状态：</label>
      <t-tag-input :value="tags2" tips="这是普通文本提示" readonly />
    </div>
    <br /><br />
    <div class="t-tdesign-demo__tag-input">
      <label>成功状态：</label>
      <t-tag-input v-model="tags3" status="success" tips="校验通过文本提示" clearable />
    </div>
    <br />
    <div class="t-tdesign-demo__tag-input">
      <label>告警状态：</label>
      <t-tag-input v-model="tags4" status="warning" tips="校验不通过文本提示" clearable />
    </div>
    <br />
    <div class="t-tdesign-demo__tag-input">
      <label>错误状态：</label>
      <t-tag-input v-model="tags5" status="error" tips="校验存在严重问题文本提示" clearable />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TTagInputStatus',
  data() {
    return {
      tags1: ['Vue', 'React', 'Miniprogram'],
      tags2: ['Vue', 'React', 'Miniprogram'],
      tags3: ['Vue', 'React', 'Miniprogram'],
      tags4: ['Vue', 'React', 'Miniprogram'],
      tags5: ['Vue', 'React', 'Miniprogram'],
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
