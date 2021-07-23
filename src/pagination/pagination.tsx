import { defineComponent } from 'vue';
import config from '../config';
import mixins from '../utils/mixins';
import getLocalRecevierMixins from '../locale/local-receiver';
import RenderComponent from '../utils/render-component';
import TIconChevronLeft from '../icon/chevron-left';
import TIconChevronRight from '../icon/chevron-right';
import TIconChevronLeftDouble from '../icon/chevron-left-double';
import TIconChevronRightDouble from '../icon/chevron-right-double';
import TIconEllipsis from '../icon/ellipsis';
import TInput from '../input';
import { Select } from '../select';
import CLASSNAMES from '../utils/classnames';
import props from '@TdTypes/pagination/props';
import { TdPaginationProps } from '@TdTypes/pagination/TdPaginationProps';

const { prefix } = config;
const name = `${prefix}-pagination`;

const PAGINATION_LOCAL_REVEIVER = getLocalRecevierMixins('pagination');

export default defineComponent({
  name,
  components: {
    RenderComponent,
    TIconChevronLeft,
    TIconChevronRight,
    TIconChevronLeftDouble,
    TIconChevronRightDouble,
    TIconEllipsis,
    TInput,
    Select,
  },
  ...mixins(PAGINATION_LOCAL_REVEIVER),
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
  emits: ['change', 'update:pageSize', 'pageSizeChange'],
  data() {
    return {
      jumpIndex: this.current,
      currentIndex: this.current,
      prevMore: false,
      nextMore: false,
    };
  },
  computed: {
    /**
     * 样式计算
     */
    CLASS(): ClassName {
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
          [CLASSNAMES.STATUS.disabled]: this.disabled || this.currentIndex === 1,
        },
      ];
    },
    nextBtnClass(): ClassName {
      return [
        `${name}__btn`,
        `${name}__btn--next`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled || this.currentIndex === this.pageCount,
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
    pageCountOption(): Array<number> {
      const ans = [];
      for (let i = 1; i <= this.pageCount; i++) {
        ans.push(i);
      }
      return ans;
    },
    pageSizeOption(): Array<{ label: string; value: number }> {
      const { pageSize } = this;
      const locale = this.locale as any;
      const pageSizeOptions = this.pageSizeOptions as TdPaginationProps['pageSizeOptions'];
      const isNumber = (val: any) => typeof val === 'number';
      const data = pageSizeOptions.map((item: { label: string; value: any }) => ({
        label: isNumber(item) ? locale.itemsPerPage : item.label.replace(/\d+/, '{size}'),
        value: isNumber(item) ? item : item.value,
      }));
      return data.find((item: { value: number }) => item.value === pageSize)
        ? data
        : data
          .concat({
            value: pageSize,
            label: (data[0] && data[0].label) || locale.itemsPerPage,
          })
          .sort((a: any, b: any) => a.value - b.value);
    },

    curPageLeftCount(): number {
      return Math.ceil((this.foldedMaxPageBtn - 1) / 2);
    },

    curPageRightCount(): number {
      return Math.ceil((this.foldedMaxPageBtn - 1) / 2);
    },

    isPrevMoreShow(): boolean {
      return 2 + this.curPageLeftCount < this.currentIndex;
    },

    isNextMoreShow(): boolean {
      return this.pageCount - 1 - this.curPageRightCount > this.currentIndex;
    },

    pages(): Array<number> {
      const array = [];
      let start;
      let end;

      if (this.isFolded) {
        if (this.isPrevMoreShow && this.isNextMoreShow) {
          start = this.currentIndex - this.curPageLeftCount;
          end = this.currentIndex + this.curPageRightCount;
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
  watch: {
    current: {
      handler(v: number): void {
        this.currentIndex = v;
        this.jumpIndex = v;
      },
      immediate: true,
    },
  },
  methods: {
    toPage(pageIndex: number): void {
      if (this.disabled) {
        return;
      }
      let current = pageIndex;
      if (pageIndex < 1) {
        current = 1;
      } else if (pageIndex > this.pageCount) {
        current = this.pageCount;
      }
      if (this.currentIndex !== current) {
        const prev = this.currentIndex;
        this.currentIndex = current;
        this.jumpIndex = current;
        const pageInfo = {
          curr: current,
          prev,
          pageSize: this.pageSize,
        };
        this.$emit('change', current, pageInfo);
        this.currentIndex = current;
      }
    },
    prevPage(): void {
      this.toPage(this.currentIndex - 1);
    },
    nextPage(): void {
      this.toPage(this.currentIndex + 1);
    },
    prevMorePage(): void {
      this.toPage(this.currentIndex - this.foldedMaxPageBtn);
    },
    nextMorePage(): void {
      this.toPage(this.currentIndex + this.foldedMaxPageBtn);
    },
    jumpToPage(): void {
      this.toPage(Number(this.jumpIndex));
    },
    getButtonClass(index: number): ClassName {
      return [
        `${name}__number`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
          [CLASSNAMES.STATUS.current]: this.currentIndex === index,
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

      if (this.currentIndex > pageCount) {
        isIndexChange = true;
      }

      /**
       * 分页大小变化事件
       * @param {Number} pageSize 分页大小
       * @param {Number} index 当前页
       */
      const pageInfo = {
        curr: isIndexChange ? pageCount : this.currentIndex,
        prev: this.currentIndex,
        pageSize,
      };
      this.$emit('update:pageSize', pageSize);
      this.$emit('pageSizeChange', pageSize, pageInfo);
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
        CLASS,
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
        pageSizeOption,
        preBtnClass,
        prevPage,
        currentIndex,
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
        <div class={CLASS}>
          {/* 数据统计区 */}
          {
            totalContent && <div class={totalClass}>
              {this.renderTotalContent()}
            </div>
          }

          {/* select */}
          {
            pageSizeOptions.length &&  <t-select size={size} value={pageSize} disabled={disabled} class={sizerClass} onChange={onSelectorChange}>
              {
                pageSizeOption.map((item, index) => (
                    <t-option
                      value={item.value}
                      label={t(item.label, { size: item.value })}
                      key={index}
                    >
                    </t-option>
                ))
              }
            </t-select>
          }

          {/* 向前按钮 */}
          <div class={preBtnClass} onClick={prevPage} disabled={disabled || currentIndex === 1}>
            <t-icon-chevron-left></t-icon-chevron-left>
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
                    this.prevMore ? <t-icon-chevron-left-double></t-icon-chevron-left-double> : <t-icon-ellipsis></t-icon-ellipsis>
                  }
                </li>
              }
              {
                pages.map(item => (
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
                    this.nextMore ? <t-icon-chevron-right-double></t-icon-chevron-right-double> : <t-icon-ellipsis></t-icon-ellipsis>
                  }
                </li>
              }
              {
                isFolded && <li class={getButtonClass(pageCount)} onClick={() => toPage(pageCount)}>{ pageCount }</li>
              }
            </ul> : <t-select
              size={size}
              value={currentIndex}
              disabled={disabled}
              class={simpleClass}
              onChange={toPage}
            >
              {
                pageCountOption.map(item => <t-option
                    value={item}
                    label={`${item}/${pageCount}`}
                    key={`${item}/${pageCount}`}
                  />)
              }

            </t-select>
          }
          {/* 向后按钮 */}
          <div class={nextBtnClass} onClick={nextPage} disabled={disabled || currentIndex === pageCount}>
            <t-icon-chevron-right></t-icon-chevron-right>
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
    return pageCount > 1 && this.renderPagination();
  },
});
