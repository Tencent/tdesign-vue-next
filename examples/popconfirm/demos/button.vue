<template>
  <div class="popconfirm-demo">
    <!-- 和 Dialog/Drawer 组件的确认/取消 逻辑一样 -->
    <div class="tdesign-demo-block">
      <!-- 使用 props 定义按钮内容 -->
      <t-popconfirm theme="default" content="您确定要提交吗" confirm-btn="确认提交" cancel-btn="我再想想">
        <t-button variant="outline">按钮样式（属性-字符串）</t-button>
      </t-popconfirm>

      <!-- 通过透传按钮属性自定义按钮，cancelBtn 和 confirmBtn 值为 null 时表示不显示该按钮 -->
      <t-popconfirm
        theme="default"
        content="您确定要提交吗"
        :confirm-btn="{
          content: '确认提交',
          theme: 'warning',
        }"
        :cancel-btn="{
          content: '我再想想',
          theme: 'default',
          variant: 'outline',
        }"
      >
        <t-button variant="outline">按钮样式（属性-对象）</t-button>
      </t-popconfirm>

      <!-- 使用插槽定义按钮内容 -->
      <t-popconfirm :visible="visible" theme="default" content="您确定要提交吗">
        <!-- 自定义触发元素 -->
        <t-button variant="outline" @click="visible = true">按钮样式（插槽）</t-button>

        <template #cancelBtn>
          <t-button size="small" variant="text" style="margin-right: 12px" @click="visible = false">取消</t-button>
        </template>
        <template #confirmBtn>
          <t-button size="small" theme="primary" @click="visible = false">确定</t-button>
        </template>
        <!-- 自定义按钮 -->
      </t-popconfirm>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    return { visible };
  },
});
</script>
<style scoped>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
