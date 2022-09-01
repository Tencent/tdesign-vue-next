import { computed, defineComponent, ref, watch } from 'vue';
import { ImageErrorIcon } from 'tdesign-icons-vue-next';
import { usePrefixClass } from '../../hooks/useConfig';
import { useDrag } from '../hooks';

export default defineComponent({
  name: 'TImageItem',
  props: {
    rotate: Number,
    scale: Number,
    mirror: Number,
    src: String,
    placementSrc: String,
  },
  setup(props) {
    const classPrefix = usePrefixClass();
    const error = ref(false);
    const loaded = ref(false);
    const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });

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

    watch(
      () => props.src,
      () => {
        resetStatus();
      },
    );

    return () => {
      return (
        <div class={`${classPrefix.value}-image-viewer__modal--pic`}>
          <div class={`${classPrefix.value}-image-viewer__modal--box`} style={boxStyle.value}>
            {error.value && (
              <div class={`${classPrefix.value}-image-viewer__img-error`}>
                {/* 脱离文档流 */}
                <div class={`${classPrefix.value}-image-viewer__img-error--content`}>
                  <ImageErrorIcon size="4em" />
                  <div class={`${classPrefix.value}-image-viewer__img-error--text`}>图片加载失败，可尝试重新加载</div>
                </div>
              </div>
            )}

            {!error.value && !!props.placementSrc && (
              <img
                class={`${classPrefix.value}-image-viewer__modal--image`}
                onMousedown={(event: MouseEvent) => {
                  event.stopPropagation();
                  mouseDownHandler(event);
                }}
                src={props.placementSrc}
                style={placementImgStyle.value}
                alt="image"
                draggable="false"
              />
            )}

            {!error.value && (
              <img
                class={`${classPrefix.value}-image-viewer__modal--image`}
                onMousedown={(event: MouseEvent) => {
                  event.stopPropagation();
                  mouseDownHandler(event);
                }}
                src={props.src}
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
    };
  },
});
