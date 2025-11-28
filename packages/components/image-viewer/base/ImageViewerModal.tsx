import { computed, defineComponent, PropType } from 'vue';
import TDialog from '../../dialog';
import { useTNodeJSX, usePrefixClass } from '@tdesign/shared-hooks';

import props from '../props';
import { ImageInfo, TdImageViewerProps } from '../type';
import TImageItem from './ImageItem';
import TImageViewerUtils from './ImageViewerUtils';

export default defineComponent({
  name: 'TImageViewerModal',
  props: {
    zIndex: Number,
    visible: Boolean,
    index: Number,
    images: props.images,
    scale: Number,
    rotate: Number,
    mirror: Number,
    title: props.title,
    currentImage: {
      type: Object as PropType<ImageInfo>,
      default() {
        return {};
      },
    },
    onRotate: Function as PropType<() => void>,
    onZoomIn: Function as PropType<() => void>,
    onZoomOut: Function as PropType<() => void>,
    onMirror: Function as PropType<() => void>,
    onReset: Function as PropType<() => void>,
    onClose: props.onClose,
    onDownload: props.onDownload,
    draggable: {
      type: Boolean,
      default: true,
    },
    viewerScale: {
      type: Object as PropType<TdImageViewerProps['viewerScale']>,
      default() {
        return {};
      },
    },
    showOverlay: Boolean,
    closeBtn: props.closeBtn,
    imageReferrerpolicy: props.imageReferrerpolicy,
  },
  setup(props) {
    const classPrefix = usePrefixClass();
    const renderJSX = useTNodeJSX();
    const style = computed(() => ({
      minWidth: props.viewerScale.minWidth,
      minHeight: props.viewerScale.minHeight,
    }));

    return () => (
      <TDialog
        destroyOnClose
        attach="body"
        onClose={props.onClose}
        visible={props.visible}
        placement="center"
        mode="modeless"
        width={1000}
        cancelBtn={null}
        confirmBtn={null}
        draggable={props.draggable}
        zIndex={props.zIndex}
        showOverlay={props.showOverlay}
        class={`${classPrefix.value}-image-viewer__dialog`}
        header={renderJSX('title', '')}
        footer={() => (
          <div class={`${classPrefix.value}-image-viewer-mini__footer`}>
            <TImageViewerUtils
              zIndex={props.zIndex}
              onZoomIn={props.onZoomIn}
              onZoomOut={props.onZoomOut}
              scale={props.scale}
              currentImage={props.currentImage}
              onRotate={props.onRotate}
              onMirror={props.onMirror}
              onReset={props.onReset}
              onDownload={props.onDownload}
            />
          </div>
        )}
      >
        <div class={`${classPrefix.value}-image-viewer-mini__content`} style={style.value}>
          <TImageItem
            rotate={props.rotate}
            scale={props.scale}
            mirror={props.mirror}
            src={props.currentImage.mainImage}
            placementSrc={props.currentImage.thumbnail}
            isSvg={props.currentImage.isSvg}
            imageReferrerpolicy={props.imageReferrerpolicy}
          />
        </div>
      </TDialog>
    );
  },
});
