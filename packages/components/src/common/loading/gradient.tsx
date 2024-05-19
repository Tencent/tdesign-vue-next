import { defineComponent, onMounted, getCurrentInstance, nextTick } from '@td/adapter-vue';
import circleAdapter from '@td/shared/_common/js/loading/circle-adapter';

import { usePrefixClass } from '@td/adapter-hooks';

export default defineComponent({
  name: 'TLoadingGradient',
  props:{
    size:String
  },
  setup() {
    const classPrefix = usePrefixClass();
    onMounted(() => {
      const circleElem = getCurrentInstance()?.refs?.circle as HTMLElement;
      nextTick(() => {
        circleAdapter(circleElem);
      });
    });
    return {
      classPrefix,
    };
  },
  render() {
    const { classPrefix } = this;
    const name = `${classPrefix}-loading__gradient`;

    const classes = [name, `${classPrefix}-icon-loading`];
    return (
      <svg
        class={classes}
        viewBox="0 0 12 12"
        version="1.1"
        width="1em"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject x="0" y="0" width="12" height="12">
          <div class={`${name}-conic`} ref="circle" />
        </foreignObject>
      </svg>
    );
  },
});
