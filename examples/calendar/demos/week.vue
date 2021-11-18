<template>
  <div class="tdesign-demo-block-column-large">
    <div class="tdesign-demo-block-column">
      <h3>使用插槽</h3>
      <t-calendar>
        <template #week="scope">
          {{ scope.data.day === 7 ? '星期天' : `星期${scope.data.day}` }}
        </template>
      </t-calendar>
    </div>

    <div class="tdesign-demo-block-column">
      <h3>使用week属性 - Array</h3>
      <t-calendar
        :week="week"
        :first-day-of-week="7"
      />
    </div>

    <div class="tdesign-demo-block-column">
      <h3>使用week属性 - TNode</h3>
      <t-calendar :week="renderWeek" />
    </div>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      week: ['星期1', '星期2', '星期3', '星期4', '星期5', '星期6', '星期天'],
      renderWeek(h, params) {
        if (params.day === 3) return <span style="color:#dd4a68">无加班日</span>;
        if (params.day === 6 || params.day === 7) return <span style="color:#0052d9">放假啦</span>;
        return <span style="color:#000000e6">{ `星期${params.day}` }</span>;
      },
    };
  },
});
</script>
