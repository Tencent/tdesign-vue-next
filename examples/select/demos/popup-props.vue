<template>
  <div>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      :popupProps="popupProps"
      style="width: 200px;display: inline-block;"
    />
    <!-- <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      :popupProps="popupProps2"
      style="width: 200px;display: inline-block;margin-left: 20px;"
    /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
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
      ],
      // 自定义下拉选项宽度为300px
      popupProps: {
        overlayStyle: {
          width: '300px',
        },
      },
      // 定义下拉宽度始终与触发浮层的元素（即select组件）等宽
      popupProps2: {
        overlayStyle: (trigger) => ({ width: `${trigger.offsetWidth}px` }),
      },
      value: '1',
    };
  },
};
</script>
