import { computed, defineComponent, PropType } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import TDialog from '../../dialog';
import TImageItem from './ImageItem';
import TImageViewerUtils from './ImageViewerUtils';
import { usePrefixClass } from '../../hooks/useConfig';
import { useTNodeJSX } from '../../hooks/tnode';
import { ImageInfo, TdImageViewerProps } from '../type';
import props from '../props';

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
    currentImage: {
      type: Object as PropType<ImageInfo>,
      default() {
        return {};
      },
    },
    onRotate: Function,
    onZoomIn: Function,
    onZoomOut: Function,
    onMirror: Function,
    onReset: Function,
    onClose: Function as PropType<TdImageViewerProps['onClose']>,
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
  },
  setup(props) {
    const classPrefix = usePrefixClass();
    const renderJSX = useTNodeJSX();
    const style = computed(() => ({
      minWidth: props.viewerScale.minWidth,
      minHeight: props.viewerScale.minHeight,
    }));
    return () => {
      return (
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
          closeBtn={false}
          draggable={props.draggable}
          zIndex={props.zIndex}
          showOverlay={props.showOverlay}
          class={`${classPrefix.value}-image-viewer__dialog`}
          header={() => (
            <div class={`${classPrefix.value}-image-viewer__mini--header`}>
              {`${props.index + 1}/${props.images.length}`}
              <span
                class={`${classPrefix.value}-image-viewer__mini--close`}
                onClick={(e: MouseEvent) => {
                  props.onClose({ e, trigger: 'close-btn' });
                }}
              >
                {renderJSX('closeBtn', <CloseIcon size="1.5rem" />)}
              </span>
            </div>
          )}
          footer={() => (
            <div class={`${classPrefix.value}-image-viewer-mini__footer`}>
              <TImageViewerUtils
                onZoomIn={props.onZoomIn}
                onZoomOut={props.onZoomOut}
                scale={props.scale}
                currentImage={props.currentImage}
                onRotate={props.onRotate}
                onMirror={props.onMirror}
                onReset={props.onReset}
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
            />
          </div>
        </TDialog>
      );
    };
  },
});
