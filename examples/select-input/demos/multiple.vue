<template>
  <div class="tdesign-demo__select-input-multiple" style="width: 100%">
    <t-select-input :value="value" variant="tag">
      <template #content>
        <t-checkbox-group
          :value="value.map((t) => t.value)"
          :options="options"
          class="tdesign-demo__pannel-options"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

const OPTIONS = [
  { label: 'tdesign-vue', value: 1 },
  { label: 'tdesign-react', value: 2 },
  { label: 'tdesign-miniprogram', value: 3 },
  { label: 'tdesign-angular', value: 4 },
  { label: 'tdesign-mobile-vue', value: 5 },
  { label: 'tdesign-mobile-react', value: 6 },
];
export default defineComponent({
  name: 'SelectInputMultiple',
  setup() {
    const value = ref([
      { label: 'Vue', value: 1 },
      { label: 'React', value: 2 },
      { label: 'Miniprogram', value: 3 },
    ]);
    const onCheckedChange = (val, context) => {
      if (context.type === 'check') {
        const option = OPTIONS.find((t) => t.value === context.current);
        value.value.push(option);
      } else {
        const index = OPTIONS.findIndex((t) => t.value === context.current);
        value.value.splice(index, 1);
      }
    };
    return {
      value,
      options: OPTIONS,
      onCheckedChange,
    };
  },
});
</script>

<style>
.tdesign-demo__pannel-options .t-checkbox {
  display: block;
  margin: 12px;
}
</style>
