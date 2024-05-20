<template>
  <div>
    <t-pagination
      :total="200"
      :page-size.sync="pageSize"
      v-model="current"
      show-jumper
      show-sizer
      :page-size-options="[10, 20, 30, 100, 200]"
    />
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
