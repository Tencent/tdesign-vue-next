import { defineComponent, VNode } from 'vue';
import { prefix } from '../config';
import Add from '../icon/add';
import Remove from '../icon/remove';
import ChevronDown from '../icon/chevron-down';
import ChevronUp from '../icon/chevron-up';
import CLASSNAMES from '../utils/classnames';
import props from '@TdTypes/input-number/props';

const name = `${prefix}-input-number`;

type InputNumberEvent = {
  onInput?: (e: InputEvent) => void;
  onClick?: (e: MouseEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onKeydown?: (e: KeyboardEvent) => void;
  onKeyup?: (e: KeyboardEvent) => void;
  onKeypress?: (e: KeyboardEvent) => void;
};

type InputNumberAttr = {
  disabled?: boolean;
  readonly?: any;
};

export default defineComponent({
  name,
  components: {
    Add,
    Remove,
    ChevronDown,
    ChevronUp,
  },
  props: { ...props },
  emits: ['update:value', 'change', 'blur', 'focus', 'keydown-enter', 'keydown', 'keyup', 'keypress'],
  data() {
    return {
      userInput: null,
      filterValue: null,
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
    reduceClasses() {
      return [
        `${name}__decrease`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabledReduce,
        },
      ];
    },
    addClasses(): ClassName {
      return  [
        `${name}__increase`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabledAdd,
        },
      ];
    },
    cmptWrapClasses(): ClassName {
      return  [
        't-input-number',
        CLASSNAMES.SIZE[this.size],
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
          't-is-controls-right': this.mode === 'column',
        },
      ];
    },
    inputWrapProps(): ClassName {
      return [
        't-input',
        {
          't-is-error': this.isError,
        },
      ];
    },
    inputClasses(): ClassName {
      return [
        't-input__inner',
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
          [`${name}-text-align`]: this.mode === 'row',
        },
      ];
    },
    inputEvents(): InputNumberEvent {
      return {
        onInput: this.handleInput,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeydown: this.handleKeydown,
        onKeyup: this.handleKeyup,
        onKeypress: this.handleKeypress,
      };
    },
    inputAttrs(): InputNumberAttr {
      return  {
        disabled: this.disabled,
        readonly: this.formatter,
      };
    },
    decreaseIcon(): TNodeReturnValue {
      return this.mode === 'column' ? <chevron-down size={this.size} /> : <remove size={this.size} />;
    },
    increaseIcon(): TNodeReturnValue {
      return this.mode === 'column' ? <chevron-up size={this.size} /> : <add size={this.size} />;
    },
    displayValue(): number | string {
      if (this.value === undefined) return;
      if (this.userInput !== null) {
        return this.filterValue;
      }
      return this.formatter ? this.formatter(this.value) : this.value.toFixed(this.digitsNum);
    },
  },
  methods: {
    handleAdd(e: MouseEvent) {
      if (this.disabledAdd) return;
      const value = this.value || 0;
      this.handleAction(Number((value + this.step).toFixed(this.digitsNum)), 'add', e);
    },
    handleReduce(e: MouseEvent) {
      if (this.disabledReduce) return;
      const value = this.value || 0;
      this.handleAction(Number((value - this.step).toFixed(this.digitsNum)), 'reduce', e);
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
      this.$emit('change', value, { type: ctx.type, e: ctx.e });
      this.$emit('update:value', value);
    },
    handleBlur(e: FocusEvent) {
      this.$emit('blur', this.value, { e });
    },
    handleFocus(e: FocusEvent) {
      this.$emit('focus', this.value, { e });
    },
    handleKeydownEnter(e: KeyboardEvent) {
      if (e.key !== 'Enter') return;
      this.$emit('keydown-enter', this.value, { e });
    },
    handleKeydown(e: KeyboardEvent) {
      this.$emit('keydown', this.value, { e });
      this.handleKeydownEnter(e);
    },
    handleKeyup(e: KeyboardEvent) {
      this.$emit('keyup', this.value, { e });
    },
    handleKeypress(e: KeyboardEvent) {
      this.$emit('keypress', this.value, { e });
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
      <div class={this.cmptWrapClasses}>
        <span class={this.reduceClasses} onClick={this.handleReduce}>
          {this.decreaseIcon}
        </span>
        <div class={this.inputWrapProps}>
          <input
            value={this.displayValue}
            disabled={this.disabled}
            class={this.inputClasses}
            {...this.inputAttrs}
            {...this.inputEvents}
            autocomplete="off"
            ref='refInputElem'
            placeholder={this.placeholder}
          />
        </div>
        <div class={this.addClasses} onClick={this.handleAdd}>
          {this.increaseIcon}
        </div>
      </div>
    );
  },
});
