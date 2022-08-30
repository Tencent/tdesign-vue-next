import { defineComponent, computed, nextTick, onMounted, ref, toRefs, watch } from 'vue';

import props from './props';

import { TdGuideProps, CrossProps } from './type';
import { defaultCrossProps } from './const';
import {
  setStyle,
  scrollToParentVisibleArea,
  getRelativePosition,
  getTargetElm,
  scrollTo,
  isFixed,
  getWindowScroll,
  removeElm,
} from './utils';

import TransferDom from '../utils/transfer-dom';
import { addClass, removeClass } from '../utils/dom';

import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';

import Button from '../button';
import Popup from '../popup';

export default defineComponent({
  name: 'TGuide',
  directives: { TransferDom },
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('guide');
    const LOCK_CLASS = usePrefixClass('guide--lock');

    const { current, modelValue, hideCounter, hidePrev, hideSkip, steps, zIndex } = toRefs(props);
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
    // dialog wrapper ref
    const dialogWrapperRef = ref<HTMLElement>();
    // dialog ref
    const dialogTooltipRef = ref<HTMLElement>();
    // 是否开始展示
    const actived = ref<boolean>(false);
    // 步骤总数
    const stepsTotal = computed(() => steps.value.length);
    // 当前步骤的信息
    const currentStepInfo = computed(() => steps.value[innerCurrent.value]);
    // 当前是否为 popup
    const isPopup = computed(() => getCurrentCrossProps('mode') === 'popup');
    // 当前元素位置状态
    const currentElmIsFixed = computed(() => isFixed(currentHighlightLayerElm.value || document.body));
    // 获取当前步骤的所有属性 用户当前步骤设置 > 用户全局设置的 > 默认值
    const getCurrentCrossProps = <Key extends keyof CrossProps>(propsName: Key) =>
      currentStepInfo.value[propsName] ?? props[propsName] ?? defaultCrossProps[propsName];

    // 设置高亮层的位置
    const setHighlightLayerPosition = (highlighLayer: HTMLElement) => {
      let { top, left } = getRelativePosition(nextHighlightLayerElm.value, currentHighlightLayerElm.value);
      const { width, height } = nextHighlightLayerElm.value.getBoundingClientRect();

      if (!isPopup.value) {
        const { scrollTop, scrollLeft } = getWindowScroll();
        top += scrollTop;
        left += scrollLeft;
      }

      const highlightPadding = getCurrentCrossProps('highlightPadding');
      setStyle(highlighLayer, {
        width: `${width + highlightPadding * 2}px`,
        height: `${height + highlightPadding * 2}px`,
        top: `${top - highlightPadding}px`,
        left: `${left - highlightPadding}px`,
      });
    };

    const showPopupGuide = () => {
      const currentElement = getTargetElm(currentStepInfo.value.element);
      nextHighlightLayerElm.value = currentElement;

      nextTick(() => {
        scrollToParentVisibleArea(nextHighlightLayerElm.value);
        setHighlightLayerPosition(highlightLayerRef.value);
        setHighlightLayerPosition(referenceLayerRef.value);
        scrollTo(nextHighlightLayerElm.value);
        currentHighlightLayerElm.value = currentElement;
      });
    };

    const destroyTooltipElm = () => {
      removeElm(referenceLayerRef.value);
    };

    const showDialogGuide = () => {
      nextTick(() => {
        const currentElement = dialogTooltipRef.value;
        nextHighlightLayerElm.value = currentElement;
        scrollToParentVisibleArea(nextHighlightLayerElm.value);
        setHighlightLayerPosition(highlightLayerRef.value);
        scrollTo(nextHighlightLayerElm.value);
        currentHighlightLayerElm.value = currentElement;
      });
    };

    const destroyDialogTooltipElm = () => {
      removeElm(dialogTooltipRef.value);
      removeElm(dialogWrapperRef.value);
    };

    const showGuide = () => {
      if (isPopup.value) {
        destroyDialogTooltipElm();
        showPopupGuide();
      } else {
        destroyTooltipElm();
        showDialogGuide();
      }
    };

    const destroyGuide = () => {
      destroyTooltipElm();
      destroyDialogTooltipElm();
      removeElm(highlightLayerRef.value);
      removeElm(overlayLayerRef.value);
      removeClass(document.body, LOCK_CLASS.value);
    };

    const handleSkip = (e: MouseEvent) => {
      actived.value = false;
      setInnerCurrent(-1, stepsTotal.value - 1, { e });
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
      props.onFinish?.(-1, stepsTotal.value - 1, { e });
    };

    const initGuide = () => {
      if (innerCurrent.value >= 0 && innerCurrent.value < steps.value.length) {
        if (!actived.value) {
          actived.value = true;
          addClass(document.body, LOCK_CLASS.value);
        }
        showGuide();
      }
    };

    watch(innerCurrent, (val) => {
      if (val >= 0 && val < steps.value.length) {
        initGuide();
      } else {
        actived.value = false;
        destroyGuide();
      }
    });

    onMounted(() => {
      initGuide();
    });

    return () => {
      const renderOverlayLayer = () => (
        <div
          ref={overlayLayerRef}
          v-transfer-dom="body"
          class={`${COMPONENT_NAME.value}__overlay`}
          style={{ zIndex: zIndex.value - 2 }}
        />
      );

      const renderHighlightLayer = () => {
        const style = { zIndex: zIndex.value - 1 };
        const highlightClass = [
          `${COMPONENT_NAME.value}__highlight`,
          `${COMPONENT_NAME.value}__highlight--${isPopup.value ? 'popup' : 'dialog'}`,
          `${COMPONENT_NAME.value}--${currentElmIsFixed.value && isPopup.value ? 'fixed' : 'absolute'}`,
        ];
        const showOverlay = getCurrentCrossProps('showOverlay');
        const classes = [...highlightClass, `${COMPONENT_NAME.value}__highlight--${showOverlay ? 'mask' : 'nomask'}`];
        const { highlightContent } = currentStepInfo.value;

        return highlightContent ? (
          <div ref={highlightLayerRef} v-transfer-dom="body" class={highlightClass} style={style}>
            <highlightContent class={classes} style={style} />
          </div>
        ) : (
          <div ref={highlightLayerRef} v-transfer-dom="body" class={classes} style={style} />
        );
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
        return <>{!hideCounter.value && popupDefaultCounter}</>;
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
        const footerClasses = [`${COMPONENT_NAME.value}__footer`, `${COMPONENT_NAME.value}__footer--popup`];
        const action = (
          <div class={footerClasses}>
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

      const renderPopupGuide = () => {
        const { content } = currentStepInfo.value;
        let renderBody;
        if (content) {
          const contentProps = {
            handlePrev,
            handleNext,
            handleSkip,
            handleFinish,
            current: innerCurrent.value,
            total: stepsTotal.value,
          };
          renderBody = () => <content {...contentProps} />;
        } else {
          renderBody = renderPopupContent;
        }

        const classes = [
          `${COMPONENT_NAME.value}__reference`,
          `${COMPONENT_NAME.value}--${currentElmIsFixed.value ? 'fixed' : 'absolute'}`,
        ];

        return (
          <Popup
            visible={true}
            v-slots={{ content: renderBody }}
            show-arrow={!content}
            zIndex={zIndex.value}
            overlayClassName={currentStepInfo.value.stepOverlayClass}
            overlayInnerClassName={{ [`${COMPONENT_NAME.value}__popup--content`]: !!content }}
            placement={currentStepInfo.value.placement}
          >
            <div ref={referenceLayerRef} v-transfer-dom="body" class={classes} />
          </Popup>
        );
      };

      const renderDialogGuide = () => {
        const style = { zIndex: zIndex.value };
        const wrapperClasses = [
          `${COMPONENT_NAME.value}__wrapper`,
          { [`${COMPONENT_NAME.value}__wrapper--center`]: currentStepInfo.value.placement === 'center' },
        ];
        const dialogClasses = [
          `${COMPONENT_NAME.value}__reference`,
          `${COMPONENT_NAME.value}--absolute`,
          `${COMPONENT_NAME.value}__dialog`,
          {
            [`${COMPONENT_NAME.value}__dialog--nomask`]: !getCurrentCrossProps('showOverlay'),
            [currentStepInfo.value.stepOverlayClass]: !!currentStepInfo.value.stepOverlayClass,
          },
        ];
        const footerClasses = [`${COMPONENT_NAME.value}__footer`, `${COMPONENT_NAME.value}__footer--popup`];
        return (
          <>
            <div ref={dialogWrapperRef} v-transfer-dom="body" class={wrapperClasses} style={style}>
              <div ref={dialogTooltipRef} class={dialogClasses}>
                {renderTooltipBody()}
                <div class={footerClasses}>
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
