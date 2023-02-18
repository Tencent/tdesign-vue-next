<template>
  <t-space direction="vertical">
    <t-back-top :fixed="false" shape="square">
      <template #text>TOP</template>
    </t-back-top>

    <t-back-top :fixed="false" shape="square">
      <template #icon>
        <t-icon name="logo-chrome-filled" size="16"></t-icon>
      </template>
      <template #text>TEST TEXT</template>
    </t-back-top>
  </t-space>
</template>
