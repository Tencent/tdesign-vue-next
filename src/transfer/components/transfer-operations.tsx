import { defineComponent, createElementVNode, PropType, h } from 'vue';
import { ChevronRightIcon, ChevronLeftIcon } from 'tdesign-icons-vue-next';
import TButton from '../../button';
import { TNode } from '../../common';
import { usePrefixClass } from '../../hooks/useConfig';

export default defineComponent({
  name: 'TTransferOperations',
  props: {
    // 控制左按钮的禁用与否
    leftDisabled: {
      type: Boolean,
      required: true,
    },
    // 控制右按钮的禁用与否
    rightDisabled: {
      type: Boolean,
      required: true,
    },
    operation: {
      type: [String, Array, Function, Boolean] as PropType<
        Array<string | TNode> | TNode<{ direction: 'left' | 'right' }>
      >,
    },
  },
  emits: ['moveToRight', 'moveToLeft'],
  setup(props, { slots, emit }) {
    const classPrefix = usePrefixClass();
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
      if (typeof props.operation === 'function') {
        return null;
      }
      if (direction === 'right' && props.operation && typeof props.operation[0] === 'function') {
        return null;
      }
      if (direction === 'left' && props.operation && typeof props.operation[1] === 'function') {
        return null;
      }

      if (slots.operation) {
        return null;
      }

      return direction === 'left' ? getIconLeft : getIconRight;
    };
    // right:去右边，left:去左边
    const renderButton = (h: typeof createElementVNode, direction: 'left' | 'right') => {
      if (typeof slots.operation === 'function') {
        return slots.operation({
          direction,
        });
      }
      if (typeof props.operation === 'function') {
        const renderContent = props.operation;
        return renderContent(h as any, { direction });
      }
      let renderContent: string | TNode;
      if (Array.isArray(props.operation)) {
        const [left, right] = props.operation;
        renderContent = direction === 'right' ? right : left;
      } else {
        renderContent = '';
      }
      return renderContent;
    };

    return () => (
      <div class={`${classPrefix.value}-transfer__operations`}>
        <t-button
          variant={props.rightDisabled ? 'outline' : 'base'}
          key={props.rightDisabled ? 'right-outline' : 'right-base'}
          disabled={props.rightDisabled}
          onClick={moveToRight}
          icon={getIcon('right')}
        >
          {renderButton(h, 'right')}
        </t-button>
        <t-button
          variant={props.leftDisabled ? 'outline' : 'base'}
          key={props.rightDisabled ? 'left-outline' : 'left-base'}
          disabled={props.leftDisabled}
          onClick={moveToLeft}
          icon={getIcon('left')}
        >
          {renderButton(h, 'left')}
        </t-button>
      </div>
    );
  },
});
