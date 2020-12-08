import Vue, { PropType, VNode } from 'vue';
import { prefix } from '../config';
import { CLASSNAME_SIZE } from '../utils/classnames';
import { FormData, ErrorList, ValidateRules, ValidateOptions, validate } from './formModel';

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
    rules: Object as PropType<ValidateRules>,
    onValidate: Function as PropType<(validateResult: boolean | ErrorList) => void>,
    onReset: Function as PropType<() => void>,
    onSubmit: Function as PropType<() => void>,
  },

  data() {
    return {
      validateResult: {},
    };
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
    values(): Array<any> {
      return Object.values(this.data);
    },
  },

  watch: {
    values() {
      this.validate();
    },
  },

  methods: {
    validate() {
      const list: Array<ValidateOptions> = [];
      Object.keys(this.rules).forEach((field) => {
        list.push({
          field,
          value: this.data[field],
          rules: this.rules[field],
        });
      });
      const r = validate(list);
      this.validateResult = r;
      // console.log('校验结果：', r);
    },
  },

  render(): VNode {
    return (
      <form class={this.formClass}>
        {this.$slots.default}
      </form>
    );
  },

});
