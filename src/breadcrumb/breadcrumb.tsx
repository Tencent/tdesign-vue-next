import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from '@TdTypes/breadcrumb/props';
import BreadcrumbItem from '../breadcrumbItem/index';
import { TdBreadcrumbItemProps } from '@TdTypes/breadcrumb/TdBreadcrumbProps';
const name = `${prefix}-breadcrumb`;

export default defineComponent({
  name,
  components: {
    BreadcrumbItem,
  },
  provide() {
    return {
      tBreadcrumb: this,
    };
  },
  props: {
    ...props,
  },

  render() {
    let content: TNodeReturnValue = this.$slots.default ? this.$slots.default() : '';
    if (this.options && this.options.length) {
      content = this.options.map((option: TdBreadcrumbItemProps, index: number) => (
          <BreadcrumbItem
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
