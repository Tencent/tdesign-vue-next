import { defineComponent, computed, nextTick, onMounted, ref, toRefs, watch, h } from 'vue';
import isFunction from 'lodash/isFunction';
import props from './props';
import { GuideCrossProps } from './interface';
import { TdGuideProps, GuideStep } from './type';
import { scrollToParentVisibleArea, getRelativePosition, getTargetElm, scrollToElm } from './utils';
import setStyle from '../_common/js/utils/set-style';
import TransferDom from '../utils/transfer-dom';
import { addClass, removeClass, isFixed, getWindowScroll } from '../utils/dom';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass, useConfig } from '../hooks/useConfig';
import Button from '../button';
import Popup, { PopupProps } from '../popup';

export default defineComponent({
  name: 'TGuide',
  directives: { TransferDom },
  props,
  setup(props: TdGuideProps, context) {
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('guide');
    const LOCK_CLASS = usePrefixClass('guide--lock');
    const { globalConfig, classPrefix } = useConfig('guide');

    const { current, modelValue, hideCounter, hidePrev, hideSkip, steps, zIndex } = toRefs(props);
    const [innerCurrent, setInnerCurrent] = useVModel(
      current,
      modelValue,
      props.defaultCurrent,
      props.onChange,
      'current',
    );

    // 覆盖层，用于覆盖所有元素
    const overlayLayerRef = ref<HTMLElement>();
    // 高亮层，用于高亮元素
    const highlightLayerRef = ref<HTMLElement>();
    // 提示层，用于高亮元素
    const referenceLayerRef = ref<HTMLElement>();
    // 当前高亮的元素
    const currentHighlightLayerElm = ref<HTMLElement>();
    // dialog wrapper ref
    const dialogWrapperRef = ref<HTMLElement>();
    // dialog ref
    const dialogTooltipRef = ref<HTMLElement>();
    // 是否开始展示
    const actived = ref<boolean>(false);
    // 步骤总数
    const stepsTotal = computed(() => steps.value.length);
    // 当前步骤的信息
    const currentStepInfo = computed<GuideStep>(() => steps.value[innerCurrent.value]);
    // 当前是否为 popup
    const isPopup = computed(() => getCurrentCrossProps('mode') === 'popup');
    // 当前元素位置状态
    const currentElmIsFixed = computed(() => isFixed(currentHighlightLayerElm.value || document.body));
    // 获取当前步骤的属性值 用户当前步骤设置 > 用户组件设置的
    const getCurrentCrossProps = <Key extends keyof GuideCrossProps>(propsName: Key) =>
      currentStepInfo.value[propsName] ?? props[propsName];

    // 设置高亮层的位置
    const setHighlightLayerPosition = (highlighLayer: HTMLElement) => {
      // 这里预留了一个相对元素的功能，暂未使用，也是这里导致了 fix #2111
      let { top, left } = getRelativePosition(currentHighlightLayerElm.value);
      let { width, height } = currentHighlightLayerElm.value.getBoundingClientRect();
      const highlightPadding = getCurrentCrossProps('highlightPadding');

      if (isPopup.value) {
        width += highlightPadding * 2;
        height += highlightPadding * 2;
        top -= highlightPadding;
        left -= highlightPadding;
      } else {
        const { scrollTop, scrollLeft } = getWindowScroll();
        top += scrollTop;
        left += scrollLeft;
      }

      setStyle(highlighLayer, {
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`,
      });
    };

    const showPopupGuide = () => {
      nextTick(() => {
        currentHighlightLayerElm.value = getTargetElm(currentStepInfo.value.element);
        if (!currentHighlightLayerElm.value) return;
        scrollToParentVisibleArea(currentHighlightLayerElm.value);
        setHighlightLayerPosition(highlightLayerRef.value);
        setHighlightLayerPosition(referenceLayerRef.value);
        scrollToElm(currentHighlightLayerElm.value);
      });
    };

    const destroyTooltipElm = () => {
      referenceLayerRef.value?.parentNode.removeChild(referenceLayerRef.value);
    };

    const showDialogGuide = () => {
      nextTick(() => {
        currentHighlightLayerElm.value = dialogTooltipRef.value;
        scrollToParentVisibleArea(currentHighlightLayerElm.value);
        setHighlightLayerPosition(highlightLayerRef.value);
        scrollToElm(currentHighlightLayerElm.value);
      });
    };

    const destroyDialogTooltipElm = () => {
      dialogTooltipRef.value?.parentNode.removeChild(dialogTooltipRef.value);
      dialogWrapperRef.value?.parentNode.removeChild(dialogWrapperRef.value);
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
      highlightLayerRef.value?.parentNode.removeChild(highlightLayerRef.value);
      overlayLayerRef.value?.parentNode.removeChild(overlayLayerRef.value);
      removeClass(document.body, LOCK_CLASS.value);
    };

    const handleSkip = (e: MouseEvent) => {
      const total = stepsTotal.value;
      actived.value = false;
      setInnerCurrent(-1, { e, total });
      props.onSkip?.({ e, current: innerCurrent.value, total });
    };

    const handlePrev = (e: MouseEvent) => {
      const total = stepsTotal.value;
      setInnerCurrent(innerCurrent.value - 1, { e, total });
      props.onPrevStepClick?.({
        e,
        prev: innerCurrent.value - 1,
        current: innerCurrent.value,
        total,
      });
    };

    const handleNext = (e: MouseEvent) => {
      const total = stepsTotal.value;
      setInnerCurrent(innerCurrent.value + 1, { e, total });
      props.onNextStepClick?.({
        e,
        next: innerCurrent.value + 1,
        current: innerCurrent.value,
        total,
      });
    };

    const handleFinish = (e: MouseEvent) => {
      const total = stepsTotal.value;
      actived.value = false;
      setInnerCurrent(-1, { e, total });
      props.onFinish?.({ e, current: innerCurrent.value, total });
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

      const getHighlightContent = () => {
        const params: any = h;
        params.currentStepInfo = currentStepInfo.value;
        const { highlightContent } = currentStepInfo.value;
        // 支持组件/字符串等
        let node: any = highlightContent;
        // 支持函数
        if (isFunction(highlightContent)) {
          node = highlightContent(params);
        }
        // 支持插槽
        if (context.slots.highlightContent) {
          node = context.slots.highlightContent(params);
        }
        if (context.slots['highlight-content']) {
          node = context.slots['highlight-content'](params);
        }
        // 给自定义元素添加类名
        if (node?.props) {
          node.props.class = `t-guide__highlight t-guide__highlight--mask ${node.props.class || ''}`;
        }
        return node;
      };

      const renderHighlightLayer = () => {
        const style = { zIndex: zIndex.value - 1 };
        const highlightClass = [
          `${COMPONENT_NAME.value}__highlight`,
          `${COMPONENT_NAME.value}__highlight--${isPopup.value ? 'popup' : 'dialog'}`,
          `${COMPONENT_NAME.value}--${currentElmIsFixed.value && isPopup.value ? 'fixed' : 'absolute'}`,
        ];
        const showOverlay = getCurrentCrossProps('showOverlay');
        const maskClass = [`${COMPONENT_NAME.value}__highlight--${showOverlay ? 'mask' : 'nomask'}`];
        const innerHighlightContent = getHighlightContent();
        const showHighlightContent = Boolean(innerHighlightContent && isPopup.value);

        return (
          <div
            ref={highlightLayerRef}
            v-transfer-dom="body"
            class={highlightClass.concat(showHighlightContent ? highlightClass : maskClass)}
            style={style}
          >
            {showHighlightContent && innerHighlightContent}
          </div>
        );
      };

      const renderCounter = () => {
        const popupSlotCounter = renderTNodeJSX('counter', {
          params: { total: stepsTotal.value, current: innerCurrent.value },
        });

        const popupDefaultCounter = (
          <div class={`${COMPONENT_NAME.value}__counter`}>
            {popupSlotCounter || `${innerCurrent.value + 1}/${stepsTotal.value}`}
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
                {...(getCurrentCrossProps('skipButtonProps') ?? globalConfig.value.skipButtonProps)}
              />
            )}
            {!hidePrev.value && !isFirst && (
              <Button
                class={`${COMPONENT_NAME.value}__prev`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handlePrev}
                {...(getCurrentCrossProps('prevButtonProps') ?? globalConfig.value.prevButtonProps)}
              />
            )}
            {!isLast && (
              <Button
                class={`${COMPONENT_NAME.value}__next`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handleNext}
                {...(getCurrentCrossProps('nextButtonProps') ?? globalConfig.value.nextButtonProps)}
              />
            )}
            {isLast && (
              <Button
                class={`${COMPONENT_NAME.value}__finish`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handleFinish}
                {...(props.finishButtonProps ?? globalConfig.value.finishButtonProps)}
              />
            )}
          </div>
        );
      };

      const renderTitle = () => {
        const functionTitle = isFunction(currentStepInfo.value.title) ? currentStepInfo.value.title() : undefined;
        const slotTitle = context.slots.title ? context.slots.title(h) : undefined;
        const params: any = h;
        params.currentStepInfo = currentStepInfo.value;
        return functionTitle || slotTitle || currentStepInfo.value.title;
      };

      const renderTooltipBody = () => {
        const title = <div class={`${COMPONENT_NAME.value}__title`}>{renderTitle()}</div>;
        let descBody: any = currentStepInfo.value.body;
        if (isFunction(descBody)) {
          descBody = descBody();
        } else {
          if (context.slots.body) {
            descBody = context.slots.body({ currentStepInfo: currentStepInfo.value });
          }
        }
        const desc = <div class={`${COMPONENT_NAME.value}__desc`}>{descBody}</div>;

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
        const contentProps = {
          handlePrev,
          handleNext,
          handleSkip,
          handleFinish,
          current: innerCurrent.value,
          total: stepsTotal.value,
        };
        const params: any = h;
        Object.assign(params, contentProps);
        let renderBody;
        if (isFunction(content)) {
          renderBody = () => content(params);
        } else if (context.slots.content) {
          renderBody = () => context.slots.content(params);
        } else if (content) {
          renderBody = () => <content {...contentProps} />;
        } else {
          renderBody = renderPopupContent;
        }
        const classes = [
          `${COMPONENT_NAME.value}__reference`,
          `${COMPONENT_NAME.value}--${currentElmIsFixed.value ? 'fixed' : 'absolute'}`,
        ];

        const innerClassName: PopupProps['overlayInnerClassName'] = [
          {
            [`${classPrefix.value}-guide__popup--content`]: !!content,
          },
        ];
        return (
          <Popup
            visible={true}
            show-arrow={!content}
            zIndex={zIndex.value}
            placement={currentStepInfo.value.placement}
            {...currentStepInfo.value.popupProps}
            content={renderBody}
            overlayClassName={currentStepInfo.value.stepOverlayClass}
            overlayInnerClassName={innerClassName.concat(currentStepInfo.value.popupProps?.overlayInnerClassName)}
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
