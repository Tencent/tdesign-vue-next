import { defineComponent, ref } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import TDivider from '../divider';
import itemProps from './dropdown-item-props';
import { renderContent } from '../utils/render-tnode';
import { TNodeReturnValue } from '../common';
import { emitEvent } from '../utils/event';
import useRipple from '../hooks/useRipple';
import { useCommonClassName, usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TDropdownItem',
  components: {
    ChevronRightIcon,
    TDivider,
  },
  inject: {
    dropdown: {
      default: undefined,
    },
  },
  props: {
    ...itemProps,
    path: {
      type: String,
      default: '',
    },
    hasChildren: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click', 'item-hover', 'hover'],
  setup() {
    const itemRef = ref<HTMLElement>();
    useRipple(itemRef);

    const { STATUS } = useCommonClassName();
    const COMPONENT_NAME = usePrefixClass('dropdown__item');
    const classPrefix = usePrefixClass();

    return { classPrefix, COMPONENT_NAME, STATUS, itemRef };
  },
  methods: {
    renderSuffix(): TNodeReturnValue {
      return this.hasChildren ? <chevron-right-icon class={`${this.COMPONENT_NAME}__item-icon`} /> : null;
    },
    handleItemClick(e: MouseEvent): void {
      e.stopPropagation();
      if (!this.hasChildren && !this.disabled) {
        const data = {
          value: this.value,
          path: this.path,
          content: this.content,
        };
        emitEvent(this, 'click', data, { e });
        emitEvent(this, 'item-hover', this.path);
        this.dropdown.handleMenuClick(data, { e });
      }
    },
    handleMouseover(): void {
      emitEvent(this, 'hover', this.path);
    },
  },
  render() {
    const { STATUS, COMPONENT_NAME, classPrefix } = this;
    const classes = [
      COMPONENT_NAME,
      {
        [`${classPrefix}-dropdown--suffix`]: this.hasChildren,
        [STATUS.disabled]: this.disabled,
        [STATUS.active]: this.active,
      },
    ];

    return (
      <div>
        <div ref="itemRef" class={classes} onClick={this.handleItemClick} onMouseover={this.handleMouseover}>
          <div class={`${COMPONENT_NAME}-content`}>
            <span class={`${COMPONENT_NAME}-text`}>{renderContent(this, 'content', 'default')}</span>
          </div>
          {this.renderSuffix()}
        </div>
        {this.divider ? <TDivider /> : null}
      </div>
    );
  },
});
