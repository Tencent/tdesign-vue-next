<template>
  <div class="controllerConfig-demo">
    <div style="margin: 12px 0" v-if="controllerConfig">
      <fieldset>
        <legend>控件全局</legend>
        <p>
          <label>是否显示（全部控件）：</label>
          <t-switch v-model="controllerConfig.visible"></t-switch>
        </p>
        <p>
          <label>是否禁用（全部控件）：</label>
          <t-switch v-model="controllerConfig.disabled"></t-switch>
        </p>
      </fieldset>

      <fieldset>
        <legend>控件局部</legend>
        <p>
          <label>是否显示“模式切换”控件：</label>
          <t-switch v-model="controllerConfig.mode.visible"></t-switch>
          <label>是否禁用“模式切换”控件：</label>
          <t-switch v-model="controllerConfig.mode.radioGroupProps.disabled"></t-switch>
        </p>
        <p>
          <label>是否显示“年份选择”控件：</label>
          <t-switch v-model="controllerConfig.year.visible"></t-switch>
          <label>是否禁用“年份选择”控件：</label>
          <t-switch v-model="controllerConfig.year.selecteProps.disabled"></t-switch>
        </p>
        <p>
          <label>是否显示“月份选择”控件：</label>
          <t-switch v-model="controllerConfig.month.visible"></t-switch>
          <label>是否禁用“月份选择”控件：</label>
          <t-switch v-model="controllerConfig.month.selecteProps.disabled"></t-switch>
        </p>
        <p>
          <label>是否禁用“隐藏周末”控件：</label>
          <t-switch v-model="controllerConfig.weekend.hideWeekendButtonProps.disabled"></t-switch>
          <label>是否禁用“显示周末”控件：</label>
          <t-switch v-model="controllerConfig.weekend.showWeekendButtonProps.disabled"></t-switch>
          <label>是否显示“隐藏\显示周末”控件：</label>
          <t-switch v-model="controllerConfig.weekend.visible"></t-switch>
        </p>
        <p>
          <label>是否禁用“今天”按钮控件：</label>
          <t-switch v-model="controllerConfig.current.currentDayButtonProps.disabled"></t-switch>
          <label>是否禁用“本月”按钮控件：</label>
          <t-switch v-model="controllerConfig.current.currentMonthButtonProps.disabled"></t-switch>
          <label>是否显示“今天\本月”控件：</label>
          <t-switch v-model="controllerConfig.current.visible"></t-switch>
        </p>
      </fieldset>
    </div>
    <t-calendar :controllerConfig="controllerConfig.visible ? controllerConfig : false"></t-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      controllerConfig: {
        visible: true,
        disabled: false, // 是否禁用（全部控件）
        // 模式切换单选组件设置
        mode: {
          visible: true, // 是否显示
          radioGroupProps: {
            disabled: false,
            variant: 'default-filled',
          },
        },
        // 年份选择框组件相关设置
        year: {
          visible: true, // 是否显示
          selecteProps: {
            // 用于透传props给该select组件
            disabled: false,
          },
        },
        // 月份选择框组件相关设置
        month: {
          visible: true, // 是否显示（“year”模式下本身是不显示该组件的）
          selecteProps: {
            // 用于透传props给该select组件
            disabled: false,
          },
        },
        // 隐藏\显示周末按钮组件相关设置
        weekend: {
          visible: true, // 是否显示
          showWeekendButtonProps: {
            // 用于透传props给显示周末按钮组件
            disabled: false,
            variant: 'base',
          },
          hideWeekendButtonProps: {
            // 用于透传props给隐藏周末按钮组件
            disabled: false,
            variant: 'base',
            theme: 'danger',
          },
        },
        // “今天\本月”按钮组件相关设置
        current: {
          visible: true, // 是否显示
          currentDayButtonProps: {
            // 用于透传props给“今天”钮组件（“month”模式下有效）
            disabled: false,
            variant: 'base',
          },
          currentMonthButtonProps: {
            // 用于透传props给“本月”按钮组件（“year”模式下有效）
            disabled: false,
            variant: 'base',
          },
        },
      },
    };
  },
};
</script>

<style scoped>
.controllerConfig-demo fieldset {
  border: solid 1px #eee;
  padding: 10px 20px 10px 0;
  margin-bottom: 10px;
}
.controllerConfig-demo fieldset legend {
  margin-left: 20px;
  padding: 0 10px;
}
.controllerConfig-demo fieldset p {
  margin-bottom: 5px;
}
.controllerConfig-demo fieldset p label {
  margin-left: 20px;
}
</style>
