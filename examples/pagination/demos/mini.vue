<template>
  <div>
    <t-pagination
      size="small"
      :total="100"
      @change="onChange"
      :page-size.sync="pageSize"
    />
  </div>
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
