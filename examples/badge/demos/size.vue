<template>
  <div>
    <h3 class="demo-t-badge-title">1.默认大小</h3>
    <t-badge :count="2">
      <t-button>按钮</t-button>
    </t-badge>
    <t-badge :count="99">
      <t-button>按钮</t-button>
    </t-badge>
    <t-badge :count="999">
      <t-button>按钮</t-button>
    </t-badge>

    <h3 class="demo-t-badge-title">2.小</h3>
    <t-badge :count="2" size="small">
      <t-button>按钮</t-button>
    </t-badge>
    <t-badge :count="99" size="small">
      <t-button>按钮</t-button>
    </t-badge>
    <t-badge :count="999" size="small">
      <t-button>按钮</t-button>
    </t-badge>
  </div>
</template>
<style scoped>
    .demo-t-badge-title {
        margin: 20px 0;
    }
</style>
