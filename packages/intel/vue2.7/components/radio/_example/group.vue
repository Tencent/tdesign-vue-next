<template>
  <t-space direction="vertical">
    <t-space>
      <t-radio-group name="city" v-model="value" :options="options" allowUncheck @change="onChange"></t-radio-group>
    </t-space>

    <t-space>
      <t-radio-group v-model="value2" @change="onChange2">
        <t-radio value="1" allow-uncheck>选项一</t-radio>
        <t-radio value="2">选项二</t-radio>
        <t-radio value="3">选项三</t-radio>
        <t-radio value="4" disabled>选项四</t-radio>
      </t-radio-group>
    </t-space>
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      value2: '',
      options: [
        {
          value: 1,
          label: '选项一',
          allowUncheck: true,
        },
        {
          value: 2,
          label: '选项二',
        },
        {
          value: '3',
          label: '选项三',
        },
        {
          value: '4',
          label: () => '选项四',
        },
      ],
    };
  },
  methods: {
    onChange(checkedValues) {
      console.log('checkedValues:', this.value, checkedValues);
    },
    onChange2(checkedValues) {
      console.log('checkedValues:', this.value2, checkedValues);
    },
  },
};
</script>
