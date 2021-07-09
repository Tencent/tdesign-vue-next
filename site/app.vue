<template>
  <td-doc-layout>
    <td-header ref="tdHeader" slot="header"></td-header>
    <td-doc-aside ref="tdDocAside" slot="doc-aside" title="Vue3 for Web"></td-doc-aside>

    <router-view :docType="docType" />
  </td-doc-layout>
</template>

<script>
import siteConfig from './config';

import { defineComponent } from 'vue';

const { docs: routerList } = JSON.parse(JSON.stringify(siteConfig).replace(/component:.+/g, ''));

export default defineComponent({
  data() {
    return {
      docType: '',
    };
  },

  mounted() {
    this.docType = this.$route.meta.docType;
    this.$refs.tdHeader.framework = 'vue-mobile';
    this.$refs.tdDocAside.routerList = routerList;
    this.$refs.tdDocAside.onchange = ({ detail }) => {
      if (this.$route.path === detail) return;
      this.$router.push({ path: detail });
    };
  },

  watch: {
    $route(route) {
      if (!route.meta.docType) return;
      this.docType = route.meta.docType;
    }
  },
});
</script>
