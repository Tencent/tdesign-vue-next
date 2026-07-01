import { defineComponent, PropType, ref, watch } from 'vue';

import { COLOR_MODES } from '@tdesign/common-js/color-picker/constants';
import { useConfig } from '@tdesign/shared-hooks';
import { isEyeDropperSupported, pickColor } from '../../utils/eyedropper.js';
import { Button as TButton } from '../../../button';
import { RadioButton as TRadioButton, RadioGroup as TRadioGroup } from '../../../radio';
import props from '../../color-picker-panel-props';
import { useBaseClassName } from '../../hooks';
import type { TdColorModes } from '../../types';

export default defineComponent({
  name: 'PanelHeader',
  props: {
    ...props,
    mode: {
      type: String as PropType<TdColorModes>,
      default: 'color',
    },
    onModeChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    onEyeDropperPick: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  emits: ['mode-change', 'eyedropper-pick'],
  setup(props, { emit }) {
    const { globalConfig } = useConfig('colorPicker');
    const baseClassName = useBaseClassName();
    const modeValue = ref(props.mode);
    const handleModeChange = (v: string) => props.onModeChange(v);
    const handleEyeDropperPick = async () => {
      try {
        console.log('[EyeDropper Header] Button clicked!');
        const color = await pickColor();
        console.log('[EyeDropper Header] Color picked:', color);
        console.log('[EyeDropper Header] Calling onEyeDropperPick prop...');
        props.onEyeDropperPick(color);
        console.log('[EyeDropper Header] onEyeDropperPick called!');
      } catch (error: any) {
        console.warn('EyeDropper pick failed:', error);
      }
    };
    watch(
      () => props.mode,
      (v) => (modeValue.value = v),
    );
    return () => {
      if (props.colorModes?.length === 1) {
        return null;
      }
      return (
        <div class={`${baseClassName.value}__head`}>
          <div class={`${baseClassName.value}__mode`}>
            <TRadioGroup variant="default-filled" size="small" v-model={modeValue.value} onChange={handleModeChange}>
              {Object.keys(COLOR_MODES).map((key) => (
                <TRadioButton key={key} value={key}>
                  {Reflect.get(globalConfig.value, COLOR_MODES[key as keyof typeof COLOR_MODES])}
                </TRadioButton>
              ))}
            </TRadioGroup>
          </div>
          {isEyeDropperSupported() ? (
            <div class={`${baseClassName.value}__eyedropper`}>
              <TButton
                size="small"
                variant="text"
                onClick={handleEyeDropperPick}
                title="吸色"
              >
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
             <g transform="rotate(45, 12, 12)">
             <circle cx="12" cy="2.5" r="2.5"/>
            <rect x="11.2" y="5" width="1.6" height="2.5"/>
             <path d="M 9.6 7.5 L 11 18 L 12 19.5 L 13 18 L 14.4 7.5 Z"/>
             </g>
               </svg>
              </TButton>
            </div>
          ) : null}
        </div>
      );
    };
  },
});
