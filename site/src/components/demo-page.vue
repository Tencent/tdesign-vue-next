<template>
  <component :is="demo" v-if="demo"></component>
  <ul v-else class="empty-demo">
    <li v-for="demoName in demoList[componentName]" :key="demoName">
      <router-link :to="{ path: `/vue/demos/${componentName}/${demoName}` }">
        <t-button theme="default" variant="text">{{ demoName }}</t-button>
      </router-link>
    </li>
  </ul>
</template>

<script>
const demoReq = import.meta.globEager('../../../examples/**/demos/*.vue');
const demoObject = {};
const demoList = {};
Object.keys(demoReq).forEach((key) => {
  const match = key.match(/([\w-]+).demos.([\w-]+).vue/);
  const [, componentName, demoName] = match;
  demoObject[`${componentName}-${demoName}`] = demoReq[key].default;
  demoList[componentName] = [demoName].concat(demoList[componentName]);
});
export default {
  name: 'Demos',
  components: {
    ...demoObject,
  },
  data() {
    return {
      demo: null,
      demoList,
    };
  },
  computed: {
    componentName() {
      return this.$route.params.componentName;
    },
    currentDemos() {
      return this.demoList[this.componentName].join('<br />');
    },
  },
  watch: {
    $route(v) {
      if (v.name !== 'demos') return;
      this.renderDemo();
    },
  },
  mounted() {
    this.renderDemo();
  },
  methods: {
    renderDemo() {
      const { componentName, demoName } = this.$route.params;
      if (componentName && demoName) {
        this.demo = `${componentName}-${demoName}`;
      } else {
        this.demo = '';
      }
    },
  },
};
</script>

<style scoped>
.empty-demo {
  margin: 48px 240px;
}
</style>
