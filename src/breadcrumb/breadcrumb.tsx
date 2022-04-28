import { defineComponent, reactive, provide } from 'vue';
import props from './props';
import BreadcrumbItem from './breadcrumb-item';
import { TdBreadcrumbItemProps } from './type';
import { TNodeReturnValue } from '../common';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TBreadcrumb',
  props,
  setup(props, { slots }) {
    provide(
      'tBreadcrumb',
      reactive({
        separator: props.separator,
        theme: props.theme,
        slots: { separator: slots.separator },
        maxItemWidth: props.maxItemWidth,
      }),
    );
    const renderTNodeJSX = useTNodeJSX();
    return () => {
      let content: TNodeReturnValue = renderTNodeJSX('default');
      if (props.options && props.options.length) {
        content = props.options.map((option: TdBreadcrumbItemProps, index: number) => (
          <BreadcrumbItem {...option} key={index}>
            {option.default || option.content}
          </BreadcrumbItem>
        ));
      }
      return <div class="t-breadcrumb">{content}</div>;
    };
  },
});
