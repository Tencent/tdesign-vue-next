<template>
  <div class="tdesign-demo-block-column">
    <div class="tdesign-demo-block-row">
      <t-tag :icon="renderDiscountIcon"> 默认标签 </t-tag>
    </div>
    <div class="tdesign-demo-block-row">
      <t-tag>
        <template #icon>
          <t-icon name="discount" />
        </template>
        Icon插槽
      </t-tag>
    </div>
  </div>
</template>

<script lang="jsx">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      renderDiscountIcon() {
        return <t-icon name="discount" />;
      },
    };
  },
});
</script>

<style lang="less"></style>
