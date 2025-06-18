import { defineComponent, computed, PropType } from 'vue';
import { usePrefixClass } from '@tdesign/shared-hooks';
import props from './paragraph-props';
import TTooltip from '../tooltip/index';
import Ellipsis from './ellipsis';

export default defineComponent({
  name: 'TTypographyParagraph',
  components: { TTooltip },
  props: {
    style: {
      type: Object as PropType<Record<string, string | number>>,
      default: () => ({}),
    },
    ...props,
  },
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const content = computed(() => {
      return props.content || slots?.default();
    });

    return () => {
      return props.ellipsis ? (
        <Ellipsis {...props} class={COMPONENT_NAME.value}>
          {content.value}
        </Ellipsis>
      ) : (
        <p class={COMPONENT_NAME.value}>{content.value}</p>
      );
    };
  },
});
