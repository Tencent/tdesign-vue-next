import { defineComponent, computed, h } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './title-props';
export default defineComponent({
  name: 'TTypographyTitle',
  props,
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const content = computed(() => {
      return props.content || slots?.default();
    });
    return () => {
      const { level: Tag } = props;
      return (
        <div class={COMPONENT_NAME.value}>{h(Tag, { class: COMPONENT_NAME.value }, ...(content.value as string))}</div>
      );
    };
  },
});
