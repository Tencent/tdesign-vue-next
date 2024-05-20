<template>
  <t-space direction="vertical" class="tdesign-demo__select-input-excess-tags-display-type" style="width: 100%">
    <!-- excessTagsDisplayType: 'scroll'，超出时，滚动显示 -->
    <p>第一种呈现方式：超出时滚动显示</p>
    <t-select-input
      :value="value"
      :tag-input-props="{ excessTagsDisplayType: 'scroll' }"
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      placeholder="请选择"
      allow-input
      clearable
      multiple
      @tag-change="onTagChange"
    >
      <template #panel>
        <t-checkbox-group
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-excess-tags-display-type"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>

    <!-- excessTagsDisplayType: 'scroll'，超出时，换行显示 -->
    <p>第二种呈现方式：超出时换行显示</p>
    <t-select-input
      :value="value"
      :tag-input-props="{ excessTagsDisplayType: 'break-line' }"
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      placeholder="请选择"
      allow-input
      clearable
      multiple
      @tag-change="onTagChange"
    >
      <template #panel>
        <t-checkbox-group
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-excess-tags-display-type"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>
  </t-space>
</template>
<script>
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
  data() {
    return {
      options: [...OPTIONS],
      value: OPTIONS.slice(1),
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
    onCheckedChange(val, { current, type }) {
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
      if (trigger === 'enter') {
        const current = { label: item, value: item };
        this.value.push(current);
        this.options = this.options.concat(current);
      }
    },
  },
};
</script>
<style>
.tdesign-demo__panel-options-excess-tags-display-type {
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tdesign-demo__panel-options-excess-tags-display-type .t-checkbox {
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
  margin-right: 0;
}

.tdesign-demo__panel-options-excess-tags-display-type .t-checkbox:hover {
  background-color: var(--td-bg-color-container-hover);
}
</style>
