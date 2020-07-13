<template>
  <div :class="_class" v-if="visibleWithOnePage || _pageCount > 1">
    <!--数据统计区-->
    <template v-if="showTotal">
      <div :class="_totalClass">{{ t(locale.total, { total: total }) }}</div>
    </template>
    <!-- select-->
    <template v-if="showSizer">
      <t-select
        :value="pageSize"
        :disabled="disabled"
        :class="_sizerClass"
        @change="onSelectorChange"
      >
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
    <div :class="_preBtnClass"  @click="prevPage" :disabled="disabled || currentIndex === 1">
      <t-icon-arrow-left></t-icon-arrow-left>
    </div>
    <!-- 页数 -->
    <template v-if="!_isSimple">
      <ul :class="_btnWrapClass">
        <li :class="getButtonClass(1)" v-if="isFolded"
            @click="toPage(1)">1</li>
        <li :class="_btnMoreClass"
            v-show="isFolded && isPrevMoreShow" @click="prevMorePage" >
          <t-icon-more></t-icon-more>
        </li>
        <li :class="getButtonClass(i)"
            v-for="i in pages" :key="i" @click="toPage(i)">
          {{ i }}
        </li>
        <li :class="_btnMoreClass"
            v-show="isFolded && isNextMoreShow" @click="nextMorePage">
          <t-icon-more></t-icon-more>
        </li>
        <li :class="getButtonClass(_pageCount)" v-if="isFolded"
            @click="toPage(_pageCount)">{{ _pageCount }}</li>
      </ul>
    </template>
    <template v-else>
      <t-select
        :value="currentIndex"
        :disabled="disabled"
        :class="_simpleClass"
        @change="toPage"
      >
        <t-option
          v-for="(item, index) in _pageCountOption"
          :value="item"
          :label="`${item}/${_pageCount}`"
          :key="index"
        >
        </t-option>
      </t-select>
    </template>
    <!-- 向后按钮-->
    <div :class="_nextBtnClass" @click="nextPage"
         :disabled="disabled || currentIndex === _pageCount">
      <t-icon-arrow-right></t-icon-arrow-right>
    </div>
    <!-- 跳转-->
    <template v-if="showJumper">
      <div :class="_jumperClass">
        {{ t(locale.jumpTo) }}
        <t-input :class="_jumperInputClass" v-model="jumpIndex"
                 @keydown.enter="jumpToPage" @blur="jumpToPage"/>
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
import TIconArrowLeft from '../icon/arrow-left';
import TIconArrowRight from '../icon/arrow-right';
import TIconMore from '../icon/more';
import TInput from '../input';
import { Select } from '../select';
import CLASSNAMES from '../utils/classnames';


const { prefix } = config;
const name = `${prefix}-pagination`;

const PaginationLocalReceiver = getLocalRecevierMixins('pagination');

export default mixins(PaginationLocalReceiver).extend({
  name,
  components: {
    RenderComponent,
    TIconArrowLeft,
    TIconArrowRight,
    TIconMore,
    TInput,
    Select,
  },
  model: {
    prop: 'current',
    event: 'change',
  },
  props: {
    /**
     * 当前页
     *
     * 支持v-model
     */
    current: {
      type: Number,
      default: 1,
      validator(v: number): boolean {
        return v > 0;
      },
    },
    /**
     * 类型
     *
     * 可选值 'default' 'simple'，默认值 'default'
     */
    theme: {
      type: String,
      default: 'default',
      validator(v: string): boolean {
        return ['default', 'simple'].indexOf(v) > -1;
      },
    },
    /**
     * 组件大小
     *
     * 可选值 'default' 'small'，默认值 'default'
     */
    size: {
      type: String,
      default: 'default',
      validator(v: string): boolean {
        return ['default', 'small'].indexOf(v) > -1;
      },
    },
    /**
     * 总记录数
     */
    total: {
      type: Number,
      default: 0,
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
    /**
     * 显示页面大小控制
     */
    showSizer: {
      type: Boolean,
      default: false,
    },
    /**
     * 显示页面跳转输入框
     */
    showJumper: {
      type: Boolean,
      default: false,
    },
    /**
     * 显示总数，传入totalContent后，默认为true
     */
    showTotal: {
      type: Boolean,
      default: false,
    },
    /**
     * 禁用分页功能
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /*
     * 只有一页时，是否显示分页。
     * 默认值 true
     */
    visibleWithOnePage: {
      type: Boolean,
      default: true,
    },
    /**
     * 可选分页大小
     */
    pageSizeOption: {
      type: Array,
      default(): Array<number> {
        return [5, 10, 20, 50];
      },
    },
    /**
     * 最多显示页码按钮数
     */
    maxPageBtn: {
      type: Number,
      default: 10,
    },
    /**
     * 折叠时最多显示页码按钮数
     */
    foldedMaxPageBtn: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      jumpIndex: this.current,
      currentIndex: this.current,
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
        `${name}__select-demo`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
        },
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
    _btnMoreClass():  ClassName {
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
        `${name}__input-demo`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
        },
      ];
    },
    _simpleClass(): ClassName {
      return [`${name}__select`, `${name}__select-demo`];
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
      for (let i = 1;i <= this._pageCount;i++) {
        ans.push(i);
      }
      return ans;
    },
    _pageSizeOption(): Array<number> {
      const data = this.pageSizeOption as Array<number>;
      return data.find(v => v === this.pageSize)
        ? data
        : data
          .concat(this.pageSize)
          .sort((a: number, b: number) => a - b);
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
          start = this.isPrevMoreShow
            ? this._pageCount - this.foldedMaxPageBtn + 1
            : 2;
          end = this.isPrevMoreShow
            ? this._pageCount - 1
            : this.foldedMaxPageBtn;
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
        this.$emit(
          'change',
          current,
          {
            curr: current,
            prev,
            pageSize: this.pageSize,
          }
        );
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
      this.$emit(
        'pageSizeChange',
        pageSize,
        {
          curr: isIndexChange ? pageCount : this.currentIndex,
          prev: this.currentIndex,
          pageSize,
        }
      );
      if (isIndexChange) {
        this.toPage(pageCount);
      }
    },
  },
});
</script>
