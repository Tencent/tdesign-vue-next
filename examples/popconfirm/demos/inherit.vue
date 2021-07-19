<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <t-popconfirm theme="default" content="设置 placement='right'" placement='right'>
        <t-button theme="primary">浮层出现在右边</t-button>
      </t-popconfirm>
      <t-popconfirm theme="default" content="设置 trigger='click' " trigger='click'>
        <t-button theme="primary">点击触发</t-button>
      </t-popconfirm>
      <t-popconfirm theme="default" content="trigger='manual'，然后手动控制visible" trigger='manual' :visible="visible">
        <t-button theme="primary" @click="visible=!visible">点击，控制visible</t-button>
      </t-popconfirm>
      <t-popconfirm theme="default" content="popup状态改变时触发事件" @visibleChange='change'>
        <t-button :theme='btnTheme'>hover我试试</t-button>
      </t-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      btnTheme: 'primary',
    };
  },
  methods: {
    change(val)  {
      if (val) {
        this.btnTheme = 'warning';
      } else {
        this.btnTheme = 'primary';
      }
    },
  },
};
</script>
<style scoped>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
