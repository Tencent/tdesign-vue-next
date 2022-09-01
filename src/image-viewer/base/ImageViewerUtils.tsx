import { defineComponent, PropType } from 'vue';
import { ImageIcon, ZoomInIcon, ZoomOutIcon, DownloadIcon, MirrorIcon, RotationIcon } from 'tdesign-icons-vue-next';

import TImageViewerIcon from './ImageModalIcon';
import TToolTip from '../../tooltip';
import { usePrefixClass } from '../../hooks/useConfig';
import { downloadFile } from '../utils';

import { ImageInfo } from '../type';

export default defineComponent({
  name: 'TImageViewerUtils',
  props: {
    scale: Number,
    onRotate: Function,
    onZoomIn: Function,
    onZoomOut: Function,
    onMirror: Function,
    onReset: Function,
    currentImage: {
      type: Object as PropType<ImageInfo>,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const classPrefix = usePrefixClass();

    return () => (
      <div class={`${classPrefix.value}-image-viewer__utils`}>
        <div class={`${classPrefix.value}-image-viewer__utils--content`}>
          <TToolTip
            overlayClassName={`${classPrefix.value}-image-viewer__utils--tip`}
            content="镜像"
            destroyOnClose
            placement="top"
            showArrow
            theme="default"
          >
            <TImageViewerIcon onClick={props.onMirror} icon={() => <MirrorIcon size="medium" />} />
          </TToolTip>
          <TToolTip
            overlayClassName={`${classPrefix.value}-image-viewer__utils--tip`}
            content="旋转"
            destroyOnClose
            placement="top"
            showArrow
            theme="default"
          >
            <TImageViewerIcon onClick={props.onRotate} icon={() => <RotationIcon size="medium" />} />
          </TToolTip>
          <TImageViewerIcon icon={() => <ZoomOutIcon size="medium" />} onClick={props.onZoomOut} />
          <TImageViewerIcon
            class={`${classPrefix.value}-image-viewer__utils--scale`}
            size="medium"
            label={`${props.scale * 100}%`}
          />
          <TImageViewerIcon icon={() => <ZoomInIcon size="medium" />} onClick={props.onZoomIn} />
          <TToolTip
            overlayClassName={`${classPrefix.value}-image-viewer__utils--tip`}
            content="原始大小"
            destroyOnClose
            placement="top"
            showArrow
            theme="default"
          >
            <div class={`${classPrefix.value}-image-viewer__modal--icon`}>
              <TImageViewerIcon icon={() => <ImageIcon size="medium" />} onClick={props.onReset} />
            </div>
          </TToolTip>
          {props.currentImage.download && (
            <TImageViewerIcon
              icon={() => <DownloadIcon size="medium" />}
              onClick={() => {
                downloadFile(props.currentImage.mainImage);
              }}
            />
          )}
        </div>
      </div>
    );
  },
});
