<template>
  <div>
    <t-pagination
      :total="645"
      v-model:pageSize="pageSize"
      v-model="current"
      @change="onChange"
      @pageSizeChange="onPagesizeChange"
      show-jumper
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
  methods: {
    onChange(index, event) {
      console.log(`转到第${index}页`);
      console.log(event);
    },
    onPagesizeChange(pageSize, event) {
      console.log(`${pageSize}`);
      console.log(event);
    },
  },
};
</script>
