<template>
  <t-divider>Button</t-divider>
  <t-button theme="primary">
    111
  </t-button>
  <t-button theme="danger">
    111
  </t-button>
  <t-divider>Divider</t-divider>
  <t-divider align="left">
    TDesign
  </t-divider>
  <div>
    <span>正直</span>
    <t-divider theme="vertical" />
    <span>进取</span>
    <t-divider theme="vertical" />
    <span>合作</span>
    <t-divider theme="vertical" />
    <span>创新</span>
  </div>
  <t-divider>Popup</t-divider>
  <t-popup
    content="popup内容"
    placement="bottom-left"
    trigger="hover"
  >
    <t-button>hover我试试</t-button>
  </t-popup>

  <t-divider>CheckBox</t-divider>
  <t-checkbox>默认状态</t-checkbox>
  <t-checkbox :checked="true">
    选中状态
  </t-checkbox>

  <t-divider>Select</t-divider>
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
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    console.log(1);
  },
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
});
</script>

<style >
html, body {
  padding: 30px;
}
</style>
