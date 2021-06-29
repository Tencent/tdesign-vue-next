<template>
  <td-doc-layout>
    <td-header ref="tdHeader" slot="header"></td-header>
    <td-doc-aside ref="tdDocAside" slot="doc-aside" title="Vue3 for Web">
      <td-doc-platforms slot="platforms"></td-doc-platforms>
    </td-doc-aside>

    <router-view />
  </td-doc-layout>
</template>

<script>
import siteConfig from './config';

import { defineComponent } from 'vue';

const { docs: routerList } = JSON.parse(JSON.stringify(siteConfig).replace(/component:.+/g, ''));

export default defineComponent({
  mounted() {
    this.$refs.tdHeader.framework = 'vue-mobile';
    this.$refs.tdDocAside.routerList = routerList;
    this.$refs.tdDocAside.onchange = ({ detail }) => {
      if (this.$route.path === detail) return;
      this.$router.push({ path: detail });
    };
  }
});
</script>
