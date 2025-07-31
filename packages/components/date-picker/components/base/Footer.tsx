import { defineComponent, computed, PropType } from 'vue';
import { useConfig, usePrefixClass } from '@tdesign/shared-hooks';
import TButton from '../../../button';

import type { TdDatePickerProps } from '../../type';

export default defineComponent({
  name: 'TDatePickerTable',
  props: {
    enableTimePicker: Boolean,
    presetsPlacement: String,
    presets: Object,
    needConfirm: Boolean,
    selectedValue: [String, Number, Array, Date] as PropType<TdDatePickerProps['value']>,
    onPresetClick: Function,
    onConfirmClick: Function,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__footer');
    const presetsClass = usePrefixClass('date-picker__presets');
    const { t, globalConfig } = useConfig('datePicker');

    const footerClass = computed(() => [COMPONENT_NAME.value, `${COMPONENT_NAME.value}--${props.presetsPlacement}`]);

    return () => (
      <div class={footerClass.value}>
        {
          <div class={presetsClass.value}>
            {props.presets &&
              Object.keys(props.presets).map((key: string) => (
                <TButton
                  key={key}
                  size="small"
                  variant="text"
                  onClick={(e: MouseEvent) =>
                    props.onPresetClick?.(props.presets[key], { e, preset: { [key]: props.presets[key] } })
                  }
                >
                  {key}
                </TButton>
              ))}
          </div>
        }
        {props.enableTimePicker && props.needConfirm && (
          <TButton
            disabled={!props.selectedValue}
            size="small"
            theme="primary"
            onClick={(e: MouseEvent) => props.onConfirmClick?.({ e })}
          >
            {t(globalConfig.value.confirm)}
          </TButton>
        )}
      </div>
    );
  },
});
