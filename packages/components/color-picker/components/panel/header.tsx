import { defineComponent, PropType, ref, watch } from 'vue';

import { COLOR_MODES } from '@tdesign/common-js/color-picker/constants';
import { useConfig } from '@tdesign/shared-hooks';
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
  },
  setup(props) {
    const { globalConfig } = useConfig('colorPicker');
    const baseClassName = useBaseClassName();
    const modeValue = ref(props.mode);
    const handleModeChange = (v: string) => props.onModeChange(v);
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
        </div>
      );
    };
  },
});
