import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import GradientIcon from './icon/gradient';
import { addClass, removeClass } from '../utils/dom';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import TransferDom from '../utils/transfer-dom';
import props from './props';
import { Styles } from '../common';

import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';

const useComponentClassName = () => {
  return {
    name: usePrefixClass('loading'),
    centerClass: usePrefixClass('loading--center'),
    fullscreenClass: usePrefixClass('loading__fullscreen'),
    lockClass: usePrefixClass('loading--lock'),
    overlayClass: usePrefixClass('loading__overlay'),
    relativeClass: usePrefixClass('loading__parent'),
    fullClass: usePrefixClass('loading--full'),
    inheritColorClass: usePrefixClass('loading--inherit-color'),
  };
};

export default defineComponent({
  name: 'TLoading',
  directives: {
    TransferDom,
  },
  props,
  setup(props, { slots }) {
    const delayShowLoading = ref(false);

    const { name, centerClass, fullscreenClass, lockClass, overlayClass, relativeClass, fullClass, inheritColorClass } =
      useComponentClassName();

    const classPrefix = usePrefixClass();
    const { SIZE } = useCommonClassName();

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
    const showFullScreenLoading = computed(() => props.fullscreen && props.loading && delayCounted.value);
    const showNormalLoading = computed(() => props.attach && props.loading && delayCounted.value);

    const classes = computed(() => {
      const baseClasses = [
        centerClass.value,
        SIZE.value[props.size],
        { [inheritColorClass.value]: props.inheritColor },
      ];
      const fullScreenClasses = [name.value, fullscreenClass.value, centerClass.value, overlayClass.value];

      return {
        baseClasses,
        attachClasses: baseClasses.concat([name.value, fullClass.value, { [overlayClass.value]: props.showOverlay }]),
        withContentClasses: baseClasses.concat([
          name.value,
          fullClass.value,
          {
            [overlayClass.value]: props.showOverlay,
          },
        ]),
        fullScreenClasses,
        normalClasses: baseClasses.concat([name.value]),
      };
    });

    const loadingRef = computed(() => props.loading);

    watch([loadingRef], ([isLoading]) => {
      if (isLoading) {
        countDelay();
        lockFullscreen.value && addClass(document.body, lockClass.value);
      } else {
        lockFullscreen.value && removeClass(document.body, lockClass.value);
      }
    });

    onMounted(() => {
      props.delay && countDelay();
    });

    return {
      classPrefix,
      relativeClass,
      delayShowLoading,
      styles,
      showText,
      hasContent,
      classes,
      lockFullscreen,
      showWrapLoading,
      showNormalLoading,
      showFullScreenLoading,
    };
  },
  render() {
    const { fullScreenClasses, baseClasses, withContentClasses, attachClasses, normalClasses } = this.classes;

    const defaultIndicator = <GradientIcon size={this.size} />;
    const indicator = this.loading && renderTNodeJSX(this, 'indicator', defaultIndicator);
    const text = this.showText && <div class={`${this.classPrefix}-loading__text`}>{renderTNodeJSX(this, 'text')}</div>;

    // full screen loading
    if (this.fullscreen) {
      if (!this.showFullScreenLoading) return null;
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
        <div class={this.relativeClass}>
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
