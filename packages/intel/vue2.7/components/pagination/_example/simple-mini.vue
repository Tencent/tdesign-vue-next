<template>
  <t-pagination theme="simple" size="small" :total="100" :page-size.sync="pageSize" />
</template>

<script>
export default {
  data() {
    return {
      pageSize: 5,
    };
  },
};
</script>
