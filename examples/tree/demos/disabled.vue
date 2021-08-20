<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-form>
        <t-form-item label="是否禁用">
          <t-switch v-model="disabled" />
        </t-form-item>
      </t-form>
    </div>
    <t-tree
      :data="items"
      hover
      checkable
      expand-all
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
      items: [{
        label: '1',
        children: [{
          label: '1.1',
          children: [{
            label: '1.1.1',
          }, {
            label: '1.1.2',
          }],
        }, {
          label: '1.2',
          children: [{
            label: '1.2.1',
          }, {
            label: '1.2.2',
          }],
        }],
      }, {
        label: '2',
        children: [{
          label: '2.1',
        }, {
          label: '2.2',
        }],
      }],
    };
  },
};
</script>
<style scoped>
  .demo-tree-base {
    display: block;
  }
</style>
