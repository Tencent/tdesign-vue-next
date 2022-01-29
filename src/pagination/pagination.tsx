import { defineComponent, computed, ref, watch, h } from 'vue';
import { isNaN } from 'lodash';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronLeftDoubleIcon,
  ChevronRightDoubleIcon,
  EllipsisIcon,
} from 'tdesign-icons-vue-next';
import CLASSNAMES from '../utils/classnames';
import config from '../config';
import { ClassName } from '../common';
import { TdPaginationProps } from '../pagination/type';
import { useReceiver, PaginationConfig } from '../config-provider';
import { renderTNodeJSX } from '../utils/render-tnode';
import TInputNumber from '../input-number';
import { Option, Select } from '../select';
import { useEmitEvent } from '../hooks/event';
import props from './props';

const { prefix } = config;
const name = `${prefix}-pagination`;
const min = 1;

export default defineComponent({
  name: 'TPagination',
  props,
  emits: ['change', 'update:current', 'update:pageSize', 'page-size-change', 'current-change'],
  setup(props, { emit, slots }) {
    const { t, global } = useReceiver<PaginationConfig>('pagination');
    const emitEvent = useEmitEvent(props, emit);
    const prevMore = ref<boolean>(false);
    const nextMore = ref<boolean>(false);
    const jumpIndex = ref<number>(props.current);

    // class computed
    const paginationClass = computed<ClassName>(() => [
      `${name}`,
      CLASSNAMES.SIZE[props.size],
      {
        [CLASSNAMES.STATUS.disabled]: props.disabled,
      },
    ]);
    const totalClass = computed<ClassName>(() => [`${name}__total`]);
    const sizerClass = computed<ClassName>(() => [`${name}__select`]);
    const preBtnClass = computed<ClassName>(() => [
      `${name}__btn`,
      `${name}__btn-prev`,
      {
        [CLASSNAMES.STATUS.disabled]: props.disabled || props.current === 1,
      },
    ]);
    const nextBtnClass = computed<ClassName>(() => [
      `${name}__btn`,
      `${name}__btn-next`,
      {
        [CLASSNAMES.STATUS.disabled]: props.disabled || props.current === pageCount.value,
      },
    ]);
    const btnWrapClass = computed<ClassName>(() => [`${name}__pager`]);
    const btnMoreClass = computed<ClassName>(() => [
      `${name}__number`,
      `${name}__number--more`,
      {
        [CLASSNAMES.STATUS.disabled]: props.disabled,
      },
    ]);
    const jumperClass = computed<ClassName>(() => [`${name}__jump`]);
    const jumperInputClass = computed<ClassName>(() => [`${name}__input`]);
    const simpleClass = computed<ClassName>(() => [`${name}__select`]);

    const pageCount = computed<number>(() => {
      const c: number = Math.ceil(props.total / props.pageSize);
      return c > 0 ? c : 1;
    });
    const isSimple = computed<boolean>(() => props.theme === 'simple');
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
    const curPageLeftCount = computed<number>(() => Math.ceil((props.foldedMaxPageBtn - 1) / 2));
    const curPageRightCount = computed<number>(() => Math.ceil((props.foldedMaxPageBtn - 1) / 2));
    const isPrevMoreShow = computed<boolean>(() => 2 + curPageLeftCount.value < props.current);
    const isNextMoreShow = computed<boolean>(() => pageCount.value - 1 - curPageRightCount.value > props.current);
    const isFolded = computed<boolean>(() => pageCount.value > props.maxPageBtn);
    const pages = computed<Array<number>>(() => {
      const array = [];
      let start;
      let end;

      if (isFolded.value) {
        if (isPrevMoreShow.value && isNextMoreShow.value) {
          start = props.current - curPageLeftCount.value;
          end = props.current + curPageRightCount.value;
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
      () => props.current,
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
      if (props.current !== current) {
        const prev = props.current;
        const pageInfo = {
          current,
          previous: prev,
          pageSize: props.pageSize,
        };
        if (isTriggerChange !== false) {
          emitEvent('change', pageInfo);
        }
        emitEvent('update:current', current);
        emitEvent('current-change', current, pageInfo);
      }
    };

    const prevPage: () => void = () => {
      toPage(props.current - 1);
    };

    const nextPage: () => void = () => {
      toPage(props.current + 1);
    };

    const prevMorePage: () => void = () => {
      toPage(props.current - props.foldedMaxPageBtn);
    };

    const nextMorePage: () => void = () => {
      toPage(props.current + props.foldedMaxPageBtn);
    };

    const getButtonClass: (index: number) => ClassName = (index) => [
      `${name}__number`,
      {
        [CLASSNAMES.STATUS.disabled]: props.disabled,
        [CLASSNAMES.STATUS.current]: props.current === index,
      },
    ];

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

      if (props.current > pageCount) {
        isIndexChange = true;
      }

      /**
       * 分页大小变化事件
       * @param {Number} pageSize 分页大小
       * @param {Number} index 当前页
       */
      const pageInfo = {
        current: isIndexChange ? pageCount : props.current,
        previous: props.current,
        pageSize,
      };
      emitEvent('page-size-change', pageSize, pageInfo);
      emitEvent('change', pageInfo);
      if (isIndexChange) {
        toPage(pageCount, false);
      }
    };

    // TODO: 未使用，是否需移除
    const renderTotalContent = () => {
      if (slots.totalContent) {
        return slots.totalContent(null);
      }
      if (typeof props.totalContent === 'function') {
        return props.totalContent(h);
      }
      return t(global.value.total, { total: props.total });
    };

    const onJumperChange = (val: string) => {
      const currentIndex = Number(val);
      if (isNaN(currentIndex)) return;
      toPage(currentIndex);
    };

    return {
      global,
      t,
      paginationClass,
      totalClass,
      sizerClass,
      preBtnClass,
      btnMoreClass,
      simpleClass,
      nextBtnClass,
      jumperClass,
      jumperInputClass,
      sizeOptions,
      isSimple,
      btnWrapClass,
      isFolded,
      isPrevMoreShow,
      prevMore,
      pages,
      isNextMoreShow,
      nextMore,
      pageCount,
      pageCountOption,
      jumpIndex,
      prevPage,
      toPage,
      prevMorePage,
      nextMorePage,
      nextPage,
      getButtonClass,
      onSelectorChange,
      onJumperChange,
    };
  },
  render() {
    const { pageCount } = this;
    const { total, pageSizeOptions, size, pageSize, disabled, current, showJumper } = this.$props;
    return (
      pageCount >= 1 && (
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
              value={pageSize}
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
          <div class={this.preBtnClass} onClick={this.prevPage} disabled={disabled || current === min}>
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
                  onClick={this.prevMorePage}
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
                  onClick={this.nextMorePage}
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
              value={current}
              disabled={disabled}
              class={this.simpleClass}
              onChange={this.toPage}
              options={this.pageCountOption}
            />
          )}
          {/* 向后按钮 */}
          <div class={this.nextBtnClass} onClick={this.nextPage} disabled={disabled || current === this.pageCount}>
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
              />
              {this.t(this.global.page)}
            </div>
          ) : null}
        </div>
      )
    );
  },
});
