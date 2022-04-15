import { defineComponent } from 'vue';
import { RoundIcon, ChevronLeftIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';

import TButton from '../../button/button';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';

export default defineComponent({
  name: 'TDatePickerHeader',
  components: {
    TButton,
    RoundIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    year: Number,
    month: Number,
    type: {
      type: String,
      default: 'date',
      validator: (v: string) => ['year', 'month', 'date'].indexOf(v) > -1,
    },
    onBtnClick: Function,
    onTypeChange: Function,
  },
  setup() {
    const COMPONENT_NAME = usePrefixClass('date-picker__header');
    const { global } = useConfig('datePicker');
    return {
      global,
      COMPONENT_NAME,
    };
  },
  render() {
    const { COMPONENT_NAME } = this;
    const { type, year, month, onBtnClick, onTypeChange } = this.$props;
    const startYear = parseInt((this.year / 10).toString(), 10) * 10;
    const { rangeSeparator, yearAriaLabel, now, preMonth, preYear, nextMonth, nextYear, preDecade, nextDecade } =
      this.global;
    let preLabel;
    let nextLabel;
    if (type === 'year') {
      preLabel = preDecade;
      nextLabel = nextDecade;
    } else if (type === 'date') {
      preLabel = preMonth;
      nextLabel = nextMonth;
    } else {
      preLabel = preYear;
      nextLabel = nextYear;
    }
    return (
      <div class={COMPONENT_NAME}>
        <span class={`${COMPONENT_NAME}-title`}>
          {type === 'year' && (
            <span>
              <span>{startYear}</span>
              {rangeSeparator}
              <span>{startYear + 9}</span>
            </span>
          )}
          {type !== 'year' && (
            <t-button class={`${COMPONENT_NAME}-btn`} variant="text" size="small" onClick={() => onTypeChange('year')}>
              {`${year} ${yearAriaLabel}`}
            </t-button>
          )}
          {type === 'date' && (
            <t-button class={`${COMPONENT_NAME}-btn`} variant="text" size="small" onClick={() => onTypeChange('month')}>
              {this.global.months[month]}
            </t-button>
          )}
        </span>

        <span class={`${COMPONENT_NAME}-controller`}>
          <t-button
            class={`${COMPONENT_NAME}-controller__btn`}
            variant="text"
            onClick={() => onBtnClick(-1)}
            title={preLabel}
            v-slots={{
              icon: () => <chevron-left-icon />,
            }}
          />
          <t-button
            class={[`${COMPONENT_NAME}-controller__btn`, `${COMPONENT_NAME}-controller__btn--now`]}
            variant="text"
            onClick={() => onBtnClick(0)}
            title={now}
            v-slots={{
              icon: () => <round-icon />,
            }}
          />
          <t-button
            class={`${COMPONENT_NAME}-controller__btn`}
            variant="text"
            onClick={() => onBtnClick(1)}
            title={nextLabel}
            v-slots={{
              icon: () => <chevron-right-icon />,
            }}
          />
        </span>
      </div>
    );
  },
});
