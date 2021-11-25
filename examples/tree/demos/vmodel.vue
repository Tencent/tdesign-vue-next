<template>
  <div class="tdesign-tree-base">
    <t-addon prepend="checked:">
      <t-input :value="allChecked" />
    </t-addon>
    <t-addon prepend="expanded:">
      <t-input :value="allExpanded" />
    </t-addon>
    <t-addon prepend="actived:">
      <t-input :value="allActived" />
    </t-addon>
    <t-tree
      :data="items"
      checkable
      activable
      :expand-on-click-node="false"
      :active-multiple="false"
      :expanded="expanded"
      :actived="actived"
      :value="checked"
      :value-mode="valueMode"
      @expand="onExpand"
      @change="onChange"
      @active="onActive"
      @click="onClick"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

const items = [
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
    label: '2 这个节点不允许展开, 不允许激活',
    checkable: false,
    children: [
      {
        value: '2.1',
        label: '2.1 这个节点不允许选中',
        checkable: false,
      },
      {
        value: '2.2',
        label: '2.2',
        checkable: false,
      },
    ],
  },
];

export default defineComponent({
  setup() {
    const checked = ref(['1.1.1.1', '1.1.1.2']);
    const expanded = ref(['1', '1.1', '1.1.1', '2']);
    const actived = ref(['2']);

    const allChecked = computed(() => {
      let arr = [];
      if (Array.isArray(checked.value)) {
        arr = checked.value;
      }
      return arr.join(', ');
    });

    const allExpanded = computed(() => {
      let arr = [];
      if (Array.isArray(expanded.value)) {
        arr = expanded.value;
      }
      return arr.join(', ');
    });

    const allActived = computed(() => {
      let arr = [];
      if (Array.isArray(actived.value)) {
        arr = actived.value;
      }
      return arr.join(', ');
    });

    const onClick = (context) => {
      console.info('onClick:', context);
    };

    const onChange = (vals, context) => {
      console.info('onChange:', vals, context);
      const checked = vals.filter((val) => val !== '2.1');
      console.info('节点 2.1 不允许选中');
      checked.value = checked;
    };

    const onExpand = (vals, context) => {
      console.info('onExpand:', vals, context);
      const expanded = vals.filter((val) => val !== '2');
      console.info('节点 2 不允许展开');
      expanded.value = expanded;
    };

    const onActive = (vals, context) => {
      console.info('onActive:', vals, context);
      const actived = vals.filter((val) => val !== '2');
      console.info('节点 2 不允许激活');
      actived.value = actived;
    };

    return {
      checked,
      expanded,
      actived,
      valueMode: 'onlyLeaf',
      items,
      allChecked,
      allExpanded,
      allActived,
      onClick,
      onChange,
      onExpand,
      onActive,
    };
  },
});
</script>
<style scoped>
.demo-tree-base {
  display: block;
}
</style>
