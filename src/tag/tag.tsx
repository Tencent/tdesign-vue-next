import Vue, { VNode } from 'vue';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import config from '../config';
import Icon from '../icon/iconfont';

const { prefix } = config;
const name = `${prefix}-tag`;
const iconName = `${prefix}-icon`;
const initThemeList: Array<string> = ['default', 'primary', 'info', 'warning', 'danger', 'success'];

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
  // import props from '../../types/tag/props';
  // props: { ...props },
  props: {
    theme: {
      type: String,
      default: 'default',
      validator(v: string): boolean {
        return initThemeList.indexOf(v) > -1;
      },
    },
    size: String,
    icon: [String, Function],
    closable: Boolean,
    checked: Boolean,
    disabled: Boolean,
    effect: {
      type: String,
      default: 'dark',
      validator(v: string): boolean {
        return Object.keys(initEffectList).indexOf(v) > -1;
      },
    },
    shape: {
      type: String,
      default: defaultShape,
      validator(v: string): boolean {
        return Object.keys(initShapeList).indexOf(v) > -1;
      },
    },
    maxWidth: [String, Number],
  },
  computed: {
    tagClass(): Array<string> {
      const theme = this.disabled || this.checked ? 'default' : this.theme;

      return [
        `${name}`,
        `${name}--${theme}`,
        CLASSNAMES.SIZE[this.size],
        initEffectList[this.effect],
        this.shape !== defaultShape && initShapeList[this.shape],
        {
          [`${name}--ellipsis`]: this.maxWidth,
          [`${name}--checked`]: !this.disabled && this.checked,
          [`${name}--disabled`]: this.disabled,
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
      if (!this.disabled) this.$emit('click', event);
    },
  },
  render() {
    // 关闭按钮 自定义组件使用 nativeOnClick 绑定事件
    const closeIcon: VNode | string = this.closable ? <Icon name="close" nativeOnClick={this.handleClose} /> : '';
    // 标签内容
    const tagContent: VNode[] | VNode | string = this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
    // 图标
    let icon: VNode;
    if (typeof this.icon === 'string') {
      icon = <Icon name={this.icon} />;
    } else if (typeof this.icon === 'function') {
      icon = <i class={iconName}>{this.icon()}</i>;
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
