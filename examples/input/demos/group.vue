<template>
  <div class="tdesign-demo-item--input__input-box">
    <div>
      <t-input-group separate>
        <t-input :style="{ width: '100px' }" />
        <t-input />
      </t-input-group>
    </div>
    <div>
      <t-input-group separate>
        <t-input :style="{ width: '100px' }" />
        <t-input :style="{ marginLeft: '-1px' }"/>
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
        <t-input :style="{ width: '100px' }" />
        <span :style="{ lineHeight: '32px' }">&nbsp;-&nbsp;</span>
        <t-input :style="{ width: '100px' }" />
        <t-input :style="{ width: '100px' }" />
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
