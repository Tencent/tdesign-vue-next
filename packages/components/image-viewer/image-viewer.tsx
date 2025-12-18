import { BrowseIcon, ChevronDownIcon, ChevronLeftIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { Teleport, Transition, computed, defineComponent, nextTick, ref, toRefs, watch } from 'vue';
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
import { downloadImage, formatImages } from '@tdesign/common-js/image-viewer/utils';
import Image from '../image';
import TImageItem from './base/ImageItem';
import TImageViewerIcon from './base/ImageModalIcon';
import TImageViewerModal from './base/ImageViewerModal';
import TImageViewerUtils from './base/ImageViewerUtils';
import { EVENT_CODE } from './consts';
import { useMirror, useRotate, useScale } from './hooks';
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
    const zIndexValue = computed(() => props.zIndex ?? 2600);
    const toggleExpand = () => {
      isExpand.value = !isExpand.value;
    };

    const { mirror, onMirror, resetMirror } = useMirror();
    const { scale, onZoomIn, onZoomOut, resetScale } = useScale(props.imageScale as ImageScale);
    const { rotate, onRotate, resetRotate } = useRotate();
    const onRest = () => {
      resetMirror();
      resetScale();
      resetRotate();
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
      if (props.closeOnOverlay) {
        onClose({ e, trigger: 'overlay' });
      }
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
          onZoomIn();
          break;
        case EVENT_CODE.down:
          onZoomOut();
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

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaY } = e;
      deltaY > 0 ? onZoomOut() : onZoomIn();
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
            {renderTNodeJSX('trigger', { params: { open: openHandler } }) || renderDefaultTrigger()}
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
              onDownload={onDownloadClick}
              draggable={props.draggable}
              showOverlay={showOverlayValue.value}
              title={props.title}
              imageReferrerpolicy={imageReferrerpolicy.value}
            />
          </>
        );
      }

      return (
        <>
          {renderTNodeJSX('trigger', { params: { open: openHandler } }) || renderDefaultTrigger()}
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
                    <div class={`${COMPONENT_NAME.value}__modal-mask`} onClick={clickOverlayHandler} />
                  )}
                  {images.value.length > 1 && (
                    <>
                      {renderHeader()}
                      <div class={`${COMPONENT_NAME.value}__modal-index`}>
                        {props.title && renderTNodeJSX('title')}
                        {`${indexValue.value + 1}/${images.value.length}`}
                      </div>
                      {renderNavigationArrow('prev')}
                      {renderNavigationArrow('next')}
                    </>
                  )}
                  {renderCloseBtn()}
                  <TImageViewerUtils
                    zIndex={zIndexValue.value + 1}
                    onZoomIn={onZoomIn}
                    onZoomOut={onZoomOut}
                    onMirror={onMirror}
                    onReset={onRest}
                    onRotate={onRotate}
                    onDownload={onDownloadClick}
                    scale={scale.value}
                    currentImage={currentImage.value}
                  />
                  <TImageItem
                    scale={scale.value}
                    rotate={rotate.value}
                    mirror={mirror.value}
                    src={currentImage.value.mainImage}
                    placementSrc={currentImage.value.thumbnail}
                    isSvg={currentImage.value.isSvg}
                    imageReferrerpolicy={imageReferrerpolicy.value}
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
