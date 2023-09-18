<template>
  <t-space :size="32" direction="vertical">
    <t-space direction="vertical">
      <h3>禁用整个 tree</h3>
      <t-space>
        <span>是否禁用整个 tree:</span>
        <t-switch v-model="disabled" />
      </t-space>
      <t-space>
        <span>是否只禁用 checkbox:</span>
        <t-switch v-model="disableCheck" />
      </t-space>
      <t-tree :data="items" hover checkable expand-all :disabled="disabled" :disable-check="disableCheck" />
    </t-space>
    <t-space direction="vertical">
      <h3>禁用指定节点</h3>
      <t-space>
        <span>禁用指定节点 checkbox:</span>
        <t-switch v-model="disableTarget" />
      </t-space>
      <t-tree :data="items" hover checkable expand-all :disable-check="fnDisableCheck" />
    </t-space>
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
      disableCheck: false,
      disableTarget: true,
      items: [
        {
          label: '1',
          children: [
            {
              label: '1.1',
              children: [
                {
                  label: '1.1.1',
                },
                {
                  label: '1.1.2',
                },
              ],
            },
            {
              label: '1.2',
              children: [
                {
                  label: '1.2.1',
                },
                {
                  label: '1.2.2',
                },
              ],
            },
          ],
        },
        {
          label: '2',
          children: [
            {
              label: '2.1',
            },
            {
              label: '2.2',
            },
          ],
        },
      ],
    };
  },
  methods: {
    fnDisableCheck(node) {
      const list = ['1.1', '1.2', '2.1'];
      if (list.indexOf(node.label) >= 0) {
        return this.disableTarget;
      }
      return false;
    },
  },
};
</script>
