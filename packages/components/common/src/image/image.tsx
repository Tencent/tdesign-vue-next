import { computed, defineComponent, onMounted, onUnmounted, ref, toRefs, watch } from '@td/adapter-vue';
import { isFunction, omit } from 'lodash-es';
import { ImageErrorIcon, ImageIcon } from 'tdesign-icons-vue-next';
import { useImagePreviewUrl, useTNodeDefault, useTNodeJSX } from '@td/adapter-hooks';
import type { TdImageProps } from '@td/intel/image/type';
import props from '@td/intel/image/props';
import Space from '../space';
import { useConfig } from '../config-provider/useConfig';
import observe from '../_common/js/utils/observe';

export default defineComponent({
  name: 'TImage',

  props,

  setup(props: TdImageProps) {
    const divRef = ref<HTMLElement>(null);
    const imgRef = ref<HTMLImageElement>(null);
    let io: IntersectionObserver = null;

    const { src } = toRefs(props);

    const renderTNodeJSX = useTNodeJSX();

    onMounted(() => {
      // 在nuxt3中img的onload事件会失效
      if (imgRef.value?.complete && !props.lazy) {
        triggerHandleLoad();
      }

      if (!props.lazy || !divRef.value) {
        return;
      }

      const ioObserver = observe(divRef.value, null, handleLoadImage, 0);
      io = ioObserver;
    });
    onUnmounted(() => {
      divRef.value && io && io.unobserve(divRef.value);
    });

    const { classPrefix, globalConfig } = useConfig('image');

    // replace image url
    const imageStrSrc = ref(src.value);

    watch(
      [src, globalConfig],
      ([src, globalConfig]) => {
        const { replaceImageSrc } = globalConfig || {};
        const tmpUrl = isFunction(replaceImageSrc) ? replaceImageSrc(props) : src;
        if (tmpUrl === imageStrSrc.value && imageStrSrc.value) {
          return;
        }
        imageStrSrc.value = tmpUrl;
      },
      { immediate: true },
    );

    const { previewUrl } = useImagePreviewUrl(imageStrSrc);

    watch([previewUrl], () => {
      hasError.value = false;
      isLoaded.value = false;
    });

    const shouldLoad = ref(!props.lazy);
    const handleLoadImage = () => {
      shouldLoad.value = true;
    };

    const isLoaded = ref(false);
    const handleLoad = (e: Event) => {
      isLoaded.value = true;
      props.onLoad?.({ e });
    };
    const triggerHandleLoad = () => {
      const loadEvent = new Event('load');
      Object.defineProperty(loadEvent, 'target', {
        value: imgRef.value,
        enumerable: true,
      });
      handleLoad(loadEvent);
    };
    const hasError = ref(false);
    const handleError = (e: Event) => {
      hasError.value = true;
      props.onError?.({ e });
      if (props.fallback) {
        imageStrSrc.value = props.fallback;
        hasError.value = false;
      }
    };

    const hasMouseEvent = computed(() => {
      return props.overlayTrigger === 'hover';
    });

    const imageClasses = computed(() => [
      `${classPrefix.value}-image`,
      `${classPrefix.value}-image--fit-${props.fit}`,
      `${classPrefix.value}-image--position-${props.position}`,
    ]);

    const shouldShowOverlay = ref(!hasMouseEvent.value);
    const handleToggleOverlay = () => {
      if (hasMouseEvent.value) {
        shouldShowOverlay.value = !shouldShowOverlay.value;
      }
    };

    const renderPlaceholder = () => {
      const placeholder = renderTNodeJSX('placeholder');
      if (!placeholder) {
        return null;
      }
      return <div class={`${classPrefix.value}-image__placeholder`}>{placeholder}</div>;
    };

    const renderGalleryShadow = () => {
      if (!props.gallery) {
        return null;
      }
      return <div class={`${classPrefix.value}-image__gallery-shadow`} />;
    };

    const renderOverlay = () => {
      const overlayContent = renderTNodDefault('overlayContent');
      if (!overlayContent) {
        return null;
      }
      return (
        <div
          class={[
            `${classPrefix.value}-image__overlay-content`,
            !shouldShowOverlay.value && `${classPrefix.value}-image__overlay-content--hidden`,
          ]}
        >
          {overlayContent}
        </div>
      );
    };

    function renderImageSrcset() {
      return (
        <picture>
          {Object.entries(props.srcset).map(([type, url]) => (
            <source type={type} srcset={url} />
          ))}
          {renderImage()}
        </picture>
      );
    }

    function renderImage() {
      // string | File
      const url = typeof imageStrSrc.value === 'string' ? imageStrSrc.value : previewUrl.value;
      return (
        <img
          ref={imgRef}
          src={url}
          onError={handleError}
          onLoad={handleLoad}
          class={imageClasses.value}
          alt={props.alt}
          referrerpolicy={props.referrerpolicy}
        />
      );
    }

    const renderTNodDefault = useTNodeDefault();

    return () => {
      return (
        <div
          ref={divRef}
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
          {!(hasError.value || !shouldLoad.value)
          && (props.srcset && Object.keys(props.srcset).length ? renderImageSrcset() : renderImage())}
          {!(hasError.value || !shouldLoad.value) && !isLoaded.value && (
            <div class={`${classPrefix.value}-image__loading`}>
              {renderTNodeJSX('loading') || (
                <Space direction="vertical" size={8} align="center">
                  <ImageIcon size="24px" />
                  {typeof props.loading === 'string' ? props.loading : globalConfig.value.loadingText}
                </Space>
              )}
            </div>
          )}

          {hasError.value && (
            <div class={`${classPrefix.value}-image__error`}>
              {renderTNodDefault('error', {
                defaultNode: (
                  <Space direction="vertical" size={8} align="center">
                    <ImageErrorIcon size="24px" />
                    {typeof props.error === 'string' ? props.error : globalConfig.value.errorText}
                  </Space>
                ),
              })}
            </div>
          )}

          {renderOverlay()}
        </div>
      );
    };
  },
});
