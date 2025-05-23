import { defineComponent, createElementVNode, PropType, h } from 'vue';
import { ChevronRightIcon as TdChevronRightIcon, ChevronLeftIcon as TdChevronLeftIcon } from 'tdesign-icons-vue-next';

import Button from '../../button';
import { TNode } from '../../common';
import { usePrefixClass } from '@tdesign/hooks';
import { useGlobalIcon } from '@tdesign/hooks';
import props from '../props';
import { isFunction } from 'lodash-es';
import { isString } from 'lodash-es';
import { isArray } from 'lodash-es';

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
          shape={isArray(props.operation) && isString(props.operation[1]) ? 'rectangle' : 'square'}
          key={props.rightDisabled ? 'right-outline' : 'right-base'}
          disabled={props.rightDisabled}
          onClick={moveToRight}
          icon={getIcon('right')}
        >
          {slots.operation || (isArray(props.operation) && props.operation[1]) ? renderButton(h, 'right') : null}
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
          {slots.operation || (isArray(props.operation) && props.operation[0]) ? renderButton(h, 'left') : null}
        </Button>
      </div>
    );
  },
});
