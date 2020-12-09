import Vue, { PropType, VNode } from 'vue';
import { prefix } from '../config';
import { CLASSNAME_SIZE } from '../utils/classnames';
import { validate } from './formModel';
import { FormData, ValidateRules, ValidateOptions, ValidateResult, ValidateRule } from './type';
import { FORM_ITEM_CLASS_PREFIX } from './const';

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
      validator(val): boolean {
        return ['vertical', 'inline'].includes(val);
      },
    },
    labelAlign: {
      type: String,
      default: 'right',
      validator(val): boolean {
        return ['left', 'right', 'top'].includes(val);
      },
    },
    size: {
      type: String,
      default: 'medium',
      validator(val): boolean {
        return ['medium', 'large'].includes(val);
      },
    },
    colon: Boolean,
    requiredMark: {
      type: Boolean,
      default: true,
    },
    scrollToFirstError: {
      type: [String],
      validator(val): boolean {
        return ['', 'auto', 'smooth'].includes(val);
      },
    },
    showErrorMessage: {
      type: Boolean,
      default: true,
    },
    rules: Object as PropType<ValidateRules>,
    onReset: Function as PropType<() => void>,
    onSubmit: Function as PropType<(validateResult: ValidateResult) => void>,
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

  methods: {
    getFirstError(result: ValidateResult) {
      if (result === true) return;
      const [[error]] = Object.values(result);
      if (this.scrollToFirstError) {
        this.scrollTo(`.${FORM_ITEM_CLASS_PREFIX + Object.keys(result)[0]}`);
      }
      return error;
    },
    // 校验不通过时，滚动到第一个错误表单
    scrollTo(selector: string) {
      const dom = this.$el.querySelector(selector);
      const behavior = this.scrollToFirstError as ScrollBehavior;
      dom && dom.scrollIntoView({ behavior });
    },
    emitEvent(eventName: string, data: { result?: ValidateResult; e: Event; firstError?: ValidateRule }) {
      this.$emit(eventName, data);
      const propsApi = `on${eventName[0].toUpperCase()}${eventName.substr(1)}`;
      if (this[propsApi]) {
        this[propsApi](data);
      }
    },
    // 对外方法，该方法不会触发任何表单组件错误信息显示
    normalValidate(): ValidateResult {
      const list: Array<ValidateOptions> = [];
      Object.keys(this.rules).forEach((field) => {
        list.push({
          field,
          value: this.data[field],
          rules: this.rules[field],
        });
      });
      return validate(list);
    },
    isFunction(val: unknown) {
      return typeof val === 'function';
    },
    // 对外方法，该方法会触发全部表单组件错误信息显示
    validate(): Promise<ValidateResult> {
      // @ts-ignore
      const list = this.$children.filter(child => this.isFunction(child.validate)).map(item => item.validate());
      return new Promise((resolve) => {
        Promise.all(list).then((arr) => {
          const r = arr.filter(item => item !== true).reduce((r, err) => Object.assign(r || {}, err)) as ValidateResult;
          resolve(r);
        });
      });
    },
    submitHanlder(e: Event) {
      this.validate().then((r) => {
        this.emitEvent('submit', {
          result: r,
          firstError: this.getFirstError(r),
          e,
        });
      });;
    },
    resetHandler(e: Event) {
      this.emitEvent('reset', { e });
    },
  },

  render(): VNode {
    const on = {
      submit: this.submitHanlder,
      reset: this.resetHandler,
    };
    return (
      <form class={this.formClass} {...{ on }}>
        {this.$slots.default}
      </form>
    );
  },

});
