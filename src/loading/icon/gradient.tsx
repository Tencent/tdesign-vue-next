import { defineComponent } from 'vue';
import { prefix } from '../../config';
import setStyle from '../../utils/set-style';

const name = `${prefix}-loading__gradient`;
const classname = `${prefix}-icon-loading`;

export default defineComponent({
  name,
  mounted() {
    this.$nextTick(() => {
      this.updateColor();
    });
  },
  updated() {
    this.updateColor();
  },
  methods: {
    updateColor() {
      let basicStyle = {};
      const circleElem = this.$refs.circle as HTMLElement;
      if (!circleElem) {
        return;
      }

      const { color, fontSize } = window.getComputedStyle(circleElem);

      // to fix the browser compat of foreignObject in Safari,
      // https://bugs.webkit.org/show_bug.cgi?id=23113
      const ua = window?.navigator?.userAgent;
      const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
      if (isSafari) {
        basicStyle = {
          transformOrigin: '-1px -1px',
          transform: `scale(${parseInt(fontSize, 10) / 14})`,
        };
      }
      if (color) {
        const matched = color.match(/[\d.]+/g);
        const endColor = `rgba(${matched[0]}, ${matched[1]}, ${matched[2]}, 0)`;
        setStyle(circleElem, {
          ...basicStyle,
          background: `conic-gradient(from 90deg at 50% 50%,${endColor} 0deg, ${color} 360deg)`,
        });
      } else {
        setStyle(circleElem, {
          ...basicStyle,
          background: '',
        });
      }
    },
  },
  render() {
    const classes = [name, classname];
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
