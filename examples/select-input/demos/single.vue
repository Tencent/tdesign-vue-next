<template>
  <div>
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
        <ul class="tdesign-demo__selet-input-ul">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            <img src="/favicon.ico" /> {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';

const OPTIONS = [
  { label: 'tdesign-vue', value: 1 },
  { label: 'tdesign-react', value: 2 },
  { label: 'tdesign-miniprogram', value: 3 },
  { label: 'tdesign-angular', value: 4 },
  { label: 'tdesign-mobile-vue', value: 5 },
  { label: 'tdesign-mobile-react', value: 6 },
];

export default defineComponent({
  name: 'SelectInputSingle',
  components: { ChevronDownIcon },
  setup() {
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

    return {
      selectValue,
      options: OPTIONS,
      popupVisible,
      onOptionClick,
      onClear,
      onPopupVisibleChange,
    };
  },
});
</script>

<style>
.tdesign-demo__selet-input-ul,
.tdesign-demo__selet-input-ul > li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tdesign-demo__selet-input-ul > li {
  line-height: 40px;
  min-width: 200px;
  padding: 0 8px;
}

.tdesign-demo__selet-input-ul > li:hover {
  background-color: var(--td-bg-color-container-hover);
}

.tdesign-demo__selet-input-ul > li > img {
  max-width: 20px;
  max-height: 20px;
  vertical-align: middle;
  margin-right: 8px;
}

.tdesign-demo__select-input-block {
  display: flex;
  align-items: center;
}

.tdesign-demo__select-input-block > label {
  width: 60px;
}
</style>
