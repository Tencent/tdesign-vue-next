import { computed, defineComponent, PropType } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import useClassName from './hooks/useClassName';
import { SortType } from './type';
import Tooltip, { TooltipProps } from '../tooltip';
import { useConfig } from '../hooks/useConfig';
import { useTNodeDefault } from '../hooks/tnode';
import { TNode } from '../common';

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
    sortIcon: Function as PropType<TNode>,
    tooltipProps: Object as PropType<TooltipProps>,
  },

  emits: ['sort-icon-click'],

  setup(props, context) {
    const { tableSortClasses, negativeRotate180 } = useClassName();
    const renderTNode = useTNodeDefault();
    const { t, global } = useConfig('table');

    const allowSortTypes = computed<SortTypeEnums>(() =>
      props.sortType === 'all' ? ['asc', 'desc'] : [props.sortType],
    );

    const onSortIconClick = (e: MouseEvent, direction: string) => {
      context.emit('sort-icon-click', e, { descending: direction === 'desc' });
    };

    return {
      t,
      global,
      tableSortClasses,
      negativeRotate180,
      allowSortTypes,
      onSortIconClick,
      renderTNode,
    };
  },

  methods: {
    getSortIcon(direction: string, activeClass: string) {
      const defaultIcon = this.t(this.global.sortIcon) || <ChevronDownIcon />;
      const icon = this.renderTNode('sortIcon', defaultIcon);
      const sortClassName = [
        activeClass,
        this.tableSortClasses.sortIcon,
        this.tableSortClasses.iconDirection[direction],
        { [this.negativeRotate180]: direction === 'asc' },
      ];
      return (
        <span class={sortClassName} onClick={(e) => this.onSortIconClick(e, direction)}>
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
      return (
        <Tooltip
          content={tips}
          placement="right"
          {...this.tooltipProps}
          showArrow={false}
          class={this.tableSortClasses.iconDirection[direction]}
        >
          {this.getSortIcon(direction, activeClass)}
        </Tooltip>
      );
    });
    return <div class={classes}>{sortButton}</div>;
  },
});
