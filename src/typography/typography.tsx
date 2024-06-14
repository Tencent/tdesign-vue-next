import { defineComponent } from 'vue';
import Text from './text';
export default defineComponent({
  name: 'TTypography',

  setup(props, { slots }) {
    return () => {
      return <Text>{slots.default()}</Text>;
    };
  },
});
