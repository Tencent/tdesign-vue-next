<template>
  <div class="tdesign-demo-dropdown">
    <t-dropdown :options="options" @click="clickHandler">
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
import TIconChevronDown from '@tencent/tdesign-vue-next/lib/icon/chevron-down';

export default {
  components: {
    TIconChevronDown,
  },
  data() {
    return {
      options: [{
        content: '选项一',
        value: 1,
        children: [{
          content: '选项九',
          value: 9,
        }],
      }, {
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

              }, {
                content: '选项八',
                value: 8,
              },
            ],
          }, {
            content: '选项六',
            value: 6,
          },
        ],
      }, {
        content: '选项三',
        value: 3,
        children: [{
          content: '选项十',
          value: 10,
        }],
      }, {
        content: '选项四',
        value: 4,
        children: [{
          content: '选项十一',
          value: 11,
        }],
      }],
    };
  },
  methods: {
    clickHandler(data, context) {
      console.log(data);
      console.log(context);
    },
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
