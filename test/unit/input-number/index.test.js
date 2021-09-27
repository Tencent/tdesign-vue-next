import { mount } from '@vue/test-utils';
import { InputNumber } from '@/src/input-number/index.ts';

describe('InputNumber', () => {
  // test props
  describe(':props', () => {
    it('class, with class t-input-number', () => {
      const wrapper = mount(InputNumber);
      const classes = wrapper.classes();
      expect(classes).toContain('t-input-number');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled, function can not be call', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <InputNumber disabled onKeydown={fn}></InputNumber>;
        },
      });
      wrapper.find('input').trigger('keydown');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':format, with 6%', () => {
      const wrapper = mount({
        render() {
          return <InputNumber value={6} format={(v) => `${v}%`} />;
        },
      });
      const inputNumber = wrapper.find('input');
      expect(inputNumber.element.value).toEqual('6%');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':value, 6', () => {
      const wrapper = mount({
        render() {
          return <InputNumber value={6} />;
        },
      });
      const inputNumber = wrapper.find('input');
      expect(inputNumber.element.value).toEqual('6');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':defaultValue, default value 6', () => {
      const wrapper = mount({
        render() {
          return <InputNumber defaultValue={6} />;
        },
      });
      const inputNumber = wrapper.find('input');
      expect(inputNumber.element.value).toEqual('6');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':mode, without class t-is-controls-right', () => {
      const wrapper = mount({
        render() {
          return <InputNumber />;
        },
      });
      const inputNumber = wrapper.findComponent(InputNumber);
      const right = inputNumber.find('.t-is-controls-right');
      expect(right.exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':mode:row, without class t-is-controls-right', () => {
      const wrapper = mount({
        render() {
          return <InputNumber theme="row" />;
        },
      });
      const inputNumber = wrapper.findComponent(InputNumber);
      const right = inputNumber.find('.t-is-controls-right');
      expect(right.exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':mode:column, with class t-is-controls-right', () => {
      const wrapper = mount({
        render() {
          return <InputNumber theme="column" />;
        },
      });
      const inputNumber = wrapper.findComponent(InputNumber);
      const right = inputNumber.find('.t-is-controls-right');
      expect(right.exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':max, value 6 < max 10', () => {
      const wrapper = mount({
        render() {
          return <InputNumber max={10} value={6} />;
        },
      });
      const inputNumber = wrapper.find('input');
      expect(inputNumber.element.value).toEqual('6');
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':max, value 16 > max 10', () => {
      const wrapper = mount({
        render() {
          return <InputNumber max={10} value={16} />;
        },
      });
      const inputNumber = wrapper.find('input');
      expect(inputNumber.element.value).toEqual('16');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':min, value 6 > min 1', () => {
      const wrapper = mount({
        render() {
          return <InputNumber min={1} value={6} />;
        },
      });
      const inputNumber = wrapper.find('input');
      expect(inputNumber.element.value).toEqual('6');
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':min, value -1 < min 1', () => {
      const wrapper = mount({
        render() {
          return <InputNumber min={1} value={-1} />;
        },
      });
      const inputNumber = wrapper.find('input');
      expect(inputNumber.element.value).toEqual('-1');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':step, 2', async () => {
      const wrapper = mount({
        render() {
          return <InputNumber value={6} step={2} />;
        },
      });
      wrapper.find('.t-input-number__increase').trigger('click');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':size:small, with class t-size-s', () => {
      const wrapper = mount({
        render() {
          return <InputNumber size="small" />;
        },
      });
      const inputNumber = wrapper.findComponent(InputNumber);
      const classes = inputNumber.classes();
      expect(classes).toContain('t-size-s');
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size:medium, with class t-size-m', () => {
      const wrapper = mount({
        render() {
          return <InputNumber size="medium" />;
        },
      });
      const inputNumber = wrapper.findComponent(InputNumber);
      const classes = inputNumber.classes();
      expect(classes).toContain('t-size-m');
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size:large, with class t-size-l', () => {
      const wrapper = mount({
        render() {
          return <InputNumber size="large" />;
        },
      });
      const inputNumber = wrapper.findComponent(InputNumber);
      const classes = inputNumber.classes();
      expect(classes).toContain('t-size-l');
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  describe('@events', () => {
    // it('@change', () => {
    //   const fn = jest.fn();
    //   const wrapper = mount({
    //     render() {
    //       return <InputNumber onChange={fn} />;
    //     },
    //   });
    //   const inputWrapper = wrapper.findComponent(InputNumber);
    //   wrapper.find('input').element.value = 100;
    //   wrapper.find('input').trigger('input');
    //   expect(inputWrapper.emitted().change).toBeTruthy();
    //   expect(fn).toBeCalled();
    // });

    // it('@blur', async () => {
    //   const fn = jest.fn();
    //   const wrapper = mount({
    //     render() {
    //       return <InputNumber onBlur={fn} />;
    //     },
    //   });
    //   const inputWrapper = wrapper.findComponent(InputNumber);
    //   await wrapper.find('input').trigger('blur');
    //   expect(inputWrapper.emitted().blur).toBeTruthy();
    //   expect(fn).toBeCalled();
    // });

    it('@keydown', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <InputNumber onKeydown={fn} />;
        },
      });
      const inputWrapper = wrapper.findComponent(InputNumber);
      wrapper.find('input').trigger('keydown');
      expect(inputWrapper.emitted().keydown).toBeTruthy();
      expect(fn).toBeCalled();
    });

    it('@keyup', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <InputNumber onKeyup={fn} />;
        },
      });
      const inputWrapper = wrapper.findComponent(InputNumber);
      wrapper.find('input').trigger('keyup');
      expect(inputWrapper.emitted().keyup).toBeTruthy();
      expect(fn).toBeCalled();
    });

    it('@keypress', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <InputNumber onKeypress={fn} />;
        },
      });
      const inputWrapper = wrapper.findComponent(InputNumber);
      wrapper.find('input').trigger('keypress');
      expect(inputWrapper.emitted().keypress).toBeTruthy();
      expect(fn).toBeCalled();
    });
  });
});
