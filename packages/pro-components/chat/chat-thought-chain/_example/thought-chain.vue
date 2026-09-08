<template>
  <t-chat-thought-chain :items="items" :default-expanded-value="['search']" @expand-change="onExpandChange" />
</template>
<script setup>
const items = [
  {
    key: 'analyze',
    title: '分析用户问题',
    content: '拆解用户意图：需要对比 3 款产品在性能、价格、生态上的差异。',
    status: 'success',
  },
  {
    key: 'search',
    title: '检索相关资料',
    content: '已检索 12 篇文档，筛选出 4 篇高相关内容作为回答依据。',
    status: 'success',
  },
  {
    key: 'plan',
    title: '生成回答计划',
    content: '按"结论先行 + 维度对比表格 + 选型建议"的结构组织回答。',
    status: 'processing',
  },
  {
    key: 'answer',
    title: '输出最终回答',
    status: 'pending',
  },
];

const onExpandChange = (value, context) => {
  console.log('expand-change', value, context);
};
</script>
