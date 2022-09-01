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
      const { deltaY } = e;
      deltaY > 0 ? onZoomIn() : onZoomOut();
    };

    const transStyle = computed(() => ({ transform: `translateX(-${indexValue.value * 84}px)` }));
    const renderClose = () => {
      return renderTNodeJSX('closeBtn', <CloseIcon size="24px" />);
    };
    const renderTrigger = () => {
      return renderTNodeJSX('trigger');
    };
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
    const renderDialog = () => {
      return (
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
          onClose={closeBtnAction}
          draggable={props.draggable}
          showOverlay={showOverlayValue.value}
          closeBtn={props.closeBtn}
        />
      );
    };
    return {
      COMPONENT_NAME,
      wrapClass,
      classPrefix,
      renderClose,
      renderTrigger,
      renderHeader,
      renderDialog,
      renderNavigationArrow,
      mirror,
      onMirror,
      onRest,
      scale,
      onZoomIn,
      onZoomOut,
      rotate,
      onRotate,
      prevImage,
      nextImage,
      indexValue,
      currentImage,
      visibleValue,
      closeBtnAction,
      clickOverlayHandler,
      showOverlayValue,
      zIndexValue,
      onWheel,
    };
  },
  render() {
    if (this.mode === 'modeless') {
      return (
        <>
          {this.renderTrigger()}
          {this.renderDialog()}
        </>
      );
    }

    return (
      <>
        {this.renderTrigger()}
        <Teleport to="body">
          {this.visibleValue && (
            <div class={this.wrapClass} style={{ zIndex: this.zIndexValue }} onWheel={this.onWheel}>
              {!!this.showOverlayValue && (
                <div class={`${this.COMPONENT_NAME}__modal--mask`} onClick={this.clickOverlayHandler} />
              )}
              <TImageViewerModal />
              {this.images.length > 1 && (
                <>
                  {this.renderHeader()}
                  <div class={`${this.COMPONENT_NAME}__modal--index`}>{`${this.indexValue + 1}/${
                    this.images.length
                  }`}</div>
                  {this.renderNavigationArrow('prev')}
                  {this.renderNavigationArrow('next')}
                </>
              )}
              <div
                class={[`${this.COMPONENT_NAME}__modal--icon`, `${this.COMPONENT_NAME}__modal--close-bt`]}
                onClick={this.closeBtnAction}
              >
                {this.renderClose()}
              </div>
              <TImageViewerUtils
                onZoomIn={this.onZoomIn}
                onZoomOut={this.onZoomOut}
                onMirror={this.onMirror}
                onReset={this.onRest}
                onRotate={this.onRotate}
                scale={this.scale}
                currentImage={this.currentImage}
              />
              <TImageItem
                scale={this.scale}
                rotate={this.rotate}
                mirror={this.mirror}
                src={this.currentImage.mainImage}
                placementSrc={this.currentImage.thumbnail}
              />
            </div>
          )}
        </Teleport>
      </>
    );
  },
});
