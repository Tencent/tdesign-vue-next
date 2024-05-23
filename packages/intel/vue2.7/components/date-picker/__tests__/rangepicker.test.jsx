import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';
import { nextTick } from '@td/adapter-vue';
import { BrowseIcon, LockOnIcon } from 'tdesign-icons-vue';
import dayjs from 'dayjs';
import DateRangePicker from '@/src/date-picker/index.ts';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

// every component needs four parts: props/events/slots/functions.
describe('DateRangePicker', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <DateRangePicker />;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  it(':value', () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker value={'1998-11-11'} />;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':mode', () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker mode={'year'} />;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':range', () => {
    const wrapper = mount({
      render() {
        const testRange = [
          '2018-08', // new Date(2017, 7)
          '2028-04', // new Date(2027, 3)
        ];
        return <DateRangePicker value={testRange} range />;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('clearable', async () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker defaultValue={'2022-09-14'} clearable></DateRangePicker>;
      },
    });
    const input = wrapper.find('.t-input');
    await input.trigger('mouseenter');
    await nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
  });

  it('disabled', () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker disabled />;
      },
    });
    const inputInner = wrapper.find('.t-input__inner');
    expect(inputInner.element.disabled).toBe(true);
  });

  it('enableTimePicker', async () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker enableTimePicker />;
      },
    });
    wrapper.find('.t-input').trigger('click');
    await nextTick();
    expect(document.querySelector('.t-date-picker__panel-time')).not.toBe(null);
  });

  it('firstDayOfWeek', async () => {
    const wrapper = mount(DateRangePicker, {
      propsData: {
        firstDayOfWeek: 3,
      },
    });
    wrapper.find('.t-input').trigger('click');
    await nextTick();
    const weekElement = document.querySelector('.t-date-picker__table table thead tr th');
    expect(weekElement.innerHTML).toEqual('一');
  });

  it('format', async () => {
    // defaultValue
    const wrapper = mount({
      render() {
        return <DateRangePicker defaultValue={'2022-09-14 16:30:20'} format={'YYYY-MM-DD'} />;
      },
    });
    const inputElement1 = wrapper.find('.t-input__inner');
    expect(inputElement1.element.value).toEqual('2022-09-14');

    // value
    const wrapper2 = mount({
      render() {
        return <DateRangePicker value={'2022-09-14 16:30:20'} format={'YYYY-MM-DD'} />;
      },
    });
    const inputElement2 = wrapper2.find('.t-input__inner');
    expect(inputElement2.element.value).toEqual('2022-09-14');
  });

  it('inputProps', () => {
    const wrapper = mount(DateRangePicker, {
      propsData: {
        inputProps: { inputClass: 'test-inputClass' },
      },
    });
    expect(wrapper.find('.t-input').classes()).toContain('test-inputClass');
  });

  it('mode week', async () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker mode={'week'} value={'2022-37th'} />;
      },
    });
    wrapper.find('.t-input').trigger('click');
    await nextTick();
    expect(document.querySelector('.t-date-picker__panel-week')).not.toBe(null);
  });

  it('mode month', async () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker mode={'month'} />;
      },
    });
    wrapper.find('.t-input').trigger('click');
    await nextTick();
    expect(document.querySelector('.t-date-picker__panel-month')).not.toBe(null);
  });

  it('mode quarter', async () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker mode={'quarter'} />;
      },
    });
    wrapper.find('.t-input').trigger('click');
    await nextTick();
    expect(document.querySelector('.t-date-picker__panel-quarter')).not.toBe(null);
  });

  it('mode year', async () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker mode={'year'} />;
      },
    });
    wrapper.find('.t-input').trigger('click');
    await nextTick();
    expect(document.querySelector('.t-date-picker__panel-year')).not.toBe(null);
  });

  it('placeholder', () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker />;
      },
    });
    expect(wrapper.find('input').element.placeholder).toEqual('请选择日期');
  });

  it('popupProps', async () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker popupProps={{ showArrow: true }} />;
      },
    });
    wrapper.find('.t-input').trigger('click');
    await nextTick();
    expect(document.querySelector('.t-popup__arrow')).not.toBe(null);
  });

  it('prefixIcon suffixIcon', () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker prefixIcon={() => <BrowseIcon />} suffixIcon={() => <LockOnIcon />} />;
      },
    });
    expect(wrapper.find('.t-icon-browse')).not.toBe(null);
    expect(wrapper.find('.t-icon-lock-on')).not.toBe(null);
  });

  it('presets bottom top', async () => {
    const presets = {
      昨天: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    };
    const wrapper = mount({
      render() {
        return <DateRangePicker presets={presets} />;
      },
    });
    wrapper.find('.t-input').trigger('click');
    await nextTick();
    expect(document.querySelector('.t-date-picker__presets .t-button__text').innerHTML).toContain('昨天');
  });

  test('status', () => {
    const wrapper = mount({
      render() {
        return <DateRangePicker status={'warning'} />;
      },
    });
    expect(wrapper.find('.t-input').classes()).toContain('t-is-warning');
  });

  // test exposure function
  describe('function', () => {
    it('onBlur', async () => {
      const blurFn = vi.fn();
      const wrapper = mount({
        render() {
          return <DateRangePicker allowInput onBlur={blurFn} />;
        },
      });
      const InputDom = wrapper.find('input');
      InputDom.trigger('blur');
      expect(blurFn).toBeCalledTimes(1);
    });
  });
});
