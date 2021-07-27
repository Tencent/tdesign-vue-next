<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">

      <div class='demo-item'>
        <t-popconfirm theme="default" content="确认删除订单吗">
          <t-button>删除订单</t-button>
        </t-popconfirm>
      </div>

      <!-- 通过透传按钮属性自定义按钮，cancelBtn 和 confirmBtn 值为 null 或 undefined 时表示不显示该按钮 -->
      <div class='demo-item'>
        <t-popconfirm
          theme="default"
          content="你看到了吗？"
          :cancelBtn="null"
          :confirmBtn="{ content: '看到了', theme: 'primary', variant: 'outline' }"
        >
          <t-button>点我看按钮</t-button>
        </t-popconfirm>
      </div>

      <!-- 自由控制浮层显示与否 -->
      <div class='demo-item'>
        <t-popconfirm
          :visible="visible"
          theme="default"
          content="是否提交审核？（自定义按钮内容）"
          :confirmBtn="confirmBtn"
          :cancelBtn="cancelBtn"
          @visible-change="onVisibleChange"
        >
          <t-button >提交审核</t-button>
        </t-popconfirm>
      </div>

      <div class='demo-item'>
        <t-popconfirm theme="default" content="确认删除订单吗">
          <t-button disabled>禁用按钮</t-button>
        </t-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    confirmBtn() {
      return (
        <t-button theme="primary" size="small">
          删除
        </t-button>
      );
    },
    cancelBtn() {
      return <t-button size="small" variant="dashed">取消</t-button>;
    },
    onVisibleChange(val, context = {}) {
      // trigger 表示触发来源，可以根据触发来源自由控制 visible
      if (context && context.trigger === 'confirm') {
        const msg = this.$message.info('提交中');
        const timer = setTimeout(() => {
          this.$message.close(msg);
          this.$message.success('提交成功！');
          this.visible = false;
          clearTimeout(timer);
        }, 1000);
      } else {
        this.visible = val;
      }
    },
  },
};
</script>

<style>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: flex-start;
}
.popconfirm-demo .demo-item {
  width: 240px;
  text-align: left;
}
</style>
