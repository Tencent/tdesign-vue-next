<template>
  <div class="tdesign-demo-block-column">
    <t-timeline>
      <t-timeline-item timestamp="2022-05-01"> 事件一 </t-timeline-item>
      <t-timeline-item timestamp="2022-05-01">
        <template #dot>
          <t-icon name="check-circle-filled" style="color: red" />
        </template>
        事件二
      </t-timeline-item>
      <t-timeline-item timestamp="2022-05-01">
        <template #dot>
          <t-icon name="home" style="color: green" />
        </template>
        事件三
      </t-timeline-item>
      <t-timeline-item timestamp="2022-05-01"> 事件四 </t-timeline-item>
    </t-timeline>
  </div>
</template>

<script lang="jsx" setup></script>
