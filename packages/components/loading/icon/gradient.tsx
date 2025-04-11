import { defineComponent, onMounted, nextTick, ref } from 'vue';
import { usePrefixClass } from '../../hooks/useConfig';
import circleAdapter from '@tdesign/common-js/loading/circle-adapter';

export default defineComponent({
  name: 'TLoadingGradient',
  setup() {
    const classPrefix = usePrefixClass();
    const circleRef = ref<HTMLElement | null>();

    onMounted(() => {
      nextTick(() => {
        circleAdapter(circleRef.value);
      });
    });

    return () => {
      const name = `${classPrefix.value}-loading__gradient`;
      const classes = [name, `${classPrefix.value}-icon-loading`];

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
            <div class={`${name}-conic`} ref={circleRef} />
          </foreignObject>
        </svg>
      );
    };
  },
});
