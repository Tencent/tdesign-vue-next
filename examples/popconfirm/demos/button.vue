<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <!-- 使用 props 定义按钮内容 -->
      <t-popconfirm theme="default" content="您确定要提交吗" confirm-btn="确认提交" cancel-btn="我再想想">
        <t-button variant="outline"> 按钮样式（属性-字符串） </t-button>
      </t-popconfirm>
      <!-- 使用 props 定义按钮内容 -->
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
        <t-button variant="outline"> 按钮样式（属性-对象） </t-button>
      </t-popconfirm>

      <!-- 使用插槽定义按钮内容 -->
      <t-popconfirm theme="default" content="您确定要提交吗">
        <template #cancelBtn>
          <t-button size="small"> 我再想想 </t-button>
        </template>
        <template #confirmBtn>
          <t-button theme="primary" size="small"> 确定提交 </t-button>
        </template>
        <t-button variant="outline"> 按钮样式（插槽） </t-button>
      </t-popconfirm>
    </div>
  </div>
</template>

<style scoped>
.popconfirm-demo .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
