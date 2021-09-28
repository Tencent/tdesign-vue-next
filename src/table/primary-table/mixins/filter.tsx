import { defineComponent } from 'vue';
import isFunction from 'lodash/isFunction';
import { PrimaryTableCol, TdPrimaryTableProps } from '../../type';
import primaryTableProps from '../../primary-table-props';
import baseTableProps from '../../base-table-props';
import { prefix } from '../../../config';
import { CheckboxGroup } from '../../../checkbox';
import { RadioGroup } from '../../../radio';
import Input from '../../../input';
import Popup from '../../../popup';
import { getTitle } from '../../util/common';
import TIconFilter from '../../../icon/filter';
import { emitEvent } from '../../../utils/event';

type FilterChangeContext = Parameters<TdPrimaryTableProps['onFilterChange']>;
type ChangeContext = Parameters<TdPrimaryTableProps['onChange']>;

export default defineComponent({
  name: `${prefix}-primary-table-filter`,
  props: {
    columns: primaryTableProps.columns,
    filterValue: primaryTableProps.filterValue,
    filterIcon: primaryTableProps.filterIcon,
    data: baseTableProps.data,
  },
  emits: ['filter-change', 'filter'],
  methods: {
    onInnerFilterChange(val: string | number, column: PrimaryTableCol) {
      const filterValue = {
        ...this.filterValue,
        [column.colKey]: val,
      };
      emitEvent<FilterChangeContext>(this, 'filter-change', filterValue, { col: column });
      emitEvent<ChangeContext>(this, 'change', { filter: filterValue }, { trigger: 'filter' });
    },

    getFilterContent(column: PrimaryTableCol) {
      const types = ['single', 'multiple', 'input'];
      if (column.type && !types.includes(column.filter.type)) {
        console.error(`column.type must be the following: ${JSON.stringify(types)}`);
        return;
      }
      const component = {
        single: RadioGroup,
        multiple: CheckboxGroup,
        input: Input,
      }[column.filter.type];
      if (!component) return;
      const props = {
        options: ['single', 'multiple'].includes(column.filter.type)
          ? column.filter.list
          : undefined,
        ...(column.filter.props || {}),
        onChange: (val: string | number) => this.onInnerFilterChange(val, column),
      };
      return (
        <div class={`${prefix}-table-filter-pop-content__inner`}>
          <component
            value={this.filterValue[column.colKey]}
            { ...props }
          ></component>
        </div>
      );
    },

    getFilterColumns(columns: PrimaryTableCol[]): PrimaryTableCol[] {
      return columns.map((item, index: number) => {
        const column: PrimaryTableCol = { ...item };
        if (column.filter) {
          const title = getTitle(this, column, index);
          column.title = () => (
            <div class={`${prefix}-table__cell--title`}>
              <div>{title}</div>
              <div class={`${prefix}-table__cell--filter`}>
                <Popup trigger='click' placement='bottom' showArrow overlayClassName={`${prefix}-table-filter-pop`} v-slots={
                  {
                    content: () => <div class={`${prefix}-table-filter-pop-content`}>{this.getFilterContent(column)}</div>,
                  }
                }>
                  {isFunction(this.filterIcon)
                    ? this.filterIcon(this.$createElement)
                    : <TIconFilter name="filter" class={`${prefix}-table-filter-icon`} />
                  }
                </Popup>
              </div>
            </div>);
        }
        const { children } = item;
        if (children && children.length) {
          column.children = this.getFilterColumns(children);
        }
        return column;
      });
    },
  },
});
