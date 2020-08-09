<template>
  <div>
    <t-dropdown :options="options" :maxColumnHeight="200" :minItemWidth="100" >
      <t-button>hover我试试</t-button>
    </t-dropdown>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    const options = Array.from({ length: 20 }).map((v, k) => ({
      text: `选项${k + 1}`,
      id: k + 1,
    }));
    return {
      options,
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
