import { defineComponent, ComponentPublicInstance, VNode } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import CLASSNAMES from '../utils/classnames';
import config from '../config';
import props from './props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { ClassName, TNodeReturnValue } from '../common';

const { prefix } = config;
const name = `${prefix}-tag`;

const defaultShape = 'square';

export default defineComponent({
  name,
  props: { ...props },
  emits: ['close', 'click'],
  computed: {
    tagClass(): ClassName {
      return [
        `${name}`,
        `${name}--${this.theme}`,
        CLASSNAMES.SIZE[this.size],
        `${name}--${this.variant}`,
        this.shape !== 'square' && `${name}--${this.shape}`,
        {
          [`${name}--ellipsis`]: this.maxWidth,
          [`${name}--close`]: this.closable,
          [`${prefix}-is-disabled`]: this.disabled,
          [`${name}--disabled`]: this.disabled,
        },
      ];
    },
    tagStyle(): Record<string, string> {
      if (this.maxWidth) return { maxWidth: `${this.maxWidth}px` };
      return {};
    },
  },
  methods: {
    handleClose({ e }: { e: MouseEvent }): void {
      this.$emit('close', e);
    },
    handleClick(event: MouseEvent): void {
      this.$emit('click', event);
    },
  },
  render() {
    const closeIcon: VNode | string = this.closable ? <CloseIcon onClick={this.handleClose} /> : '';
    // 标签内容
    const tagContent: TNodeReturnValue = renderContent(this, 'default', 'content');
    // 图标
    const icon = renderTNodeJSX(this, 'icon');

    return (
      <span class={this.tagClass} style={this.tagStyle} onClick={this.handleClick}>
        {icon}
        {this.maxWidth ? (
          <span style={this.tagStyle} class={`${name}--text`}>
            {tagContent}
          </span>
        ) : (
          tagContent
        )}
        {closeIcon}
      </span>
    );
  },
});
