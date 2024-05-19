<template>
  <t-space direction="vertical" class="tdesign-demo__select-input-multiple" style="width: 100%">
    <div>
      <t-checkbox v-model="allowInput">是否允许输入</t-checkbox>
      <t-checkbox v-model="creatable">允许创建新选项（Enter 创建）</t-checkbox>
    </div>
    <div>
      <t-radio-group
        v-model="excessTagsDisplayType"
        :options="[
          { label: '选中项过多横向滚动', value: 'scroll' },
          { label: '选中项过多换行显示', value: 'break-line' },
        ]"
      />
    </div>

    <!-- :popup-props="{ trigger: 'hover' }" -->
    <t-select-input
      :input-value:sync="inputValue"
      :value="value"
      :allow-input="allowInput"
      :placeholder="allowInput ? '请选择或输入' : '请选择'"
      :tag-input-props="{ excessTagsDisplayType }"
      :popup-props="{
        overlayInnerClassName: ['narrow-scrollbar'],
        overlayInnerStyle: {
          maxHeight: '280px',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          padding: '6px',
        },
      }"
      clearable
      multiple
      @focus="handleFocus"
      @blur="handleBlur"
      @tag-change="onTagChange"
      @input-change="onInputChange"
      @clear="handleClear"
      @enter="handleEnter"
      @mouseenter="handleMouseenter"
      @change="handleChange"
    >
      <template #panel>
        <t-checkbox-group
          v-if="options.length"
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-multiple"
          @change="onCheckedChange"
        />
        <div v-else class="tdesign-demo__select-empty-multiple">暂无数据</div>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
  </t-space>
</template>
<script setup>
import { ref, computed } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue';

const OPTIONS = [
  // 全选
  {
    label: 'Check All',
    checkAll: true,
  },
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
const excessTagsDisplayType = ref('break-line');
const allowInput = ref(true);
const creatable = ref(true);
const inputValue = ref('');
const options = ref([...OPTIONS]);
const value = ref([
  {
    label: 'Vue',
    value: 1,
  },
  {
    label: 'React',
    value: 2,
  },
  {
    label: 'Miniprogram',
    value: 3,
  },
]);
const checkboxValue = computed(() => {
  const arr = [];
  const list = value.value;
  // 此处不使用 forEach，减少函数迭代
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].value && arr.push(list[i].value);
  }
  return arr;
});
const handleFocus = (value, context) => {
  console.log('focus', value, context);
};
const handleBlur = () => {
  console.log('Blur');
};
const handleClear = () => {
  console.log('Clear');
};
const handleEnter = () => {
  console.log('Enter');
};
const handleMouseenter = () => {
  console.log('Mouseenter');
};
const handleChange = () => {
  console.log('Change');
};
const onCheckedChange = (val, { current, type }) => {
  console.log(current);
  // current 不存在，则表示操作全选
  if (!current) {
    value.value = type === 'check' ? options.value.slice(1) : [];
    return;
  }
  // 普通操作
  if (type === 'check') {
    const option = options.value.find((t) => t.value === current);
    value.value.push(option);
  } else {
    value.value = value.value.filter((v) => v.value !== current);
  }
};
const onTagChange = (currentTags, context) => {
  console.log(currentTags, context);
  const { trigger, index, item } = context;
  if (trigger === 'clear') {
    value.value = [];
  }
  if (['tag-remove', 'backspace'].includes(trigger)) {
    value.value.splice(index, 1);
  }
  // 如果允许创建新条目
  if (creatable.value && trigger === 'enter') {
    const current = {
      label: item,
      value: item,
    };
    value.value.push(current);
    const newOptions = options.value.concat(current);
    options.value = newOptions;
    inputValue.value = '';
  }
};
const onInputChange = (val, context) => {
  console.log(val, context);
};
</script>
<style>
.tdesign-demo__panel-options-multiple {
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tdesign-demo__panel-options-multiple .t-checkbox {
  display: flex;
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
  margin: 0;
}
.tdesign-demo__panel-options-multiple .t-checkbox:hover {
  background-color: var(--td-bg-color-container-hover);
}
</style>
