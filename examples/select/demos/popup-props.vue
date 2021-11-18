<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      :popup-props="popupProps"
      style="width: 200px;display: inline-block;"
    />
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      :popup-props="popupProps2"
      style="width: 200px;display: inline-block;margin-left: 20px;"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  {
    label: '已选择的选项',
    value: '1',
  },
  {
    label: '短的选项二',
    value: '2',
  },
  {
    label: '很长很长很很长很长很长的选项三',
    value: '3',
  },
];

export default defineComponent({
  setup() {
    const value = ref('1');
    const popupProps = {
      overlayStyle: {
        width: '300px',
      },
    };

    const popupProps2 = {
      overlayStyle: (trigger) => ({ width: `${trigger.offsetWidth}px` }),
    };
    return {
      value,
      options,
      popupProps,
      popupProps2,
    };
  },
});
</script>
