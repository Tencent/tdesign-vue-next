import { isBoolean, isFunction } from 'lodash-es';
import { computed, nextTick } from '@td/adapter-vue';
import dayjs from 'dayjs';
import { COMPONENT_NAME } from '../const';
import type { CalendarState } from '../interface';
import type { ControllerOptions, TdCalendarProps } from '../type';
import { useConfig } from '../../hooks/useConfig';

function getDefaultControllerConfigData(visible = true): Record<string, any> {
  return {
    visible, // 是否显示（全部控件）
    disabled: false, // 是否禁用（全部控件）
    // 模式切换单选组件设置
    mode: {
      visible: true, // 是否显示
      radioGroupProps: {}, // 用于透传props给该radioGroup组件
    },
    // 年份选择框组件相关设置
    year: {
      visible: true, // 是否显示
      selectProps: {}, // 用于透传props给该select组件
    },
    // 年份选择框组件相关设置
    month: {
      visible: true, // 是否显示（“year”模式下本身是不显示该组件的）
      selectProps: {}, // 用于透传props给该select组件
    },
    // 隐藏\显示周末按钮组件相关设置
    weekend: {
      visible: true, // 是否显示
      showWeekendButtonProps: {}, // 用于透传props给显示周末按钮组件
      hideWeekendButtonProps: {}, // 用于透传props给隐藏周末按钮组件
    },
    // “今天\本月”按钮组件相关设置
    current: {
      visible: true, // 是否显示
      currentDayButtonProps: {}, // 用于透传props给“今天”钮组件（“month”模式下有效）
      currentMonthButtonProps: {}, // 用于透传props给“本月”按钮组件（“year”模式下有效）
    },
  };
}

export function userController(props: TdCalendarProps, state: CalendarState) {
  const { globalConfig } = useConfig(COMPONENT_NAME);

  const options = computed<ControllerOptions>(() => {
    const dayJsFilterDate = dayjs(`${state.curSelectedYear}-${state.curSelectedMonth}`);
    const re = {
      isShowWeekend: state.isShowWeekend,
      filterDate: dayJsFilterDate.toDate(),
      formattedFilterDate: dayJsFilterDate.format(props.format),
      mode: state.curSelectedMode,
    };
    return re;
  });
  const configData = computed<Record<string, any>>(() => {
    const controllerConfig = props.controllerConfig ?? globalConfig.value.controllerConfig ?? true;
    if (isBoolean(controllerConfig)) {
      return getDefaultControllerConfigData(controllerConfig);
    }
    return {
      ...getDefaultControllerConfigData(),
      ...controllerConfig,
    };
  });
  const visible = computed<boolean>(() => {
    return !!configData.value && configData.value.visible;
  });
  /**
   * 判断某个控件是否显示
   * @param name 控件对应的配置节点名（对应controllerConfigData）
   * @returns true表示显示
   */
  function checkControllerVisible(name: string): boolean {
    let re = true;
    const conf = configData.value;
    if (!conf || !conf.visible || conf[name] === false || (conf[name] && !conf[name].visible)) {
      re = false;
    }
    return re;
  }
  /**
   * 判断某个控件是否禁用
   * @param name 控件对应的配置节点名（对应controllerConfigData）
   * @param propsName 表示禁用的控件属性（对应controllerConfigData）
   * @returns true表示禁用
   */
  function checkControllerDisabled(name: string, propsName: string): boolean {
    let re = false;
    const conf = configData.value;
    if (conf && (conf.disabled || (conf[name] && conf[name][propsName] && conf[name][propsName].disabled))) {
      re = true;
    }
    return re;
  }
  function emitControllerChange() {
    nextTick(() => {
      isFunction(props.onControllerChange) && props.onControllerChange({ ...options.value });
    });
  }

  return {
    options,
    configData,
    visible,
    checkControllerVisible,
    checkControllerDisabled,
    emitControllerChange,
  };
}
