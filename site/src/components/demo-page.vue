<template>
  <component :is="demo" v-if="demo"></component>
  <h1 v-else class="empty-demo">请输入正确的 demo 路径，例如：/vue/demos/:componentName/:demoName</h1>
</template>

<script>
const demoReq = import.meta.globEager('../../../examples/**/demos/*.vue');

const demoObject = {};
Object.keys(demoReq).forEach((key) => {
  const match = key.match(/([\w-]+).demos.([\w-]+).vue/);
  const [, componentName, demoName] = match;

  demoObject[`${componentName}-${demoName}`] = demoReq[key].default;
});

export default {
  components: {
    ...demoObject,
  },

  data() {
    return {
      demo: null,
    };
  },
  mounted() {
    const { componentName, demoName } = this.$route.params;
    this.demo = `${componentName}-${demoName}`;
  },
};
</script>

<style>
.empty-demo {
  margin: 100px 48px;
}
</style>
