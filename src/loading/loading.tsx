import { defineComponent } from 'vue';
import { prefix } from '../config';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { SIZE_CLASSNAMES } from '../utils/classnames';
import Icon from '../icon/iconfont';
import { addClass, removeClass } from '../utils/dom';
import props from './props';
import TransferDom from '../utils/transfer-dom';
import GradientIcon from './icon/gradient';

const name = `${prefix}-loading`;
const wrapperClass = `${prefix}-loading__wrapper`;
const fullscreenClass = `${prefix}-loading-fullscreen`;
const maskClass = `${prefix}-loading-mask`;
const relativeClass = `${prefix}-loading-parent__relative`;
const lockClass = `${prefix}-loading-lock`;

export default defineComponent({
  name,

  components: {
    [Icon.name]: Icon,
  },

  directives: {
    TransferDom,
  },

  props: {
    ...props,
    isService: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      delayShowLoading: false,
    };
  },

  computed: {
    showText(): boolean {
      return Boolean(this.text || this.$slots.text);
    },
    classes(): Array<string> {
      const ret = [name, SIZE_CLASSNAMES[this.size]];
      if (this.fullscreen) {
        ret.push(...this.fullscreenClasses);
      }
      if (this.showOverlay) {
        ret.push(maskClass);
      }
      if (this.preventScrollThrough) {
        ret.push(lockClass);
      }
      if (this.attach) {
        ret.push(wrapperClass);
      }
      return ret;
    },
    wrapMaskClasses(): Array<string> {
      return this.showOverlay ? [wrapperClass, maskClass] : [wrapperClass];
    },
    fullscreenClasses(): Array<string> {
      return this.loading ? [fullscreenClass, wrapperClass, maskClass] : [fullscreenClass];
    },
    hasContent(): boolean {
      return Boolean(this.default || this.$slots.default || this.content || this.$slots.content);
    },
    lockFullscreen(): boolean {
      return this.preventScrollThrough && this.fullscreen;
    },
    // 延时计时是否完成。用于控制延时计时结束前不能显示加载态
    delayCounted(): boolean {
      return Boolean(!this.delay || (this.delay && this.delayShowLoading));
    },
    showWrapLoading(): boolean {
      return this.hasContent && this.loading && this.delayCounted;
    },
    showNormalLoading(): boolean {
      return !this.hasContent && this.loading && this.delayCounted;
    },
  },

  watch: {
    loading: {
      handler(value) {
        if (value) {
          this.countDelay();
          this.lockFullscreen && addClass(document.body, lockClass);
          return;
        }
        this.lockFullscreen && removeClass(document.body, lockClass);
      },
      immediate: true,
    },
  },

  methods: {
    countDelay() {
      this.delayShowLoading = false;
      const timer = setTimeout(() => {
        this.delayShowLoading = true;
        clearTimeout(timer);
      }, this.delay);
    },
  },

  render() {
    const content = renderContent(this, 'default', 'content');
    const defaultIndicator = <GradientIcon size={this.size} />;
    const indicator = renderTNodeJSX(this, 'indicator', defaultIndicator);
    const text = this.showText && <div class="t-loading-text">{renderTNodeJSX(this, 'text')}</div>;
    const baseNode = (
      <div
        class={this.classes}
        v-transfer-dom={this.attach}
        style={this.zIndex !== undefined && { zIndex: this.zIndex }}
      >
        {this.showNormalLoading && indicator}
        {this.showNormalLoading && text}
      </div>
    );

    // 有包裹
    if (this.hasContent) {
      return (
        <div class={relativeClass} style={this.zIndex !== undefined && { zIndex: this.zIndex }}>
          {content}
          {this.showWrapLoading && (
            <div class={this.wrapMaskClasses}>
              {indicator}
              {text}
            </div>
          )}
        </div>
      );
    }

    // 服务，加外层div作为父节点防止transfer-dom空指针
    if (this.isService && this.attach) {
      return <div>{baseNode}</div>;
    }

    return baseNode;
  },
});
