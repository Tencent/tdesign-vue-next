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

    const defaultEmptyColor = computed(() => (isGradient.value ? DEFAULT_LINEAR_GRADIENT : DEFAULT_COLOR));

    const mode = ref<TdColorModes>(
      props.colorModes?.length !== 1 && innerValue.value?.includes('linear-gradient')
        ? 'linear-gradient'
        : props.colorModes?.length === 1
        ? props.colorModes[0]
        : 'monochrome',
    );
    const isGradient = computed(() => mode.value === 'linear-gradient');

    const color = ref(new Color(innerValue.value || defaultEmptyColor.value));
    const updateColor = () => color.value.update(innerValue.value || defaultEmptyColor.value);

    const formatModel = ref<TdColorPickerProps['format']>(color.value.isGradient ? 'CSS' : 'RGB');

    const [recentlyUsedColors, setRecentlyUsedColors] = useDefaultValue(
      recentColors,
      props.defaultRecentColors,
      props.onRecentColorsChange,
      'recentColors',
    );

    const formatValue = () => {
      // 渐变模式下直接输出css样式
      if (mode.value === 'linear-gradient') {
        return color.value.linearGradient;
      }
      const colorMap = color.value.getFormatsColorMap();
      return Object.keys(colorMap).includes(props.format)
        ? colorMap[props.format as keyof typeof colorMap]
        : color.value.css;
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

      color.value.update(color.value.rgba);
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
    const handleSetColor = (type: 'system' | 'used', value: string) => {
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
                  onSetColor={(color: string) => handleSetColor('used', color)}
                  onChange={handleRecentlyUsedColorsChange}
                />
              ) : null}
              {showSystemColors ? (
                <SwatchesPanel
                  {...baseProps}
                  title={t(globalConfig.value.swatchColorTitle)}
                  colors={systemColors}
                  onSetColor={(color: string) => handleSetColor('system', color)}
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
