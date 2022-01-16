import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import GradientIcon from './icon/gradient';
import { prefix } from '../config';
import { SIZE_CLASSNAMES } from '../utils/classnames';
import { addClass, removeClass } from '../utils/dom';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import TransferDom from '../utils/transfer-dom';
import props from './props';
import { Styles } from '../common';

const name = `${prefix}-loading`;
const centerClass = `${prefix}-loading--center`;
const fullscreenClass = `${prefix}-loading__fullscreen`;
const lockClass = `${prefix}-loading--lock`;
const overlayClass = `${prefix}-loading__overlay`;
const relativeClass = `${prefix}-loading__parent`;
const fullClass = `${prefix}-loading--full`;
const inheritColorClass = `${prefix}-loading--inherit-color`;

export default defineComponent({
  name: 'TLoading',
  directives: {
    TransferDom,
  },
  props,
  setup(props, { slots }) {
    const delayShowLoading = ref(false);

    const countDelay = () => {
      delayShowLoading.value = false;
      const timer = setTimeout(() => {
        delayShowLoading.value = true;
        clearTimeout(timer);
      }, props.delay);
    };

    // 延时计时是否完成。用于控制延时计时结束前不能显示加载态
    const delayCounted = computed(() => Boolean(!props.delay || (props.delay && delayShowLoading.value)));

    // loading style
    const styles = computed(() => {
      const styles: Styles = {};
      if (props.zIndex !== undefined) {
        styles.zIndex = props.zIndex;
      }
      if (!['small', 'medium', 'large'].includes(props.size)) {
        styles['font-size'] = props.size;
      }
      return styles;
    });

    const hasContent = computed(() => Boolean(props.default || slots.default || props.content || slots.content));
    const lockFullscreen = computed(() => props.preventScrollThrough && props.fullscreen);
    const showText = computed(() => Boolean(props.text || slots.text));
    const showWrapLoading = computed(() => hasContent.value && props.loading && delayCounted.value);
    const showNormalLoading = computed(() => !hasContent.value && props.loading && delayCounted.value);

    const classes = computed(() => {
      const baseClasses = [centerClass, SIZE_CLASSNAMES[props.size], { [inheritColorClass]: props.inheritColor }];
      const fullScreenClasses = [name, fullscreenClass, centerClass, overlayClass];

      return {
        baseClasses,
        attachClasses: baseClasses.concat([name, fullClass, { [overlayClass]: props.showOverlay }]),
        withContentClasses: baseClasses.concat([
          name,
          fullClass,
          {
            [overlayClass]: props.showOverlay,
          },
        ]),
        fullScreenClasses,
        normalClasses: baseClasses.concat([name]),
      };
    });

    const loadingRef = computed(() => props.loading);
    watch([loadingRef], (value) => {
      if (value) {
        countDelay();
        lockFullscreen.value && addClass(document.body, lockClass);
      } else {
        lockFullscreen.value && removeClass(document.body, lockClass);
      }
    });

    onMounted(() => {
      props.delay && countDelay();
    });

    return {
      delayShowLoading,
      styles,
      showText,
      hasContent,
      classes,
      lockFullscreen,
      showWrapLoading,
      showNormalLoading,
    };
  },
  render() {
    const { fullScreenClasses, baseClasses, withContentClasses, attachClasses, normalClasses } = this.classes;

    const defaultIndicator = <GradientIcon size={this.size} />;
    const indicator = this.loading && renderTNodeJSX(this, 'indicator', defaultIndicator);
    const text = this.showText && <div class={`${prefix}-loading__text`}>{renderTNodeJSX(this, 'text')}</div>;

    // full screen loading
    if (this.fullscreen) {
      if (!this.loading) return null;
      return (
        <div class={fullScreenClasses} style={this.styles} v-transfer-dom={this.attach}>
          <div class={baseClasses}>
            {indicator}
            {text}
          </div>
        </div>
      );
    }

    // Loading is wrapping a HTMLElement.
    if (this.hasContent) {
      return (
        <div class={relativeClass}>
          {renderContent(this, 'default', 'content')}
          {this.showWrapLoading && (
            <div class={withContentClasses} style={this.styles}>
              {indicator}
              {text}
            </div>
          )}
        </div>
      );
    }

    // transfer parent node
    if (this.attach) {
      return (
        <div class={attachClasses} style={this.styles} v-transfer-dom={this.attach}>
          {indicator}
          {text}
        </div>
      );
    }

    // Normal Loading without overlay or content
    return (
      <div class={normalClasses} style={this.styles}>
        {indicator}
        {text}
      </div>
    );
  },
});
