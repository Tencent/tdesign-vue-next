import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import Icon from '../icon';

const name = `${prefix}-notification`;

export default Vue.extend({
  name,
  components: {
    [Icon.name]: Icon,
    RenderComponent,
  },
  props: {},
  render(h: CreateElement) {
    return (
      <div>
        this is tencent notification
      </div>
    );
  }
});
