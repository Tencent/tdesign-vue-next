<template>
  <div>
    <t-pagination
      v-model="current"
      :total="100"
      @change="onChange"
      :page-size="5"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 12,
    };
  },
  methods: {
    onChange(index, event) {
      console.log(`转到第${index}页`);
      console.log(event);
    },
  },
};
</script>
