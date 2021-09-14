<template>
  <div>
    <t-transfer :data="list" v-model:checked="checked" />
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
      checked: list.map((item) => item.value).filter((v) => v % 2 === 0), // 偶数
    };
  },
};
</script>
