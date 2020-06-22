<template>
  <div>
    <t-pagination
      :total="645"
      :page-size.sync="pageSize"
      v-model="current"
      @change="onChange"
      @pageSizeChange="onPagesizeChange"
      show-sizer
      :page-size-option="[10,20,30,100,200]"
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
