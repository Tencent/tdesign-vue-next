import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent } from '@td/adapter-vue';
import { ChevronDownIcon as TdChevronDownIcon } from 'tdesign-icons-vue';
import type { SortType } from '@td/components/table/type';
import { useConfig, useGlobalIcon, useTNodeDefault } from '@td/adapter-hooks';
import type { TNode } from '@td/types';
import type { TdTooltipProps as TooltipProps } from '@td/components/tooltip/type';
import { Tooltip } from '@td/component';
import type { TableConfig } from '@td/components/config-provider/type';
import useClassName from './hooks/useClassName';

type SortTypeEnums = Array<'desc' | 'asc'>;

export default defineComponent({
  props: {
    sortType: {
      type: String as PropType<SortType>,
      default: 'all',
    },
    sortOrder: {
      type: String,
      default: (): string => '',
    },
    sortIcon: Function as PropType<TNode>,
    tooltipProps: Object as PropType<TooltipProps>,
    locale: Object as PropType<TableConfig>,
    hideSortTips: Boolean,
  },

  setup(props, context) {
    const { tableSortClasses, negativeRotate180 } = useClassName();
    const renderTNode = useTNodeDefault();
    const { t, global } = useConfig('table', props.locale);
    const { ChevronDownIcon } = useGlobalIcon({ ChevronDownIcon: TdChevronDownIcon });

    const allowSortTypes = computed<SortTypeEnums>(() => props.sortType === 'all' ? ['asc', 'desc'] : [props.sortType]);

    const onSortIconClick = (e: MouseEvent, direction: string) => {
      context.emit('sort-icon-click', e, { descending: direction === 'desc' });
    };

    return {
      t,
      global,
      ChevronDownIcon,
      tableSortClasses,
      negativeRotate180,
      allowSortTypes,
      onSortIconClick,
      renderTNode,
    };
  },

  methods: {
    getSortIcon(direction: string, activeClass: string) {
      const { ChevronDownIcon } = this;
      const defaultIcon = this.t(this.global.sortIcon) || <ChevronDownIcon />;
      const icon = this.renderTNode('sortIcon', defaultIcon);
      const sortClassName = [
        activeClass,
        this.tableSortClasses.sortIcon,
        this.tableSortClasses.iconDirection[direction],
        { [this.negativeRotate180]: direction === 'asc' },
      ];
      return (
        <span class={sortClassName} onClick={(e: MouseEvent) => this.onSortIconClick(e, direction)}>
          {icon}
        </span>
      );
    },
  },

  render() {
    const { tableSortClasses } = this;
    const classes = [tableSortClasses.trigger, { [tableSortClasses.doubleIcon]: this.allowSortTypes.length > 1 }];
    const tooltips = {
      asc: this.global.sortAscendingOperationText,
      desc: this.global.sortDescendingOperationText,
    };
    const sortButton = this.allowSortTypes.map((direction: string) => {
      const activeClass = direction === this.sortOrder ? tableSortClasses.iconActive : tableSortClasses.iconDefault;
      const cancelTips = this.global.sortCancelOperationText;
      const tips = direction === this.sortOrder ? cancelTips : tooltips[direction];
      if (this.hideSortTips ?? this.global.hideSortTips) {
        return this.getSortIcon(direction, activeClass);
      }
      return (
        <Tooltip
          content={tips}
          placement="right"
          showArrow={false}
          class={this.tableSortClasses.iconDirection[direction]}
          {...(this.tooltipProps as any)}
        >
          {this.getSortIcon(direction, activeClass)}
        </Tooltip>
      );
    });
    return <div class={classes}>{sortButton}</div>;
  },
});
