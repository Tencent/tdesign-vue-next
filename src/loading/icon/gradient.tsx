import { defineComponent, onMounted, getCurrentInstance } from 'vue';
import circleAdapter from '../../_common/js/loading/circle-adapter';
import { useConfig } from '../../config-provider';

export default defineComponent({
  name: 'TLoadingGradient',

  setup() {
    const { classPrefix } = useConfig('classPrefix');
    onMounted(() => {
      const circleElem = getCurrentInstance().refs.circle as HTMLElement;
      circleAdapter(circleElem);
    });
    return {
      classPrefix,
    };
  },
  render() {
    const { classPrefix } = this;
    const classes = [`${classPrefix}-loading__gradient`, `${classPrefix}-icon-loading`];
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
