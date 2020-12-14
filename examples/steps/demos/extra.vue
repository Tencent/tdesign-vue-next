<template>
  <t-steps direction="vertical" :current="current" status="process">
    <t-step title="步骤1" content="这里是提示文字">
      <template slot="extra" v-if="current === 0">
        <t-button size="small" theme="primary" @click="current++">Next</t-button>
      </template>
    </t-step>
    <t-step title="步骤2" content="这里是提示文字">
      <template slot="extra" v-if="current === 1">
        <t-button size="small" theme="link" @click="current--">Pre</t-button>
        <t-button size="small" theme="primary" @click="current++">Next</t-button>
      </template>
    </t-step>
    <t-step title="步骤3" content="这里是提示文字">
      <template slot="extra" v-if="current === 2">
        <t-button size="small" theme="primary" @click="current++">Next</t-button>
      </template>
    </t-step>
    <t-step title="步骤4" content="这里是提示文字">
      <template slot="extra" v-if="current === 3">
        <t-button size="small" @click="current--">Pre</t-button>
      </template>
    </t-step>
  </t-steps>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
    };
  },
};
</script>
