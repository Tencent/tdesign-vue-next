<template>
  <t-space direction="vertical">
    <t-button>Button</t-button>
    <t-button>Button</t-button>
    <t-button>Button</t-button>
    <t-space>
      <template v-if="true">
        <t-button>Button</t-button>
        <t-button>Button</t-button>
        <t-button v-if="false">Button</t-button>
        <t-button>Button</t-button>
        <!-- <t-button v-if="false">Button</t-button> -->
        <t-button v-if="true">Button</t-button>
      </template>
      <t-button>Button</t-button>
    </t-space>
  </t-space>
</template>
