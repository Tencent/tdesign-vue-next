import { defineComponent, createElementVNode, PropType } from 'vue';
import { prefix } from '../../config';
import TButton from '../../button';
import TIconChevronRight from '../../icon/chevron-right';
import TIconChevronLeft from '../../icon/chevron-left';
import { TNode } from '../../common';

const name = `${prefix}-transfer-operations`;

export default defineComponent({
  name,
  components: {
    TButton,
  },
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
      type: [String, Array, Function, Boolean] as PropType<Array<string | TNode> | TNode<{ direction: 'left' | 'right' }>>,
    },
  },
  emits: ['moveToRight', 'moveToLeft'],
  methods: {
    moveToRight() {
      this.$emit('moveToRight');
    },
    moveToLeft() {
      this.$emit('moveToLeft');
    },
    getIconRight() {
      return <TIconChevronRight />;
    },
    getIconLeft() {
      return <TIconChevronLeft />;
    },
    getIcon(direction: 'left' | 'right') {
      if (typeof this.operation === 'function') {
        return null;
      }
      if (direction === 'right' && this.operation && typeof this.operation[0] === 'function') {
        return null;
      }
      if (direction === 'left' && this.operation && typeof this.operation[1] === 'function') {
        return null;
      }

      if (this.$slots.operation) {
        return null;
      }

      return direction === 'left' ? this.getIconLeft : this.getIconRight;
    },
    // right:去右边，left:去左边
    _renderButton(h: typeof createElementVNode, direction: 'left' | 'right') {
      if (typeof this.$slots.operation === 'function') {
        return this.$slots.operation({
          direction,
        });
      }
      if (typeof this.operation === 'function') {
        const renderContent = this.operation;
        return renderContent(h as any, { direction });
      }
      let renderContent: string | TNode;
      if (Array.isArray(this.operation)) {
        const [left, right] = this.operation;
        renderContent = direction === 'right' ? right : left;
      } else {
        renderContent = '';
      }
      return renderContent;
    },
  },
  render(h:any) {
    const { leftDisabled, rightDisabled } = this.$props;
    return (
      <div class={name}>
        <t-button
          variant={rightDisabled ? 'outline' : 'base'}
          disabled={rightDisabled}
          onClick={this.moveToRight}
          icon={this.getIcon('right')}
        >
          {this._renderButton(h, 'right')}
        </t-button>
        <t-button
          variant={leftDisabled ? 'outline' : 'base'}
          disabled={leftDisabled}
          onClick={this.moveToLeft}
          icon={this.getIcon('left')}
        >
          {this._renderButton(h, 'left')}
        </t-button>
      </div>
    );
  },
});
