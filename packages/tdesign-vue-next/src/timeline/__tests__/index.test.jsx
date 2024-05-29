import { mount } from '@vue/test-utils';
import Loading, { Timeline, TimelineItem } from 'tdesign-vue-next';

describe('timeLine', () => {
  describe(':base', () => {
    it('render', () => {
      const wrapper = mount({
        render() {
          return (
            <Timeline>
              <TimelineItem></TimelineItem>
              <TimelineItem></TimelineItem>
              <TimelineItem></TimelineItem>
              <TimelineItem></TimelineItem>
            </Timeline>
          );
        },
      });
      expect(wrapper.find('.t-timeline').exists()).toBeTruthy();
      const TimelineItemList = wrapper.findAllComponents(TimelineItem);
      expect(TimelineItemList.length).toBe(4);
    });
  });

  describe(':layout', () => {
    ['vertical', 'horizontal'].map(item =>
      it(item, () => {
        const wrapper = mount({
          render() {
            return (
              <Timeline layout={item} labelAlign={item === 'vertical' ? 'left' : 'top'}>
                <TimelineItem></TimelineItem>
              </Timeline>
            );
          },
        });
        expect(wrapper.find(`.t-timeline-${item}`).exists()).toBeTruthy();
      }),
    );
  });

  describe(':labelAlign', () => {
    ['left', 'right', 'alternate', 'top', 'bottom'].map(item =>
      it(item, () => {
        const wrapper = mount({
          render() {
            return (
              <Timeline labelAlign={item} layout={['top', 'bottom'].includes(item) ? 'horizontal' : 'vertical'}>
                <TimelineItem></TimelineItem>
              </Timeline>
            );
          },
        });
        expect(wrapper.find(`.t-timeline-${item}`).exists()).toBeTruthy();
      }),
    );
  });

  describe(':mode', () => {
    ['alternate', 'same'].map(item =>
      it(item, () => {
        const wrapper = mount({
          render() {
            return (
              <Timeline mode={item}>
                <TimelineItem></TimelineItem>
              </Timeline>
            );
          },
        });
        expect(wrapper.find(`.t-timeline-label--${item}`).exists()).toBeTruthy();
      }),
    );
  });

  describe(':reverse', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return (
            <Timeline reverse={true}>
              <TimelineItem>1</TimelineItem>
              <TimelineItem>2</TimelineItem>
              <TimelineItem>3</TimelineItem>
              <TimelineItem>4</TimelineItem>
            </Timeline>
          );
        },
      });
      const TimelineItemList = wrapper.findAllComponents(TimelineItem);
      const resContentList = TimelineItemList.map((item) => {
        return item.find('.t-timeline-item__content').text();
      });
      expect(resContentList).toStrictEqual(['4', '3', '2', '1']);
    });
  });

  describe(':theme', () => {
    ['default', 'dot'].map(item =>
      it(item, () => {
        const wrapper = mount({
          render() {
            return (
              <Timeline theme={item}>
                <TimelineItem></TimelineItem>
              </Timeline>
            );
          },
        });
        expect(wrapper.find(`.t-timeline-item__tail--theme-${item}`).exists()).toBeTruthy();
      }),
    );
  });

  describe(':loading', () => {
    it('loading', () => {
      const wrapper = mount({
        render() {
          return (
            <Timeline>
              <TimelineItem loading={true}></TimelineItem>
            </Timeline>
          );
        },
      });
      expect(wrapper.findComponent(Loading).exists()).toBeTruthy();
    });
  });
});
