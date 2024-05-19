<template>
  <t-space direction="vertical">
    <t-space break-line align="center">
      <icon-font name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" />
      <icon-font name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" size="medium" />
      <icon-font name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" size="large" />
      <icon-font name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" size="25px" />
      <icon-font name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" size="2em" />
    </t-space>
    <t-space break-line align="center">
      <icon-font name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" style="color: red" />
      <icon-font name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" style="color: green" />
      <icon-font name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" style="color: orange" />
      <!-- 引入新 Icon 之后，内置 Icon 依旧有效。name 传入图标名称全称。 -->
      <icon-font name="t-icon-home" :url="newIconfontUrl" />
    </t-space>
    <br />
  </t-space>
</template>
<script setup>
import { IconFont } from 'tdesign-icons-vue-next';

const newIconfontUrl = 'https://tdesign.gtimg.com/icon/default-demo/index.css';
</script>
