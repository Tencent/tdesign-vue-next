<template>
  <div class="tdesign-demo-select-base">
    <!-- 方式一：直接传 options 数据，比插槽的方式更简单 -->
    <t-select v-model="value1" :options="options" placeholder="请选择城市" />

    <!-- 方式二：使用插槽节点 -->
    <t-select v-model="value2" placeholder="-请选择-" style="width: 200px">
      <t-option-group
        v-for="(list, index) in options"
        :key="index"
        :label="typeof list.group === 'object' ? list.group.label : list.group"
        divider
      >
        <t-option v-for="item in list.children" :key="item.value" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-option-group>
    </t-select>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  {
    group: '热门城市',
    children: [
      { label: '北京市', value: 1 },
      { label: '上海市', value: 2 },
    ],
  },
  {
    group: '广东省',
    children: [
      { label: '广州市', value: 4 },
      { label: '深圳市', value: 5 },
      { label: '东莞市', value: 6 },
    ],
  },
  {
    group: '江苏省',
    divider: true,
    children: [
      { label: '南京市', value: 7 },
      { label: '苏州市', value: 8 },
      { label: '无锡市', value: 9 },
    ],
  },
];

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    return {
      value1,
      value2,
      options,
    };
  },
});
</script>
<style scoped>
.tdesign-demo-select-base {
  width: 450px;
  display: flex;
}

.tdesign-demo-select-base .t-select-wrap + .t-select-wrap {
  margin-left: 36px;
}
</style>
