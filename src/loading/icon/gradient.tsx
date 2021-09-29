import { defineComponent } from 'vue';
import { prefix } from '../../config';

const name = `${prefix}-loading__gradient`;
const classname = `${prefix}-icon-loading`;

export default defineComponent({
  name,
  mounted() {
    this.updateColor();
  },
  updated() {
    this.updateColor();
  },
  methods: {
    updateColor() {
      const circleElem = this.$refs.circle as HTMLElement;
      if (!circleElem) {
        return;
      }

      const { color } = window.getComputedStyle(circleElem);
      if (color) {
        const matched = color.match(/[\d.]+/g);
        const endColor = `rgba(${matched[0]}, ${matched[1]}, ${matched[2]}, 0)`;
        circleElem.style.background = `conic-gradient(from 90deg at 50% 50%,${endColor} 0deg, ${color} 360deg)`;
      } else {
        circleElem.style.background = '';
      }
    },
  },
  render() {
    const classes = [name, classname];
    return (
      <svg class={classes} viewBox="0 0 14 14" version="1.1" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
        <foreignObject x="1" y="1" width="12" height="12">
          <div class={`${name}-conic`} ref="circle"/>
        </foreignObject>
      </svg>
    );
  },
});
