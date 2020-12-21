<template>
  <div>
    <t-pagination
      :total="645"
      :page-size.sync="pageSize"
      v-model="current"
      :on-page-size-change="onPageSizeChange"
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
      onPageSizeChange: (pageSize, event) => {
        console.log('fire on prop');
        console.log(`${pageSize}`);
        console.log(event);
      },
    };
  },
  methods: {
    onPagesizeChange(pageSize, event) {
      console.log('fire on event');
      console.log(`${pageSize}`);
      console.log(event);
    },
  },
};
</script>
