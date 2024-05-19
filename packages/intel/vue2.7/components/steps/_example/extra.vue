<template>
  <t-steps layout="vertical" :current="current" :onChange="onCurChanged">
    <t-step-item :title="renderTitle" content="这里是提示文字">
      <template slot="extra" v-if="current === 0">
        <t-button size="small" variant="base" @click.stop="current++">下一步</t-button>
      </template>
    </t-step-item>
    <t-step-item title="步骤2" content="这里是提示文字">
      <template slot="extra" v-if="current === 1">
        <t-space size="small">
          <t-button size="small" variant="text" @click.stop="current--">上一步</t-button>
          <t-button size="small" variant="base" @click.stop="current++">下一步</t-button>
        </t-space>
      </template>
    </t-step-item>
    <t-step-item title="步骤3" content="这里是提示文字">
      <template slot="extra" v-if="current === 2">
        <t-space size="small">
          <t-button size="small" variant="text" @click.stop="current--">上一步</t-button>
          <t-button size="small" variant="base" @click.stop="current++">下一步</t-button>
        </t-space>
      </template>
    </t-step-item>
    <t-step-item title="步骤4" content="这里是提示文字">
      <template slot="extra" v-if="current === 3">
        <t-button size="small" @click.stop="current--">上一步</t-button>
      </template>
    </t-step-item>
  </t-steps>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      current: 1,
    };
  },
  methods: {
    onCurChanged(cur, pre) {
      this.current = cur;
      console.log('TDesign Steps:', `current: ${cur}, previous: ${pre}`);
    },
    renderTitle() {
      return <div class="demo">步骤1</div>;
    },
  },
};
</script>
