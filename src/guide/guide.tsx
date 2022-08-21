import { computed, defineComponent, h, nextTick, onMounted, ref, toRefs, watch } from 'vue';

import props from './props';
import setStyle from './utils/setStyle';
import getScrollParent from './utils/getScrollParent';
import getOffset from './utils/getOffset';
import getTargetElm from './utils/getTargetElm';
import scrollTo from './utils/scrollTo';

import TransferDom from '../utils/transfer-dom';

import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import useVModel from '../hooks/useVModel';

import Button, { TdButtonProps } from '../button';
import Popup from '../popup';
import Dialog from '../dialog';

import { TdGuideProps, TdGuideStepProps, CrossProps, StepDialogPlacement } from './type';
import { defalutCrossProps, tooltipZIndex } from './const';

export default defineComponent({
  name: 'TGuide',
  directives: {
    TransferDom,
  },
  props: { ...props },
  setup(props) {
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();

    const classPrefix = usePrefixClass();
    const COMPONENT_NAME = usePrefixClass('guide');
    const { SIZE } = useCommonClassName();

    const { current, modelValue, hideCounter, hidePrev, hideSkip, steps } = toRefs(props);

    const [innerCurrent, setInnerCurrent] = useVModel(current, modelValue, props.defaultCurrent, props.onChange);

    // 覆盖层，用于覆盖所有元素
    // const overlayLayer = ref<JSX.Element>();
    // 高亮层，用于高亮元素
    // const highlightLayer = ref<JSX.Element>();
    // 覆盖层，用于覆盖所有元素
    const overlayLayerRef = ref<HTMLElement>();
    // 高亮层，用于高亮元素
    const highlightLayerRef = ref<HTMLElement>();
    // 提示层，用于高亮元素
    const referenceLayerRef = ref<HTMLElement>();
    // 当前高亮的元素
    const currentHighlightLayerElm = ref<HTMLElement>();
    // 下一个高亮的元素
    const nextHighlightLayerElm = ref<HTMLElement>();
    // dialog ref
    const dialogRef = ref<HTMLElement>();
    // 是否开始展示
    const actived = ref<boolean>(false);
    // 步骤总数
    const stepsTotal = computed(() => steps.value.length);
    // 当前步骤的信息
    const currentStepInfo = computed(() => steps.value[innerCurrent.value]);

    // 获取当前步骤的所有属性 用户当前步骤设置 > 用户全局设置的 > 默认值
    const getCurrentCrossProps = (propsName: keyof CrossProps) =>
      currentStepInfo.value[propsName] || props[propsName] || defalutCrossProps[propsName];
    // 当前是否为 popup
    const isPopup = computed(() => getCurrentCrossProps('mode') === 'popup');

    // 滑动到元素位置
    const scrollParentToElement = (element: HTMLElement) => {
      const parent = getScrollParent(element);
      if (parent === document.body) return;
      parent.scrollTop = element.offsetTop - parent.offsetTop;
    };

    // 设置高亮层的位置
    const setHighlightLayerPosition = (highlighLayer: HTMLElement) => {
      const elementPosition = getOffset(nextHighlightLayerElm.value, currentHighlightLayerElm.value);
      setStyle(highlighLayer, {
        width: `${elementPosition.width}px`,
        height: `${elementPosition.height}px`,
        top: `${elementPosition.top}px`,
        left: `${elementPosition.left}px`,
      });
    };

    const showPopupGuide = () => {
      const currentElement = getTargetElm(currentStepInfo.value.element);
      nextHighlightLayerElm.value = currentElement;
      nextTick(() => {
        scrollParentToElement(nextHighlightLayerElm.value);
        setHighlightLayerPosition(highlightLayerRef.value);
        setHighlightLayerPosition(referenceLayerRef.value);
        scrollTo(nextHighlightLayerElm.value);
        currentHighlightLayerElm.value = currentElement;
      });
    };

    const destoryTooltipElm = () => {
      referenceLayerRef.value?.parentNode.removeChild(referenceLayerRef.value);
      highlightLayerRef.value?.parentNode.removeChild(highlightLayerRef.value);
      overlayLayerRef.value?.parentNode.removeChild(overlayLayerRef.value);
    };

    const showGuide = () => {
      if (isPopup.value) {
        showPopupGuide();
      } else {
        destoryTooltipElm();
      }
    };

    const handleSkip = (e: MouseEvent) => {
      actived.value = false;
      setInnerCurrent(-1, stepsTotal.value - 1, { e });
      destoryTooltipElm();
      props.onSkip?.(-1, stepsTotal.value, { e });
    };

    const handlePrev = (e: MouseEvent) => {
      setInnerCurrent(innerCurrent.value - 1, stepsTotal.value - 1, { e });
      props.onClickPrevStep?.(innerCurrent.value, innerCurrent.value - 1, stepsTotal.value, { e });
    };

    const handleNext = (e: MouseEvent) => {
      setInnerCurrent(innerCurrent.value + 1, stepsTotal.value - 1, { e });
      props.onClickNextStep?.(innerCurrent.value, innerCurrent.value + 1, stepsTotal.value, { e });
    };

    const handleFinish = (e: MouseEvent) => {
      actived.value = false;
      setInnerCurrent(-1, stepsTotal.value - 1, { e });
      destoryTooltipElm();
      props.onFinish?.(-1, stepsTotal.value - 1, { e });
    };

    watch(innerCurrent, (val) => {
      if (val >= 0 && val < steps.value.length) {
        actived.value = true;
        showGuide();
      } else {
        actived.value = false;
        console.info('当前引导的步骤', val);
      }
    });

    onMounted(() => {
      if (innerCurrent.value >= 0 && innerCurrent.value < stepsTotal.value) {
        actived.value = true;
        showGuide();
      } else {
        actived.value = false;
        console.info('当前引导的步骤', innerCurrent.value);
      }
    });

    return () => {
      const renderOverlayLayer = () => (
        <div ref={overlayLayerRef} v-transfer-dom="body" class={`${COMPONENT_NAME.value}__overlay`} />
      );

      const renderHighlightLayer = () => (
        <div ref={highlightLayerRef} v-transfer-dom="body" class={`${COMPONENT_NAME.value}__highlight`} />
      );

      const renderCounter = () => {
        const stepsLength = props.steps.length;
        const popupDefaultCounter = (
          <div class={`${COMPONENT_NAME.value}__counter`}>
            <span>
              {innerCurrent.value + 1}/{stepsLength}
            </span>
          </div>
        );
        const dialogDefaultCounter = (
          <div class={`${COMPONENT_NAME.value}__counter`}>
            {props.steps.map((_, i) => (
              <span
                class={`${COMPONENT_NAME.value}__counter--${innerCurrent.value === i ? 'active' : 'default'}`}
              ></span>
            ))}
          </div>
        );
        return <>{!hideCounter.value && (isPopup.value ? popupDefaultCounter : dialogDefaultCounter)}</>;
      };

      const renderAction = (mode: TdGuideProps['mode']) => {
        const stepsLength = props.steps.length;
        const isLast = innerCurrent.value === stepsLength - 1;
        const isFirst = innerCurrent.value === 0;
        const buttonSize = mode === 'popup' ? 'small' : 'medium';
        return (
          <div class={`${COMPONENT_NAME.value}__action`}>
            {!hideSkip.value && !isLast && (
              <Button
                class={`${COMPONENT_NAME.value}__skip`}
                theme="default"
                size={buttonSize}
                variant="base"
                onClick={handleSkip}
                {...(getCurrentCrossProps('skipButtonProps') as TdButtonProps)}
              />
            )}
            {!hidePrev.value && !isFirst && (
              <Button
                class={`${COMPONENT_NAME.value}__prev`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handlePrev}
                {...(getCurrentCrossProps('prevButtonProps') as TdButtonProps)}
              />
            )}
            {!isLast && (
              <Button
                class={`${COMPONENT_NAME.value}__next`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handleNext}
                {...(getCurrentCrossProps('nextButtonProps') as TdButtonProps)}
              />
            )}
            {isLast && (
              <Button
                class={`${COMPONENT_NAME.value}__finish`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handleFinish}
                {...(props.finishButtonProps as TdButtonProps)}
              />
            )}
          </div>
        );
      };

      const renderTooltipBody = () => {
        const title = <div class={`${COMPONENT_NAME.value}__title`}>{currentStepInfo.value.title}</div>;
        const desc = <div class={`${COMPONENT_NAME.value}__desc`}>{currentStepInfo.value.description}</div>;
        return (
          <>
            {title}
            {desc}
          </>
        );
      };

      const renderPopupContent = () => {
        const action = (
          <div class={`${COMPONENT_NAME.value}__footer--popup`}>
            {renderCounter()}
            {renderAction('popup')}
          </div>
        );

        return (
          <div class={`${COMPONENT_NAME.value}__tooltip`}>
            {renderTooltipBody()}
            {action}
          </div>
        );
      };

      const renderReferenceLayer = () => (
        <Popup
          visible={true}
          v-slots={{ content: renderPopupContent }}
          show-arrow
          zIndex={tooltipZIndex}
          overlayInnerClassName={currentStepInfo.value.stepOverlayClass}
          placement={currentStepInfo.value.placement}
        >
          <div ref={referenceLayerRef} v-transfer-dom="body" class={`${COMPONENT_NAME.value}__reference`} />
        </Popup>
      );

      const renderPopupGuide = () => {
        return (
          <>
            {renderOverlayLayer()}
            {renderHighlightLayer()}
            {renderReferenceLayer()}
          </>
        );
      };

      const renderDialogGuide = () => {
        // todo 类型 infer
        return (
          <Dialog
            ref={dialogRef}
            visible={true}
            showOverlay={getCurrentCrossProps('mask') as boolean}
            footer={false}
            closeBtn={false}
            zIndex={tooltipZIndex}
            placement={currentStepInfo.value.placement as StepDialogPlacement}
          >
            {renderTooltipBody()}
            <div class={`${COMPONENT_NAME.value}__footer--dialog`}>
              {renderCounter()}
              {renderAction('dialog')}
            </div>
          </Dialog>
        );
      };

      return actived.value && (getCurrentCrossProps('mode') === 'popup' ? renderPopupGuide() : renderDialogGuide());
    };
  },
});
