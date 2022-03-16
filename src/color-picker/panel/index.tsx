import { defineComponent, provide, ref, toRefs, watch } from 'vue';
import { useCommonClassName, useConfig } from '../../config-provider';
import props from '../props';
import {
  DEFAULT_COLOR,
  DEFAULT_LINEAR_GRADIENT,
  TD_COLOR_USED_COLORS_MAX_SIZE,
  DEFAULT_SYSTEM_SWATCH_COLORS,
} from '../const';
import PanelHeader from './header';
import LinearGradient from './linear-gradient';
import SaturationPanel from './saturation';
import HueSlider from './hue';
import AlphaSlider from './alpha';
import FormatPanel from './format';
import SwatchesPanel from './swatches';
import Color, { getColorObject } from '../utils/color';
import { GradientColorPoint } from '../utils/gradient';
import { TdColorPickerProps, ColorPickerChangeTrigger } from '..';
import { TdColorModes, TdColorPickerProvides, TdColorPickerUsedColorsProvide } from '../interfaces';
import { useBaseClassName } from '../hooks';
import useVModel from '../../hooks/useVModel';

export default defineComponent({
  name: 'ColorPanel',
  components: {
    PanelHeader,
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
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const { STATUS } = useCommonClassName();
    const { t, global } = useConfig('colorPicker');
    const statusClassNames = STATUS.value;
    const { value: inputValue, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(inputValue, modelValue, props.defaultValue, props.onChange);
    const color = ref<Color>(new Color(innerValue.value || DEFAULT_COLOR));
    const updateColor = () => color.value.update(innerValue.value || DEFAULT_COLOR);

    const mode = ref<TdColorModes>(color.value.isGradient ? 'linear-gradient' : 'monochrome');
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
      return color.value.getFormatsColorMap()[props.format] || color.value.css;
    };

    const emitColorChange = (trigger?: ColorPickerChangeTrigger) => {
      setInnerValue(formatValue(), {
        color: getColorObject(color.value),
        trigger: trigger || 'palette',
      });
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

    provide<TdColorPickerUsedColorsProvide>(TdColorPickerProvides.USED_COLORS, {
      colors: recentlyUsedColors,
      activeColor: activeRecentlyUsedColor,
      setActiveColor: setActiveRecentlyUsedColor,
      addColor: addRecentlyUsedColor,
      removeColor: removeRecentlyUsedColor,
    });

    watch(() => [props.defaultValue, props.enableAlpha], updateColor);

    watch(
      () => innerValue.value,
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
    const handleModeChange = (value: TdColorModes) => {
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
      props?.onPaletteBarChange({
        color: getColorObject(color.value),
      });
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
      addRecentlyUsedColor(color.value.css);
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

    return {
      baseClassName,
      statusClassNames,
      t,
      global,
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
    const { baseClassName, statusClassNames, t, global } = this;
    const props = { ...this.$props, color: this.color, format: this.formatModel };
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
          <div class={`${baseClassName}__swatches-wrap`}>
            {showUsedColors ? (
              <swatches-panel
                title={t(global.recentColorTitle)}
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
                title={t(global.swatchColorTitle)}
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
      <div
        class={[`${baseClassName}__panel`, this.disabled ? statusClassNames.disabled : false]}
        onClick={(e) => e.stopPropagation()}
      >
        <panel-header {...this.$props} mode={this.mode} onModeChange={this.handleModeChange} />
        <div class={[`${baseClassName}__body`]}>
          {this.mode === 'linear-gradient' ? (
            <linear-gradient color={this.color} disabled={this.disabled} onChange={this.handleGradientChange} />
          ) : null}
          <saturation-panel color={this.color} disabled={this.disabled} onChange={this.handleSatAndValueChange} />
          <hue-slider color={this.color} disabled={this.disabled} onChange={this.handleHueChange} />
          {this.enableAlpha ? (
            <alpha-slider color={this.color} disabled={this.disabled} onChange={this.handleAlphaChange} />
          ) : null}
          <format-panel
            {...this.$props}
            color={this.color}
            format={this.formatModel}
            onModeChange={this.handleFormatModeChange}
            onInputChange={this.handleInputChange}
          />
          {renderSwatches()}
        </div>
      </div>
    );
  },
});
