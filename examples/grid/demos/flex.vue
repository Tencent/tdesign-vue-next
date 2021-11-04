<template>
  <div class="tdesign-demo-item--grid">
    <t-row>
      <t-col :flex="2">
        <div>2 / 5</div>
      </t-col>
      <t-col :flex="3">
        <div>3 / 5</div>
      </t-col>
    </t-row>

    <t-row>
      <t-col flex="100px">
        <div>100px</div>
      </t-col>
      <t-col flex="auto">
        <div>auto</div>
      </t-col>
    </t-row>

    <t-row>
      <t-col flex="1 1 200px">
        <div>1 1 200px</div>
      </t-col>
      <t-col flex="0 1 300px">
        <div>0 1 300px</div>
      </t-col>
    </t-row>

    <t-row>
      <t-col flex="none">
        <div style="padding: 0 16px">none</div>
      </t-col>
      <t-col flex="auto">
        <div>auto with no-wrap</div>
      </t-col>
    </t-row>
  </div>
</template>
<script />