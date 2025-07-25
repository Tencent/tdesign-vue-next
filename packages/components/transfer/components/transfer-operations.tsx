import { defineComponent, createElementVNode, PropType, h, VNode } from 'vue';
import { ChevronRightIcon as TdChevronRightIcon, ChevronLeftIcon as TdChevronLeftIcon } from 'tdesign-icons-vue-next';

import Button from '../../button';
import { SlotReturnArray, TNode } from '../../common';
import { useGlobalIcon, usePrefixClass } from '@tdesign/shared-hooks';

import props from '../props';
import { isArray, isString, isFunction } from 'lodash-es';

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

      let renderContent: string | TNode | VNode | SlotReturnArray | null;
      if (isArray(props.operation)) {
        const [left, right] = props.operation;
        const directionOp = direction === 'right' ? right : left;
        const content = isFunction(directionOp) ? directionOp(h as any) : directionOp;

        // 过滤掉 boolean
        renderContent = content === false || content === true ? '' : content;
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
          shape={isArray(props.operation) && isString(props.operation[1]) ? 'rectangle' : 'square'}
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
          shape={isArray(props.operation) && isString(props.operation[0]) ? 'rectangle' : 'square'}
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
