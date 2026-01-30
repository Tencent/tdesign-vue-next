import { computed, defineComponent, PropType } from 'vue';
import { ImageIcon, ZoomInIcon, ZoomOutIcon, DownloadIcon, MirrorIcon, RotationIcon } from 'tdesign-icons-vue-next';
import TImageViewerIcon from './ImageModalIcon';
import TToolTip from '../../tooltip';
import { useConfig, usePrefixClass, useImagePreviewUrl } from '@tdesign/shared-hooks';

import { ImageInfo } from '../type';
import { largeNumberToFixed } from '@tdesign/common-js/input-number/large-number';

export default defineComponent({
  name: 'TImageViewerUtils',
  props: {
    zIndex: Number,
    scale: Number,
    onRotate: Function as PropType<() => void>,
    onZoomIn: Function as PropType<() => void>,
    onZoomOut: Function as PropType<() => void>,
    onMirror: Function as PropType<() => void>,
    onReset: Function as PropType<() => void>,
    onDownload: Function as PropType<(url: string) => void>,
    currentImage: {
      type: Object as PropType<ImageInfo>,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const classPrefix = usePrefixClass();
    const imageUrl = computed(() => props.currentImage.mainImage);

    const { previewUrl } = useImagePreviewUrl(imageUrl);
    const { globalConfig } = useConfig('imageViewer');

    return () => (
      <div class={`${classPrefix.value}-image-viewer__utils`}>
        <div class={`${classPrefix.value}-image-viewer__utils-content`}>
          <TToolTip
            overlayClassName={`${classPrefix.value}-image-viewer__utils--tip`}
            content={globalConfig.value.mirrorTipText}
            destroyOnClose
            placement="top"
            showArrow
            theme="default"
            zIndex={props.zIndex}
          >
            <TImageViewerIcon onClick={props.onMirror} icon={() => <MirrorIcon size="medium" />} />
          </TToolTip>
          <TToolTip
            overlayClassName={`${classPrefix.value}-image-viewer__utils--tip`}
            content={globalConfig.value.rotateTipText}
            destroyOnClose
            placement="top"
            showArrow
            theme="default"
            zIndex={props.zIndex}
          >
            <TImageViewerIcon onClick={props.onRotate} icon={() => <RotationIcon size="medium" />} />
          </TToolTip>
          <TImageViewerIcon icon={() => <ZoomOutIcon size="medium" />} onClick={props.onZoomOut} />
          <TImageViewerIcon
            class={`${classPrefix.value}-image-viewer__utils-scale`}
            size="medium"
            label={`${largeNumberToFixed(String(props.scale * 100))}%`}
          />

          <TImageViewerIcon icon={() => <ZoomInIcon size="medium" />} onClick={props.onZoomIn} />
          <TToolTip
            overlayClassName={`${classPrefix.value}-image-viewer__utils--tip`}
            content={globalConfig.value.originalSizeTipText}
            destroyOnClose
            placement="top"
            showArrow
            theme="default"
            zIndex={props.zIndex}
          >
            <div class={`${classPrefix.value}-image-viewer__modal-icon`}>
              <TImageViewerIcon icon={() => <ImageIcon size="medium" />} onClick={props.onReset} />
            </div>
          </TToolTip>
          {props.currentImage.download && (
            <TImageViewerIcon
              icon={() => <DownloadIcon size="medium" />}
              onClick={() => {
                props.onDownload(previewUrl.value);
              }}
            />
          )}
        </div>
      </div>
    );
  },
});
