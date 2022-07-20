<template>
  <div class="tdesign-demo-block-column">
    <t-timeline>
      <t-timeline-item timestamp="2022-05-01"> 已完成的事件 </t-timeline-item>
      <t-timeline-item timestamp="2022-05-01"> 已完成的事件 </t-timeline-item>
      <t-timeline-item timestamp="2022-05-01" :hollow="false"> 进行中的事件 </t-timeline-item>
      <t-timeline-item timestamp="2022-05-01" disabled> 未开始的事件 </t-timeline-item>
    </t-timeline>
  </div>
</template>

<script lang="jsx" setup></script>
