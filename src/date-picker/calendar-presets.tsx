import isFunction from 'lodash/isFunction';
import { PropType, defineComponent } from 'vue';
import { DatePickerConfig } from '../config-provider/config-receiver';
import { CalendarPresetsProps, DateValue, TdDatePickerProps } from './interface';
import { prefix } from '../config';

import { Button as TButton } from '../button';

export default defineComponent({
  name: 'TCalendarPresets',
  components: {
    TButton,
  },
  props: {
    global: {
      type: Object as PropType<DatePickerConfig>,
    },
    presets: {
      type: Object as PropType<CalendarPresetsProps['presets']>,
    },
  },
  emits: ['click-range'],
  methods: {
    clickPreset(value: DateValue | (() => DateValue)) {
      if (isFunction(value)) {
        this.$emit('click-range', value());
      } else {
        this.$emit('click-range', value);
      }
    },
  },
  render() {
    const { presets } = this;
    return (
      <div class={`${prefix}-date-picker-presets`}>
        <ul>
          {presets &&
            Object.keys(presets).map((key: string) => (
              <li key={key}>
                <a onClick={() => this.clickPreset(presets[key])}>{key}</a>
              </li>
            ))}
        </ul>
      </div>
    );
  },
});
