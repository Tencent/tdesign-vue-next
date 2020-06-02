<template>
  <div :class="_class" v-if="visibleWithOnePage || _pageCount > 1">
    <template v-if="showTotal">
      <div class="_totalClass">
        {{ t(locale.total, { total: total }) }}
      </div>
    </template>
    <div :class="_btnWrapClass">
      <t-button
        :class="_buttonClass"
        size="small"
        icon="left"
        icon-only
        @click="prevPage"
        :disabled="disabled || currentIndex === 1"
      />

      <template v-if="!_isSimple">
        <t-button
          v-if="isFolded"
          :class="_buttonClass"
          size="small"
          @click="toPage(1)"
          :disabled="disabled"
          :theme="getButtonType(1)"
        >1</t-button>
        <t-button
          v-show="isFolded && isPrevMoreShow"
          :class="[_buttonClass, _btnPreMoreClass]"
          size="small"
          icon="more"
          icon-only
          :disabled="disabled"
          @click="prevMorePage"
        />

        <t-button
          size="small"
          v-for="i in pages"
          :key="i"
          :class="_buttonClass"
          :theme="getButtonType(i)"
          @click="toPage(i)"
          :disabled="disabled"
        >{{ i }}</t-button>

        <t-button
          :class="[_buttonClass, _btnNextMoreClass]"
          v-show="isFolded && isNextMoreShow"
          size="small"
          icon="more"
          icon-only
          :disabled="disabled"
          @click="nextMorePage"
        />
        <t-button
          v-if="isFolded"
          :class="_buttonClass"
          size="small"
          @click="toPage(_pageCount)"
          :disabled="disabled"
          :theme="getButtonType(_pageCount)"
        >{{ _pageCount }}</t-button>
      </template>
      <template v-else>
        <div class="_simpleClass">
          <input
            class="_simpleInputClass"
            type="number"
            size="small"
            v-model="jumpIndex"
            :disabled="disabled"
            @keydown.enter="jumpToPage"
            @blur="jumpToPage"
            :min="1"
          />
          <span class="_simpleInputClassTotal">/ {{ _pageCount }}</span>
        </div>
      </template>

      <t-button
        :class="_buttonClass"
        size="small"
        icon="right"
        icon-only
        @click="nextPage"
        :disabled="disabled || currentIndex === _pageCount"
      />
    </div>

    <template v-if="showSizer">
      <select
        size="small"
        :disabled="disabled"
        :class="_selectorClass"
        :value="pageSize"
        @change="onSelectorChange"
      >
        <option :key="i" :value="value" v-for="(value, i) in _pageSizeOption" >
          {{`${value}条/页`}}
        </option>
      </select>
    </template>

    <template v-if="showJumper">
      <div :class="_jumperClass">
        跳至
        <input
          :class="_jumperInputClass"
          type="number"
          size="small"
          :disabled="disabled"
          v-model="jumpIndex"
          @keydown.enter="jumpToPage"
          @blur="jumpToPage"
          :min="1"
        />页
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import config from '../config';
import mixins from '../utils/mixins';
import getLocalRecevierMixins from '../locale/local-receiver';
import RenderComponent from '../utils/render-component';
// import CLASSNAMES from '../utils/classnames';

const { prefix } = config;
const name = `${prefix}-pagination`;

const PaginationLocalReceiver = getLocalRecevierMixins('pagination');

export default mixins(PaginationLocalReceiver).extend({
  name,
  components: {
    RenderComponent,
  },
  model: {
    prop: 'current',
    event: 'update:current',
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
     * 共XXX项数据, 使用返回值作为内容，可用于渲染来自列表的已选中数量
     */
    totalContent: [String, Function],
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
     * todo
     *
     * _class
     * _totalClass
     * _btnWrapClass
     * _buttonClass
     * _selectorClass
     * _jumperClass
     * _simpleClass
     * etc.
     */
    _class(): ClassName {
      return [
        `${name}`, `${name}--${this.size}`,
      ];
    },
    _buttonClass(): ClassName {
      return [`${name}__btn`];
    },
    _totalClass(): ClassName {
      return [`${name}__btn`];
    },
    _btnWrapClass(): ClassName {
      return [`${name}__btn`];
    },
    _btnNextMoreClass(): ClassName {
      return [`${name}__btn`];
    },
    _btnPreMoreClass():  ClassName {
      return [`${name}__btn`];
    },
    _jumperClass(): ClassName {
      return [`${name}__btn`];
    },
    _jumperInputClass(): ClassName {
      return [`${name}__btn`];
    },
    _simpleClass(): ClassName {
      return [`${name}__btn`];
    },
    _selectorClass(): ClassName {
      return [`${name}__btn`];
    },
    _isSimple(): boolean {
      return false;
    },
    _pageCount(): number {
      const c: number = Math.ceil(this.total / this.pageSize);
      return c > 0 ? c : 1;
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
        this.$emit('update:current', current);
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
    getButtonType(index: number): string {
      return this.currentIndex === index ? 'primary' : 'line';
    },
    onSelectorChange(e: MouseEvent): void {
      const pageSize: number = parseInt((e.target as HTMLSelectElement).value, 10);
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
