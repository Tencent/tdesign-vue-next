import { defineComponent, PropType } from 'vue';
import { SortType } from '../../../types/primary-table/TdPrimaryTableProps';
import { prefix } from '../../config';
import Tooltip from '../../tooltip';
import TIconChevronUp from '../../icon/chevron-up';
import TIconChevronDown from '../../icon/chevron-down';

const tooltips = {
  asc: '点击升序',
  desc: '点击降序',
  cancel: '点击取消排序',
};

export default defineComponent({
  name: `${prefix}-sorter-button`,
  props: {
    sortType: {
      type: String as PropType<SortType>,
      default: null,
    },
    sortOrder: {
      type: String,
      default: (): string => '',
    },
    nextSortOrder: {
      type: String,
      required: false,
    },
  },
  render() {
    const { $listeners, sortType, sortOrder, nextSortOrder } = this;
    const allowSortTypes = [];
    if (sortType === 'all') {
      allowSortTypes.push('asc', 'desc');
    } else {
      allowSortTypes.push(sortType);
    }
    const buttonProps = { ...this.$attrs, class: allowSortTypes.length > 1 ? `${prefix}-table-double-icons` : '' };
    const tips = tooltips[nextSortOrder];
    const sortButton = allowSortTypes
      .map((direction: string) => {
        const className = direction === sortOrder ? `${prefix}-table-sort-icon-active` : `${prefix}icon-sort-default`;
        if (direction === 'asc') {
          return <TIconChevronUp size='12px'  class={className} />;
        }
        return <TIconChevronDown  size='12px'  class={className} />;
      });
    return <div class={`${prefix}-table__cell--sort-trigger`} {...buttonProps}>
      {tips ? <Tooltip style="line-height: 0px;" content={tips} showArrow={false}>{sortButton}</Tooltip> : sortButton}
    </div>;
  },
});
