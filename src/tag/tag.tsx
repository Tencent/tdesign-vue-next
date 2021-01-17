import Vue, { VNode } from 'vue';
import CLASSNAMES from '../utils/classnames';
import config from '../config';
import Icon from '../icon/iconfont';
import props from '../../types/tag/props';

const { prefix } = config;
const name = `${prefix}-tag`;
const iconName = `${prefix}-icon`;

const initVariantList = {
  dark: `${name}--dark`,
  light: `${name}--light`,
  plain: `${name}--plain`,
};
const initShapeList = {
  square: `${name}--square`,
  round: `${name}--round`,
  mark: `${name}--mark`,
};
const defaultShape = 'square';

export default Vue.extend({
  name,
  components: {
    Icon,
  },
  props: { ...props },
  computed: {
    tagClass(): ClassName {
      return [
        `${name}`,
        `${name}--${this.theme}`,
        CLASSNAMES.SIZE[this.size],
        initVariantList[this.variant],
        this.shape !== defaultShape && initShapeList[this.shape],
        {
          [`${name}--ellipsis`]: this.maxWidth,
          [`${name}--close`]: this.closable,
        },
      ];
    },
    tagStyle(): Styles {
      if (this.maxWidth) return { maxWidth: `${this.maxWidth}px` };
      return {};
    },
    iconClass(): string {
      return iconName;
    },
  },
  methods: {
    handleClose(event: MouseEvent): void {
      this.$emit('close', event);
      if (typeof this.onClose === 'function') this.onClose(event);
    },
    handleClick(event: MouseEvent): void {
      this.$emit('click', event);
      if (typeof this.onClick === 'function') this.onClick(event);
    },
  },
  render() {
    // 关闭按钮 自定义组件使用 nativeOnClick 绑定事件
    const closeIcon: VNode | string = this.closable ? <Icon name="close" nativeOnClick={this.handleClose} /> : '';
    // 标签内容
    const tagContent: TNodeReturnValue = this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
    // 图标
    let icon: VNode;
    if (typeof this.icon === 'string' && !!this.icon) {
      icon = <Icon name={this.icon} />;
    } else if (typeof this.icon === 'function') {
      icon = <i class={iconName}>{this.icon(this.$createElement)}</i>;
    }

    return (
      <span class={this.tagClass} style={this.tagStyle} onClick={this.handleClick}>
        {icon}
        {tagContent}
        {closeIcon}
      </span>
    );
  },
});
