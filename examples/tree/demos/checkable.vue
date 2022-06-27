<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-form>
        <t-form-item label="可选" style="margin-bottom: 16px">
          <t-switch v-model="checkable" />
        </t-form-item>
        <t-form-item label="严格模式" style="margin-bottom: 16px">
          <t-switch v-model="checkStrictly" />
        </t-form-item>
        <t-form-item label="选中值模式" style="margin-bottom: 16px">
          <t-radio-group v-model="valueMode" name="value-mode" variant="default-filled">
            <t-radio-button v-for="item in valueOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </t-radio-button>
          </t-radio-group>
        </t-form-item>
        <t-form-item label="value 类型" style="margin-bottom: 16px">
          <t-radio-group v-model="valueType" name="value-type" variant="default-filled">
            <t-radio-button v-for="item in valueTypeOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </t-radio-button>
          </t-radio-group>
        </t-form-item>
      </t-form>
    </div>
    <t-tree
      :data="items"
      hover
      expand-all
      :checkable="checkable"
      :check-strictly="checkStrictly"
      :value-mode="valueMode"
      @change="onChange"
      @click="onClick"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const valueOptions = [
  {
    value: 'onlyLeaf',
    label: 'onlyLeaf',
  },
  {
    value: 'parentFirst',
    label: 'parentFirst',
  },
  {
    value: 'all',
    label: 'all',
  },
];

const valueTypeOptions = [
  {
    value: 'string',
    label: 'string',
  },
  {
    value: 'number',
    label: 'number',
  },
];

const itemsString = [
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '1.1',
        label: '1.1',
        children: [
          {
            value: '1.1.1',
            label: '1.1.1',
            children: [
              {
                value: '1.1.1.1',
                label: '1.1.1.1',
              },
              {
                value: '1.1.1.2',
                label: '1.1.1.2',
              },
            ],
          },
          {
            value: '1.1.2',
            label: '1.1.2',
            children: [
              {
                value: '1.1.2.1',
                label: '1.1.2.1',
              },
              {
                value: '1.1.2.2',
                label: '1.1.2.2',
              },
            ],
          },
        ],
      },
      {
        value: '1.2',
        label: '1.2',
        children: [
          {
            value: '1.2.1',
            label: '1.2.1',
            children: [
              {
                value: '1.2.1.1',
                label: '1.2.1.1',
              },
              {
                value: '1.2.1.2',
                label: '1.2.1.2',
              },
            ],
          },
          {
            value: '1.2.2',
            label: '1.2.2',
            children: [
              {
                value: '1.2.2.1',
                label: '1.2.2.1',
              },
              {
                value: '1.2.2.2',
                label: '1.2.2.2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: '2',
    children: [
      {
        value: '2.1',
        label: '2.1',
      },
      {
        value: '2.2',
        label: '2.2',
      },
    ],
  },
];

const itemsNumber = [
  {
    value: 1,
    label: '1',
    children: [
      {
        value: 1.1,
        label: '1.1',
      },
      {
        value: 1.2,
        label: '1.2',
      },
    ],
  },
  {
    value: 2,
    label: '2',
    children: [
      {
        value: 2.1,
        label: '2.1',
      },
      {
        value: 2.2,
        label: '2.2',
      },
    ],
  },
];

const valueMode = ref('onlyLeaf');
const valueType = ref('string');
const checkable = ref(true);
const checkStrictly = ref(false);
const items = ref(itemsString);

watch(valueType, (type) => {
  items.value = type === 'string' ? itemsString : itemsNumber;
});

const onClick = (context) => {
  console.info('onClick:', context);
};
const onChange = (checked, context) => {
  console.info('onChange:', checked, context);
};
</script>
