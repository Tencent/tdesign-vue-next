import { defineComponent, PropType } from 'vue';
import TDateFooter from '../base/Footer';
import type { TdDatePickerProps, TdDateRangePickerProps, DateValue } from '../type';

export default defineComponent({
  name: 'TExtraContent',
  components: {
    TDateFooter,
  },
  props: {
    presets: Object as PropType<TdDatePickerProps['presets'] | TdDateRangePickerProps['presets']>,
    enableTimePicker: Boolean as PropType<TdDatePickerProps['enableTimePicker']>,
    presetsPlacement: String as PropType<TdDatePickerProps['presetsPlacement']>,
    onPresetClick: Function,
    onConfirmClick: Function,
    selectedValue: String as PropType<DateValue>,
  },
  setup(props) {
    const showPanelFooter = props.enableTimePicker || props.presets;

    return () =>
      showPanelFooter ? (
        <t-date-footer
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
