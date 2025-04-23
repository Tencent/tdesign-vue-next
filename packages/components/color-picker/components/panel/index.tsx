import { defineComponent, ref, toRefs, watch, computed } from 'vue';
import { useCommonClassName, useConfig } from '../../../hooks/useConfig';
import props from '../../props';
import {
  DEFAULT_COLOR,
  DEFAULT_LINEAR_GRADIENT,
  TD_COLOR_USED_COLORS_MAX_SIZE,
  DEFAULT_SYSTEM_SWATCH_COLORS,
} from '@tdesign/common-js/color-picker/constants';
import PanelHeader from './header';
import LinearGradient from './linear-gradient';
import SaturationPanel from './saturation';
import HueSlider from './hue';
import AlphaSlider from './alpha';
import FormatPanel from '../format';
import SwatchesPanel from './swatches';
import { Color, getColorObject, GradientColorPoint } from '../../utils';
import { TdColorPickerProps, ColorPickerChangeTrigger } from '../../type';
import { TdColorModes } from '../../types';
import { useBaseClassName } from '../../hooks';
import useVModel from '../../../hooks/useVModel';
import useDefaultValue from '../../../hooks/useDefaultValue';
import { cloneDeep } from 'lodash-es';

export default defineComponent({
  name: 'ColorPanel',
  props: {
    ...props,
    togglePopup: {
      type: Function,
    },
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const { STATUS } = useCommonClassName();
    const { t, globalConfig } = useConfig('colorPicker');
    const statusClassNames = STATUS.value;
    const { value: inputValue, modelValue, recentColors } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(inputValue, modelValue, props.defaultValue, props.onChange);

    const getModeByColor = (input: string) => {
      if (props.colorModes.length === 1) return props.colorModes[0];
      return props.colorModes.includes('linear-gradient') && Color.isGradientColor(input)
        ? 'linear-gradient'
        : 'monochrome';
    };
    const mode = ref<TdColorModes>(getModeByColor(innerValue.value));

    const isGradient = computed(() => mode.value === 'linear-gradient');
    const defaultEmptyColor = computed(() => (isGradient.value ? DEFAULT_LINEAR_GRADIENT : DEFAULT_COLOR));

    const color = ref(new Color(innerValue.value || defaultEmptyColor.value));

    const formatModel = ref<TdColorPickerProps['format']>(color.value.isGradient ? 'CSS' : 'RGB');

    const [recentlyUsedColors, setRecentlyUsedColors] = useDefaultValue(
      recentColors,
      props.defaultRecentColors,
      props.onRecentColorsChange,
      'recentColors',
    );

    const formatValue = () => {
      // 渐变模式下直接输出 CSS 格式
      if (color.value.isGradient) {
        return color.value.linearGradient;
      }

      // 处理开启透明通道时的格式
      let finalFormat = props.format as keyof ReturnType<Color['getFormatsColorMap']>;
      if (props.enableAlpha) {
        if (props.format === 'HEX') finalFormat = 'HEX8';
        if (props.format === 'RGB') finalFormat = 'RGBA';
        if (props.format === 'HSL') finalFormat = 'HSLA';
        if (props.format === 'HSV') finalFormat = 'HSVA';
      }
      return color.value.getFormatsColorMap()[finalFormat];
    };

    /**
     * 添加最近使用颜色
     * @returns void
     */
    const addRecentlyUsedColor = () => {
      if (recentlyUsedColors.value === null || recentlyUsedColors.value === false) {
        return;
      }
      const colors = cloneDeep(recentlyUsedColors.value as string[]) || [];
      const currentColor = color.value.isGradient ? color.value.linearGradient : color.value.rgba;
      const index = colors.indexOf(currentColor);
      if (index > -1) {
        colors.splice(index, 1);
      }
      colors.unshift(currentColor);
      if (colors.length > TD_COLOR_USED_COLORS_MAX_SIZE) {
        colors.length = TD_COLOR_USED_COLORS_MAX_SIZE;
      }
      handleRecentlyUsedColorsChange(colors);
    };

    /**
     * 最近使用颜色变更时触发
     * @param colors
     */
    const handleRecentlyUsedColorsChange = (colors: string[]) => {
      setRecentlyUsedColors(colors);
    };

    /**
     * onChange
     * @param trigger
     */
    const emitColorChange = (trigger?: ColorPickerChangeTrigger) => {
      setInnerValue(formatValue(), {
        color: getColorObject(color.value),
        trigger: trigger || 'palette-saturation-brightness',
      });
    };

    watch(
      () => innerValue.value,
      (newColor) => {
        const newMode = getModeByColor(newColor);
        mode.value = newMode;
        color.value.isGradient = newMode === 'linear-gradient';
        color.value.update(newColor);
      },
    );

    /**
     * mode change
     * @param newMode
     * @returns
     */
    const handleModeChange = (newMode: TdColorModes) => {
      mode.value = newMode;

      const isGradientMode = newMode === 'linear-gradient';
      color.value.isGradient = isGradientMode;

      if (isGradientMode) {
        color.value.update(
          color.value.gradientColors.length > 0 ? color.value.linearGradient : DEFAULT_LINEAR_GRADIENT,
        );
      } else {
        color.value.update(color.value.rgba);
      }

      emitColorChange();
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
      const { saturation: sat, value: val } = color.value;
      let changeTrigger: ColorPickerChangeTrigger = 'palette-saturation-brightness';
      if (value !== val && saturation !== sat) {
        color.value.saturation = saturation;
        color.value.value = value;
        changeTrigger = 'palette-saturation-brightness';
      } else if (saturation !== sat) {
        color.value.saturation = saturation;
        changeTrigger = 'palette-saturation';
      } else if (value !== val) {
        color.value.value = value;
        changeTrigger = 'palette-brightness';
      } else {
        return;
      }

      emitColorChange(changeTrigger);
    };

    /**
     * 色相变化
     * @param hue
     */
    const handleHueChange = (hue: number) => {
      color.value.hue = hue;
      emitColorChange('palette-hue-bar');
      props.onPaletteBarChange?.({
        color: getColorObject(color.value),
      });
    };

    /**
     * 透明度变化
     * @param alpha
     */
    const handleAlphaChange = (alpha: number) => {
      color.value.alpha = alpha;
      emitColorChange('palette-alpha-bar');
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
      let trigger: ColorPickerChangeTrigger = 'palette-saturation-brightness';
      switch (key) {
        case 'degree':
          color.value.gradientDegree = payload as number;
          trigger = 'input';
          break;
        case 'selectedId':
          color.value.gradientSelectedId = payload as string;
          break;
        case 'colors':
          color.value.gradientColors = payload as GradientColorPoint[];
          break;
      }
      emitColorChange(trigger);
    };

    /**
     * 色块点击
     * @param type
     * @param value
     */
    const handleSetColor = (value: string, trigger: ColorPickerChangeTrigger) => {
      const newMode = getModeByColor(value);
      mode.value = newMode;
      color.value.isGradient = newMode === 'linear-gradient';
      color.value.update(value);
      emitColorChange(trigger);
    };

    return () => {
      const baseProps = {
        color: color.value,
        disabled: props.disabled,
      };
      const showUsedColors = recentlyUsedColors.value !== null && recentlyUsedColors.value !== false;

      let systemColors = props.swatchColors;
      if (systemColors === undefined) {
        systemColors = [...DEFAULT_SYSTEM_SWATCH_COLORS];
      }
      // 如果只支持渐变模式，则过滤掉非渐变色值
      const onlySupportGradient = props.colorModes.length === 1 && props.colorModes.includes('linear-gradient');
      if (onlySupportGradient) {
        systemColors = systemColors.filter((color) => Color.isGradientColor(color));
      }
      const showSystemColors = systemColors?.length > 0;

      const renderSwatches = () => {
        if (!showSystemColors && !showUsedColors) {
          return null;
        }
        return (
          <>
            <div class={`${baseClassName.value}__swatches-wrap`}>
              {showUsedColors ? (
                <SwatchesPanel
                  {...baseProps}
                  title={t(globalConfig.value.recentColorTitle)}
                  editable
                  colors={recentlyUsedColors.value as string[]}
                  handleAddColor={addRecentlyUsedColor}
                  onSetColor={(color: string) => handleSetColor(color, 'recent')}
                  onChange={handleRecentlyUsedColorsChange}
                />
              ) : null}
              {showSystemColors ? (
                <SwatchesPanel
                  {...baseProps}
                  title={t(globalConfig.value.swatchColorTitle)}
                  colors={systemColors}
                  onSetColor={(color: string) => handleSetColor(color, 'preset')}
                />
              ) : null}
            </div>
          </>
        );
      };

      return (
        <div class={[`${baseClassName.value}__panel`, props.disabled ? statusClassNames.disabled : false]}>
          <PanelHeader {...props} mode={mode.value} onModeChange={handleModeChange} />
          <div class={[`${baseClassName.value}__body`]}>
            {isGradient.value ? (
              <LinearGradient
                {...baseProps}
                onChange={handleGradientChange}
                enableMultipleGradient={props.enableMultipleGradient}
              />
            ) : null}

            <SaturationPanel {...baseProps} onChange={handleSatAndValueChange} />

            <div class={[`${baseClassName.value}__sliders-wrapper`]}>
              <div class={[`${baseClassName.value}__sliders`]}>
                <HueSlider {...baseProps} onChange={handleHueChange} />
                {props.enableAlpha ? <AlphaSlider {...baseProps} onChange={handleAlphaChange} /> : null}
              </div>

              {props.showPrimaryColorPreview ? (
                <div class={[`${baseClassName.value}__sliders-preview`, `${baseClassName.value}--bg-alpha`]}>
                  <span
                    class={`${baseClassName.value}__sliders-preview-inner`}
                    style={{
                      background: isGradient.value ? color.value.linearGradient : color.value.rgba,
                    }}
                  />
                </div>
              ) : null}
            </div>

            <FormatPanel
              {...props}
              color={color.value}
              format={formatModel.value}
              onModeChange={handleFormatModeChange}
              onInputChange={handleInputChange}
            />
            {renderSwatches()}
          </div>
        </div>
      );
    };
  },
});
