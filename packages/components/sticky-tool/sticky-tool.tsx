import { computed, defineComponent, VNode } from 'vue';
import props from './props';
import { isObject } from 'lodash-es';
import StickyItem from './sticky-item';

import { usePrefixClass } from '../hooks/useConfig';
import { useChildComponentSlots } from '../hooks';

import stickyItemProps from './sticky-item-props';

import type { TdStickyItemProps } from './type';
import type { Styles } from '../common';

export default defineComponent({
  name: 'TStickyTool',
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('sticky-tool');
    const classes = computed(() => {
      return [COMPONENT_NAME.value, `${COMPONENT_NAME.value}--${props.shape}`];
    });
    const styles = computed(() => {
      const styles = getOffset();
      if (props.width) styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
      return styles;
    });

    const getChildComponentByName = useChildComponentSlots();

    const getList = () => {
      let list: Array<TdStickyItemProps>;
      if (props.list?.length) {
        list = props.list;
      } else {
        const nodes: VNode[] = getChildComponentByName('StickyItem') as VNode[];
        list = getListBySlots(nodes);
      }
      return list;
    };
    const getListBySlots = (nodes: VNode[]) => {
      const arr: Array<TdStickyItemProps> = [];
      nodes?.forEach((node) => {
        const list = node?.props || {};
        const children = node?.children;
        if (!list && !children) return;
        if (children && isObject(children)) {
          for (const key in children) {
            if (key in stickyItemProps && !list[key]) {
              list[key] = (children as Record<string, any>)[key];
            }
          }
        }
        arr.push(list as TdStickyItemProps);
      });
      return arr;
    };
    const getOffset = (): Styles => {
      // 默认偏移位置
      const position: Array<string | number> = props.offset ? [80, 24] : ['80px', '24px'];
      props.offset?.forEach((item, index) => {
        position[index] = isNaN(Number(item))
          ? `calc( ${position[index]}px + ${item})`
          : `${(position[index] as number) + (item as number)}px`;
      });
      const offsetStyle: Styles = {};
      props.placement.split('-').forEach((item, index) => {
        if (item !== 'center') {
          offsetStyle[item] = position[index];
        } else {
          offsetStyle.top = '50%';
          offsetStyle.transform = 'translate(0, -50%)';
        }
      });
      return offsetStyle;
    };
    const handleClick = (context: { e: MouseEvent; item: TdStickyItemProps }) => {
      props.onClick?.(context);
    };
    const handleHover = (context: { e: MouseEvent; item: TdStickyItemProps }) => {
      props.onHover?.(context);
    };
    const renderContent = () => {
      const list = getList();
      const content = list.map((item, index) => {
        const { type, shape, placement, popupProps } = props;
        const itemProps = {
          ...item,
          type,
          shape,
          placement,
          basePopupProps: popupProps,
          baseWidth: styles.value.width,
          onClick: handleClick,
          onHover: handleHover,
        };
        return <StickyItem {...itemProps} key={index} />;
      });
      return content;
    };
    return () => (
      <div class={classes.value} style={styles.value}>
        {renderContent()}
      </div>
    );
  },
});
