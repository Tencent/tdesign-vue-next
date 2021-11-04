<template>
  <div>
    <!-- 如果 t-step-item 没有传入 value，则使用 index 作为唯一标识 -->
    <t-steps :defaultCurrent="1">
      <t-step-item title="已完成的步骤"></t-step-item>
      <t-step-item title="进行中的步骤"></t-step-item>
      <t-step-item title="未进行的步骤"></t-step-item>
      <t-step-item title="未进行的步骤"></t-step-item>
    </t-steps>
    <br>
    <!-- 使用 options 渲染步骤条 -->
    <t-steps v-model="current" :options="steps"></t-steps>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

const steps = [
  { title: '已完成的步骤', value: 'first', content: '点击切换步骤' },
  { title: '进行中的步骤', value: 'second', content: '点击切换步骤' },
  { title: '进行中的步骤', value: 'third', content: () => '这是进行中的步骤' },
  { title: '已完成的步骤', value: 'forth', content: '点击切换步骤' },
]

export default defineComponent({
  setup() {
    const current = ref('third');

    return {
      current,
      steps
    }
  }
});
</script>
