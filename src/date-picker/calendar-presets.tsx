import { PropType, defineComponent } from 'vue';
import { DatePickerConfig } from '../config-provider';
import { CalendarPresetsProps, DateValue } from './interface';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TCalendarPresets',

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
    // 判断是否为日期
    _isDate(obj: any) {
      return obj.$d instanceof Date && !isNaN(obj.valueOf());
    },
    clickPreset(value: DateValue | (() => DateValue)) {
      let dateCheckResult = true;
      if (value instanceof Array) {
        for (let i = 0; i < value.length; i++) {
          if (!this._isDate(value[i])) {
            dateCheckResult = false;
            break;
          }
        }
      } else if (typeof value === 'object') {
        dateCheckResult = this._isDate(value);
      } else {
        dateCheckResult = false;
      }
      if (dateCheckResult) {
        this.onClick(value);
      } else {
        this.$message.info('日期格式错误');
      }
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
