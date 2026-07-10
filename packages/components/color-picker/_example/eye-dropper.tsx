import { defineComponent } from 'vue';
import { ColorPicker } from 'tdesign-vue-next';

export default defineComponent({
  setup() {
    return () => <ColorPicker eye-dropper defaultValue="#0052d9" />;
  },
});
