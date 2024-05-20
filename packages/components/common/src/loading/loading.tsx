import type { CSSProperties } from '@td/adapter-vue';
import { Teleport, computed, defineComponent, onMounted, ref, toRefs, watch } from '@td/adapter-vue';
import props from '@td/intel/loading/props';

import { useCommonClassName, usePrefixClass, useTeleport } from '@td/adapter-hooks';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import { addClass, removeClass } from '@td/adapter-utils';
import GradientIcon from './icon/gradient';

function useComponentClassName() {
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
}

export default defineComponent({
  name: 'TLoading',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const delayShowLoading = ref(false);

    const { name, centerClass, fullscreenClass, lockClass, overlayClass, relativeClass, fullClass, inheritColorClass }
      = useComponentClassName();

    const classPrefix = usePrefixClass();
    const { SIZE } = useCommonClassName();

    const countDelay = () => {
      delayShowLoading.value = false;
      const timer = setTimeout(() => {
        delayShowLoading.value = true;
        clearTimeout(timer);
      }, props.delay);
    };
    // teleport容器
    const teleportElement = useTeleport(() => props.attach);
    // 延时计时是否完成。用于控制延时计时结束前不能显示加载态
    const delayCounted = computed(() => Boolean(!props.delay || (props.delay && delayShowLoading.value)));

    // loading style
    const styles = computed(() => {
      const styles: CSSProperties = {};
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
    const showAttachedLoading = computed(() => props.attach && props.loading && delayCounted.value);
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

    const { loading } = toRefs(props);

    watch([loading], ([isLoading]) => {
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
      showAttachedLoading,
      teleportElement,
    };
  },
  render() {
    const { fullScreenClasses, baseClasses, withContentClasses, attachClasses, normalClasses } = this.classes;

    const defaultIndicator = <GradientIcon size={this.size} />;
    const indicator = this.loading && renderTNodeJSX(this, 'indicator', defaultIndicator);
    const text = this.showText && <div class={`${this.classPrefix}-loading__text`}>{renderTNodeJSX(this, 'text')}</div>;

    // full screen loading
    if (this.fullscreen) {
      if (!this.showFullScreenLoading || !this.loading) {
        return null;
      }
      return (
        <Teleport disabled={!this.attach || !this.teleportElement} to={this.teleportElement}>
          <div class={fullScreenClasses} style={this.styles} {...this.$attrs}>
            <div class={baseClasses}>
              {indicator}
              {text}
            </div>
          </div>
        </Teleport>
      );
    }

    // Loading is wrapping a HTMLElement.
    if (this.hasContent) {
      return (
        <div class={this.relativeClass} {...this.$attrs}>
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
      if (!this.showAttachedLoading || !this.loading) {
        return null;
      }
      return (
        <Teleport disabled={!this.attach || !this.teleportElement} to={this.teleportElement}>
          <div class={attachClasses} style={this.styles} {...this.$attrs}>
            {indicator}
            {text}
          </div>
        </Teleport>
      );
    }

    // Normal Loading without overlay or content
    return this.loading
      ? (
        <div class={normalClasses} style={this.styles} {...this.$attrs}>
          {indicator}
          {text}
        </div>
        )
      : null;
  },
});
