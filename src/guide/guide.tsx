import { computed, defineComponent, h, nextTick, onMounted, ref, toRefs, watch } from 'vue';

import props from './props';
import setStyle from './utils/setStyle';
import getScrollParent from './utils/getScrollParent';
import getOffset from './utils/getOffset';
import getTargetElm from './utils/getTargetElm';
import scrollTo from './utils/scrollTo';

import TransferDom from '../utils/transfer-dom';
import { addClass, removeClass } from '../utils/dom';

import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import useVModel from '../hooks/useVModel';

import Button, { TdButtonProps } from '../button';
import Popup from '../popup';
import Dialog from '../dialog';

import { TdGuideProps, TdGuideStepProps, CrossProps, StepDialogPlacement } from './type';
import { defalutCrossProps, tooltipZIndex } from './const';

import { GuidePopupStepContent } from './guide-step';

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
    const LOCK_CLASS = usePrefixClass('guide--lock');
    const { SIZE } = useCommonClassName();

    const { current, modelValue, hideCounter, hidePrev, hideSkip, steps } = toRefs(props);

    const [innerCurrent, setInnerCurrent] = useVModel(current, modelValue, props.defaultCurrent, props.onChange);

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
    const dialogTooltipRef = ref<HTMLElement>();
    // 是否开始展示
    const actived = ref<boolean>(false);
    // 步骤总数
    const stepsTotal = computed(() => steps.value.length);
    // 当前步骤的信息
    const currentStepInfo = computed(() => steps.value[innerCurrent.value]);

    // 获取当前步骤的所有属性 用户当前步骤设置 > 用户全局设置的 > 默认值
    const getCurrentCrossProps = <Key extends keyof CrossProps>(propsName: Key) =>
      currentStepInfo.value[propsName] ?? props[propsName] ?? defalutCrossProps[propsName];
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
      if (!isPopup.value) {
        const _scrollLeft = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft;
        const _scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        elementPosition.left += _scrollLeft;
        elementPosition.top += _scrollTop;
      }
      const highlightPadding = getCurrentCrossProps('highlightPadding');
      setStyle(highlighLayer, {
        width: `${elementPosition.width + highlightPadding}px`,
        height: `${elementPosition.height + highlightPadding}px`,
        top: `${elementPosition.top - highlightPadding / 2}px`,
        left: `${elementPosition.left - highlightPadding / 2}px`,
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
    };

    const showDialogGuide = () => {
      nextTick(() => {
        const currentElement = dialogTooltipRef.value;
        nextHighlightLayerElm.value = currentElement;
        scrollParentToElement(nextHighlightLayerElm.value);
        setHighlightLayerPosition(highlightLayerRef.value);
        scrollTo(nextHighlightLayerElm.value);
        currentHighlightLayerElm.value = currentElement;
      });
    };

    const destoryDialogTooltipElm = () => {
      dialogTooltipRef.value?.parentNode.removeChild(dialogTooltipRef.value);
    };

    const showGuide = () => {
      if (isPopup.value) {
        destoryDialogTooltipElm();
        showPopupGuide();
      } else {
        destoryTooltipElm();
        showDialogGuide();
      }
    };

    const destoryGuide = () => {
      destoryTooltipElm();
      destoryDialogTooltipElm();
      highlightLayerRef.value?.parentNode.removeChild(highlightLayerRef.value);
      overlayLayerRef.value?.parentNode.removeChild(overlayLayerRef.value);
    };

    const handleSkip = (e: MouseEvent) => {
      actived.value = false;
      setInnerCurrent(-1, stepsTotal.value - 1, { e });
      destoryGuide();
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
      destoryGuide();
      props.onFinish?.(-1, stepsTotal.value - 1, { e });
    };

    watch(innerCurrent, (val) => {
      if (val >= 0 && val < steps.value.length) {
        if (!actived.value) {
          actived.value = true;
          addClass(document.body, LOCK_CLASS.value);
        }
        showGuide();
      } else {
        actived.value = false;
        removeClass(document.body, LOCK_CLASS.value);
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

      const renderHighlightLayer = () => {
        const highlightClass = `${COMPONENT_NAME.value}__highlight`;
        const isMask = getCurrentCrossProps('mask');
        const classes = [highlightClass, `${highlightClass}--${isMask ? 'mask' : 'nomask'}`];
        return <div ref={highlightLayerRef} v-transfer-dom="body" class={classes} />;
      };

      const renderCounter = () => {
        const popupSlotCounter = renderTNodeJSX('counter', {
          params: { total: stepsTotal.value, current: innerCurrent.value },
        });

        const popupDefaultCounter = (
          <div class={`${COMPONENT_NAME.value}__counter`}>
            {popupSlotCounter || (
              <span>
                {innerCurrent.value + 1}/{stepsTotal.value}
              </span>
            )}
          </div>
        );
        const dialogDefaultCounter = (
          <div class={`${COMPONENT_NAME.value}__counter`}>
            {popupSlotCounter ||
              props.steps.map((_, i) => (
                <span
                  class={`${COMPONENT_NAME.value}__counter--${innerCurrent.value === i ? 'active' : 'default'}`}
                ></span>
              ))}
          </div>
        );
        return <>{!hideCounter.value && (isPopup.value ? popupDefaultCounter : dialogDefaultCounter)}</>;
      };

      const renderAction = (mode: TdGuideProps['mode']) => {
        const isLast = innerCurrent.value === stepsTotal.value - 1;
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
                {...getCurrentCrossProps('skipButtonProps')}
              />
            )}
            {!hidePrev.value && !isFirst && (
              <Button
                class={`${COMPONENT_NAME.value}__prev`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handlePrev}
                {...getCurrentCrossProps('prevButtonProps')}
              />
            )}
            {!isLast && (
              <Button
                class={`${COMPONENT_NAME.value}__next`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handleNext}
                {...getCurrentCrossProps('nextButtonProps')}
              />
            )}
            {isLast && (
              <Button
                class={`${COMPONENT_NAME.value}__finish`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handleFinish}
                {...props.finishButtonProps}
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

      const renderReferenceLayer = () => {
        const { content } = currentStepInfo.value;
        let renderBody;
        if (content) {
          renderBody = () => <GuidePopupStepContent content={content} />;
        } else {
          renderBody = renderPopupContent;
        }

        return (
          <Popup
            visible={true}
            v-slots={{ content: renderBody }}
            show-arrow={!content}
            zIndex={tooltipZIndex}
            overlayInnerClassName={currentStepInfo.value.stepOverlayClass}
            placement={currentStepInfo.value.placement}
          >
            <div ref={referenceLayerRef} v-transfer-dom="body" class={`${COMPONENT_NAME.value}__reference`} />
          </Popup>
        );
      };

      const renderPopupGuide = () => {
        return <>{renderReferenceLayer()}</>;
      };

      const renderDialogGuide = () => {
        const wrapperClasses = [
          `${COMPONENT_NAME.value}__wrapper`,
          { [`${COMPONENT_NAME.value}__wrapper--center`]: currentStepInfo.value.placement === 'center' },
        ];
        const dialogClasses = [
          `${COMPONENT_NAME.value}__reference`,
          `${COMPONENT_NAME.value}__dialog`,
          {
            [`${COMPONENT_NAME.value}__dialog--nomask`]: !getCurrentCrossProps('mask'),
            [currentStepInfo.value.stepOverlayClass]: !!currentStepInfo.value.stepOverlayClass,
          },
        ];
        return (
          <>
            <div v-transfer-dom="body" class={wrapperClasses}>
              <div ref={dialogTooltipRef} class={dialogClasses}>
                {renderTooltipBody()}
                <div class={`${COMPONENT_NAME.value}__footer--dialog`}>
                  {renderCounter()}
                  {renderAction('dialog')}
                </div>
              </div>
            </div>
          </>
        );
      };

      const renderGuide = () => {
        return (
          <>
            {renderOverlayLayer()}
            {renderHighlightLayer()}
            {isPopup.value ? renderPopupGuide() : renderDialogGuide()}
          </>
        );
      };

      return <>{actived.value && renderGuide()}</>;
    };
  },
});
