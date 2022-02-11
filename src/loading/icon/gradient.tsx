import { defineComponent, onMounted, getCurrentInstance } from 'vue';
import { prefix } from '../../config';
import circleAdapter from '../../_common/js/loading/circle-adapter';

const name = `${prefix}-loading__gradient`;

export default defineComponent({
  name,

  setup() {
    onMounted(() => {
      const circleElem = getCurrentInstance().refs.circle as HTMLElement;
      circleAdapter(circleElem);
    });
  },
  render() {
    const classes = [name, `${prefix}-icon-loading`];
    return (
      <svg
        class={classes}
        viewBox="0 0 14 14"
        version="1.1"
        width="1em"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject x="1" y="1" width="12" height="12">
          <div class={`${name}-conic`} ref="circle" />
        </foreignObject>
      </svg>
    );
  },
});
