<template>
  <div class="tdesign-tree-base">
    <t-tree :data="[]"/><br>
    <t-tree :data="[]" empty="😊 空数据（string）"/><br>
    <t-tree :data="[]" :empty="empty"/><br>
    <t-tree :data="[]"><br>
      <template #empty>
        <div>😊 空数据（slot）</div>
      </template>
    </t-tree>
  </div>
</template>

<script lang="jsx">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      empty() {
        return <div>😊 空数据（ empty props ）</div>;
      },
    }
  }
});
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>
