<template>
  <t-space direction="vertical" class="tdesign-demo__select-input-collapsed-items">
    <t-select-input
      :value="value"
      :min-collapsed-num="1"
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
          class="tdesign-demo__panel-options-collapsed-items"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>

    <!-- 第一种方式：使用渲染函数 collapsed-items 自定义折叠项 -->
    <t-select-input
      :value="value"
      :min-collapsed-num="2"
      :collapsed-items="renderCollapsedItems"
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
          class="tdesign-demo__panel-options-collapsed-items"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>

    <!-- 第二种方式：使用插槽 collapsedItems 自定义折叠项 -->
    <t-select-input
      :value="value"
      :min-collapsed-num="3"
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      placeholder="请选择"
      allow-input
      clearable
      multiple
      @tag-change="onTagChange"
    >
      <template #collapsedItems="{ collapsedTags }">
        <t-popup>
          <t-tag>More({{ collapsedTags.length }})</t-tag>
          <template #content>
            <t-tag v-for="item in collapsedTags" :key="item" style="margin: 4px 4px 4px 0">
              {{ item }}
            </t-tag>
          </template>
        </t-popup>
      </template>
      <template #panel>
        <t-checkbox-group
          :value="checkboxValue"
          :options="options"
          class="tdesign-demo__panel-options-collapsed-items"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>
  </t-space>
</template>
<script setup lang="jsx">
import { ref, computed } from 'vue';
import { Tag } from 'tdesign-vue';

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
const options = ref([...OPTIONS]);
const value = ref(OPTIONS.slice(1));
const checkboxValue = computed(() => {
  const arr = [];
  const list = value.value;
  // 此处不使用 forEach，减少函数迭代
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].value && arr.push(list[i].value);
  }
  return arr;
});
const onCheckedChange = (val, { current, type }) => {
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
  if (trigger === 'enter') {
    const current = {
      label: item,
      value: item,
    };
    value.value.push(current);
    options.value = options.value.concat(current);
  }
};
const renderCollapsedItems = (_, { collapsedTags }) => <Tag>更多({collapsedTags.length})</Tag>;
</script>
<style>
.tdesign-demo__panel-options-collapsed-items {
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tdesign-demo__panel-options-collapsed-items .t-checkbox {
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

.tdesign-demo__panel-options-collapsed-items .t-checkbox:hover {
  background-color: var(--td-bg-color-container-hover);
}
</style>
