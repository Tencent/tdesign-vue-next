<template>
  <div>
    <!-- :popup-props="{ trigger: 'hover' }" -->
    <!-- 前置内容使用 label 自定义，支持同名插槽 label -->
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      label="前置内容："
      style="width: 300px"
      placeholder="Please Select"
      clearable
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
    >
      <template #panel>
        <ul class="tdesign-demo__selet-input-ul-label-suffix">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            <img src="/favicon.ico" /> {{ item.label }}
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
      suffix="单位：元"
      style="width: 300px"
      placeholder="Please Select"
      clearable
      @popup-visible-change="onPopupVisibleChange2"
      @clear="onClear"
    >
      <template #panel>
        <ul class="tdesign-demo__selet-input-ul-label-suffix">
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
    const selectValue = ref({ label: 'tdesign-vue', value: 1 });

    const popupVisible = ref(false);
    const popupVisible2 = ref(false);

    const onOptionClick = (item) => {
      selectValue.value = item;
      // 选中后立即关闭浮层
      popupVisible.value = false;
      popupVisible2.value = false;
    };

    const onClear = () => {
      selectValue.value = undefined;
    };

    const onPopupVisibleChange = (val, context) => {
      console.log(context);
      popupVisible.value = val;
    };

    const onPopupVisibleChange2 = (val, context) => {
      popupVisible2.value = val;
    };

    return {
      selectValue,
      options: OPTIONS,
      popupVisible,
      popupVisible2,
      onOptionClick,
      onClear,
      onPopupVisibleChange,
      onPopupVisibleChange2,
    };
  },
});
</script>

<style>
.tdesign-demo__selet-input-ul-label-suffix,
.tdesign-demo__selet-input-ul-label-suffix > li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tdesign-demo__selet-input-ul-label-suffix > li {
  line-height: 40px;
  min-width: 200px;
  padding: 0 8px;
}

.tdesign-demo__selet-input-ul-label-suffix > li:hover {
  background-color: var(--td-bg-color-container-hover);
}

.tdesign-demo__selet-input-ul-label-suffix > li > img {
  max-width: 20px;
  max-height: 20px;
  vertical-align: middle;
  margin-right: 8px;
}
</style>
