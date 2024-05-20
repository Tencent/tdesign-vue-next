import type { PropType } from '@td/adapter-vue';
import { defineComponent, ref, watch } from '@td/adapter-vue';

import props from '@td/intel/color-picker/props';
import { COLOR_MODES } from '../const';
import { RadioButton as TRadioButton, RadioGroup as TRadioGroup } from '../../radio';
import type { TdColorModes } from '../interfaces';
import { useBaseClassName } from '../hooks';

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
    const baseClassName = useBaseClassName();
    const modeValue = ref(props.mode);
    const handleModeChange = (v: string) => props.onModeChange(v);
    watch(
      () => props.mode,
      v => (modeValue.value = v),
    );
    return {
      baseClassName,
      modeValue,
      handleModeChange,
    };
  },
  render() {
    if (this.colorModes?.length === 1) {
      return null;
    }
    const { baseClassName } = this;
    return (
      <div class={`${baseClassName}__head`}>
        <div class={`${baseClassName}__mode`}>
          {this.colorModes?.length === 1
            ? (
                COLOR_MODES[this.colorModes[0]]
              )
            : (
              <TRadioGroup
                variant="default-filled"
                size="small"
                v-model={this.modeValue}
                onChange={this.handleModeChange}
              >
                {Object.keys(COLOR_MODES).map(key => (
                  <TRadioButton key={key} value={key}>
                    {COLOR_MODES[key]}
                  </TRadioButton>
                ))}
              </TRadioGroup>
              )}
        </div>
      </div>
    );
  },
});
