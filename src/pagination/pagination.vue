<template>
  <div :class="_class" v-if="_pageCount > 1">
    <!--数据统计区-->
    <template v-if="totalContent">
      <div :class="_totalClass">{{ t(locale.total, { total: total }) }}</div>
    </template>
    <!-- select-->
    <template v-if="pageSizeOption.length">
      <t-select :size="size" :value="pageSize" :disabled="disabled" :class="_sizerClass" @change="onSelectorChange">
        <t-option
          v-for="(item, index) in _pageSizeOption"
          :value="item"
          :label="t(locale.itemsPerPage, { size: item })"
          :key="index"
        >
        </t-option>
      </t-select>
    </template>
    <!-- 向前按钮-->
    <div :class="_preBtnClass" @click="prevPage" :disabled="disabled || currentIndex === 1">
      <t-icon-chevron-left></t-icon-chevron-left>
    </div>
    <!-- 页数 -->
    <template v-if="!_isSimple">
      <ul :class="_btnWrapClass">
        <li :class="getButtonClass(1)" v-if="isFolded" @click="toPage(1)">1</li>
        <li
          :class="_btnMoreClass"
          v-if="isFolded && isPrevMoreShow"
          @click="prevMorePage"
          @mouseover="prevMore = true"
          @mouseout="prevMore = false"
        >
          <template v-if="prevMore">
            <t-icon-chevron-left-double></t-icon-chevron-left-double>
          </template>
          <template v-else><t-icon-ellipsis></t-icon-ellipsis></template>
        </li>
        <li :class="getButtonClass(i)" v-for="i in pages" :key="i" @click="toPage(i)">
          {{ i }}
        </li>
        <li
          :class="_btnMoreClass"
          v-if="isFolded && isNextMoreShow"
          @click="nextMorePage"
          @mouseover="nextMore = true"
          @mouseout="nextMore = false"
        >
          <template v-if="nextMore">
            <t-icon-chevron-right-double></t-icon-chevron-right-double>
          </template>
          <template v-else><t-icon-ellipsis></t-icon-ellipsis></template>
        </li>
        <li :class="getButtonClass(_pageCount)" v-if="isFolded" @click="toPage(_pageCount)">{{ _pageCount }}</li>
      </ul>
    </template>
    <template v-else>
      <t-select :size="size" :value="currentIndex" :disabled="disabled" :class="_simpleClass" @change="toPage">
        <t-option v-for="(item, index) in _pageCountOption" :value="item" :label="`${item}/${_pageCount}`" :key="index">
        </t-option>
      </t-select>
    </template>
    <!-- 向后按钮-->
    <div :class="_nextBtnClass" @click="nextPage" :disabled="disabled || currentIndex === _pageCount">
      <t-icon-chevron-right></t-icon-chevron-right>
    </div>
    <!-- 跳转-->
    <template v-if="showJumper">
      <div :class="_jumperClass">
        {{ t(locale.jumpTo) }}
        <t-input :class="_jumperInputClass" v-model="jumpIndex" @keydown.enter="jumpToPage" @blur="jumpToPage" />
        {{ t(locale.page) }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
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
import props from '../../types/pagination/props';

const { prefix } = config;
const name = `${prefix}-pagination`;

const PaginationLocalReceiver = getLocalRecevierMixins('pagination');

export default mixins(PaginationLocalReceiver).extend({
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
  model: {
    prop: 'current',
    event: 'change',
  },
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
  data() {
    return {
      jumpIndex: this.current,
      currentIndex: this.current,
      prevMore: false,
      nextMore: false,
    };
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
  computed: {
    /**
     * 样式计算
     */
    _class(): ClassName {
      return [
        `${name}`,
        CLASSNAMES.SIZE[this.size],
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
        },
      ];
    },
    _totalClass(): ClassName {
      return [`${name}__total`];
    },
    _sizerClass(): ClassName {
      return [
        `${name}__select`,
        // {
        //   [CLASSNAMES.STATUS.disabled]: this.disabled,
        // },
      ];
    },
    _preBtnClass(): ClassName {
      return [
        `${name}__btn`,
        `${name}__btn--prev`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled || this.currentIndex === 1,
        },
      ];
    },
    _nextBtnClass(): ClassName {
      return [
        `${name}__btn`,
        `${name}__btn--next`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled || this.currentIndex === this._pageCount,
        },
      ];
    },
    _btnWrapClass(): ClassName {
      return [`${name}__pager`];
    },
    _btnMoreClass(): ClassName {
      return [
        `${name}__number`,
        `${name}__number--more`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
        },
      ];
    },
    _jumperClass(): ClassName {
      return [`${name}__jump`];
    },
    _jumperInputClass(): ClassName {
      return [
        `${name}__input`,
        // {
        //   [CLASSNAMES.STATUS.disabled]: this.disabled,
        // },
      ];
    },
    _simpleClass(): ClassName {
      return [`${name}__select`];
    },
    _isSimple(): boolean {
      return this.theme === 'simple';
    },
    _pageCount(): number {
      const c: number = Math.ceil(this.total / this.pageSize);
      return c > 0 ? c : 1;
    },
    _pageCountOption(): Array<number> {
      const ans = [];
      for (let i = 1; i <= this._pageCount; i++) {
        ans.push(i);
      }
      return ans;
    },
    _pageSizeOption(): Array<number> {
      const data = this.pageSizeOption as Array<number>;
      return data.find(v => v === this.pageSize)
        ? data
        : data.concat(this.pageSize).sort((a: number, b: number) => a - b);
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
      return this._pageCount - 1 - this.curPageRightCount > this.currentIndex;
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
          start = this.isPrevMoreShow ? this._pageCount - this.foldedMaxPageBtn + 1 : 2;
          end = this.isPrevMoreShow ? this._pageCount - 1 : this.foldedMaxPageBtn;
        }
      } else {
        start = 1;
        end = this._pageCount;
      }

      for (let i = start; i <= end; i++) {
        array.push(i);
      }
      return array;
    },

    isFolded(): boolean {
      return this._pageCount > this.maxPageBtn;
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
      } else if (pageIndex > this._pageCount) {
        current = this._pageCount;
      }
      if (this.currentIndex !== current) {
        const prev = this.currentIndex;
        this.currentIndex = current;
        this.jumpIndex = current;
        this.$emit('change', current, {
          curr: current,
          prev,
          pageSize: this.pageSize,
        });
        if (typeof this.onChange === 'function') {
          this.onChange(current, {
            curr: current,
            prev,
            pageSize: this.pageSize,
          });
        }
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
      this.$emit('update:pageSize', pageSize);
      this.$emit('pageSizeChange', pageSize, {
        curr: isIndexChange ? pageCount : this.currentIndex,
        prev: this.currentIndex,
        pageSize,
      });
      if (typeof this.onPageSizeChange === 'function') {
        this.onPageSizeChange(pageSize, {
          curr: isIndexChange ? pageCount : this.currentIndex,
          prev: this.currentIndex,
          pageSize,
        });
      }
      if (isIndexChange) {
        this.toPage(pageCount);
      }
    },
  },
});
</script>
