import { defineComponent, VNode } from 'vue';
import { AddIcon, RemoveIcon, ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next';
import TButton from '../button';
import TInput from '../input';
import CLASSNAMES from '../utils/classnames';
import props from './props';
import { ChangeSource, TdInputNumberProps } from './type';
import { ClassName } from '../common';
import { emitEvent } from '../utils/event';

// hooks
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useConfig';

type InputNumberEvent = {
  onInput?: (e: InputEvent) => void;
  onClick?: (e: MouseEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onKeydown?: (e: KeyboardEvent) => void;
  onKeyup?: (e: KeyboardEvent) => void;
  onKeypress?: (e: KeyboardEvent) => void;
};

type ChangeContextEvent = InputEvent | MouseEvent | FocusEvent;

type InputNumberAttr = {
  disabled?: boolean;
  readonly?: any;
  autocomplete?: string;
  ref: string;
  placeholder: string;
  unselectable?: string;
  tips: TdInputNumberProps['tips'];
  autoWidth: boolean;
  align: TdInputNumberProps['align'];
  status: TdInputNumberProps['status'];
};

export default defineComponent({
  name: 'TInputNumber',
  components: {
    AddIcon,
    RemoveIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    TButton,
    TInput,
  },
  props: { ...props },
  emits: ['update:value', 'change', 'blur', 'focus', 'keydown-enter', 'keydown', 'keyup', 'keypress'],
  setup() {
    const disabled = useFormDisabled();
    const COMPONENT_NAME = usePrefixClass('input-number');
    const classPrefix = usePrefixClass();
    return {
      classPrefix,
      COMPONENT_NAME,
      disabled,
    };
  },
  data() {
    return {
      userInput: null,
      filterValue: null,
      isError: false,
      inputting: false,
    };
  },
  computed: {
    disabledReduce(): boolean {
      return this.disabled || this.isError || Number(this.value) - this.step < this.min;
    },
    disabledAdd(): boolean {
      return this.disabled || this.isError || Number(this.value) + this.step > this.max;
    },
    valueDecimalPlaces(): number {
      const tempVal =
        this.filterValue !== null &&
        !Number.isNaN(Number(this.filterValue)) &&
        !Number.isNaN(parseFloat(this.filterValue))
          ? this.filterValue
          : String(this.value);
      const tempIndex = tempVal.indexOf('.') + 1;
      return tempIndex > 0 ? tempVal.length - tempIndex : 0;
    },
    stepDecimalPlaces(): number {
      const tempVal = String(this.step);
      const tempIndex = tempVal.indexOf('.') + 1;
      return tempIndex > 0 ? tempVal.length - tempIndex : 0;
    },
    digitsNum(): number {
      if (this.decimalPlaces !== undefined) {
        if (this.decimalPlaces < this.stepDecimalPlaces) {
          console.warn('decimal places of step should be less than decimal-places');
        }
        return this.decimalPlaces;
      }
      return this.valueDecimalPlaces > this.stepDecimalPlaces ? this.valueDecimalPlaces : this.stepDecimalPlaces;
    },
    reduceClasses() {
      return [
        `${this.COMPONENT_NAME}__decrease`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabledReduce,
        },
      ];
    },
    reduceEvents(): InputNumberEvent {
      return {
        onClick: this.handleReduce,
      };
    },
    addClasses(): ClassName {
      return [
        `${this.COMPONENT_NAME}__increase`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabledAdd,
        },
      ];
    },
    addEvents(): InputNumberEvent {
      return {
        onClick: this.handleAdd,
      };
    },
    cmptWrapClasses(): ClassName {
      return [
        this.COMPONENT_NAME,
        CLASSNAMES.SIZE[this.size],
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
          [`${this.classPrefix}-is-controls-right`]: this.theme === 'column',
          [`${this.COMPONENT_NAME}--${this.theme}`]: this.theme,
          [`${this.COMPONENT_NAME}--auto-width`]: this.autoWidth,
        },
      ];
    },
    inputEvents(): InputNumberEvent {
      return {
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeydown: this.handleKeydown,
        onKeyup: this.handleKeyup,
        onKeypress: this.handleKeypress,
      };
    },
    inputAttrs(): InputNumberAttr {
      return {
        disabled: this.disabled,
        readonly: this.readonly,
        autocomplete: 'off',
        ref: 'refInputElem',
        placeholder: this.placeholder,
        unselectable: this.readonly ? 'on' : 'off',
        tips: this.tips,
        autoWidth: this.autoWidth,
        align: this.align || (this.theme === 'row' ? 'center' : undefined),
        status: this.isError ? 'error' : this.status,
      };
    },
    decreaseIcon(): VNode {
      return this.theme === 'column' ? <chevron-down-icon size={this.size} /> : <remove-icon size={this.size} />;
    },
    increaseIcon(): VNode {
      return this.theme === 'column' ? <chevron-up-icon size={this.size} /> : <add-icon size={this.size} />;
    },
    displayValue(): number | string {
      // inputting
      if (this.inputting && this.userInput !== null) {
        return this.filterValue;
      }
      if ([undefined, null].includes(this.value)) return '';
      // end input
      return this.format && !this.inputting ? this.format(this.value) : this.value.toFixed(this.digitsNum);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        if (v !== undefined) {
          this.isValidNumber(v);
        }
      },
    },
  },
  methods: {
    handleAdd(e: MouseEvent) {
      if (this.disabledAdd || this.readonly) return;
      const value = this.value || 0;
      const factor = 10 ** this.digitsNum;
      this.handleAction(
        Number(this.toDecimalPlaces((value * factor + this.step * factor) / factor).toFixed(this.digitsNum)),
        'add',
        e,
      );
    },
    handleReduce(e: MouseEvent) {
      if (this.disabledReduce || this.readonly) return;
      const value = this.value || 0;
      const factor = 10 ** this.digitsNum;
      this.handleAction(
        Number(this.toDecimalPlaces((value * factor - this.step * factor) / factor).toFixed(this.digitsNum)),
        'reduce',
        e,
      );
    },
    handleInput(val: string, e: InputEvent) {
      // get
      this.userInput = val;
      // filter
      this.filterValue = this.toValidStringNumber(this.userInput);
      this.userInput = '';
      // check
      if (!this.isValid(this.filterValue) || Number(this.filterValue) === this.value) return;
      // set
      this.updateValue(Number(this.filterValue));
      this.handleAction(Number(this.filterValue), 'input', e);
    },
    handleAction(value: number, actionType: ChangeSource, e: ChangeContextEvent) {
      if (actionType !== 'input') {
        this.clearInput();
      }
      this.handleChange(value, { type: actionType, e });
    },
    toValidStringNumber(s: string) {
      // only allow one [.e] and two [-]
      let filterVal = s.replace(/[^\d.eE。-]/g, '').replace('。', '.');
      if (this.multiE(filterVal) || this.multiDot(filterVal) || this.multiNegative(filterVal)) {
        filterVal = filterVal.substring(0, filterVal.length - 1);
      }
      return filterVal;
    },
    toValidNumber(s: string) {
      const val = Number(s);
      if (Number.isNaN(val) || Number.isNaN(parseFloat(s))) return this.value;
      if (val > this.max) return this.max;
      if (val < this.min) return this.min;
      return parseFloat(s);
    },
    handleChange(value: number, ctx: { type: ChangeSource; e: ChangeContextEvent }) {
      const v = Number(value.toFixed(this.digitsNum));
      this.updateValue(v);
      emitEvent(this, 'change', v, { type: ctx.type, e: ctx.e });
    },
    async handleBlur(e: FocusEvent) {
      await this.handleEndInput(e);
      this.clearFilterValue();
      emitEvent(this, 'blur', this.value, { e });
    },
    handleFocus(e: FocusEvent) {
      this.handleStartInput();
      emitEvent(this, 'focus', this.value, { e });
    },
    handleKeydownEnter(e: KeyboardEvent) {
      if (e.key !== 'Enter') return;
      emitEvent(this, 'keydown-enter', this.value, { e });
    },
    handleKeydown(e: KeyboardEvent) {
      emitEvent(this, 'keydown', this.value, { e });
      this.handleKeydownEnter(e);
    },
    handleKeyup(e: KeyboardEvent) {
      emitEvent(this, 'keyup', this.value, { e });
    },
    handleKeypress(e: KeyboardEvent) {
      emitEvent(this, 'keypress', this.value, { e });
    },
    handleStartInput() {
      this.inputting = true;
      if (this.value === undefined) return;
      this.filterValue = this.value.toFixed(this.digitsNum);
    },
    handleEndInput(e: FocusEvent) {
      this.inputting = false;
      const value = this.toValidNumber(this.filterValue);
      if (value !== this.value) {
        this.updateValue(value);
        this.handleAction(value, 'input', e);
      }
      this.isError = false;
    },
    updateValue(v: number) {
      this.$emit('update:value', v);
    },
    handleInputError(visible: boolean) {
      this.isError = visible;
    },
    isValid(v: string) {
      const numV = Number(v);
      if (this.empty(v) || Number.isNaN(numV)) {
        this.handleInputError(true);
        return false;
      }
      return this.isValidNumber(numV);
    },
    isValidNumber(v: number) {
      if (v > this.max) {
        this.handleInputError(true);
        return false;
      }
      if (v < this.min) {
        this.handleInputError(true);
        return false;
      }
      this.handleInputError(false);
      return true;
    },
    empty(v: string) {
      return !v && !v.replace(' ', '');
    },
    clearInput() {
      this.userInput = null;
    },
    clearFilterValue() {
      this.filterValue = '';
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
      return m === null ? false : m.length > 2;
    },
    toDecimalPlaces(value: number): number {
      const decimalPlaces = this.decimalPlaces === undefined ? this.digitsNum : this.decimalPlaces;
      const factor = 10 ** decimalPlaces;
      return Math.round(value * factor) / factor;
    },
  },
  render() {
    return (
      <div class={this.cmptWrapClasses}>
        {this.theme !== 'normal' && (
          <t-button
            class={this.reduceClasses}
            {...this.reduceEvents}
            variant="outline"
            shape="square"
            v-slots={{
              icon: () => this.decreaseIcon,
            }}
          />
        )}

        <t-input
          {...this.inputAttrs}
          {...this.inputEvents}
          value={this.displayValue}
          onChange={(val: string, { e }: { e: InputEvent }) => this.handleInput(val, e)}
        />
        {this.theme !== 'normal' && (
          <t-button
            class={this.addClasses}
            {...this.addEvents}
            variant="outline"
            shape="square"
            v-slots={{
              icon: () => this.increaseIcon,
            }}
          />
        )}
      </div>
    );
  },
});
