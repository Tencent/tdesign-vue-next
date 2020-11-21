<template>
  <t-calendar>
    <div slot="head" class="my-head">
      <t-alert theme="info" message="xxx项目日历">
        <t-icon slot="icon" name="calendar"/>
      </t-alert>
    </div>
  </t-calendar>
</template>

<script>
export default {
  methods: {
    getDateStr(dt) {
      const y = dt.getFullYear();
      const m = dt.getMonth();
      const d = dt.getDate();
      return `${y}-${m}-${d}`;
    },
  },
};
</script>

<style scoped>
.my-head {
  margin-bottom: 12px;
}
</style>
