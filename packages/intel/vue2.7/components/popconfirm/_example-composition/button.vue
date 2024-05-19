<template>
  <t-space>
    <!-- 和 Dialog/Drawer 组件的确认/取消 逻辑一样 -->
    <t-space>
      <!-- 使用 props 定义按钮内容 -->
      <t-popconfirm theme="default" content="您确定要提交吗" confirmBtn="确认提交" cancelBtn="我再想想">
        <t-button variant="outline">按钮样式（属性-字符串）</t-button>
      </t-popconfirm>

      <!-- 通过透传按钮属性自定义按钮，cancelBtn 和 confirmBtn 值为 null 时表示不显示该按钮 -->
      <t-popconfirm
        theme="default"
        content="您确定要提交吗"
        :confirmBtn="{
          content: '确认提交',
          theme: 'warning',
        }"
        :cancelBtn="{
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

        <!-- 自定义按钮 -->
        <t-button slot="cancelBtn" size="small" variant="text" style="margin-right: 12px" @click="visible = false"
        >取消</t-button
        >
        <t-button slot="confirmBtn" size="small" theme="primary" @click="visible = false">确定</t-button>
      </t-popconfirm>
    </t-space>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const visible = ref(true);
</script>
