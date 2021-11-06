import { defineComponent } from 'vue';
import TButton from '../../button/button';
import TIconRound from '../../icon/round';
import TIconChevronLeft from '../../icon/chevron-left';
import TIconChevronRight from '../../icon/chevron-right';
import mixins from '../../utils/mixins';
import getLocalReceiverMixins from '../../locale/local-receiver';
import props from './header-props';
import { prefix } from '../../config';

const name = `${prefix}-date-picker-header`;
export default defineComponent({
  name,
  ...mixins(getLocalReceiverMixins('datePicker')),
  components: {
    TButton,
    TIconChevronLeft,
    TIconChevronRight,
    TIconRound,
  },
  props,
  render() {
    const {
      type, year, month, onBtnClick, onTypeChange,
    } = this;
    const startYear = parseInt((this.year / 10).toString(), 10) * 10;
    const {
      rangeSeparator, yearAriaLabel, monthAriaLabel, now, preMonth, preYear, nextMonth, nextYear, preDecade, nextDecade,
    } = this.locale;
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
      <div class={`${prefix}-date-picker-header`}>
        <span class={`${prefix}-date-picker-header-title`}>
          {
            type === 'year' && (
              <span>
                <span>
                  {startYear}
                </span>
                  {rangeSeparator}
                <span>
                  {startYear + 9}
                </span>
              </span>
            )
          }
          {
            type !== 'year' && (
              <t-button
                class={`${prefix}-date-header__btn`}
                variant="text"
                size="small"
                onClick={() => onTypeChange('year')}
              >
                { `${year} ${yearAriaLabel}`}
              </t-button>
            )
          }
          {
            type === 'date' && (
              <t-button
                class={`${prefix}-date-header__btn`}
                variant="text"
                size="small"
                onClick={() => onTypeChange('month')}
              >
                { `${month === 12 ? 1 : month + 1} ${monthAriaLabel}`}
              </t-button>
            )
          }
        </span>

        <span class={`${prefix}-date-picker-header-controller`}>
          <t-button
            class={`${prefix}-date-picker-header-controller__btn`}
            variant="text" onClick={() => onBtnClick(-1)}
            title={preLabel}
            v-slots={{
              icon: () => <t-icon-chevron-left />,
            }} />
          <t-button
            class={[`${prefix}-date-picker-header-controller__btn`, `${prefix}-date-picker-header-controller__btn--now`]}
            variant="text"
            onClick={() => onBtnClick(0)}
            title={now}
            v-slots={{
              icon: () => <t-icon-round />,
            }}
          />
          <t-button
            class={`${prefix}-date-picker-header-controller__btn`}
            variant="text"
            onClick={() => onBtnClick(1)}
            title={nextLabel}
            v-slots={{
              icon: () => <t-icon-chevron-right />,
            }}
          />
        </span>
      </div>
    );
  },
});
