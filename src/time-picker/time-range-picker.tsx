import { defineComponent, nextTick } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';
import { TimeIcon } from 'tdesign-icons-vue-next';

import { TimeInputEvent, InputTime, TimePickerPanelInstance } from './interface';
import TPopup, { PopupVisibleChangeContext } from '../popup';
import PickerPanel from './panel/time-picker-panel';
import TInput from '../input';
import props from './time-range-picker-props';
import { emitEvent } from '../utils/event';

import {
  EPickerCols,
  TIME_PICKER_EMPTY,
  EMPTY_VALUE,
  PRE_MERIDIEM_FORMAT,
  POST_MERIDIEM_FORMAT,
  AM,
} from '../_common/js/time-picker/const';

import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'TTimeRangePicker',

  components: {
    PickerPanel,
    TimeIcon,
    TPopup,
    TInput,
  },
  props: { ...props },

  setup() {
    const COMPONENT_NAME = usePrefixClass('time-picker');
    const { SIZE, STATUS } = useCommonClassName();
    const { global } = useConfig('timePicker');

    return <div>1</div>;
  },
});
