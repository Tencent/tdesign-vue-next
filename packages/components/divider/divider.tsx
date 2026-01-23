import { computed, defineComponent } from 'vue';
import props from './props';
import { useContent, usePrefixClass } from '@tdesign/shared-hooks';
import { pxCompat } from '@tdesign/common-js/utils/helper';

export default defineComponent({
  name: 'TDivider',
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('divider');
    const renderContent = useContent();
    return () => {
      const children = renderContent('default', 'content');
      const isHorizontal = computed(() => props.layout !== 'vertical');
      const showText = computed(() => isHorizontal.value && !!children);

      const dividerClassNames = [
        `${COMPONENT_NAME.value}`,
        [`${COMPONENT_NAME.value}--${props.layout}`],
        {
          [`${COMPONENT_NAME.value}--dashed`]: !!props.dashed,
          [`${COMPONENT_NAME.value}--with-text`]: !!showText.value,
          [`${COMPONENT_NAME.value}--with-text-${props.align}`]: !!showText.value,
        },
      ];
      const dividerWrapperStyle = computed(() => {
        if (props.size) {
          const margin = isHorizontal.value ? `${pxCompat(props.size)} 0` : `0 ${pxCompat(props.size)}`;
          return { margin };
        }
        return null;
      });

      return (
        <div class={dividerClassNames} style={dividerWrapperStyle.value}>
          {showText.value && <span class={`${COMPONENT_NAME.value}__inner-text`}>{children}</span>}
        </div>
      );
    };
  },
});
