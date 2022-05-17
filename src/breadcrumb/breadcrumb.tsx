import { defineComponent, reactive, provide, toRefs } from 'vue';
import props from './props';
import BreadcrumbItem from './breadcrumb-item';
import { TdBreadcrumbItemProps } from './type';
import { TNodeReturnValue } from '../common';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TBreadcrumb',
  props,
  setup(props, { slots }) {
    const { separator, theme, maxItemWidth } = toRefs(props);
    provide(
      'tBreadcrumb',
      reactive({
        separator,
        theme,
        slots: { separator: slots.separator },
        maxItemWidth,
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
