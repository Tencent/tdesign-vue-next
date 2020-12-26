import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import { FormValidateResult, TdFormRule } from '../../types/form/TdFormProps';
import props from '../../types/form/props';
import { FORM_ITEM_CLASS_PREFIX, CLASS_NAMES } from './const';
import isEmpty from 'lodash/isEmpty';

const name = `${prefix}-form`;

export default Vue.extend({
  name,

  props: { ...props },

  computed: {
    formClass(): ClassName {
      return [
        CLASS_NAMES.form,
        {
          't-form-inline': this.layout === 'inline',
        },
      ];
    },
  },

  methods: {
    getFirstError(r: FormValidateResult) {
      if (r === true) return;
      const [firstKey] = Object.keys(r);
      if (this.scrollToFirstError) {
        this.scrollTo(`.${FORM_ITEM_CLASS_PREFIX + firstKey}`);
      }
      return r[firstKey][0].message;
    },
    // 校验不通过时，滚动到第一个错误表单
    scrollTo(selector: string) {
      const dom = this.$el.querySelector(selector);
      const behavior = this.scrollToFirstError as ScrollBehavior;
      dom && dom.scrollIntoView({ behavior });
    },
    emitEvent(eventName: string, data: { result?: FormValidateResult; e: Event; firstError?: TdFormRule }) {
      this.$emit(eventName, data);
      const propsApi = `on${eventName[0].toUpperCase()}${eventName.substr(1)}`;
      if (typeof this[propsApi] === 'function') {
        this[propsApi](data);
      }
    },
    isFunction(val: unknown) {
      return typeof val === 'function';
    },
    // 对外方法，该方法会触发全部表单组件错误信息显示
    validate(): Promise<FormValidateResult> {
      const list = this.$children
        .filter((child: any) => this.isFunction(child.validate))
        .map((child: any) => child.validate());
      return new Promise((resolve) => {
        Promise.all(list)
          .then((arr) => {
            const r = arr.reduce((r, err) => Object.assign(r || {}, err));
            Object.keys(r).forEach((key) => {
              if (r[key] === true) {
                delete r[key];
              }
            });
            resolve(isEmpty(r) ? true : r);
          });
      });
    },
    submitHandler(e: Event) {
      this.validate().then((r) => {
        this.emitEvent('submit', {
          result: r,
          firstError: this.getFirstError(r),
          e,
        });
      });
    },
    resetHandler(e: Event) {
      this.emitEvent('reset', { e });
      this.$children
        .filter((child: any) => this.isFunction(child.resetField))
        .map((child: any) => child.resetField());
    },
  },

  render(): VNode {
    const on = {
      submit: this.submitHandler,
      reset: this.resetHandler,
    };
    return (
      <form class={this.formClass} {...{ on }}>
        {this.$slots.default}
      </form>
    );
  },

});
