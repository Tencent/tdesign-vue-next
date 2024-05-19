import { defineComponent, PropType, computed } from 'vue';
import TDateFooter from '../base/Footer';
import type { TdDatePickerProps, TdDateRangePickerProps } from '../type';

export default defineComponent({
  name: 'TExtraContent',
  props: {
    presets: Object as PropType<TdDatePickerProps['presets'] | TdDateRangePickerProps['presets']>,
    enableTimePicker: Boolean as PropType<TdDatePickerProps['enableTimePicker']>,
    presetsPlacement: String as PropType<TdDatePickerProps['presetsPlacement']>,
    onPresetClick: Function,
    onConfirmClick: Function,
    selectedValue: [String, Number, Array, Date] as PropType<TdDatePickerProps['value']>,
  },
  setup(props) {
    const showPanelFooter = computed(() => props.enableTimePicker || props.presets);

    return () =>
      showPanelFooter.value ? (
        <TDateFooter
          presets={props.presets}
          onPresetClick={props.onPresetClick}
          enableTimePicker={props.enableTimePicker}
          onConfirmClick={props.onConfirmClick}
          presetsPlacement={props.presetsPlacement}
          selectedValue={props.selectedValue}
        />
      ) : null;
  },
});
