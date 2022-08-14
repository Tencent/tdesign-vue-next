import { defineComponent, PropType, ref, h } from 'vue';
import { FilterIcon } from 'tdesign-icons-vue-next';
import isEmpty from 'lodash/isEmpty';
import Popup from '../popup';
import { CheckboxGroup } from '../checkbox';
import { RadioGroup } from '../radio';
import Input from '../input';
import TButton from '../button';
import { useTNodeDefault } from '../hooks/tnode';
import { PrimaryTableCol, FilterValue } from './type';
import { useConfig } from '../hooks/useConfig';

export interface TableFilterControllerProps {
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
  // HTMLElement
  primaryTableElement: any;
  onVisibleChange: (val: boolean) => void;
}

export default defineComponent({
  name: 'TableFilterController',

  props: {
    column: Object as PropType<TableFilterControllerProps['column']>,
    tFilterValue: Object as PropType<TableFilterControllerProps['tFilterValue']>,
    innerFilterValue: Object as PropType<TableFilterControllerProps['innerFilterValue']>,
    tableFilterClasses: Object as PropType<TableFilterControllerProps['tableFilterClasses']>,
    isFocusClass: String,
    // eslint-disable-next-line
    primaryTableElement: {},
    onVisibleChange: Function as PropType<TableFilterControllerProps['onVisibleChange']>,
  },

  emits: ['inner-filter-change', 'reset', 'confirm'],

  setup(props: TableFilterControllerProps) {
    const triggerElementRef = ref<HTMLDivElement>(null);
    const renderTNode = useTNodeDefault();
    const { t, globalConfig } = useConfig('table');
    const filterPopupVisible = ref(false);

    const onFilterPopupVisibleChange = (visible: boolean) => {
      filterPopupVisible.value = visible;
      props.onVisibleChange?.(visible);
    };

    return {
      t,
      globalConfig,
      filterPopupVisible,
      triggerElementRef,
      renderTNode,
      onFilterPopupVisibleChange,
    };
  },

  render() {
    const getFilterContent = (column: PrimaryTableCol) => {
      const types = ['single', 'multiple', 'input'];
      if (column.type && !types.includes(column.filter.type)) {
        console.error(`TDesign Table Error: column.filter.type must be the following: ${JSON.stringify(types)}`);
        return;
      }
      const component =
        {
          single: RadioGroup,
          multiple: CheckboxGroup,
          input: Input,
        }[column.filter.type] || column.filter.component;
      if (!component && !column.filter.component) return;
      const filterComponentProps: { [key: string]: any } = {
        options: ['single', 'multiple'].includes(column.filter.type) ? column.filter?.list : undefined,
        ...(column.filter?.props || {}),
        value: this.innerFilterValue?.[column.colKey],
        onChange: (val: any) => {
          this.$emit('inner-filter-change', val, column);
        },
      };
      // 允许自定义触发确认搜索的事件
      if (column.filter.confirmEvents) {
        column.filter.confirmEvents.forEach((event) => {
          filterComponentProps[event] = () => {
            this.$emit('confirm', column);
            this.filterPopupVisible = false;
          };
        });
      }
      const renderComponent = () => {
        if (!component) return null;
        const isVueComponent = !!component.setup;
        if (typeof column.filter.component === 'function' && !isVueComponent) {
          return column.filter.component((v: any, b: any) => {
            const tProps = typeof b === 'object' && 'attrs' in b ? b.attrs : {};
            return h(v, {
              props: { ...filterComponentProps, ...tProps },
            });
          });
        }
        return <component value={this.innerFilterValue?.[column.colKey]} {...filterComponentProps}></component>;
      };
      return <div class={this.tableFilterClasses.contentInner}>{renderComponent()}</div>;
    };

    const getBottomButtons = (column: PrimaryTableCol) => {
      if (!column.filter.showConfirmAndReset) return;
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
            {this.globalConfig.resetText}
          </TButton>
          <TButton
            theme="primary"
            size="small"
            onClick={() => {
              this.$emit('confirm', column);
              this.filterPopupVisible = false;
            }}
          >
            {this.globalConfig.confirmText}
          </TButton>
        </div>
      );
    };

    const column = this.column as any;
    if (!column.filter || (column.filter && !Object.keys(column.filter).length)) return null;
    const defaultFilterIcon = this.t(this.globalConfig.filterIcon) || <FilterIcon />;
    return (
      <Popup
        attach={this.primaryTableElement ? () => this.primaryTableElement as HTMLElement : undefined}
        visible={this.filterPopupVisible}
        destroyOnClose
        trigger="click"
        placement="bottom-right"
        showArrow
        overlayClassName={this.tableFilterClasses.popup}
        onVisibleChange={(val: boolean) => this.onFilterPopupVisibleChange(val)}
        class={[this.tableFilterClasses.icon, { [this.isFocusClass]: !isEmpty(this.tFilterValue?.[column.colKey]) }]}
        content={() => (
          <div class={this.tableFilterClasses.popupContent}>
            {getFilterContent(column)}
            {getBottomButtons(column)}
          </div>
        )}
      >
        <div ref="triggerElementRef">{this.renderTNode('filterIcon', defaultFilterIcon)}</div>
      </Popup>
    );
  },
});
