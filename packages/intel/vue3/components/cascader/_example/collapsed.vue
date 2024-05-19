<template>
  <t-space direction="vertical">
    <h3>default:</h3>
    <t-cascader v-model="value1" :options="options" :on-remove="handleBlur" multiple :min-collapsed-num="1" />

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
    <t-cascader
      v-model="value1"
      :options="options"
      multiple
      :min-collapsed-num="minCollapsedNum"
      :collapsed-items="collapsedItems"
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
    />
    <t-cascader
      v-model="value1"
      :options="options"
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
    </t-cascader>
  </t-space>
</template>

<script lang="jsx" setup>
import { defineComponent, computed, ref } from 'vue';

const options = [
  {
    label: '选项一',
    value: '1',
    children: [
      {
        label: '子选项一',
        value: '1.1',
      },
      {
        label: '子选项二',
        value: '1.2',
      },
      {
        label: '子选项三',
        value: '1.3',
      },
    ],
  },
  {
    label: '选项二',
    value: '2',
    children: [
      {
        label: '子选项一',
        value: '2.1',
      },
      {
        label: '子选项二',
        value: '2.2',
      },
    ],
  },
];

const value1 = ref(['1.1', '1.2', '1.3']);
const size = ref('medium');
const disabled = ref(false);
const readonly = ref(false);
const minCollapsedNum = ref(1);

const handleBlur = (e) => {
  console.log(e);
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
