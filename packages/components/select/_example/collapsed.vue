<template>
  <t-space direction="vertical">
    <h3>default:</h3>
    <!-- 选项过多时，可折叠 -->
    <t-select v-model="value1" placeholder="请选择" multiple :min-collapsed-num="minCollapsedNum" :options="options" />

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
    <!-- 自定义折叠项内容，collapsedItems 为渲染函数 -->
    <t-select
      v-model="value1"
      :options="options"
      multiple
      :min-collapsed-num="minCollapsedNum"
      :collapsed-items="collapsedItems"
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
    />

    <!-- 自定义折叠项内容，collapsedItems 为 插槽(slot) -->
    <t-select
      v-model="value1"
      :options="options"
      multiple
      :min-collapsed-num="minCollapsedNum"
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
    >
      <template #collapsedItems="{ value: v, collapsedSelectedItems: collapsedSelectedItemsV, onClose }">
        <CollapsedItemsRender
          :collapsed-selected-items="collapsedSelectedItemsV"
          :style="{ marginRight: '4px' }"
          :value="v"
          :min-collapsed-num="minCollapsedNum"
          :size="size"
          :disabled="disabled"
          :closable="!readonly && !disabled"
          @close="onClose"
        />
      </template>
    </t-select>
  </t-space>
</template>
<script setup lang="jsx">
import { defineComponent, computed, ref } from 'vue';

const options = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
  },
];

const value1 = ref(['1', '3']);
const size = ref('medium');
const disabled = ref(false);
const readonly = ref(false);
const minCollapsedNum = ref(1);

// Function
const collapsedItems = (h, { value, onClose, collapsedSelectedItems }) => {
  if (!(value instanceof Array)) return null;
  const count = value.length - minCollapsedNum.value;
  if (count <= 0) return null;
  return (
    <t-popup
      v-slots={{
        content: () => (
          <>
            {collapsedSelectedItems.map((item, index) => (
              <t-tag
                key={item.value}
                style={{ marginRight: '4px' }}
                size={size.value}
                disabled={disabled.value}
                closable={!readonly.value && !disabled.value}
                onClose={(context) => onClose({ e: context.e, index: minCollapsedNum.value + index })}
              >
                {item.label}
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
  props: ['value', 'minCollapsedNum', 'collapsedSelectedItems'],
  emits: ['close'],
  setup(props, { attrs, emit }) {
    const count = computed(() => {
      return props.value.length - props.minCollapsedNum;
    });

    return () => {
      if (count.value <= 0) return null;
      return (
        <t-popup
          v-slots={{
            content: () => (
              <>
                {props.collapsedSelectedItems.map((item, index) => (
                  <t-tag
                    {...attrs}
                    key={item.value}
                    onClose={(context) => emit('close', { e: context.e, index: props.minCollapsedNum.value + index })}
                  >
                    {item.label}
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
