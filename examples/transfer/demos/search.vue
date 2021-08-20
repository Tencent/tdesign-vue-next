<template>
  <div>
    <t-transfer theme="primary" :data="list" v-model="targetValue" :checked-value="checkedValue" :search="true" />
  </div>
</template>
<script>
const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    key: i.toString(),
    title: `内容${i + 1}`,
    description: `第${i + 1}段信息`,
  });
}
export default {
  data() {
    return {
      list,
      targetValue: [],
      checkedValue: [],
    };
  },
};
</script>
