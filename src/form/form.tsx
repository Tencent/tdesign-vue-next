import Vue, { PropType, VNode } from 'vue';
import { prefix } from '../config';
import { CLASSNAME_SIZE } from '../utils/classnames';
import { FormData, ErrorList } from './type/index';

const name = `${prefix}-form`;

export default Vue.extend({
  name,

  components: {},

  props: {
    data: {
      type: Object as PropType<FormData>,
    },
    layout: {
      type: String,
      default: 'vertical',
      validator(val) {
        return ['vertical', 'inline'].includes(val);
      },
    },
    labelAlign: {
      type: String,
      default: 'right',
      validator(val) {
        return ['left', 'right', 'top'].includes(val);
      },
    },
    size: {
      type: String,
      default: 'medium',
      validator(val) {
        return ['medium', 'large'].includes(val);
      },
    },
    colon: Boolean,
    requiredMark: {
      type: Boolean,
      default: true,
    },
    scrollToFirstError: {
      type: Boolean,
      default: true,
    },
    showErrorMessage: {
      type: Boolean,
      default: true,
    },
    onValidate: Function as PropType<(validateResult: boolean | ErrorList) => void>,
    onReset: Function as PropType<() => void>,
    onSubmit: Function as PropType<() => void>,
  },

  data() {
    return {};
  },

  computed: {
    formClass(): ClassName {
      return [
        't-form',
        CLASSNAME_SIZE[this.size],
        `t-form--${this.layout}`,
        `t-form--${this.labelAlign}`,
      ];
    },
  },

  watch: {},

  render(): VNode {
    return (
      <form class={this.formClass}>
        {this.$slots.default}
      </form>
    );
  },

});
