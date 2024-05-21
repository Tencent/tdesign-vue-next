import { mount } from '@vue/test-utils';
import { TimePicker } from 'tdesign-vue-next'

describe('TimePicker', () => {
  describe(':props', () => {
    it('popupProps works fine', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          popupProps: {
            visible: false,
          },
        },
      });
      await wrapper.setProps({
        popupProps: {
          visible: true,
        },
      });
      const panelNode = document.querySelector('.t-time-picker__panel');
      expect(panelNode).toBeTruthy();
      panelNode.parentNode.removeChild(panelNode);
    });
    it('allowInput works fine', async () => {
      const wrapper = mount({
        render() {
          return <TimePicker></TimePicker>;
        },
      });

      const allowInputWrapper = mount({
        render() {
          return <TimePicker allowInput={true}></TimePicker>;
        },
      });

      expect(wrapper.find('input').attributes('readonly')).toBe('');
      expect(allowInputWrapper.find('input').attributes('readonly')).toBe(undefined);
    });

    it('placeholder works fine', async () => {
      const placeholder = '请选择具体时间';
      const wrapper = mount({
        render() {
          return <TimePicker placeholder={placeholder}></TimePicker>;
        },
      });

      expect(wrapper.find('.t-input__inner').attributes('placeholder')).toBe(placeholder);
    });

    it('label works fine', async () => {
      const label = '左侧文本';
      const wrapper = mount({
        render() {
          return <TimePicker label={label}></TimePicker>;
        },
      });

      expect(wrapper.find('.t-input__prefix').text()).toBe(label);
    });

    it('disabled works fine', async () => {
      const wrapper = mount({
        render() {
          return <TimePicker disabled={true}></TimePicker>;
        },
      });

      expect(wrapper.find('.t-is-disabled').exists()).toBeTruthy();
    });

    it('format works fine', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          popupProps: {
            visible: false,
          },
          format: 'HH:mm',
        },
      });
      await wrapper.setProps({
        popupProps: {
          visible: true,
        },
      });
      const panelNode = document.querySelector('.t-time-picker__panel');
      // format为HH:mm 只展示两列 即时分
      expect(panelNode.querySelectorAll('.t-time-picker__panel-body-scroll').length).toBe(2);
      panelNode.parentNode.removeChild(panelNode);
    });

    it('steps works fine', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          popupProps: {
            visible: false,
          },
          steps: [1, 2, 3],
        },
      });
      await wrapper.setProps({
        popupProps: {
          visible: true,
        },
      });
      const panelNode = document.querySelector('.t-time-picker__panel');

      const timeCols = panelNode.querySelectorAll('.t-time-picker__panel-body-scroll');
      const hourCells = timeCols[0].querySelectorAll('.t-time-picker__panel-body-scroll-item');
      const minuteCells = timeCols[1].querySelectorAll('.t-time-picker__panel-body-scroll-item');
      const secondCells = timeCols[2].querySelectorAll('.t-time-picker__panel-body-scroll-item');

      expect(hourCells[0].innerHTML).toBe('00');
      expect(hourCells[1].innerHTML).toBe('01');
      expect(minuteCells[0].innerHTML).toBe('00');
      expect(minuteCells[1].innerHTML).toBe('02');
      expect(secondCells[0].innerHTML).toBe('00');
      expect(secondCells[1].innerHTML).toBe('03');
      panelNode.parentNode.removeChild(panelNode);
    });

    it('disableTime works fine', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          popupProps: {
            visible: false,
          },
          disableTime: () => {
            return {
              hour: [1, 2, 3],
              minute: [1, 2, 3, 4, 5],
            };
          },
        },
      });
      await wrapper.setProps({
        popupProps: {
          visible: true,
        },
      });
      const panelNode = document.querySelector('.t-time-picker__panel');

      const timeCols = panelNode.querySelectorAll('.t-time-picker__panel-body-scroll');
      const hourCells = timeCols[0].querySelectorAll('.t-time-picker__panel-body-scroll-item');

      const minuteCells = timeCols[1].querySelectorAll('.t-time-picker__panel-body-scroll-item');
      expect(hourCells[0].innerHTML).toBe('00');
      expect(hourCells[1].innerHTML).toBe('04');

      expect(minuteCells[0].innerHTML).toBe('00');
      expect(minuteCells[1].innerHTML).toBe('06');
      panelNode.parentNode.removeChild(panelNode);
    });

    it('hideDisabledTime works fine', async () => {
      const wrapper = mount(TimePicker, {
        props: {
          popupProps: {
            visible: false,
          },
          hideDisabledTime: false,
          disableTime: () => {
            return {
              hour: [1, 2, 3],
              minute: [1, 2, 3, 4, 5],
            };
          },
        },
      });
      await wrapper.setProps({
        popupProps: {
          visible: true,
        },
      });
      const panelNode = document.querySelector('.t-time-picker__panel');

      const timeCols = panelNode.querySelectorAll('.t-time-picker__panel-body-scroll');
      const hourCells = timeCols[0].querySelectorAll('.t-time-picker__panel-body-scroll-item');

      const minuteCells = timeCols[1].querySelectorAll('.t-time-picker__panel-body-scroll-item');
      expect(hourCells[0].innerHTML).toBe('00');
      expect(hourCells[1].innerHTML).toBe('01');

      expect(minuteCells[0].innerHTML).toBe('00');
      expect(minuteCells[1].innerHTML).toBe('01');
      panelNode.parentNode.removeChild(panelNode);
    });
  });
});
