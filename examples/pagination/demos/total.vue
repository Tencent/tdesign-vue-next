<template>
  <div>
    <t-pagination
      v-model="current"
      :total="685"
      @change="onChange"
      :page-size="15"
      :show-total="true"
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
