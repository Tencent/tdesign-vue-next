import { defineComponent, provide, getCurrentInstance } from 'vue';
import props from './props';
import BreadcrumbItem from './breadcrumb-item';
import { TdBreadcrumbItemProps } from './type';
import { TNodeReturnValue } from '../common';

export default defineComponent({
  name: 'TBreadcrumb',
  components: {
    BreadcrumbItem,
  },
  props,
  setup(props, { slots, attrs }) {
    provide('tBreadcrumb', { ...props, slots });
    const renderContent = () => {
      let content: TNodeReturnValue = slots.default ? slots.default() : '';
      if (props.options && props.options.length) {
        content = props.options.map((option: TdBreadcrumbItemProps, index: number) => (
          <BreadcrumbItem {...attrs} {...option} key={index}>
            {option.default || option.content}
          </BreadcrumbItem>
        ));
      }
      return content;
    };
    return {
      renderContent,
    };
  },

  render() {
    const { renderContent } = this;
    return <div class="t-breadcrumb">{renderContent()}</div>;
  },
});
