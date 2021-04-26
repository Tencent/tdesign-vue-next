import { defineComponent, h, ref, computed } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import { omit } from '../utils/helper';
import ClearIcon from '../icon/clear-circle-filled';
import props from '@TdTypes/input/props';

const name = `${prefix}-input`;

function getValidAttrs(obj: object): object {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

// interface InputInstance extends Vue {
//   composing: boolean;
// }

export default defineComponent({
  name,
  inheritAttrs: false,
  props: { ...props },
  emits: ['change', 'input', 'clear', 'keydown-enter', 'keydown', 'keyup', 'keypress', 'focus', 'blur', 'update:value'],
  setup(props, context) {
    const focused = ref<boolean>(false);
    const cacheValue = ref<string | number>('');
    const innerValue = computed({
      get() {
        return props.value || cacheValue.value;
      },
      set(val: string) {
        cacheValue.value = val;
        context.emit('update:value', val);
      },
    });

    function onInput(e: InputEvent): void {
      // if (this.composing) return;
      const { target } = e;
      const val = (target as HTMLInputElement).value;
      context.emit('change', val, { e: InputEvent });
      innerValue.value = val;
    }

    function emitEvent(name: any, e: FocusEvent | KeyboardEvent | InputEvent) {
      context.emit(name, innerValue, { e });
    }
    function handleKeydown(e: KeyboardEvent) {
      if (props.disabled) return;
      const { code } = e;
      if (code === 'Enter') {
        emitEvent('keydown-enter', e);
      } else {
        emitEvent('keydown', e);
      }
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (props.disabled) return;
      emitEvent('keyup', e);
    }
    function handleKeypress(e: KeyboardEvent) {
      if (props.disabled) return;
      emitEvent('keypress', e);
    }
    function emitClear(e: MouseEvent) {
      context.emit('clear', { e });
      context.emit('change', '', { e: MouseEvent });
      innerValue.value = '';
    }
    function emitFocus(e: FocusEvent) {
      if (props.disabled) return;
      focused.value = true;
      emitEvent('focus', e);
    }
    function emitBlur(e: FocusEvent) {
      focused.value = false;
      emitEvent('blur', e);
    }

    return {
      focused,
      innerValue,
      onInput,
      handleKeydown,
      handleKeyUp,
      handleKeypress,
      emitClear,
      emitFocus,
      emitBlur,
    };
  },
  computed: {
    showClear(): boolean {
      return this.innerValue && !this.disabled && this.clearable;
    },
    inputAttrs(): Record<string, any> {
      return getValidAttrs({
        disabled: this.disabled,
        readonly: this.readonly,
        autocomplete: this.autocomplete,
        placeholder: this.placeholder || undefined,
        maxlength: this.maxlength,
        name: this.name || undefined,
        type: this.type,
      });
    },
  },
  methods: {
    renderIcon(
      icon: string | Function | undefined,
      iconType: 'prefix-icon' | 'suffix-icon',
    ) {
      if (typeof icon === 'function') {
        return icon(h);
      }
      if (this.$slots[iconType]) {
        return this.$slots[iconType](null);
      }
      return null;
    },
    focus(): void {
      const input = this.$refs.refInputElem as HTMLInputElement;
      input?.focus();
    },
    blur(): void {
      const input = this.$refs.refInputElem as HTMLInputElement;
      input?.blur();
    },

  },
  // created() {
  //   this.composing = false;
  // },
  render() {
    const inputEvents = getValidAttrs({
      onFocus: this.emitFocus,
      onBlur: this.emitBlur,
      onKeydown: this.handleKeydown,
      onKeyup: this.handleKeyUp,
      onKeypresss: this.handleKeypress,
    });

    const wrapperAttrs = omit(this.$attrs, [...Object.keys(inputEvents), ...Object.keys(this.inputAttrs), 'input']);

    const prefixIcon = this.renderIcon(this.prefixIcon, 'prefix-icon');
    let suffixIcon = this.renderIcon(this.suffixIcon, 'suffix-icon');

    if (this.showClear) {
      suffixIcon = <ClearIcon class={`${name}__suffix-clear`} onClick={this.emitClear} />;
    }

    const classes = [
      name,
      CLASSNAMES.SIZE[this.size] || '',
      {
        [CLASSNAMES.STATUS.disabled]: this.disabled,
        [CLASSNAMES.STATUS.focused]: this.focused,
        [`${prefix}-is-${this.status}`]: this.status,
        [`${name}--prefix`]: prefixIcon,
        [`${name}--suffix`]: suffixIcon,
      },
    ];
    return (
      <div class={classes} {...wrapperAttrs}>
        {prefixIcon ? <span class={`${name}__prefix`}>{prefixIcon}</span> : null}
        <input
          {...this.inputAttrs}
          {...inputEvents}
          ref="refInputElem"
          value={this.innerValue}
          class={`${name}__inner`}
          onInput={this.onInput}
        />
        {suffixIcon ? <span class={[`${name}__suffix`, { [`${name}__clear`]: this.showClear }]}>{suffixIcon}</span> : null}
      </div>
    );
  },
});
