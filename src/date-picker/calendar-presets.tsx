import { PropType, defineComponent } from 'vue';
import { DatePickerConfig } from '../config-provider';
import { CalendarPresetsProps, DateValue } from './interface';
import { usePrefixClass } from '../hooks/useConfig';

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
    onClick: Function,
  },
  setup() {
    const COMPONENT_NAME = usePrefixClass('date-picker__presets');
    return {
      COMPONENT_NAME,
    };
  },
  methods: {
    clickPreset(value: DateValue | (() => DateValue)) {
      this.onClick(value);
    },
  },
  render() {
    const { presets } = this;
    return (
      <div class={this.COMPONENT_NAME}>
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
