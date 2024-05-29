import { defineComponent, provide, reactive, toRefs } from '@td/adapter-vue';
import props from '@td/components/breadcrumb/props';
import type { TdBreadcrumbItemProps } from '@td/components/breadcrumb/type';
import { usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';
import BreadcrumbItem from './breadcrumb-item';

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
