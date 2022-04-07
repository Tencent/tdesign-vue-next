import { defineComponent, computed, ref, watch, toRefs } from 'vue';
import isNaN from 'lodash/isNaN';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronLeftDoubleIcon,
  ChevronRightDoubleIcon,
  EllipsisIcon,
} from 'tdesign-icons-vue-next';
import { TdPaginationProps } from '../pagination/type';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { renderTNodeJSX } from '../utils/render-tnode';
import TInputNumber from '../input-number';
import { Option, Select } from '../select';
import props from './props';
import usePaginationClasses from './usePaginationClasses';
import useMoreAction from './useMoreAction';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';

const min = 1;

export default defineComponent({
  name: 'TPagination',
  props,
  setup(props) {
    const { modelValue, pageSize, current } = toRefs(props);
    const [innerCurrent, setInnerCurrent] = useVModel(current, modelValue, props.defaultCurrent, props.onCurrentChange);

    const [innerPageSize, setInnerPageSize] = useDefaultValue(
      pageSize,
      props.defaultPageSize,
      props.onPageSizeChange,
      'pageSize',
    );

    const { t, global } = useConfig('pagination');
    const COMPONENT_NAME = usePrefixClass('pagination');

    const { pageCount, ...paginationClasses } = usePaginationClasses(
      props,
      innerCurrent,
      innerPageSize,
      COMPONENT_NAME,
    );

    const { prevMore, isPrevMoreShow, curPageLeftCount, nextMore, isNextMoreShow, curPageRightCount } = useMoreAction(
      props,
      pageCount,
      innerCurrent,
    );

    const jumpIndex = ref(innerCurrent.value);

    const isSimple = computed(() => props.theme === 'simple');
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

    const pages = computed(() => {
      const array = [];
      let start;
      let end;

      if (isFolded.value) {
        if (isPrevMoreShow.value && isNextMoreShow.value) {
          start = innerCurrent.value - curPageLeftCount.value;
          end = innerCurrent.value + curPageRightCount.value;
        } else {
          start = isPrevMoreShow.value ? pageCount.value - props.foldedMaxPageBtn + 1 : 2;
          end = isPrevMoreShow.value ? pageCount.value - 1 : props.foldedMaxPageBtn;
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

    const onJumperChange = (val: string) => {
      const currentIndex = Math.trunc(+val);
      if (isNaN(currentIndex)) return;
      jumpIndex.value = currentIndex;
      toPage(currentIndex);
    };

    return {
      global,
      t,
      ...paginationClasses,
      sizeOptions,
      isSimple,
      isFolded,
      isPrevMoreShow,
      prevMore,
      pages,
      isNextMoreShow,
      nextMore,
      pageCount,
      pageCountOption,
      jumpIndex,
      toPage,
      handlePageChange,
      onSelectorChange,
      onJumperChange,
      innerCurrent,
      innerPageSize,
    };
  },
  render() {
    const { pageCount, innerPageSize, innerCurrent } = this;
    const { total, pageSizeOptions, size, disabled, showJumper } = this.$props;

    if (pageCount < 1) return null;

    return (
      <div class={this.paginationClass}>
        {/* 数据统计区 */}
        {renderTNodeJSX(
          this,
          'totalContent',
          <div class={this.totalClass}>{this.t(this.global.total, { total })}</div>,
        )}

        {/* select */}
        {pageSizeOptions.length > 0 && (
          <Select
            size={size}
            value={innerPageSize}
            disabled={disabled}
            class={this.sizerClass}
            onChange={this.onSelectorChange}
          >
            {this.sizeOptions.map((item, index) => (
              <Option value={item.value} label={item.label} key={index} />
            ))}
          </Select>
        )}

        {/* 向前按钮 */}
        <div
          class={this.preBtnClass}
          onClick={() => this.handlePageChange('prevPage')}
          disabled={disabled || innerCurrent === min}
        >
          <ChevronLeftIcon />
        </div>
        {/* 页数 */}
        {!this.isSimple ? (
          <ul class={this.btnWrapClass}>
            {this.isFolded && (
              <li class={this.getButtonClass(1)} onClick={() => this.toPage(min)}>
                {min}
              </li>
            )}
            {this.isFolded && this.isPrevMoreShow ? (
              <li
                class={this.btnMoreClass}
                onClick={() => this.handlePageChange('prevMorePage')}
                onMouseOver={() => (this.prevMore = true)}
                onMouseOut={() => (this.prevMore = false)}
              >
                {this.prevMore ? <ChevronLeftDoubleIcon /> : <EllipsisIcon />}
              </li>
            ) : null}
            {this.pages.map((i) => (
              <li class={this.getButtonClass(i)} key={i} onClick={() => this.toPage(i)}>
                {i}
              </li>
            ))}
            {this.isFolded && this.isNextMoreShow ? (
              <li
                class={this.btnMoreClass}
                onClick={() => this.handlePageChange('nextMorePage')}
                onMouseOver={() => (this.nextMore = true)}
                onMouseOut={() => (this.nextMore = false)}
              >
                {this.nextMore ? <ChevronRightDoubleIcon /> : <EllipsisIcon />}
              </li>
            ) : null}
            {this.isFolded ? (
              <li class={this.getButtonClass(this.pageCount)} onClick={() => this.toPage(this.pageCount)}>
                {this.pageCount}
              </li>
            ) : null}
          </ul>
        ) : (
          <Select
            size={size}
            value={innerCurrent}
            disabled={disabled}
            class={this.simpleClass}
            onChange={this.toPage}
            options={this.pageCountOption}
          />
        )}
        {/* 向后按钮 */}
        <div
          class={this.nextBtnClass}
          onClick={() => this.handlePageChange('nextPage')}
          disabled={disabled || innerCurrent === this.pageCount}
        >
          <ChevronRightIcon />
        </div>
        {/* 跳转 */}
        {/* 跳转 */}
        {showJumper ? (
          <div class={this.jumperClass}>
            {this.t(this.global.jumpTo)}
            <TInputNumber
              class={this.jumperInputClass}
              v-model={this.jumpIndex}
              onBlur={this.onJumperChange}
              onEnter={this.onJumperChange}
              max={this.pageCount}
              min={min}
              theme="normal"
              placeholder=""
            />
            {this.t(this.global.page)}
          </div>
        ) : null}
      </div>
    );
  },
});
