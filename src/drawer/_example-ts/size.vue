<template>
  <div>
    <t-drawer v-model:visible="visible" :placement="placement" :size="size" header="抽屉标题">
      <p>抽屉的内容</p>
    </t-drawer>

    <t-space direction="vertical">
      <t-radio-group v-model="size" :default-value="size" class="btn-top-margin">
        <t-radio-button value="small"> 小 </t-radio-button>
        <t-radio-button value="medium"> 中 </t-radio-button>
        <t-radio-button value="large"> 大 </t-radio-button>
        <t-radio-button value="200"> 200 </t-radio-button>
        <t-radio-button value="400px"> 400px </t-radio-button>
        <t-radio-button value="50%"> 50% </t-radio-button>
      </t-radio-group>
      <t-button variant="outline" class="btn-top-margin" @click="visible = true"> 打开抽屉 </t-button>
    </t-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DrawerProps, RadioGroupProps } from 'tdesign-vue-next';
const visible = ref(false);
const size = ref<RadioGroupProps['defaultValue']>('small');
const placement = ref<DrawerProps['placement']>('right');
</script>
