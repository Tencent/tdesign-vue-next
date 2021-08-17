<template>
  <div>
    <t-select
      :defaultValue="defaultValue"
      clearable
      placeholder="-请选择-"
      :onClear="handleClear"
      style="width: 200px;"
      @change="handleChange"
    >
      <t-option
        v-for="(item, index) in options"
        :value="item.value"
        :label="item.label"
        :key="index"
      >
        {{ item.label }}
      </t-option>
    </t-select>
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
      defaultValue: '1',
    };
  },
  methods: {
    handleChange(value) {
      console.log('handleChange:', value);
    },
    handleClear({ e }) {
      console.log('handleClear:', e);
    },
  },
};
</script>
