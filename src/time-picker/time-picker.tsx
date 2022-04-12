import { defineComponent, nextTick } from 'vue';
import dayjs from 'dayjs';
import isFunction from 'lodash/isFunction';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { TimeIcon } from 'tdesign-icons-vue-next';
import { TimePickerPanelInstance, TimeInputEvent, InputTime, TimeInputType } from './interface';
import TPopup, { PopupVisibleChangeContext } from '../popup';
import PickerPanel from './panel';
import TInput from '../input';
import { emitEvent } from '../utils/event';

import InputItems from './input-items';

import props from './props';

import { EPickerCols, EMPTY_VALUE, amFormat, pmFormat, AM } from './constant';

// hooks
import { useFormDisabled } from '../form/hooks';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'TTimePicker',
  components: {
    PickerPanel,
    TimeIcon,
    TPopup,
    TInput,
    InputItems,
  },

  props: { ...props },

  emits: ['change', 'input', 'close', 'open', 'focus', 'blur'],

  setup() {
    const disabled = useFormDisabled();
    const COMPONENT_NAME = usePrefixClass('time-picker');
    const { SIZE, STATUS } = useCommonClassName();
    const { global } = useConfig('timePicker');

    return {
      global,
      SIZE,
      STATUS,
      COMPONENT_NAME,
      disabled,
    };
  },

  data() {
    const { defaultValue, value } = this.$props;
    // 初始化默认值
    const time = value || defaultValue;
    // 初始化数据
    return {
      els: [],
      focus: false,
      isShowPanel: false,
      // 时间对象
      time: time ? dayjs(time, this.format) : undefined,
      // 初始值转input展示对象
      inputTime: time ? this.setInputValue(dayjs(time, this.format)) : undefined,
      needClear: false,
    };
  },
  computed: {
    // 传递给选择面板的时间值
    panelValue(): Array<dayjs.Dayjs> {
      const {
        $data: { time },
      } = this;
      if (time) {
        return [dayjs(time, this.format)];
      }
      if (this.steps.filter((step) => step !== 1).length < 1) {
        return [dayjs()];
      }
      return [dayjs().hour(0).minute(0).second(0)];
    },
    textClassName(): string {
      const isDefault = !!this.inputTime?.hour && !!this.inputTime?.minute && !!this.inputTime?.second;
      return isDefault ? '' : `${this.COMPONENT_NAME}__group-text`;
    },
  },

  watch: {
    value: {
      handler() {
        this.time = this.value ? dayjs(this.value, this.format) : undefined;
        this.inputTime = this.value ? this.setInputValue(dayjs(this.value, this.format)) : undefined;
      },
    },
  },
  methods: {
    // 输入变化
    inputChange(event: TimeInputEvent) {
      const { type, value } = event;
      const {
        $data: {
          // 鉴别是range还是单picker
          time,
        },
      } = this;
      let newTime = time;
      if (value === EMPTY_VALUE) {
        // 特殊标识，需要清空input
        this.inputTime[type] = undefined;
        // 需要重置该类型时间
        newTime[type](0);
        return;
      }
      if (!newTime) {
        // 默认值不存在
        newTime = dayjs();
        newTime.hour(0);
        newTime.minute(0);
        newTime.second(0);
      }
      // 设置时间
      newTime = newTime.set(type, value);
      // 生成变动
      this.time = dayjs(newTime);
      // 转化展示数据
      this.inputTime = this.setInputValue(this.time);
      emitEvent(this, 'input', { input: value, value: this.time.format(this.format), e: event });
      const panelRef = this.$refs.panel as TimePickerPanelInstance;
      panelRef.panelColUpdate();
    },
    // @blur
    onBlurDefault(e: Event, trigger: TimeInputType, index: number, input: number) {
      emitEvent(this, 'blur', {
        trigger,
        input,
        value: this.time.format(this.format),
        e,
      });
    },
    // @focus
    onFocusDefault(e: Event, trigger: TimeInputType, index: number, input: number) {
      emitEvent(this, 'focus', {
        trigger,
        input,
        value: this.time.format(this.format),
        e,
      });
    },
    // 面板展示隐藏
    panelVisibleChange(val: boolean, context?: PopupVisibleChangeContext) {
      if (context.trigger) {
        const isClickDoc = context.trigger === 'document';
        this.isShowPanel = !isClickDoc;
        emitEvent(this, isClickDoc ? 'close' : 'open', context);
      } else {
        this.isShowPanel = val;
        emitEvent(this, val ? 'open' : 'close', context);
      }
    },
    // 切换上下午
    toggleInputMeridiem() {
      const {
        $data: { time },
      } = this;
      const current = time.format('A');
      const currentHour = time.hour() + (current === AM ? 12 : -12);
      // 时间变动
      this.inputChange({
        type: 'hour',
        value: currentHour,
      });
    },
    // 选中时间发生变动
    pickTime(col: EPickerCols, change: string | number, index: number, value: Record<string, any>) {
      const { time, format } = this;
      let setTime = time;

      if (EPickerCols.hour === col) {
        setTime = value.set(
          col,
          value.hour() >= 12 && (amFormat.test(format) || pmFormat.test(format)) ? Number(change) + 12 : change,
        );
      } else if ([EPickerCols.minute, EPickerCols.second].includes(col)) {
        setTime = value.set(col, change);
      } else {
        // 当前上下午
        let currentHour = value.hour();
        // 上下午
        if (change === this.global.anteMeridiem && currentHour > 12) {
          // 上午
          currentHour -= 12;
        } else if (change === this.global.postMeridiem && currentHour < 12) {
          // 下午
          currentHour += 12;
        }
        setTime = value.hour(currentHour);
      }
      this.time = setTime;

      this.inputTime = this.setInputValue(setTime);
      const formatValue = dayjs(setTime).format(this.format);
      emitEvent(this, 'change', formatValue);
    },
    // 确定按钮
    makeSure(e: MouseEvent) {
      this.panelVisibleChange(false, { e });
      this.output();
    },
    // 此刻按钮
    nowAction() {
      const currentTime = dayjs();
      // 如果此刻在不可选的时间上, 直接return
      if (
        isFunction(this.disableTime) &&
        this.disableTime(currentTime.get('hour'), currentTime.get('minute'), currentTime.get('second'))
      ) {
        return;
      }
      this.time = currentTime;
      this.inputTime = this.setInputValue(this.time);
      emitEvent(this, 'change', currentTime.format(this.format));
    },
    // format输出结果
    output() {
      if (this.needClear) {
        this.inputTime = this.setInputValue(undefined);
        this.needClear = false;
      } else {
        this.time = this.time ?? dayjs();
        this.inputTime = this.setInputValue(this.time);
      }
    },
    // 设置输入框展示
    setInputValue(val: dayjs.Dayjs | undefined): InputTime | undefined {
      const ans: InputTime = {
        hour: undefined,
        minute: undefined,
        second: undefined,
        meridiem: AM,
      };
      if (!val) return ans;
      return this.dayjs2InputTime(val);
    },
    // dayjs对象转换输入展示数据
    dayjs2InputTime(val: dayjs.Dayjs): InputTime {
      const {
        $props: { format },
      } = this;
      if (!val) {
        return {
          hour: undefined,
          minute: undefined,
          second: undefined,
          meridiem: AM,
        };
      }

      let hour: number | string = val.hour();
      let minute: number | string = val.minute();
      let second: number | string = val.second();
      // 判断12小时制上下午显示问题
      if (/[h]{1}/.test(format)) {
        hour %= 12;
      }
      // 判定是否补齐小于10
      if (/[h|H]{2}/.test(format)) {
        hour = hour < 10 ? `0${hour}` : hour;
      }
      if (/[m|M]{2}/.test(format)) {
        minute = minute < 10 ? `0${minute}` : minute;
      }
      if (/[s|S]{2}/.test(format)) {
        second = second < 10 ? `0${second}` : second;
      }

      return {
        hour,
        minute,
        second,
        meridiem: val.format('a'),
      };
    },
    // 清除选中
    clear(context: { e: MouseEvent }) {
      const { e } = context;
      this.time = undefined;
      this.needClear = true;
      this.inputTime = this.setInputValue(undefined);
      emitEvent(this, 'change', undefined);
      e.stopPropagation();
    },
    handleTInputFocus() {
      // TODO: 待改成select-input后删除
      // hack 在input聚焦时马上blur 避免出现输入光标
      nextTick(() => {
        (this.$refs.tInput as HTMLInputElement).blur();
      });
    },
    renderInput() {
      const classes = [
        `${this.COMPONENT_NAME}__group`,
        {
          [this.STATUS.focused]: this.isShowPanel,
        },
      ];

      const slots = {
        'suffix-icon': () => <time-icon />,
      };
      return (
        <div class={classes} onClick={() => (this.isShowPanel = true)}>
          <t-input
            disabled={this.disabled}
            size={this.size}
            onClear={this.clear}
            clearable={this.clearable}
            placeholder=" "
            value={this.time ? ' ' : undefined}
            v-slots={slots}
            ref="tInput"
            onFocus={this.handleTInputFocus}
          ></t-input>
          <input-items
            size={this.size}
            dayjs={this.inputTime}
            disabled={this.disabled}
            format={this.format}
            steps={this.steps}
            allowInput={this.allowInput}
            placeholder={this.placeholder || this.global.placeholder}
            onToggleMeridiem={() => this.toggleInputMeridiem()}
            onBlurDefault={this.onBlurDefault}
            onFocusDefault={this.onFocusDefault}
            onChange={(e: TimeInputEvent) => this.inputChange(e)}
          />
        </div>
      );
    },
  },

  render() {
    // 初始化数据
    const {
      size,
      $attrs: { className },
      disabled,
    } = this;
    // 样式类名
    const classes = [this.COMPONENT_NAME, this.SIZE[size] || '', className];

    const slots = {
      content: () => (
        <picker-panel
          ref="panel"
          format={this.format}
          value={this.panelValue}
          disabled={this.disabled}
          isShowPanel={this.isShowPanel}
          onTimePick={this.pickTime}
          onSure={this.makeSure}
          onNowAction={this.nowAction}
          steps={this.steps}
          hideDisabledTime={this.hideDisabledTime}
          disableTime={this.disableTime}
          isFocus={this.focus}
        />
      ),
    };

    return (
      <t-popup
        ref="popup"
        placement="bottom-left"
        class={classes}
        trigger="click"
        disabled={disabled}
        visible={this.isShowPanel}
        overlayClassName={`${this.COMPONENT_NAME}__panel-container`}
        onVisibleChange={this.panelVisibleChange}
        expandAnimation={true}
        v-slots={slots}
      >
        {this.renderInput()}
      </t-popup>
    );
  },
});
