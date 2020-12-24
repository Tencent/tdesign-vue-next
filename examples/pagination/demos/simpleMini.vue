<template>
  <t-pagination
    theme="simple"
    size="small"
    :total="100"
    :page-size="5"
    @change="onChange"
  />
</template>

<script>
export default {
  methods: {
    onChange(index) {
      console.log(`转到第${index}页`);
    },
  },
};
</script>
