import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { ChevronRightIcon as TdChevronRightIcon, ChevronLeftIcon as TdChevronLeftIcon } from 'tdesign-icons-vue-next';
import { defineComponent, createElementVNode, PropType, h } from 'vue';

import Button from '../../button';
import { TNode } from '../../common';
import { usePrefixClass } from '../../hooks/useConfig';
import { useGlobalIcon } from '../../hooks/useGlobalIcon';
import props from '../props';

export default defineComponent({
  name: 'TTransferOperations',
  props: {
    // 控制左按钮的禁用与否
    leftDisabled: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    // 控制右按钮的禁用与否
    rightDisabled: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    operation: props.operation,
  },
  emits: ['moveToRight', 'moveToLeft'],
  setup(props, { slots, emit }) {
    const classPrefix = usePrefixClass();
    const { ChevronRightIcon, ChevronLeftIcon } = useGlobalIcon({
      ChevronRightIcon: TdChevronRightIcon,
      ChevronLeftIcon: TdChevronLeftIcon,
    });
    const moveToRight = () => {
      emit('moveToRight');
    };
    const moveToLeft = () => {
      emit('moveToLeft');
    };
    const getIconRight = () => {
      return <ChevronRightIcon />;
    };
    const getIconLeft = () => {
      return <ChevronLeftIcon />;
    };
    const getIcon = (direction: 'left' | 'right') => {
      if (isFunction(props.operation)) {
        return null;
      }
      if (direction === 'right' && props.operation && isFunction(props.operation[0])) {
        return null;
      }
      if (direction === 'left' && props.operation && isFunction(props.operation[1])) {
        return null;
      }

      if (slots.operation) {
        return null;
      }

      return direction === 'left' ? getIconLeft : getIconRight;
    };
    // right:去右边，left:去左边
    const renderButton = (h: typeof createElementVNode, direction: 'left' | 'right') => {
      if (isFunction(slots.operation)) {
        return slots.operation({
          direction,
        });
      }
      if (isFunction(props.operation)) {
        const renderContent = props.operation;
        return renderContent(h as any, { direction });
      }
      let renderContent: string | TNode;
      if (isArray(props.operation)) {
        const [left, right] = props.operation;
        renderContent = direction === 'right' ? right : left;
      } else {
        renderContent = '';
      }
      return renderContent;
    };

    return () => (
      <div class={`${classPrefix.value}-transfer__operations`}>
        <Button
          variant="outline"
          size="small"
          shape={isString(props.operation?.[1]) ? 'rectangle' : 'square'}
          key={props.rightDisabled ? 'right-outline' : 'right-base'}
          disabled={props.rightDisabled}
          onClick={moveToRight}
          icon={getIcon('right')}
        >
          {renderButton(h, 'right')}
        </Button>
        <Button
          variant="outline"
          size="small"
          shape={isString(props.operation?.[0]) ? 'rectangle' : 'square'}
          key={props.rightDisabled ? 'left-outline' : 'left-base'}
          disabled={props.leftDisabled}
          onClick={moveToLeft}
          icon={getIcon('left')}
        >
          {renderButton(h, 'left')}
        </Button>
      </div>
    );
  },
});
