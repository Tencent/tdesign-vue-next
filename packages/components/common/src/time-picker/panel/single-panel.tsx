import { computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from '@td/adapter-vue';
import { debounce, padStart, range } from 'lodash-es';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import {
  AM,
  EPickerCols,
  MERIDIEM_LIST,
  PM,
  TIME_FORMAT,
  TWELVE_HOUR_FORMAT,
} from '@td/shared/_common/js/time-picker/const';
import { closestLookup } from '@td/shared/_common/js/time-picker/utils';
import { useCommonClassName, useConfig, usePrefixClass } from '@td/adapter-hooks';
import { panelColProps } from '@td/intel/time-picker/panel/props';

dayjs.extend(customParseFormat);

const timeArr = [EPickerCols.hour, EPickerCols.minute, EPickerCols.second, EPickerCols.milliSecond];

const panelOffset = {
  top: 15,
  bottom: 21,
};

export default defineComponent({
  name: 'TTimePickerPanelCol',
  props: {
    ...panelColProps(),
    position: String,
    triggerScroll: Boolean,
    onChange: Function,
    resetTriggerScroll: Function,
    isShowPanel: Boolean,
  },

  setup(props) {
    const { globalConfig } = useConfig('timePicker');
    const COMPONENT_NAME = usePrefixClass('time-picker__panel');
    const { STATUS } = useCommonClassName();

    const { steps, value, format, position, triggerScroll } = toRefs(props);

    const cols = ref<Array<EPickerCols>>([]);
    const bodyRef = ref();
    const maskRef = ref(null);
    // 每个滚动列的ref 顺序不定 所以只要有5列标识即可
    const colsRef = reactive({ 0: null, 1: null, 2: null, 3: null, 4: null, 5: null });

    const dayjsValue = computed(() => {
      const isStepsSet = !!steps.value.filter(step => Number(step) > 1).length;

      if (value.value) {
        return dayjs(value.value, format.value);
      }

      if (isStepsSet) {
        return dayjs().hour(0).minute(0).second(0);
      }

      return dayjs();
    });

    // 面板打开时 触发滚动 初始化面板
    watch(
      () => dayjsValue.value,
      () => {
        if (dayjsValue.value && value.value) {
          updateTimeScrollPos(true);
        }
      },
    );

    // 时间通过外部触发时 同样触发滚动
    watch(
      () => triggerScroll.value,
      () => {
        if (triggerScroll.value) {
          updateTimeScrollPos(true);
        }
      },
    );

    onMounted(() => {
      const match = format.value.match(TIME_FORMAT);

      const [, startCol, hourCol, minuteCol, secondCol, milliSecondCol, endCol] = match;
      const { meridiem, hour, minute, second, milliSecond } = EPickerCols;

      const renderCol = [
        startCol && meridiem,
        hourCol && hour,
        minuteCol && minute,
        secondCol && second,
        milliSecondCol && milliSecond,
        endCol && meridiem,
      ].filter(v => !!v);

      cols.value = renderCol;
    });

    // 获取每个时间的高度
    const getItemHeight = () => {
      const maskDom = maskRef.value?.querySelector('div');
      if (!maskDom) {
        return {
          offsetHeight: 0,
          margin: 0,
        };
      }
      return {
        offsetHeight: Number.parseFloat(getComputedStyle(maskDom).height),
        margin: Number.parseFloat(getComputedStyle(maskDom).marginTop),
      };
    };

    const timeItemCanUsed = (col: EPickerCols, el: string | number) => {
      const colIdx = timeArr.indexOf(col);
      if (colIdx !== -1) {
        const params: [number, number, number, number] = [
          dayjsValue.value.hour(),
          dayjsValue.value.minute(),
          dayjsValue.value.second(),
          dayjsValue.value.millisecond(),
        ];
        params[colIdx] = Number(el);
        return !props.disableTime?.(...params, { partial: position.value || 'start' })?.[col]?.includes(Number(el));
      }
      return true;
    };

    // 获取需要渲染的column
    const getColList = (col: EPickerCols) => {
      let count = 0;

      if (timeArr.includes(col)) {
        // hour、minute and second columns
        const colIdx = timeArr.indexOf(col);
        const colStep = steps.value[colIdx] || 1;

        if (col === EPickerCols.hour) {
          count = TWELVE_HOUR_FORMAT.test(format.value) ? 11 : 23;
        } // 小时最大为23 12小时制最大为11
        else if (col === EPickerCols.milliSecond) {
          count = 999;
        } // 毫秒最大为999
        else {
          count = 59;
        }

        const colList = range(0, count + 1, Number(colStep)).map(v => padStart(String(v), 2, '0')) || [];
        return props.hideDisabledTime && !!props.disableTime
          ? colList.filter((t) => {
            const params: [number, number, number, number] = [
              dayjsValue.value.hour(),
              dayjsValue.value.minute(),
              dayjsValue.value.second(),
              dayjsValue.value.millisecond(),
            ];
            params[colIdx] = Number(t);
            return !props
              .disableTime?.(...params, { partial: position.value || 'start' })
              ?.[col]?.includes(Number(t));
          })
          : colList;
      }
      // meridiem column
      return MERIDIEM_LIST;
    };

    const getScrollDistance = (col: EPickerCols, time: number | string) => {
      if (col === EPickerCols.hour && /h/.test(format.value)) {
        (time as number) %= 12;
      } // 一定是数字，直接cast

      const itemIdx = getColList(col).indexOf(padStart(String(time), 2, '0'));
      const { offsetHeight, margin } = getItemHeight();
      const timeItemTotalHeight = offsetHeight + margin;
      const distance = Math.abs(Math.max(0, itemIdx) * timeItemTotalHeight);
      return distance;
    };

    const handleScroll = (col: EPickerCols, idx: number, e: MouseEvent) => {
      let val: number | string;
      let formattedVal: string;
      if (!props.isShowPanel) {
        return;
      }

      const scrollTop = (colsRef[idx]?.scrollTop || 0) + panelOffset.top;
      const { offsetHeight, margin } = getItemHeight();
      const timeItemTotalHeight = offsetHeight + margin;
      let colStep = Math.abs(Math.round(scrollTop / timeItemTotalHeight + 0.5));

      const meridiem = MERIDIEM_LIST[Math.min(colStep - 1, 1)].toLowerCase(); // 处理PM、AM与am、pm

      if (Number.isNaN(colStep)) {
        colStep = 1;
      }
      if (timeArr.includes(col)) {
        // hour、minute、 second and milliSecond
        let max = 59;
        if (col === EPickerCols.hour) {
          max = /h/.test(format.value) ? 11 : 23;
        } // 小时最大为23 12小时制最大为11
        else if (col === EPickerCols.milliSecond) {
          max = 999;
        } // 毫秒最大为999

        const colIdx = timeArr.indexOf(col);
        const availableArr = range(0, max + 1, Number(steps.value[colIdx]) || 1);
        val = closestLookup(
          availableArr,
          Number(getColList(col)[Math.min(colStep - 1, max + 1, availableArr.length - 1)]),
          Number(steps.value[colIdx]) || 1,
        );
        if (Number.isNaN(val)) {
          val = availableArr[availableArr.length - 1];
        }
        if (col === EPickerCols.hour && cols.value.includes(EPickerCols.meridiem) && dayjsValue.value.hour() >= 12) {
          // 如果是十二小时制需要再判断
          val = Number(val) + 12;
        }
      }
      // meridiem columns
      else {
        val = meridiem;
      }

      const distance = getScrollDistance(col, val);
      if (!dayjs(dayjsValue.value).isValid() || (value.value && !dayjs(value.value, format.value, true).isValid())) {
        return;
      }

      if (timeArr.includes(col)) {
        if (timeItemCanUsed(col, val)) {
          formattedVal = dayjsValue.value[col]?.(val).format(format.value);
        } else {
          formattedVal = dayjsValue.value.format(format.value);
        }
      } else {
        const currentHour = dayjsValue.value.hour();
        if (meridiem === AM && currentHour >= 12) {
          formattedVal = dayjsValue.value.hour(currentHour - 12).format(format.value);
        } else if (meridiem === PM && currentHour < 12) {
          formattedVal = dayjsValue.value.hour(currentHour + 12).format(format.value);
        } else {
          formattedVal = dayjsValue.value.format(format.value);
        }
      }
      if (formattedVal !== value.value) {
        props.onChange?.(formattedVal, e);
      }

      if (distance !== scrollTop) {
        const scrollCtrl = colsRef[cols.value.indexOf(col)];

        if (!scrollCtrl || scrollCtrl.scrollTop === distance) {
          return;
        }

        scrollCtrl.scrollTo?.({
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
      if (!scrollCtrl || scrollCtrl.scrollTop === distance || !timeItemCanUsed(col, time)) {
        return;
      }

      scrollCtrl.scrollTo?.({
        top: distance,
        behavior,
      });
    };

    const handleTimeItemClick = (col: EPickerCols, el: string | number, idx: number, e: MouseEvent) => {
      if (!timeItemCanUsed(col, el)) {
        return;
      }
      if (timeArr.includes(col)) {
        if (
          col === EPickerCols.hour
          && dayjsValue.value.format('a') === PM
          && cols.value.includes(EPickerCols.meridiem)
        ) {
          el = Number(el) + 12;
        }
        scrollToTime(col, el, idx, 'smooth');
      } else {
        const currentHour = dayjsValue.value.hour();
        if (el === AM && currentHour >= 12) {
          props.onChange?.(dayjsValue.value.hour(currentHour - 12).format(format.value), e);
        } else if (el === PM && currentHour < 12) {
          props.onChange?.(dayjsValue.value.hour(currentHour + 12).format(format.value), e);
        }
      }
    };

    // update each columns scroll distance
    const updateTimeScrollPos = (isAutoScroll = false) => {
      const behavior = value.value && !isAutoScroll ? 'smooth' : 'auto';
      const isStepsSet = !!steps.value.filter(step => Number(step) > 1).length;
      nextTick(() => {
        cols.value.forEach((col: EPickerCols, idx: number) => {
          if (!isStepsSet || (isStepsSet && value.value)) {
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
      });

      props.resetTriggerScroll();
    };

    const isCurrent = (col: EPickerCols, colItem: string | number) => {
      let colVal: number;
      if (col === EPickerCols.meridiem) {
        const currentMeridiem = dayjsValue.value.format('a');
        return currentMeridiem === colItem;
      }
      colVal = dayjsValue.value[col]?.();
      if (col === EPickerCols.hour && /h/.test(format.value)) {
        colVal %= 12;
      }
      return colVal === Number(colItem);
    };

    return () => (
      <div class={`${COMPONENT_NAME.value}-body`} ref={bodyRef}>
        <div class={`${COMPONENT_NAME.value}-body-active-mask`} ref={maskRef}>
          {/* 渲染遮罩层 */}
          {cols.value.map?.((col, idx) => (
            <div key={`${col}_${idx}`} />
          ))}
        </div>
        {/* 渲染实际滚动列 */}
        {cols.value.map?.((col, idx) => (
          <ul
            key={`${col}_${idx}`}
            ref={el => (colsRef[idx] = el)}
            class={`${COMPONENT_NAME.value}-body-scroll`}
            onScroll={debounce(e => handleScroll(col, idx, e), 50)}
          >
            {getColList(col).map(el => (
              <li
                key={el}
                class={[
                  `${COMPONENT_NAME.value}-body-scroll-item`,
                  {
                    [STATUS.value.disabled]: !timeItemCanUsed(col, el),
                    [STATUS.value.current]: isCurrent(col, el),
                  },
                ]}
                onClick={e => handleTimeItemClick(col, el, idx, e)}
              >
                { }
                {timeArr.includes(col)
                  ? TWELVE_HOUR_FORMAT.test(format.value) && col === EPickerCols.hour && el === '00'
                    ? '12'
                    : el
                  : globalConfig.value[el === AM ? 'anteMeridiem' : 'postMeridiem']}
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  },
});
