import { defineComponent, VNode, PropType } from 'vue';
import {
  EmptyType,
  SearchEvent,
  SearchOption,
  TransferValue,
  TdTransferProps,
  TransferListType,
  TransferItemOption,
} from '../interface';
import { PageInfo, TdPaginationProps, Pagination } from '../../pagination';
import { Checkbox as TCheckbox, CheckboxGroup as TCheckboxGroup, CheckboxProps } from '../../checkbox';
import { getLeefCount, getDataValues } from '../utils';
import Search from './transfer-search';
import { renderTNodeJSXDefault } from '../../utils/render-tnode';

import { usePrefixClass } from '../../config-provider';

export default defineComponent({
  name: 'TTransferList',
  components: {
    Search,
    TCheckbox,
    TCheckboxGroup,
    Pagination,
  },
  props: {
    checkboxProps: {
      type: Object as PropType<CheckboxProps>,
      default: () => ({}),
    },
    dataSource: {
      type: Array as PropType<Array<TransferItemOption>>,
      default(): Array<TransferItemOption> {
        return [];
      },
    },
    listType: {
      type: String as PropType<TransferListType>,
      default: 'target',
    },
    title: {
      type: [String, Function],
    },
    checkedValue: {
      type: Array as PropType<Array<TransferValue>>,
      default(): Array<TransferValue> {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    search: {
      type: [Boolean, Object] as PropType<SearchOption>,
      default: false,
    },
    transferItem: Function as PropType<TdTransferProps['transferItem']>,
    empty: {
      type: [Function, String] as PropType<EmptyType>,
    },
    pagination: [Boolean, Object],
    footer: [Function, String],
    checkAll: Boolean,
    t: Function,
    global: Object,
    isTreeMode: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['pageChange', 'checkedChange', 'scroll', 'search'],
  setup() {
    const classPrefix = usePrefixClass();
    return {
      classPrefix,
    };
  },
  data() {
    return {
      filterValue: '', // 搜索框输入内容,
      // 用于兼容处理 Pagination 的非受控属性（非受控属性仅有 change 事件变化，无 props 变化，因此只需监听事件）
      defaultCurrent: 1,
      // 用于兼容处理 Pagination 的非受控属性
      defaultPageSize: 0,
    };
  },
  computed: {
    // this.defaultCurrent 属于分页组件抛出的事件参数，非受控的情况也会有该事件触发
    // this.pagination.defaultCurrent 为表格组件传入的非受控属性
    currentPage(): number {
      return this.pagination.current || this.defaultCurrent || this.pagination.defaultCurrent;
    },
    pageSize(): number {
      return this.pagination.pageSize || this.defaultPageSize || this.pagination.defaultPageSize;
    },
    pageTotal(): number {
      return (this.filteredData && this.filteredData.length) || 0;
    },
    filteredData(): Array<TransferItemOption> {
      return this.dataSource.filter((item: TransferItemOption) => {
        const label = item && item.label.toString();
        return label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1;
      });
    },
    curPageData(): Array<TransferItemOption> {
      let pageData = this.filteredData;
      if (!this.pagination) return pageData;
      if (this.pageSize === 0) return pageData;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = this.currentPage * this.pageSize;
      pageData = pageData.slice(startIndex, endIndex);
      return pageData;
    },
    paginationProps(): TdPaginationProps {
      const defaultPaginationProps: TdPaginationProps = {
        size: 'small',
        theme: 'simple',
        totalContent: false,
        pageSizeOptions: [],
      };
      return typeof this.pagination === 'object'
        ? {
            ...defaultPaginationProps,
            ...this.pagination,
            current: this.currentPage,
            total: this.pageTotal,
            pageSize: this.pageSize,
          }
        : {};
    },
    hasFooter(): boolean {
      return !!this.$slots.default;
    },
    indeterminate(): boolean {
      return !this.isAllChecked && this.checkedValue.length > 0;
    },
    isAllChecked(): boolean {
      return (
        this.checkedValue.length > 0 &&
        this.dataSource.every((item: TransferItemOption) => item.disabled || this.checkedValue.includes(item.value))
      );
    },
    totalCount(): number {
      return getLeefCount(this.dataSource);
    },
  },
  methods: {
    handlePaginationChange(pageInfo: PageInfo): void {
      this.$emit('pageChange', pageInfo);
      this.defaultCurrent = pageInfo.current;
      this.defaultPageSize = pageInfo.pageSize;
    },
    handleCheckedChange(val: Array<TransferValue>): void {
      this.$emit('checkedChange', val);
    },
    handleCheckedAllChange(checked: boolean): void {
      if (checked) {
        const allValue = getDataValues(this.dataSource, [], { isTreeMode: this.isTreeMode, include: false });
        this.handleCheckedChange(allValue);
      } else {
        this.handleCheckedChange([]);
      }
    },
    scroll(e: Event): void {
      this.$emit('scroll', e);
    },
    handleSearch(e: any): void {
      const event: SearchEvent = {
        query: e.value,
        type: this.listType as TransferListType,
        e: e.e,
        trigger: e.trigger,
      };
      this.filterValue = e.value;
      this.$emit('search', event);
    },
    renderTitle() {
      const defaultNode = this.title && typeof this.title === 'string' ? <template>{this.title}</template> : null;
      const titleNode = renderTNodeJSXDefault(this, 'title', {
        defaultNode,
        params: {
          type: this.listType,
        },
      });
      return <span>{titleNode}</span>;
    },
    renderContent() {
      const defaultNode = (
        <TCheckboxGroup value={this.checkedValue} onChange={this.handleCheckedChange}>
          {this.curPageData.map((item, index) => (
            <TCheckbox
              disabled={this.disabled || item.disabled}
              value={item.value}
              needRipple={true}
              class={[
                `${this.classPrefix}-transfer__list-item`,
                this.checkedValue.includes(item.value) ? `${this.classPrefix}-is-checked` : '',
              ]}
              key={item.key}
              {...{ props: this.checkboxProps }}
            >
              {renderTNodeJSXDefault(this, 'transferItem', {
                defaultNode: <span>{item.label}</span>,
                params: { data: item.data, index, type: this.listType },
              })}
            </TCheckbox>
          ))}
        </TCheckboxGroup>
      );
      return (
        <div class={`${this.classPrefix}-transfer__list-content narrow-scrollbar`} onScroll={this.scroll}>
          {/* {this.$slots.tree
            ? this.$slots.tree({
                data: this.curPageData,
                value: this.checkedValue,
                onChange: this.handleCheckedChange,
              })
            : defaultNode} */}
          {renderTNodeJSXDefault(this, 'tree', {
            defaultNode,
            params: {
              data: this.curPageData,
              value: this.checkedValue,
              onChange: this.handleCheckedChange,
            },
          })}
        </div>
      );
    },
    renderEmpty() {
      const empty = this.empty || this.t(this.global.empty);
      const defaultNode: VNode = typeof empty === 'string' ? <span>{empty}</span> : null;
      return (
        <div class={`${this.classPrefix}-transfer__empty`}>
          {renderTNodeJSXDefault(this, 'empty', {
            defaultNode,
            params: {
              type: this.listType,
            },
          })}
        </div>
      );
    },
    renderFooter() {
      const defaultNode =
        typeof this.footer === 'string' ? (
          <div class={`${this.classPrefix}-transfer__footer`}>{this.footer}</div>
        ) : null;
      return renderTNodeJSXDefault(this, 'footer', {
        defaultNode,
        params: {
          type: this.listType,
        },
      });
    },
  },
  render() {
    return (
      <div class={`${this.classPrefix}-transfer__list ${this.classPrefix}-transfer__list-${this.listType}`}>
        <div class={`${this.classPrefix}-transfer__list-header`}>
          <div>
            {this.checkAll && (
              <TCheckbox
                disabled={this.disabled || !this.dataSource.length}
                checked={this.isAllChecked}
                indeterminate={this.indeterminate}
                onChange={this.handleCheckedAllChange}
              />
            )}
            <span>
              {this.t(this.global.title, {
                checked: this.checkedValue.length,
                total: this.totalCount,
              })}
            </span>
          </div>
          {this.renderTitle()}
        </div>
        <div
          class={[
            `${this.classPrefix}-transfer__list-body`,
            this.search ? `${this.classPrefix}-transfer__list--with-search` : '',
          ]}
        >
          {this.search && (
            <search
              searchValue={this.filterValue}
              placeholder={this.t(this.global.placeholder)}
              onChange={this.handleSearch}
              disabled={this.disabled}
              search={this.search}
            />
          )}
          {this.curPageData.length > 0 ? this.renderContent() : this.renderEmpty()}
        </div>
        {this.pagination && this.pageSize > 0 && this.pageTotal > 0 && (
          <div class={`${this.classPrefix}-transfer__list-pagination`}>
            <t-pagination {...this.paginationProps} onChange={this.handlePaginationChange} />
          </div>
        )}
        {this.renderFooter()}
      </div>
    );
  },
});
