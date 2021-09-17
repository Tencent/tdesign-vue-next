<template>
  <div>
    <div>

      <t-textarea
        v-model="value"
        placeholder="请输入描述文案"
        name="description"
        @change="onChange"
      ></t-textarea>

      <t-textarea
        v-model="value2"
        placeholder="请输入文案，高度可自适应；autosize=true"
        name="description"
        :autosize="true"
      ></t-textarea>

      <t-textarea
        v-model="value3"
        placeholder="请输入文案，高度可自适应，最小3行，最大5行；autosize={minRows: 3, maxRows: 5}"
        name="description"
        :autosize="{minRows: 3, maxRows: 5}"
      ></t-textarea>

    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      value2: '',
      value3: '',
    };
  },
  methods: {
    onChange(value, e) {
      console.log('onChange：', value, e);
    },
    onChange2(value, e) {
      console.log('onChange2：', value, e);
    },

  },
};
</script>
<style></style>
