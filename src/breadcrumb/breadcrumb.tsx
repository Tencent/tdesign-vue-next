import Vue, {CreateElement, VNode} from 'vue';
import {prefix} from '../config';
import RenderComponent from '../utils/render-component';
import Icon from '../icon';
import '../../common/style/web/components/breadcrumb/_index.less'

const name = prefix + '-breadcrumb';
const currItemClass = prefix + '-is-current'
const sizeList: Array<string> = ['large', 'middle', 'small'];
const themeList: Array<string> = ['light'];
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
      default: 'light',
      validator(v: string): boolean {
        return themeList.indexOf(v) > -1;
      }
    },
    size: {
      type: String,
      default: 'middle',
      validator(v: string): boolean {
        return sizeList.indexOf(v) > -1;
      }
    },
    separator: {
      type: [Function, String],
      default: ''
    }
  },

  provide() {
    return {
      tBreadcrumb: this
    };
  },

  data() {
    return {
    };
  },

  computed: {
  },

  watch: {},


  mounted() {
    const items = this.$el.querySelectorAll('.t-breadcrumb__item')
    if (items.length) {
      const lastItem = items[items.length - 1]
      lastItem.classList.add(currItemClass);
      lastItem.querySelector('.t-separator').innerHTML = ''
    }
  },

  render(h: CreateElement) {
    const breadcrumbContent: any = this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
    return <div class="t-breadcrumb">{breadcrumbContent}</div>
  }

});
