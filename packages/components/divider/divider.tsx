import { defineComponent } from 'vue';
import props from './props';
import { useContent, usePrefixClass } from '@tdesign/hooks';

export default defineComponent({
  name: 'TDivider',
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('divider');
    const renderContent = useContent();
    return () => {
      const { layout, dashed, align } = props;
      const children = renderContent('default', 'content');

      const dividerClassNames = [
        `${COMPONENT_NAME.value}`,
        [`${COMPONENT_NAME.value}--${layout}`],
        {
          [`${COMPONENT_NAME.value}--dashed`]: !!dashed,
          [`${COMPONENT_NAME.value}--with-text`]: !!children,
          [`${COMPONENT_NAME.value}--with-text-${align}`]: !!children,
        },
      ];

      return (
        <div class={dividerClassNames}>
          {children && <span class={`${COMPONENT_NAME.value}__inner-text`}>{children}</span>}
        </div>
      );
    };
  },
});
