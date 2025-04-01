<template>
  <t-chat-item
    avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
    name="AI"
    role="assistant"
    datetime="今天16:38"
    :content="markdownContent"
    :reasoning="{
      expandIconPlacement: 'right',
      onExpandChange: handleChange(),
      collapsePanelProps: {
        header: renderHeader(true),
        content: renderReasoningContent(reasoningContent),
      },
    }"
    variant="text"
  ></t-chat-item>
</template>
<script setup lang="jsx">
const reasoningContent = `嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。`;
const markdownContent = `牛顿第一定律（惯性定律）**并不适用于所有参考系**，它只在**惯性参考系**中成立。以下是关键点：

---

### **1. 牛顿第一定律的核心**
- **内容**：物体在不受外力（或合力为零）时，将保持静止或匀速直线运动状态。
- **本质**：定义了惯性系的存在——即存在一类参考系，在其中惯性定律成立。`;
const handleChange = (value) => {
  console.log('handleChange', value);
};
const hederStyle = {
  display: 'flex',
  alignItems: 'center',
};
/**
 * 渲染推理模块的头部自定义内容
 * @param {boolean} flag - 思维链内容是否加载中
 * @param {string} endText - 思维链加载完成时显示的文本
 * @returns {JSX.Element} 返回对应的头部组件
 */
const renderHeader = (flag) => {
  if (flag) {
    return <t-chat-loading text="思考中..." indicator />;
  }
  return (
    <t-space align="center">
      <t-icon
        name="check-circle"
        style={{
          color: 'var(--td-success-color-5)',
          fontSize: '20px',
          marginRight: '8px',
        }}
      />
      <span>{endText}</span>
    </t-space>
  );
};
const renderReasoningContent = (content) => <t-chat-content content={content} role="assistant" />;
</script>
<style scoped></style>
