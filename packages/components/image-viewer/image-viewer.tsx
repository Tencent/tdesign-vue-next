import { BrowseIcon, ChevronDownIcon, ChevronLeftIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { Teleport, Transition, computed, defineComponent, nextTick, onBeforeUnmount, ref, toRefs, watch } from 'vue';
import { isNumber } from 'lodash-es';

import {
  useVModel,
  useTNodeJSX,
  useTeleport,
  usePrefixClass,
  useDefaultValue,
  usePopupManager,
  useConfig,
} from '@tdesign/shared-hooks';
import { isPropsUsed } from '@tdesign/shared-utils';
import { downloadImage, formatImages } from '@tdesign/common-js/image-viewer/utils';
import Image from '../image';
import TImageItem from './base/ImageItem';
import TImageViewerIcon from './base/ImageModalIcon';
import TImageViewerModal from './base/ImageViewerModal';
import TImageViewerUtils from './base/ImageViewerUtils';
import { EVENT_CODE } from './constants';
import { useMirror, useRotate, useScale, useDrag } from './hooks';
import props from './props';
import { ImageScale, TdImageViewerProps } from './type';
import { getOverlay } from './utils';

export default defineComponent({
  name: 'TImageViewer',
  props,
  setup(props) {
    const classPrefix = usePrefixClass();
    const COMPONENT_NAME = usePrefixClass('image-viewer');
    const renderTNodeJSX = useTNodeJSX();
    const { globalConfig } = useConfig('imageViewer');

    const isExpand = ref(true);
    const showOverlayValue = computed(() => getOverlay(props));

    const { index, visible, modelValue, imageReferrerpolicy } = toRefs(props);
    const [indexValue, setIndexValue] = useDefaultValue(index, props.defaultIndex ?? 0, props.onIndexChange, 'index');
    const [visibleValue, setVisibleValue] = useVModel(visible, modelValue, props.defaultVisible, () => {}, 'visible');
    const animationEnd = ref(true);
    const animationTimer = ref();
    // teleport容器
    const teleportElement = useTeleport(() => props.attach);

    const wrapClass = computed(() => [
      COMPONENT_NAME.value,
      `${COMPONENT_NAME.value}-preview-image`,
      {
        [`${classPrefix.value}-is-hide`]: !visibleValue.value,
      },
    ]);
    const headerClass = computed(() => [
      `${classPrefix.value}-image-viewer__modal-header`,
      {
        [`${classPrefix.value}-is-show`]: isExpand.value,
      },
    ]);
    const zIndexValue = computed(() => props.zIndex ?? 3000);
    const toggleExpand = () => {
      isExpand.value = !isExpand.value;
    };

    const { mirror, onMirror, resetMirror } = useMirror();
    const { scale, onZoomIn, onZoomOut, resetScale } = useScale(props.imageScale as ImageScale);
    const { rotate, onRotate, resetRotate } = useRotate();

    // 用于区分点击和拖拽
    const isDragging = ref(false);
    const dragDistance = ref(0);

    const handleDragStart = () => {
      isDragging.value = true;
      dragDistance.value = 0;
    };

    const handleDragEnd = (distance: number) => {
      isDragging.value = false;
      dragDistance.value = distance;
    };

    // 拖拽功能
    const {
      transform: dragTransform,
      mouseDownHandler: imageDragHandler,
      resetTransform: resetDragTransform,
    } = useDrag({ translateX: 0, translateY: 0 }, handleDragStart, handleDragEnd, {
      maxTranslateX: 2000,
      maxTranslateY: 2000,
    });

    const onRest = () => {
      resetMirror();
      resetScale();
      resetRotate();
      resetDragTransform();
    };

    // 包装缩放函数，用于工具栏按钮和键盘快捷键，自动处理位移重置
    const handleZoomIn = () => {
      const result = onZoomIn();
      if (result?.shouldResetTranslate) {
        resetDragTransform();
      } else if (result?.newTranslate) {
        dragTransform.value = result.newTranslate;
      }
    };

    const handleZoomOut = () => {
      const result = onZoomOut();
      if (result?.shouldResetTranslate) {
        resetDragTransform();
      } else if (result?.newTranslate) {
        dragTransform.value = result.newTranslate;
      }
    };

    const images = computed(() => formatImages(props.images));
    const currentImage = computed(() => images.value[indexValue.value] ?? { mainImage: '' });

    const { isTopInteractivePopup } = usePopupManager('dialog', {
      visible: visibleValue,
    });

    const prevImage = () => {
      const newIndex = indexValue.value - 1;
      onRest();
      setIndexValue(newIndex < 0 ? 0 : newIndex, { trigger: 'prev' });
    };

    const nextImage = () => {
      const newIndex = indexValue.value + 1;
      onRest();
      setIndexValue(newIndex >= images.value.length ? indexValue.value : newIndex, { trigger: 'next' });
    };

    const onImgClick = (i: number) => {
      setIndexValue(i, { trigger: 'current' });
    };

    const onDownloadClick = (url: string) => {
      props.onDownload ? props.onDownload(url) : downloadImage(url);
    };

    const openHandler = (index?: number) => {
      if (isNumber(index)) {
        onImgClick(index);
      }

      setVisibleValue(true);
    };
    const onClose: TdImageViewerProps['onClose'] = (ctx) => {
      setVisibleValue(false);
      props.onClose?.(ctx);
    };
    const closeBtnAction = (e: MouseEvent) => {
      onClose({ e, trigger: 'close-btn' });
    };
    const clickOverlayHandler = (e: MouseEvent) => {
      // 如果拖拽距离小于 5px，则认为是点击，否则认为是拖拽
      if (props.closeOnOverlay && dragDistance.value < 5) {
        onClose({ e, trigger: 'overlay' });
      }
    };
    // 重置拖拽距离（在鼠标按下时）
    const resetDragDistance = () => {
      dragDistance.value = 0;
    };

    const keydownHandler = (e: KeyboardEvent) => {
      e.stopPropagation();

      switch (e.code) {
        case EVENT_CODE.left:
          prevImage();
          break;
        case EVENT_CODE.right:
          nextImage();
          break;
        case EVENT_CODE.up:
          handleZoomIn();
          break;
        case EVENT_CODE.down:
          handleZoomOut();
          break;
        case EVENT_CODE.esc:
          if (props.closeOnEscKeydown && isTopInteractivePopup()) {
            onClose({ e, trigger: 'esc' });
          }
          break;
        default:
          break;
      }
    };

    const divRef = ref<HTMLDivElement>();
    const imageItemRef = ref<{ modalBoxRef?: HTMLDivElement }>();

    watch(
      () => visibleValue.value,
      (val) => {
        clearTimeout(animationTimer.value);
        if (val) {
          animationEnd.value = false;
          nextTick().then(() => {
            divRef.value?.focus?.();
          });

          onRest();
        } else {
          animationTimer.value = setTimeout(() => {
            animationEnd.value = true;
          }, 200);
        }
      },
    );

    // Clean up timer when component is unmounted to prevent memory leaks and errors
    onBeforeUnmount(() => {
      clearTimeout(animationTimer.value);
    });

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaY, clientX, clientY } = e;

      // 获取容器和图片元素
      const container = divRef.value;
      const modalBox = imageItemRef.value?.modalBoxRef;
      let zoomOptions = {};

      if (container) {
        let mouseOffsetX = 0;
        let mouseOffsetY = 0;
        const isMouseOnImage = modalBox && isPointInElement(clientX, clientY, modalBox);

        if (isMouseOnImage) {
          // 鼠标在图片上，以图片边界为参考
          const rect = modalBox.getBoundingClientRect();
          const imageCenterX = rect.left + rect.width / 2;
          const imageCenterY = rect.top + rect.height / 2;

          mouseOffsetX = clientX - imageCenterX;
          mouseOffsetY = clientY - imageCenterY;
        } else {
          // 鼠标在图片外，以容器边界为参考
          const rect = container.getBoundingClientRect();
          const containerCenterX = rect.left + rect.width / 2;
          const containerCenterY = rect.top + rect.height / 2;

          mouseOffsetX = clientX - containerCenterX;
          mouseOffsetY = clientY - containerCenterY;
        }

        zoomOptions = {
          mouseOffsetX,
          mouseOffsetY,
          currentTranslate: dragTransform.value,
          isOnImage: isMouseOnImage,
        };
      }

      // 执行缩放并获取新的位移值
      const result = deltaY > 0 ? onZoomOut(zoomOptions) : onZoomIn(zoomOptions);

      // 如果缩放比例回到了默认值，重置位移到原点
      if (result?.shouldResetTranslate) {
        resetDragTransform();
      }
      // 否则应用新的位移值（替换，而不是累加）
      else if (result?.newTranslate) {
        dragTransform.value = result.newTranslate;
      }
    };

    /**
     * 检测点是否在元素边界内
     */
    const isPointInElement = (x: number, y: number, element: HTMLElement): boolean => {
      const rect = element.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    const transStyle = computed(() => ({
      transform: `translateX(calc(-${indexValue.value} * (40px / 9 * 16 + 4px)))`,
    }));

    const renderHeader = () => (
      <div class={headerClass.value}>
        <TImageViewerIcon
          icon={() => <ChevronDownIcon />}
          class={`${COMPONENT_NAME.value}__header-pre-bt`}
          onClick={toggleExpand}
        />
        <div class={`${COMPONENT_NAME.value}__header-prev`}>
          <div class={`${COMPONENT_NAME.value}__header-trans`} style={transStyle.value}>
            {images.value.map((image, index) => (
              <div
                key={index}
                class={[
                  `${COMPONENT_NAME.value}__header-box`,
                  {
                    [`${classPrefix.value}-is-active`]: index === indexValue.value,
                  },
                ]}
              >
                <Image
                  src={image.thumbnail || image.mainImage}
                  error=""
                  class={`${COMPONENT_NAME.value}__header-img`}
                  onClick={() => onImgClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    const renderTitle = () => {
      const titleContent = renderTNodeJSX('title');

      return (
        <div class={`${COMPONENT_NAME.value}__modal-index`}>
          {titleContent ? titleContent : `${indexValue.value + 1}/${images.value.length}`}
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
          class={`${COMPONENT_NAME.value}__modal-${type}-bt`}
          onClick={type === 'prev' ? prevImage : nextImage}
          icon={() => icon}
        />
      );
    };

    const renderCloseBtn = () => {
      if (props.closeBtn === false) {
        return;
      }
      return (
        <div
          class={[`${COMPONENT_NAME.value}__modal-icon`, `${COMPONENT_NAME.value}__modal-close-bt`]}
          onClick={closeBtnAction}
        >
          {renderTNodeJSX('closeBtn', <CloseIcon size="24px" />)}
        </div>
      );
    };

    const renderDefaultTrigger = () => {
      const firstImage = images.value[0] || '';
      const imageSrc = typeof firstImage === 'string' ? firstImage : firstImage.mainImage || firstImage.thumbnail;
      return (
        <div class={`${COMPONENT_NAME.value}__trigger`}>
          <Image
            src={imageSrc}
            alt="preview"
            fit="contain"
            class={`${COMPONENT_NAME.value}__trigger-img`}
            onClick={() => openHandler()}
          />
          <div class={`${COMPONENT_NAME.value}__trigger--hover`} onClick={() => openHandler()}>
            <span>
              <BrowseIcon size="1.4em" class={`${COMPONENT_NAME.value}__trigger-icon`} />
              {globalConfig.value.previewText}
            </span>
          </div>
        </div>
      );
    };

    return () => {
      if (props.mode === 'modeless') {
        return (
          <>
            {isPropsUsed('trigger')
              ? renderTNodeJSX('trigger', { params: { open: openHandler } })
              : renderDefaultTrigger()}
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
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onMirror={onMirror}
              onReset={onRest}
              onClose={onClose}
              onDownload={onDownloadClick}
              draggable={props.draggable}
              showOverlay={showOverlayValue.value}
              title={renderTitle}
              imageReferrerpolicy={imageReferrerpolicy.value}
              transform={dragTransform.value}
              mouseDownHandler={imageDragHandler}
            />
          </>
        );
      }

      return (
        <>
          {isPropsUsed('trigger')
            ? renderTNodeJSX('trigger', { params: { open: openHandler } })
            : renderDefaultTrigger()}
          <Teleport disabled={!props.attach || !teleportElement.value} to={teleportElement.value}>
            <Transition>
              {(visibleValue.value || !animationEnd.value) && (
                <div
                  ref={divRef}
                  v-show={visibleValue.value}
                  class={wrapClass.value}
                  style={{ zIndex: zIndexValue.value }}
                  onWheel={onWheel}
                  tabindex={-1}
                  onKeydown={keydownHandler}
                >
                  {!!showOverlayValue.value && (
                    <div
                      class={`${COMPONENT_NAME.value}__modal-mask`}
                      onClick={clickOverlayHandler}
                      onMousedown={
                        props.draggableOverlay
                          ? (e: MouseEvent) => {
                              e.preventDefault();
                              resetDragDistance();
                              imageDragHandler(e);
                            }
                          : undefined
                      }
                    />
                  )}
                  {images.value.length > 1 && (
                    <>
                      {renderHeader()}
                      {renderTitle()}
                      {renderNavigationArrow('prev')}
                      {renderNavigationArrow('next')}
                    </>
                  )}
                  {renderCloseBtn()}
                  <TImageViewerUtils
                    zIndex={zIndexValue.value + 1}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onMirror={onMirror}
                    onReset={onRest}
                    onRotate={onRotate}
                    onDownload={onDownloadClick}
                    scale={scale.value}
                    currentImage={currentImage.value}
                  />
                  <TImageItem
                    ref={imageItemRef}
                    scale={scale.value}
                    rotate={rotate.value}
                    mirror={mirror.value}
                    src={currentImage.value.mainImage}
                    placementSrc={currentImage.value.thumbnail}
                    isSvg={currentImage.value.isSvg}
                    imageReferrerpolicy={imageReferrerpolicy.value}
                    transform={dragTransform.value}
                    mouseDownHandler={imageDragHandler}
                  />
                </div>
              )}
            </Transition>
          </Teleport>
        </>
      );
    };
  },
});
