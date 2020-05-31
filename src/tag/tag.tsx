import Vue, { CreateElement, VNode } from 'vue';
import RenderComponent from '../utils/render-component';
import config from '../config';
import Icon from '../icon';

const { prefix } = config;
const name = `${prefix}-tag`;
const iconName = `${prefix}-icon`;
const initThemeList: Array<string> = [
  'default',
  'primary',
  'primary-light',
  'info',
  'info-light',
  'warning',
  'warning-light',
  'danger',
  'danger-light',
  'success',
  'success-light',
];
const initSizeList: Array<string> = ['large', 'middle', 'small'];
const initShapeList: Array<string> = ['square', 'round', 'mark'];

export default Vue.extend({
  name,
  components: {
    Icon,
    RenderComponent,
  },
  props: {
    theme: {
      type: String,
      default: 'default',
      validator(v: string): boolean {
        return initThemeList.indexOf(v) > -1;
      },
    },
    size: {
      type: String,
      default: 'middle',
      validator(v: string): boolean {
        return initSizeList.indexOf(v) > -1;
      },
    },
    icon: [String, Function],
    closable: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    shape: {
      type: String,
      default: 'square',
      validator(v: string): boolean {
        return initShapeList.indexOf(v) > -1;
      },
    },
    maxWidth: [String, Number],
  },
  computed: {
    tagClass(): Array<string> {
      const plain = this.plain ? `${name}--plain` : '';
      const size = this.size !== 'middle' ? `${name}--${this.size}` : '';
      const shape = this.shape !== 'square' ? `${name}--${this.shape}` : '';
      const ellipsis = this.maxWidth ? `${name}--ellipsis` : '';

      const disabled = this.disabled ? `${name}--disabled` : '';
      const checked = (!this.disabled && this.checked) ? `${name}--checked` : '';
      const theme = (this.disabled || this.checked) ? 'default' : this.theme;

      return [
        `${name}`,
        `${name}--${theme}`,
        `${plain}`,
        `${disabled}`,
        `${size}`,
        `${shape}`,
        `${ellipsis}`,
        `${checked}`,
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
  render(h: CreateElement) {
    // 关闭按钮
    const CloseIcon: VNode | string =  this.closable ?
      <Icon name="close" on-click={ this.handleClose } /> : '';
    // 标签内容
    let tagContent: VNode[] | VNode | string = this.$scopedSlots.default ?
      this.$scopedSlots.default(null) : '';
    // 图标
    let icon: VNode;
    if (typeof this.icon === 'string') {
      icon = <Icon name={ this.icon } />
    } else if (typeof this.icon === 'function') {
      icon = <i class={ iconName }>{ this.icon() }</i>
    }

    return (
      <span class={ this.tagClass } style={ this.tagStyle } on-click={ this.handleClick }>
        { icon }
        { tagContent }
        { CloseIcon }
      </span>
    );
  },
});
