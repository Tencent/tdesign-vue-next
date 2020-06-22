<template>
  <div>
    <t-pagination
      size="small"
      :total="100"
      @change="onChange"
      :page-size="5"
    />
  </div>
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
