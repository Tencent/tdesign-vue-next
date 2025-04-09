<template>
  <t-chat ref="chatRef" layout="both" style="height: 350px" :clear-history="false" :reverse="false">
    <template v-for="(item, index) in chatList2" :key="index">
      <t-chat-item
        :avatar="item.avatar"
        :name="item.name"
        :role="item.role"
        :datetime="item.datetime"
        :text-loading="index === 0 && loading"
        :content="item.content"
        :variant="item.role === 'assistant' ? 'outline' : 'base'"
      >
        <template #content>
          <t-chat-reasoning
            v-if="item.reasoning?.length > 0"
            expand-icon-placement="right"
            @expand-change="handleChange(value, { index })"
          >
            <template #header>
              <t-chat-loading text="思考中..." indicator />
            </template>
            <t-chat-content v-if="item.reasoning.length > 0" :content="item.reasoning" />
          </t-chat-reasoning>
          <t-chat-content v-if="item.content.length > 0" :content="item.content" />
        </template>
      </t-chat-item>
    </template>
  </t-chat>
</template>
<script setup lang="jsx">
import { ref } from 'vue';

const loading = ref(false);
// 流式数据加载中
const chatRef = ref(null);

const handleChange = (value, { index }) => {
  console.log('handleChange', value, index);
};
const chatList2 = ref([
  {
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    name: '自己',
    datetime: '今天16:38',
    content: '牛顿第一定律是否适用于所有参考系？',
    role: 'user',
    reasoning: '',
  },
  {
    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
    name: 'TDesignAI',
    datetime: '今天16:38',
    reasoning: `嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。
  `,
    content: ``,
    role: 'assistant',
    duration: 10,
  },
]);
</script>
<style lang="less" scoped></style>
