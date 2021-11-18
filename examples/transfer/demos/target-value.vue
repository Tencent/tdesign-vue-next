<template>
  <div>
    <t-transfer
      v-model="targetValue"
      :data="list"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i.toString(),
    label: `内容${i + 1}`,
  });
}
export default defineComponent({
  setup() {
    const targetValue = ref(list.map((item) => item.value).filter((v) => parseInt(v, 10) % 2 === 0));
    return {
      targetValue,
      list,
    };
  },
});
</script>
