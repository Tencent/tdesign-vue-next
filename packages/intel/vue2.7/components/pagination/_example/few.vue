<template>
  <div>
    <t-pagination v-model="current" :total="49" :on-change="onChange" :page-size="10" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 2,
    };
  },
  methods: {
    onChange(pageInfo) {
      console.log(pageInfo);
    },
  },
};
</script>
