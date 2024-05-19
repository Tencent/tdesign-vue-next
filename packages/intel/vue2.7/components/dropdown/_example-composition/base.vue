<template>
  <div class="tdesign-demo-dropdown">
    <t-dropdown :options="options" @click="clickHandler">
      <t-button variant="text">
        <span class="tdesign-demo-dropdown__text">
          更多
          <chevron-down-icon size="16" />
        </span>
      </t-button>
    </t-dropdown>
  </div>
</template>
<script setup lang="jsx">
import { MessagePlugin } from 'tdesign-vue';
import { ref } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue';

const options = ref([
  {
    content: '操作一',
    value: 1,
  },
  {
    content: '操作二',
    value: 2,
  },
  {
    content: '操作三',
    value: 3,
  },
  {
    content: getContent,
    value: 4,
  },
]);
const clickHandler = (data) => {
  MessagePlugin.success(`选中【${data.value}】`);
};
const getContent = () => <div>操作四</div>;
</script>
<style lang="less" scoped>
.tdesign-demo-dropdown {
  &__text {
    display: inline-flex;
    align-items: center;
    .t-icon {
      margin-left: 8px;
    }
  }
}
</style>
