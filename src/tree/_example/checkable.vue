<template>
  <t-space direction="vertical">
    <t-form>
      <t-form-item label="可选">
        <t-switch v-model="checkable" />
      </t-form-item>
      <t-form-item label="严格模式">
        <t-switch v-model="checkStrictly" />
      </t-form-item>
      <t-form-item label="选中值模式">
        <t-radio-group v-model="valueMode" name="value-mode" variant="default-filled">
          <t-radio-button v-for="item in valueOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </t-radio-button>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="value 类型">
        <t-radio-group v-model="valueType" name="value-type" variant="default-filled">
          <t-radio-button v-for="item in valueTypeOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </t-radio-button>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="value 别名">
        <t-radio-group v-model="valueAlias" name="value-type" variant="default-filled">
          <t-radio-button v-for="item in valueAliasOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </t-radio-button>
        </t-radio-group>
      </t-form-item>
    </t-form>
    <t-tree
      :data="items"
      hover
      expand-all
      :keys="keys"
      :checkable="checkable"
      :check-strictly="checkStrictly"
      :value-mode="valueMode"
      @change="onChange"
      @click="onClick"
    />
  </t-space>
</template>

<script setup lang="ts">
import { TreeNodeModel } from 'tdesign-vue-next';
import { ref, watch } from 'vue';

type ItemsString = {
  value: string;
  label: string;
  children: {
    value: string;
    label: string;
    children?: {
      value: string;
      label: string;
      children: {
        value: string;
        label: string;
      }[];
    }[];
  }[];
};

type ItemsNumber = {
  valueAlias?: number;
  value: number;
  label: string;
  children: {
    value: number;
    label: string;
    children?: {
      value: number;
      label: string;
      children: {
        value: number;
        label: string;
      }[];
    }[];
  }[];
};

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
  { value: 'string', label: 'string' },
  { value: 'number', label: 'number' },
];

const valueAliasOptions = [
  { value: 'value', label: '不使用别名' },
  { value: 'valueAlias', label: 'valueAlias' },
];

const itemsString: ItemsString[] = [
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

const itemsNumber: ItemsNumber[] = [
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
const valueAlias = ref('value');
const keys = ref({});
const checkable = ref(true);
const checkStrictly = ref(false);
const items = ref<ItemsString[] | ItemsNumber[]>(itemsString);

watch(valueType, (type) => {
  items.value = type === 'string' ? itemsString : itemsNumber;
});
watch(valueAlias, (alias) => {
  if (alias === 'value') {
    keys.value = {};
  } else {
    keys.value = { value: 'valueAlias' };
    items.value = handleValueAlias(itemsNumber);
  }
});

const handleValueAlias = (items: ItemsNumber[]) => {
  return (items || []).map((ds) => {
    if (ds.value) {
      ds.valueAlias = ds.value;
    }
    if (ds.children) {
      handleValueAlias(ds.children);
    }
    return ds;
  });
};
const onClick = (context: { node: TreeNodeModel<ItemsNumber[]> }) => {
  console.info('onClick:', context);
};
const onChange = (
  value: Array<number[] | string[]>,
  context: { node: TreeNodeModel<ItemsNumber[] | ItemsString[]> },
) => {
  console.info('onChange:', value, context);
};
</script>
