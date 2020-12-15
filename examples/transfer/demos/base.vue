<template>
  <t-transfer
    :data="list"
    v-model="targetValue"
    @checkChange="checkChange"
  />
</template>
<script>
const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    key: i.toString(),
    title: `内容${i + 1}`,
    description: `第${i + 1}段信息`,
    disabled: i % 4 < 1,
  });
}
export default {
  data() {
    return {
      list,
      targetValue: [],
    };
  },
  methods: {
    checkChange(sourceChecked, targetChecked) {
      console.log('sourceChecked', sourceChecked);
      console.log('targetChecked', targetChecked);
    },
  },
};
</script>
