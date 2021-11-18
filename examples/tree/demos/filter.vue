<template>
  <div class="tdesign-tree-base">
    <t-addon prepend="filter:">
      <t-input
        v-model="filterText"
        @input="onInput"
      />
    </t-addon>
    <t-tree
      :data="items"
      expand-on-click-node
      :default-expanded="expanded"
      :filter="filterByText"
      hover
      line
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const items = [{
  value: '1',
  label: '1',
  children: [{
    value: '1.1',
    label: '1.1',
    children: [{
      value: '1.1.1',
      label: '1.1.1',
      children: [{
        value: '1.1.1.1',
        label: '1.1.1.1',
      }, {
        value: '1.1.1.2',
        label: '1.1.1.2',
      }],
    }, {
      value: '1.1.2',
      label: '1.1.2',
      children: [{
        value: '1.1.2.1',
        label: '1.1.2.1',
      }, {
        value: '1.1.2.2',
        label: '1.1.2.2',
      }],
    }],
  }, {
    value: '1.2',
    label: '1.2',
    children: [{
      value: '1.2.1',
      label: '1.2.1',
      children: [{
        value: '1.2.1.1',
        label: '1.2.1.1',
      }, {
        value: '1.2.1.2',
        label: '1.2.1.2',
      }],
    }, {
      value: '1.2.2',
      label: '1.2.2',
      children: [{
        value: '1.2.2.1',
        label: '1.2.2.1',
      }, {
        value: '1.2.2.2',
        label: '1.2.2.2',
      }],
    }],
  }],
}, {
  value: '2',
  label: '2',
  children: [{
    value: '2.1',
    label: '2.1',
  }, {
    value: '2.2',
    label: '2.2',
  }],
}];

export default defineComponent({
  setup() {
    const filterText = ref('');
    const filterByText = ref(null);
    const expanded = ref(['1.1.1']);

    const onInput = (state) => {
      console.info('onInput:', state);
      filterByText.value = (node) => {
        const rs = node.data.label.indexOf(filterText.value) >= 0;
        return rs;
      };
    };

    return {
      items,
      filterText,
      filterByText,
      expanded,
      onInput,
    };
  },
});
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>
