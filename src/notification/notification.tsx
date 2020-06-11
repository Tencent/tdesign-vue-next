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
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'info',
      validator(v: string): boolean {
        return (
          [
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
      type: [Boolean, Function],
      default: true,
    },
    attach: {
      type: [String, Function],
      default: function(){return document.body},
    },
    zIndex: {
      type: Number,
      default: 5000,
    },
    title: String,
    content: [String, Function],
    offset: Object,
    icon: [String, Function],
    footer: Function,
  },
  data() {
    return {
      _visible: false,
      test: false,
    };
  },
  watch: {
    visible: {
      handler(newVal) {
        this.visibleChange(newVal);
      },
      immediate: true,// 最初绑定的时候就执行handler
    }
  },
  methods: {
    visibleChange(visible: boolean) {
      this._visible = visible;
    }
  },
  render(h: CreateElement) {
    // content
    let content: VNode[] | VNode | string;
    switch (typeof this.content){
      case "function": {
        content = this.content();
        break;
      }
      case "string": {
        content = this.content;
        break;
      }
      default: {
        content = this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
      }
    };
    if (content) {
      content = (
        <div class={`${name}__content`}>{content}</div>
      );
    }

    if(!this._visible) return;

    return (
      <div class={name}>
        <div class={`${name}__main--wrap`}>
          <div class={`${name}__title--wrap`}>
            <span class={`${name}__title`}>{this.title}</span>
            <span class={`${name}__icon--close t-icon t-icon-close`}></span>
          </div>
          {content}
        </div>
      </div>
    );
  }
});
