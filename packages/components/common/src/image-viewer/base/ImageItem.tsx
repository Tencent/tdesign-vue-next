import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent, ref, toRefs, watch } from '@td/adapter-vue';
import { ImageErrorIcon } from 'tdesign-icons-vue-next';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import { useDrag } from '../hooks';
import { useImagePreviewUrl } from '../../hooks/useImagePreviewUrl';

export default defineComponent({
  name: 'TImageItem',
  props: {
    rotate: Number,
    scale: Number,
    mirror: Number,
    src: [String, Object] as PropType<string | File>,
    placementSrc: [String, Object] as PropType<string | File>,
  },

  setup(props) {
    const { src, placementSrc } = toRefs(props);
    const classPrefix = usePrefixClass();
    const error = ref(false);
    const loaded = ref(false);
    const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });
    const { globalConfig } = useConfig('imageViewer');
    const errorText = globalConfig.value.errorText;

    const imgStyle = computed(() => ({
      transform: `rotate(${props.rotate}deg) scale(${props.scale})`,
      display: !props.placementSrc || loaded.value ? 'block' : 'none',
    }));
    const placementImgStyle = computed(() => ({
      transform: `rotate(${props.rotate}deg) scale(${props.scale})`,
      display: !loaded.value ? 'block' : 'none',
    }));
    const boxStyle = computed(() => {
      const { translateX, translateY } = transform.value;
      return {
        transform: `translate(${translateX}px, ${translateY}px) scale(${props.mirror}, 1)`,
      };
    });

    const resetStatus = () => {
      error.value = false;
      loaded.value = false;
    };

    const { previewUrl: mainImagePreviewUrl } = useImagePreviewUrl(src);
    const { previewUrl: placementImagePreviewUrl } = useImagePreviewUrl(placementSrc);

    watch([mainImagePreviewUrl, placementImagePreviewUrl], () => {
      resetStatus();
    });

    return () => (
      <div class={`${classPrefix.value}-image-viewer__modal-pic`}>
        <div class={`${classPrefix.value}-image-viewer__modal-box`} style={boxStyle.value}>
          {error.value && (
            <div class={`${classPrefix.value}-image-viewer__img-error`}>
              {/* 脱离文档流 */}
              <div class={`${classPrefix.value}-image-viewer__img-error-content`}>
                <ImageErrorIcon size="4em" />
                <div class={`${classPrefix.value}-image-viewer__img-error-text`}>{errorText}</div>
              </div>
            </div>
          )}

          {!error.value && !!props.placementSrc && placementImagePreviewUrl.value && (
            <img
              class={`${classPrefix.value}-image-viewer__modal-image`}
              onMousedown={(event: MouseEvent) => {
                event.stopPropagation();
                mouseDownHandler(event);
              }}
              src={placementImagePreviewUrl.value}
              style={placementImgStyle.value}
              alt="image"
              draggable="false"
            />
          )}

          {!error.value && mainImagePreviewUrl.value && (
            <img
              class={`${classPrefix.value}-image-viewer__modal-image`}
              onMousedown={(event: MouseEvent) => {
                event.stopPropagation();
                mouseDownHandler(event);
              }}
              src={mainImagePreviewUrl.value}
              onLoad={() => (loaded.value = true)}
              onError={() => (error.value = true)}
              style={imgStyle.value}
              alt="image"
              draggable="false"
            />
          )}
        </div>
      </div>
    );
  },
});
