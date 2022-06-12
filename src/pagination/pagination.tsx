import { defineComponent, computed, ref, watch, toRefs } from 'vue';
import isNaN from 'lodash/isNaN';
import {
  PageFirstIcon,
  PageLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronLeftDoubleIcon,
  ChevronRightDoubleIcon,
  EllipsisIcon,
} from 'tdesign-icons-vue-next';
import { TdPaginationProps } from '../pagination/type';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import TInputNumber from '../input-number';
import { Option, Select } from '../select';
import props from './props';
import usePaginationClasses from './usePaginationClasses';
import useMoreAction from './useMoreAction';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';
import { useTNodeJSX } from '../hooks/tnode';

const min = 1;

export default defineComponent({
  name: 'TPagination',
  props,

  setup(props) {
    const { modelValue, pageSize, current } = toRefs(props);
    const renderTNodeJSX = useTNodeJSX();
    const [innerCurrent, setInnerCurrent] = useVModel(
      current,
      modelValue,
      props.defaultCurrent,
      props.onCurrentChange,
      'current',
    );

    const [innerPageSize, setInnerPageSize] = useDefaultValue(
      pageSize,
      props.defaultPageSize,
      props.onPageSizeChange,
      'pageSize',
    );

    const { t, global } = useConfig('pagination');
    const COMPONENT_NAME = usePrefixClass('pagination');

    const { pageCount, ...CLASS_MAP } = usePaginationClasses(props, innerCurrent, innerPageSize, COMPONENT_NAME);

    const { prevMore, isPrevMoreShow, curPageLeftCount, nextMore, isNextMoreShow, curPageRightCount } = useMoreAction(
      props,
      pageCount,
      innerCurrent,
    );

    const jumpIndex = ref(innerCurrent.value);

    const isFolded = computed(() => pageCount.value > props.maxPageBtn);

    const pageCountOption = computed<Array<{ label: string; value: number }>>(() => {
      const ans = [];
      for (let i = 1; i <= pageCount.value; i++) {
        ans.push({ value: i, label: `${i}/${pageCount.value}` });
      }
      return ans;
    });

    const sizeOptions = computed<Array<{ label: string; value: number }>>(() => {
      const pageSizeOptions = props.pageSizeOptions as TdPaginationProps['pageSizeOptions'];
      const options = pageSizeOptions.map((option) =>
        typeof option === 'object'
          ? option
          : {
              label: t(global.value.itemsPerPage, { size: option }),
              value: Number(option),
            },
      );
      return options.sort((a, b) => a.value - b.value);
    });

    const isFoldEllipsis = computed(() => {
      return props.pageEllipsisMode === 'ellipsis';
    });

    const pages = computed(() => {
      const array = [];
      let start;
      let end;

      if (isFolded.value) {
        if (isPrevMoreShow.value && isNextMoreShow.value) {
          start = innerCurrent.value - curPageLeftCount.value;
          end = innerCurrent.value + curPageRightCount.value;
        } else {
          const foldedStart = isFoldEllipsis.value ? 2 : 1;
          const foldedEnd = isFoldEllipsis.value ? pageCount.value - 1 : pageCount.value;
          start = isPrevMoreShow.value ? pageCount.value - props.foldedMaxPageBtn + 1 : foldedStart;
          end = isPrevMoreShow.value ? foldedEnd : props.foldedMaxPageBtn;
        }
      } else {
        start = 1;
        end = pageCount.value;
      }

      for (let i = start; i <= end; i++) {
        array.push(i);
      }
      return array;
    });

    watch(
      () => innerCurrent.value,
      (val) => (jumpIndex.value = val),
    );

    const toPage: (pageIndex: number, isTriggerChange?: boolean) => void = (pageIndex, isTriggerChange) => {
      if (props.disabled) {
        return;
      }
      let current = pageIndex;
      if (pageIndex < min) {
        current = min;
      } else if (pageIndex > pageCount.value) {
        current = pageCount.value;
      }
      if (innerCurrent.value !== current) {
        const prev = innerCurrent.value;
        const pageInfo = {
          current,
          previous: prev,
          pageSize: innerPageSize.value,
        };
        if (isTriggerChange !== false) {
          props.onChange?.(pageInfo);
        }
        setInnerCurrent(current, pageInfo);
      }
    };

    const handlePageChange = (type: string) => {
      const pageChangeMap = {
        prevPage: () => toPage(innerCurrent.value - 1),
        nextPage: () => toPage(innerCurrent.value + 1),
        prevMorePage: () => toPage(innerCurrent.value - props.foldedMaxPageBtn),
        nextMorePage: () => toPage(innerCurrent.value + props.foldedMaxPageBtn),
      };

      pageChangeMap[type]();
    };

    const onSelectorChange: (e: string) => void = (e) => {
      if (props.disabled) {
        return;
      }
      const pageSize: number = parseInt(e, 10);
      let pageCount = 1;
      if (pageSize > 0) {
        pageCount = Math.ceil(props.total / pageSize);
      }

      let isIndexChange = false;

      if (innerCurrent.value > pageCount) {
        isIndexChange = true;
      }

      /**
       * 分页大小变化事件
       * @param {Number} pageSize 分页大小
       * @param {Number} index 当前页
       */
      const pageInfo = {
        current: isIndexChange ? pageCount : innerCurrent.value,
        previous: innerCurrent.value,
        pageSize,
      };
      props.onChange?.(pageInfo);
      setInnerPageSize(pageSize, pageInfo);
      if (isIndexChange) {
        toPage(pageCount, false);
      }
    };

    const onJumperChange = (val: number) => {
      const currentIndex = Math.trunc(+val);
      if (isNaN(currentIndex)) return;
      jumpIndex.value = currentIndex;
      toPage(currentIndex);
    };

    return () => {
      const { total, pageSizeOptions, size, disabled, showJumper, showPageSize } = props;
      if (pageCount.value < 1) return null;

      return (
        <div class={CLASS_MAP.paginationClass.value}>
          {/* 数据统计区 */}
          {renderTNodeJSX(
            'totalContent',
            <div class={CLASS_MAP.totalClass.value}>{t(global.value.total, { total })}</div>,
          )}

          {/* 分页器 */}
          {showPageSize && pageSizeOptions.length > 0 && (
            <Select
              size={size}
              value={innerPageSize}
              disabled={disabled}
              class={CLASS_MAP.sizerClass.value}
              autoWidth={true}
              onChange={onSelectorChange}
            >
              {sizeOptions.value.map((item, index) => (
                <Option value={item.value} label={item.label} key={index} />
              ))}
            </Select>
          )}
          {/* 首页按钮 */}
          {props.showFirstAndLastPageBtn ? (
            <div
              class={CLASS_MAP.preBtnClass.value}
              onClick={() => toPage(1)}
              disabled={props.disabled || props.current === min}
            >
              <PageFirstIcon />
            </div>
          ) : null}
          {/* 向前按钮 */}
          {props.showPreviousAndNextBtn ? (
            <div
              class={CLASS_MAP.preBtnClass.value}
              onClick={() => handlePageChange('prevPage')}
              disabled={disabled || innerCurrent.value === min}
            >
              <ChevronLeftIcon />
            </div>
          ) : null}
          {/* 常规版 */}
          {props.showPageNumber && props.theme === 'default' ? (
            <ul class={CLASS_MAP.btnWrapClass.value}>
              {isFolded.value && isFoldEllipsis.value && (
                <li class={CLASS_MAP.getButtonClass(1)} onClick={() => toPage(min)}>
                  {min}
                </li>
              )}
              {isFolded.value && isPrevMoreShow.value && isFoldEllipsis.value ? (
                <li
                  class={CLASS_MAP.btnMoreClass.value}
                  onClick={() => handlePageChange('prevMorePage')}
                  onMouseOver={() => (prevMore.value = true)}
                  onMouseOut={() => (prevMore.value = false)}
                >
                  {prevMore.value ? <ChevronLeftDoubleIcon /> : <EllipsisIcon />}
                </li>
              ) : null}
              {pages.value.map((i) => (
                <li class={CLASS_MAP.getButtonClass(i)} key={i} onClick={() => toPage(i)}>
                  {i}
                </li>
              ))}
              {isFolded.value && isNextMoreShow.value && isFoldEllipsis.value ? (
                <li
                  class={CLASS_MAP.btnMoreClass.value}
                  onClick={() => handlePageChange('nextMorePage')}
                  onMouseOver={() => (nextMore.value = true)}
                  onMouseOut={() => (nextMore.value = false)}
                >
                  {nextMore.value ? <ChevronRightDoubleIcon /> : <EllipsisIcon />}
                </li>
              ) : null}
              {isFolded.value && isFoldEllipsis.value ? (
                <li class={CLASS_MAP.getButtonClass(pageCount.value)} onClick={() => toPage(pageCount.value)}>
                  {pageCount.value}
                </li>
              ) : null}
            </ul>
          ) : null}
          {/* 极简版 */}
          {props.showPageNumber && props.theme === 'simple' ? (
            <Select
              size={size}
              value={innerCurrent}
              disabled={disabled}
              class={CLASS_MAP.simpleClass.value}
              autoWidth={true}
              onChange={(value) => toPage(value as number)}
              options={pageCountOption.value}
            />
          ) : null}
          {/* 向后按钮 */}
          {props.showPreviousAndNextBtn ? (
            <div
              class={CLASS_MAP.nextBtnClass.value}
              onClick={() => handlePageChange('nextPage')}
              disabled={disabled || innerCurrent.value === pageCount.value}
            >
              <ChevronRightIcon />
            </div>
          ) : null}
          {/* 尾页按钮 */}
          {props.showFirstAndLastPageBtn ? (
            <div
              class={CLASS_MAP.nextBtnClass.value}
              onClick={() => toPage(pageCount.value)}
              disabled={disabled || innerCurrent.value === pageCount.value}
            >
              <PageLastIcon />
            </div>
          ) : null}
          {/* 跳转 */}
          {showJumper ? (
            <div class={CLASS_MAP.jumperClass.value}>
              {t(global.value.jumpTo)}
              <TInputNumber
                class={CLASS_MAP.jumperInputClass.value}
                v-model={jumpIndex}
                onBlur={onJumperChange}
                onEnter={onJumperChange}
                max={pageCount.value}
                min={min}
                size={size}
                disabled={disabled}
                theme="normal"
                placeholder=""
              />
              {t(global.value.page)}
            </div>
          ) : null}
        </div>
      );
    };
  },
});
