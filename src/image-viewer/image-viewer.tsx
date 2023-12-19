import { computed, defineComponent, ref, toRefs, Teleport, watch, Transition, nextTick } from 'vue';
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
import Image from '../image';
import usePopupManager from '../hooks/usePopupManager';

export default defineComponent({
  name: 'TImageViewer',
  props: { ...props },
  setup(props) {
    const classPrefix = usePrefixClass();
    const COMPONENT_NAME = usePrefixClass('image-viewer');
    const renderTNodeJSX = useTNodeJSX();
    const isExpand = ref(true);
    const showOverlayValue = computed(() => getOverlay(props));

    const { index, visible, modelValue } = toRefs(props);
    const [indexValue, setIndexValue] = useDefaultValue(index, props.defaultIndex ?? 0, props.onIndexChange, 'index');
    const [visibleValue, setVisibleValue] = useVModel(visible, modelValue, props.defaultVisible, () => {}, 'visible');
    const animationEnd = ref(true);
    const animationTimer = ref();

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
    const { scale, onZoomIn, onZoomOut, resetScale } = useScale(props.imageScale);
    const { rotate, onRotate, resetRotate } = useRotate();
    const onRest = () => {
      resetMirror();
      resetScale();
      resetRotate();
    };

    const images = computed(() => formatImages(props.images));
    const currentImage = computed(() => images.value[indexValue.value] ?? { mainImage: '' });

    const { isLastDialog } = usePopupManager('dialog', {
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

    const openHandler = () => {
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
          if (props.closeOnEscKeydown && isLastDialog()) {
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
                  className={`${COMPONENT_NAME.value}__header-img`}
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

    return () => {
      if (props.mode === 'modeless') {
        return (
          <>
            {renderTNodeJSX('trigger', { params: { open: openHandler } })}
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
              title={props.title}
            />
          </>
        );
      }

      return (
        <>
          {renderTNodeJSX('trigger', { params: { open: openHandler } })}
          <Teleport to="body">
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
            </Transition>
          </Teleport>
        </>
      );
    };
  },
});
