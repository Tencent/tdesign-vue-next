import { defineComponent, VNode } from 'vue';
import { emitEvent } from '../utils/event';
import { ClassName, TNode } from '../common';
import props from './props';
import { prefix } from '../config';
import InputNumber from '../input-number/index';
import TSliderMark from './slider-mark';
import TSliderButton from './slider-button.vue';
import { SliderValue, TdSliderProps } from './type';

const name = `${prefix}-slider`;
interface MarkItem {
  point: number;
  position: number;
  mark: string | number | TNode;
}
interface SliderButtonType{
  setPosition: (param: number) => {};
}
export default defineComponent({
  name,
  components: {
    TSliderMark,
    TInputNumber: InputNumber,
    TSliderButton,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: { ...props },
  data() {
    return {
      firstValue: 0,
      secondValue: 0,
      prevValue: 0 as SliderValue,
      dragging: false,
      sliderSize: 1,
      inputDecimalPlaces: 0,
      inputFormat: null,
      inputPlaceholder: '',
      inputTheme: 'normal',
      showSteps: false,
    };
  },
  computed: {
    containerClass(): ClassName {
      return [`${name}-contianer`, { 'is-vertical': this.vertical }];
    },
    sliderClass(): ClassName {
      return [
        `${name}`,
        {
          'is-vertical': this.vertical,
          [`${name}--with-input`]: this.inputNumberProps,
          [`${name}-vertical`]: this.vertical,
          [`${prefix}-is-disabled`]: this.disabled,
        },
      ];
    },
    sliderRailClass(): ClassName {
      return [`${name}__rail`, { 'show-input': this.inputNumberProps, disabled: this.disabled }];
    },
    sliderNumberClass(): ClassName {
      return [
        `${name}__-input`,
        `${name}-input`,
        {
          'is-vertical': this.vertical,
        },
      ];
    },
    vertical(): boolean {
      return this.layout === 'vertical';
    },
    // 差值范围
    rangeDiff(): number {
      return this.max - this.min;
    },
    steps(): number[] {
      const {
        min, max, rangeDiff, step,
      } = this;
      if (!this.showSteps || min > max) return [];
      if (this.step === 0) {
        console.warn('[Element Warn][Slider]step should not be 0.');
        return [];
      }
      const stepCount = rangeDiff / step;
      const stepWidth = (100 * step) / rangeDiff;
      const result = [];
      for (let i = 1; i < stepCount; i++) {
        result.push(i * stepWidth);
      }
      if (this.range) {
        return result.filter((step) => step < (100 * (this.minValue - min)) / rangeDiff || step > (100 * (this.maxValue - min)) / rangeDiff);
      }
      return result.filter((step) => step > (100 * (this.firstValue - min)) / rangeDiff);
    },
    markList(): Array<MarkItem> {
      if (!this.marks) {
        return [];
      }
      const legalMarks: Array<MarkItem> = [];
      Object.keys(this.marks)
        .map(parseFloat)
        .sort((a, b) => a - b)
        .filter((point) => point <= this.max && point >= this.min)
        .forEach((point) => {
          const item: MarkItem = {
            point,
            position: ((point - this.min) * 100) / this.rangeDiff,
            mark: this.marks[point],
          };
          legalMarks.push(item);
        });
      return legalMarks;
    },
    minValue(): number {
      return Math.min(this.firstValue, this.secondValue);
    },
    maxValue(): number {
      return Math.max(this.firstValue, this.secondValue);
    },
    barSize(): string {
      const cuttentDiff = this.range ? this.maxValue - this.minValue : this.firstValue - this.min;
      return `${(100 * cuttentDiff) / this.rangeDiff}%`;
    },
    barStart(): string {
      return this.range ? `${(100 * (this.minValue - this.min)) / this.rangeDiff}%` : '0%';
    },
    precision(): number {
      const precisions = [this.min, this.max, this.step].map((item) => {
        const decimalArr = `${item}`.split('.');
        return decimalArr[1] ? decimalArr[1].length : 0;
      });
      return Math.max.apply(null, precisions);
    },
    runwayStyle(): object {
      return this.vertical ? { height: '100%' } : {};
    },
    barStyle(): object {
      return this.vertical
        ? {
          height: this.barSize,
          bottom: this.barStart,
        }
        : {
          width: this.barSize,
          left: this.barStart,
        };
    },
  },
  watch: {
    value(newVal: SliderValue) {
      if (this.dragging === true) return;
      if (Array.isArray(newVal) && this.range) {
        [this.firstValue, this.secondValue] = newVal;
      } else {
        this.prevValue = newVal as number;
      }
    },
    firstValue(val: number) {
      if (this.range) {
        this.emitChange([this.minValue, this.maxValue]);
      } else {
        this.emitChange(val);
      }
    },
    secondValue() {
      if (this.range) {
        this.emitChange([this.minValue, this.maxValue]);
      }
    },
    dragging(newVal: boolean) {
      if (newVal === false) {
        this.init();
      }
    },
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resetSize);
  },
  methods: {
    // 初始化传入的value
    init(): void {
      let valuetext: string | number;

      const { min, max, value } = this;
      if (this.range) {
        if (Array.isArray(value)) {
          this.firstValue = Math.max(min || 0, value[0]);
          this.secondValue = Math.min(max || 100, value[1]);
        } else {
          this.firstValue = min || 0;
          this.secondValue = max || 100;
        }
        this.prevValue = [this.firstValue, this.secondValue];
        valuetext = `${this.firstValue}-${this.secondValue}`;
      } else {
        if (typeof this.value !== 'number') {
          this.firstValue = min;
        } else {
          this.firstValue = Math.min(max, Math.max(min, value as number));
        }
        this.prevValue = this.firstValue;
        valuetext = String(this.firstValue);
      }
      this.$el.setAttribute('aria-valuetext', valuetext);
      this.resetSize();
      window.addEventListener('resize', this.resetSize);
    },
    valueChanged(): boolean {
      if (this.range) {
        return ![this.minValue, this.maxValue].every((item, index) => item === this.prevValue[index]);
      }
      return this.value !== this.prevValue;
    },
    // 防止值越级
    setValues(value: SliderValue): SliderValue {
      const [min, max] = [this.min, this.max];
      if (min > max) {
        console.warn('[Slider] max should be greater than min.');
        return;
      }
      // 双向滑块
      if (this.range && Array.isArray(value)) {
        let [firstValue, secondValue] = [Math.min(...value), Math.max(...value)];
        if (firstValue > max) {
          firstValue = this.firstValue;
        }
        if (firstValue < min) {
          firstValue = min;
        }
        if (secondValue < min) {
          secondValue = this.secondValue;
        }
        if (secondValue > max) {
          secondValue = max;
        }
        [this.firstValue, this.secondValue] = [firstValue, secondValue];
        return [firstValue, secondValue];
      }
      let preValue = value;
      if (preValue < min) {
        preValue = min;
      }
      if (preValue > max) {
        preValue = max;
      }
      return preValue;
    },
    setInputProps(): void {
      if (typeof this.inputNumberProps !== 'boolean') {
        const {
          decimalPlaces: inputDecimalPlaces,
          format: inputFormat,
          placeholder: inputPlaceholder,
          theme: inputTheme,
        } = this.inputNumberProps as TdSliderProps['inputNumberProps'];
        if (typeof inputDecimalPlaces === 'number' && !isNaN(inputDecimalPlaces)) {
          this.inputDecimalPlaces = inputDecimalPlaces;
        }
        if (inputPlaceholder) {
          this.inputPlaceholder = inputPlaceholder;
        }
        if (typeof inputFormat === 'function') {
          this.inputFormat = inputFormat;
        }
        if (['column', 'row', 'normal'].includes(inputTheme)) {
          this.inputTheme = inputTheme;
        }
      }
    },
    // 相应button的位置
    setPosition(percent: number): void {
      let targetValue = (percent * this.rangeDiff) / 100;
      targetValue = this.min + targetValue;
      if (!this.range) {
        (this.$refs.button1 as SliderButtonType).setPosition(percent);
        return;
      }
      let button;
      if (Math.abs(this.minValue - targetValue) < Math.abs(this.maxValue - targetValue)) {
        button = this.firstValue < this.secondValue ? 'button1' : 'button2';
      } else {
        button = this.firstValue > this.secondValue ? 'button1' : 'button2';
      }
      (this.$refs[button] as SliderButtonType).setPosition(percent);
    },
    // 全局点击
    onSliderClick(event: MouseEvent): void {
      if (this.disabled || this.dragging) {
        return;
      }
      this.resetSize();
      let value = 0;
      if (this.vertical) {
        const sliderOffsetBottom = (this.$refs.slider as Element).getBoundingClientRect().bottom;
        value = ((sliderOffsetBottom - event.clientY) / this.sliderSize) * 100;
        this.setPosition(value);
      } else {
        const sliderOffsetLeft = (this.$refs.slider as Element).getBoundingClientRect().left;
        value = ((event.clientX - sliderOffsetLeft) / this.sliderSize) * 100;
        this.setPosition(value);
      }
    },
    resetSize(): void {
      if (this.$refs.slider) {
        this.sliderSize = this.$refs.slider[`client${this.vertical ? 'Height' : 'Width'}`];
      }
    },
    // 只要触发修改就要有这个方法抛出change事件
    emitChange(value: SliderValue) {
      let changeValue = value;
      if (changeValue === undefined) {
        if (this.range) {
          changeValue = [this.firstValue, this.secondValue];
        } else {
          changeValue = this.prevValue;
        }
      }
      const fixValue: SliderValue = this.setValues(changeValue);
      emitEvent<Parameters<TdSliderProps['onChange']>>(this, 'change', fixValue);
    },
    getStopStyle(position: number) {
      return this.vertical ? { top: `calc(${100 - position}% - 1px)` } : { left: `${position}%` };
    },

    // mark 点击触发修改事件
    changeValue(point: number) {
      if (this.disabled || this.dragging) {
        return;
      }
      this.resetSize();
      const value = Number((point / this.rangeDiff) * 100);
      this.setPosition(value);
      this.emitChange(point);
    },
    renderMask(): VNode {
      if (this.markList.length) {
        return (
          <div>
            <div>
              {this.markList.map((item, index) => (
                <div
                  class={`${name}__stop ${name}__mark-stop`}
                  style={this.getStopStyle(item.position)}
                  key={index}
                />
              ))}
            </div>
            <div class={`${name}__mark`}>
              {this.markList.map((item, key) => (
                <t-slider-mark
                  mark={item.mark}
                  point={item.point}
                  key={key}
                  style={this.getStopStyle(item.position)}
                  on-change-value={this.changeValue}
                />
              ))}
            </div>
          </div>
        );
      }
    },
    renderInputButton(): VNode {
      const {
        max, min, sliderNumberClass, range,
      } = this;
      return (
        <div class={`${name}-input-container`}>
          {this.inputNumberProps && (
            <t-input-number
              class={sliderNumberClass}
              value={range ? this.firstValue : this.prevValue}
              ref="input"
              step={this.step}
              onChange={(v: number) => {
                this.firstValue = v;
                this.range ? (this.firstValue = v) : (this.prevValue = v);
              }}
              disabled={this.disabled}
              min={min}
              max={max}
              decimalPlaces={this.inputDecimalPlaces}
              format={this.inputFormat}
              placeholder={this.inputPlaceholder}
              theme={this.inputTheme}
            />
          )}
          {this.inputNumberProps && range && (
            <t-input-number
              class={this.sliderNumberClass}
              value={this.secondValue}
              ref="input"
              onChange={(v: number) => {
                this.secondValue = v;
              }}
              step={this.step}
              disabled={this.disabled}
              min={min}
              max={max}
              decimalPlaces={this.inputDecimalPlaces}
              format={this.inputFormat}
              placeholder={this.inputPlaceholder}
              theme={this.inputTheme}
            />
          )}
        </div>
      );
    },
  },
  render(): VNode {
    const {
      min, max, layout, disabled, vertical,
    } = this;
    const BUTTON_GROUP = this.renderInputButton();
    const MASKS = this.renderMask();
    return (
      <div class={this.containerClass}>
        <div
          class={this.sliderClass}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-orientation={layout}
          aria-disabled={disabled}
          tooltip-props={this.tooltipProps}
        >
          <div class={this.sliderRailClass} style={this.runwayStyle} onClick={this.onSliderClick} ref="slider">
            <div class={`${name}__track`} style={this.barStyle}/>
            <t-slider-button
              vertical={vertical}
              value={this.firstValue}
              ref="button1"
              disabled={this.disabled}
              tooltip-props={this.tooltipProps}
              onInput={(v: number) => {
                this.firstValue = v;
              }}
            />
            {this.range && (
              <t-slider-button
                vertical={vertical}
                value={this.secondValue}
                ref="button2"
                disabled={this.disabled}
                tooltip-props={this.tooltipProps}
                onInput={(v: number) => {
                  this.secondValue = v;
                }}
              />
            )}

            {this.showSteps && (
              <div>
                {this.steps.map((item, key) => (
                  <div class={`${name}__stop`} key={key} style={this.getStopStyle(item)}/>
                ))}
              </div>
            )}
            {MASKS}
          </div>
        </div>
        {BUTTON_GROUP}
      </div>
    );
  },
});
