import { computed, defineComponent, ref, toRefs, Teleport, onMounted, onBeforeUnmount } from 'vue';
import { ChevronLeftIcon, ChevronDownIcon, CloseIcon } from 'tdesign-icons-vue-next';

import props from './props';
import TImageViewerIcon from './base/ImageModalIcon';
import TImageViewerUtils from './base/ImageViewerUtils';
import TImageItem from './base/ImageItem';
import TImageViewerModal from './base/ImageViewerModal';
import { useTNodeJSX } from '../hooks/tnode';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';
import { usePrefixClass } from '../hooks/useConfig';
import { TdImageViewerProps } from './type';
import { useMirror, useRotate, useScale } from './hooks';
import { formatImages, getOverlay } from './utils';
import { EVENT_CODE } from './const';

export default defineComponent({
  name: 'TImageViewer',
  props: { ...props },
  setup(props) {
    const classPrefix = usePrefixClass();
    const COMPONENT_NAME = usePrefixClass('image-viewer');
    const renderTNodeJSX = useTNodeJSX();
    const isExpand = ref(false);
    const showOverlayValue = computed(() => getOverlay(props));
    const wrapClass = computed(() => [
      `${COMPONENT_NAME.value}-preview-image`,
      {
        [`${classPrefix.value}-is-hide`]: !props.visible,
      },
    ]);
    const headerClass = computed(() => [
      `${classPrefix.value}-image-viewer__modal-header`,
      {
        [`${classPrefix.value}-is-show`]: isExpand.value,
      },
    ]);
    const zIndexValue = computed(() => props.zIndex ?? 2000);
    const toggleExpand = () => {
      isExpand.value = !isExpand.value;
    };

    const { mirror, onMirror, resetMirror } = useMirror();
    const { scale, onZoomIn, onZoomOut, resetScale } = useScale(props.imageScale);
    const { rotate, onRotate, resetRotate } = useRotate();
    const onRest = () => {
      resetMirror();
      resetScale();
      resetRotate();
    };

    const images = computed(() => formatImages(props.images));
    const { index, visible, modelValue } = toRefs(props);
    const [indexValue, setIndexValue] = useDefaultValue(index, props.defaultIndex ?? 0, props.onIndexChange, 'index');
    const currentImage = computed(() => images.value[indexValue.value] ?? { mainImage: '' });

    const prevImage = () => {
      const newIndex = indexValue.value - 1;
      setIndexValue(newIndex < 0 ? 0 : newIndex, { trigger: 'prev' });
    };

    const nextImage = () => {
      const newIndex = indexValue.value + 1;
      setIndexValue(newIndex >= images.value.length ? indexValue.value : newIndex, { trigger: 'next' });
    };

    const onImgClick = (i: number) => {
      setIndexValue(i);
    };

    const [visibleValue, setVisibleValue] = useVModel(visible, modelValue, props.defaultVisible, () => {}, 'visible');
    const onClose: TdImageViewerProps['onClose'] = (ctx) => {
      setVisibleValue(false, ctx);
      props.onClose?.(ctx);
    };
    const closeBtnAction = (e: MouseEvent) => {
      onClose({ e, trigger: 'close-btn' });
    };
    const clickOverlayHandler = (e: MouseEvent) => {
      if (props.closeOnOverlay) {
        onClose({ e, trigger: 'overlay' });
      }
    };

    const keydownHandler = (e: KeyboardEvent) => {
      switch (e.code) {
        case EVENT_CODE.left:
          prevImage();
          break;
        case EVENT_CODE.right:
          nextImage();
          break;
        case EVENT_CODE.up:
          onZoomIn();
          break;
        case EVENT_CODE.down:
          onZoomOut();
          break;
        case EVENT_CODE.esc:
          onClose({ e, trigger: 'esc' });
          break;
        default:
          break;
      }
    };
    onMounted(() => {
      window.addEventListener('keydown', keydownHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', keydownHandler);
    });

    const onWheel = (e: WheelEvent) => {
      const { deltaY, ctrlKey } = e;
      // mac触摸板双指缩放时ctrlKey=true，deltaY>0为缩小  <0为放大
      if (ctrlKey) {
        return deltaY > 0 ? onZoomOut() : onZoomIn();
      }
      deltaY > 0 ? onZoomIn() : onZoomOut();
    };

    const transStyle = computed(() => ({ transform: `translateX(-${indexValue.value * 84}px)` }));

    const renderHeader = () => {
      return (
        <div class={headerClass.value}>
          <TImageViewerIcon
            icon={() => <ChevronDownIcon size="20px" />}
            class={`${COMPONENT_NAME.value}__header--pre__bt`}
            onClick={toggleExpand}
          />
          <div class={`${COMPONENT_NAME.value}__header--prev`}>
            <div class={`${COMPONENT_NAME.value}__bokeh--left`} />
            <div class={`${COMPONENT_NAME.value}__bokeh--right`} />
            <div class={`${COMPONENT_NAME.value}__header--trans`} style={transStyle.value}>
              {images.value.map((image, index) => (
                <div
                  key={index}
                  class={[
                    `${COMPONENT_NAME.value}__header--box`,
                    {
                      [`${classPrefix.value}-is-active`]: index === indexValue.value,
                    },
                  ]}
                >
                  <img
                    alt=""
                    src={image.thumbnail || image.mainImage}
                    className={`${COMPONENT_NAME.value}__header--img`}
                    onClick={() => onImgClick(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
    const renderNavigationArrow = (type: 'prev' | 'next') => {
      const rotateDeg = type === 'prev' ? 0 : 180;
      const icon = renderTNodeJSX(
        'navigationArrow',
        <ChevronLeftIcon style={{ transform: `rotate(${rotateDeg}deg)` }} size="24px" />,
      );

      return (
        <TImageViewerIcon
          class={`${COMPONENT_NAME.value}__modal--${type}-bt`}
          onClick={type === 'prev' ? prevImage : nextImage}
          icon={() => icon}
        />
      );
    };

    return () => {
      if (props.mode === 'modeless') {
        return (
          <>
            {renderTNodeJSX('trigger')}
            <TImageViewerModal
              zIndex={zIndexValue.value}
              visible={visibleValue.value}
              index={indexValue.value}
              images={images.value}
              scale={scale.value}
              rotate={rotate.value}
              mirror={mirror.value}
              currentImage={currentImage.value}
              onRotate={onRotate}
              onZoomIn={onZoomIn}
              onZoomOut={onZoomOut}
              onMirror={onMirror}
              onReset={onRest}
              onClose={onClose}
              draggable={props.draggable}
              showOverlay={showOverlayValue.value}
              closeBtn={props.closeBtn}
            />
          </>
        );
      }

      return (
        <>
          {renderTNodeJSX('trigger')}
          <Teleport to="body">
            {visibleValue.value && (
              <div class={wrapClass.value} style={{ zIndex: zIndexValue.value }} onWheel={onWheel}>
                {!!showOverlayValue.value && (
                  <div class={`${COMPONENT_NAME.value}__modal--mask`} onClick={clickOverlayHandler} />
                )}
                <TImageViewerModal />
                {images.value.length > 1 && (
                  <>
                    {renderHeader()}
                    <div class={`${COMPONENT_NAME.value}__modal--index`}>{`${indexValue.value + 1}/${
                      images.value.length
                    }`}</div>
                    {renderNavigationArrow('prev')}
                    {renderNavigationArrow('next')}
                  </>
                )}
                <div
                  class={[`${COMPONENT_NAME.value}__modal--icon`, `${COMPONENT_NAME.value}__modal--close-bt`]}
                  onClick={closeBtnAction}
                >
                  {renderTNodeJSX('closeBtn', <CloseIcon size="24px" />)}
                </div>
                <TImageViewerUtils
                  onZoomIn={onZoomIn}
                  onZoomOut={onZoomOut}
                  onMirror={onMirror}
                  onReset={onRest}
                  onRotate={onRotate}
                  scale={scale.value}
                  currentImage={currentImage.value}
                />
                <TImageItem
                  scale={scale.value}
                  rotate={rotate.value}
                  mirror={mirror.value}
                  src={currentImage.value.mainImage}
                  placementSrc={currentImage.value.thumbnail}
                />
              </div>
            )}
          </Teleport>
        </>
      );
    };
  },
});
