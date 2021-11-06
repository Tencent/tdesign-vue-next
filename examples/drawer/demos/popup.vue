<template>
  <div>
    <t-drawer
      v-model:visible="visible"
      attach="body"
      :mode="mode"
      :placement="placement"
      header="抽屉标题"
    >
      <p>抽屉的内容</p>
    </t-drawer>

    <div class="tdesign-radio-button">
      抽屉弹出模式：
      <t-radio-group v-model="mode">
        <t-radio-button value="overlay">overlay</t-radio-button>
        <t-radio-button value="push">push</t-radio-button>
      </t-radio-group>
    </div>
    <br><br>
    <t-button theme="primary" @click="visible = true">Open</t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      mode: 'push',
      placement: 'right',
    };
  },
};
</script>
