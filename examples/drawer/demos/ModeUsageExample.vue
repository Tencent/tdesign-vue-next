<template>
  <div>
    <t-drawer
      v-model:visible="visible"
      attach="body"
      :mode="mode"
      :placement="placement"
      header="标题名称"
    >
      <p>Drawer 默认挂载在元素本身所在的位置，而在 PUSH 模式下，推动的是 attach 元素，因此全局模式需要设置 attach 为 body。</p>
    </t-drawer>

    <!-- 状态控制区 -->
    <div class="tdesign-radio-button">
      抽屉弹出方向：
      <t-radio-group v-model="placement">
        <t-radio-button value="left">left</t-radio-button>
        <t-radio-button value="right">right</t-radio-button>
        <t-radio-button value="top">top</t-radio-button>
        <t-radio-button value="bottom">bottom</t-radio-button>
      </t-radio-group>
    </div>
    <br>
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
