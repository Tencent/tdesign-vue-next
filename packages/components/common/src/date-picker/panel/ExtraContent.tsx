import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent } from '@td/adapter-vue';
import type { TdDatePickerProps, TdDateRangePickerProps } from '@td/intel/date-picker/type';
import TDateFooter from '../base/Footer';

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
      showPanelFooter.value
        ? (
          <TDateFooter
            presets={props.presets}
            onPresetClick={props.onPresetClick}
            enableTimePicker={props.enableTimePicker}
            onConfirmClick={props.onConfirmClick}
            presetsPlacement={props.presetsPlacement}
            selectedValue={props.selectedValue}
          />
          )
        : null;
  },
});
