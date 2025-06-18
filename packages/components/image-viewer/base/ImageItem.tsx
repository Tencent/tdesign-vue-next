import { ImageErrorIcon } from 'tdesign-icons-vue-next';
import { PropType, computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue';
import { useConfig, usePrefixClass, useImagePreviewUrl } from '@tdesign/shared-hooks';

import { useDrag } from '../hooks';
import { TdImageViewerProps } from '../type';

export default defineComponent({
  name: 'TImageItem',
  props: {
    rotate: Number,
    scale: Number,
    mirror: Number,
    src: [String, Object] as PropType<string | File>,
    placementSrc: [String, Object] as PropType<string | File>,
    isSvg: Boolean,
    imageReferrerpolicy: String as PropType<TdImageViewerProps['imageReferrerpolicy']>,
  },

  setup(props) {
    const { src, placementSrc, isSvg } = toRefs(props);
    const classPrefix = usePrefixClass();
    const error = ref(false);
    const loaded = ref(false);
    const { transform, mouseDownHandler } = useDrag({ translateX: 0, translateY: 0 });
    const { globalConfig } = useConfig('imageViewer');
    const errorText = globalConfig.value.errorText;
    const svgElRef = ref<HTMLDivElement>();

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
      if (isSvg.value) {
        createSvgShadow(mainImagePreviewUrl.value);
      }
    };

    const createSvgShadow = async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        error.value = true;
        throw new Error(`Failed to fetch SVG: ${response.statusText}`);
      }
      const svgText = await response.text();

      const element = svgElRef.value;
      element.innerHTML = '';
      element.classList?.add(`${classPrefix.value}-image-viewer__modal-image-svg`);
      const shadowRoot = element.attachShadow({ mode: 'closed' });

      const container = document.createElement('div');

      container.style.background = 'var(--td-bg-color-container)';
      container.style.padding = '4px';
      container.style.borderRadius = '4px';
      container.style.maxHeight = '100%';
      container.style.maxWidth = '100%';
      container.style.boxSizing = 'border-box';
      container.style.height = 'auto';
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
          // const svgViewBoxHeight = viewBoxValues[3];
          container.style.width = `${svgViewBoxWidth}px`;
        } else {
          const bbox = svgElement.getBBox();
          const calculatedViewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
          svgElement.setAttribute('viewBox', calculatedViewBox);

          container.style.width = `${bbox.width}px`;
        }
        svgElement.style.maxHeight = '100%';
        svgElement.style.maxWidth = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.display = 'block';
        svgElement.style.lineHeight = 'normal';
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
              referrerpolicy={props.imageReferrerpolicy}
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
              referrerpolicy={props.imageReferrerpolicy}
              alt="image"
              draggable="false"
            />
          )}

          {!error.value && mainImagePreviewUrl.value && isSvg.value && (
            <div
              ref={svgElRef}
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
