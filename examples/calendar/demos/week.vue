
<template>
  <div>
    <h1>使用插槽</h1>
    <t-calendar>
      <template #week="scope">
        {{ scope.data.day === 7 ? '星期天' : `星期${scope.data.day}` }}
      </template>
    </t-calendar>

    <br>

    <h1>使用week属性 - Array</h1>
    <t-calendar :week="week" :firstDayOfWeek="7">
    </t-calendar>

    <br>

    <h1>使用week属性 - TNode</h1>
    <t-calendar :week="renderWeek">
    </t-calendar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      week: ['星期1', '星期2', '星期3', '星期4', '星期5', '星期6', '星期天'],
    };
  },
  methods: {
    renderWeek(h, params) {
      if (params.day === 3) return <span style="color:#dd4a68">无加班日</span>;
      if (params.day === 6 || params.day === 7) return <span style="color:#0052d9">放假啦</span>;
      return <span style="color:#000000e6">{ `星期${params.day}` }</span>;
    },
  },
};
</script>
