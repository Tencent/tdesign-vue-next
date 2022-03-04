import { defineComponent, provide, ref, watch } from 'vue';
import props from '../props';
import {
  COMPONENT_NAME,
  DEFAULT_COLOR,
  DEFAULT_LINEAR_GRADIENT,
  TdColorMode,
  TdColorPickerUsedColorsProvide,
  TD_COLOR_USED_COLORS_MAX_SIZE,
  TD_COLOR_USED_COLORS_PROVIDE,
  TITLE_RECENT_COLORS,
  TITLE_SWATCH_COLORS,
  DEFAULT_SYSTEM_SWATCH_COLORS,
} from '../const';
import ColorPickerHeader from './header';
import LinearGradient from './linear-gradient';
import SaturationPanel from './saturation';
import HueSlider from './hue';
import AlphaSlider from './alpha';
import FormatPanel from './format';
import SwatchesPanel from './swatches';
import Color from '../utils/color';
import { GradientColorPoint } from '../utils/gradient';
import { TdColorPickerProps, ColorPickerChangeTrigger } from '..';

const name = COMPONENT_NAME;

export default defineComponent({
  name: 'ColorPickerPanel',
  components: {
    ColorPickerHeader,
    LinearGradient,
    SaturationPanel,
    HueSlider,
    AlphaSlider,
    FormatPanel,
    SwatchesPanel,
  },
  inheritAttrs: false,
  props: {
    ...props,
    customClass: {
      type: String,
      default: '',
    },
  },
  emits: ['change', 'palette-bar-change'],
  setup(props, { emit }) {
    const color = ref<Color>(new Color(props.value || props.defaultValue || DEFAULT_COLOR));
    const mode = ref<TdColorMode>(color.value.isGradient ? 'linear-gradient' : 'monochrome');
    const formatModel = ref<TdColorPickerProps['format']>(color.value.isGradient ? 'CSS' : 'RGB');
    const recentlyUsedColors = ref<string[]>(props.recentColors as string[]);
    const activeRecentlyUsedColor = ref('');
    if (props.colorModes.length === 1) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      const m = props.colorModes[0];
      mode.value = m;
    }

    const formatValue = () => {
      // 渐变模式下直接输出css样式
      if (mode.value === 'linear-gradient') {
        return color.value.linearGradient;
      }
      switch (props.format) {
        case 'HEX':
          return color.value.hex;
        case 'CMYK':
          return color.value.cmyk;
        case 'RGB':
        case 'RGBA':
          return props.enableAlpha ? color.value.rgba : color.value.rgb;
        case 'HSL':
        case 'HSLA':
          return props.enableAlpha ? color.value.hsla : color.value.hsl;
        case 'HSV':
        case 'HSVA':
          return props.enableAlpha ? color.value.hsva : color.value.hsv;
        default:
          return color.value.css;
      }
    };

    const emitColorChange = (trigger?: ColorPickerChangeTrigger) => {
      return emit('change', formatValue(), color.value, trigger || 'palette');
    };

    /**
     * 添加最近使用颜色
     * @param value
     */
    const addRecentlyUsedColor = (value: string) => {
      if (props.recentColors === null) {
        return;
      }
      const colors = recentlyUsedColors.value;
      const currentColor = value || color.value.rgba;
      const index = colors.indexOf(currentColor);
      if (index > -1) {
        colors.splice(index, 1);
      }
      colors.unshift(currentColor);
      if (colors.length > TD_COLOR_USED_COLORS_MAX_SIZE) {
        colors.length = TD_COLOR_USED_COLORS_MAX_SIZE;
      }
    };

    /**
     * 移除最近使用颜色
     * @param color
     */
    const removeRecentlyUsedColor = (color: string) => {
      if (props.recentColors === false) {
        return;
      }
      const colors = recentlyUsedColors.value;
      const index = colors.indexOf(color);
      if (index > -1) {
        colors.splice(index, 1);
      }
    };

    const setActiveRecentlyUsedColor = (color: string) => {
      activeRecentlyUsedColor.value = color;
    };

    provide<TdColorPickerUsedColorsProvide>(TD_COLOR_USED_COLORS_PROVIDE, {
      colors: recentlyUsedColors,
      activeColor: activeRecentlyUsedColor,
      setActiveColor: setActiveRecentlyUsedColor,
      addColor: addRecentlyUsedColor,
      removeColor: removeRecentlyUsedColor,
    });

    const updateColor = () => color.value.update(props.value || props.defaultValue || DEFAULT_COLOR);

    watch(() => [props.defaultValue, props.enableAlpha], updateColor);

    watch(
      () => props.value,
      (newColor) => {
        if (newColor !== formatValue()) {
          updateColor();
          mode.value = color.value.isGradient ? 'linear-gradient' : 'monochrome';
        }
      },
    );

    /**
     * mode change
     * @param value
     * @returns
     */
    const handleModeChange = (value: TdColorMode) => {
      mode.value = value;
      if (value === 'linear-gradient') {
        color.value.update(
          color.value.gradientColors.length > 0 ? color.value.linearGradient : DEFAULT_LINEAR_GRADIENT,
        );
        return;
      }
      color.value.update(color.value.rgba);
    };

    /**
     * 格式变化
     * @param format
     * @returns
     */
    const handleFormatModeChange = (format: TdColorPickerProps['format']) => (formatModel.value = format);

    /**
     * 饱和度亮度变化
     * @param param0
     */
    const handleSatAndValueChange = ({ saturation, value }: { saturation: number; value: number }) => {
      color.value.saturation = saturation;
      color.value.value = value;
      emitColorChange();
    };

    /**
     * 色相变化
     * @param hue
     */
    const handleHueChange = (hue: number) => {
      color.value.hue = hue;
      emitColorChange();
      emit('palette-bar-change', formatValue(), color.value);
    };

    /**
     * 透明度变化
     * @param alpha
     */
    const handleAlphaChange = (alpha: number) => {
      color.value.alpha = alpha;
      emitColorChange();
    };

    /**
     * 输入框触发改变
     * @param input
     * @param alpha
     */
    const handleInputChange = (input: string, alpha?: number) => {
      color.value.update(input);
      color.value.alpha = alpha;
      emitColorChange('input');
    };

    /**
     * 渐变改变
     * @param param0
     */
    const handleGradientChange = ({
      key,
      payload,
    }: {
      key: 'degree' | 'selectedId' | 'colors';
      payload: number | string | GradientColorPoint[];
    }) => {
      switch (key) {
        case 'degree':
          color.value.gradientDegree = payload as number;
          break;
        case 'selectedId':
          color.value.gradientSelectedId = payload as string;
          break;
        case 'colors':
          color.value.gradientColors = payload as GradientColorPoint[];
          break;
      }
      emitColorChange();
    };

    /**
     * 色块点击
     * @param type
     * @param value
     */
    const handleSetColor = (type: 'system' | 'used', value: string) => {
      if (type === 'system') {
        addRecentlyUsedColor(value);
      } else {
        setActiveRecentlyUsedColor(value);
      }

      const isGradientValue = Color.isGradientColor(value);
      if (isGradientValue) {
        if (props.colorModes.includes('linear-gradient')) {
          mode.value = 'linear-gradient';
          color.value.update(value);
          color.value.updateCurrentGradientColor();
        } else {
          console.warn('该模式不支持渐变色');
        }
      } else if (mode.value === 'linear-gradient') {
        color.value.updateStates(value);
        color.value.updateCurrentGradientColor();
      } else {
        color.value.update(value);
      }
      emitColorChange();
    };

    // todo watch props.value
    return {
      color,
      mode,
      formatModel,
      recentlyUsedColors,
      activeRecentlyUsedColor,
      handleModeChange,
      handleSatAndValueChange,
      handleHueChange,
      handleAlphaChange,
      handleGradientChange,
      handleSetColor,
      handleFormatModeChange,
      handleInputChange,
    };
  },
  render() {
    const props = { ...this.$props, color: this.color, format: this.formatModel };
    delete props.onChange;
    delete props.onPaletteBarChange;
    const showUsedColors = props.recentColors !== null && this.recentlyUsedColors?.length > 0;
    let systemColors = props.swatchColors;
    if (systemColors === undefined) {
      systemColors = [...DEFAULT_SYSTEM_SWATCH_COLORS];
    }
    const showSystemColors = systemColors?.length > 0;
    const renderSwatches = () => {
      if (!showSystemColors && !showUsedColors) {
        return null;
      }
      return (
        <>
          <div class={`${name}__swatches-wrap`}>
            {showUsedColors ? (
              <swatches-panel
                title={TITLE_RECENT_COLORS}
                removable
                color={props.color}
                colors={this.recentlyUsedColors}
                activeColor={this.activeRecentlyUsedColor}
                onSetColor={(color: string) => this.handleSetColor('used', color)}
                disabled={this.disabled}
              />
            ) : null}
            {showSystemColors ? (
              <swatches-panel
                title={TITLE_SWATCH_COLORS}
                color={props.color}
                colors={systemColors}
                onSetColor={(color: string) => this.handleSetColor('system', color)}
                disabled={this.disabled}
              />
            ) : null}
          </div>
        </>
      );
    };

    return (
      <div class={[`${name}__panel`, this.customClass, this.disabled ? 'is-disabled' : false]}>
        <color-picker-header {...this.$props} mode={this.mode} onModeChange={this.handleModeChange} />
        <div class={[`${name}__body`]}>
          {this.mode === 'linear-gradient' ? <linear-gradient {...props} onChange={this.handleGradientChange} /> : null}
          <saturation-panel {...props} onChange={this.handleSatAndValueChange} />
          <hue-slider {...props} onChange={this.handleHueChange} />
          {this.enableAlpha ? <alpha-slider {...props} onChange={this.handleAlphaChange} /> : null}
          <format-panel {...props} onModeChange={this.handleFormatModeChange} onChange={this.handleInputChange} />
          {renderSwatches()}
        </div>
      </div>
    );
  },
});
