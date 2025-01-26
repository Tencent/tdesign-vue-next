import { defineComponent, computed, ref, watch, toRefs, getCurrentInstance } from 'vue';
import { isNaN } from 'lodash-es';
import {
  PageFirstIcon as TdPageFirstIcon,
  PageLastIcon as TdPageLastIcon,
  ChevronLeftIcon as TdChevronLeftIcon,
  ChevronRightIcon as TdChevronRightIcon,
  ChevronLeftDoubleIcon as TdChevronLeftDoubleIcon,
  ChevronRightDoubleIcon as TdChevronRightDoubleIcon,
  EllipsisIcon as TdEllipsisIcon,
} from 'tdesign-icons-vue-next';
import { PageInfo, TdPaginationProps } from '../pagination/type';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import TInputNumber from '../input-number';
import { Select } from '../select';
import TInputAdornment from '../input-adornment';
import props from './props';
import usePaginationClasses from './usePaginationClasses';
import useMoreAction from './useMoreAction';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';
import { useTNodeJSX } from '../hooks/tnode';
import { isObject } from 'lodash-es';

const min = 1;

export default defineComponent({
  name: 'TPagination',
  props,

  setup(props: TdPaginationProps) {
    const { emit } = getCurrentInstance();

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

    const { t, globalConfig } = useConfig('pagination');
    const COMPONENT_NAME = usePrefixClass('pagination');
    const {
      PageFirstIcon,
      PageLastIcon,
      ChevronLeftIcon,
      ChevronRightIcon,
      ChevronLeftDoubleIcon,
      ChevronRightDoubleIcon,
      EllipsisIcon,
    } = useGlobalIcon({
      PageFirstIcon: TdPageFirstIcon,
      PageLastIcon: TdPageLastIcon,
      ChevronLeftIcon: TdChevronLeftIcon,
      ChevronRightIcon: TdChevronRightIcon,
      ChevronLeftDoubleIcon: TdChevronLeftDoubleIcon,
      ChevronRightDoubleIcon: TdChevronRightDoubleIcon,
      EllipsisIcon: TdEllipsisIcon,
    });

    const { pageCount, ...CLASS_MAP } = usePaginationClasses(props, innerCurrent, innerPageSize, COMPONENT_NAME);

    const { prevMore, isPrevMoreShow, curPageLeftCount, nextMore, isNextMoreShow, curPageRightCount } = useMoreAction(
      props,
      pageCount,
      innerCurrent,
    );

    const jumpIndex = ref(innerCurrent.value);

    const isFolded = computed(() => pageCount.value > props.maxPageBtn);

    const sizeOptions = computed<Array<{ label: string; value: number }>>(() => {
      const pageSizeOptions = props.pageSizeOptions as TdPaginationProps['pageSizeOptions'];
      const options = pageSizeOptions.map((option) =>
        isObject(option)
          ? option
          : {
              label: t(globalConfig.value.itemsPerPage, { size: option }),
              value: Number(option),
            },
      );
      return options.sort((a, b) => a.value - b.value);
    });

    const isMidEllipsis = computed(() => {
      return props.pageEllipsisMode === 'mid';
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
          const foldedStart = isMidEllipsis.value ? 2 : 1;
          const foldedEnd = isMidEllipsis.value ? pageCount.value - 1 : pageCount.value;
          if (isPrevMoreShow.value) {
            // 保证前面还有一页展示
            start = Math.min(innerCurrent.value - 1, pageCount.value - props.foldedMaxPageBtn + 1);
          } else {
            start = foldedStart;
          }

          if (isNextMoreShow.value) {
            // 保证后面还有一页展示
            end = Math.max(innerCurrent.value + 1, props.foldedMaxPageBtn);
          } else {
            end = foldedEnd;
          }
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

    // 如果页面总数发生变化并当前页数大于总页数则重置为1
    watch(
      () => pageCount.value,
      () => {
        if (innerCurrent.value > pageCount.value) innerCurrent.value = 1;
      },
    );
    watch(
      () => innerCurrent.value,
      (val) => (jumpIndex.value = val),
    );

    const toPage: (pageIndex: number, pageInfo?: PageInfo) => void = (pageIndex, pageInfo) => {
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
        pageInfo = pageInfo || {
          current,
          previous: prev,
          pageSize: innerPageSize.value,
        };
        if (pageInfo) {
          setInnerCurrent(current, pageInfo);
          props.onChange?.(pageInfo);
        } else {
          // 非主动更改时应仅更新modelValue不触发onCurrentChange事件
          emit('update:modelValue', current);
        }
      }
    };

    const handlePageChange = (type: string) => {
      const pageChangeMap = {
        prevPage: () => toPage(innerCurrent.value - 1),
        nextPage: () => toPage(innerCurrent.value + 1),
        prevMorePage: () => toPage(Math.max(2, innerCurrent.value - props.foldedMaxPageBtn)),
        nextMorePage: () => toPage(Math.min(innerCurrent.value + props.foldedMaxPageBtn, pageCount.value - 1)),
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
        pageCount = Math.max(Math.ceil(props.total / pageSize), 1);
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
      setInnerPageSize(pageSize, pageInfo);
      if (isIndexChange) {
        toPage(pageCount, pageInfo);
      } else {
        props.onChange?.(pageInfo);
      }
    };

    const onJumperChange = (val: number) => {
      const currentIndex = Math.trunc(+val);
      if (isNaN(currentIndex)) return;
      jumpIndex.value = currentIndex;
      toPage(currentIndex);
    };

    return () => {
      const { total, pageSizeOptions, size, disabled, showPageSize } = props;
      if (pageCount.value < 1) return null;

      const Jumper = (
        <div class={CLASS_MAP.jumperClass.value}>
          {t(globalConfig.value.jumpTo)}
          <TInputAdornment append={`/ ${pageCount.value} ${t(globalConfig.value.page)}`}>
            <TInputNumber
              class={CLASS_MAP.jumperInputClass.value}
              v-model={jumpIndex.value}
              onBlur={onJumperChange}
              onEnter={onJumperChange}
              max={pageCount.value}
              min={min}
              size={size}
              disabled={disabled}
              theme="normal"
              placeholder=""
            />
          </TInputAdornment>
        </div>
      );

      return (
        <div class={CLASS_MAP.paginationClass.value}>
          {/* 数据统计区 */}
          {renderTNodeJSX(
            'totalContent',
            <div class={CLASS_MAP.totalClass.value}>{t(globalConfig.value.total, { total })}</div>,
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
              options={sizeOptions.value}
              {...props.selectProps}
            />
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
              {isFolded.value && isMidEllipsis.value && (
                <li class={CLASS_MAP.getButtonClass(1)} onClick={() => toPage(min)}>
                  {min}
                </li>
              )}
              {isFolded.value && isPrevMoreShow.value && isMidEllipsis.value ? (
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
              {isFolded.value && isNextMoreShow.value && isMidEllipsis.value ? (
                <li
                  class={CLASS_MAP.btnMoreClass.value}
                  onClick={() => handlePageChange('nextMorePage')}
                  onMouseOver={() => (nextMore.value = true)}
                  onMouseOut={() => (nextMore.value = false)}
                >
                  {nextMore.value ? <ChevronRightDoubleIcon /> : <EllipsisIcon />}
                </li>
              ) : null}
              {isFolded.value && isMidEllipsis.value ? (
                <li class={CLASS_MAP.getButtonClass(pageCount.value)} onClick={() => toPage(pageCount.value)}>
                  {pageCount.value}
                </li>
              ) : null}
            </ul>
          ) : null}
          {/* 极简版 */}
          {props.theme === 'simple' && Jumper}
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
          {/* 快速跳转 */}
          {props.theme === 'default' && props.showJumper && Jumper}
        </div>
      );
    };
  },
});
