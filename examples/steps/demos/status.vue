<template>
  <div>
    <t-steps :current="1">
      <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
      <t-step-item title="进行中的步骤" content="这里是提示文字"></t-step-item>
      <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
      <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
    </t-steps>
    <div style="margin: 16px 0;"></div>
    <t-steps :current="2">
      <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
      <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
      <t-step-item title="错误的步骤" status="error" content="优先展示`t-step`中设置的 status"></t-step-item>
      <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
    </t-steps>
  </div>
</template>
<script />