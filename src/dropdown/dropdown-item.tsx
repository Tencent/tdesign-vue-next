import { defineComponent, ref } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import TDivider from '../divider';
import { prefix } from '../config';
import { STATUS_CLASSNAMES } from '../utils/classnames';
import itemProps from './dropdown-item-props';
import { renderContent } from '../utils/render-tnode';
import { TNodeReturnValue } from '../common';
import { emitEvent } from '../utils/event';
import useRipple from '../hooks/useRipple';

const name = `${prefix}-dropdown__item`;

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
    return { itemRef };
  },
  methods: {
    renderSuffix(): TNodeReturnValue {
      return this.hasChildren ? <chevron-right-icon class={`${name}__item-icon`} /> : null;
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
    const classes = [
      name,
      {
        [`${prefix}-dropdown--suffix`]: this.hasChildren,
        [STATUS_CLASSNAMES.disabled]: this.disabled,
        [STATUS_CLASSNAMES.active]: this.active,
      },
    ];

    return (
      <div>
        <div ref="itemRef" class={classes} onClick={this.handleItemClick} onMouseover={this.handleMouseover}>
          <div class={`${name}-content`}>
            <span class={`${name}-text`}>{renderContent(this, 'content', 'default')}</span>
          </div>
          {this.renderSuffix()}
        </div>
        {this.divider ? <TDivider /> : null}
      </div>
    );
  },
});
