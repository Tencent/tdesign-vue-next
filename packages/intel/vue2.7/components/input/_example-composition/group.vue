<template>
  <t-space direction="vertical" style="max-width: 500px">
    <t-input-group separate>
      <t-input :style="{ width: '100px' }" default-value="0731" />
      <t-input default-value="12345677" />
    </t-input-group>

    <t-input-group separate>
      <t-input />
      <t-input />
    </t-input-group>

    <t-input-group>
      <t-input />
      <t-input />
    </t-input-group>

    <t-input-group separate>
      <t-input :style="{ width: '100px' }" default-value="0731" />
      <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
      <t-input :style="{ width: '100px' }" default-value="12345" />
      <t-input :style="{ width: '100px' }" default-value="678901" />
      <t-input :style="{ width: '100px' }" />
    </t-input-group>
  </t-space>
</template>
