import { computed, defineComponent, PropType } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import useClassName from './hooks/useClassName';
import { SortType } from './type';
import Tooltip from '../tooltip';
import { useConfig } from '../config-provider/useConfig';
import { useTNodeDefault } from '../hooks/tnode';
import { TNode } from '../common';

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
    nextSortOrder: {
      type: String,
      required: false,
    },
    sortIcon: Function as PropType<TNode>,
  },

  emits: ['click'],

  setup(props, context) {
    const { tableSortClasses, negativeRoate180 } = useClassName();
    const renderTNode = useTNodeDefault();
    const { t, global } = useConfig('table');

    const allowSortTypes = computed<SortTypeEnums>(() =>
      props.sortType === 'all' ? ['asc', 'desc'] : [props.sortType],
    );

    const onClick = (e: MouseEvent) => {
      context.emit('click', e);
    };

    return {
      t,
      global,
      tableSortClasses,
      negativeRoate180,
      allowSortTypes,
      onClick,
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
        { [this.negativeRoate180]: direction === 'asc' },
      ];
      return <span class={sortClassName}>{icon}</span>;
    },
  },

  render() {
    const { tableSortClasses } = this;
    const classes = [tableSortClasses.trigger, { [tableSortClasses.doubleIcon]: this.allowSortTypes.length > 1 }];
    const tooltips = {
      asc: this.global.sortAscendingOperationText,
      desc: this.global.sortDescendingOperationText,
      undefined: this.global.sortCancelOperationText,
    };
    const tips = tooltips[this.nextSortOrder];
    const sortButton = this.allowSortTypes.map((direction: string) => {
      const activeClass = direction === this.sortOrder ? tableSortClasses.iconActive : tableSortClasses.iconDefault;
      return this.getSortIcon(direction, activeClass);
    });
    return (
      <div class={classes} onClick={this.onClick}>
        {tips ? (
          <Tooltip content={tips} showArrow={false}>
            {sortButton}
          </Tooltip>
        ) : (
          sortButton
        )}
      </div>
    );
  },
});
