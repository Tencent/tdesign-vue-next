import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import Icon from '../icon';

const name = prefix + '-list';

export default Vue.extend({
  name,
 
  components: {
    [Icon.name]: Icon,
    RenderComponent,
  },
 
  props: {
    // theme is an example api, which can be deleted.
    theme: {
      type: String,
      default: 'line',
      validator(v: string): boolean {
        return (
          [
            'line',
            'primary',
            'dashed',
            'warning',
            'warning-line',
            'link',
            'ghost',
            'ghost-line',
          ].indexOf(v) > -1
        );
      },
    },
  },

  data() {
    return {};
  },

  computed: {},

  watch: {},

  mounted() {},
 
  render(h: CreateElement) {
    return <div></div>
  }
 
});
