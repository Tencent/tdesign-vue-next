import { computed, defineComponent, PropType } from 'vue';
import { ChevronDownIcon as TdChevronDownIcon } from 'tdesign-icons-vue-next';
import useClassName from '../hooks/useClassName';
import { SortType } from '../type';
import Tooltip, { TooltipProps } from '../../tooltip';
import { useConfig } from '../../hooks/useConfig';
import { useGlobalIcon } from '../../hooks/useGlobalIcon';
import { useTNodeDefault } from '../../hooks/tnode';
import { TNode } from '../../common';
import { TableConfig } from '../../config-provider';

type SortTypeEnum = 'desc' | 'asc';
type SortTypeEnums = Array<SortTypeEnum>;

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

    const getSortIcon = (direction: SortTypeEnum, activeClass: string) => {
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

    return () => {
      const classes = [tableSortClasses.trigger, { [tableSortClasses.doubleIcon]: allowSortTypes.value.length > 1 }];
      const tooltips = {
        asc: globalConfig.value.sortAscendingOperationText,
        desc: globalConfig.value.sortDescendingOperationText,
      };
      const sortButton = allowSortTypes.value.map((direction: SortTypeEnum) => {
        const activeClass = direction === props.sortOrder ? tableSortClasses.iconActive : tableSortClasses.iconDefault;
        const cancelTips = globalConfig.value.sortCancelOperationText;
        const tips = direction === props.sortOrder ? cancelTips : tooltips[direction];
        if (props.hideSortTips ?? globalConfig.value.hideSortTips) return getSortIcon(direction, activeClass);
        return (
          <Tooltip
            content={tips}
            placement="right"
            showArrow={false}
            class={tableSortClasses.iconDirection[direction]}
            {...(props.tooltipProps as TooltipProps)}
          >
            {getSortIcon(direction, activeClass)}
          </Tooltip>
        );
      });
      return <div class={classes}>{sortButton}</div>;
    };
  },
});
