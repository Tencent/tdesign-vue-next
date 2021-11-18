<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <div class="demo-item">
        <t-popconfirm
          theme="default"
          content="确认删除订单吗"
        >
          <t-button>删除订单</t-button>
        </t-popconfirm>
      </div>

      <!-- 受控用法：自由控制浮层显示与否 -->
      <div class="demo-item">
        <t-popconfirm
          :visible="visible"
          theme="default"
          content="是否提交审核？（自定义按钮内容）"
          :confirm-btn="confirmBtn"
          :cancel-btn="cancelBtn"
          @visible-change="onVisibleChange"
        >
          <t-button>提交审核</t-button>
        </t-popconfirm>
      </div>
    </div>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from '@tencent/tdesign-vue-next';

export default defineComponent({
  setup() {
    const visible = ref(true);

    const onVisibleChange = (val, context = {}) => {
      if (context && context.trigger === 'confirm') {
        const msg = MessagePlugin.info('提交中');
        const timer = setTimeout(() => {
          MessagePlugin.close(msg);
          MessagePlugin.success('提交成功！');
          visible.value = false;
          clearTimeout(timer);
        }, 1000);
      } else {
        visible.value = val;
      }
    };

    return {
      visible,
      onVisibleChange,
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
    };
  },
});
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
