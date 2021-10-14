<template>
  <div>
    <t-cascader class="t-demo-cascader" :options="options" v-model="value" clearable :load="load" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          label: '上海',
          value: '1',
          children: true,
        },
        {
          label: '深圳',
          value: '2',
          children: true,
        },
      ],
      value: '',
    };
  },
  methods: {
    load(node) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 3) {
            nodes = [
              {
                label: `${node.label}.1`,
                children: node.level < 2,
              },
              {
                label: `${node.label}.2`,
                children: node.level < 2,
              },
            ];
          }
          resolve(nodes);
        }, 1000);
      })
    }
  }
};
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
