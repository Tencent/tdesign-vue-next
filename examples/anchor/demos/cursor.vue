<template>
  <div class="anchor-demo">
    <t-anchor :bounds="150">
      <template #cursor>
        <div class="test-cursor" />
      </template>
      <t-anchor-item :href="`#${path}#default`" title="定义" />
      <t-anchor-item :href="`#${path}#multiple`" title="服务功能" />
      <t-anchor-item :href="`#${path}#small`" title="使用指南" />
      <t-anchor-item :href="`#${path}#large`" title="创建签名" />
      <t-anchor-item :href="`#${path}#container`" title="创建内容" />
      <t-anchor-item :href="`#${path}#anchor-target-6`" title="保密协议" />
      <t-anchor-item :href="`#${path}#anchor-target-7`" title="其他" />
    </t-anchor>
  </div>
</template>
<script>
import { defineComponent, computed, getCurrentInstance } from 'vue';
import get from 'lodash/get';

export default defineComponent({
  setup() {
    const { ctx } = getCurrentInstance();
    const path = computed(() => get(ctx, '$route.path', ''));
    return { path };
  },
});
</script>
<style lang="less" scoped>
.anchor-demo {
  border: 1px solid transparent;
  padding: 20px;
  margin: -20px;

  .test-cursor {
    width: 10px;
    height: 10px;
    background-color: #0052d9;
    position: absolute;
    border-radius: 50%;
    left: 50%;
    margin-left: -5px;
    top: 50%;
    margin-top: -5px;
  }
}
</style>

<style>
/* 全局修改 */
/* .t-anchor .cursor-wrapper .cursor {
  width: 10px;
  height: 10px;
  background-color: #0052D9;
  position: absolute;
  border-radius: 50%;
  left: 50%;
  margin-left: -5px;
  top: 50%;
  margin-top: -5px;
} */
</style>
