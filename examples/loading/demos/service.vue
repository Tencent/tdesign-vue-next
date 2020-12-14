<template>
  <div>
    <div class="switch-demo">
      开启函数方式调用:
      <t-switch v-model="value" @change="onChange"></t-switch>
    </div>
    <div>函数方式调用只支持全屏模式</div>
  </div>
</template>
<script>
export default {
  name: 'loadingBase',
  data() {
    return {
      value: false,
    };
  },
  methods: {
    onChange(value) {
      if (value) {
        this.$loading({ loading: true });
        setTimeout(() => {
          this.value = false;
          this.$loading({ loading: false });
        }, 2000);
      }
    },
  },
};
</script>
<style scoped>
.switch-demo {
  margin-top: 20px;
}
</style>

