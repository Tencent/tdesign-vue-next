<template>
  <t-space direction="vertical">
    <t-cascader v-model="value" :options="options" clearable :load="load" @change="handleChange" />
    <t-cascader
      v-model="value1"
      value-type="full"
      clearable
      :options="options"
      :load="load"
      :input-props="inputProps"
      @change="handleChange1"
    />
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          label: '选项1',
          value: '1',
          children: true,
        },
        {
          label: '选项2',
          value: '2',
          children: true,
        },
      ],
      value: '',
      value1: ['1', '1-1.0', '1-1.0-1.1'],
      inputProps: {
        value: '选项1 / 选项1.1 / 选项1.1.1',
      },
    };
  },
  methods: {
    load(node) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 2) {
            nodes = [
              {
                label: `${node.label}.1`,
                value: `${node.value}-1.${node.level}`,
                children: node.level < 1,
              },
              {
                label: `${node.label}.2`,
                value: `${node.value}-2.${node.level}`,
                children: node.level < 1,
              },
            ];
          }
          resolve(nodes);
        }, 1000);
      });
    },
    handleChange(value) {
      console.log('value', value);
    },
    handleChange1(value, context) {
      const { node } = context;
      const path = node.getPath();
      const labelPath = path.map((item) => item.label).join(' / ');
      this.inputProps.value = labelPath;
      console.log('value1', value);
    },
  },
};
</script>
