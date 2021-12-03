import { defineComponent, ComponentPublicInstance } from 'vue';
import { prefix } from '../config';
import TPopup from '../popup/index';

const name = `${prefix}-slider-button`;

export default defineComponent({
  name,
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
  data() {
    return {
      hovering: false,
      dragging: false,
      isClick: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      startPos: 0,
      newPos: null,
      prevValue: this.value,
      showTooltip: true,
      trigger: 'hover',
      showArrow: true,
      overlayStyle: undefined,
      overlayClassName: undefined,
      attach: 'body',
    };
  },

  computed: {
    placement() {
      if (this.tooltipProps instanceof Object) {
        const { placement } = this.tooltipProps;
        if (placement) return placement;
      }

      return this.vertical ? 'right' : 'top';
    },
    rangeDiff() {
      return this.max - this.min;
    },
    formatValue() {
      return (this.enableFormat && this.$parent.formatpopup(this.value)) || this.value;
    },
    disabled() {
      return this.$parent.disabled;
    },
    max() {
      return this.$parent.max;
    },
    min() {
      return this.$parent.min;
    },
    step() {
      return this.$parent.step;
    },
    precision() {
      return this.$parent.precision;
    },
    currentPos() {
      return `${((this.value - this.min) / this.rangeDiff) * 100}%`;
    },
    enableFormat() {
      return this.$parent.formatpopup instanceof Function;
    },
    wrapperStyle() {
      return this.vertical ? { bottom: this.currentPos } : { left: this.currentPos };
    },
  },
  watch: {
    dragging(val) {
      this.$parent.dragging = val;
    },
  },
  mounted() {
    this.showTooltip = !this.tooltipProps === false;
    this.setTooltipProps();
  },
  methods: {
    setTooltipProps() {
      if (this.tooltipProps instanceof Object) {
        const { trigger, destroyOnHide, showArrow, overlayStyle, overlayClassName, attach } = this.tooltipProps;
        if (!this.empty(trigger)) {
          this.trigger = trigger;
        }
        this.destroyOnHide = destroyOnHide;
        if (!this.empty(showArrow)) {
          this.showArrow = showArrow;
        }

        this.overlayStyle = overlayStyle;
        this.overlayClassName = overlayClassName;
        if (!this.empty(attach)) {
          this.attach = attach;
        }
      }
    },
    operatePopup(state: boolean) {
      if (this.$refs.popup) {
        (this.$refs.popup as ComponentPublicInstance).showPopper = state;
      }
    },
    showPopup() {
      this.operatePopup(true);
    },
    hidePopup() {
      this.operatePopup(false);
    },

    handleMouseEnter() {
      this.hovering = true;
      (this.$refs.button as ComponentPublicInstance).focus();
      this.showPopup();
    },
    handleMouseLeave() {
      this.hovering = false;
      this.hidePopup();
    },
    onButtonDown(event: MouseEvent | TouchEvent) {
      if (this.disabled) {
        return;
      }
      event.preventDefault();
      this.onDragStart(event);
      window.addEventListener('mousemove', this.onDragging);
      window.addEventListener('mouseup', this.onDragEnd);
      window.addEventListener('touchmove', this.onDragging);
      window.addEventListener('touchend', this.onDragEnd);
      window.addEventListener('contextmenu', this.onDragEnd);
    },
    onNativeKeyDown(e: KeyboardEvent) {
      const { code } = e;
      e.preventDefault();
      if (code === 'ArrowDown' || code === 'ArrowLeft') {
        this.onKeyDown('sub');
      }
      if (code === 'ArrowUp' || code === 'ArrowRight') {
        this.onKeyDown('add');
      }
    },
    onKeyDown(state: 'sub' | 'add') {
      if (this.disabled) {
        return;
      }
      let stepLength = (this.step / this.rangeDiff) * 100;
      if (state === 'sub') {
        stepLength = -stepLength;
      }
      this.newPos = parseFloat(this.currentPos) + stepLength;
      this.setPosition(this.newPos);
      // this.$parent.emitChange(parseInt(this.newPos));
    },
    onDragStart(event: MouseEvent | TouchEvent) {
      this.dragging = true;
      this.isClick = true;
      const { type } = event;
      let { clientY, clientX } = event as MouseEvent;
      if (type === 'touchstart') {
        const touch = (event as TouchEvent).touches;
        [clientY, clientX] = [touch[0].clientY, touch[0].clientX];
      }
      if (this.vertical) {
        this.startY = clientY;
      } else {
        this.startX = clientX;
      }
      this.startPos = parseFloat(this.currentPos);
      this.newPos = this.startPos;
    },
    onDragging(e: MouseEvent | TouchEvent) {
      const event = e;
      if (!this.dragging) {
        return;
      }
      this.isClick = false;
      this.showPopup();
      this.$parent.resetSize();
      let diff = 0;

      const parentSliderSize = this.$parent.sliderSize;
      if (this.vertical) {
        this.currentY = (event as MouseEvent).clientY;
        diff = this.startY - this.currentY;
      } else {
        this.currentX = (event as MouseEvent).clientX;
        diff = this.currentX - this.startX;
      }

      if (event.type === 'touchmove') {
        const touch = (event as TouchEvent).touches;
        const [clientY, clientX] = [touch[0].clientY, touch[0].clientX];
        this.clientY = clientY;
        this.clientX = clientX;
      }

      diff = (diff / parentSliderSize) * 100;
      this.newPos = this.startPos + diff;
      this.setPosition(this.newPos);
    },
    onDragEnd() {
      if (this.dragging) {
        setTimeout(() => {
          this.dragging = false;
          this.hidePopup();
          if (!this.isClick) {
            this.setPosition(this.newPos);
            // this.$parent.emitChange(parseInt(this.newPos));
          }
        }, 0);
        window.removeEventListener('mousemove', this.onDragging);
        window.removeEventListener('touchmove', this.onDragging);
        window.removeEventListener('mouseup', this.onDragEnd);
        window.removeEventListener('touchend', this.onDragEnd);
        window.removeEventListener('contextmenu', this.onDragEnd);
      }
    },
    setPosition(pos: number) {
      let newPos = pos;
      if (newPos === null || Number.isNaN(newPos)) {
        return;
      }

      if (newPos > 100) {
        newPos = 100;
      } else if (newPos < 0) {
        newPos = 0;
      }
      const perStepLen = (100 * this.step) / this.rangeDiff;
      const steps = Math.round(newPos / perStepLen);
      let value = steps * perStepLen * this.rangeDiff * 0.01;
      value += this.min;
      value = Number(parseFloat(`${value}`).toFixed(this.precision));
      this.$emit('input', value);
      this.$nextTick(() => {
        this.showPopup();
        this.$refs.popup && (this.$refs.popup as ComponentPublicInstance).updatePopper();
      });
      if (!this.dragging && this.value !== this.prevValue) {
        this.prevValue = this.value;
      }
    },
    empty(str: undefined | null | string) {
      return str === undefined || str === null;
    },
  },
  render() {
    return (
      <div
        ref="button"
        class={[{ hover: this.hovering, dragging: this.dragging }, 't-slider__button-wrapper']}
        style={this.wrapperStyle}
        tabindex="0"
        show-tooltip={this.showTooltip}
        disabled={this.disabled}
        onmouseenter={this.handleMouseEnter}
        onmouseleave={this.handleMouseLeave}
        onmousedown={this.onButtonDown}
        ontouchstart={this.onButtonDown}
        onfocus={this.handleMouseEnter}
        onblur={this.handleMouseLeave}
        onKeydown={this.onNativeKeyDown}
      >
        <t-popup
          ref="popup"
          popper-class={this.popupClass}
          disabled={!this.showTooltip}
          content={String(this.formatValue)}
          placement={this.placement}
          trigger={this.trigger}
          showArrow={this.showArrow}
          overlayStyle={this.overlayStyle}
          overlayClassName={this.overlayClassName}
          attach={this.attach}
        >
          <div class={['t-slider__button', { hover: this.hovering, dragging: this.dragging }]} />
        </t-popup>
      </div>
    );
  },
});
