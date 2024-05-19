import { defineComponent, computed } from 'vue';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import TButton from '../../button';

export default defineComponent({
  name: 'TDatePickerTable',
  props: {
    enableTimePicker: Boolean,
    presetsPlacement: String,
    presets: Object,
    selectedValue: [Date, String, Number],
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
        {props.enableTimePicker && (
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
