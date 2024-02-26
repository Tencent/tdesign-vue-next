<template>
  <t-select-input
    :value="selectValue"
    :popup-visible="popupVisible"
    :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
    placeholder="Please Select"
    borderless
    clearable
    @popup-visible-change="onPopupVisibleChange"
    @clear="onClear"
  >
    <template #panel>
      <ul class="tdesign-demo__select-input-ul-borderless">
        <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
          {{ item.label }}
        </li>
      </ul>
    </template>
  </t-select-input>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { SelectInputProps } from 'tdesign-vue-next';
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
const onOptionClick = (item: { label: string; value: number }) => {
  selectValue.value = item;
  popupVisible.value = false;
};
const onClear: SelectInputProps['onClear'] = () => {
  selectValue.value = undefined;
};
const onPopupVisibleChange: SelectInputProps['onPopupVisibleChange'] = (val) => {
  popupVisible.value = val;
};
</script>
<style lang="less" scoped>
.tdesign-demo__select-input-ul-borderless {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tdesign-demo__select-input-ul-borderless > li {
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

.tdesign-demo__select-input-ul-borderless > li:hover {
  background-color: var(--td-bg-color-container-hover);
}
</style>
