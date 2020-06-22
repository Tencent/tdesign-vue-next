<template>
  <div>

    <t-tabs
      activeName="second"
      theme="card"
      size="large"
    >
      <t-tab-panel name="first" label="卡片选项卡1">
        <p style="padding: 25px;">卡片选项卡1</p>
      </t-tab-panel>
      <t-tab-panel name="second" label="卡片选项卡2">
        <p style="padding: 25px;">卡片选项卡2</p>
      </t-tab-panel>
      <t-tab-panel name="third" label="卡片选项卡3">
        <p style="padding: 25px;">卡片选项卡3</p>
      </t-tab-panel>
    </t-tabs>

    <br />

    <t-tabs activeName="first">
      <t-tab-panel name="first" label="选项卡1">
        <p style="padding: 25px;">选项卡1</p>
      </t-tab-panel>
      <t-tab-panel name="second" label="选项卡2" :disabled="true">
        <p style="padding: 25px;">选项卡2</p>
      </t-tab-panel>
      <t-tab-panel name="third" label="选项卡3">
        <p style="padding: 25px;">选项卡3</p>
      </t-tab-panel>
    </t-tabs>

    <br />

    <t-tabs activeName="1">
      <t-tab-panel name="1" label="选项卡1">
        <p style="padding: 25px;">选项卡1</p>
      </t-tab-panel>
      <t-tab-panel name="2" label="选项卡2">
        <p style="padding: 25px;">选项卡2</p>
      </t-tab-panel>
      <t-tab-panel name="3" label="选项卡3">
        <p style="padding: 25px;">选项卡3</p>
      </t-tab-panel>
      <t-tab-panel name="4" label="选项卡4">
        <p style="padding: 25px;">选项卡4</p>
      </t-tab-panel>
      <t-tab-panel name="5" label="选项卡5">
        <p style="padding: 25px;">选项卡5</p>
      </t-tab-panel>
      <t-tab-panel name="6" label="选项卡6">
        <p style="padding: 25px;">选项卡6</p>
      </t-tab-panel>
      <t-tab-panel name="7" label="选项卡7">
        <p style="padding: 25px;">选项卡7</p>
      </t-tab-panel>
    </t-tabs>

    <br />

    <t-tabs activeName="1" theme="card">
      <t-tab-panel name="1" label="选项卡1">
        <p style="padding: 25px;">选项卡1</p>
      </t-tab-panel>
      <t-tab-panel name="2" label="选项卡2">
        <p style="padding: 25px;">选项卡2</p>
      </t-tab-panel>
      <t-tab-panel name="3" label="选项卡3">
        <p style="padding: 25px;">选项卡3</p>
      </t-tab-panel>
      <t-tab-panel name="4" label="选项卡4">
        <p style="padding: 25px;">选项卡4</p>
      </t-tab-panel>
      <t-tab-panel name="5" label="选项卡5">
        <p style="padding: 25px;">选项卡5</p>
      </t-tab-panel>
      <t-tab-panel name="6" label="选项卡6">
        <p style="padding: 25px;">选项卡6</p>
      </t-tab-panel>
      <t-tab-panel name="7" label="选项卡7">
        <p style="padding: 25px;">选项卡7</p>
      </t-tab-panel>
    </t-tabs>

  </div>
</template>
