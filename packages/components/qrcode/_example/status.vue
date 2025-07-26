<template>
  <t-space>
    <t-qrcode value="https://tdesign.tencent.com/" status="loading" />
    <t-qrcode value="https://tdesign.tencent.com/" status="expired" :on-refresh="() => console.log('Click Refresh')" />
    <t-qrcode value="https://tdesign.tencent.com/" status="scanned" />
  </t-space>
</template>
