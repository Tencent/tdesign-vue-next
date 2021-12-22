import { defineComponent } from 'vue';
import props from './props';
import BreadcrumbItem from './breadcrumb-item';
import { TdBreadcrumbItemProps } from './type';
import { TNodeReturnValue } from '../common';

export default defineComponent({
  name: 'TBreadcrumb',

  components: {
    BreadcrumbItem,
  },
  provide() {
    return {
      tBreadcrumb: this,
    };
  },

  props,

  render() {
    let content: TNodeReturnValue = this.$slots.default ? this.$slots.default() : '';
    if (this.options && this.options.length) {
      content = this.options.map((option: TdBreadcrumbItemProps, index: number) => (
        <BreadcrumbItem
          {...this.$attrs}
          key={index}
          maxWidth={option.maxWidth}
          disabled={option.disabled}
          href={option.href}
          target={option.target}
          to={option.to}
          router={option.router}
          replace={option.replace}
        >
          {option.default || option.content}
        </BreadcrumbItem>
      ));
    }
    return <div class="t-breadcrumb">{content}</div>;
  },
});
