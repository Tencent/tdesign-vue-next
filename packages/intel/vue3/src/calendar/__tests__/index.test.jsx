import { mount } from '@vue/test-utils';
import { expect, it, vi } from 'vitest';
import MockDate from 'mockdate';
import Calendar from 'tdesign-vue-next'

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');
// every component needs four parts: props/events/slots/functions.
describe('Calendar', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Calendar></Calendar>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });

    it(':cell', () => {
      const cellStr = 'cell';
      const renderCell = (h, params) => {
        return <div>{params.formattedDate}</div>;
      };
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar cell={cellStr}></Calendar>
              <Calendar cell={renderCell}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':controllerConfig', () => {
      const myControllerConfig = {
        visible: true,
        disabled: false, // 是否禁用（全部控件）
        // 年份选择框组件相关设置
        year: {
          visible: true, // 是否显示
          selectProps: {
            // 用于透传props给该select组件
            disabled: false,
            size: 'small',
          },
        },
        // 月份选择框组件相关设置
        month: {
          visible: true, // 是否显示（“year”模式下本身是不显示该组件的）
          selectProps: {
            // 用于透传props给该select组件
            disabled: false,
            size: 'small',
          },
        },
        // 模式切换单选组件设置
        mode: {
          visible: true, // 是否显示
          radioGroupProps: {
            disabled: false,
            size: 'small',
          },
        },
        // 隐藏\显示周末按钮组件相关设置
        weekend: {
          visible: true, // 是否显示
          showWeekendButtonProps: {
            // 用于透传props给显示周末按钮组件
            disabled: false,
            size: 'small',
          },
          hideWeekendButtonProps: {
            // 用于透传props给隐藏周末按钮组件
            disabled: false,
            variant: 'base',
            size: 'small',
          },
        },
        // “今天\本月”按钮组件相关设置
        current: {
          visible: true, // 是否显示
          currentDayButtonProps: {
            // 用于透传props给“今天”钮组件（“month”模式下有效）
            disabled: false,
            size: 'small',
            theme: 'warning',
          },
          currentMonthButtonProps: {
            // 用于透传props给“本月”按钮组件（“year”模式下有效）
            disabled: false,
            size: 'small',
            theme: 'success',
          },
        },
      };
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar controllerConfig={false}></Calendar>
              <Calendar controllerConfig={myControllerConfig}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':cellAppend', () => {
      const cellStr = 'append';
      const renderCellAppend = (h, params) => {
        return <div>{params.formattedDate}</div>;
      };
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar cellAppend={cellStr}></Calendar>
              <Calendar cellAppend={renderCellAppend}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':fillWithZero', () => {
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar fillWithZero={true}></Calendar>
              <Calendar fillWithZero={false}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':firstDayOfWeek', () => {
      const wrapper = mount({
        render() {
          return <Calendar firstDayOfWeek={3}></Calendar>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':format', () => {
      const wrapper = mount({
        render() {
          return <Calendar format={'YYYY/MM/DD'}></Calendar>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':head', () => {
      const headStr = 'head';
      const renderHead = (h, params) => {
        return <div>{params.formattedFilterDate}</div>;
      };
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar head={headStr}></Calendar>
              <Calendar head={renderHead}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':isShowWeekendDefault', () => {
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar isShowWeekendDefault={true}></Calendar>
              <Calendar isShowWeekendDefault={false}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':mode', () => {
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar mode={'month'}></Calendar>
              <Calendar mode={'year'}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':year:month', () => {
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar year={2000} month={11}></Calendar>
              <Calendar year={'2000'} month={'11'}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':preventCellContextmenu', () => {
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar preventCellContextmenu={true}></Calendar>
              <Calendar preventCellContextmenu={false}></Calendar>
            </>
          );
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
          return <Calendar range={testRange}></Calendar>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':theme', () => {
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar theme={'card'}></Calendar>
              <Calendar theme={'full'}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Calendar value={'2020-12-11'}></Calendar>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':multiple', () => {
      const wrapper = mount({
        render() {
          return <Calendar multiple={true} value={['2020-11-30', '2020-12-16', '2020-12-17', '2021-01-01']}></Calendar>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':week', () => {
      const weekArray = ['周一', '周二', '周三', '周四', '周五', '星期六', '星期天'];
      const renderWeek = (h, params) => {
        return <>{weekArray[params.day - 1]}</>;
      };
      const wrapper = mount({
        render() {
          return (
            <>
              <Calendar week={weekArray}></Calendar>
              <Calendar week={renderWeek}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('@cell-click', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Calendar onCellClick={fn}></Calendar>;
        },
      });
      wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)').trigger('click');
      expect(fn).toHaveBeenCalled();
    });
    it('@cell-double-click', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Calendar onCellDoubleClick={fn}></Calendar>;
        },
      });
      wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)').trigger('dblclick');
      expect(fn).toHaveBeenCalled();
    });
    it('@cell-right-click', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Calendar onCellRightClick={fn}></Calendar>;
        },
      });
      wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)').trigger('contextmenu');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('<slot>', () => {
    it('<cell>', () => {
      const wrapper = mount({
        render() {
          return (
            <Calendar
              v-slots={{
                cell: (params) => {
                  return <div>{params.formattedDate}</div>;
                },
              }}
            ></Calendar>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<cellAppend>', () => {
      const wrapper = mount({
        render() {
          return (
            <Calendar
              v-slots={{
                cellAppend: (params) => {
                  return <div>{params.formattedDate}</div>;
                },
              }}
            ></Calendar>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<head>', () => {
      const wrapper = mount({
        render() {
          return (
            <Calendar
              v-slots={{
                head: (params) => {
                  return <div>head:{params.formattedFilterDate}</div>;
                },
              }}
            ></Calendar>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<week>', () => {
      const weekArray = ['周一', '周二', '周三', '周四', '周五', '星期六', '星期天'];
      const wrapper = mount({
        render() {
          return (
            <Calendar
              v-slots={{
                week: (params) => {
                  return <div>{weekArray[params.day - 1]}</div>;
                },
              }}
            ></Calendar>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
