<template>
  <div>
    <t-select-input :value="value" variant="tag">
      <template #content>
        <t-checkbox-group :options="options" />
      </template>
    </t-select-input>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      value: ['Vue', 'React', 'Miniprogram'],
      options: [
        { label: 'tdesign-vue', value: 1 },
        { label: 'tdesign-react', value: 2 },
        { label: 'tdesign-miniprogram', value: 3 },
        { label: 'tdesign-angular', value: 4 },
        { label: 'tdesign-mobile-vue', value: 5 },
        { label: 'tdesign-mobile-react', value: 6 },
      ],
    };
  },
});
</script>
