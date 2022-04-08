import { defineComponent, VNode, ref } from 'vue';
import get from 'lodash/get';
import { renderContent } from '../utils/render-tnode';
import { scrollSelectedIntoView } from '../utils/dom';

import props from './option-props';
import { SelectOption } from './type';
import Checkbox from '../checkbox/index';
import { ClassName } from '../common';

// hooks
import { useFormDisabled } from '../form/hooks';
import useRipple from '../hooks/useRipple';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';

export default defineComponent({
  name: 'TOption',
  components: {
    TCheckbox: Checkbox,
  },
  inject: {
    tSelect: {
      default: undefined,
    },
  },

  props: { ...props },
  setup() {
    const disabled = useFormDisabled();

    const selectName = usePrefixClass('select');
    const { STATUS, SIZE } = useCommonClassName();
    const liRef = ref<HTMLElement>();

    useRipple(liRef);

    return {
      STATUS,
      SIZE,
      selectName,
      disabled,
      liRef,
    };
  },
  data() {
    return {
      isHover: false,
    };
  },
  computed: {
    // 键盘上下按键选中hover样式的选项
    // 键盘上下按键选中hover样式的选项
    hovering() {
      return (
        this.tSelect &&
        this.tSelect.visible &&
        this.tSelect.hoverOptions[this.tSelect.hoverIndex] &&
        this.tSelect.hoverOptions[this.tSelect.hoverIndex][this.tSelect.realValue] === this.value
      );
    },
    multiLimitDisabled(): boolean {
      if (this.tSelect && this.tSelect.multiple && this.tSelect.max) {
        if (
          this.tSelect.value instanceof Array &&
          this.tSelect.value.indexOf(this.value) === -1 &&
          this.tSelect.max <= this.tSelect.value.length
        ) {
          return true;
        }
      }
      return false;
    },
    classes(): ClassName {
      return [
        `${this.selectName}-option`,
        {
          [this.STATUS.disabled]: this.disabled || this.multiLimitDisabled,
          [this.STATUS.selected]: this.selected,
          [this.SIZE[this.tSelect && this.tSelect.size]]: this.tSelect && this.tSelect.size,
          [`${this.selectName}-option__hover`]: this.hovering,
        },
      ];
    },
    isCreatedOption(): boolean {
      return this.tSelect.creatable && this.value === this.tSelect.searchInput;
    },
    show(): boolean {
      /**
       * 此属性主要用于slots生成options时显示控制，直传options由select进行显示控制
       * create的option，始终显示
       * canFilter只显示待匹配的选项
       */
      if (!this.tSelect) return false;
      if (this.isCreatedOption) return true;
      if (this.tSelect.canFilter && this.tSelect.searchInput !== '') {
        return this.tSelect.filterOptions.some(
          (option: SelectOption) => get(option, this.tSelect.realValue) === this.value,
        );
      }
      return true;
    },
    labelText(): string {
      return this.label || String(this.value);
    },
    selected(): boolean {
      let flag = false;
      if (!this.tSelect) return false;
      if (this.tSelect.value instanceof Array) {
        if (this.tSelect.labelInValue) {
          flag =
            this.tSelect.value
              .map((item: string | number | SelectOption) => get(item, this.tSelect.realValue))
              .indexOf(this.value) !== -1;
        } else {
          flag = this.tSelect.value.indexOf(this.value) !== -1;
        }
      } else if (typeof this.tSelect.value === 'object') {
        flag = get(this.tSelect.value, this.tSelect.realValue) === this.value;
      } else {
        flag = this.tSelect.value === this.value;
      }
      return flag;
    },
  },
  watch: {
    value() {
      this.tSelect && this.tSelect.getOptions(this);
    },
    label() {
      this.tSelect && this.tSelect.getOptions(this);
    },
    hovering() {
      if (this.hovering) {
        const timer = setTimeout(() => {
          scrollSelectedIntoView(this.tSelect.getOverlayElm(), this.$el as HTMLElement);
          clearTimeout(timer);
        }, this.tSelect.popupOpenTime); // 待popup弹出后再滚动到对应位置
      }
    },
  },
  mounted() {
    this.tSelect && this.tSelect.getOptions(this);
  },
  methods: {
    select(e: MouseEvent | KeyboardEvent) {
      e.stopPropagation();
      if (this.disabled || this.multiLimitDisabled) {
        return false;
      }
      const parent = this.$el.parentNode as HTMLElement;
      if (parent && parent.className.indexOf(`${this.selectName}__create-option`) !== -1) {
        this.tSelect && this.tSelect.createOption(this.value.toString());
      }
      this.tSelect && this.tSelect.onOptionClick(this.value, e);
    },
    mouseEvent(v: boolean) {
      this.isHover = v;
    },
  },
  render(): VNode {
    const { classes, labelText, selected, disabled, multiLimitDisabled, show } = this;
    const children = renderContent(this, 'default', 'content');
    const optionChild = children || labelText;
    return (
      <li
        ref="liRef"
        v-show={show}
        class={classes}
        title={labelText}
        onMouseenter={() => this.mouseEvent(true)}
        onMouseleave={() => this.mouseEvent(false)}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          this.select(e);
        }}
      >
        {this.tSelect && this.tSelect.multiple ? (
          <t-checkbox checked={selected} disabled={disabled || multiLimitDisabled}>
            {optionChild}
          </t-checkbox>
        ) : (
          <span>{optionChild}</span>
        )}
      </li>
    );
  },
});
