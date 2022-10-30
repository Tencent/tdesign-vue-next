import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';
import Calendar from '@/src/calendar/index.ts';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');
// every component needs four parts: props/events/slots/functions.
describe('Calendar', () => {
  // test props api (按照 api 列表顺序)
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
              <Calendar theme={'full	'}></Calendar>
            </>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Calendar value={'1998-11-11'}></Calendar>;
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
