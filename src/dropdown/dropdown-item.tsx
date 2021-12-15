import { defineComponent } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import TDivider from '../divider';
import { prefix } from '../config';
import { STATUS_CLASSNAMES } from '../utils/classnames';
import ripple from '../utils/ripple';
import itemProps from './dropdown-item-props';
import { renderContent } from '../utils/render-tnode';
import { TNodeReturnValue } from '../common';

const name = `${prefix}-dropdown__item`;

export default defineComponent({
  name: `${prefix}-dropdown-item`,
  components: {
    ChevronRightIcon,
    TDivider,
  },
  directives: { ripple },
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
    maxColumnWidth: {
      type: Number,
      default: 100,
    },
    minColumnWidth: {
      type: Number,
      default: 10,
    },
  },
  emits: ['click', 'item-hover', 'hover'],
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
        this.$emit('click', data, { e });
        this.$emit('item-hover', this.path);
      }
    },
    handleMouseover(): void {
      this.$emit('hover', this.path);
    },
  },
  render() {
    const classes = [
      name,
      {
        [`${name}--suffix`]: this.hasChildren,
        [STATUS_CLASSNAMES.disabled]: this.disabled,
        [STATUS_CLASSNAMES.active]: this.active,
      },
    ];

    return (
      <div>
        <div v-ripple class={classes} onClick={this.handleItemClick} onMouseover={this.handleMouseover}>
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
