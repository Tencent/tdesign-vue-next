import { defineComponent } from 'vue';
import { ClassName } from '../common';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TInputGroup',
  props: {
    separate: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const COMPONENT_NAME = usePrefixClass('input-group');
    return {
      COMPONENT_NAME,
    };
  },
  computed: {
    CLASS(): ClassName {
      return [
        this.COMPONENT_NAME,
        {
          [`${this.COMPONENT_NAME}--separate`]: this.separate,
        },
      ];
    },
  },
  render() {
    const { CLASS } = this;
    return <div class={CLASS}>{this.$slots.default && this.$slots.default(null)}</div>;
  },
});
