<template>
  <div class="tdesign-demo-block">
    <t-time-picker @change="timechange" @open="open" @close="close" />
  </div>
</template>

<script>
export default {
  name: 'showSecond',
  data() {
    return {};
  },
  methods: {
    timechange(date, time) {
      console.log(date, time);
    },
    open() {
      console.log('open');
    },
    close() {
      console.log('close');
    },
  },
};
</script>
