import Vue from 'vue';
import TButton from '../button';
import TIcon from '../icon';
import { prefix } from '../config';

const name = `${prefix}-transfer-operations`;
export default Vue.extend({
  name: `${prefix}-transfer-operations`,
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
    operations: [String, Array,  Function],
  },
  methods: {
    moveToRight() {
      this.$emit('moveToRight');
    },
    moveToLeft() {
      this.$emit('moveToLeft');
    },
    buttonContent(order: string) {
      let renderButtonContent;
      // 处理传进来的operations是数组，函数，字符型类型以及不传
      if (this.operations instanceof Array) {
        const buttonOrder = order === 'up' ? 0 : 1;
        if (typeof this.operations[buttonOrder] === 'function') {
          renderButtonContent = this.operations[buttonOrder]();
        } else if (typeof this.operations[buttonOrder] === 'string') {
          renderButtonContent = this.operations[buttonOrder];
        }
      } else if (typeof this.operations === 'function') {
        renderButtonContent = this.operations();
      } else if (typeof this.operations === 'string') {
        renderButtonContent = this.operations;
      } else {
        const directionName = order === 'up' ? 'right' : 'left';
        renderButtonContent = <TIcon name={`arrow-${directionName}`}></TIcon>;
      }

      return renderButtonContent;
    },
  },
  render() {
    const { leftDisabled, rightDisabled } = this.$props;
    return (
    <div class={name}>
      <TButton
          theme={leftDisabled ? 'line' : 'primary'}
          disabled={leftDisabled}
          onClick={this.moveToRight}
      >
        {this.buttonContent('up')}
      </TButton>
      <TButton
          theme={rightDisabled ? 'line' : 'primary'}
          name={'arrow-left'}
          disabled={rightDisabled}
          onClick={this.moveToLeft}
      >
        {this.buttonContent('down')}
      </TButton>
    </div>);
  },
});
