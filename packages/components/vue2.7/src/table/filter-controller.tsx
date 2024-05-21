import type {
  CreateElement,
  PropType,
} from '@td/adapter-vue';
import { defineComponent, ref } from '@td/adapter-vue';
import { SearchIcon, FilterIcon as TdFilterIcon } from 'tdesign-icons-vue';
import { escapeRegExp, isEmpty, isFunction, isObject, lowerFirst } from 'lodash-es';
import { useConfig, useGlobalIcon, useTNodeDefault } from '@td/adapter-hooks';
import type { FilterValue, PrimaryTableCol } from '@td/intel/table/type';
import log from '@td/shared/_common/js/log';
import type { AttachNode } from '@td/shared/interface';
import { CheckboxGroup, Input, Popup, RadioGroup, Button as TButton } from '@td/component';
import type { TableConfig } from '@td/intel/config-provider/type';
import type { TdPopupProps as PopupProps } from '@td/intel/popup/type';

type Params = Parameters<CreateElement>;
type FirstParams = Params[0];
type SecondParams = Params[1] | Params[2];

export interface TableFilterControllerProps {
  locale: TableConfig;
  tFilterValue: FilterValue;
  innerFilterValue: FilterValue;
  tableFilterClasses: {
    filterable: string;
    popup: string;
    icon: string;
    popupContent: string;
    result: string;
    inner: string;
    bottomButtons: string;
    contentInner: string;
    inputFilter: string;
    iconWrap: string;
  };
  isFocusClass: string;
  column: PrimaryTableCol;
  colIndex: number;
  primaryTableElement: HTMLDivElement;
  popupProps: PopupProps;
  attach?: AttachNode;
}

export default defineComponent({
  name: 'TableFilterController',

  props: {
    column: Object as PropType<TableFilterControllerProps['column']>,
    colIndex: Number,
    tFilterValue: Object as PropType<TableFilterControllerProps['tFilterValue']>,
    innerFilterValue: Object as PropType<TableFilterControllerProps['innerFilterValue']>,
    tableFilterClasses: Object as PropType<TableFilterControllerProps['tableFilterClasses']>,
    isFocusClass: String,
    primaryTableElement: {},
    popupProps: Object as PropType<TableFilterControllerProps['popupProps']>,
    attach: [String, Function] as PropType<TableFilterControllerProps['attach']>,
    locale: Object,
  },

  setup(props, { emit }) {
    const triggerElementRef = ref<HTMLDivElement>(null);
    const renderTNode = useTNodeDefault();
    const { t, global } = useConfig('table', props.locale);
    const { FilterIcon } = useGlobalIcon({ FilterIcon: TdFilterIcon });
    const filterPopupVisible = ref(false);
    const listFilterValue = ref('');

    const onFilterPopupVisibleChange = (visible: boolean) => {
      filterPopupVisible.value = visible;
      emit('visible-change', visible);
    };

    const getFilterDisplayList = (column: PrimaryTableCol) => {
      const { filter = {} } = column;
      const { listFilterConfig } = filter;
      if (!listFilterValue.value || !filter.listFilterConfig) {
        return filter.list;
      }
      const regExp = new RegExp(escapeRegExp(listFilterValue.value));
      if (listFilterConfig === true) {
        return filter.list.filter(item => regExp.test(item.label));
      }
      if (isObject(listFilterConfig)) {
        return isFunction(listFilterConfig.filterMethod)
          ? filter.list.filter(item => listFilterConfig.filterMethod(item, listFilterValue.value))
          : filter.list.filter(item => regExp.test(item.label));
      }
    };

    return {
      t,
      global,
      FilterIcon,
      filterPopupVisible,
      triggerElementRef,
      listFilterValue,
      renderTNode,
      getFilterDisplayList,
      onFilterPopupVisibleChange,
    };
  },

  render(h) {
    const getFilterContent = (h: CreateElement, column: PrimaryTableCol) => {
      const types = ['single', 'multiple', 'input'];
      if (column.type && !types.includes(column.filter.type)) {
        log.error('Table', `filter.type must be the following: ${JSON.stringify(types)}`);
        return;
      }
      if (!column.filter.type && !column.filter.component) {
        log.error('Table', 'both filter.type and filter.component can not be empty.');
        return;
      }
      const component = {
        single: RadioGroup,
        multiple: CheckboxGroup,
        input: Input,
      }[column.filter.type] || column.filter.component;
      if (!component && !column.filter.component) {
        return;
      }
      const filterComponentProps: { [key: string]: any } = {
        options: ['single', 'multiple'].includes(column.filter.type) ? this.getFilterDisplayList(column) : undefined,
        ...(column.filter?.props || {}),
      };
      if (
        column.colKey
        && this.innerFilterValue
        && column.colKey in (this.innerFilterValue as PropType<TableFilterControllerProps['innerFilterValue']>)
      ) {
        filterComponentProps.value = this.innerFilterValue[column.colKey];
      }
      // 这个代码必须放在这里，否则会造成顺序错误
      const on = {
        change: (val: any) => {
          this.$emit('inner-filter-change', val, column);
          if (column.filter?.confirmEvents?.includes('onChange')) {
            this.filterPopupVisible = false;
          }
        },
      };
      // 允许自定义触发确认搜索的事件
      if (column.filter.confirmEvents) {
        column.filter.confirmEvents.forEach((event) => {
          if (event === 'onChange') {
            return;
          }
          const pureEvent = lowerFirst(event.replace('on', ''));
          on[pureEvent] = () => {
            this.$emit('confirm', column);
            this.filterPopupVisible = false;
          };
        });
      }
      const wrapperListeners: { click?: Function } = {};
      if (column.filter.showConfirmAndReset) {
        wrapperListeners.click = (e: MouseEvent) => e.stopPropagation();
      }

      const renderComponent = () => {
        if (!component) {
          return null;
        }
        const isVueComponent = component.install && component.component;
        if (typeof component === 'function' && !isVueComponent) {
          // component() is going to be deprecated
          return component((v: FirstParams, b: SecondParams) => {
            const attributes = typeof b === 'object' && 'attrs' in b ? b.attrs : {};
            return h(v, {
              props: { ...filterComponentProps },
              attrs: attributes,
              on,
            });
          });
        }
        const filter = (this.column as TableFilterControllerProps['column']).filter || {};
        return (
          <component
            attrs={filter.attrs}
            class={filter.classNames}
            style={filter.style}
            props={{ ...filterComponentProps }}
            on={{ ...on }}
          >
          </component>
        );
      };

      const inputObj = isObject(column.filter.listFilterConfig) ? column.filter.listFilterConfig : {};

      return (
        // @ts-expect-error
        <div class={this.tableFilterClasses.contentInner} on={wrapperListeners}>
          {column.filter.listFilterConfig && (
            <Input
              v-model={this.listFilterValue}
              borderless
              class={[this.tableFilterClasses.inputFilter, inputObj.className].filter(Boolean)}
              scopedSlots={{ prefixIcon: () => <SearchIcon />, ...inputObj.slots }}
              props={inputObj.props}
              style={inputObj.style}
            >
            </Input>
          )}
          {renderComponent()}
        </div>
      );
    };

    const getBottomButtons = (h: CreateElement, column: PrimaryTableCol) => {
      if (!column.filter.showConfirmAndReset) {
        return;
      }
      return (
        <div class={this.tableFilterClasses.bottomButtons}>
          <TButton
            theme="default"
            size="small"
            onClick={() => {
              this.$emit('reset', column);
              this.filterPopupVisible = false;
            }}
          >
            {this.global.resetText}
          </TButton>
          <TButton
            theme="primary"
            size="small"
            onClick={() => {
              this.$emit('confirm', column);
              this.filterPopupVisible = false;
            }}
          >
            {this.global.confirmText}
          </TButton>
        </div>
      );
    };

    const { column, FilterIcon, popupProps } = this;
    // @ts-expect-error
    if (!column.filter || (column.filter && !Object.keys(column.filter).length)) {
      return null;
    }
    const defaultFilterIcon = this.t(this.global.filterIcon) || <FilterIcon />;
    // @ts-expect-error
    const filterValue = this.tFilterValue?.[column.colKey];
    const isObjectTrue = typeof filterValue === 'object' && !isEmpty(filterValue);
    // false is a valid filter value
    const isValueExist = ![null, undefined, ''].includes(filterValue) && typeof filterValue !== 'object';
    return (
      <Popup
        attach={this.attach || (this.primaryTableElement ? () => this.primaryTableElement : undefined)}
        visible={this.filterPopupVisible}
        destroyOnClose
        trigger="click"
        placement="bottom"
        showArrow
        overlayClassName={this.tableFilterClasses.popup}
        on={{
          'visible-change': (val: boolean) => this.onFilterPopupVisibleChange(val),
        }}
        class={[
          this.tableFilterClasses.icon,
          {
            [this.isFocusClass]: isObjectTrue || isValueExist,
          },
        ]}
        content={() => (
          <div class={this.tableFilterClasses.popupContent}>
            {getFilterContent(h, column)}
            {getBottomButtons(h, column)}
          </div>
        )}
        props={popupProps}
      >
        <div ref="triggerElementRef">
          {this.renderTNode('filterIcon', {
            defaultNode: defaultFilterIcon,
            params: { col: column, colIndex: this.colIndex },
          })}
        </div>
      </Popup>
    );
  },
});
