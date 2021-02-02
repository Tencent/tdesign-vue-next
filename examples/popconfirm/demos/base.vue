<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <t-popconfirm theme="default" content="基础气泡确认框文案示意文字按钮">
        <t-button theme="primary">Hover</t-button>
      </t-popconfirm>
      <t-popconfirm
        theme="default"
        content="基础气泡确认框文案示意文字按钮"
        :confirmText="confirm"
        :cancelText="cancel"
      >
        <t-button theme="primary">Hover</t-button>
      </t-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirm() {
      return (
        <t-button theme="primary" size="small">
          确定删除
        </t-button>
      );
    },
    cancel() {
      return <t-button size="small">取消</t-button>;
    },
  },
};
</script>

<style>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>

