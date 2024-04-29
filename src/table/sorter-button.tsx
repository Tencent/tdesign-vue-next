import { ChevronDownIcon as TdChevronDownIcon } from 'tdesign-icons-vue-next';
import { computed, defineComponent, PropType } from 'vue';

import { TNode } from '../common';
import { TableConfig } from '../config-provider';
import { useTNodeDefault } from '../hooks/tnode';
import { useConfig } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import Tooltip, { TooltipProps } from '../tooltip';

import useClassName from './hooks/useClassName';
import { SortType } from './type';

type SortTypeEnums = Array<'desc' | 'asc'>;

export default defineComponent({
  name: 'TSorterButton',

  props: {
    sortType: {
      type: String as PropType<SortType>,
      default: 'all',
    },
    sortOrder: {
      type: String,
      default: (): string => '',
    },
    locale: Object as PropType<TableConfig>,
    sortIcon: Function as PropType<TNode>,
    tooltipProps: Object as PropType<TooltipProps>,
    hideSortTips: Boolean,
  },

  emits: ['sort-icon-click'],

  setup(props, context) {
    const { tableSortClasses, negativeRotate180 } = useClassName();
    const renderTNode = useTNodeDefault();
    const { t, globalConfig } = useConfig('table', props.locale);
    const { ChevronDownIcon } = useGlobalIcon({ ChevronDownIcon: TdChevronDownIcon });

    const allowSortTypes = computed<SortTypeEnums>(() =>
      props.sortType === 'all' ? ['asc', 'desc'] : [props.sortType],
    );

    const onSortIconClick = (e: MouseEvent, direction: string) => {
      context.emit('sort-icon-click', e, { descending: direction === 'desc' });
    };

    const getSortIcon = (direction: string, activeClass: string) => {
      const defaultIcon = t(globalConfig.value.sortIcon) || <ChevronDownIcon />;
      const icon = renderTNode('sortIcon', defaultIcon);
      const sortClassName = [
        activeClass,
        tableSortClasses.sortIcon,
        tableSortClasses.iconDirection[direction],
        { [negativeRotate180]: direction === 'asc' },
      ];
      return (
        <span class={sortClassName} onClick={(e) => onSortIconClick(e, direction)}>
          {icon}
        </span>
      );
    };

    return {
      t,
      globalConfig,
      tableSortClasses,
      negativeRotate180,
      allowSortTypes,
      getSortIcon,
    };
  },

  render() {
    const { tableSortClasses } = this;
    const classes = [tableSortClasses.trigger, { [tableSortClasses.doubleIcon]: this.allowSortTypes.length > 1 }];
    const tooltips = {
      asc: this.globalConfig.sortAscendingOperationText,
      desc: this.globalConfig.sortDescendingOperationText,
    };
    const sortButton = this.allowSortTypes.map((direction: string) => {
      const activeClass = direction === this.sortOrder ? tableSortClasses.iconActive : tableSortClasses.iconDefault;
      const cancelTips = this.globalConfig.sortCancelOperationText;
      const tips = direction === this.sortOrder ? cancelTips : tooltips[direction];
      if (this.hideSortTips ?? this.globalConfig.hideSortTips) return this.getSortIcon(direction, activeClass);
      return (
        <Tooltip
          content={tips}
          placement="right"
          showArrow={false}
          class={this.tableSortClasses.iconDirection[direction]}
          {...(this.tooltipProps as TooltipProps)}
        >
          {this.getSortIcon(direction, activeClass)}
        </Tooltip>
      );
    });
    return <div class={classes}>{sortButton}</div>;
  },
});
