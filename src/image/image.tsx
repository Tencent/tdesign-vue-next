import { defineComponent, ref, onMounted, computed, onUnmounted } from 'vue';
import omit from 'lodash/omit';
import observe from '../_common/js/utils/observe';
import { useConfig } from '../config-provider/useConfig';
import { useTNodeDefault } from '../hooks/tnode';
import { TdImageProps } from './type';
import props from './props';

export default defineComponent({
  name: 'TImage',
  props,
  setup(props: TdImageProps) {
    const imageRef = ref<HTMLElement>(null);
    let io: IntersectionObserver = null;

    onMounted(() => {
      if (!props.lazy || !imageRef.value) return;

      const ioObserver = observe(imageRef.value, null, handleLoadImage, 0);
      io = ioObserver;
    });

    onUnmounted(() => {
      imageRef.value && io && io.unobserve(imageRef.value);
    });

    const { classPrefix } = useConfig();

    const shouldLoad = ref(!props.lazy);
    const handleLoadImage = () => {
      shouldLoad.value = true;
    };

    const isLoaded = ref(false);
    const handleLoad = () => {
      isLoaded.value = true;
      props.onLoad?.();
    };

    const hasError = ref(false);
    const handleError = () => {
      hasError.value = true;
      props.onError?.();
    };

    const hasMouseEvent = computed(() => {
      return props.overlayTrigger === 'hover';
    });

    const shouldShowOverlay = ref(!hasMouseEvent.value);
    const handleToggleOverlay = () => {
      if (hasMouseEvent.value) {
        shouldShowOverlay.value = !shouldShowOverlay.value;
      }
    };

    const renderPlaceholder = () => {
      if (!props.placeholder) {
        return null;
      }
      return <div class={`${classPrefix.value}-image__placeholder`}>{props.placeholder}</div>;
    };
    const renderGalleryShadow = () => {
      if (!props.gallery) return null;
      return <div class={`${classPrefix.value}-image__gallery-shadow`} />;
    };
    const renderOverlay = () => {
      if (!props.overlayContent) return null;
      return (
        <div
          class={[
            `${classPrefix.value}-image__overlay-content`,
            !shouldShowOverlay.value && `${classPrefix.value}-image__overlay-content--hidden`,
          ]}
        >
          {props.overlayContent}
        </div>
      );
    };

    const renderTNodDefault = useTNodeDefault();

    return () => (
      <div
        ref={imageRef}
        class={[
          `${classPrefix.value}-image__wrapper`,
          `${classPrefix.value}-image__wrapper--shape-${props.shape}`,
          props.gallery && `${classPrefix.value}-image__wrapper--gallery`,
          hasMouseEvent.value && `${classPrefix.value}-image__wrapper--need-hover`,
        ]}
        onMouseenter={handleToggleOverlay}
        onMouseleave={handleToggleOverlay}
        {...omit(props, [
          'src',
          'alt',
          'fit',
          'position',
          'shape',
          'placeholder',
          'loading',
          'error',
          'overlayTrigger',
          'overlayContent',
          'lazy',
          'gallery',
          'onLoad',
          'onError',
        ])}
      >
        {renderPlaceholder()}
        {renderGalleryShadow()}

        {(hasError.value || !shouldLoad.value) && <div class={`${classPrefix.value}-image`} />}
        {!(hasError.value || !shouldLoad.value) && (
          <img
            src={props.src}
            onError={handleError}
            onLoad={handleLoad}
            class={[
              `${classPrefix.value}-image`,
              `${classPrefix.value}-image--fit-${props.fit}`,
              `${classPrefix.value}-image--position-${props.position}`,
            ]}
            alt={props.alt}
          />
        )}
        {!(hasError.value || !shouldLoad.value) && !isLoaded.value && (
          <div class={`${classPrefix.value}-image__loading`}>
            {props.loading || (
              <div direction="vertical" size={8} align="center">
                图片加载中
              </div>
            )}
          </div>
        )}

        {hasError.value && (
          <div class={`${classPrefix.value}-image__error`}>
            {renderTNodDefault(
              'error',
              <div direction="vertical" size={8} align="center">
                图片无法显示
              </div>,
            )}
          </div>
        )}

        {renderOverlay()}
      </div>
    );
  },
});
