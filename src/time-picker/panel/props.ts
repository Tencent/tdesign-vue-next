import moment from 'moment';
import { BooleanType } from '../props';
import * as Props from '../props';
import { EPickerCols } from '../constant';
import { PropType } from 'vue';

const ElementRefType = {
  type: typeof Element === 'undefined' ? Object : Element,
  ...({
    default: null,
  }),
};

export const panelProps = () => ({
  disabled: {
    ...BooleanType,
    ...({
      default: false,
    }),
  },
  isFocus: {
    ...BooleanType,
    ...({
      default: false,
    }),
  },
  refDom: {
    ...ElementRefType,
  },
  moment: {
    type: Array as PropType<Array<moment.Moment | undefined>>,
    default: () => [moment()] as Array<moment.Moment | undefined>,
  },
  range: {
    type: Array as PropType<Array<moment.Moment>>,
    default: () => [] as Array<moment.Moment>,
  },
  format: {
    type: String,
    default: 'a HH:mm:ss',
  },
  steps: {
    type: Array as PropType<Array<string | number>>,
    ...({
      default: [1, 1, 1],
    }),
  },
  isShowPanel: {
    ...BooleanType,
    ...({
      default: false,
    }),
  },
  hideDisabledTime: {
    ...Props.default.hideDisabledTime,
  },
  disableTime: {
    ...Props.default.disableTime,
  },
});


export const panelColProps = () => ({
  format: {
    type: String,
    default: 'a HH:mm:ss',
  },
  cols: {
    type: Array as PropType<Array<EPickerCols>>,
    default: () => [EPickerCols.zh, EPickerCols.hour, EPickerCols.minute, EPickerCols.second],
  },
  value: {
    type: Object as PropType<moment.Moment>,
    ...({
      default: undefined,
    }),
  },
  range: {
    type: Array as PropType<Array<moment.Moment>>,
    default: () => [] as Array<moment.Moment>,
  },
  steps: {
    type: Array as PropType<Array<string | number>>,
    ...({
      default: [1, 1, 1],
    }),
  },
  hideDisabledTime: {
    ...Props.default.hideDisabledTime,
  },
  disableTime: {
    ...Props.default.disableTime,
  },
});
