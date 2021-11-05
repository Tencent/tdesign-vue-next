<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker v-model="date" theme="primary" mode="date" clearable></t-date-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: '2021-11-10'
    }
  }
}
</script>