<template>
  <t-space direction="vertical" class="tdesign-demo__select-input-collapsed-items">
    <h3>default:</h3>
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

    <h3>use collapsedItems:</h3>
    <t-space>
      <div>size control:</div>
      <t-radio-group :value="size" :options="['small', 'medium', 'large']" @change="(value) => (size = value)" />
    </t-space>
    <t-space>
      <span>disabled control:</span>
      <t-checkbox :checked="disabled" @change="(value) => (disabled = value)" />
    </t-space>
    <t-space>
      <span>readonly control:</span>
      <t-checkbox :checked="readonly" @change="(value) => (readonly = value)" />
    </t-space>
    <!-- 第一种方式：使用渲染函数 collapsed-items 自定义折叠项 -->
    <t-select-input
      :value="value"
      multiple
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      placeholder="请选择"
      allow-input
      :min-collapsed-num="minCollapsedNum"
      :collapsed-items="collapsedItems"
      :tag-input-props="{ size }"
      :disabled="disabled"
      :readonly="readonly"
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
      :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
      placeholder="请选择"
      allow-input
      multiple
      :min-collapsed-num="minCollapsedNum"
      :tag-input-props="{ size }"
      :disabled="disabled"
      :readonly="readonly"
      @tag-change="onTagChange"
    >
      <template #collapsedItems="{ value: v, onClose }">
        <CollapsedItemsRender
          :style="{ marginRight: '4px' }"
          :value="v"
          :min-collapsed-num="minCollapsedNum"
          :size="size"
          :disabled="disabled"
          :closable="!readonly && !disabled"
          @close="onClose"
        />
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
import { defineComponent, computed, ref } from 'vue';

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
const size = ref('medium');
const disabled = ref(false);
const readonly = ref(false);
const minCollapsedNum = ref(1);

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

// Function
const collapsedItems = (h, { value, onClose }) => {
  if (!(value instanceof Array)) return null;
  const count = value.length - minCollapsedNum.value;
  const collapsedTags = value.slice(minCollapsedNum.value, value.length);
  if (count <= 0) return null;
  return (
    <t-popup
      v-slots={{
        content: () => (
          <>
            {collapsedTags.map((item, index) => (
              <t-tag
                key={item}
                style={{ marginRight: '4px' }}
                size={size.value}
                disabled={disabled.value}
                closable={!readonly.value && !disabled.value}
                onClose={(context) => onClose({ e: context.e, index: minCollapsedNum.value + index })}
              >
                {item}
              </t-tag>
            ))}
          </>
        ),
      }}
    >
      <t-tag size={size.value} disabled={disabled.value}>
        Function - More({count})
      </t-tag>
    </t-popup>
  );
};

// Slot Component
const CollapsedItemsRender = defineComponent({
  name: 'CollapsedItemsRender',
  // eslint-disable-next-line vue/require-prop-types
  props: ['value', 'minCollapsedNum'],
  emits: ['close'],
  setup(props, { attrs, emit }) {
    const count = computed(() => {
      return props.value.length - props.minCollapsedNum;
    });
    const collapsedTags = computed(() => {
      return props.value.slice(props.minCollapsedNum, props.value.length);
    });

    return () => {
      if (count.value <= 0) return null;
      return (
        <t-popup
          v-slots={{
            content: () => (
              <>
                {collapsedTags.value.map((item, index) => (
                  <t-tag
                    {...attrs}
                    key={item}
                    onClose={(context) => emit('close', { e: context.e, index: props.minCollapsedNum.value + index })}
                  >
                    {item}
                  </t-tag>
                ))}
              </>
            ),
          }}
        >
          <t-tag {...attrs} closable={false}>
            Slot - More({count.value})
          </t-tag>
        </t-popup>
      );
    };
  },
});
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
