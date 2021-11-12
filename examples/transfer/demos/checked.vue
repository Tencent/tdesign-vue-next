<template>
  <div>
    <t-transfer :data="list" v-model:checked="checked" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    value: i,
    label: `内容${i + 1}`,
    disabled: i % 4 < 1,
  });
}
export default defineComponent({
  setup() {
    const checked = ref(list.map((item) => item.value).filter((v) => v % 2 === 0))
    return {
      checked,
      list
    }
  }
});
</script>
