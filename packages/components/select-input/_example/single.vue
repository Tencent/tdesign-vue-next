<template>
  <!-- :popup-props="{ trigger: 'hover' }" -->
  <t-select-input
    :value="selectValue"
    :popup-visible="popupVisible"
    :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
    style="width: 300px"
    placeholder="Please Select"
    clearable
    allow-input
    @popup-visible-change="onPopupVisibleChange"
    @clear="onClear"
    @focus="onFocus"
    @input-change="onInputChange"
  >
    <template #panel>
      <ul class="tdesign-demo__select-input-ul-single">
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
import { SelectInputProps, SelectInputValue, SelectInputFocusContext } from 'tdesign-vue-next';
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

// const selectValue = ref('tdesign-vue');
const selectValue = ref<{
  label: string;
  value: number;
}>({
  label: 'tdesign-vue',
  value: 1,
});
// const selectValue = ref([{ label: 'tdesign-vue', value: 1 }]);
const popupVisible = ref(false);
const onOptionClick = (item: { label: string; value: number }) => {
  selectValue.value = item;
  // 选中后立即关闭浮层
  popupVisible.value = false;
};
const onClear: SelectInputProps['onClear'] = () => {
  selectValue.value = undefined;
};
const onPopupVisibleChange: SelectInputProps['onPopupVisibleChange'] = (val, context) => {
  console.log(context);
  popupVisible.value = val;
};
const onInputChange: SelectInputProps['onInputChange'] = (val, context) => {
  // 过滤功能
  console.log(val, context);
};
function onFocus(val: SelectInputValue, context: SelectInputFocusContext) {
  console.log('focus:', val, context);
}
</script>
<style lang="less" scoped>
.tdesign-demo__select-input-ul-single {
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 2px;
}
.tdesign-demo__select-input-ul-single > li {
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

.tdesign-demo__select-input-ul-single > li:hover {
  background-color: var(--td-bg-color-container-hover);
}
</style>
