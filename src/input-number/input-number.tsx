import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import Add from '../icon/add';
import Remove from '../icon/remove';
import ArrowDown from '../icon/arrow-down';
import ArrowUp from '../icon/arrow-up';

const name = `${prefix}-input-number`;

export default Vue.extend({
  name,
  components: {
    RenderComponent,
    Add,
    Remove,
    ArrowDown,
    ArrowUp,
  },
  props: {
    max: [Number],
    min: [Number],
    step: {
      type: [Number],
      default() {
        return 1;
      },
    },
    size: {
      type: String,
      default: 'middle',
      validator(v: string): boolean {
        return ['large', 'middle', 'small'].indexOf(v) > -1;
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    mode: {
      type: String,
      default: 'row', // column
    },
    value: [Number],
    formatter: {
      type: Function,
    },
  },
  data() {
    return {
      type: typeof this.value || 'string',
      puVisible: false,
      puContent: '',
    };
  },
  computed: {
    disabledReduce(): boolean {
      return this.disabled || this.puVisible || (Number(this.value) - this.step < this.min);
    },
    disabledAdd(): boolean {
      return this.disabled || this.puVisible || (Number(this.value) + this.step > this.max);
    },
    valueDigitsNum(): number {
      const tempVal = String(this.value);
      const tempIndex = tempVal.indexOf('.') + 1;
      return tempIndex > 0 ? tempVal.length - tempIndex : 0;
    },
    stepDigitsNum(): number {
      const tempVal = String(this.step);
      const tempIndex = tempVal.indexOf('.') + 1;
      return tempIndex > 0 ? tempVal.length - tempIndex : 0;
    },
    digitsNum(): number {
      return this.valueDigitsNum > this.stepDigitsNum ? this.valueDigitsNum : this.stepDigitsNum;
    },
  },
  render(): VNode {
    const reduceProps = {
      class: [
        `${name}__decrease`,
        {
          ['t-is-disabled']: this.disabledReduce,
        },
      ],
      on: {
        click: this.reduceHandle,
      },
    };
    const addProps = {
      class: [
        `${name}__increase`,
        {
          ['t-is-disabled']: this.disabledAdd,
        },
      ],
      on: {
        click: this.addHandle,
      },
    };

    const compWrap = {
      style: {
        '-webkit-user-select': 'none',
        'user-select': 'none',
      },
      class: [
        't-input-number',
        {
          't-is-controls-right': this.mode === 'column',
          't-is-disabled': this.disabled,
          't-size-small': this.size === 'small',
          't-size-large': this.size === 'large',
        },
      ],
    };
    const decreaseIcon = () => this.mode === 'column' ? <arrow-up size={this.size} /> : <remove size={this.size} />;
    const increaseIcon = () => this.mode === 'column' ? <arrow-down size={this.size} /> : <add size={this.size} />;

    const inputWrapProps = {
      class: [
        't-input',
        {
          't-is-error': this.puVisible,
        },
      ],
    };
    const inputProps = {
      class: [
        't-input__inner',
        {
          't-is-disabled': this.disabled,
          [`${name}-text-align`]: this.mode === 'row',
        },
      ],
      attrs: {
        value: this._formatterValue(this.value, true),
        disabled: this.disabled,
        readonly: this.formatter,
      },
      ref: 'refInputElem',
      on: {
        input: this.inputHandle,
      },
    };

    return (
      <div {...compWrap}>
        <span {...reduceProps}>
          { decreaseIcon() }
        </span>

        <div {...inputWrapProps}>
          <input disabled={this.disabled} autocomplete="off" {...inputProps} />
        </div>

        <div {...addProps}>
          { increaseIcon() }
        </div>
      </div>
    );
  },
  methods: {
    _formatterValue(value: any, isInit: any) {
      if (isInit) this._legalCheck(value);
      return this.formatter ? this.formatter(value) : value;
    },
    _emitHandle(value: any, type: string) {
      const tempVal = Object.is('number', this.type) ? Number(value) : value;
      if (this.puVisible) this.puVisible = false;
      this.$emit('input', tempVal);
      this.$emit('change', { type, value: tempVal });
    },
    _popupHandle(visible: boolean, content: string) {
      this.puContent = content;
      this.puVisible = visible;
      // console.log('格式错误：', this.puContent);
    },
    _legalCheck(tempVal: any) {
      if (isNaN(tempVal)) return this._popupHandle(true, '请输入数字');
      if (tempVal > this.max) return this._popupHandle(true, `最大值${this.max}`);
      if (tempVal < this.min) return this._popupHandle(true, `最小值${this.min}`);
    },
    _setInputValue(value: any) {
      const input = this.$refs.refInputElem as HTMLInputElement;
      input.value = value;
    },
    reduceHandle() {
      if (this.disabledReduce) return;

      const tempVal = (this.value - this.step).toFixed(this.digitsNum);
      this._setInputValue(this._formatterValue(tempVal, false));
      this._emitHandle(tempVal, 'reduce');
    },
    inputHandle(ev: any) {
      const inputVal = ev.srcElement.value;
      if (!inputVal) return this._popupHandle(true, '请输入数字');
      if (inputVal.endsWith('.')) return;

      const tempVal = Number(inputVal);
      if (isNaN(tempVal)) return this._popupHandle(true, '请输入数字');
      if (tempVal > this.max) return this._popupHandle(true, `最大值${this.max}`);
      if (tempVal < this.min) return this._popupHandle(true, `最小值${this.min}`);

      const emitValue = tempVal ? String(tempVal) : '';
      this._setInputValue(emitValue);
      this._emitHandle(emitValue, 'input');
    },
    addHandle() {
      if (this.disabledAdd) return;

      const tempVal = (this.value + this.step).toFixed(this.digitsNum);
      this._setInputValue(this._formatterValue(tempVal, false));
      this._emitHandle(tempVal, 'add');
    },
  },
});
