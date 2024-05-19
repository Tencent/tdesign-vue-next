import { defineComponent, reactive, provide, toRefs } from 'vue';
import props from '@td/intel/breadcrumb/props';
import BreadcrumbItem from './breadcrumb-item';
import { TdBreadcrumbItemProps } from '@td/intel/breadcrumb/type';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TBreadcrumb',
  props,
  setup(props, { slots }) {
    const { separator, theme, maxItemWidth } = toRefs(props);
    const COMPONENT_NAME = usePrefixClass('breadcrumb');
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
      let content = renderTNodeJSX('default');
      if (props.options && props.options.length) {
        content = props.options.map((option: TdBreadcrumbItemProps, index: number) => (
          <BreadcrumbItem {...option} key={index}>
            {option.default || option.content}
          </BreadcrumbItem>
        ));
      }
      return <div class={COMPONENT_NAME.value}>{content}</div>;
    };
  },
});
