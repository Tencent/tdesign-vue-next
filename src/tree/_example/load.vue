<template>
  <t-space direction="vertical">
    <t-space>
      <span>可选:</span>
      <t-switch v-model="checkable" />
    </t-space>
    <t-tree :value="value" :data="items" hover expand-all :checkable="checkable" :load="load" :lazy="false" />
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      checkable: true,
      value: ['1.1.1'],
      items: [
        {
          label: '1',
          value: '1',
          children: true,
        },
        {
          label: '2',
          value: '2',
          children: true,
        },
      ],
    };
  },
  methods: {
    load(node) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 2) {
            nodes = [
              {
                label: `${node.label}.1`,
                value: `${node.value}.1`,
                children: true,
              },
              {
                label: `${node.label}.2`,
                value: `${node.value}.2`,
                children: true,
              },
            ];
          }
          resolve(nodes);
        }, 1000);
      });
    },
  },
};
</script>
