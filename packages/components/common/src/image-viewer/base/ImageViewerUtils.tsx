import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent } from '@td/adapter-vue';
import { DownloadIcon, ImageIcon, MirrorIcon, RotationIcon, ZoomInIcon, ZoomOutIcon } from 'tdesign-icons-vue-next';
import TToolTip from '../../tooltip';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import { downloadFile } from '../utils';
import { useImagePreviewUrl } from '../../hooks';
import type { ImageInfo } from '../type';
import { largeNumberToFixed } from '@td/shared/_common/js/input-number/large-number';
import TImageViewerIcon from './ImageModalIcon';

export default defineComponent({
  name: 'TImageViewerUtils',
  props: {
    scale: Number,
    onRotate: Function as PropType<() => void>,
    onZoomIn: Function as PropType<() => void>,
    onZoomOut: Function as PropType<() => void>,
    onMirror: Function as PropType<() => void>,
    onReset: Function as PropType<() => void>,
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
          >
            <div class={`${classPrefix.value}-image-viewer__modal-icon`}>
              <TImageViewerIcon icon={() => <ImageIcon size="medium" />} onClick={props.onReset} />
            </div>
          </TToolTip>
          {props.currentImage.download && (
            <TImageViewerIcon
              icon={() => <DownloadIcon size="medium" />}
              onClick={() => {
                downloadFile(previewUrl.value);
              }}
            />
          )}
        </div>
      </div>
    );
  },
});
