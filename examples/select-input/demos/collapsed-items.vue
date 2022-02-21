<template>
  <div class="tdesign-demo__select-input-multiple" style="width: 100%">
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
          class="tdesign-demo__pannel-options-collapsed"
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
          class="tdesign-demo__pannel-options-collapsed"
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
          <t-tag>More({{ collapsedTags?.length }})</t-tag>
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
          class="tdesign-demo__pannel-options-collapsed"
          @change="onCheckedChange"
        />
      </template>
    </t-select-input>
  </div>
</template>

<script lang="jsx">
import { computed, defineComponent, ref } from 'vue';
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

export default defineComponent({
  name: 'SelectInputMultiple',
  setup() {
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

    return {
      value,
      checkboxValue,
      options,
      onCheckedChange,
      onTagChange,
      renderCollapsedItems,
    };
  },
});
</script>

<style>
.tdesign-demo__pannel-options-collapsed {
  width: 100%;
}
.tdesign-demo__pannel-options-collapsed .t-checkbox {
  display: block;
  margin: 12px;
}
</style>
