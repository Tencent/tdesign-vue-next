<template>
  <t-space>
    <t-drawer
      :visible.sync="visible"
      :placement="placement"
      :size="size"
      :onConfirm="() => (visible = false)"
      header="抽屉标题"
    >
      <p>抽屉的内容</p>
    </t-drawer>
    <t-space direction="vertical">
      <t-radio-group :defaultValue="size" v-model="size">
        <t-radio-button value="small">小</t-radio-button>
        <t-radio-button value="medium">中</t-radio-button>
        <t-radio-button value="large">大</t-radio-button>
        <t-radio-button value="200">200</t-radio-button>
        <t-radio-button value="400px">400px</t-radio-button>
        <t-radio-button value="50%">50%</t-radio-button>
      </t-radio-group>

      <t-button variant="outline" @click="visible = true">打开抽屉</t-button>
    </t-space>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const size = ref('small');
const placement = ref('right');
</script>
