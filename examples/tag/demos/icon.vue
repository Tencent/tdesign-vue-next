<template>
  <div class="tdesign-demo-block-column">
    <div class="tdesign-demo-block-row">
      <t-tag :icon="renderDiscountIcon"> 默认标签 </t-tag>
    </div>
    <div class="tdesign-demo-block-row">
      <t-tag>
        <template #icon>
          <discount-icon />
        </template>
        Icon插槽
      </t-tag>
    </div>
  </div>
</template>

<script lang="jsx">
import { defineComponent } from 'vue';
import { DiscountIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: { DiscountIcon },
  setup() {
    return {
      renderDiscountIcon() {
        return <DiscountIcon />;
      },
    };
  },
});
</script>

<style lang="less"></style>
