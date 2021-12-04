<template>
  <div class="tdesign-demo-dropdown">
    <t-dropdown :options="options" :max-column-width="120" @click="clickHandler">
      <t-button variant="text">
        <span class="tdesign-demo-dropdown__text">
          下拉菜单
          <chevron-down-icon size="16" />
        </span>
      </t-button>
    </t-dropdown>
  </div>
</template>
<script>
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const options = [
  {
    content: '选项一',
    value: 1,
    children: [
      {
        content: '选项九',
        value: 9,
      },
    ],
  },
  {
    content: '选项二选项二选项二选项二',
    value: 2,
    children: [
      {
        content: '选项五',
        value: 5,
        children: [
          {
            content: '选项七',
            value: 7,
          },
          {
            content: '选项八',
            value: 8,
          },
        ],
      },
      {
        content: '选项六',
        value: 6,
      },
    ],
  },
  {
    content: '选项三',
    value: 3,
    children: [
      {
        content: '选项十',
        value: 10,
      },
    ],
  },
  {
    content: '选项四',
    value: 4,
    children: [
      {
        content: '选项十一',
        value: 11,
      },
    ],
  },
];

export default {
  components: {
    ChevronDownIcon,
  },
  setup() {
    const clickHandler = (data) => {
      MessagePlugin.success(`选中【${data.content}】`);
    };
    return {
      clickHandler,
      options,
    };
  },
};
</script>
<style lang="less" scoped>
.tdesign-demo-dropdown {
  &__text {
    display: inline-flex;
  }
}
</style>
