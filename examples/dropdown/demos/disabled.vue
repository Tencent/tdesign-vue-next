<template>
  <div class="tdesign-demo-dropdown">
    <t-dropdown :options="options" :min-column-width="112">
      <t-button variant="text">
        <span class="tdesign-demo-dropdown__text">
          下拉菜单
          <t-icon-chevron-down size="16" />
        </span>
      </t-button>
    </t-dropdown>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import TIconChevronDown from 'tdesign-vue-next/icon/chevron-down';

const options = [
  {
    content: '选项一',
    value: 1,
  },
  {
    content: '选项二',
    value: 2,
  },
  {
    content: '选项三',
    value: 3,
    disabled: true,
  },
  {
    content: '选项四',
    value: 4,
    disabled: true,
  },
];

export default defineComponent({
  components: {
    TIconChevronDown,
  },
  setup() {
    return {
      options,
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
