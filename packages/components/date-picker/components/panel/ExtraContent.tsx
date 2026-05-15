import { defineComponent, PropType, computed } from 'vue';
import TDateFooter from '../base/Footer';

import type { TdDatePickerProps, TdDateRangePickerProps } from '../../type';

export default defineComponent({
  name: 'TExtraContent',
  props: {
    presets: Object as PropType<TdDatePickerProps['presets'] | TdDateRangePickerProps['presets']>,
    enableTimePicker: Boolean as PropType<TdDatePickerProps['enableTimePicker']>,
    presetsPlacement: String as PropType<TdDatePickerProps['presetsPlacement']>,
    needConfirm: Boolean,
    onPresetClick: Function,
    onConfirmClick: Function,
    selectedValue: [String, Number, Array, Date] as PropType<TdDatePickerProps['value']>,
  },
  setup(props, { slots }) {
    // 有 presets 对象、presets 插槽、或需要确认按钮时显示 footer
    const showPanelFooter = computed(
      () => (props.enableTimePicker && props.needConfirm) || props.presets || !!slots.presets,
    );

    return () =>
      showPanelFooter.value ? (
        <TDateFooter
          presets={props.presets}
          onPresetClick={props.onPresetClick}
          enableTimePicker={props.enableTimePicker}
          onConfirmClick={props.onConfirmClick}
          presetsPlacement={props.presetsPlacement}
          selectedValue={props.selectedValue}
          needConfirm={props.needConfirm}
          v-slots={{ presets: slots.presets }}
        />
      ) : null;
  },
});
