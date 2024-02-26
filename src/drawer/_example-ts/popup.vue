<template>
  <div>
    <t-drawer v-model:visible="visible" attach="body" :mode="mode" :placement="placement" header="抽屉标题">
      <p>抽屉的内容</p>
    </t-drawer>

    <t-space direction="vertical" size="large">
      <t-space align="center">
        抽屉弹出模式：
        <t-radio-group v-model="mode">
          <t-radio-button value="overlay"> overlay </t-radio-button>
          <t-radio-button value="push"> push </t-radio-button>
        </t-radio-group>
      </t-space>
      <t-button variant="outline" @click="visible = true">打开抽屉</t-button>
    </t-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DrawerProps } from 'tdesign-vue-next';
const visible = ref(false);
const mode = ref<DrawerProps['mode']>('push');
const placement = ref<DrawerProps['placement']>('right');
</script>
