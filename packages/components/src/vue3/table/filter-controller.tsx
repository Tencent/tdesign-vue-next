import type { PropType } from '@td/adapter-vue';
import { defineComponent, h, ref } from '@td/adapter-vue';
import { FilterIcon as TdFilterIcon } from 'tdesign-icons-vue-next';
import { isEmpty, isFunction } from 'lodash-es';
import type { FilterValue, PrimaryTableCol } from '@td/intel/components/table/type';
import { useConfig, useGlobalIcon, useTNodeDefault } from '@td/adapter-hooks';
import type { AttachNode } from '@td/shared/interface';
import { CheckboxGroup, Input, Popup, RadioGroup, Button as TButton } from '@td/component';
import type { TableConfig } from '@td/intel/components/config-provider/type';
import type { TdPopupProps as PopupProps } from '@td/intel/components/popup/type';

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
    iconWrap: string;
  };
  isFocusClass: string;
  column: PrimaryTableCol;
  colIndex: number;
  // HTMLElement
  primaryTableElement: any;
  popupProps: PopupProps;
  attach?: AttachNode;
  onVisibleChange: (val: boolean) => void;
}

export default defineComponent({
  name: 'TableFilterController',

  props: {
    locale: Object as PropType<TableFilterControllerProps['locale']>,
    column: Object as PropType<TableFilterControllerProps['column']>,
    colIndex: Number,
    tFilterValue: Object as PropType<TableFilterControllerProps['tFilterValue']>,
    innerFilterValue: Object as PropType<TableFilterControllerProps['innerFilterValue']>,
    tableFilterClasses: Object as PropType<TableFilterControllerProps['tableFilterClasses']>,
    isFocusClass: String,

    primaryTableElement: {},
    popupProps: Object as PropType<TableFilterControllerProps['popupProps']>,
    attach: [String, Function] as PropType<TableFilterControllerProps['attach']>,
    onVisibleChange: Function as PropType<TableFilterControllerProps['onVisibleChange']>,
  },

  emits: ['inner-filter-change', 'reset', 'confirm'],

  setup(props: TableFilterControllerProps, context) {
    const triggerElementRef = ref<HTMLDivElement>(null);
    const renderTNode = useTNodeDefault();
    const { t, globalConfig } = useConfig('table', props.locale);
    const { FilterIcon } = useGlobalIcon({ FilterIcon: TdFilterIcon });
    const filterPopupVisible = ref(false);

    const onFilterPopupVisibleChange = (visible: boolean) => {
      filterPopupVisible.value = visible;
      props.onVisibleChange?.(visible);
    };

    const renderComponent = (column: PrimaryTableCol, filterComponentProps: any, component: any) => {
      if (!component) {
        return null;
      }
      const isVueComponent = !!component.setup;
      if (isFunction(column.filter.component) && !isVueComponent) {
        return column.filter.component((v: any, b: any) => {
          const tProps = typeof b === 'object' && 'attrs' in b ? b.attrs : {};
          return h(v, {
            props: { ...filterComponentProps, ...tProps },
          });
        });
      }
      const filter = column.filter || {};
      return (
        <component
          class={filter.classNames}
          style={filter.style}
          {...filter.attrs}
          {...filterComponentProps}
        >
        </component>
      );
    };

    const getFilterContent = (column: PrimaryTableCol) => {
      const types = ['single', 'multiple', 'input'];
      if (column.type && !types.includes(column.filter.type)) {
        console.error(`TDesign Table Error: column.filter.type must be the following: ${JSON.stringify(types)}`);
        return;
      }
      const { innerFilterValue = {} } = props;
      const component
        = {
          single: RadioGroup,
          multiple: CheckboxGroup,
          input: Input,
        }[column.filter.type] || column.filter.component;
      if (!component && !column.filter.component) {
        return;
      }
      const filterComponentProps: { [key: string]: any } = {
        options: ['single', 'multiple'].includes(column.filter.type) ? column.filter?.list : undefined,
        ...(column.filter?.props || {}),
        onChange: (val: any, ctx: any) => {
          context.emit('inner-filter-change', val, column);
          if (column.filter.props?.onChange) {
            column.filter.props.onChange?.(val, ctx);
          }
          if (column.filter?.confirmEvents?.includes('onChange')) {
            filterPopupVisible.value = false;
          }
        },
      };
      if (column.colKey && innerFilterValue && column.colKey in innerFilterValue) {
        filterComponentProps.value = innerFilterValue?.[column.colKey];
      }
      // 允许自定义触发确认搜索的事件
      if (column.filter.confirmEvents) {
        column.filter.confirmEvents.forEach((event) => {
          if (event === 'onChange') {
            return;
          }
          filterComponentProps[event] = () => {
            context.emit('confirm', column);
            filterPopupVisible.value = false;
          };
        });
      }
      return (
        <div class={props.tableFilterClasses.contentInner}>
          {renderComponent(column, filterComponentProps, component)}
        </div>
      );
    };

    const getBottomButtons = (column: PrimaryTableCol) => {
      if (!column.filter.showConfirmAndReset) {
        return;
      }
      return (
        <div class={props.tableFilterClasses.bottomButtons}>
          <TButton
            theme="default"
            size="small"
            onClick={() => {
              context.emit('reset', column);
              filterPopupVisible.value = false;
            }}
          >
            {globalConfig.value.resetText}
          </TButton>
          <TButton
            theme="primary"
            size="small"
            onClick={() => {
              context.emit('confirm', column);
              filterPopupVisible.value = false;
            }}
          >
            {globalConfig.value.confirmText}
          </TButton>
        </div>
      );
    };

    const getContent = () => (
      <div class={props.tableFilterClasses.popupContent}>
        {getFilterContent(props.column)}
        {getBottomButtons(props.column)}
      </div>
    );

    return {
      t,
      globalConfig,
      FilterIcon,
      filterPopupVisible,
      triggerElementRef,
      renderTNode,
      getContent,
      onFilterPopupVisibleChange,
    };
  },

  render() {
    const { column, popupProps, FilterIcon } = this as any;

    if (!column.filter || (column.filter && !Object.keys(column.filter).length)) {
      return null;
    }
    const defaultFilterIcon = this.t(this.globalConfig.filterIcon) || <FilterIcon />;
    const filterValue = this.tFilterValue?.[column.colKey];
    const isObjectTrue = typeof filterValue === 'object' && !isEmpty(filterValue);
    // false is a valid filter value
    const isValueExist = ![null, undefined, ''].includes(filterValue) && typeof filterValue !== 'object';
    return (
      <Popup
        attach={this.attach || (this.primaryTableElement ? () => this.primaryTableElement as HTMLElement : undefined)}
        visible={this.filterPopupVisible}
        destroyOnClose
        trigger="click"
        placement="bottom-right"
        showArrow
        overlayClassName={this.tableFilterClasses.popup}
        onVisibleChange={(val: boolean) => this.onFilterPopupVisibleChange(val)}
        class={[
          this.tableFilterClasses.icon,
          {
            [this.isFocusClass]: isObjectTrue || isValueExist,
          },
        ]}
        content={this.getContent}
        {...popupProps}
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
