import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import Icon from '../icon/iconfont';
import { addClass, removeClass } from '../utils/dom';
const name = `${prefix}-loading`;
const textClass = `${prefix}-loading-text`;
const wrapperClass = `${prefix}-loading__wrapper`;
const fullscreenClass = `${prefix}-loading-fullscreen`;
const maskClass = `${prefix}-loading-mask`;
const relativeClass = `${prefix}-loading-parent__relative`;
const lockClass = `${prefix}-loading-lock`;

export default Vue.extend({
  name,

  components: {
    [Icon.name]: Icon,
    RenderComponent,
  },

  props: {
    indicator: {
      type: [Function, String],
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'middle',
    },
    delay: {
      type: Number,
      default: 0,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
    showOverlay: {
      type: Boolean,
      default: true,
    },
    preventScrollThrough: {
      type: Boolean,
      default: false,
    },
    isService: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showLoading: false,
    };
  },

  watch: {
    loading(value) {
      if (this.preventScrollThrough && this.fullscreen) {
        if (value) {
          addClass(document.body, lockClass);
        } else {
          removeClass(document.body, lockClass);
        }
      }
    },
  },

  render() {
    const itemClass = [
      name,
      CLASSNAMES.SIZE[this.size],
      this.className,
    ];
    const parentClass: any = [relativeClass];
    const wrapClassList = [
      wrapperClass,
    ];

    if (this.text) {
      itemClass.push(textClass);
    }

    // 当loading作为包裹元素时，添加遮罩才有效果
    if ((this.$scopedSlots.default && this.showOverlay) || this.isService) {
      wrapClassList.push(maskClass);
    }

    if (this.fullscreen) {
      wrapClassList.push(fullscreenClass);
    }

    if (this.preventScrollThrough) {
      wrapClassList.push(lockClass);
    }


    const { indicator } = this;
    const text = this.text ? <span>{this.text}</span> : '';
    const loadingSlot: any = this.$scopedSlots.indicator ? this.$scopedSlots.indicator(null) : '';
    const loadingFucValue = typeof indicator === 'function' ? indicator() : '';

    const loadingContent: any = loadingFucValue || loadingSlot || <t-icon name='loading'></t-icon>;
    const loadingDefaultDom: VNode | Node = <span class={itemClass}>{loadingContent}{text}</span>;

    const defaultSlot: any = this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';

    if (this.delay && this.loading) {
      setTimeout(() => {
        this.showLoading = this.loading;
      }, this.delay);
    } else {
      this.showLoading = this.loading;
    }

    if (this.showLoading) {
      if (defaultSlot || this.isService) {
        return (
          <div class={parentClass}>
            {defaultSlot}
            <div class={wrapClassList}>{loadingDefaultDom}</div>
          </div>
        );
      }
      return loadingDefaultDom;
    }
    return <slot></slot>;
  },
});
