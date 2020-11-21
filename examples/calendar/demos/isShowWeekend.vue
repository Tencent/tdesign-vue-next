<template>
  <t-calendar
    :isShowWeekendDefault="isShowWeekendDefault"
    @controllerChange="onControllerChange"
  ></t-calendar>
</template>

<script>
export default {
  data() {
    return {
      isShowWeekendDefault: false,
    };
  },
  methods: {
    onControllerChange(data) {
      console.info('控件值变化', data);
    },
  },
};
</script>
