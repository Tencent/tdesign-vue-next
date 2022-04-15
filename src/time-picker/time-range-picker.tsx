import { defineComponent, nextTick } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';
import { TimeIcon } from 'tdesign-icons-vue-next';

import { TimeInputEvent, InputTime, TimePickerPanelInstance } from './interface';
import TPopup, { PopupVisibleChangeContext } from '../popup';
import PickerPanel from './panel';
import TInput from '../input';
import InputItems from './input-items';
import props from './time-range-picker-props';
import { emitEvent } from '../utils/event';

import { EPickerCols, TIME_PICKER_EMPTY, EMPTY_VALUE, amFormat, pmFormat, AM } from './constant';

import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'TTimeRangePicker',

  components: {
    PickerPanel,
    TimeIcon,
    InputItems,
    TPopup,
    TInput,
  },

  props: { ...props },

  emits: ['input', 'click', 'blur', 'focus', 'change', 'close', 'open'],
  setup() {
    const COMPONENT_NAME = usePrefixClass('time-picker');
    const { SIZE, STATUS } = useCommonClassName();
    const { global } = useConfig('timePicker');
    return {
      global,
      STATUS,
      SIZE,
      COMPONENT_NAME,
    };
  },
  data() {
    // 初始化数据
    return {
      els: [],
      focus: false,
      isShowPanel: false,
      // 时间对象
      time: TIME_PICKER_EMPTY as Array<dayjs.Dayjs>,
      // 初始值转input展示对象
      inputTime: TIME_PICKER_EMPTY as Array<InputTime>,
    };
  },

  computed: {
    // 传递给选择面板的时间值
    panelValue(): Array<dayjs.Dayjs> {
      const time = this.time || TIME_PICKER_EMPTY;
      return time.map((val: dayjs.Dayjs) => (val ? dayjs(val) : dayjs()));
    },
    textClassName(): string {
      const isDefault = (this.inputTime as any).some(
        (item: InputTime) => !!item.hour && !!item.minute && !!item.second,
      );
      return isDefault ? '' : `${this.COMPONENT_NAME}__group-text`;
    },
  },

  watch: {
    value: {
      handler(val, oldVal) {
        if (JSON.stringify(val) === JSON.stringify(oldVal)) return;
        const values = Array.isArray(this.value) ? this.value : [];
        const { format } = this;
        function getVal(value: string | undefined) {
          return value ? dayjs(value, format) : undefined;
        }
        const dayjsList = [getVal(values[0]), getVal(values[1])];
        this.time = dayjsList;
        this.updateInputTime();
      },
      immediate: true,
    },
  },
  methods: {
    // 输入变化
    inputChange(event: TimeInputEvent) {
      const { type, value, index } = event;
      let newTime = this.time[index];
      if (value === EMPTY_VALUE) {
        // 特殊标识，需要清空input
        this.inputTime[index][type] = undefined;
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
      newTime = newTime.set(type, value);
      // 生成变动
      this.time[index] = dayjs(newTime);
      // 转化展示数据
      this.updateInputTime();

      emitEvent(this, 'input', { input: value, value: this.time[index].format(this.format), e: event });
      const panelRef = this.$refs.panel as TimePickerPanelInstance;
      panelRef.panelColUpdate();
    },
    getFormatValues() {
      const values: Array<string> = [];
      this.time.forEach((time) => {
        if (time) {
          values.push(time.format(this.format));
        }
      });
      return values;
    },
    // @blur
    onBlurDefault(e: Event) {
      const value = this.getFormatValues();
      emitEvent(this, 'blur', { value, e });
    },
    // @focus
    onFocusDefault(e: Event) {
      const value = this.getFormatValues();
      emitEvent(this, 'focus', { value, e });
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
    toggleInputMeridiem(index: number) {
      const curTime = this.time[index];
      const current = curTime.format('a');
      const currentHour = curTime.hour() + (current === AM ? 12 : -12);
      // 时间变动
      this.inputChange({ type: 'hour', value: currentHour, index });
    },
    // 选中时间发生变动
    pickTime(col: EPickerCols, change: string | number, index: number, value: Record<string, any>) {
      const { time, format } = this;
      const panelRef = this.$refs.panel as TimePickerPanelInstance;
      let shouldUpdatePanel = false;
      let setTime = time[index];
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
        if (change === this.global.anteMeridiem) {
          // 上午
          currentHour -= 12;
        } else if (change === this.global.postMeridiem) {
          // 下午
          currentHour += 12;
        }
        setTime = value.hour(currentHour);
      }
      this.time[index] = setTime;
      // 处理初始化为空的逻辑
      if (index === 0 && !this.time[1]) {
        this.time[1] = setTime;
        shouldUpdatePanel = true;
      } else if (index === 1 && !this.time[0]) {
        this.time[0] = dayjs().hour(0).minute(0).second(0);
        shouldUpdatePanel = true;
      }
      this.updateInputTime();
      shouldUpdatePanel && panelRef.panelColUpdate();
    },
    // 确定按钮
    makeSure(e: MouseEvent) {
      this.panelVisibleChange(false, { e });
    },
    // 设置输入框展示
    updateInputTime() {
      const {
        $props: { format },
      } = this;
      const disPlayValues: Array<InputTime> = [];
      (this.time || []).forEach((time: dayjs.Dayjs | undefined) => {
        if (!time) {
          disPlayValues.push({
            hour: undefined,
            minute: undefined,
            second: undefined,
            meridiem: AM,
          });
        } else {
          let hour: number | string = time.hour();
          let minute: number | string = time.minute();
          let second: number | string = time.second();
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
          disPlayValues.push({
            hour,
            minute,
            second,
            meridiem: time.format('a'),
          });
        }
      });
      this.inputTime = disPlayValues;
      this.triggerUpdateValue();
    },
    // 清除选中
    clear(context: { e: MouseEvent }) {
      const { e } = context;
      this.time = TIME_PICKER_EMPTY;
      this.updateInputTime();
      e.stopPropagation();
    },
    triggerUpdateValue() {
      const values: Array<string> = [];
      this.time.forEach((time) => {
        if (time) {
          values.push(time.format(this.format));
        }
      });
      emitEvent(this, 'change', values);
      isFunction(this.onChange) && this.onChange(values);
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
      return (
        <div class={classes} onClick={() => (this.isShowPanel = true)}>
          <t-input
            disabled={this.disabled}
            size={this.size}
            onClear={this.clear}
            clearable={this.clearable}
            placeholder=" "
            value={!isEqual(this.time, TIME_PICKER_EMPTY) ? ' ' : undefined}
            ref="tInput"
            onFocus={this.handleTInputFocus}
          >
            <time-icon slot="suffix-icon"></time-icon>
          </t-input>
          <input-items
            size={this.size}
            dayjs={this.inputTime}
            disabled={this.disabled}
            format={this.format}
            allowInput={this.allowInput}
            placeholder={this.placeholder || this.global.placeholder}
            isRangePicker
            onToggleMeridiem={(index: number) => this.toggleInputMeridiem(index)}
            onBlurDefault={this.onBlurDefault}
            onFocusDefault={this.onFocusDefault}
            onChange={(e: TimeInputEvent) => this.inputChange(e)}
            steps={this.steps}
          />
        </div>
      );
    },
  },
  render() {
    // 初始化数据
    const {
      $props: { size, disabled },
    } = this;
    // 样式类名
    const classes = [this.COMPONENT_NAME, this.SIZE[size]];

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
        class={classes}
        placement="bottom-left"
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
