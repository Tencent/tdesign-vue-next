import { defineComponent, VNode, ComponentPublicInstance } from 'vue';
import isEmpty from 'lodash/isEmpty';
import { prefix } from '../config';
import { FormValidateResult, TdFormProps, FormValidateParams } from './type';
import props from './props';
import { FORM_ITEM_CLASS_PREFIX, CLASS_NAMES } from './const';
import FormItem from './form-item';
import { FormResetEvent, FormSubmitEvent, ClassName } from '../common';

export type FormItemInstance = InstanceType<typeof FormItem>;

type Result = FormValidateResult<TdFormProps['data']>;

const name = `${prefix}-form`;

export default defineComponent({
  name,

  provide(): { form: ComponentPublicInstance } {
    return {
      form: this,
    };
  },

  props: { ...props },

  emits: ['validate', 'submit', 'reset', 'form-item-destroyed'],

  data() {
    return {
      children: [] as Array<FormItemInstance>,
    };
  },

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
    getFirstError(r: Result) {
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
      // eslint-disable-next-line no-undef
      const behavior = this.scrollToFirstError as ScrollBehavior;
      dom && dom.scrollIntoView({ behavior });
    },
    isFunction(val: unknown) {
      return typeof val === 'function';
    },
    needValidate(name: string, fields: string[]) {
      if (!fields || !Array.isArray(fields)) return true;
      return fields.indexOf(name) !== -1;
    },
    // 对外方法，该方法会触发表单组件错误信息显示
    async validate(param?: FormValidateParams): Promise<Result> {
      const { fields, trigger = 'all' } = param || {};
      const list = this.children
        .filter((child) => this.isFunction(child.validate) && this.needValidate(child.name, fields))
        .map((child) => child.validate(trigger));
      const arr = await Promise.all(list);
      const r = arr.reduce((r, err) => Object.assign(r || {}, err));
      Object.keys(r).forEach((key) => {
        if (r[key] === true) {
          delete r[key];
        }
      });
      const result = isEmpty(r) ? true : r;
      this.$emit('validate', {
        validateResult: result,
        firstError: this.getFirstError(result),
      });
      return result;
    },
    submitHandler(e?: FormSubmitEvent) {
      if (this.preventSubmitDefault) {
        e && e.preventDefault();
        e && e.stopPropagation();
      }
      this.validate().then((r) => {
        this.$emit('submit', {
          validateResult: r,
          firstError: this.getFirstError(r),
          e,
        });
      });
    },
    resetHandler(e?: FormResetEvent) {
      if (this.preventSubmitDefault) {
        e && e.preventDefault();
        e && e.stopPropagation();
      }
      this.children.filter((child: any) => this.isFunction(child.resetField)).map((child: any) => child.resetField());
      this.$emit('reset', { e });
    },
    clearValidate(fields?: Array<string>) {
      this.children.forEach((child) => {
        if (this.isFunction(child.resetHandler) && this.needValidate(child.name, fields)) {
          child.resetHandler();
        }
      });
    },
    // If there is no reset button in form, this function can be used
    reset() {
      this.resetHandler();
    },
    // If there is no submit button in form, this function can be used
    submit() {
      this.submitHandler();
    },
  },

  render(): VNode {
    return (
      <form
        ref="form"
        class={this.formClass}
        onSubmit={(e) => this.submitHandler(e as MouseEvent)}
        onReset={(e) => this.resetHandler(e as MouseEvent)}
        {...this.$attrs}
      >
        {this.$slots.default ? this.$slots.default() : []}
      </form>
    );
  },
});
