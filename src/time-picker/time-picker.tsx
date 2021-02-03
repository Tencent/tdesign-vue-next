import Vue, { VueConstructor } from 'vue';
import moment from 'moment';

import { TimePickerInstance, TimeInputEvent, InputTime, TimeInputType } from './type/index.d';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import pickerPanel from './panel';
import Input from './input';
import Icon from '../icon';
import { clickOut } from '../utils/dom';
import props from '../../types/time-picker/props';

import { EPickerCols, pmList, amList } from './constant';

const name = `${prefix}-time-picker`;
const defaultRangePlaceholder = ['开始时间', '结束时间'];

export default (Vue as VueConstructor<TimePickerInstance>).extend({
  name,

  components: {
    RenderComponent,
    pickerPanel,
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  // props: Props(),
  props: { ...props },

  data() {
    const {
      defaultValue,
      value,
    } = this.$props;
    // 初始化默认值
    const time = value || defaultValue;
    // 初始化数据
    return {
      els: [],
      focus: false,
      isShowPanel: false,
      // 时间对象
      time,
      // 初始值转input展示对象
      inputTime: this.setInputValue(time),
      // 初始化是否是range
      isRange: Array.isArray(time),
    };
  },

  computed: {
    // 传递给选择面板的时间值
    panelValue(): Array<moment.Moment> {
      const { $data: { time } } = this;
      if (Array.isArray(time)) return time;
      return !time || !time.hour ? [undefined] : [time];
      // return [moment('2020-11-11 22:22:22')]
    },
    textClassName(): string {
      const isDefault = this.inputTime.some((item: InputTime) => !!item.hour && !!item.minute && !!item.second);
      return isDefault ?  '' : `${name}__group-text`;
    },
    // 是否展示清空按钮
    clearVisible(): boolean {
      if (!this.clearable) return false;
      if (Array.isArray(this.time)) {
        return this.time[0] && this.time[1];
      }
      return Boolean(this.time);
    },
  },

  watch: {
    // 监听选中时间变动
    time(time: object) {
      this.$emit('change', time, this.output());
    },
    value: {
      handler() {
        this.$data.time = this.value;
        this.$data.inputTime = this.setInputValue(this.value);
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    this.initEvent(this.$el);
  },

  methods: {
    initEvent(el: Element) {
      this.els.push(el);
      if (this.els.length > 1) {
        clickOut(this.els, () => {
          this.isShowPanel = false;
        });
      }
    },
    getPanelDom(el: Element) {
      this.initEvent(el);
    },
    // input外框
    handlerClickInput() {
      if (this.disabled) {
        return;
      }
      this.isShowPanel = true;
    },
    // 输入变化
    inputChange(data: TimeInputEvent, idx: number) {
      const {
        type,
        value,
      } = data;
      const {
        $data: {
          // 鉴别是range还是单picker
          isRange,
          time,
        },
      } = this;
      let newTime = isRange ? time[idx] : time;
      if (value === -1) {
        // 特殊标识，需要清空input
        this.$data.inputTime[idx][type] = undefined;
        // 需要重置该类型时间
        newTime[type](0);
        const emptySetTime = isRange ? [...this.$data.time] : moment(newTime);
        if (isRange) {
          emptySetTime[idx] = moment(newTime);
        }
        this.$data.time = emptySetTime;
        return;
      } if (!newTime) {
        // 默认值不存在
        newTime = moment();
        newTime.hour(0);
        newTime.minute(0);
        newTime.second(0);
      }
      // 设置时间
      newTime[type](value);
      // 生成变动
      const _setTime = isRange ? [...this.$data.time] : moment(newTime);
      // 赋值,对于range类型做处理
      if (isRange) {
        _setTime[idx] = moment(newTime);
      }
      this.$data.time = _setTime;
      // 转化展示数据
      this.$data.inputTime = this.setInputValue(_setTime);
    },
    // 输入失焦，赋值默认
    inputBlurDefault(type: TimeInputType, idx: number) {
      this.$data.inputTime[idx][type] = '00';
    },
    // 面板展示隐藏
    panelVisibleChange(val: boolean) {
      if (val) return this.$emit('open');
      this.$emit('close');
    },
    // 切换上下午
    toggleInputMeridian(idx: number) {
      // console.log(idx, 'number');
      let { $data: { time } } = this;
      if (Array.isArray(time)) {
        time = time[idx];
      }
      const current = time.format('a');
      const currentHour = time.hours() + (current === 'am' ? 12 : -12);
      // 时间变动
      this.inputChange({
        type: 'hour',
        value: currentHour,
      }, idx);
    },
    // 选中时间发生变动
    pickTime(col: EPickerCols, change: string|number, index: number, value: Record<string, any>) {
      // console.log(col, change, index, value);
      const { $data: { time } } = this;
      let _setTime = time;
      const isRange = Array.isArray(_setTime);
      if (
        [EPickerCols.hour, EPickerCols.minute, EPickerCols.second].includes(col)
      ) {
        // 时分秒 moment hour minute second api变动时间
        value[col](change);
      } else {
        // 当前上下午
        let currentHour = value.hours();
        // 上下午
        if (amList.includes(change as string)) {
          // 上午
          currentHour += 12;
        } else if (pmList.includes(change as string)) {
          // 下午
          currentHour -= 12;
        }
        value.hour(currentHour);
      }
      // 设置最终值
      if (isRange) {
        // range
        // 找到变动下标
        _setTime[index] = value;
        _setTime = [
          _setTime[0] ? moment(_setTime[0]) : undefined,
          _setTime[1] ? moment(_setTime[1]) : undefined,
        ];
      } else {
        _setTime = value;
        _setTime = moment(_setTime);
      }
      this.$data.time = _setTime;

      this.$data.inputTime = this.setInputValue(_setTime);
    },
    // 确定按钮
    makeSure() {
      this.isShowPanel = false;
      this.$emit('change', this.$data.time, this.output());
    },
    // 此刻按钮
    nowAction() {
      this.isShowPanel = false;
      this.$data.time = moment();
      this.$data.inputTime = this.setInputValue(this.$data.time);
    },
    // format输出结果
    output() {
      if (Array.isArray(this.$data.time)) {
        return this.$data.time.map(item => item ? item.format(this.format) : item);
      }
      return this.$data.time ? this.$data.time.format(this.format) : undefined;
    },
    // 设置输入框展示
    setInputValue(val: any | Array<any>): Array<InputTime | undefined> {
      const isRange = Array.isArray(val);
      if (!val || (!isRange && !val.hour)) return [
        {
          hour: undefined,
          minute: undefined,
          second: undefined,
          meridian: 'am',
        },
      ];

      return (!isRange ? [val] : val).map((item: any) => this.moment2InputTime(item));
    },
    // moment对象转换输入展示数据
    moment2InputTime(val: any): InputTime {
      const { $props: { format } } = this;
      if (!val) return {
        hour: undefined,
        minute: undefined,
        second: undefined,
        meridian: 'am',
      };

      let hour = val.hour();
      let minute = val.minute();
      let second = val.second();
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
        meridian: val.format('a'),
      };
    },
    // 清除选中
    clear() {
      const { $data: { isRange } } = this;
      this.$data.time = isRange ? [undefined, undefined] : undefined;
      this.$data.inputTime = this.setInputValue(this.$data.time);
    },
    renderInputItem(index: number) {
      const item = this.inputTime[index];
      return <Input
        moment={item}
        format={this.format}
        allowInput={this.allowInput}
        placeholder={!this.isRange ? this.placeholder : (Array.isArray(this.placeholder) ? this.placeholder : defaultRangePlaceholder)[index]}
        onToggleMeridian={() => this.toggleInputMeridian(index)}
        onBlurDefault={(type: TimeInputType) => this.inputBlurDefault(type, index)}
        onChange={(e: TimeInputEvent) => this.inputChange(e, index)} />;
    },
    renderInput() {
      // const showRange = this.isRange && this.time[1];
      const inputClassName = [`${name}__group`];
      if (this.disabled) {
        inputClassName.push('disabled');
      }
      if (this.isShowPanel) {
        inputClassName.push('active');
      }
      return <div class={inputClassName} onClick={this.handlerClickInput}>
        {
          this.renderInputItem(0)
        }
        {
          this.isRange && <span class={this.textClassName}>至</span>
        }
        {
          this.isRange && this.renderInputItem(1)
        }
      </div>;
    },
  },

  render() {
    // 初始化数据
    const {
      $props: {
        size,
        className,
      },
    } = this;
    // 样式类名
    const classes = [
      name,
      CLASSNAMES.SIZE[size] || '',
      className,
    ];

    return <span
      class={classes}
      ref="timePickerReference">
      {
        /*
        生成输入框
        */
      }
      {
        this.renderInput()
      }
      <Icon class={[`${name}__icon`, `${name}__icon-time`, !this.clearVisible ? `${name}__icon-time-show` : '']} name="time"/>
      <picker-panel
        ref="panel"
        format={this.format}
        moment={this.panelValue}
        disabled={this.disabled}
        isShowPanel={this.isShowPanel}
        ondom={this.getPanelDom}
        ontime-pick={this.pickTime}
        onsure={this.makeSure}
        onnow-action={this.nowAction}
        onvisible-change={this.panelVisibleChange}
        steps={this.steps}
        hideDisabledTime={this.hideDisabledTime}
        disableTime={this.disableTime}
        refDom={this.$refs.timePickerReference}
        isFocus={this.$data.focus}></picker-panel>
        {
          /*
          尾部icon-是否展示清空按钮
          */
        }
        {
          this.clearVisible
            ? <span class={`${name}__icon-clear-wrap`} onClick={this.clear}>
              <Icon
                name="clear-circle-filled"
                class={[`${name}__icon`, `${name}__icon-clear`]} />
            </span>
            : null
        }
    </span>;
  },

});
