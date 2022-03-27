import {
  defineComponent,
  ComponentPublicInstance,
  ref,
  PropType,
  getCurrentInstance,
  reactive,
  computed,
  nextTick,
  watchEffect,
} from 'vue';
import TPopup, { PopupProps } from '../popup/index';
import { useConfig } from '../config-provider/useConfig';
import { useSliderPopup } from './hooks/useSliderPopup';

export interface ExposeApi {
  setPosition: (num: number) => void;
}

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
      type: [Boolean, Object] as PropType<boolean | PopupProps>,
      default: true,
    },
  },
  emits: ['input'],

  setup(props, ctx) {
    const { classPrefix: prefix } = useConfig('classPrefix');
    const { popupRef, popupProps, togglePopup, showTooltip, placement } = useSliderPopup(
      props.tooltipProps,
      props.vertical,
    );

    const { proxy } = getCurrentInstance();
    const buttonRef = ref();

    /** --------------------- slide button 相关状态start ------------------- */
    // const prevValue = ref(props.value);
    const slideButtonProps = reactive({
      dragging: false,
      isClick: false,
      startX: 0,
      startY: 0,
      startPos: 0,
      newPos: null,
    });

    const rangeDiff = computed(() => {
      return Number(proxy.$parent.max) - Number(proxy.$parent.min);
    });

    const currentPos = computed(() => {
      return `${((props.value - proxy.$parent.min) / rangeDiff.value) * 100}%`;
    });

    const step = computed(() => {
      return proxy.$parent.step;
    });

    const formatValue = computed(() => {
      if (proxy.$parent.formatpopup instanceof Function && proxy.$parent.formatpopup(props.value)) {
        return proxy.$parent.formatpopup(props.value);
      }
      return props.value;
    });

    const wrapperStyle = computed(() => {
      return props.vertical ? { bottom: currentPos.value } : { left: currentPos.value };
    });

    watchEffect(() => {
      proxy.$parent.dragging = slideButtonProps.dragging;
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
      value += proxy.$parent.min;
      value = Number(parseFloat(`${value}`).toFixed(proxy.$parent.precision));
      ctx.emit('input', value);
      nextTick(() => {
        popupRef.value && (popupRef.value as ComponentPublicInstance).updatePopper();
      });
      // tips:prevValue貌似在原逻辑也是声明后没使用
      // if (!slideButtonProps.dragging && props.value !== prevValue.value) {
      //   prevValue.value = props.value;
      // }
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
      if (proxy.$parent?.resetSize && typeof proxy.$parent?.resetSize === 'function') {
        proxy.$parent.resetSize();
      }
      let diff = 0;
      const parentSliderSize = proxy.$parent.sliderSize;
      if (props.vertical) {
        diff = slideButtonProps.startY - (event as MouseEvent).clientY;
      } else {
        diff = (event as MouseEvent).clientX - slideButtonProps.startX;
      }
      // tips：this.clientX & this.clientY 没有找到有使用过的逻辑
      // if (event.type === 'touchmove') {
      //   const touch = (event as TouchEvent).touches;
      //   const [clientY, clientX] = [touch[0].clientY, touch[0].clientX];
      //   this.clientY = clientY;
      //   this.clientX = clientX;
      // }
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
            // this.$parent.emitChange(parseInt(this.newPos));
          }
        }, 0);
        window.removeEventListener('mousemove', onDragging);
        window.removeEventListener('touchmove', onDragging);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('touchend', onDragEnd);
        window.removeEventListener('contextmenu', onDragEnd);
      }
    };

    const onButtonDown = (event: MouseEvent | TouchEvent) => {
      if (proxy.$parent.disabled) {
        return;
      }
      event.preventDefault();
      onDragStart(event);
      window.addEventListener('mousemove', onDragging);
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchmove', onDragging);
      window.addEventListener('touchend', onDragEnd);
      window.addEventListener('contextmenu', onDragEnd);
    };

    const onKeyDown = (state: 'sub' | 'add') => {
      if (proxy.$parent.disabled) {
        return;
      }
      let stepLength = (step.value / rangeDiff.value) * 100;
      if (state === 'sub') {
        stepLength = -stepLength;
      }
      slideButtonProps.newPos = parseFloat(currentPos.value) + stepLength;
      setPosition(slideButtonProps.newPos);
      // this.$parent.emitChange(parseInt(this.newPos));
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

    const renderContent = () => {
      return (
        <div
          ref={buttonRef}
          class={`${prefix.value}-slider__button-wrapper`}
          style={wrapperStyle.value}
          tabindex="0"
          show-tooltip={showTooltip.value}
          disabled={proxy.$parent.disabled}
          onmouseenter={handleMouseEnter}
          onmouseleave={handleMouseLeave}
          onmousedown={onButtonDown}
          ontouchstart={onButtonDown}
          onfocus={handleMouseEnter}
          onblur={handleMouseLeave}
          onKeydown={onNativeKeyDown}
        >
          <t-popup
            visible={popupProps.visible}
            ref={popupRef}
            popper-class={props.popupClass}
            disabled={!showTooltip.value}
            content={String(formatValue.value)}
            placement={placement.value}
            trigger={popupProps.trigger}
            showArrow={popupProps.showArrow}
            overlayStyle={popupProps.overlayStyle}
            overlayClassName={popupProps.overlayClassName}
            attach={popupProps.attach}
          >
            <div
              class={[
                `${prefix.value}-slider__button`,
                { [`${prefix.value}-slider__button--dragging`]: slideButtonProps.dragging },
              ]}
            />
          </t-popup>
        </div>
      );
    };

    return {
      renderContent,
      setPosition,
    };
  },
  render() {
    return this.renderContent();
  },
});
