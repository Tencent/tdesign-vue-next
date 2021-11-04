<template>
  <div class="tdesign-demo-block">
    <t-alert
      theme="success"
      message="这是一条成功的消息提示"
      close
    />
    <t-alert
      theme="info"
      message="这是一条普通的消息提示"
      close="知道了"
      @close="beforeClose"
    />
    <t-alert
      theme="warning"
      message="这是一条警示信息"
      :close="warningClose"
      @close="beforeClose"
      @closed="handleClosed"
    />
    <t-alert theme="error" message="高危操作/出错信息提示">
      <template #close>
        Slot Close
      </template>
    </t-alert>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const beforeClose = () => {
      return window.confirm('确认关闭吗？');
    }

    const handleClosed = () => {
      alert('closed');
    }

    return {
      warningClose: () => 'FunctionPropClose',
      beforeClose,
      handleClosed,
    };
  }
});
</script>
