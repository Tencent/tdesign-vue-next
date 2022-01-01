<template>
  <div>
    <div class="t-tdesign-demo__tag-input">
      <label>只读状态：</label>
      <t-tag-input :value="tags" readonly />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TTagInputBase',
  data() {
    return {
      tags: ['Vue', 'React', 'Miniprogram'],
    };
  },
});
</script>

<style lang="less">
.t-tdesign-demo__tag-input {
  display: flex;
  align-items: center;
  > label {
    width: 100px;
  }
}
</style>
