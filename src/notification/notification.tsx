import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import Icon from '../icon';

const name = `${prefix}-notification`;

export default Vue.extend({
  name,
  components: {
    [Icon.name]: Icon,
    RenderComponent,
  },
  // props: {
  //   visible: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   theme: {
  //     type: String,
  //     default: '',
  //     validator(v: string): boolean {
  //       return (
  //         [
  //           '',
  //           'info',
  //           'success',
  //           'warning',
  //           'error',
  //         ].indexOf(v) > -1
  //       );
  //     },
  //   },
  //   placement: {
  //     type: String,
  //     default: 'top-right',
  //     validator(v: string): boolean {
  //       return (
  //         [
  //           'top-left',
  //           'top-right',
  //           'bottom-left',
  //           'bottom-right',
  //         ].indexOf(v) > -1
  //       );
  //     },
  //   },
  //   duration: {
  //     type: Number,
  //     default: 3000,
  //   },
  //   showClose: {
  //     type: [Boolean, String, Function],
  //     default: true,
  //   },
  //   attach: {
  //     type: [String, Function],
  //     default: 'body',
  //   },
  //   zIndex: {
  //     type: Number,
  //     default: 5000,
  //   },
  //   // title: String,
  //   content: [String, Function],
  //   offset: Object,
  //   icon: [String, Function],
  //   footer: [String, Function],
  //   opened: Function,
  //   closed: Function,
  // },
  data() {
    return {
      _visible: false,
      theme: '',
      placement: 'top-right',
      offset: {},
      duration: 3000,
      title: '',
      icon: '',
      showClose: true,
      content: '',
      footer: '',
      opened: ()=>{},
      closed: ()=>{},
      _timer: setTimeout(()=>{},0),
    };
  },
  // watch: {
  //   visible: {
  //     handler(newVal) {
  //       this.visibleChange(newVal);
  //     },
  //     immediate: true,// 最初绑定的时候就执行handler
  //   }
  // },
  mounted() {
    if (this.duration > 0) {
      this._timer = setTimeout(() => {
        this.visibleChange(false);
      }, this.duration);
    }
    if(this.opened) this.opened();
  },
  methods: {
    visibleChange(visible: boolean) {
      this._visible = visible;
      // this.$forceUpdate(); // 立即触发render
    },
    handleClose() {
      this.visibleChange(false);
      if(this.closed) this.closed();
      this.$forceUpdate(); // 立即触发render
      var evt = document.createEvent("HTMLEvents")
      evt.initEvent('transitionend', false, false);
      this.$el.dispatchEvent(evt);
      // this.$el.removeEventListener('transitionend');
    },
  },
  render(h: CreateElement) {
    console.log('render: ');
    // icon
    let icon: VNode[] | VNode | string = '';
    if(this.theme){
      icon = (<div class='t-notification__icon--wrap'>
        <span class={`t-icon t-icon-${this.theme}-fill`}></span>
      </div>);
    }else if(this.icon || this.$scopedSlots.icon){
      switch (typeof this.icon){
        case 'function': {
          icon = this.icon(h);
          break;
        }
        case 'string': {
          icon = this.icon;
          break;
        }
      }
      icon = this.$scopedSlots.icon ? this.$scopedSlots.icon(null) : icon;
      icon = (
        <div class={`${name}__icon--wrap`}>{icon}</div>
      );
    }

    // close-icon
    let close: VNode[] | VNode | string = '';
    switch (typeof this.showClose){
      case 'boolean': {
        if(this.showClose === true) {
          if(this.$scopedSlots.close) {
            close = this.$scopedSlots.close(null);
          }else{
            close = (<span class={`${name}__icon--close t-icon t-icon-close`}></span>);
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
    switch (typeof this.content){
      case 'function': {
        content = this.content(h);
        break;
      }
      case 'string': {
        content = this.content ? (<div class={`${name}__content`}>{this.content}</div>): '';
        break;
      }
    };
    content = this.$scopedSlots.default ? this.$scopedSlots.default(null) : content;

    // footer
    let footer: VNode[] | VNode | string = '';
    switch (typeof this.footer){
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

    if(!this._visible) return;

    return (
      <div class={`${name} ${name}__show--${this.placement}`}>
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
  }
});
