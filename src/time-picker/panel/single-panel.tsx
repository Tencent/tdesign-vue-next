import { computed, defineComponent, ref, watch, toRefs, onMounted, reactive } from 'vue';
import debounce from 'lodash/debounce';
import range from 'lodash/range';
import padStart from 'lodash/padStart';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { panelColProps } from './props';
import {
  EPickerCols,
  TWELVE_HOUR_FORMAT,
  TIME_FORMAT,
  AM,
  PM,
  MERIDIEM_LIST,
} from '../../_common/js/time-picker/const';
import { closestLookup } from '../../_common/js/time-picker/utils';
import { useConfig } from '../../hooks/useConfig';

dayjs.extend(customParseFormat);

const timeArr = [EPickerCols.hour, EPickerCols.minute, EPickerCols.second];

export default defineComponent({
  name: 'TTimePickerPanelCol',
  props: { ...panelColProps(), position: String, triggerScroll: Object, onChange: Function },

  setup(props) {
    const { steps, value, format, position = 'start', triggerScroll } = toRefs(props);

    const { global } = useConfig('timePicker');

    const { classPrefix } = useConfig();
    const panelClassName = computed(() => `${classPrefix.value}-time-picker__panel`);

    const cols = ref<Array<EPickerCols>>([]);
    const bodyRef = ref();
    const maskRef = ref(null);
    const colsRef = reactive({ 0: null, 1: null, 2: null, 3: null, 4: null, 5: null });
    const dayjsValue = computed(() => {
      const isStepsSet = !!steps.value.filter((v) => v > 1).length;

      if (value.value) return dayjs(value.value, format.value);

      if (isStepsSet) return dayjs().hour(0).minute(0).second(0);

      return dayjs();
    });

    // 面板打开时 触发滚动 初始化面板
    watch(
      () => value.value,
      () => {
        updateTimeScrollPos();
      },
    );

    // 时间通过外部触发时 同样触发滚动
    watch(
      () => triggerScroll.value,
      () => {
        if (triggerScroll.value) {
          updateTimeScrollPos();
        }
      },
    );

    onMounted(() => {
      const match = format.value.match(TIME_FORMAT);

      const [, startCol, hourCol, minuteCol, secondCol, endCol] = match;
      const { meridiem, hour, minute, second } = EPickerCols;

      const renderCol = [
        startCol && meridiem,
        hourCol && hour,
        minuteCol && minute,
        secondCol && second,
        endCol && meridiem,
      ].filter((v) => !!v);

      cols.value = renderCol;
    });

    // 获取每个时间的高度
    const getItemHeight = () => {
      const maskDom = maskRef.value?.querySelector('div');
      const timeItemTotalHeight = maskDom.offsetHeight + parseInt(getComputedStyle(maskDom).marginTop, 10);
      return timeItemTotalHeight;
    };

    const timeItemCanUsed = (col: EPickerCols, el: string | number) => {
      const colIdx = timeArr.indexOf(col);
      if (colIdx !== -1) {
        const params: [number, number, number] = [
          dayjsValue.value.hour(),
          dayjsValue.value.minute(),
          dayjsValue.value.second(),
        ];
        params[colIdx] = Number(el);
        return !props.disableTime?.(...params, { partial: position.value })?.[col]?.includes(Number(el));
      }
      return true;
    };

    // 获取需要渲染的column
    const getColList = (col: EPickerCols) => {
      let count = 0;

      if (timeArr.includes(col)) {
        // hour、minute and second columns
        const colIdx = timeArr.indexOf(col);
        const colStep = steps.value[colIdx];

        if (col === EPickerCols.hour) count = TWELVE_HOUR_FORMAT.test(format.value) ? 11 : 23;
        else count = 59;

        const colList = range(0, count + 1, Number(colStep)).map((v) => padStart(String(v), 2, '0')) || [];
        return props.hideDisabledTime && !!props.disableTime
          ? colList.filter((t) => {
              const params: [number, number, number] = [
                dayjsValue.value.hour(),
                dayjsValue.value.minute(),
                dayjsValue.value.second(),
              ];
              params[colIdx] = Number(t);
              return !props.disableTime?.(...params, { partial: position.value })?.[col]?.includes(Number(t));
            })
          : colList;
      }
      // meridiem column
      return MERIDIEM_LIST;
    };

    const getScrollDistance = (col: EPickerCols, time: number | string) => {
      if (col === EPickerCols.hour && /[h]{1}/.test(format.value))
        // eslint-disable-next-line no-param-reassign
        (time as number) %= 12; // 一定是数字，直接cast

      const itemIdx = getColList(col).indexOf(padStart(String(time), 2, '0'));
      const timeItemTotalHeight = getItemHeight();
      const distance = Math.abs(itemIdx * timeItemTotalHeight + timeItemTotalHeight / 2);
      return distance;
    };

    const handleScroll = (col: EPickerCols, idx: number) => {
      let val: number | string;
      let formattedVal: string;
      const scrollTop = colsRef[idx]?.scrollTop;

      let colStep = Math.abs(Math.round(scrollTop / getItemHeight() + 0.5));
      const meridiem = MERIDIEM_LIST[Math.min(colStep - 1, 1)].toLowerCase(); // 处理PM、AM与am、pm

      if (Number.isNaN(colStep)) colStep = 1;
      if (timeArr.includes(col)) {
        // hour、minute and second columns
        let max = 59;
        if (col === EPickerCols.hour) {
          max = /[h]{1}/.test(format.value) ? 11 : 23;
        }
        const colIdx = timeArr.indexOf(col);
        const availableArr = range(0, max + 1, Number(steps.value[colIdx]));
        val = closestLookup(
          availableArr,
          Number(getColList(col)[Math.min(colStep - 1, max + 1, availableArr.length - 1)]),
          Number(steps.value[colIdx]),
        );
        if (Number.isNaN(val)) val = availableArr[availableArr.length - 1];
        if (col === EPickerCols.hour && cols.value.includes(EPickerCols.meridiem) && dayjsValue.value.hour() >= 12) {
          // 如果是十二小时制需要再判断
          val = Number(val) + 12;
        }
      }
      // meridiem columns
      else val = meridiem;

      const distance = getScrollDistance(col, val);

      if (!dayjs(dayjsValue.value).isValid()) return;
      if (distance !== scrollTop) {
        if (timeArr.includes(col)) {
          if (timeItemCanUsed(col, val)) formattedVal = dayjsValue.value[col]?.(val).format(format.value);
        } else {
          const currentHour = dayjsValue.value.hour();
          if (meridiem === AM && currentHour >= 12) {
            formattedVal = dayjsValue.value.hour(currentHour - 12).format(format.value);
          } else if (meridiem === PM && currentHour < 12) {
            formattedVal = dayjsValue.value.hour(currentHour + 12).format(format.value);
          }
        }
        props.onChange?.(formattedVal);

        const scrollCtrl = colsRef[cols.value.indexOf(col)];

        if (!distance || !scrollCtrl || scrollCtrl.scrollTop === distance) return;

        scrollCtrl.scrollTo({
          top: distance,
          behavior: 'smooth',
        });
      }
    };

    const scrollToTime = (
      col: EPickerCols,
      time: number | string,
      idx: number,
      behavior: 'auto' | 'smooth' = 'auto',
    ) => {
      const distance = getScrollDistance(col, time);
      const scrollCtrl = colsRef[idx];
      if (!distance || !scrollCtrl || scrollCtrl.scrollTop === distance || !timeItemCanUsed(col, time)) return;

      scrollCtrl.scrollTo({
        top: distance,
        behavior,
      });
    };

    const handleTimeItemClick = (col: EPickerCols, el: string | number) => {
      if (!timeItemCanUsed(col, el)) return;
      if (timeArr.includes(col)) {
        if (
          col === EPickerCols.hour &&
          dayjsValue.value.format('a') === PM &&
          cols.value.includes(EPickerCols.meridiem)
        ) {
          // eslint-disable-next-line no-param-reassign
          el = Number(el) + 12;
        }
        value
          ? props.onChange(dayjsValue.value[col]?.(el).format(format.value))
          : props.onChange(dayjsValue.value[col]?.(el).format(format.value));
      } else {
        const currentHour = dayjsValue.value.hour();
        if (el === AM && currentHour >= 12) {
          props.onChange(dayjsValue.value.hour(currentHour - 12).format(format.value));
        } else if (el === PM && currentHour < 12) {
          props.onChange(dayjsValue.value.hour(currentHour + 12).format(format.value));
        }
      }
    };

    // update each columns scroll distance
    const updateTimeScrollPos = () => {
      const behavior = value.value ? 'smooth' : 'auto';
      const isStepsSet = !!steps.value.filter((v) => v > 1).length;
      cols.value.forEach((col: EPickerCols, idx: number) => {
        if (!isStepsSet || (isStepsSet && value)) {
          // 如果没有设置大于1的steps或设置了大于1的step 正常处理滚动
          scrollToTime(
            col,
            timeArr.includes(col) ? dayjsValue.value[col]?.() : dayjsValue.value.format('a'),
            idx,
            behavior,
          );
        } else {
          // 否则初始化到每列第一个选项
          scrollToTime(col, getColList(col)?.[0], idx, behavior);
        }
      });
    };

    const isCurrent = (col: EPickerCols, colItem: string | number) => {
      let colVal: number;
      if (col === EPickerCols.meridiem) {
        const currentMeridiem = dayjsValue.value.format('a');
        return currentMeridiem === colItem;
      }
      colVal = dayjsValue.value[col]?.();
      if (col === EPickerCols.hour && /[h]{1}/.test(format.value)) {
        colVal %= 12;
      }
      return colVal === Number(colItem);
    };

    return () => (
      <div class={`${panelClassName.value}-body`} ref={bodyRef}>
        <div class={`${panelClassName.value}-body-active-mask`} ref={maskRef}>
          {/* 渲染遮罩层 */}
          {cols.value.map?.((col, idx) => (
            <div key={`${col}_${idx}`} />
          ))}
        </div>
        {/* 渲染实际滚动列 */}
        {cols.value.map?.((col, idx) => (
          <ul
            key={`${col}_${idx}`}
            ref={(el) => (colsRef[idx] = el)}
            class={`${panelClassName.value}-body-scroll`}
            onScroll={debounce(() => handleScroll(col, idx), 50)}
          >
            {getColList(col).map((el) => (
              <li
                key={el}
                class={[
                  `${panelClassName.value}-body-scroll-item`,
                  {
                    [`${classPrefix.value}-is-disabled`]: !timeItemCanUsed(col, el),
                    [`${classPrefix.value}-is-current`]: isCurrent(col, el),
                  },
                ]}
                onClick={() => handleTimeItemClick(col, el)}
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {timeArr.includes(col)
                  ? TWELVE_HOUR_FORMAT.test(format.value) && el === '00'
                    ? '12'
                    : el
                  : global.value[el]}
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  },
});
