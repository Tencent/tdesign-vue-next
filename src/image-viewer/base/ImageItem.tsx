import { ImageErrorIcon } from 'tdesign-icons-vue-next';
import { PropType, computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import { useImagePreviewUrl } from '../../hooks/useImagePreviewUrl';
import { useDrag } from '../hooks';

export default defineComponent({
  name: 'TImageItem',
  props: {
    rotate: Number,
    scale: Number,
    mirror: Number,
    src: [String, Object] as PropType<string | File>,
    placementSrc: [String, Object] as PropType<string | File>,
    isSvg: Boolean,
  },

  setup(props) {
    const { src, placementSrc, isSvg } = toRefs(props);
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

    const createSvgShadow = async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        error.value = true;
        throw new Error(`Failed to fetch SVG: ${response.statusText}`);
      }
      const svgText = await response.text();

      const element = document.querySelector('[data-alt="svg"]');
      element.innerHTML = '';
      element.classList?.add(`${classPrefix.value}-image-viewer__modal-image-svg`);
      const shadowRoot = element.attachShadow({ mode: 'closed' });

      const container = document.createElement('div');

      container.style.background = 'transparent';
      container.innerHTML = svgText;
      shadowRoot.appendChild(container);

      const svgElement = container.querySelector('svg');
      if (svgElement) {
        const svgViewBox = svgElement.getAttribute('viewBox');
        if (svgViewBox) {
          const viewBoxValues = svgViewBox
            .split(/[\s\,]/)
            .filter(function (v) {
              return v;
            })
            .map(parseFloat);

          // svg viewbox x(0) and y(1) offset, width(2) and height(3),eg
          const svgViewBoxWidth = viewBoxValues[2];
          const svgViewBoxHeight = viewBoxValues[3];
          container.style.width = `${svgViewBoxWidth}px`;
          container.style.height = `${svgViewBoxHeight}px`;
        } else {
          const bbox = svgElement.getBBox();
          const calculatedViewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
          svgElement.setAttribute('viewBox', calculatedViewBox);

          container.style.width = `${bbox.width}px`;
          container.style.height = `${bbox.height}px`;
        }
      }
      loaded.value = true;
    };

    const { previewUrl: mainImagePreviewUrl } = useImagePreviewUrl(src);
    const { previewUrl: placementImagePreviewUrl } = useImagePreviewUrl(placementSrc);

    watch([mainImagePreviewUrl, placementImagePreviewUrl], () => {
      resetStatus();
    });

    onMounted(async () => {
      if (isSvg.value) {
        await createSvgShadow(mainImagePreviewUrl.value);
      }
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

          {!error.value && mainImagePreviewUrl.value && !isSvg.value && (
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

          {!error.value && mainImagePreviewUrl.value && isSvg.value && (
            <div
              class={`${classPrefix.value}-image-viewer__modal-image`}
              onMousedown={(event: MouseEvent) => {
                event.stopPropagation();
                mouseDownHandler(event);
              }}
              data-alt="svg"
              style={imgStyle.value}
              draggable="false"
            ></div>
          )}
        </div>
      </div>
    );
  },
});
