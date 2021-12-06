import { defineComponent, PropType } from 'vue';
import TDateHeader from '../basic/header';
import TDateTable from '../basic/table';
import { prefix } from '../../config';
import props from '../props';
import { TdDatePickerProps } from '../type';
import { DatePickerConfig } from '../../config-provider/config-receiver';

import {
  getWeeks,
  getYears,
  getMonths,
  flagActive,
  subtractMonth,
  addMonth,
  getToday,
  firstUpperCase,
  OptionsType,
} from '../utils';

const name = `${prefix}-date-picker-panel`;

export default defineComponent({
  name,
  components: {
    TDateHeader,
    TDateTable,
  },
  inheritAttrs: false,
  props: {
    global: {
      type: Object as PropType<DatePickerConfig>,
      default: () => {
        return {} as DatePickerConfig;
      },
    },
    value: {
      type: Date,
      default: () => getToday(),
    },
    mode: props.mode,
    minDate: Date,
    maxDate: Date,
    firstDayOfWeek: props.firstDayOfWeek,
    disableDate: props.disableDate,
    onChange: props.onChange,
  },
  emits: ['change'],
  data() {
    return {
      year: this.value.getFullYear(),
      month: this.value.getMonth(),
      type: this.mode,
    };
  },
  computed: {
    tableData() {
      const { year, month, type, value, mode, disableDate, minDate, maxDate, firstDayOfWeek, global } = this;
      let data;
      const options: OptionsType = {
        disableDate,
        minDate,
        maxDate,
        firstDayOfWeek,
        monthLocal: global.months,
      };

      switch (type) {
        case 'date':
          data = getWeeks({ year, month }, options);
          break;
        case 'month':
          data = getMonths(year, options);
          break;
        case 'year':
          data = getYears(year, options);
          break;
        default:
          break;
      }
      const start = type === 'date' || type === mode ? value : new Date(year, month);
      return flagActive(data, { start, type });
    },
  },
  watch: {
    mode(value) {
      this.type = value;
    },
    value(value) {
      this.year = value.getFullYear();
      this.month = value.getMonth();
    },
  },
  methods: {
    getClickHandler(): Function {
      return this[`click${firstUpperCase(this.type)}`];
    },
    clickDate(date: Date) {
      this.$emit('change', date);
    },
    clickMonth(date: Date) {
      if (this.mode === 'month') {
        this.$emit('change', date);
      } else {
        this.type = 'date';
        this.year = date.getFullYear();
        this.month = date.getMonth();
      }
    },
    clickYear(date: Date) {
      if (this.mode === 'year') {
        this.$emit('change', date);
      } else {
        this.type = 'month';
        this.year = date.getFullYear();
      }
    },
    clickHeader(flag: number) {
      let monthCount = 0;
      let next = null;
      switch (this.type) {
        case 'date':
          monthCount = 1;
          break;
        case 'month':
          monthCount = 12;
          break;
        case 'year':
          monthCount = 120;
      }

      const current = new Date(this.year, this.month);

      switch (flag) {
        case 1:
          next = addMonth(current, monthCount);
          break;
        case -1:
          next = subtractMonth(current, monthCount);
          break;
        case 0:
          next = new Date();
          break;
      }

      this.year = next.getFullYear();
      this.month = next.getMonth();
    },
    onTypeChange(type: TdDatePickerProps['mode']) {
      this.type = type;
    },
  },
  render() {
    const { year, month, type, tableData, firstDayOfWeek } = this;
    return (
      <div class={`${prefix}-date`}>
        <t-date-header
          year={year}
          month={month}
          type={type}
          onBtnClick={this.clickHeader}
          onTypeChange={this.onTypeChange}
        />
        <t-date-table
          type={type}
          firstDayOfWeek={firstDayOfWeek}
          data={tableData}
          onCellClick={this.getClickHandler()}
        />
      </div>
    );
  },
});
