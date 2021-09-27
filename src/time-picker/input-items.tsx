import { defineComponent } from 'vue';
import { TimeInputType, InputEvent, InputTime } from './interface';
import mixins from '../utils/mixins';
import getLocalReceiverMixins from '../locale/local-receiver';

import {
  COMPONENT_NAME, amFormat, KeyboardDirection, EMPTY_VALUE, MERIDIEM_LIST,
} from './constant';

import { prefix } from '../config';

const name = `${prefix}-time-picker-input-items`; // t-time-picker-input-items

export default defineComponent({
  ...mixins(getLocalReceiverMixins('timePicker')),
  name,

  props: {
    // 格式化标准
    format: {
      type: String,
    },
    // 时间
    dayjs: {
      type: [Object, Array, undefined],
      default: undefined,
    },
    // placeholder
    placeholder: {
      type: String,
    },
    allowInput: {
      type: Boolean,
    },
    isRangePicker: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
    },
  },

  computed: {
    displayTimeList(): Array<InputTime | undefined> | Record<string, any> {
      return this.isRangePicker ? this.dayjs : [this.dayjs];
    },
  },

  emits: ['change', 'blurDefault', 'focusDefault', 'toggleMeridiem'],

  methods: {
    // 输入事件
    onInput(e: Event, type: TimeInputType, index: number): void {
      if (!this.allowInput) return;
      const { target, data } = e as InputEvent;
      const { value } = target;
      const {
        $props: { format },
      } = this;
      const curDayJs = this.displayTimeList[index];
      let number = Number(value);
      if ((curDayJs[type] === '00' && number === 0) || value === '') {
        // 输入之前是00 输入之后是0
        // 清空
        this.$emit('change', {
          value: EMPTY_VALUE,
          type,
          index,
        });
      } else if (`${number}`.length > 2) {
        // 当前输入的数值大于两位数
        number = Number(data);
      }
      // 两位数判断
      // 是否使有效输入
      let emitChange = true;
      // 过滤掉非法输入
      if (!isNaN(number)) {
        switch (type) {
          case 'hour':
            if (number > (/[h]{1}/.test(format) ? 12 : 24) || number < 0) {
              emitChange = false;
            }
            break;
          case 'minute':
            if (number > 59 || number < 0) {
              emitChange = false;
            }
            break;
          case 'second':
            if (number > 59 || number < 0) {
              emitChange = false;
            }
            break;
          default:
            break;
        }
        if (emitChange) {
          this.$emit('change', {
            value: number,
            type,
            index,
          });
        }
      }
      if (curDayJs[type] !== undefined) this.setInputValue(curDayJs[type], target);
    },
    // 失去焦点
    onBlur(e: FocusEvent, trigger: TimeInputType, index: number, input: number): void {
      this.allowInput && this.$emit('blurDefault', e, trigger, index, input);
    },
    onFocus(e: FocusEvent, trigger: TimeInputType, index: number, input: number): void {
      this.allowInput && this.$emit('focusDefault', e, trigger, index, input);
    },
    // 键盘监听
    onKeydown(e: any, type: TimeInputType, index: number): void {
      if (!this.allowInput) return;
      const { which } = e;
      const {
        $props: { format },
      } = this;
      const curDayJs = this.displayTimeList[index];
      // 增加减少
      if ([KeyboardDirection.up, KeyboardDirection.down].includes(which)) {
        if (type === 'meridiem') return;
        // 加减
        const current = curDayJs[type] ? Number(curDayJs[type]) : 0;
        const operate = which === KeyboardDirection.up ? -1 : 1;
        let result = current + operate;
        // 边界检测
        if (type === 'hour') {
          if (result > (/[h]{1}/.test(format) ? 11 : 23)) {
            // 上限
            result = 0;
          } else if (result < 0) {
            result = /[h]{1}/.test(format) ? 11 : 23;
          }
        } else if (result > 59) {
          result = 1;
        } else if (result < 0) {
          result = 59;
        }
        // 发送变动
        this.$emit('change', {
          value: result,
          type,
          index,
        });
      } else if ([KeyboardDirection.left, KeyboardDirection.right].includes(which)) {
        // 移动方向
        const { target } = e;
        // 查找上下一个兄弟节点
        const { parentNode } = target;
        const focus = which === KeyboardDirection.left ? parentNode.previousSibling : parentNode.nextSibling;
        if (focus) {
          const input = focus.querySelector('input');
          if (!input.focus) return;
          input.focus();
        }
      }
    },
    // 切换上下午
    onToggleMeridiem(index: number): void {
      this.$emit('toggleMeridiem', index);
    },
    // 设置输入框原始值，使其完全受控
    setInputValue(v: string | number, input: HTMLInputElement): void {
      const sV = String(v);
      if (!input) {
        return;
      }
      if (input.value !== sV) {
        // input.value = sV;
        Object.assign(input, { value: sV });
        // input.setAttribute('value', sV);
      }
    },
    // ==== 渲染逻辑层 START ====
    // 渲染输入组件
    switchRenderComponent() {
      const {
        $props: {
          format, placeholder, allowInput, disabled,
        },
      } = this;

      // 判定placeholder展示
      function isEmptyDayjs(val: InputTime) {
        return val === undefined || (val.hour === undefined && val.minute === undefined && val.second === undefined);
      }
      const isEmptyVal = this.displayTimeList.every((date: InputTime) => isEmptyDayjs(date));
      if (isEmptyVal) {
        return <span class={`${COMPONENT_NAME}__input-placeholder`}>{placeholder}</span>;
      }
      const itemClasses = disabled
        ? [`${COMPONENT_NAME}__input-item`, `${COMPONENT_NAME}__input-item-disabled`]
        : [`${COMPONENT_NAME}__input-item`];
      const inputClass = `${COMPONENT_NAME}__input-item-input`;
      const render: any = [];

      this.displayTimeList.forEach((inputTime: InputTime | undefined, index: number) => {
        if (index > 0) render.push('-');
        const { hour, minute, second } = inputTime;
        // 渲染组件 - 默认有小时输入
        render.push(<span class={itemClasses}>
            <input
              class={inputClass}
              value={hour}
              disabled={!allowInput}
              onKeydown={(e: Event) => this.onKeydown(e, 'hour', index)}
              onInput={(e: Event) => this.onInput(e, 'hour', index)}
              onBlur={(e: FocusEvent) => this.onBlur(e, 'hour', index, Number(hour))}
              onFocus={(e: FocusEvent) => this.onFocus(e, 'hour', index, Number(hour))}
            />
          </span>);
        // 判断分秒输入
        if (/[hH]{1,2}:m{1,2}/.test(format)) {
          // 需要分钟输入器
          render.push(<span class={itemClasses}>
              &#58;
              <input
                class={inputClass}
                value={minute}
                disabled={!allowInput}
                onKeydown={(e: Event) => this.onKeydown(e, 'minute', index)}
                onInput={(e: Event) => this.onInput(e, 'minute', index)}
                onBlur={(e: FocusEvent) => this.onBlur(e, 'minute', index, Number(minute))}
                onFocus={(e: FocusEvent) => this.onFocus(e, 'minute', index, Number(minute))}
              />
            </span>);
          // 需要秒输入器
          if (/[hH]{1,2}:m{1,2}:s{1,2}/.test(format)) {
            render.push(<span class={itemClasses}>
                &#58;
                <input
                  class={inputClass}
                  value={second}
                  disabled={!allowInput}
                  onKeydown={(e: Event) => this.onKeydown(e, 'second', index)}
                  onInput={(e: Event) => this.onInput(e, 'second', index)}
                  onBlur={(e: FocusEvent) => this.onBlur(e, 'second', index, Number(second))}
                  onFocus={(e: FocusEvent) => this.onFocus(e, 'second', index, Number(second))}
                />
              </span>);
          }
        }
        // 判断上下午位置
        if (/[h]{1}/.test(format) && (format.includes('A') || format.includes('a'))) {
          const localeMeridiemList = [this.locale.anteMeridiem, this.locale.postMeridiem];
          const text = localeMeridiemList[MERIDIEM_LIST.indexOf(inputTime.meridiem.toUpperCase())];
          // 放在前面or后面
          render[amFormat.test(format) ? 'unshift' : 'push'](<span class={itemClasses} onClick={() => allowInput && this.onToggleMeridiem(index)}>
              <input
                readonly
                class={[inputClass, `${inputClass}-meridiem`]}
                value={text}
                onKeydown={(e: Event) => this.onKeydown(e, 'meridiem', index)}
                disabled={!allowInput}
              />
            </span>);
        }
      });
      return render;
    },
    // ==== 渲染逻辑层 END ====
  },

  render() {
    const classes = [`${COMPONENT_NAME}__input`];
    return <div class={classes}>{this.switchRenderComponent()}</div>;
  },
});
