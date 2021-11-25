<template>
  <div>
    <t-pagination v-model="current" v-model:pageSize="pageSize" :total="685" :total-content="true" @change="onChange" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 12,
      pageSize: 15,
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
