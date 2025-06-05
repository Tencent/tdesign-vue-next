import { defineComponent, ref, computed, watch, onMounted, toRefs, CSSProperties, Teleport } from 'vue';
import GradientIcon from './icon/gradient';
import { addClass, removeClass } from '../utils/dom';
import { getPropertyValFromObj } from '@tdesign/common-js/utils/general';
import { useContent, useTNodeJSX, useTeleport, usePrefixClass, useCommonClassName } from '@tdesign/hooks';

import props from './props';

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
  inheritAttrs: false,
  props,
  setup(props, { slots, attrs }) {
    const delayShowLoading = ref(false);

    const { name, centerClass, fullscreenClass, lockClass, overlayClass, relativeClass, fullClass, inheritColorClass } =
      useComponentClassName();

    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
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
    const showAttachedLoading = computed(() => props.attach && props.loading && delayCounted.value);
    const classes = computed(() => {
      const baseClasses = [
        centerClass.value,
        getPropertyValFromObj(SIZE.value, props.size),
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

    return () => {
      const { fullScreenClasses, baseClasses, withContentClasses, attachClasses, normalClasses } = classes.value;

      const defaultIndicator = <GradientIcon size={props.size} />;
      const indicator = loading.value && renderTNodeJSX('indicator', defaultIndicator);
      const text = showText.value && <div class={`${classPrefix.value}-loading__text`}>{renderTNodeJSX('text')}</div>;

      // full screen loading
      if (props.fullscreen) {
        if (!showFullScreenLoading.value || !props.loading) return null;
        return (
          <Teleport disabled={!props.attach || !teleportElement.value} to={teleportElement.value}>
            <div class={fullScreenClasses} style={styles.value} {...attrs}>
              <div class={baseClasses}>
                {indicator}
                {text}
              </div>
            </div>
          </Teleport>
        );
      }

      // Loading is wrapping a HTMLElement.
      if (hasContent.value) {
        return (
          <div class={relativeClass.value} {...attrs}>
            {renderContent('default', 'content')}
            {showWrapLoading.value && (
              <div class={withContentClasses} style={styles.value}>
                {indicator}
                {text}
              </div>
            )}
          </div>
        );
      }

      // transfer parent node
      if (props.attach) {
        if (!showAttachedLoading.value || !loading.value) return null;
        return (
          <Teleport disabled={!props.attach || !teleportElement.value} to={teleportElement.value}>
            <div class={attachClasses} style={styles.value} {...attrs}>
              {indicator}
              {text}
            </div>
          </Teleport>
        );
      }

      // Normal Loading without overlay or content
      return loading.value ? (
        <div class={normalClasses} style={styles.value} {...attrs}>
          {indicator}
          {text}
        </div>
      ) : null;
    };
  },
});
