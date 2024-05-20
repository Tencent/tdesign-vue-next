<template>
  <t-space>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      :popupProps="popupProps"
      style="width: 200px; display: inline-block"
    />
    <t-select
      v-model="value2"
      placeholder="-请选择-"
      :options="options2"
      :popupProps="popupProps2"
      style="width: 300px; display: inline-block; margin-left: 20px"
    />
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      value: '1',
      options: [
        {
          label: '固定300px宽度',
          value: '1',
        },
        {
          label: '选项内容超长超长超长超长超长超长超长超长超长超长超长的选项',
          value: '2',
        },
      ],
      // 自定义下拉选项宽度为300px
      popupProps: {
        overlayInnerStyle: {
          width: '300px',
        },
      },

      value2: '1',
      options2: [
        {
          label: '下拉框强制和输入框同宽',
          value: '1',
        },
        {
          label: '选项内容超长超长超长超长超长超长超长超长超长超长超长的选项',
          value: '2',
        },
      ],
      // 定义下拉宽度始终与触发浮层的元素（即select组件）等宽
      popupProps2: {
        overlayInnerStyle: (trigger) => ({ width: `${trigger.offsetWidth}px` }),
      },
    };
  },
};
</script>
