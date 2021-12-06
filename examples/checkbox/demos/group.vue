<template>
  <div class="tdesign-demo-block-column">
    <div>方式一：业务侧自定义全选功能。选中值: {{ value1.join(',') }}</div>
    <div>
      <t-checkbox :checked="checkAll" :indeterminate="indeterminate" :on-change="handleSelectAll">全选</t-checkbox>
    </div>
    <t-checkbox-group v-model="value1" :options="options1" @change="onChange1" />

    <br />
    <div>方式二：组件内置全选功能，使用插槽定义选项。选中值: {{ value2.join(', ') }}</div>
    <t-checkbox-group v-model="value2" @change="onChange2">
      <t-checkbox :check-all="true" label="全选" />
      <t-checkbox value="选项一">选项一</t-checkbox>
      <t-checkbox label="选项二" value="选项二" />
      <t-checkbox label="选项三" value="选项三" />
    </t-checkbox-group>

    <br />
    <div>方式三：组件内置全选功能，使用 `options` 定义选项。选中值: {{ value3.join(', ') }}</div>
    <t-checkbox-group v-model="value3" :options="options2" @change="onChange3" />

    <br />
    <div>方式四：组件内置全选功能，非受控用法</div>
    <t-checkbox-group :default-value="['选项一']" :options="options2" />
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref, computed } from 'vue';

const options1 = [
  { value: '选项一', label: (h) => <div>选项一</div> },
  { value: '选项二', label: '选项二' },
  { value: '选项三', label: '选项三' },
];

const options2 = [
  { label: '全选', checkAll: true },
  { value: '选项一', label: '选项一' },
  { value: '选项二', label: (h) => <div>选项二</div> },
  { value: '选项三', label: '选项三' },
];

export default defineComponent({
  setup() {
    const value1 = ref(['选项一']);
    const value2 = ref(['选项一']);
    const value3 = ref(['选项一', '选项二', '选项三']);

    const checkAll = computed(() => options1.length === value1.value.length);

    const indeterminate = computed(() => !!(options1.length > value1.value.length && value1.value.length));

    const handleSelectAll = (checked) => {
      value1.value = checked ? ['选项一', '选项二', '选项三'] : [];
    };

    return {
      indeterminate,
      checkAll,
      value1,
      value2,
      value3,
      options1,
      options2,
      handleSelectAll,
      onChange1(val) {
        console.log(value1.value, val);
      },
      onChange2(val) {
        console.log(value2.value, val);
      },
      onChange3(val) {
        console.log(value3.value, val);
      },
    };
  },
});
</script>
