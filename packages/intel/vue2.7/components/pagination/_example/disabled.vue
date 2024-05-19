<template>
  <div>
    <t-pagination v-model="index" disabled show-jumper show-sizer :total="100" :page-size="pageSize" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 1,
      pageSize: 5,
    };
  },
};
</script>
