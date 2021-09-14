<template>
  <div>
    <t-transfer :data="list" :disabled="[false, true]" :default-value="targetValue" />
  </div>
</template>
<script>
const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i,
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}
export default {
  data() {
    return {
      list,
      targetValue: list.map((item) => item.value).filter((v) => parseInt(v, 10) % 2 === 0), // 偶数
    };
  },
};
</script>
