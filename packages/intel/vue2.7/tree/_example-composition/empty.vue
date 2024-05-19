<template>
  <t-space :size="32" direction="vertical">
    <t-space direction="vertical">
      <h3>默认为空状态</h3>
      <t-tree :data="[]" />
    </t-space>
    <t-space direction="vertical">
      <h3>设置 empty 属性为指定字符串</h3>
      <t-tree :data="[]" empty="😊 空数据（string）" />
    </t-space>
    <t-space direction="vertical">
      <h3>jsx 形式</h3>
      <t-tree :data="[]" :empty="empty" />
    </t-space>
    <t-space direction="vertical">
      <h3>slot 形式</h3>
      <t-tree :data="[]">
        <template #empty>
          <div>😊 空数据（slot）</div>
        </template>
      </t-tree>
    </t-space>
  </t-space>
</template>

<script setup lang="jsx">
import { ref } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const empty = ref((h) => <div>😊 空数据（ empty props ）</div>);
</script>
