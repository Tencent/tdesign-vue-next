import { defineComponent, computed } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TInputGroup',
  props: {
    separate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('input-group');

    const CLASS = computed(() => [
      COMPONENT_NAME.value,
      {
        [`${COMPONENT_NAME.value}--separate`]: props.separate,
      },
    ]);

    return {
      COMPONENT_NAME,
      CLASS,
    };
  },
  render() {
    const { CLASS } = this;
    return <div class={CLASS}>{this.$slots.default && this.$slots.default(null)}</div>;
  },
});
