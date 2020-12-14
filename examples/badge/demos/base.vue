<template>
  <div>
    <t-badge :count="2" >
      <t-button>按钮</t-button>
    </t-badge>
    <t-badge :count="0" show-zero>
      <t-button>按钮</t-button>
    </t-badge>
    <t-badge :count="100">
      <t-button>按钮</t-button>
    </t-badge>
    <t-badge :count="100" content="文字">
      <t-button>按钮</t-button>
    </t-badge>
  </div>
</template>

<style>
.t-badge + .t-badge {
  margin-left: 16px;
}
</style>
