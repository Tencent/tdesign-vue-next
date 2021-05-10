import { defineComponent, VNode, computed, provide } from 'vue';
import { prefix } from '../config';
import { FormValidateResult, TdFormProps } from '@TdTypes/form/TdFormProps';
import props from '@TdTypes/form/props';
import {
  FORM_ITEM_CLASS_PREFIX, CLASS_NAMES,
  TdForm, TdFormField,
} from './const';
import isEmpty from 'lodash/isEmpty';

type Result = FormValidateResult<TdFormProps['data']>;

const name = `${prefix}-form`;

export default defineComponent({
  name,

  props: { ...props },

  emits: ['submit', 'reset'],

  setup(props, { emit }) {
    const formClass = computed(() => [
      CLASS_NAMES.form,
      { 't-form-inline': props.layout === 'inline' },
    ]);
    const fields: TdFormField[] = [];
    const tForm: TdForm = {
      addField(field) {
        if (field) {
          fields.push(field);
        }
      },
      removeField(field) {
        if (field) {
          fields.splice(fields.indexOf(field), 1);
        }
      },
    };

    // 对外方法，该方法会触发全部表单组件错误信息显示
    const validate = (): Promise<Result> => {
      const list = fields.map((field: TdFormField) => field.validate());
      return new Promise((resolve) => {
        Promise.all(list)
          .then((arr) => {
            const r = arr.reduce((r, err) => Object.assign(r || {}, err), {});
            Object.keys(r).forEach((key) => {
              if (r[key] === true) {
                delete r[key];
              }
            });
            resolve(isEmpty(r) ? true : r as Result);
          });
      });
    };

    const resetHandler = (e: MouseEvent) => {
      fields.map((child: any) => child.resetField());
      emit('reset', { e });
    };

    provide('td-form', tForm);

    return {
      validate,
      resetHandler,
      formClass,
    };
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
      const behavior = this.scrollToFirstError as ScrollBehavior;
      dom && dom.scrollIntoView({ behavior });
    },

    submitHandler(e: MouseEvent) {
      const { preventSubmitDefault } = this.$props;
      if (preventSubmitDefault) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.validate().then((r) => {
        this.$emit('submit', {
          result: r,
          firstError: this.getFirstError(r),
          e,
        });
      });
    },

  },

  render(): VNode {
    return (
      <form class={this.formClass} onSubmit={this.submitHandler} onReset={this.resetHandler}>
        {this.$slots.default ? this.$slots.default() : []}
      </form>
    );
  },

});
