import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';
import DatePicker, { DateRangePicker } from '@/src/date-picker/index.ts';
import { ref } from 'vue';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

// every component needs four parts: props/events/slots/functions.
describe('DatePicker test', () => {
  describe('DatePicker', () => {
    describe(':props', () => {
      // it(':value', () => {
      //   const wrapper = mount({
      //     render() {
      //       return <DatePicker value={'1998-11-11'}></DatePicker>;
      //     },
      //   });
      //   expect(wrapper.exists()).toBe(true);
      //   expect(wrapper.element).toMatchSnapshot();
      // });

      // it(':mode', () => {
      //   const wrapper = mount({
      //     render() {
      //       return <DatePicker mode={'year'}></DatePicker>;
      //     },
      //   });
      //   expect(wrapper.element).toMatchSnapshot();
      // });

      it(':readonly', async () => {
        const readonly = ref(false);

        const wrapper = mount(
          {
            render() {
              return (
                <DatePicker
                  class="test-date-picker"
                  readonly={readonly.value}
                  popupProps={{ attach: '.test-date-picker' }}
                  allowInput={true}
                ></DatePicker>
              );
            },
          },
          {
            attachTo: document.body,
          },
        );
        await wrapper.find('.t-input').trigger('click');
        // await wrapper.find('.t-select-input').trigger('focus');

        await wrapper.vm.$nextTick();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const focusedInput = wrapper.findAll('.t-input--focused');
        // console.log('focusedInput', focusedInput);
        const pickerPopup = wrapper.findAll('.t-date-picker__panel');
        // console.log('pickerPopup', pickerPopup);

        // 断言 border-color 是否为 #0052d9
        // expect(focusedInput.element.style.borderColor).toBe('#0052d9');
      });
    });
  });

  describe('DateRangePicker', () => {
    describe(':props', () => {
      it(':range', () => {
        const wrapper = mount({
          render() {
            const testRange = [
              '2018-08', // new Date(2017, 7)
              '2028-04', // new Date(2027, 3)
            ];
            return <DateRangePicker value={testRange}></DateRangePicker>;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
});
