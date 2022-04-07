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
    const { t, global } = useConfig('table');
    const filterPopupVisible = ref(false);

    const onFilterPopupVisibleChange = (visible: boolean) => {
      filterPopupVisible.value = visible;
      props.onVisibleChange?.(visible);
    };

    return {
      t,
      global,
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
      if (column?.filter?.component && typeof column?.filter?.component !== 'function') {
        console.error('TDesign Table Error: column.filter.component must be a function');
        return;
      }
      const component = {
        single: RadioGroup,
        multiple: CheckboxGroup,
        input: Input,
      }[column.filter.type];
      if (!component && !column?.filter?.component) return;
      const props: { [key: string]: any } = {
        options: ['single', 'multiple'].includes(column.filter.type) ? column.filter?.list : undefined,
        ...(column.filter?.props || {}),
        value: this.innerFilterValue?.[column.colKey],
        onChange: (val: any) => {
          this.$emit('inner-filter-change', val, column);
        },
      };
      return (
        <div class={this.tableFilterClasses.contentInner}>
          {column?.filter?.component ? (
            column?.filter?.component((v: any, b: any) => {
              const tProps = typeof b === 'object' && 'attrs' in b ? b.attrs : {};
              return h(v, {
                props: { ...props, ...tProps },
              });
            })
          ) : (
            <component value={this.innerFilterValue?.[column.colKey]} {...props}></component>
          )}
        </div>
      );
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

    const column = this.column as any;
    if (!column.filter || (column.filter && !Object.keys(column.filter).length)) return null;
    const defaultFilterIcon = this.t(this.global.filterIcon) || <FilterIcon />;
    return (
      <Popup
        attach={this.primaryTableElement ? () => this.primaryTableElement : undefined}
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
