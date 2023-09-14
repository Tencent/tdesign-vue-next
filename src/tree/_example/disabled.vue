<template>
  <t-space :size="32" direction="vertical" class="tdesign-tree-demo">
    <t-space :size="10" direction="vertical">
      <h3 class="title">禁用整个 tree</h3>
      <t-form>
        <t-form-item label="是否禁用整个 tree" label-width="150">
          <t-switch v-model="disabled" />
        </t-form-item>
        <t-form-item label="是否只禁用 checkbox" label-width="200">
          <t-switch v-model="disableCheck" />
        </t-form-item>
      </t-form>
      <t-tree :data="items" hover checkable expand-all :disabled="disabled" :disable-check="disableCheck" />
    </t-space>
    <t-space :size="10" direction="vertical">
      <h3 class="title">禁用指定节点</h3>
      <t-form>
        <t-form-item label="禁用指定节点 checkbox" label-width="200">
          <t-switch v-model="disableTarget" />
        </t-form-item>
      </t-form>
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
