import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import Icon from '../icon';

const name = `${prefix}-notification`;

export default Vue.extend({
  name,
  components: {
    [Icon.name]: Icon,
    RenderComponent,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: '',
      validator(v: string): boolean {
        return (
          [
            '',
            'info',
            'success',
            'warning',
            'error',
          ].indexOf(v) > -1
        );
      },
    },
    placement: {
      type: String,
      default: 'top-right',
      validator(v: string): boolean {
        return (
          [
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ].indexOf(v) > -1
        );
      },
    },
    duration: {
      type: Number,
      default: 3000,
    },
    showClose: {
      type: [Boolean, String, Function],
      default: true,
    },
    attach: {
      type: [String, Function],
      default: 'body',
    },
    zIndex: {
      type: Number,
      default: 5000,
    },
    title: String,
    content: [String, Function],
    offset: Object,
    icon: [String, Function],
    footer: [String, Function],
    opened: Function,
    closed: Function,
    _top: {
      type: Number,
      default: 0,
    },
    _bottom: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      myVisible: false,
    };
  },
  watch: {
    visible: {
      handler(newVal) {
        this.visibleChange(newVal);
      },
      immediate: true, // run handler immediately in first bind
    },
  },
  methods: {
    visibleChange(visible: boolean) {
      this.myVisible = visible;
      this.$forceUpdate(); // render immediately
      if (visible) {
        if (this.duration > 0) {
          setTimeout(() => {
            this.handleClose();
          }, this.duration);
        }
        if (this.opened) this.opened();
      }
    },
    handleClose() {
      this.visibleChange(false);
      if (this.closed) this.closed();
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('transitionEnd', false, false);
      this.$el.dispatchEvent(evt);
    },
  },
  render(h: CreateElement) {
    if (!this.myVisible) return;
    // icon
    let icon: VNode[] | VNode | string = '';
    if (this.theme) {
      const iconType = this.theme === 'success' ? 'success' : 'prompt';
      icon = (<div class='t-notification__icon--wrap'>
        <t-icon name={`${iconType}-fill`} class={`${name}__icon-${this.theme}`} />
      </div>);
    } else if (this.icon || this.$scopedSlots.icon) {
      switch (typeof this.icon) {
        case 'function': {
          icon = (<div class={`${name}__icon--wrap`}>{this.icon(h)}</div>);
          break;
        }
        case 'string': {
          icon = (<div class={`${name}__icon--wrap`}>{this.icon}</div>);
        }
      }
      icon = this.$scopedSlots.icon ? this.$scopedSlots.icon(null) : icon;
    }

    // close-icon
    let close: VNode[] | VNode | string = '';
    switch (typeof this.showClose) {
      case 'boolean': {
        if (this.showClose === true) {
          if (this.$scopedSlots.close) {
            close = this.$scopedSlots.close(null);
          } else {
            close = (<t-icon name="close" />);
          }
        }
        break;
      }
      case 'function': {
        close = this.showClose(h);
        break;
      }
      case 'string': {
        close = this.showClose;
        break;
      }
    };

    // content
    let content: VNode[] | VNode | string = '';
    switch (typeof this.content) {
      case 'function': {
        content = this.content(h);
        break;
      }
      case 'string': {
        content = this.content ? (<div class={`${name}__content`}>{this.content}</div>) : '';
        break;
      }
    };
    content = this.$scopedSlots.default ? this.$scopedSlots.default(null) : content;

    // footer
    let footer: VNode[] | VNode | string = '';
    switch (typeof this.footer) {
      case 'function': {
        footer = this.footer(h);
        break;
      }
      case 'string': {
        footer = this.footer ? (<div class={`${name}__detail`}>{this.footer}</div>) : '';
        break;
      }
    };
    footer = this.$scopedSlots.footer ? this.$scopedSlots.footer(null) : footer;

    // display
    let top = 0;
    let bottom = 0;
    let left = 0;
    let right = 0;
    if (this.placement.indexOf('top') !== -1) {
      const offsetTop = this.offset && this.offset.top ? this.offset.top : 0;
      top += this._top + offsetTop;
    }
    if (this.placement.indexOf('bottom') !== -1) {
      const offsetBottom = this.offset && this.offset.bottom ? this.offset.bottom : 0;
      bottom += this._bottom + offsetBottom;
    }
    if (this.placement.indexOf('left') !== -1 && this.offset && this.offset.left) {
      left = this.offset.left + 16;
    }
    if (this.placement.indexOf('right') !== -1 && this.offset && this.offset.right) {
      right = this.offset.right + 16;
    }

    const style = `${top ? `top: ${top}px;` : ''}` +
      `${bottom ? `bottom: ${bottom}px;` : ''}` +
      `${left ? `left: ${left}px;` : ''}` +
      `${right ? `right: ${right}px;` : ''}` +
      `${this.zIndex ? `z-index: ${this.zIndex};` : ''}`;

    return (
      <div class={`${name} ${name}__show--${this.placement}`} style={style}>
        {icon}
        <div class={`${name}__main--wrap`}>
          <div class={`${name}__title--wrap`}>
            <span class={`${name}__title`}>{this.title}</span>
            <div class={`${name}__icon--close`} onclick={this.handleClose}>{close}</div>
          </div>
          {content}
          {footer}
        </div>
      </div>
    );
  },
});
