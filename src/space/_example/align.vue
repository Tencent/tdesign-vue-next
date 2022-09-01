<template>
  <t-space break-line>
    <t-space align="start" class="space-border">
      <div>start</div>
      <t-button>Button</t-button>
      <div class="space-block"></div>
    </t-space>
    <t-space align="center" class="space-border">
      <div>center</div>
      <t-button>Button</t-button>
      <div class="space-block"></div>
    </t-space>
    <t-space align="end" class="space-border">
      <div>end</div>
      <t-button>Button</t-button>
      <div class="space-block"></div>
    </t-space>
    <t-space align="baseline" class="space-border">
      <div>baseline</div>
      <t-button>Button</t-button>
      <div class="space-block"></div>
    </t-space>
  </t-space>
</template>

<style scoped>
.space-border {
  padding: 12;
  border: 1px dashed var(--td-component-stroke);
}
.space-block {
  background: var(--td-bg-color-component);
  height: 60px;
  width: 60px;
}
</style>
