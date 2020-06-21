import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import Icon from '../icon';

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
        return (
          [
            'line',
            'primary',
            'dashed',
            'warning',
            'warning-line',
            'link',
            'ghost',
            'ghost-line',
          ].indexOf(v) > -1
        );
      },
    },
    size: {
      type: String,
      default: 'default',
      validator(v: string): boolean {
        return ['large', 'default', 'small'].indexOf(v) > -1;
      },
    },
    icon: [String, Function],
    round: Boolean,
    loading: Boolean,
    block: Boolean,
    disabled: Boolean,
  },
  render(h: CreateElement): VNode { // eslint-disable-line
    const buttonClass = [
      `${name}`,
      CLASSNAMES.SIZE[this.size],
      `${name}--${this.theme}`,
      {
        [CLASSNAMES.STATUS.disabled]: this.disabled,
        [CLASSNAMES.STATUS.loading]: this.loading,
        [`${name}--round`]: this.round,
        [CLASSNAMES.SIZE.block]: this.block,
      },
    ];
    let buttonContent: VNode[] | VNode | string = this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
    let icon: VNode;

    if (this.loading) {
      icon = <Icon name="loading_gradient"></Icon>;
    } else if (typeof this.icon === 'string') {
      icon = <Icon name={this.icon}></Icon>;
    } else if (typeof icon === 'function') {
      icon = <i class={`${Icon.name}`}>{ this.icon() }</i>;
    }

    if (icon) {
      buttonContent = (
        <span class={`${name}__inner`}>
          { icon }
          {
            buttonContent ? (
              <span class={`${name}__text`}>
                { buttonContent }
              </span>
            ) : ''
          }
        </span>
      );
    }

    return (
      <button class={buttonClass} { ...{ on: this.$listeners } }>
        { 
          
         }
      </button>
    );
  },
});
