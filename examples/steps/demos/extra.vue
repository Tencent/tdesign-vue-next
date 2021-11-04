<template>
  <t-steps direction="vertical" :current="current" status="process">
    <t-step-item title="步骤1" content="这里是提示文字">
      <template #extra v-if="current === 0">
        <t-button size="small" variant="base" @click="current++">Next</t-button>
      </template>
    </t-step-item>
    <t-step-item title="步骤2" content="这里是提示文字">
      <template #extra v-if="current === 1">
        <t-button size="small" variant="text" @click="current--">Pre</t-button>
        <t-button size="small" variant="base" @click="current++">Next</t-button>
      </template>
    </t-step-item>
    <t-step-item title="步骤3" content="这里是提示文字">
      <template #extra v-if="current === 2">
        <t-button size="small" variant="text" @click="current--">Pre</t-button>
        <t-button size="small" variant="base" @click="current++">Next</t-button>
      </template>
    </t-step-item>
    <t-step-item title="步骤4" content="这里是提示文字">
      <template #extra v-if="current === 3">
        <t-button size="small" @click="current--">Pre</t-button>
      </template>
    </t-step-item>
  </t-steps>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      current: 1,
    }
  }
});
</script>
