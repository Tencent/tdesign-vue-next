<template>
  <div>
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      :suffix-icon="suffixIconRender"
      placeholder="Please Select"
      borderless
      clearable
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-borderless">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            <img src="https://tdesign.gtimg.com/site/avatar.jpg" /> {{ item.label }}
          </li>
        </ul>
      </template>
    </t-select-input>
  </div>
</template>
<script setup lang="jsx">
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

const selectValue = ref({ label: 'tdesign-vue', value: 1 });

const popupVisible = ref(false);

const onOptionClick = (item) => {
  selectValue.value = item;
  popupVisible.value = false;
};

const onClear = () => {
  selectValue.value = undefined;
};

const suffixIconRender = () => <ChevronDownIcon />;

const onPopupVisibleChange = (val, context) => {
  popupVisible.value = val;
};
</script>
<style>
.tdesign-demo__select-input-ul-borderless,
.tdesign-demo__select-input-ul-borderless > li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tdesign-demo__select-input-ul-borderless > li {
  line-height: 40px;
  min-width: 200px;
  padding: 0 8px;
}

.tdesign-demo__select-input-ul-borderless > li:hover {
  background-color: var(--td-bg-color-container-hover);
}

.tdesign-demo__select-input-ul-borderless > li > img {
  max-width: 20px;
  max-height: 20px;
  vertical-align: middle;
  margin-right: 8px;
}
</style>
