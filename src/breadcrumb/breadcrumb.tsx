import Vue, {CreateElement, VNode} from 'vue';
import {prefix} from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import Icon from '../icon';

const name = prefix + '-breadcrumb';
const sizeList: Array<string> = ['large', 'middle', 'small'];
const themeList: Array<string> = ['line', 'primary', 'ghost'];
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
        return themeList.indexOf(v) > -1;
      }
    },
    size: {
      type: String,
      default: 'default',
      validator(v: string): boolean {
        return sizeList.indexOf(v) > -1;
      }
    },
    separator: {
      type: String,
      default: '/'
    }
  },

  provide() {
    return {
      tBreadcrumb: this
    };
  },

  data() {
    return {};
  },

  computed: {
  },

  watch: {},

  mounted() {},

  render(h: CreateElement) {
    return <div class="t-breadcrumb"><slot></slot></div>
  }

});
