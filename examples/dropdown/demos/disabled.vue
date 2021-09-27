<template>
  <div class="tdesign-demo-dropdown">
    <t-dropdown :options="options" :popupProps={}>
      <t-button variant="text">
        <span class="tdesign-demo-dropdown__text">
          更多
          <t-icon-chevron-down size="16" />
        </span>
      </t-button>
    </t-dropdown>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import TIconChevronDown from '@tencent/tdesign-vue-next/icon/chevron-down';

export default defineComponent({
  components: {
    TIconChevronDown
  },
  data() {
    return {
      options: [{
        content: '选项一',
        value: 1,
      }, {
        content: '选项二',
        value: 2,
      }, {
        content: '选项三',
        value: 3,
        disabled: true,
      }, {
        content: '选项四',
        value: 4,
        disabled: true,
      }],
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
