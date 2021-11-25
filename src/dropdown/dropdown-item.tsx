import { defineComponent } from 'vue';
import TIconChevronRight from '../icon/chevron-right';
import TDivider from '../divider';
import { prefix } from '../config';
import { STATUS_CLASSNAMES } from '../utils/classnames';
import ripple from '../utils/ripple';
import itemProps from './dropdown-item-props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { TNodeReturnValue } from '../common';

const name = `${prefix}-dropdown__item`;

export default defineComponent({
  name: `${prefix}-dropdown-item`,
  components: {
    TIconChevronRight,
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
      return this.hasChildren ? <t-icon-chevron-right class="children-suffix" /> : null;
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
        'has-suffix': this.hasChildren,
        [`${name}_is_divided`]: this.divider,
        [STATUS_CLASSNAMES.disabled]: this.disabled,
        [STATUS_CLASSNAMES.active]: this.active,
      },
    ];

    return (
      <div>
        <div v-ripple class={classes} onClick={this.handleItemClick} onMouseover={this.handleMouseover}>
          <div class={`${name}__content`}>
            <span class={`${name}__content__text`}>{renderTNodeJSX(this, 'content')}</span>
          </div>
          {this.renderSuffix()}
        </div>
        {this.divider ? <TDivider /> : null}
      </div>
    );
  },
});
