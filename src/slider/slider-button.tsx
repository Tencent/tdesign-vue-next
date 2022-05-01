import { defineComponent, ComponentPublicInstance, ref, computed, reactive, nextTick, watchEffect, inject } from 'vue';
import TPopup from '../popup/index';
import { TdSliderProps } from './type';

import { usePrefixClass } from '../hooks/useConfig';
import { useSliderPopup } from './hooks/useSliderPopup';
import { sliderPropsInjectKey } from './util/constants';

export default defineComponent({
  name: 'TSliderButton',
  components: {
    TPopup,
  },
  props: {
    value: {
      type: [Number],
      default: 0,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    popupClass: {
      type: String,
      default: '',
    },
    tooltipProps: {
      type: [Boolean, Object],
      default: true,
    },
  },
  emits: ['input'],
  setup(props, ctx) {
    const COMPONENT_NAME = usePrefixClass('slider__button');
    const { popupRef, popupProps, togglePopup, showTooltip, placement } = useSliderPopup(
      props.tooltipProps,
      props.vertical,
    );

    const parentProps = inject(sliderPropsInjectKey);
    const buttonRef = ref();

    /** --------------------- slide button 相关状态start ------------------- */
    const slideButtonProps = reactive({
      dragging: false,
      isClick: false,
      startX: 0,
      startY: 0,
      startPos: 0,
      newPos: null,
    });

    const rangeDiff = computed(() => {
      return Number(parentProps.max) - Number(parentProps.min);
    });

    const currentPos = computed(() => {
      return `${((props.value - parentProps.min) / rangeDiff.value) * 100}%`;
    });

    const step = computed(() => {
      return parentProps.step;
    });

    const wrapperStyle = computed(() => {
      return props.vertical ? { bottom: currentPos.value } : { left: currentPos.value };
    });

    watchEffect(() => {
      parentProps.toggleDragging(slideButtonProps.dragging);
    });
    /** --------------------- slide button 相关状态end ------------------- */

    /** --------------------- slide button 相关事件start ------------------- */
    /** 设置当前位置 */
    const setPosition = (pos: number) => {
      let newPos = pos;
      if (newPos === null || Number.isNaN(newPos)) {
        return;
      }

      if (newPos > 100) {
        newPos = 100;
      } else if (newPos < 0) {
        newPos = 0;
      }
      const perStepLen = (100 * step.value) / rangeDiff.value;
      const steps = Math.round(newPos / perStepLen);
      let value = steps * perStepLen * rangeDiff.value * 0.01;
      value += parentProps.min;
      value = Number(parseFloat(`${value}`).toFixed(parentProps.precision.value));
      ctx.emit('input', value);
      nextTick(() => {
<<<<<<< HEAD
        popupRef.value && popupRef.value.updatePopper?.();
=======
        popupRef.value && (popupRef.value as ComponentPublicInstance)?.updatePopper?.();
>>>>>>> fix(slider): 修复Slider部分属性丢失响应性问题
      });
    };

    const handleMouseEnter = () => {
      (buttonRef.value as ComponentPublicInstance).focus();
      togglePopup(true);
    };
    const handleMouseLeave = () => {
      if (!slideButtonProps.dragging) {
        togglePopup(false);
      }
    };

    const onDragStart = (event: MouseEvent | TouchEvent) => {
      slideButtonProps.dragging = true;
      slideButtonProps.isClick = true;
      const { type } = event;
      let { clientY, clientX } = event as MouseEvent;
      if (type === 'touchstart') {
        const touch = (event as TouchEvent).touches;
        [clientY, clientX] = [touch[0].clientY, touch[0].clientX];
      }
      if (props.vertical) {
        slideButtonProps.startY = clientY;
      } else {
        slideButtonProps.startX = clientX;
      }
      slideButtonProps.startPos = parseFloat(currentPos.value);
      slideButtonProps.newPos = slideButtonProps.startPos;
    };

    const onDragging = (e: MouseEvent | TouchEvent) => {
      const event = e;
      if (!slideButtonProps.dragging) {
        return;
      }
      slideButtonProps.isClick = false;
      if (parentProps?.resetSize && typeof parentProps?.resetSize === 'function') {
        parentProps.resetSize();
      }
      let diff = 0;
      const parentSliderSize = parentProps.sliderSize.value;
      if (props.vertical) {
        diff = slideButtonProps.startY - (event as MouseEvent).clientY;
      } else {
        diff = (event as MouseEvent).clientX - slideButtonProps.startX;
      }
      diff = (diff / parentSliderSize) * 100;
      slideButtonProps.newPos = slideButtonProps.startPos + diff;
      setPosition(slideButtonProps.newPos);
    };

    const onDragEnd = () => {
      if (slideButtonProps.dragging) {
        setTimeout(() => {
          slideButtonProps.dragging = false;
          togglePopup(false);
          if (!slideButtonProps.isClick) {
            setPosition(slideButtonProps.newPos);
          }
        }, 0);
        window.removeEventListener('mousemove', onDragging);
        window.removeEventListener('touchmove', onDragging);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('touchend', onDragEnd);
        window.removeEventListener('contextmenu', onDragEnd);
      }
    };

    function onButtonDown(event: MouseEvent | TouchEvent) {
      if (parentProps.disabled.value) {
        return;
      }
      event.preventDefault();
      onDragStart(event);
      window.addEventListener('mousemove', onDragging);
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchmove', onDragging);
      window.addEventListener('touchend', onDragEnd);
      window.addEventListener('contextmenu', onDragEnd);
    }

    const onKeyDown = (state: 'sub' | 'add') => {
      if (parentProps.disabled.value) {
        return;
      }
      let stepLength = (step.value / rangeDiff.value) * 100;
      if (state === 'sub') {
        stepLength = -stepLength;
      }
      slideButtonProps.newPos = parseFloat(currentPos.value) + stepLength;
      setPosition(slideButtonProps.newPos);
    };

    const onNativeKeyDown = (e: KeyboardEvent) => {
      const { code } = e;
      e.preventDefault();
      if (code === 'ArrowDown' || code === 'ArrowLeft') {
        onKeyDown('sub');
      }
      if (code === 'ArrowUp' || code === 'ArrowRight') {
        onKeyDown('add');
      }
    };
    /** --------------------- slide button 相关事件end ------------------- */

    /** 暴露设置按钮坐标方法供父组件调用 */
    ctx.expose({
      setPosition,
    });

    return () => (
      <div
        ref={buttonRef}
        class={`${COMPONENT_NAME.value}-wrapper`}
        style={wrapperStyle.value}
        tabindex="0"
        show-tooltip={showTooltip.value}
        disabled={parentProps.disabled.value}
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
        onmousedown={onButtonDown}
        onTouchstart={onButtonDown}
        onfocus={handleMouseEnter}
        onblur={handleMouseLeave}
        onKeydown={onNativeKeyDown}
      >
        <t-popup
          visible={popupProps.visible}
          ref={popupRef}
          popper-class={props.popupClass}
          disabled={!showTooltip.value}
          content={String(props.value)}
          placement={placement.value}
          trigger={popupProps.trigger}
          showArrow={popupProps.showArrow}
          overlayStyle={popupProps.overlayStyle}
          overlayClassName={popupProps.overlayClassName}
          attach={popupProps.attach}
          {...(props.tooltipProps as TdSliderProps['tooltipProps'])}
        >
          <div class={[COMPONENT_NAME.value, { [`${COMPONENT_NAME.value}--dragging`]: slideButtonProps.dragging }]} />
        </t-popup>
      </div>
    );
  },
});
