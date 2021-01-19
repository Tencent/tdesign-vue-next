<template>
  <div class="tdesign-radio-button-size">
    <div>
      <div>
        <t-radio-group size="small" default-value="bj">
          <t-radio-button value="bj">北京</t-radio-button>
          <t-radio-button value="sh">上海</t-radio-button>
          <t-radio-button value="gz">广州</t-radio-button>
          <t-radio-button value="sz">深圳</t-radio-button>
        </t-radio-group>
      </div>

      <div>
        <t-radio-group default-value="sh">
          <t-radio-button value="bj">北京</t-radio-button>
          <t-radio-button value="sh">上海</t-radio-button>
          <t-radio-button value="gz">广州</t-radio-button>
          <t-radio-button value="sz">深圳</t-radio-button>
        </t-radio-group>
      </div>

      <div>
        <t-radio-group size="large" default-value="gz">
          <t-radio-button value="bj">北京</t-radio-button>
          <t-radio-button value="sh">上海</t-radio-button>
          <t-radio-button value="gz">广州</t-radio-button>
          <t-radio-button value="sz">深圳</t-radio-button>
        </t-radio-group>
      </div>
    </div>
    <div>
      <div>
        <t-radio-group size="small" buttonStyle="solid" default-value="bj">
          <t-radio-button value="bj">北京</t-radio-button>
          <t-radio-button value="sh">上海</t-radio-button>
          <t-radio-button value="gz">广州</t-radio-button>
          <t-radio-button value="sz">深圳</t-radio-button>
        </t-radio-group>
      </div>

      <div>
        <t-radio-group buttonStyle="solid" default-value="sh">
          <t-radio-button value="bj">北京</t-radio-button>
          <t-radio-button value="sh">上海</t-radio-button>
          <t-radio-button value="gz">广州</t-radio-button>
          <t-radio-button value="sz">深圳</t-radio-button>
        </t-radio-group>
      </div>

      <div>
        <t-radio-group size="large" buttonStyle="solid" default-value="gz">
          <t-radio-button value="bj">北京</t-radio-button>
          <t-radio-button value="sh">上海</t-radio-button>
          <t-radio-button value="gz">广州</t-radio-button>
          <t-radio-button value="sz">深圳</t-radio-button>
        </t-radio-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
.t-radio-group {
  margin-bottom: 16px;
}
.tdesign-radio-button-size {
  display: flex;
  justify-content: space-around;
}
</style>
