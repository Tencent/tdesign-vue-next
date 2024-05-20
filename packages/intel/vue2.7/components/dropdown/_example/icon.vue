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
<script lang="jsx">
import { ChevronDownIcon, DiscountIcon } from 'tdesign-icons-vue';

export default {
  components: {
    ChevronDownIcon,
  },
  data() {
    return {
      options: [
        {
          content: '操作一',
          value: 1,
          prefixIcon: <DiscountIcon />,
        },
        {
          content: '操作二',
          value: 2,
          prefixIcon: <DiscountIcon />,
        },
        {
          content: '操作三',
          value: 3,
          prefixIcon: <DiscountIcon />,
        },
        {
          content: '操作四',
          value: 4,
          prefixIcon: <DiscountIcon />,
          children: [
            {
              content: '选项五',
              value: 5,
              prefixIcon: () => <DiscountIcon />,
            },
            {
              content: '选项六',
              value: 6,
              prefixIcon: () => <DiscountIcon />,
            },
          ],
        },
      ],
    };
  },
  methods: {
    clickHandler(data) {
      this.$message.success(`选中【${data.value}】`);
    },
  },
};
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
