<template>
  <div class="tdesign-demo-item--input__input-box">
    <div>
      <t-input-group separate>
        <t-input :style="{ width: '100px' }" default-value="0731" />
        <t-input default-value="12345677" />
      </t-input-group>
    </div>
    <div>
      <t-input-group separate>
        <t-input />
        <t-input />
      </t-input-group>
    </div>
    <div>
      <t-input-group>
        <t-input />
        <t-input />
      </t-input-group>
    </div>
    <div>
      <t-input-group separate>
        <t-input :style="{ width: '100px' }" default-value="0731"/>
        <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
        <t-input :style="{ width: '100px' }" default-value="12345"/>
        <t-input :style="{ width: '100px' }" default-value="678901"/>
        <t-input :style="{ width: '100px' }" />
      </t-input-group>
    </div>
  </div>
</template>

<style scoped>
.t-input-group {
  margin-bottom: 16px;
}
</style>
