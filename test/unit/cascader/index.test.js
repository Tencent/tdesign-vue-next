import { mount } from '@vue/test-utils';
import Cascader from '@/src/cascader/index.ts';

const options = [
  {
    label: '上海',
    value: '1',
    children: [
      {
        label: '黄浦区',
        value: '1.1',
      },
      {
        label: '静安区',
        value: '1.2',
      },
      {
        label: '浦东新区',
        value: '1.3',
      },
    ],
  },
  {
    label: '深圳',
    value: '2',
    children: [
      {
        label: '宝安区',
        value: '2.1',
      },
      {
        label: '南山区',
        value: '2.2',
      },
    ],
  },
];
// every component needs four parts: props/events/slots/functions.
describe('Cascader', () => {
  // test props api
  describe(':props', () => {
    it(':value', () => {
      const value = '1';
      const wrapper = mount({
        render() {
          return <Cascader options={options} v-model={value}></Cascader>;
        },
      });
      expect(wrapper.find('.t-cascader-item').exists()).toBe(true);
    });

    // it(':multiple', () => {
    //   const value = ['2.1', '2.2'];
    //   const wrapper = mount({
    //     render() {
    //       return <Cascader
    //         options={options}
    //         v-model={value}
    //         multiple
    //         clearable
    //         size="medium"></Cascader>;
    //     },
    //   });
    //   expect(wrapper.find('.t-tag').exists()).toBe(true);
    // });

    it(':disabled', () => {
      const value = ['2.1', '2.2'];
      const wrapper = mount({
        render() {
          return <Cascader options={options} v-model={value} multiple disabled size="medium"></Cascader>;
        },
      });
      expect(wrapper.find('.t-is-disabled').exists()).toBe(true);
    });
  });
});
