import { mount } from '@vue/test-utils';
import line from '@/examples/progress/demos/line.vue';
import circle from '@/examples/progress/demos/circle.vue';
import plump from '@/examples/progress/demos/plump.vue';
import status from '@/examples/progress/demos/status.vue';
import size from '@/examples/progress/demos/size.vue';
import custom from '@/examples/progress/demos/custom.vue';

const mapper = {
  line,
  circle,
  plump,
  status,
  size,
  custom,
};

describe('Progress', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
