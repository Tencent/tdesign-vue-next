<template>
  <div>
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      placeholder="请输入任意关键词"
      allow-input
      clearable
      style="width: 300px"
      @input-change="onInputChange"
      @popup-visible-change="onPopupVisibleChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-autocomplete">
          <li v-for="item in options" :key="item" @click="() => onOptionClick(item)">
            {{ item }}
          </li>
        </ul>
      </template>
      <template #suffixIcon><search-icon /></template>
    </t-select-input>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { SearchIcon } from 'tdesign-icons-vue-next';

const OPTIONS = ['Student A', 'Student B', 'Student C', 'Student D', 'Student E', 'Student F'];

const popupVisible = ref(false);
const selectValue = ref();
const options = ref(OPTIONS);

const onOptionClick = (item) => {
  selectValue.value = item;
  popupVisible.value = false;
};

const onInputChange = (keyword) => {
  selectValue.value = keyword;
  options.value = new Array(5).fill(null).map((t, index) => `${keyword} Student ${index}`);
};

const onPopupVisibleChange = (val) => {
  popupVisible.value = val;
};
</script>
<style lang="less" scoped>
.tdesign-demo__select-input-ul-autocomplete {
  padding: 4px 0;
}
.tdesign-demo__select-input-ul-autocomplete > li {
  display: block;
  border-radius: 3px;
  height: 40px;
  line-height: 22px;
  cursor: pointer;
  padding: 9px 8px;
  color: var(--td-text-color-primary);
  transition: background-color 0.2s cubic-bezier(0.38, 0, 0.24, 1);
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tdesign-demo__select-input-ul-autocomplete > li:hover {
  background-color: var(--td-bg-color-container-hover);
}
</style>
