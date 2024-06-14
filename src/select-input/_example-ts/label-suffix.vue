<template>
  <!-- :popup-props="{ trigger: 'hover' }" -->
  <!-- 前置内容使用 label 自定义，支持同名插槽 label -->
  <t-select-input
    :value="selectValue"
    :popup-visible="popupVisible"
    :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
    label="前置内容："
    style="width: 300px"
    placeholder="Please Select"
    clearable
    @popup-visible-change="onPopupVisibleChange"
    @clear="onClear"
  >
    <template #panel>
      <ul class="tdesign-demo__select-input-ul-label-suffix">
        <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
          {{ item.label }}
        </li>
      </ul>
    </template>
    <!-- 后置图标 -->
    <template #suffixIcon>
      <chevron-down-icon />
    </template>
  </t-select-input>
  <br /><br />

  <!-- 后置内容使用 suffix 自定义，支持同名插槽 suffix -->
  <t-select-input
    :value="selectValue"
    :popup-visible="popupVisible2"
    :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
    suffix="单位：元"
    style="width: 300px"
    placeholder="Please Select"
    clearable
    @popup-visible-change="onPopupVisibleChange2"
    @clear="onClear"
  >
    <template #panel>
      <ul class="tdesign-demo__select-input-ul-label-suffix">
        <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
          {{ item.label }}
        </li>
      </ul>
    </template>
    <template #suffixIcon>
      <chevron-down-icon />
    </template>
  </t-select-input>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { SelectInputProps } from 'tdesign-vue-next';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
const options = [
  {
    label: 'tdesign-vue',
    value: 1,
  },
  {
    label: 'tdesign-react',
    value: 2,
  },
  {
    label: 'tdesign-miniprogram',
    value: 3,
  },
  {
    label: 'tdesign-angular',
    value: 4,
  },
  {
    label: 'tdesign-mobile-vue',
    value: 5,
  },
  {
    label: 'tdesign-mobile-react',
    value: 6,
  },
];
const selectValue = ref<{
  label: string;
  value: number;
}>({
  label: 'tdesign-vue',
  value: 1,
});
const popupVisible = ref(false);
const popupVisible2 = ref(false);
const onOptionClick = (item: { label: string; value: number }) => {
  selectValue.value = item;
  // 选中后立即关闭浮层
  popupVisible.value = false;
  popupVisible2.value = false;
};
const onClear: SelectInputProps['onClear'] = () => {
  selectValue.value = undefined;
};
const onPopupVisibleChange: SelectInputProps['onPopupVisibleChange'] = (val, context) => {
  console.log(context);
  popupVisible.value = val;
};
const onPopupVisibleChange2: SelectInputProps['onPopupVisibleChange'] = (val, context) => {
  console.log(context);
  popupVisible2.value = val;
};
</script>
<style lang="less" scoped>
.tdesign-demo__select-input-ul-label-suffix {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tdesign-demo__select-input-ul-label-suffix > li {
  display: block;
  border-radius: 3px;
  line-height: 22px;
  cursor: pointer;
  padding: 3px 8px;
  color: var(--td-text-color-primary);
  transition: background-color 0.2s linear;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tdesign-demo__select-input-ul-label-suffix > li:hover {
  background-color: var(--td-bg-color-container-hover);
}
</style>
