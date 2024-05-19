<template>
  <div>
    <t-pagination v-model="current" :total="101" :page-size.sync="pageSize" show-jumper />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 20,
      current: 1,
    };
  },
};
</script>
