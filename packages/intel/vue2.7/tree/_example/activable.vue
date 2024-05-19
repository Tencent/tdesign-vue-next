<template>
  <t-space direction="vertical">
    <t-space>
      <span>节点可高亮: </span>
      <t-switch v-model="activable" />
    </t-space>
    <t-space>
      <span>节点可多选高亮:</span>
      <t-switch v-model="activeMultiple" />
    </t-space>
    <t-space>
      <span>整个节点可点击:</span>
      <t-switch v-model="expandOnClickNode" />
    </t-space>
    <t-tree
      :data="items"
      expand-all
      :activable="activable"
      :active-multiple="activeMultiple"
      :expand-on-click-node="expandOnClickNode"
      :on-active="propOnActive"
      hover
      @click="onClick"
      @active="onActive"
    />
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      activable: true,
      activeMultiple: false,
      expandOnClickNode: false,
      items: [
        {
          value: 't1',
          label: '1',
          children: [
            {
              value: 't1.1',
              label: '1.1',
            },
            {
              value: 't1.2',
              label: '1.2',
            },
          ],
        },
        {
          value: 't2',
          label: '2',
          children: [
            {
              value: 't2.1',
              label: '2.1',
            },
            {
              value: 't2.2',
              label: '2.2',
            },
          ],
        },
      ],
    };
  },
  methods: {
    onClick(context) {
      console.info('onClick', context);
      const { node } = context;
      console.info(node.value, 'actived:', node.actived);
    },
    onActive(value, context) {
      console.info('onActive', value, context);
      const { node } = context;
      console.info(node.value, 'actived:', node.actived);
    },
    propOnActive(value, context) {
      console.info('propOnActive', value, context);
      const { node } = context;
      console.info(node.value, 'actived:', node.actived);
    },
  },
};
</script>
