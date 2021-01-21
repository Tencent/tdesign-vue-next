<template>
  <t-pagination
    theme="simple"
    size="small"
    :total="100"
    :page-size.sync="pageSize"
    @change="onChange"
  />
</template>

<script>
export default {
  data() {
    return {
      pageSize: 5,
    };
  },
  methods: {
    onChange(index) {
      console.log(`转到第${index}页`);
    },
  },
};
</script>
