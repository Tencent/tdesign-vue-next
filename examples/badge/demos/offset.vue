<template>
  <div>
    <t-badge :count="2">
      <t-button>默认</t-button>
    </t-badge>
    <t-badge :count="2" :offset="[10, 10]">
      <t-button>[10, 10]</t-button>
    </t-badge>
    <t-badge :count="2" :offset="[-10, 10]">
      <t-button>[-10, 10]</t-button>
    </t-badge>
    <t-badge :count="2" :offset="[-10, -10]">
      <t-button>[-10, -10]</t-button>
    </t-badge>
    <t-badge :count="2" :offset="[10, -10]">
      <t-button>[10, -10]</t-button>
    </t-badge>
  </div>
</template>
