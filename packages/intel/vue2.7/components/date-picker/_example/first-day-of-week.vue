<template>
  <t-space direction="vertical">
    <t-radio-group v-model="startWeek" variant="default-filled">
      <t-radio-button v-for="i in list" :key="i" :value="i">{{ i }}</t-radio-button>
    </t-radio-group>

    <t-date-picker :first-day-of-week="startWeek" />
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      startWeek: 1,
      list: [1, 2, 3, 4, 5, 6, 7],
    };
  },
};
</script>
