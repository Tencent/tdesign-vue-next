<template>
  <t-steps :current="1" status="process">
    <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
    <t-step-item title="进行中的步骤" content="这里是提示文字"></t-step-item>
    <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
    <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
  </t-steps>
</template>

<script>
export default {
  data() {
    return {
      current: 'third',
      steps: [
        { title: '已完成的步骤', value: 'first', content: '点击切换步骤' },
        { title: '进行中的步骤', value: 'second', content: '点击切换步骤' },
        { title: '进行中的步骤', value: 'third', content: () => '这是进行中的步骤' },
        { title: '已完成的步骤', value: 'forth', content: '点击切换步骤' },
      ],
    };
  },
};
</script>
