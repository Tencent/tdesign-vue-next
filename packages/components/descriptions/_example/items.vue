<template>
  <t-descriptions title="Shipping address" :items="items" :column="3" />
</template>

<script lang="tsx" setup>
import { DescriptionsProps } from 'tdesign-vue-next';
const items: DescriptionsProps['items'] = [
  {
    label: 'Name',
    content: 'TDesign',
  },
  {
    label: <button>Telephone Number</button>,
    content: '139****0609',
  },
  {
    label: 'Area',
    content: <h3>China Tencent Headquarters</h3>,
  },
  {
    label: () => <i>'Address'</i>,
    content: () => <mark> 'Shenzhen Penguin Island D1 4A Mail Center'</mark>,
  },
];
</script>
