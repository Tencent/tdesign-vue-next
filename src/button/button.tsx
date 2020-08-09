import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import Icon from '../icon/iconfont';
import { THEME_LIST, SIZE_LIST } from './const';

const name = `${prefix}-button`;

export default Vue.extend({
  name,
  components: {
    [Icon.name]: Icon,
    RenderComponent,
  },
  props: {
    theme: {
      type: String,
      default: 'line',
      validator(v: string): boolean {
        return THEME_LIST.indexOf(v) > -1;
      },
    },
    size: {
      type: String,
      default: 'default',
      validator(v: string): boolean {
        return SIZE_LIST.indexOf(v) > -1;
      },
    },
    icon: [String, Function],
    round: Boolean,
    loading: Boolean,
    block: Boolean,
    disabled: Boolean,
  },
  render(h: CreateElement): VNode {
    let buttonContent: JsxNode = this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
    let icon: JsxNode;

    if (this.loading) {
      icon = <Icon name="loading"></Icon>;
    } else if (typeof this.icon === 'string') {
      icon = <Icon name={this.icon}></Icon>;
    } else if (typeof this.icon === 'function') {
      icon = this.icon(h);
    } else if (this.$scopedSlots.icon) {
      icon = this.$scopedSlots.icon(null);
    }

    const buttonClass = [
      `${name}`,
      CLASSNAMES.SIZE[this.size],
      `${name}--${this.theme}`,
      {
        [CLASSNAMES.STATUS.disabled]: this.disabled,
        [CLASSNAMES.STATUS.loading]: this.loading,
        [`${name}--round`]: this.round,
        [CLASSNAMES.SIZE.block]: this.block,
        [`${name}--icon`]: icon && !buttonContent && this.theme !== 'primary',
        [`${name}--icon-primary`]: icon && !buttonContent && this.theme === 'primary',
      },
    ];

    if (icon) {
      buttonContent = [
        icon,
        buttonContent ? <span class={`${name}__text`}>{buttonContent}</span> : '',
      ];
    }

    return (
      <button class={buttonClass} {...{ on: this.$listeners }}>
        {buttonContent}
      </button>
    );
  },
});
