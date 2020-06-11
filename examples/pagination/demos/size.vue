<template>
  <div>
    <h2>Small</h2>
    <t-pagination
      size="small"
      :total="100"
      @change="onChange"
      :page-size="5"
    />

    <h2>Large</h2>
    <t-pagination
      :total="100"
      @change="onChange"
      :page-size="5"
    />

    <h2>Larger</h2>
    <t-pagination
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
