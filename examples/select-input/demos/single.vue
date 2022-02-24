<template>
  <div>
    <!-- :popup-props="{ trigger: 'hover' }" -->
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      style="width: 300px"
      placeholder="Please Select"
      clearable
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-single">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            <img src="https://tdesign.gtimg.com/site/avatar.jpg" /> {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';

const options = [
  { label: 'tdesign-vue', value: 1 },
  { label: 'tdesign-react', value: 2 },
  { label: 'tdesign-miniprogram', value: 3 },
  { label: 'tdesign-angular', value: 4 },
  { label: 'tdesign-mobile-vue', value: 5 },
  { label: 'tdesign-mobile-react', value: 6 },
];

// const selectValue = ref('tdesign-vue');
const selectValue = ref({ label: 'tdesign-vue', value: 1 });
// const selectValue = ref([{ label: 'tdesign-vue', value: 1 }]);

const popupVisible = ref(false);

const onOptionClick = (item) => {
  selectValue.value = item;
  // 选中后立即关闭浮层
  popupVisible.value = false;
};

const onClear = () => {
  selectValue.value = undefined;
};

const onPopupVisibleChange = (val, context) => {
  console.log(context);
  popupVisible.value = val;
};
</script>
<style>
.tdesign-demo__select-input-ul-single,
.tdesign-demo__select-input-ul-single > li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tdesign-demo__select-input-ul-single > li {
  line-height: 40px;
  min-width: 200px;
  padding: 0 8px;
}

.tdesign-demo__select-input-ul-single > li:hover {
  background-color: var(--td-bg-color-container-hover);
}

.tdesign-demo__select-input-ul-single > li > img {
  max-width: 20px;
  max-height: 20px;
  vertical-align: middle;
  margin-right: 8px;
}
</style>
