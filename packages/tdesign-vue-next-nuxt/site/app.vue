<template>
  <div>
    <div>TDesign Nuxt module playground!</div>
    <t-divider>Basic</t-divider>
    <t-space>
      <t-button>Button</t-button>
      <t-icon name="cry-and-laugh" />
    </t-space>

    <t-divider>Layout</t-divider>
    <t-divider>Navigation</t-divider>
    <t-space direction="vertical">
      <t-space>
        <t-steps :default-current="1">
          <t-step-item title="步骤1" content="提示文字" />
          <t-step-item title="步骤2" content="提示文字" />
          <t-step-item title="步骤3" content="提示文字" />
        </t-steps>
      </t-space>
      <t-space>
        <t-tabs>
          <t-tab-panel :value="1" label="选项卡1">
            <p style="margin: 20px">选项卡1内容区</p>
          </t-tab-panel>
          <t-tab-panel :value="2" label="选项卡2">
            <p style="margin: 20px">选项卡2内容区</p>
          </t-tab-panel>
          <t-tab-panel :value="3" label="选项卡3"> <p style="margin: 20px">选项卡3内容区</p> </t-tab-panel>x``
        </t-tabs>
      </t-space>
    </t-space>
    <t-divider>Data</t-divider>
    <t-space>
      <t-date-picker />
    </t-space>
    <t-divider>Plugin</t-divider>
    <t-space>
      <t-button @click="handleDialog"> DialogPlugin </t-button>
      <t-button @click="handleMessage"> MessagePlugin </t-button>
      <t-button @click="handleNotify"> NotifyPlugin </t-button>
      <t-button @click="handleLoading"> LoadingPlugin </t-button>
    </t-space>
    <t-divider>Icon </t-divider>
    <t-space>
      <edit-icon />
      <edit-1-icon />
      <app-filled-icon />
    </t-space>
  </div>
</template>

<script setup>
const handleDialog = () => {
  const confirmDialog = DialogPlugin.confirm({
    header: '提交后不可再编辑会进入审批流程',
    body: '是否确认提交？',
    confirmBtn: {
      content: '提交',
      theme: 'primary',
      loading: false,
    },
    theme: 'warning',
    onConfirm: () => {
      confirmDialog.update({ confirmBtn: { content: '提交中', loading: true } });
      // confirmDialog.update({ confirmLoading: true });
      // confirmDialog.setConfirmLoading(true);
      const timer = setTimeout(() => {
        confirmDialog.update({ confirmBtn: { content: '提交', loading: false } });
        // confirmDialog.update({ confirmLoading: false });
        // confirmDialog.setConfirmLoading(false);
        confirmDialog.hide();
        clearTimeout(timer);
      }, 500);
    },
  });
};
const handleMessage = () => {
  MessagePlugin.success('dfas');
};
const handleNotify = () => {
  NotifyPlugin.info({
    title: '标题名称',
    content: '这是一条消息通知',
    duration: 0,
    closeBtn: true,
  });
};
const handleLoading = () => {
  const instance = LoadingPlugin({
    fullscreen: true,
    attach: 'body',
    preventScrollThrough: false,
  });
  const timer = setTimeout(() => {
    instance.hide();
    clearTimeout(timer);
  }, 1000);
};
</script>
