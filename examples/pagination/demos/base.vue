<template>
  <div>
    <t-pagination
      v-model="current"
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
      current: 12,
      pageSize: 5,
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
