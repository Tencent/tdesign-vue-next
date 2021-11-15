<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-form labelWidth="120">
        <t-form-item label="节点可高亮">
          <t-switch v-model="activable"/>
        </t-form-item>
        <t-form-item label="节点可多选高亮">
          <t-switch v-model="activeMultiple"/>
        </t-form-item>
        <t-form-item label="整个节点可点击">
          <t-switch v-model="expandOnClickNode"/>
        </t-form-item>
      </t-form>
    </div>
    <t-tree
      :data="items"
      expand-all
      :activable="activable"
      :active-multiple="activeMultiple"
      :expand-on-click-node="expandOnClickNode"
      @click="onClick"
      @active="onActive"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

const items = [{
  label: '1',
  children: [{
    label: '1.1',
  }, {
    label: '1.2',
  }],
}, {
  label: '2',
  children: [{
    label: '2.1',
  }, {
    label: '2.2',
  }],
}]

export default defineComponent({
  setup() {
    const activable = ref(true);
    const activeMultiple = ref(false);
    const expandOnClickNode = ref(false);

    const onClick = (context) => {
      console.info('onClick', context);
    }

    const onActive = (context) => {
      console.info('onActive', value, context);
    }

    return {
      activable,
      activeMultiple,
      expandOnClickNode,
      items,
      onClick,
      onActive,
    }
  },
});
</script>
<style scoped>
  .tdesign-tree-base .t-button{
    margin: 0 10px 10px 0;
  }

  .operations {
    margin-bottom: 32px;
  }
</style>
