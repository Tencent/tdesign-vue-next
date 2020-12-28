import Vue, { VNode } from 'vue';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import config from '../config';
import Icon from '../icon/iconfont';
import props from '../../types/tag/props';

const { prefix } = config;
const name = `${prefix}-tag`;
const iconName = `${prefix}-icon`;

const initEffectList = {
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
    RenderComponent,
  },
  props: { ...props },
  computed: {
    tagClass(): Array<string> {
      return [
        `${name}`,
        `${name}--${this.theme}`,
        CLASSNAMES.SIZE[this.size],
        initEffectList[this.effect],
        this.shape !== defaultShape && initShapeList[this.shape],
        {
          [`${name}--ellipsis`]: this.maxWidth,
          [`${name}--close`]: this.closable,
        },
      ];
    },
    tagStyle(): object {
      if (this.maxWidth) return { maxWidth: `${this.maxWidth}px` };
      return {};
    },
    iconClass(): string {
      return iconName;
    },
  },
  methods: {
    handleClose(event: any): void {
      this.$emit('close', event);
    },
    handleClick(event: any): void {
      this.$emit('click', event);
    },
  },
  render() {
    // 关闭按钮 自定义组件使用 nativeOnClick 绑定事件
    const closeIcon: VNode | string = this.closable ? <Icon name="close" nativeOnClick={this.handleClose} /> : '';
    // 标签内容
    const tagContent: VNode[] | VNode | string = this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
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
