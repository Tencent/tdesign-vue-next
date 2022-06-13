import { defineComponent } from 'vue';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import TButton from '../../button';

export default defineComponent({
  name: 'TDatePickerTable',
  props: {
    enableTimePicker: Boolean,
    presetsPlacement: String,
    presets: Object,
    selectedValue: [Date, String],
    onPresetClick: Function,
    onConfirmClick: Function,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__footer');
    const presetsClass = usePrefixClass('date-picker__presets');
    const { t, global } = useConfig('datePicker');

    const footerClass = [COMPONENT_NAME.value, `${COMPONENT_NAME.value}--${props.presetsPlacement}`];

    return () => (
      <div class={footerClass}>
        {
          <div class={presetsClass.value}>
            {props.presets &&
              Object.keys(props.presets).map((key: string) => (
                <TButton
                  key={key}
                  size="small"
                  variant="text"
                  onClick={(e: MouseEvent) => props.onPresetClick?.(props.presets[key], { e })}
                >
                  {key}
                </TButton>
              ))}
          </div>
        }
        {props.enableTimePicker && (
          <TButton
            disabled={!props.selectedValue}
            size="small"
            theme="primary"
            onClick={(e: MouseEvent) => props.onConfirmClick?.({ e })}
          >
            {t(global.value.confirm)}
          </TButton>
        )}
      </div>
    );
  },
});
