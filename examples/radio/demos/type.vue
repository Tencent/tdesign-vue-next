<template>
  <div class="tdesign-radio-button-type">
    <div>
      <h5>普通单选按钮</h5>
      <t-radio-group default-value="gz">
        <t-radio value="bj">
          选项一
        </t-radio>
        <t-radio value="sh">
          选项二
        </t-radio>
        <t-radio value="gz">
          选项三
        </t-radio>
        <t-radio value="sz">
          选项四
        </t-radio>
      </t-radio-group>
    </div>
    <div>
      <h5>边框型单选按钮</h5>
      <t-radio-group default-value="1">
        <t-radio-button value="1">
          选项一
        </t-radio-button>
        <t-radio-button value="2">
          选项二
        </t-radio-button>
        <t-radio-button value="3">
          选项三
        </t-radio-button>
        <t-radio-button
          value="1"
          disabled
        >
          选中禁用态
        </t-radio-button>
        <t-radio-button
          value="2"
          disabled
        >
          未选中禁用态
        </t-radio-button>
      </t-radio-group>
    </div>
    <div>
      <h5>填充型单选按钮</h5>
      <t-radio-group
        variant="default-filled"
        default-value="gz"
      >
        <t-radio-button value="bj">
          选项一
        </t-radio-button>
        <t-radio-button value="gz">
          选项二
        </t-radio-button>
        <t-radio-button value="sz">
          选项三
        </t-radio-button>
        <t-radio-button value="4">
          选项四
        </t-radio-button>
        <t-radio-button value="5">
          选项五
        </t-radio-button>
      </t-radio-group>
    </div>
    <div>
      <t-radio-group
        variant="primary-filled"
        default-value="gz"
      >
        <t-radio-button value="bj">
          选项一
        </t-radio-button>
        <t-radio-button value="gz">
          选项二
        </t-radio-button>
        <t-radio-button value="sz">
          选项三
        </t-radio-button>
        <t-radio-button value="4">
          选项四
        </t-radio-button>
        <t-radio-button value="5">
          选项五
        </t-radio-button>
      </t-radio-group>
    </div>
    <div>
      <t-radio-group
        variant="default-filled"
        default-value="gz"
      >
        <t-radio-button
          value="1"
          disabled
        >
          选项一
        </t-radio-button>
        <t-radio-button
          value="2"
          disabled
        >
          选项二
        </t-radio-button>
        <t-radio-button
          value="3"
          disabled
        >
          选项三
        </t-radio-button>
        <t-radio-button
          value="gz"
          disabled
        >
          选中禁用态
        </t-radio-button>
        <t-radio-button
          value="bj"
          disabled
        >
          未选中禁用态
        </t-radio-button>
      </t-radio-group>
    </div>
    <div>
      <t-radio-group
        variant="primary-filled"
        default-value="gz"
      >
        <t-radio-button
          value="1"
          disabled
        >
          选项一
        </t-radio-button>
        <t-radio-button
          value="2"
          disabled
        >
          选项二
        </t-radio-button>
        <t-radio-button
          value="3"
          disabled
        >
          选项三
        </t-radio-button>
        <t-radio-button
          value="gz"
          disabled
        >
          选中禁用态
        </t-radio-button>
        <t-radio-button
          value="bj"
          disabled
        >
          未选中禁用态
        </t-radio-button>
      </t-radio-group>
    </div>
  </div>
</template>

<style scoped>
.t-radio-group {
  margin-bottom: 16px;
}
h5 {
  margin-bottom: 16px;
}
</style>
