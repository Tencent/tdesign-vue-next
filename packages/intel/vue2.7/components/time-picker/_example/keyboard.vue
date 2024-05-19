<template>
  <t-space direction="vertical">
    <h3>允许输入</h3>
    <t-time-picker v-model="time1" allowInput @blur="blur" @focus="focus" />
    <h3>禁止输入</h3>
    <t-time-picker v-model="time2" :allowInput="false" />
  </t-space>
</template>

<script>
export default {
  name: 'canInput',
  data() {
    return {
      time1: '20:22:33',
      time2: '22:22:22',
    };
  },
  methods: {
    blur(v) {
      console.log('blur');
      console.log(v);
    },
    focus(v) {
      console.log('focus');
      console.log(v);
    },
  },
};
</script>
