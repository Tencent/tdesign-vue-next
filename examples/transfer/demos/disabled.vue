<template>
  <div>
    <t-transfer :data="list" :disabled="[false, true]" :default-value="targetValue" />
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
      checked: list.map(item => item.value).filter(v => v % 2 === 0), // 偶数
    };
  },
};
</script>
  