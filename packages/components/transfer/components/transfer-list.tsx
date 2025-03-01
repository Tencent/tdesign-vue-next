import { defineComponent, VNode, PropType, ref, computed, watch, toRefs } from 'vue';
import {
  EmptyType,
  SearchEvent,
  SearchOption,
  TransferValue,
  TdTransferProps,
  TransferListType,
  TransferItemOption,
} from '../types';
import { PageInfo, TdPaginationProps, Pagination } from '../../pagination';
import { Checkbox as TCheckbox, CheckboxGroup as TCheckboxGroup, CheckboxProps } from '../../checkbox';
import { getLefCount, getDataValues, TARGET } from '../utils';
import Search from './transfer-search';
import { useTNodeDefault } from '../../hooks/tnode';

import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import { isString, filter, cloneDeep } from 'lodash-es';
import useDragSort from '../hooks/useDragSort';

const props = {
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
  isTreeMode: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  onCheckedChange: Function as PropType<(event: Array<TransferValue>) => void>,
  onPageChange: Function,
  onScroll: Function,
  onSearch: Function,
  onDataChange: Function as PropType<(data: Array<TransferValue>, movedValue: Array<TransferValue>) => void>,
  draggable: Boolean,
  currentValue: {
    type: Array as PropType<Array<TransferValue>>,
  },
};

export default defineComponent({
  name: 'TTransferList',
  props,
  setup(props) {
    const classPrefix = usePrefixClass();
    const { currentValue } = toRefs(props);
    const { t, globalConfig } = useConfig('transfer');
    // 搜索框输入内容
    const filterValue = ref('');
    // 用于兼容处理 Pagination 的非受控属性（非受控属性仅有 change 事件变化，无 props 变化，因此只需监听事件）
    const defaultCurrent = ref(1);
    // 用于兼容处理 Pagination 的非受控属性
    const defaultPageSize = ref(0);

    const currentPage = computed(() => {
      const pagination = props.pagination as any;
      return pagination?.current || defaultCurrent.value || pagination?.defaultCurrent;
    });
    const pageSize = computed(() => {
      const pagination = props.pagination as any;
      return pagination?.pageSize || defaultPageSize.value || pagination?.defaultPageSize;
    });

    const filteredData = computed(() => {
      const isTreeData = props.dataSource.some((item) => item.children && item.children.length);
      if (!isTreeData) {
        return props.dataSource.filter((item: TransferItemOption) => {
          const label = item && item.label.toString();
          return label.toLowerCase().indexOf(filterValue.value.toLowerCase()) > -1;
        });
      } else {
        return filteredTreeData(props.dataSource, filterValue.value);
      }
    });

    const pageTotal = computed(() => {
      return (filteredData.value && filteredData.value.length) || 0;
    });

    const curPageData = computed(() => {
      let pageData = filteredData.value;
      if (!props.pagination) return pageData;
      if (pageSize.value === 0) return pageData;
      const startIndex = (currentPage.value - 1) * pageSize.value;
      const endIndex = currentPage.value * pageSize.value;
      pageData = pageData.slice(startIndex, endIndex);
      return pageData;
    });
    const paginationProps = computed(() => {
      const defaultPaginationProps: TdPaginationProps = {
        totalContent: false,
        pageSizeOptions: [],
      };
      return typeof props.pagination === 'object'
        ? {
            ...defaultPaginationProps,
            ...props.pagination,
            size: 'small',
            theme: 'simple',
            current: currentPage.value,
            total: pageTotal.value,
            pageSize: pageSize.value,
          }
        : {};
    });
    const { onDragStart, onDragEnd, onDrop, onDragOver, onDragLeave } = useDragSort(
      currentValue,
      curPageData,
      props.onDataChange,
    );
    const isAllChecked = computed(() => {
      const allValue = getDataValues(props.dataSource, [], { isTreeMode: props.isTreeMode, include: false });

      return (
        props.checkedValue.length > 0 &&
        (props.isTreeMode
          ? allValue.every((item) => props.checkedValue.includes(item))
          : (props.search ? filteredData.value : props.dataSource).every(
              (item: TransferItemOption) => item.disabled || props.checkedValue.includes(item.value),
            ))
      );
    });
    const indeterminate = computed(() => {
      return !isAllChecked.value && props.checkedValue.length > 0;
    });

    const totalCount = computed(() => {
      return getLefCount(props.dataSource);
    });

    watch(totalCount, (val) => {
      if (val <= (currentPage.value - 1) * pageSize.value) {
        const lastPage = Math.ceil(val / pageSize.value);
        defaultCurrent.value = lastPage;
      }
    });

    const filteredTreeData = (list: TransferItemOption[], keyword: string) => {
      const res = filter(cloneDeep(list), (node) => {
        if (node.label.toLowerCase().includes(keyword.toLowerCase())) {
          return true;
        }
        if (node.children && node.children.length > 0) {
          node.children = filteredTreeData(node.children, keyword);
          if (node.children.length > 0) {
            return true;
          }
        }
        return false;
      });
      return res;
    };

    const handlePaginationChange = (pageInfo: PageInfo) => {
      props.onPageChange?.(pageInfo);
      defaultCurrent.value = pageInfo.current;
      defaultPageSize.value = pageInfo.pageSize;
    };
    const handleCheckedChange = (val: Array<TransferValue>) => {
      props.onCheckedChange?.(val);
    };
    const handleCheckedAllChange = (checked: boolean) => {
      if (checked) {
        const allValue = getDataValues(props.search ? filteredData.value : props.dataSource, [], {
          isTreeMode: props.isTreeMode,
          include: false,
        });
        handleCheckedChange(allValue);
      } else {
        handleCheckedChange([]);
      }
    };
    const handleScroll = (e: Event) => {
      props.onScroll?.(e);
    };
    const handleSearch = (e: any) => {
      const event: SearchEvent = {
        query: e.value,
        type: props.listType as TransferListType,
        e: e.e,
        trigger: e.trigger,
      };
      filterValue.value = e.value;
      props.onSearch?.(event);
    };
    const renderTNodeJSX = useTNodeDefault();
    const renderTitle = () => {
      const defaultNode = props.title && isString(props.title) ? <template>{props.title}</template> : null;
      const titleNode = renderTNodeJSX('title', {
        defaultNode,
        params: {
          type: props.listType,
        },
      });
      return <span>{titleNode}</span>;
    };
    const renderContent = () => {
      const isDraggable = props.draggable && props.listType === TARGET;
      let defaultNode: JSX.Element = null;
      if (!isDraggable) {
        defaultNode = (
          <TCheckboxGroup value={props.checkedValue} onChange={handleCheckedChange}>
            {curPageData.value.map((item, index) => (
              <TCheckbox
                disabled={props.disabled || item.disabled}
                value={item.value}
                needRipple={true}
                class={[
                  `${classPrefix.value}-transfer__list-item`,
                  props.checkedValue.includes(item.value) ? `${classPrefix.value}-is-checked` : '',
                ]}
                key={item.key}
                {...props.checkboxProps}
              >
                {renderTNodeJSX('transferItem', {
                  defaultNode: <span>{item.label}</span>,
                  params: { data: item.data, index, type: props.listType },
                })}
              </TCheckbox>
            ))}
          </TCheckboxGroup>
        );
      } else {
        defaultNode = (
          <TCheckboxGroup value={props.checkedValue} onChange={handleCheckedChange}>
            {curPageData.value.map((item, index) => (
              <div
                draggable={isDraggable}
                onDragend={onDragEnd}
                onDragstart={onDragStart}
                onDragover={onDragOver}
                onDragleave={onDragLeave}
                onDrop={onDrop}
                data-index={index}
              >
                <TCheckbox
                  disabled={props.disabled || item.disabled}
                  value={item.value}
                  needRipple={true}
                  class={[
                    `${classPrefix.value}-transfer__list-item`,
                    props.checkedValue.includes(item.value) ? `${classPrefix.value}-is-checked` : '',
                  ]}
                  key={item.key}
                  {...props.checkboxProps}
                >
                  {renderTNodeJSX('transferItem', {
                    defaultNode: <span>{item.label}</span>,
                    params: { data: item.data, index, type: props.listType },
                  })}
                </TCheckbox>
              </div>
            ))}
          </TCheckboxGroup>
        );
      }

      return (
        <div class={[`${classPrefix.value}-transfer__list-content`, 'narrow-scrollbar']} onScroll={handleScroll}>
          {renderTNodeJSX('tree', {
            defaultNode,
            params: {
              data: curPageData.value,
              value: props.checkedValue,
              onChange: handleCheckedChange,
            },
          })}
        </div>
      );
    };
    const renderEmpty = () => {
      const empty = props.empty || t(globalConfig.value.empty);
      const defaultNode: VNode = isString(empty) ? <span>{empty}</span> : null;
      return (
        <div class={`${classPrefix.value}-transfer__empty`}>
          {renderTNodeJSX('empty', {
            defaultNode,
            params: {
              type: props.listType,
            },
          })}
        </div>
      );
    };
    const renderFooter = () => {
      const defaultNode = isString(props.footer) ? (
        <div class={`${classPrefix.value}-transfer__footer`}>{props.footer}</div>
      ) : null;
      return renderTNodeJSX('footer', {
        defaultNode,
        params: {
          type: props.listType,
        },
      });
    };

    return () => (
      <div class={[`${classPrefix.value}-transfer__list`, `${classPrefix.value}-transfer__list-${props.listType}`]}>
        <div class={`${classPrefix.value}-transfer__list-header`}>
          <div>
            {props.checkAll && (
              <TCheckbox
                disabled={props.disabled || !props.dataSource.length}
                checked={isAllChecked.value}
                indeterminate={indeterminate.value}
                onChange={handleCheckedAllChange}
              />
            )}
            <span>
              {t(globalConfig.value.title, {
                checked: props.checkedValue.length,
                total: totalCount.value,
              })}
            </span>
          </div>
          {renderTitle()}
        </div>
        <div
          class={[
            `${classPrefix.value}-transfer__list-body`,
            props.search ? `${classPrefix.value}-transfer__list--with-search` : '',
          ]}
        >
          {props.search && (
            <Search
              searchValue={filterValue.value}
              placeholder={t(globalConfig.value.placeholder)}
              onChange={handleSearch}
              disabled={props.disabled}
              search={props.search}
            />
          )}
          {curPageData.value.length > 0 ? renderContent() : renderEmpty()}
        </div>
        {props.pagination && pageSize.value > 0 && pageTotal.value > 0 && (
          <div class={`${classPrefix.value}-transfer__list-pagination`}>
            <Pagination {...paginationProps.value} onChange={handlePaginationChange} />
          </div>
        )}
        {renderFooter()}
      </div>
    );
  },
});
