<template>
  <t-space direction="vertical">
    <h3>default:</h3>
    <t-tree-select
      v-model="value1"
      :data="options"
      class="demo-space"
      multiple
      clearable
      placeholder="请选择"
      :min-collapsed-num="1"
    >
    </t-tree-select>

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
    <t-tree-select
      v-model="value1"
      :data="options"
      multiple
      :min-collapsed-num="minCollapsedNum"
      :collapsed-items="collapsedItems"
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
    >
    </t-tree-select>
    <t-tree-select
      v-model="value1"
      :data="options"
      multiple
      :min-collapsed-num="minCollapsedNum"
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
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
    </t-tree-select>
  </t-space>
</template>
<script setup lang="jsx">
import { defineComponent, computed, ref } from 'vue';

const options = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
      },
      {
        label: '深圳市',
        value: 'shenzhen',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
      },
      {
        label: '苏州市',
        value: 'suzhou',
      },
    ],
  },
];
const value1 = ref(['guangzhou', 'shenzhen']);
const size = ref('medium');
const disabled = ref(false);
const readonly = ref(false);
const minCollapsedNum = ref(1);

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
  props: ['minCollapsedNum', 'value'],
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
