import { defineComponent } from 'vue';
import tdButton from '../../button';
import { prefix } from '../../config';

const name = `${prefix}-transfer-operations`;
export default defineComponent({
  name,
  components: { tdButton },
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
    operations: {
      type: [String, Array, Function],
      default: '',
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
      return <t-icon name="chevron-right"/>;
    },
    getIconLeft() {
      return <t-icon name="chevron-left"/>;
    },
    getIcon(order: string): TNode {
      let iconFun: TNode;
      if (!this.operations || !this.operations.length) {
        iconFun = order === 'up' ? this.getIconRight : this.getIconLeft;
      } else {
        iconFun = () => null;
      }
      return iconFun;
    },
    buttonContent(order: string) {
      let renderButtonContent;
      // 处理传进来的operations是数组，函数，字符型类型以及不传
      if (this.operations instanceof Array && this.operations.length) {
        const buttonOrder = order === 'up' ? 0 : 1;
        if (typeof this.operations[buttonOrder] === 'function') {
          const operationFunc = this.operations[buttonOrder] as Function;
          renderButtonContent = operationFunc();
        } else if (typeof this.operations[buttonOrder] === 'string') {
          renderButtonContent = this.operations[buttonOrder];
        }
      } else if (typeof this.operations === 'function') {
        renderButtonContent = this.operations();
      } else if (typeof this.operations === 'string') {
        renderButtonContent = this.operations;
      } else {
        renderButtonContent = null;
      }

      return renderButtonContent;
    },
  },
  render(): JsxNode {
    const { leftDisabled, rightDisabled } = this.$props;
    return (
      <div class={name}>
        <tdButton
          variant={leftDisabled ? 'outline' : 'base'}
          disabled={leftDisabled}
          onClick={this.moveToRight}
          icon={this.getIcon('up')}
        >
          {this.buttonContent('up')}
        </tdButton>
        <tdButton
          variant={rightDisabled ? 'outline' : 'base'}
          disabled={rightDisabled}
          onClick={this.moveToLeft}
          icon={this.getIcon('down')}
        >
          {this.buttonContent('down')}
        </tdButton>
      </div>
    );
  },
});
