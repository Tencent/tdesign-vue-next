<template>
  <div class="tdesign-demo-block-column">
    <div class="tdesign-demo-block-row">
      <t-tag :icon="renderDiscountIcon">默认标签</t-tag>
    </div>
    <div class="tdesign-demo-block-row">
      <t-tag>
        <template #icon>
          <TIconDiscount />
        </template>
        Icon插槽
      </t-tag>
    </div>
  </div>
</template>

<script lang="jsx">
import TIconDiscount from '@tencent/tdesign-vue-next/icon/discount';

export default {
  components: { TIconDiscount },
  methods: {
    renderDiscountIcon() {
      return <TIconDiscount />;
    },
  },
};
</script>

<style lang="less">
</style>
