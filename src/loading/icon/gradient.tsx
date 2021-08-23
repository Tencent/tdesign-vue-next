import { defineComponent } from 'vue';
import { prefix } from '../../config';

const name = `${prefix}-loading__gradient`;
const classname = `${prefix}-icon-loading`;

export default defineComponent({
  name,

  render() {
    const classes = [name, classname];
    return (
      <svg class={classes} viewBox="0 0 14 14" version="1.1" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
        <foreignObject x="1" y="1" width="12" height="12">
          <div class={`${name}-conic`} />
        </foreignObject>
      </svg>
    );
  },
});
