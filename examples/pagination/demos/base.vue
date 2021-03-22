<template>
  <div>
    <t-pagination
      v-model="current"
      :total="100"
      @change="onChange"
      :pageSize.sync="pageSize"
      @pageSizeChange="onPageSizeChange"
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
    onPageSizeChange(val) {
      console.log('size:', val);
    },
    onChange(index, event) {
      console.log(`转到第${index}页`);
      console.log(event);
    },
  },
};
</script>
