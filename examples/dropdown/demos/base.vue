<template>
  <div class="tdesign-demo-dropdown">
    <t-dropdown :options="options" :min-column-width="112" @click="clickHandler">
      <div class="tdesign-demo-dropdown-trigger">
        <t-button variant="text">
          <span class="tdesign-demo-dropdown__text"> 下拉菜单 <t-icon name="chevron-down" size="16" /> </span>
        </t-button>
      </div>
    </t-dropdown>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { MessagePlugin } from '@tencent/tdesign-vue-next';

const options = [
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
    content: '操作四',
    value: 4,
  },
];

export default defineComponent({
  setup() {
    const clickHandler = (data) => {
      MessagePlugin.success(`选中【${data.content}】`);
    };
    return {
      clickHandler,
      options,
    };
  },
});
</script>
<style lang="less" scoped>
.tdesign-demo-dropdown {
  &__text {
    display: inline-flex;
    .t-icon {
      margin-left: 8px;
    }
  }
}
</style>
