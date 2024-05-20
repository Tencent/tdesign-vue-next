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
<script>
import { ChevronDownIcon } from 'tdesign-icons-vue';

const OPTIONS = [
  // 全选
  { label: 'Check All', checkAll: true },
  { label: 'tdesign-vue', value: 1 },
  { label: 'tdesign-react', value: 2 },
  { label: 'tdesign-miniprogram', value: 3 },
  { label: 'tdesign-angular', value: 4 },
  { label: 'tdesign-mobile-vue', value: 5 },
  { label: 'tdesign-mobile-react', value: 6 },
];

export default {
  components: {
    ChevronDownIcon,
  },
  data() {
    return {
      excessTagsDisplayType: 'break-line',
      allowInput: true,
      creatable: true,
      inputValue: '',
      options: [...OPTIONS],
      value: [
        { label: 'Vue', value: 1 },
        { label: 'React', value: 2 },
        { label: 'Miniprogram', value: 3 },
      ],
    };
  },
  computed: {
    checkboxValue() {
      const arr = [];
      const list = this.value;
      // 此处不使用 forEach，减少函数迭代
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].value && arr.push(list[i].value);
      }
      return arr;
    },
  },
  methods: {
    handleFocus(value, context) {
      console.log('focus', value, context);
    },
    handleBlur() {
      console.log('Blur');
    },
    handleClear() {
      console.log('Clear');
    },
    handleEnter() {
      console.log('Enter');
    },
    handleMouseenter() {
      console.log('Mouseenter');
    },
    handleChange() {
      console.log('Change');
    },
    onCheckedChange(val, { current, type }) {
      console.log(current);
      // current 不存在，则表示操作全选
      if (!current) {
        this.value = type === 'check' ? this.options.slice(1) : [];
        return;
      }
      // 普通操作
      if (type === 'check') {
        const option = this.options.find((t) => t.value === current);
        this.value.push(option);
      } else {
        this.value = this.value.filter((v) => v.value !== current);
      }
    },
    onTagChange(currentTags, context) {
      console.log(currentTags, context);
      const { trigger, index, item } = context;
      if (trigger === 'clear') {
        this.value = [];
      }
      if (['tag-remove', 'backspace'].includes(trigger)) {
        this.value.splice(index, 1);
      }
      // 如果允许创建新条目
      if (this.creatable && trigger === 'enter') {
        const current = { label: item, value: item };
        this.value.push(current);
        const newOptions = this.options.concat(current);
        this.options = newOptions;
        this.inputValue = '';
      }
    },
    onInputChange(val, context) {
      console.log(val, context);
    },
  },
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
