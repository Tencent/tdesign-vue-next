import { defineComponent, nextTick } from 'vue';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import TIconCalendar from '../icon/calendar';
import TIconTime from '../icon/time';
import TIconClose from '../icon/close';

import { prefix } from '../config';
import props from './props';
import CLASSNAMES from '../utils/classnames';

import { Button as TButton } from '../button';
import { Input as TInput } from '../input';
import TPopup from '../popup';
import mixins from '../utils/mixins';
import getLocalReceiverMixins from '../locale/local-receiver';

import { CustomLocale, DateValue } from './interface';
import TCalendarPresets from './calendar-presets';
import TDate from './panel/date';
import TDateRange from './panel/date-range';
import TTimePickerPanel from '../time-picker/panel';
import { EPickerCols } from '../time-picker/constant';
import { firstUpperCase, extractTimeFormat } from './utils';

dayjs.extend(isBetween);

const name = `${prefix}-date-picker`;

export default defineComponent({
  ...mixins(getLocalReceiverMixins('datePicker')),
  name,
  components: {
    TIconTime,
    TIconCalendar,
    TIconClose,
    TPopup,
    TButton,
    TInput,
    TCalendarPresets,
    TDate,
    TDateRange,
    TTimePickerPanel,
  },
  props,
  emits: ['input', 'open', 'close', 'focus', 'click', 'change'],
  data() {
    return {
      tempValue: '' as string | number | dayjs.Dayjs | Date,
      locales: {} as CustomLocale,
      monthDate: new Date(),
      start: new Date(),
      end: new Date(),
      selectedDates: [],
      inSelection: false,
      inline: false,
      dateFormat: '',
      multiSeparator: ',',
      inlineView: false,
      showTime: false,
      isOpen: false,
      startTimeValue: dayjs(),
      endTimeValue: dayjs(),
    };
  },
  computed: {
    startText(): string {
      return this.formatDate(this.start as Date);
    },
    endText(): string {
      return this.formatDate(this.end as Date);
    },
    formattedValue: {
      get() {
        const {
          tempValue, range, mode, isOpen, startText, endText, locales, value: outValue,
        } = this;
        const selectedDates = this.getDates(outValue);
        const selectedFmtDates: string[] = selectedDates.map((d: Date) => this.formatDate(d));

        if (tempValue) {
          return tempValue;
        }

        const strMode: string = range ? 'range' : mode;
        let value = '';

        switch (strMode) {
          case 'time':
          case 'date':
          case 'month':
          case 'year':
            value = selectedFmtDates.join('');
            break;
          case 'range':
            if (isOpen) {
              value = [startText, endText].join(locales.rangeSeparator);
            } else if (selectedFmtDates.length > 1) {
              value = [selectedFmtDates[0], selectedFmtDates[1]].join(locales.rangeSeparator);
            }
            break;
        }

        return value;
      },
      set(value: dayjs.ConfigType) {
        const { min, dateFormat } = this;
        if (value) {
          if (String(value).length >= String(this.formatDate(min || new Date())).length && dayjs(value, dateFormat)) {
            this.tempValue = '';
            this.setDate(value, true);
          } else {
            this.tempValue = value;
          }
        }
      },
    },
    rangeText: {
      get() {
        let range = this.startText;
        if (this.range) {
          range += ` ${this.locales.rangeSeparator} ${this.endText}`;
        }
        return range;
      },
      set(value: any) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        if (this.value) {
          this.setDate(value, false);
        }
      },
    },
    min() {
      const disableDate: any = this.disableDate || {};
      const { before } = disableDate;
      return before ? new Date(before) : null;
    },
    max() {
      const disableDate: any = this.disableDate || {};
      const { after } = disableDate;
      return after ? new Date(after) : null;
    },
    classes(): any {
      return [
        name,
        `${prefix}-input`,
        CLASSNAMES.SIZE[this.size] || '',
        {
          [`${name}--month-picker`]: this.mode === 'year' || this.mode === 'month',
          [`${prefix}-inline`]: this.inline || this.inlineView,
        },
      ];
    },
    pickerStyles() {
      return {
        [`${name}--container`]: true,
        [`${name}--open`]: this.isOpen || this.inlineView,
        [`${name}--calendar-inline-view`]: this.inlineView,
        [`${name}--ranges-show`]: !!this.presets && this.range,
        [`${name}--date`]: this.mode === 'date',
      };
    },
  },
  mounted() {
    this.attachDatePicker();
  },
  methods: {
    handleTimePick(col: EPickerCols, time: number, index: number) {
      if (!this.range || index === 0) {
        const start = new Date(this.start);
        start[`set${firstUpperCase(col)}s`](time);
        this.start = start;
        this.startTimeValue = dayjs(start);
        this.dateClick(new Date(start));
      } else {
        const end = new Date(this.end);
        end[`set${firstUpperCase(col)}s`](time);
        this.end = end;
        this.endTimeValue = dayjs(end);
        this.dateClick(new Date(end));
      }
    },
    attachDatePicker(): any {
      // language init
      this.setLocales();

      const startDate: Date = new Date();
      const endDate: Date = new Date();

      this.dateFormat = this.format;

      const start = new Date(startDate);
      let end = new Date(endDate);

      if (!this.range) {
        // ignore endDate for not range DatePicker
        end = new Date(startDate);
      }

      this.start = start;
      this.end = end;

      const val = this.value || this.defaultValue || '';
      this.setDate(val, false);
      if (this.inlineView) {
        this.open();
      }
    },
    getLocales(): CustomLocale {
      const locales = this.locale as Record<string, any>;
      locales.daysOfWeek = locales.weekdays.shorthand;
      locales.monthNames = locales.months.shorthand;

      if (this.mode === 'month') {
        locales.monthNames = locales.months.longhand;
      }

      // update day names order to firstDay
      if (locales.firstDayOfWeek !== 0) {
        let iterator = locales.firstDayOfWeek;
        while (iterator > 0) {
          locales.daysOfWeek.push(locales.daysOfWeek.shift());
          iterator -= 1;
        }
      }
      return locales;
    },
    setLocales() {
      const locales = this.getLocales();
      this.locales = locales;
    },
    /**
     * Watch for value changed by date-picker itself and notify parent component
     *
     * @param event
     */
    onNativeInput(event?: any): void {
      const val: any = event.target.value;
      this.formattedValue = val;
      const d1: any = this.parseDate(val);

      if (d1 instanceof Date) {
        const d2: string = this.formatDate(d1);
        this.$emit('input', d2);
      }
    },
    onNativeFocus(event?: MouseEvent): void {
      if (!this.isOpen) {
        this.open();
      }
      this.$emit('focus', event);
    },
    onClick(event?: MouseEvent): void {
      if (!this.isOpen) {
        this.open();
      }
      this.$emit('click', event);
    },

    normalizeDateTime(value: Date, oldValue: Date): Date {
      const newDate = dayjs(value);
      const oldDate = dayjs(oldValue);
      if (this.enableTimePicker) {
        newDate.hour(oldDate.hour());
        newDate.minute(oldDate.minute());
        newDate.second(oldDate.second());
        newDate.millisecond(oldDate.millisecond());
      }

      return newDate.toDate();
    },

    dateClick(value: Date) {
      // @todo add year range and month range
      let mode = this.range ? 'range' : this.mode;

      const start = this.start as Date;
      const end = this.end as Date;

      if (this.showTime) {
        mode = 'time';
      }

      switch (mode) {
        case 'time':
          this.selectedDates = this.range ? [this.start, this.end] : [value];
          this.clickedApply(false);
          break;
        case 'year':
        case 'month':
        case 'date':
          this.start = this.normalizeDateTime(value, start);
          this.selectedDates = [this.start];
          // 有时间选择时，点击日期不关闭弹窗
          this.clickedApply(!this.enableTimePicker);
          break;
        case 'range':
          if (this.inSelection) {
            this.inSelection = false;
            this.start = this.normalizeDateTime(value[0], end);
            this.end = this.normalizeDateTime(value[1], end);

            if (this.end < this.start) {
              this.inSelection = true;
              this.start = this.normalizeDateTime(value[0], start);
            }
          } else {
            this.start = this.normalizeDateTime(value[0], start);
            this.end = this.normalizeDateTime(value[1], end);
            this.inSelection = true;
          }
          // 有时间选择时，点击日期不关闭弹窗
          this.clickedApply(!this.enableTimePicker);
          break;
      }
    },
    toggle() {
      if (!this.disabled) {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }
    },
    open() {
      if (!this.disabled) {
        const { formattedValue } = this;
        // set default value;
        if (formattedValue) {
          this.setDate(formattedValue);
        }
        this.tempValue = '';
        // open
        this.isOpen = true;
        nextTick().then(() => {
          this.$emit('open', this.selectedDates);
        });
      }
    },
    close() {
      if (!this.disabled) {
        this.tempValue = '';
        this.isOpen = false;
        this.showTime = false;
        this.$emit('close', this.selectedDates);
      }
    },
    clickedApply(closePicker = true): void {
      if (this.range) {
        this.selectedDates = [this.start, this.end];
      }

      const selectedDates = this.selectedDates.map((d: Date) => {
        const fd = this.formatDate(d);
        return fd;
      });
      // submit formate date
      this.submitInput(selectedDates, true);

      if (closePicker) {
        this.close();
      }
    },
    toggleTime() {
      this.timeValue = dayjs(this.start as Date);
      this.endTimeValue = dayjs(this.end as Date);

      this.showTime = !this.showTime;

      this.$nextTick(() => {
        const timePickerPanel = this.$refs.timePickerPanel as any;
        timePickerPanel && timePickerPanel.panelColUpdate();
      });
    },

    clickRange(value: DateValue) {
      if (Array.isArray(value)) {
        const [start, end] = value as dayjs.ConfigType[];
        this.start = dayjs(start).toDate();
        this.end = dayjs(end || start).toDate();
        this.monthDate = dayjs(start).toDate();
      } else {
        this.start = dayjs(value).toDate();
        this.end = dayjs(value).toDate();
        this.monthDate = dayjs(value).toDate();
      }
      this.clickedApply();
    },
    clear(triggerChange = false, e?: MouseEvent): void {
      if (e && e.stopPropagation) {
        e && e.stopPropagation();
      }

      // close picker
      this.close();

      // set value
      if (!this.disabled) {
        const selectedDates: any[] = [];
        this.selectedDates = selectedDates;
        this.formattedValue = '';
        this.submitInput(selectedDates, triggerChange);
      }
    },
    submitInput(selectedDates: any[], triggerChange = true) {
      const { multiSeparator } = this;
      const mode = this.range ? 'range' : this.mode;

      switch (mode) {
        case 'date':
        case 'month':
        case 'year':
          // submit formate date
          this.$emit('input', selectedDates.join(multiSeparator));
          if (triggerChange) {
            this.$emit('change', selectedDates.join(multiSeparator));
          }
          break;
        case 'range':
          // submit formate date
          this.$emit('input', selectedDates);
          if (triggerChange) {
            this.$emit('change', selectedDates);
          }
          break;
      }
    },
    parseDate(value: any = '', format = ''): Date | boolean {
      if (value instanceof Date) {
        return new Date(value);
      }
      if (format) {
        const oDate: dayjs.Dayjs = dayjs(value, format);
        if (oDate.isValid()) {
          return new Date(oDate.toDate());
        }
        return false;
      }

      const d2: dayjs.Dayjs = dayjs(value);
      if (d2.isValid()) {
        return new Date(d2.toDate());
      }
      return false;
    },
    isEnabled(value: Date): boolean {
      const {
        min, max, disableDate, dateFormat,
      } = this;
      if (!disableDate) {
        return true;
      }
      // 值类型为 Function 则表示返回值为 true 的日期会被禁用
      if (typeof disableDate === 'function') {
        return !disableDate(value);
      }

      // 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。
      if (Array.isArray(disableDate)) {
        let isIncludes = false;
        const formatedDisabledDate = disableDate.map((item: string) => dayjs(item, dateFormat));
        formatedDisabledDate.forEach((item) => {
          if (item.isSame(dayjs(value))) {
            isIncludes = true;
          }
        });
        return !isIncludes;
      }

      // { before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。
      if (max && min) {
        const compareMin = dayjs(new Date(min)).startOf('day');
        const compareMax = dayjs(new Date(max)).startOf('day');

        // check min
        return dayjs(value).isBetween(compareMin, compareMax, null, '[]');
      }

      // { from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。
      const { from, to }: { from?: Date; to?: Date } = disableDate;
      if (from && to) {
        const compareMin = dayjs(new Date(from)).startOf('day');
        const compareMax = dayjs(new Date(to)).startOf('day');

        // check min
        return !dayjs(value).isBetween(compareMin, compareMax, null, '[]');
      }

      return true;
    },
    setDate(inputDate: any = '', triggerChange = false): void {
      if ((inputDate !== 0 && !inputDate) || (inputDate instanceof Array && inputDate.length === 0)) {
        return this.clear(triggerChange);
      }

      const selectedDates = this.getDates(inputDate);

      this.selectedDates = selectedDates;
      if (selectedDates.length > 0) {
        const [start, end] = selectedDates;
        this.start = start;
        this.end = end || start;
      }
    },
    getDates(inputDate: any = ''): Date[] {
      if ((inputDate !== 0 && !inputDate) || (inputDate instanceof Array && inputDate.length === 0)) {
        return [];
      }

      const format = this.dateFormat || '';

      let dates: any[] = [];
      if (inputDate instanceof Array) {
        dates = inputDate.map((d) => {
          const d1 = this.parseDate(d, format);
          return d1;
        });
      } else if (inputDate instanceof Date || typeof inputDate === 'number') {
        dates = [this.parseDate(inputDate, format)];
      } else if (typeof inputDate === 'string') {
        const mode = this.range ? 'range' : this.mode;

        switch (mode) {
          case 'date':
          case 'month':
          case 'year':
            dates = [this.parseDate(inputDate, format)];
            break;

          case 'range':
            dates = inputDate.split(this.locales.rangeSeparator || '-').map((d) => {
              const d1 = this.parseDate(d, format);
              return d1;
            });

            break;

          default:
            break;
        }
      }
      const selectedDates = dates.filter((d) => {
        const isEnable = d instanceof Date && this.isEnabled(d);
        return isEnable;
      });
      selectedDates.sort((a, b) => a.getTime() - b.getTime());

      return selectedDates;
    },
    formatDate(date: Date, format = ''): string {
      let dateFormat = format || this.dateFormat || this.locales.format;
      const arrTime = ['H', 'h', 'm', 's'];
      const hasTime = arrTime.some((f) => String(dateFormat).includes(f));
      if (this.enableTimePicker && !hasTime) {
        dateFormat = [dateFormat, 'HH:mm:ss'].join(' ');
      }
      const d1 = new Date(date);
      return dayjs(d1).format(dateFormat);
    },

    getPlaceholderText() {
      const { placeholder, mode } = this.$props;

      return placeholder || (this.locales.placeholder && this.locales.placeholder[mode]);
    },
  },
  render() {
    // props
    const {
      popupProps,
      disabled,
      clearable,
      allowInput,
      size,
      inputProps,
      enableTimePicker,
      presets,
      mode,
      range,
    } = this;

    // data
    const {
      start, end, showTime, startTimeValue, locales, isOpen, endTimeValue,
    } = this;

    const panelProps = {
      value: range ? [start, end] : start,
      mode,
      firstDayOfWeek: 0,
      disableDate: (d: Date) => !this.isEnabled(d),
      onChange: this.dateClick,
    };

    const panelComponent = range ? (
      <t-date-range {...panelProps} />
    ) : (
      <t-date {...panelProps} />
    );

    const popupContent = () => (
      <div ref="dropdownPopup" class={this.pickerStyles}>
        {enableTimePicker && showTime && (
          <div>
            <TTimePickerPanel
              ref="timePickerPanel"
              format={extractTimeFormat(this.dateFormat) || 'HH:mm:ss'}
              cols={[EPickerCols.hour, EPickerCols.minute, EPickerCols.second]}
              steps={[1, 1, 1]}
              value={!range ? [startTimeValue] : [startTimeValue, endTimeValue]}
              onTimePick={this.handleTimePick}
              isShowPanel={showTime}
              isFooterDisplay={false}
            />
            {range && (<TTimePickerPanel
              format="HH:mm:ss"
              cols={[EPickerCols.hour, EPickerCols.minute, EPickerCols.second]}
              steps={[1, 1, 1]}
              value={[endTimeValue]}
              onTimePick={this.handleEndTimePick}
              isShowPanel={showTime}
              isFooterDisplay={false}
            />)}
          </div>)
        }
        {!showTime && panelComponent}
        {presets && range && (
          <TCalendarPresets presets={presets} locales={locales} onClickRange={this.clickRange} />
        )}
        {enableTimePicker && (
          <div class={`${name}--apply`}>
            {enableTimePicker && (
              <t-button theme="primary" variant="text" onClick={this.toggleTime}>
                {showTime ? locales.selectDate : locales.selectTime}
              </t-button>
            )}
            {<t-button theme="primary" onClick={this.clickedApply}>
              {locales.confirm}
            </t-button>}
          </div>
        )}
      </div>
    );
    const inputClassNames = [
      `${prefix}-form-controls`,
      {
        [CLASSNAMES.STATUS.active]: this.isOpen,
      },
    ];
    return (
      <div class={this.classes}>
        <t-popup
          ref="popup"
          class={`${name}-popup-reference`}
          trigger="click"
          placement="bottom-left"
          disabled={disabled}
          showArrow={false}
          visible={isOpen}
          popupProps={popupProps}
          overlayClassName={name}
          content={popupContent}
          expandAnimation={true}
          onVisibleChange={(visible: boolean, context: {
            trigger: string,
          }) => {
            if (context.trigger === 'document') {
              this.toggle();
            }
          }}
        >
          <div class={inputClassNames} onClick={this.toggle}>
            <t-input
              ref="native"
              v-model={this.formattedValue}
              disabled={disabled}
              clearable={clearable}
              placeholder={this.getPlaceholderText()}
              readonly={!allowInput}
              allowInput={allowInput ? 1 : 0}
              size={size}
              inputProps={inputProps}
              onClear={(context: any) => this.clear(true, context.e)}
              focus={this.onNativeFocus}
              input={this.onNativeInput}
              click={this.onClick}
              suffixIcon={() => enableTimePicker ? <TIconTime /> : <TIconCalendar />}
            >
            </t-input>
          </div>
        </t-popup>
      </div>
    );
  },
});
