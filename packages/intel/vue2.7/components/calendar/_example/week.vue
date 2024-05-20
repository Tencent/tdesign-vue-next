<template>
  <div class="tdesign-demo-block-column-large">
    <t-space direction="vertical">
      <h3>使用插槽</h3>
      <t-calendar>
        <template slot="week" slot-scope="scope">
          {{ scope.day === 7 ? '星期天' : `星期${scope.day}` }}
        </template>
      </t-calendar>
    </t-space>

    <t-space direction="vertical">
      <h3>使用week属性 - Array</h3>
      <t-calendar :week="week" :firstDayOfWeek="7"></t-calendar>
    </t-space>

    <t-space direction="vertical">
      <h3>使用week属性 - TNode</h3>
      <t-calendar :week="renderWeek"></t-calendar>
    </t-space>
  </div>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      week: ['星期1', '星期2', '星期3', '星期4', '星期5', '星期6', '星期天'],
    };
  },
  methods: {
    renderWeek(h, params) {
      if (params.day === 3) return <span style="color:#dd4a68">周三啦</span>;
      if (params.day === 6 || params.day === 7) return <span style="color:#0052d9">放假啦</span>;
      return <span>{`星期${params.day}`}</span>;
    },
  },
};
</script>
