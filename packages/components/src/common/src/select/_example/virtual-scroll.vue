<template>
  <t-space>
    <!-- 开启虚拟滚动 请为select的panel设定好height 通过popupProps进行透传 -->
    <t-select
      v-model="value"
      :options="options"
      filterable
      placeholder="请选择"
      style="width: 300px"
      :scroll="{ type: 'virtual' }"
      :popup-props="{ overlayInnerStyle: { height: '300px' } }"
    />
    <t-select
      v-model="value2"
      placeholder="请选择"
      style="width: 300px"
      :scroll="{ type: 'virtual' }"
      :popup-props="{ overlayInnerStyle: { height: '300px' } }"
    >
      <template #panelTopContent>
        <div :style="{ position: 'sticky', top: '0', zIndex: 1 }">
          <t-textarea v-model="search" placeholder="请输入关键词搜索" @change="onSearch" />
        </div>
      </template>
      <t-option v-for="(item, index) in optionsRef" :key="index" :label="item.label" :value="item.value"></t-option>
    </t-select>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
const options = [];
for (let i = 0; i < 10000; i++) {
  options.push({ label: `选项${i + 1}`, value: String(i) });
}

const optionsRef = ref(options);

const value = ref('');
const value2 = ref('');
const search = ref('');

const onSearch = () => {
  optionsRef.value = options.filter((item) => item.label.indexOf(search.value) !== -1);
};
</script>
