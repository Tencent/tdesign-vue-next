<template>
  <div style="width: 100%">
    <t-popup trigger="hover">
      <t-button>Hover me</t-button>
      <template #content>
        <t-qrcode
          value="https://tdesign.tencent.com/"
          :size="146"
          borderless
          style="padding: var(--td-comp-paddingTB-m) var(--td-comp-paddingLR-s)"
        />
      </template>
    </t-popup>
  </div>
</template>
