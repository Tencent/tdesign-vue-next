import { defineComponent, PropType, ref, watch } from 'vue';

import props from '../props';
import { COLOR_MODES } from '@tdesign/common-js/color-picker/constants';
import { RadioGroup as TRadioGroup, RadioButton as TRadioButton } from '../../radio';
import { TdColorModes } from '../interfaces';
import { useBaseClassName } from '../hooks';
import { useConfig } from '../../hooks';

export default defineComponent({
  name: 'PanelHeader',
  props: {
    ...props,
    mode: {
      type: String as PropType<TdColorModes>,
      default: 'color',
    },
    togglePopup: {
      type: Function,
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
