import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import Add from '../icon/add';
import Remove from '../icon/remove';
import ChevronDown from '../icon/chevron-down';
import ChevronUp from '../icon/chevron-up';
import CLASSNAMES from '../utils/classnames';
import INPUT_NUMBER_CLASSNAMES from './classnames';
import props from '@TdTypes/input-number/props';

const name = `${prefix}-input-number`;

type InputNumberEvent = {
  on: {
    input?: (e: InputEvent) => void;
    click?: (e: MouseEvent) => void;
    blur?: (e: FocusEvent) => void;
    focus?: (e: FocusEvent) => void;
    keydown?: (e: KeyboardEvent) => void;
    keyup?: (e: KeyboardEvent) => void;
    keypress?: (e: KeyboardEvent) => void;
  };
};

type InputNumberAttr = {
  attrs: {
    disabled?: boolean;
    readonly?: any;
  };
};

export default Vue.extend({
  name,
  props: { ...props },
  components: {
    Add,
    Remove,
    ChevronDown,
    ChevronUp,
  },
  data() {
    return {
      userInput: null,
      filterValue: null,
      curVal: this.value,
      type: typeof this.value || 'string',
      isError: false,
      errMsg: '',
    };
  },
  computed: {
    disabledReduce(): boolean {
      return this.disabled || this.isError || (Number(this.value) - this.step < this.min);
    },
    disabledAdd(): boolean {
      return this.disabled || this.isError || (Number(this.value) + this.step > this.max);
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
    reduceClasses(): ClassName {
      return {
        class: [
          `${name}__decrease`,
          {
            [CLASSNAMES.STATUS.disabled]: this.disabledReduce,
          },
        ],
      };
    },
    reduceEvents(): InputNumberEvent {
      return {
        on: {
          click: this.handleReduce,
        },
      };
    },
    addClasses(): ClassName {
      return {
        class: [
          `${name}__increase`,
          {
            [CLASSNAMES.STATUS.disabled]: this.disabledAdd,
          },
        ],
      };
    },
    addEvents(): InputNumberEvent {
      return {
        on: {
          click: this.handleAdd,
        },
      };
    },
    cmptWrapClasses(): ClassName {
      return {
        class: [
          't-input-number',
          INPUT_NUMBER_CLASSNAMES.SIZE[this.size],
          {
            [CLASSNAMES.STATUS.disabled]: this.disabled,
            't-is-controls-right': this.mode === 'column',
          },
        ],
      };
    },
    inputWrapProps(): ClassName {
      return {
        class: [
          't-input',
          {
            't-is-error': this.isError,
          },
        ],
      };
    },
    inputClasses(): ClassName {
      return {
        class: [
          't-input__inner',
          {
            [CLASSNAMES.STATUS.disabled]: this.disabled,
            [`${name}-text-align`]: this.mode === 'row',
          },
        ],
      };
    },
    inputEvents(): InputNumberEvent {
      return {
        on: {
          input: this.handleInput,
          blur: this.handleBlur,
          focus: this.handleFocus,
          keydown: this.handleKeydown,
          keyup: this.handleKeyup,
          keypress: this.handleKeypress,
        },
      };
    },
    inputAttrs(): InputNumberAttr {
      return {
        attrs: {
          disabled: this.disabled,
          readonly: this.formatter,
        },
      };
    },
    decreaseIcon(): TNodeReturnValue {
      return this.mode === 'column' ? <chevron-down size={this.size} /> : <remove size={this.size} />;
    },
    increaseIcon(): TNodeReturnValue {
      return this.mode === 'column' ? <chevron-up size={this.size} /> : <add size={this.size} />;
    },
    displayValue(): string {
      if (this.userInput !== null) {
        return this.filterValue;
      }
      return this.formatter ? this.formatter(this.curVal) : this.curVal.toFixed(this.digitsNum);
    },
  },
  methods: {
    handleAdd(e: MouseEvent) {
      if (this.disabledAdd) return;
      this.handleAction(Number((this.value + this.step).toFixed(this.digitsNum)), 'add', e);
    },
    handleReduce(e: MouseEvent) {
      if (this.disabledReduce) return;
      this.handleAction(Number((this.value - this.step).toFixed(this.digitsNum)), 'reduce', e);
    },
    handleInput(e: InputEvent) {
      // get
      this.userInput = (e.target as HTMLInputElement).value;
      // filter
      this.filterValue = this.filterInput(this.userInput);
      this.userInput = '';
      // check
      if (!this.checkInput(this.filterValue)) return;
      // set
      this.handleAction(Number(this.filterValue), 'input', e);
    },
    handleAction(value: number, actionType: '' | 'add' | 'reduce' | 'input', e: MouseEvent | InputEvent) {
      if (actionType !== 'input') {
        this.clearInput();
      }
      this.curVal = value;
      this.handleChange(value, { type: actionType, e });
    },
    filterInput(s: string) {
      let filterVal = s.replace(/[^\d.eE。-]/g, '').replace('。', '.');
      if (this.multiE(filterVal) || this.multiDot(filterVal) || this.multiNegative(filterVal)) {
        filterVal = filterVal.substr(0, filterVal.length - 1);
      }
      return filterVal;
    },
    handleChange(value: number, ctx: { type: 'add' | 'reduce' | 'input' | ''; e: InputEvent | MouseEvent }) {
      if (this.isError) {
        this.isError = false;
      }
      if (this.onChange) {
        this.onChange(value, ctx);
      }
      this.$emit('change', value, { type: ctx.type, e: ctx.e });
    },
    handleBlur(e: FocusEvent) {
      if (this.onBlur) {
        this.onBlur(this.curVal, { e });
      }
      this.$emit('blur', this.curVal, { e });
    },
    handleFocus(e: FocusEvent) {
      if (this.onFocus) {
        this.onFocus(this.curVal, { e });
      }
      this.$emit('focus', this.curVal, { e });
    },
    handleKeydownEnter(e: KeyboardEvent) {
      if (e.key !== 'Enter') return;
      if (this.onKeydownEnter) {
        this.onKeydownEnter(this.curVal, { e });
      }
      this.$emit('keydown-enter', this.curVal, { e });
    },
    handleKeydown(e: KeyboardEvent) {
      if (this.onKeydown) {
        this.onKeydown(this.curVal, { e });
      }
      this.$emit('keydown', this.curVal, { e });
      this.handleKeydownEnter(e);
    },
    handleKeyup(e: KeyboardEvent) {
      if (this.onKeyup) {
        this.onKeyup(this.curVal, { e });
      }
      this.$emit('keyup', this.curVal, { e });
    },
    handleKeypress(e: KeyboardEvent) {
      if (this.onKeypress) {
        this.onKeypress(this.curVal, { e });
      }
      this.$emit('keypress', this.curVal, { e });
    },
    handleInputError(visible: boolean, content: string) {
      this.isError = visible;
      this.errMsg = content;
    },
    checkInput(s: string) {
      return this.isLegal(s) && !s.endsWith('.');
    },
    isLegal(v: string) {
      const numV = Number(v);
      if (this.empty(v) || isNaN(numV)) {
        this.handleInputError(true, '请输入数字');
        return false;
      }
      if (numV > this.max) {
        this.handleInputError(true, `最大值${this.max}`);
        return false;
      }
      if (numV < this.min) {
        this.handleInputError(true, `最小值${this.min}`);
        return false;
      }
      return true;
    },
    empty(v: string) {
      return !v && !v.replace(' ', '');
    },
    clearInput() {
      this.userInput = null;
      this.filterValue = null;
    },
    multiE(s: string) {
      const m = s.match(/[e]/gi);
      return m === null ? false : m.length > 1;
    },
    multiDot(s: string) {
      const m = s.match(/[.]/g);
      return m === null ? false : m.length > 1;
    },
    multiNegative(s: string) {
      const m = s.match(/[-]/g);
      return m === null ? false : m.length > 1;
    },
  },
  render(): VNode {
    return (
      <div {...this.cmptWrapClasses}>
        <span {...this.reduceClasses} {...this.reduceEvents}>
          {this.decreaseIcon}
        </span>
        <div {...this.inputWrapProps}>
          <input
            value={this.displayValue}
            disabled={this.disabled}
            {...this.inputClasses}
            {...this.inputAttrs}
            {...this.inputEvents}
            autocomplete="off"
            ref='refInputElem'
          />
        </div>
        <div {...this.addClasses} {...this.addEvents}>
          {this.increaseIcon}
        </div>
      </div>
    );
  },
});
