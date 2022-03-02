<template>
  <div class="tdesign-demo__select-input-collapsed-items" style="width: 100%">
    <br />
    <t-select-input
      :value="value"
      :min-collapsed-num="1"
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

    <br /><br /><br />

    <!-- 第一种方式：使用渲染函数 collapsed-items 自定义折叠项 -->
    <t-select-input
      :value="value"
      :min-collapsed-num="2"
      :collapsed-items="renderCollapsedItems"
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

    <br /><br /><br />

    <!-- 第二种方式：使用插槽 collapsedItems 自定义折叠项 -->
    <t-select-input
      :value="value"
      :min-collapsed-num="3"
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
  </div>
</template>
<script setup lang="jsx">
import { computed, ref } from 'vue';
import { Tag } from 'tdesign-vue-next';

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

// 直接 checkboxgroup 组件渲染输出下拉选项
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

// 可以根据触发来源，自由定制标签变化时的筛选器行为
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
    const current = { label: item, value: item };
    value.value.push(current);
    options.value = options.value.concat(current);
  }
};

const renderCollapsedItems = (_, { collapsedTags }) => {
  return <Tag>更多({collapsedTags.length})</Tag>;
};
</script>
<style lang="less">
.tdesign-demo__panel-options-collapsed-items {
  width: 100%;
  padding: 4px 0;
}
.tdesign-demo__panel-options-collapsed-items .t-checkbox {
  display: flex;
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
  margin-top: 4px;
  margin-right: 0;
}

.tdesign-demo__panel-options-collapsed-items .t-checkbox:hover {
  background-color: var(--td-bg-color-container-hover);
}
</style>
