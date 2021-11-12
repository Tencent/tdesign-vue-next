<template>
  <div class="tdesign-tree-select-filterable">
    <div class="operation">
      <t-radio-group v-model="type" variant="default-filled">
        <t-radio-button value="default">默认</t-radio-button>
        <t-radio-button value="function">自定义方法</t-radio-button>
      </t-radio-group>
    </div>
    <t-tree-select
      v-if="type === 'default'"
      v-model="value"
      :data="options"
      clearable
      filterable
      placeholder="请选择"
    />
    <t-tree-select
      v-else
      v-model="value"
      :data="options"
      clearable
      :filter="filterFunction"
      placeholder="请选择"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

const options = [{
  label: '广东省',
  value: 'guangdong',
  children: [{
    label: '广州市',
    value: 'guangzhou',
  }, {
    label: '深圳市',
    value: 'shenzhen',
  }],
}, {
  label: '江苏省',
  value: 'jiangsu',
  children: [{
    label: '南京市',
    value: 'nanjing',
  }, {
    label: '苏州市',
    value: 'suzhou',
  }],
}]

export default defineComponent({
  setup() {
    const value = ref('shenzhen');
    const type = ref('default');

    return {
      value,
      type,
      options,
      filterFunction(searchText, node) {
        return node.data.label.indexOf(searchText) >= 0;
      },
    }
  }
});
</script>
<style scoped>
.tdesign-tree-select-filterable {
  width: 300px;
  margin: 0 20px;
}
.operation {
  margin-bottom: 20px;
}
</style>
