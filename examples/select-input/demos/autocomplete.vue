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
        <ul class="tdesign-demo__selet-input-ul-autocomplete">
          <li v-for="item in options" :key="item" @click="() => onOptionClick(item)">
            <img src="/favicon.ico" /> {{ item }}
          </li>
        </ul>
      </template>
      <template #suffixIcon><search-icon /></template>
    </t-select-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { SearchIcon } from 'tdesign-icons-vue-next';

const OPTIONS = ['Student A', 'Student B', 'Student C', 'Student D', 'Student E', 'Student F'];

export default defineComponent({
  name: 'SelectInputSingle',
  components: { SearchIcon },
  setup() {
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

    return {
      popupVisible,
      selectValue,
      options,
      onOptionClick,
      onInputChange,
      onPopupVisibleChange,
    };
  },
});
</script>

<style>
.tdesign-demo__selet-input-ul-autocomplete,
.tdesign-demo__selet-input-ul-autocomplete > li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tdesign-demo__selet-input-ul-autocomplete > li {
  line-height: 40px;
  min-width: 200px;
  padding: 0 8px;
}

.tdesign-demo__selet-input-ul-autocomplete > li:hover {
  background-color: var(--td-bg-color-container-hover);
}

.tdesign-demo__selet-input-ul-autocomplete > li > img {
  max-width: 20px;
  max-height: 20px;
  vertical-align: middle;
  margin-right: 8px;
}
</style>
