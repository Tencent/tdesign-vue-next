import { defineComponent } from 'vue';
import config from '../config';
import mixins from '../utils/mixins';
import getLocalRecevierMixins from '../locale/local-receiver';
import TIconChevronLeft from '../icon/chevron-left';
import TIconChevronRight from '../icon/chevron-right';
import TIconChevronLeftDouble from '../icon/chevron-left-double';
import TIconChevronRightDouble from '../icon/chevron-right-double';
import TIconEllipsis from '../icon/ellipsis';
import TInput from '../input';
import { Select, Option } from '../select';
import CLASSNAMES from '../utils/classnames';
import props from './props';
import { TdPaginationProps } from './type';
import { ClassName } from '../common';

const { prefix } = config;

const name = `${prefix}-pagination`;

const PaginationLocalReceiver = getLocalRecevierMixins('pagination');

export default defineComponent({
  name,
  components: {
    TIconChevronLeft,
    TIconChevronRight,
    TIconChevronLeftDouble,
    TIconChevronRightDouble,
    TIconEllipsis,
    TInput,
    TSelect: Select,
    TOption: Option,
  },
  ...mixins(PaginationLocalReceiver),
  props: {
    ...props,
    /**
     * 当前页
     */
    current: {
      type: Number,
      default: 1,
      validator(v: number): boolean {
        return v > 0;
      },
    },
    /**
     * 分页大小
     */
    pageSize: {
      type: Number,
      default: 10,
      validator(v: number): boolean {
        return v > 0;
      },
    },
  },
  emits: ['change', 'update:current', 'update:pageSize', 'page-size-change', 'current-change'],
  data() {
    return {
      jumpIndex: this.current,
      prevMore: false,
      nextMore: false,
    };
  },
  computed: {
    /**
     * 样式计算
     */
    paginationClass(): ClassName {
      return [
        `${name}`,
        CLASSNAMES.SIZE[this.size],
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
        },
      ];
    },
    totalClass(): ClassName {
      return [`${name}__total`];
    },
    sizerClass(): ClassName {
      return [
        `${name}__select`,
        // {
        //   [CLASSNAMES.STATUS.disabled]: this.disabled,
        // },
      ];
    },
    preBtnClass(): ClassName {
      return [
        `${name}__btn`,
        `${name}__btn--prev`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled || this.current === 1,
        },
      ];
    },
    nextBtnClass(): ClassName {
      return [
        `${name}__btn`,
        `${name}__btn--next`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled || this.current === this.pageCount,
        },
      ];
    },
    btnWrapClass(): ClassName {
      return [`${name}__pager`];
    },
    btnMoreClass(): ClassName {
      return [
        `${name}__number`,
        `${name}__number--more`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
        },
      ];
    },
    jumperClass(): ClassName {
      return [`${name}__jump`];
    },
    jumperInputClass(): ClassName {
      return [
        `${name}__input`,
        // {
        //   [CLASSNAMES.STATUS.disabled]: this.disabled,
        // },
      ];
    },
    simpleClass(): ClassName {
      return [`${name}__select`];
    },
    isSimple(): boolean {
      return this.theme === 'simple';
    },
    pageCount(): number {
      const c: number = Math.ceil(this.total / this.pageSize);
      return c > 0 ? c : 1;
    },
    pageCountOption(): Array<{label: string; value: number}> {
      const ans = [];
      for (let i = 1; i <= this.pageCount; i++) {
        ans.push({ value: i, label: `${i}/${this.pageCount}` });
      }
      return ans;
    },
    sizeOptions(): Array<{ label: string; value: number }> {
      const pageSizeOptions = this.pageSizeOptions as TdPaginationProps['pageSizeOptions'];
      const options = pageSizeOptions.map((option) => typeof option === 'object'
        ? option
        : {
          label: this.t(this.locale.itemsPerPage, { size: option }),
          value: Number(option),
        });
      return options.sort((a, b) => a.value - b.value);
    },

    curPageLeftCount(): number {
      return Math.ceil((this.foldedMaxPageBtn - 1) / 2);
    },

    curPageRightCount(): number {
      return Math.ceil((this.foldedMaxPageBtn - 1) / 2);
    },

    isPrevMoreShow(): boolean {
      return 2 + this.curPageLeftCount < this.current;
    },

    isNextMoreShow(): boolean {
      return this.pageCount - 1 - this.curPageRightCount > this.current;
    },

    pages(): Array<number> {
      const array = [];
      let start;
      let end;

      if (this.isFolded) {
        if (this.isPrevMoreShow && this.isNextMoreShow) {
          start = this.current - this.curPageLeftCount;
          end = this.current + this.curPageRightCount;
        } else {
          start = this.isPrevMoreShow ? this.pageCount - this.foldedMaxPageBtn + 1 : 2;
          end = this.isPrevMoreShow ? this.pageCount - 1 : this.foldedMaxPageBtn;
        }
      } else {
        start = 1;
        end = this.pageCount;
      }

      for (let i = start; i <= end; i++) {
        array.push(i);
      }
      return array;
    },

    isFolded(): boolean {
      return this.pageCount > this.maxPageBtn;
    },
  },

  methods: {
    toPage(pageIndex: number, isTriggerChange?: boolean): void {
      if (this.disabled) {
        return;
      }
      let current = pageIndex;
      if (pageIndex < 1) {
        current = 1;
      } else if (pageIndex > this.pageCount) {
        current = this.pageCount;
      }
      if (this.current !== current) {
        const prev = this.current;
        this.jumpIndex = current;
        const pageInfo = {
          current,
          previous: prev,
          pageSize: this.pageSize,
        };
        if (isTriggerChange !== false) {
          this.$emit('change', pageInfo);
        }
        this.$emit('update:current', current);
        this.$emit('current-change', current, pageInfo);
      }
    },
    prevPage(): void {
      this.toPage(this.current - 1);
    },
    nextPage(): void {
      this.toPage(this.current + 1);
    },
    prevMorePage(): void {
      this.toPage(this.current - this.foldedMaxPageBtn);
    },
    nextMorePage(): void {
      this.toPage(this.current + this.foldedMaxPageBtn);
    },
    jumpToPage(): void {
      this.toPage(Number(this.jumpIndex));
    },
    getButtonClass(index: number): ClassName {
      return [
        `${name}__number`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
          [CLASSNAMES.STATUS.current]: this.current === index,
        },
      ];
    },
    onSelectorChange(e: string): void {
      if (this.disabled) {
        return;
      }
      const pageSize: number = parseInt(e, 10);
      let pageCount = 1;
      if (pageSize > 0) {
        pageCount = Math.ceil(this.total / pageSize);
      }

      let isIndexChange = false;

      if (this.current > pageCount) {
        isIndexChange = true;
      }

      /**
       * 分页大小变化事件
       * @param {Number} pageSize 分页大小
       * @param {Number} index 当前页
       */
      const pageInfo = {
        curr: isIndexChange ? pageCount : this.current,
        prev: this.current,
        pageSize,
      };
      this.$emit('page-size-change', pageSize, pageInfo);
      if (isIndexChange) {
        this.toPage(pageCount);
      }
    },
    renderTotalContent() {
      const {
        locale,
        total,
        t,
      } = this;
      if (this.$slots.totalContent) {
        return this.$slots.totalContent(null);
      }
      return t(locale.total, { total });
    },
    renderPagination() {
      const {
        paginationClass,
        pageCount,
        totalContent,
        totalClass,
        locale,
        size,
        pageSize,
        disabled,
        sizerClass,
        onSelectorChange,
        pageSizeOptions,
        sizeOptions,
        preBtnClass,
        prevPage,
        current,
        btnWrapClass,
        getButtonClass,
        toPage,
        isFolded,
        isNextMoreShow,
        isPrevMoreShow,
        btnMoreClass,
        prevMorePage,
        nextMorePage,
        simpleClass,
        pages,
        pageCountOption,
        nextBtnClass,
        nextPage,
        jumperClass,
        jumperInputClass,
        jumpIndex,
        jumpToPage,
        t,
        isSimple,
        showJumper,
      } = this;
      const inputEvent = {
        'onUpdate:value': (v: number) => this.jumpIndex = v,
      };

      return (
        <div class={paginationClass}>
          {/* 数据统计区 */}
          {
            totalContent && <div class={totalClass}>
              {this.renderTotalContent()}
            </div>
          }

          {/* select */}
          {
            pageSizeOptions.length && <t-select size={size} value={pageSize} disabled={disabled} class={sizerClass} onChange={onSelectorChange}>
              {
                sizeOptions.map((item, index) => (
                    <t-option
                      value={item.value}
                      label={item.label}
                      key={index}
                    />
                ))
              }
            </t-select>
          }

          {/* 向前按钮 */}
          <div class={preBtnClass} onClick={prevPage} disabled={disabled || current === 1}>
            <t-icon-chevron-left />
          </div>
          {/* 页数 */}
          {
            !isSimple ? <ul class={btnWrapClass}>
              {
                isFolded && <li class={getButtonClass(1)} onClick={() => toPage(1)}>1</li>
              }
              {
                (isFolded && isPrevMoreShow) && <li
                  class={btnMoreClass}
                  onClick={prevMorePage}
                  onMouseover={() => this.prevMore = true}
                  onMouseout={() => this.prevMore = false}
                >
                  {
                    this.prevMore ? <t-icon-chevron-left-double /> : <t-icon-ellipsis/>
                  }
                </li>
              }
              {
                pages.map((item) => (
                  <li class={getButtonClass(item)} key={item} onClick={() => toPage(item)}>
                    { item }
                  </li>
                ))
              }

              {
                (isFolded && isNextMoreShow) && <li
                  class={btnMoreClass}
                  onClick={nextMorePage}
                  onMouseover={() => this.nextMore = true}
                  onMouseout={() => this.nextMore = false}
                >
                  {
                    this.nextMore ? <t-icon-chevron-right-double /> : <t-icon-ellipsis />
                  }
                </li>
              }
              {
                isFolded && <li class={getButtonClass(pageCount)} onClick={() => toPage(pageCount)}>{ pageCount }</li>
              }
            </ul> : <t-select
              size={size}
              value={current}
              disabled={disabled}
              class={simpleClass}
              onChange={toPage}
              options={pageCountOption}
            />
          }
          {/* 向后按钮 */}
          <div class={nextBtnClass} onClick={nextPage} disabled={disabled || current === pageCount}>
            <t-icon-chevron-right />
          </div>
          {/* 跳转 */}
          {
            showJumper && <div class={jumperClass}>
              { t(locale.jumpTo) }
              <t-input class={jumperInputClass} value={jumpIndex} {...inputEvent} onKeydownEnter={jumpToPage} onBlur={jumpToPage} />
              { t(locale.page) }
            </div>
          }
        </div>
      );
    },
  },
  render() {
    const { pageCount } = this;
    return pageCount >= 1 && this.renderPagination();
  },
});
