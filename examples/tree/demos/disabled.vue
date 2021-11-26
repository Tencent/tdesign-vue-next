<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-form>
        <t-form-item label="是否禁用整个 tree" label-width="150">
          <t-switch v-model="disabled" />
        </t-form-item>
        <t-form-item label="是否只禁用 checkbox" label-width="200">
          <t-switch v-model="disableCheck" />
        </t-form-item>
      </t-form>
    </div>
    <t-tree :data="items" hover checkable expand-all :disabled="disabled" :disable-check="disableCheck" />

    <div class="operations">
      <t-form>
        <t-form-item label="禁用指定节点 checkbox" label-width="200">
          <t-switch v-model="disableTarget" />
        </t-form-item>
      </t-form>
    </div>
    <t-tree :data="items" hover checkable expand-all :disable-check="fnDisableCheck" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const items = [
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
];

export default defineComponent({
  setup() {
    const disabled = ref(true);
    const disableCheck = ref(false);
    const disableTarget = ref(true);
    return {
      disabled,
      items,
      disableCheck,
      disableTarget,
      fnDisableCheck(node) {
        const list = ['1.1', '1.2', '2.1'];
        if (list.indexOf(node.label) >= 0) {
          return disableTarget.value;
        }
        return false;
      },
    };
  },
});
</script>
<style scoped>
.demo-tree-base {
  display: block;
}
</style>
