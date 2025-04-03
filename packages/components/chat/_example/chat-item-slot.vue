<template>
  <t-chat-item role="assistant">
    <template #avatar>
      <t-avatar size="large" shape="circle" image="https://tdesign.gtimg.com/site/chat-avatar.png"
    /></template>
    <template #name><p>AI助手</p></template>
    <template #datetime><p>今天16:38</p></template>
    <template #content>
      <t-chat-content
        content="牛顿第一定律并不适用于所有参考系，它只适用于惯性参考系。在质点不受外力作用时，能够判断出质点静止或作匀速直线运动的参考系一定是惯性参考系，因此只有在惯性参考系中牛顿第一定律才适用。"
      ></t-chat-content>
      <div class="bubble">
        <t-image src="https://tdesign.gtimg.com/demo/demo-image-1.png" shape="round" fit="scale-down" />
        <div class="link">参考链接</div>
        <ul>
          <li>
            <t-link theme="primary"> 维基百科 </t-link>
          </li>
          <li><t-link theme="primary"> 高中物理 </t-link></li>
        </ul>
      </div>
    </template>
    <template #actions>
      <t-chat-action
        :is-good="isGood"
        :is-bad="isBad"
        content="牛顿第一定律并不适用于所有参考系，它只适用于惯性参考系。在质点不受外力作用时，能够判断出质点静止或作匀速直线运动的参考系一定是惯性参考系，因此只有在惯性参考系中牛顿第一定律才适用。"
        @operation="(type, { e }) => handleOperation(type, { e, index })"
      />
    </template>
  </t-chat-item>
</template>
<script setup>
import { ref } from 'vue';
const isGood = ref(false);
const isBad = ref(false);
const handleOperation = (type) => {
  if (type === 'good') {
    isGood.value = !isGood.value;
    isBad.value = false;
  } else if (type === 'bad') {
    isBad.value = !isBad.value;
    isGood.value = false;
  }
};
</script>
<style lang="less">
.bubble {
  margin: 0 0 10px 16px;
  .link {
    margin-top: 10px;
  }
  li {
    color: var(--td-brand-color-7);
  }
}
.t-image__wrapper {
  background: none;
}
</style>
