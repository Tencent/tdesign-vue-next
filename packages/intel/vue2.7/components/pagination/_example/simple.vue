<template>
  <div>
    <t-pagination theme="simple" :total="100" :page-size.sync="pageSize" />
  </div>
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
