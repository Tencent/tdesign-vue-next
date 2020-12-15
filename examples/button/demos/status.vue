<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button theme="primary">主按钮</t-button>
      <t-button theme="primary" disabled @click="onDisabledButtonClick">主按钮</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="line">次要按钮</t-button>
      <t-button theme="line" disabled>次要按钮</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="dashed">虚框按钮</t-button>
      <t-button theme="dashed" disabled>虚框按钮</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="warning">告警按钮</t-button>
      <t-button theme="warning" disabled>告警按钮</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="warning-line">次要告警</t-button>
      <t-button theme="warning-line" disabled>次要告警</t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="link">链接文字按钮</t-button>
      <t-button theme="link" disabled>链接文字按钮</t-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onDisabledButtonClick() {
      console.log('this event should not be emited');
    },
  },
};
</script>
