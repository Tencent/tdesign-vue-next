import { defineComponent, computed, ref, watch, toRefs, nextTick } from 'vue';
import { isNaN, isObject } from 'lodash-es';
import {
  PageFirstIcon as TdPageFirstIcon,
  PageLastIcon as TdPageLastIcon,
  ChevronLeftIcon as TdChevronLeftIcon,
  ChevronRightIcon as TdChevronRightIcon,
  ChevronLeftDoubleIcon as TdChevronLeftDoubleIcon,
  ChevronRightDoubleIcon as TdChevronRightDoubleIcon,
  EllipsisIcon as TdEllipsisIcon,
} from 'tdesign-icons-vue-next';
import {
  useConfig,
  useVModel,
  useTNodeJSX,
  useGlobalIcon,
  usePrefixClass,
  useDefaultValue,
} from '@tdesign/shared-hooks';

import TInputNumber from '../input-number';
import { Select } from '../select';
import TInputAdornment from '../input-adornment';
import props from './props';
import { usePaginationClasses, useMoreAction } from './hooks';

import type { PageInfo, TdPaginationProps } from '../pagination/type';

const min = 1;

type PageChangeType = 'prevPage' | 'nextPage' | 'prevMorePage' | 'nextMorePage';

export default defineComponent({
  name: 'TPagination',
  props,

  setup(props: TdPaginationProps) {
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

    watch(
      () => innerCurrent.value,
      (val) => (jumpIndex.value = val),
    );

    const toPage: (pageIndex: number, pageInfo?: PageInfo) => void = (pageIndex, pageInfo) => {
      if (props.disabled) {
        return;
      }

      let toPageCurrent = pageIndex;
      if (pageIndex < min) {
        toPageCurrent = min;
      } else if (pageIndex > pageCount.value) {
        toPageCurrent = pageCount.value;
      }

      pageInfo = pageInfo || {
        current: toPageCurrent,
        previous: innerCurrent.value,
        pageSize: innerPageSize.value,
      };

      setInnerCurrent(toPageCurrent, pageInfo);
      props.onChange?.(pageInfo);
    };

    const handlePageChange = (type: PageChangeType) => {
      const pageChangeMap = {
        prevPage: () => toPage(innerCurrent.value - 1),
        nextPage: () => toPage(innerCurrent.value + 1),
        prevMorePage: () => toPage(Math.max(2, innerCurrent.value - props.foldedMaxPageBtn)),
        nextMorePage: () => toPage(Math.min(innerCurrent.value + props.foldedMaxPageBtn, pageCount.value - 1)),
      };
      pageChangeMap[type]();
    };

    const onSelectorChange = (val: string | number) => {
      if (props.disabled) return;

      const pageSize = Number(val);
      const newPageCount = pageSize > 0 ? Math.max(Math.ceil(props.total / pageSize), 1) : 1;
      const previousCurrent = innerCurrent.value;
      const indexExceeds = previousCurrent > newPageCount;

      // 触发 onPageSizeChange 回调
      setInnerPageSize(pageSize, {
        current: indexExceeds ? newPageCount : previousCurrent,
        previous: previousCurrent,
        pageSize,
      });

      // 场景:用户在 onPageSizeChange 中修改 current,需要重新计算 current
      nextTick(() => {
        const userChanged = innerCurrent.value !== previousCurrent;
        const targetCurrent = userChanged ? innerCurrent.value : indexExceeds ? newPageCount : innerCurrent.value;

        const pageInfo = {
          current: targetCurrent,
          previous: previousCurrent,
          pageSize,
        };

        // 如果用户改了 current 或者不需要跳页,直接触发 onChange
        // 否则需要调用 toPage 来更新内部状态
        if (userChanged || !indexExceeds) {
          props.onChange?.(pageInfo);
        } else {
          toPage(targetCurrent, pageInfo);
        }
      });
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
            <div class={CLASS_MAP.totalClass.value}>{t(globalConfig.value.total, total)}</div>,
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
            <div class={CLASS_MAP.preBtnClass.value} onClick={() => toPage(1)}>
              <PageFirstIcon />
            </div>
          ) : null}
          {/* 向前按钮 */}
          {props.showPreviousAndNextBtn ? (
            <div class={CLASS_MAP.preBtnClass.value} onClick={() => handlePageChange('prevPage')}>
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
                  onMouseover={() => (prevMore.value = true)}
                  onMouseout={() => (prevMore.value = false)}
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
                  onMouseover={() => (nextMore.value = true)}
                  onMouseout={() => (nextMore.value = false)}
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
            <div class={CLASS_MAP.nextBtnClass.value} onClick={() => handlePageChange('nextPage')}>
              <ChevronRightIcon />
            </div>
          ) : null}
          {/* 尾页按钮 */}
          {props.showFirstAndLastPageBtn ? (
            <div class={CLASS_MAP.nextBtnClass.value} onClick={() => toPage(pageCount.value)}>
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
