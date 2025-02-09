import { defineComponent, computed, nextTick, onMounted, ref, toRefs, watch, h, Teleport } from 'vue';
import { isFunction } from 'lodash-es';
import props from './props';
import { GuideCrossProps } from './interface';
import { TdGuideProps, GuideStep } from './type';
import { scrollToParentVisibleArea, getRelativePosition, getTargetElm, scrollToElm } from './utils';
import setStyle from '@tdesign/common-js/utils/setStyle';
import { addClass, removeClass, isFixed, getWindowScroll } from '../utils/dom';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass, useConfig } from '../hooks/useConfig';
import Button from '../button';
import Popup, { PopupProps } from '../popup';

export default defineComponent({
  name: 'TGuide',
  props,
  setup(props: TdGuideProps, context) {
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('guide');
    const LOCK_CLASS = usePrefixClass('guide--lock');
    const { globalConfig } = useConfig('guide');

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
    // ! popup ref 不确定这里的类型是否完全正确
    const popupTooltipRef = ref<InstanceType<typeof Popup>>();
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
    // 获取当前步骤的用户设定的高亮内容
    const currentCustomHighlightContent = computed(() => {
      const { highlightContent } = currentStepInfo.value;

      let node: any = highlightContent;
      if (isFunction(highlightContent)) {
        // 支持函数
        node = highlightContent(hWithParams());
      } else if (context.slots.highlightContent) {
        // 支持插槽
        node = context.slots.highlightContent(hWithParams());
      } else if (context.slots['highlight-content']) {
        // 支持插槽
        node = context.slots['highlight-content'](hWithParams());
      } else if (!!highlightContent) {
        // 支持组件
        node = <node />;
      }

      // 给自定义元素添加类名
      if (node) {
        if (!node.props) node.props = {};
        node.props.class = node.props.class || '';
      }
      return node;
    });

    // 是否展示高亮区域
    const showCustomHighlightContent = computed(() => Boolean(currentCustomHighlightContent.value && isPopup.value));
    //
    const popupVisible = ref(false);
    const hWithParams = (params: Record<string, any> = { currentStepInfo: currentStepInfo.value }) => {
      const newH = new Function('return ' + h.toString())();
      return Object.assign({}, newH, params);
    };

    // 设置高亮层的位置
    const setHighlightLayerPosition = (highlightLayer: HTMLElement, isReference = false) => {
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

      const style = {
        top: `${top}px`,
        left: `${left}px`,
      };

      // 展示自定义高亮
      if (showCustomHighlightContent.value) {
        // 高亮框本身不设定宽高，引用用框的宽高设定为用户自定义的宽高
        if (isReference) {
          const { width, height } = highlightLayerRef.value.getBoundingClientRect();
          Object.assign(style, {
            width: `${width}px`,
            height: `${height}px`,
          });
        } else {
          Object.assign(style, {
            width: 'auto',
            height: 'auto',
          });
        }
      } else {
        Object.assign(style, {
          width: `${width}px`,
          height: `${height}px`,
        });
      }
      setStyle(highlightLayer, style);
    };

    const showPopupGuide = () => {
      nextTick(() => {
        currentHighlightLayerElm.value = getTargetElm(currentStepInfo.value.element);
        if (!currentHighlightLayerElm.value) return;
        scrollToParentVisibleArea(currentHighlightLayerElm.value);
        setHighlightLayerPosition(highlightLayerRef.value);
        setHighlightLayerPosition(referenceLayerRef.value, true);
        scrollToElm(currentHighlightLayerElm.value);
        // fix: https://github.com/Tencent/tdesign-vue-next/issues/2536
        // 这里其实是一个临时解决方案，最合理的是 popup 内部处理
        popupTooltipRef.value?.update();
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
      popupVisible.value = true;
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
        popupVisible.value = false;
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
        <div ref={overlayLayerRef} class={`${COMPONENT_NAME.value}__overlay`} style={{ zIndex: zIndex.value - 2 }} />
      );

      const renderHighlightLayer = () => {
        const style = { zIndex: zIndex.value - 1 };
        const highlightClass = [
          `${COMPONENT_NAME.value}__highlight`,
          `${COMPONENT_NAME.value}__highlight--${isPopup.value ? 'popup' : 'dialog'}`,
          `${COMPONENT_NAME.value}--${currentElmIsFixed.value && isPopup.value ? 'fixed' : 'absolute'}`,
        ];
        const showOverlay = getCurrentCrossProps('showOverlay');
        const maskClass = [`${COMPONENT_NAME.value}__highlight--${showOverlay ? 'mask' : 'nomask'}`];

        return (
          <div ref={highlightLayerRef} class={[...highlightClass, ...maskClass]} style={style}>
            {showCustomHighlightContent.value && currentCustomHighlightContent.value}
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
                key="skip"
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
                key="prev"
                class={`${COMPONENT_NAME.value}__prev`}
                theme="default"
                size={buttonSize}
                variant="base"
                onClick={handlePrev}
                {...(getCurrentCrossProps('prevButtonProps') ?? globalConfig.value.prevButtonProps)}
              />
            )}
            {!isLast && (
              <Button
                key="next"
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
                key="finish"
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
        const slotTitle = context.slots.title ? context.slots.title(hWithParams()) : undefined;
        return functionTitle || slotTitle || currentStepInfo.value.title;
      };

      const renderTooltipBody = () => {
        const title = <div class={`${COMPONENT_NAME.value}__title`}>{renderTitle()}</div>;
        const bodyRender = currentStepInfo.value.body;

        let descBody: any;
        if (isFunction(bodyRender)) {
          descBody = bodyRender(hWithParams());
        } else if (context.slots.body) {
          descBody = context.slots.body({ currentStepInfo: currentStepInfo.value });
        } else if (typeof bodyRender === 'string') {
          descBody = bodyRender;
        } else {
          descBody = <bodyRender />;
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
        let renderBody;
        if (isFunction(content)) {
          renderBody = () => content(hWithParams(contentProps));
        } else if (context.slots.content) {
          renderBody = () => context.slots.content(hWithParams(contentProps));
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
            [`${COMPONENT_NAME.value}__popup--content`]: !!content,
          },
        ];

        return (
          <Popup
            ref={popupTooltipRef}
            visible={popupVisible.value}
            show-arrow={!content}
            zIndex={zIndex.value}
            placement={currentStepInfo.value.placement as any}
            {...currentStepInfo.value.popupProps}
            content={renderBody}
            overlayClassName={[`${COMPONENT_NAME.value}__popup`, currentStepInfo.value.stepOverlayClass]}
            overlayInnerClassName={innerClassName.concat(currentStepInfo.value.popupProps?.overlayInnerClassName)}
          >
            <div ref={referenceLayerRef} class={classes} />
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
            <div ref={dialogWrapperRef} class={wrapperClasses} style={style}>
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
            <Teleport to="body">
              {renderOverlayLayer()}
              {renderHighlightLayer()}
              {isPopup.value ? renderPopupGuide() : renderDialogGuide()}
            </Teleport>
          </>
        );
      };

      return <>{actived.value && renderGuide()}</>;
    };
  },
});
