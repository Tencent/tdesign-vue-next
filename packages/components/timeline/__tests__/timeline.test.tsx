import { mount } from '@vue/test-utils';
import { getTimelineDefaultMount, getTimelineItemMount } from './mount';
import { Timeline, TimelineItem } from '@tdesign/components/timeline';
import Loading from '@tdesign/components/loading';

describe('Timeline Component', () => {
  const labelAlignClassNameMap = {
    left: 't-timeline-left',
    alternate: 't-timeline-alternate',
    right: 't-timeline-right',
  };
  Object.entries(labelAlignClassNameMap).forEach(([enumValue, expectedClassName]) => {
    it(`props.labelAlign is equal to ${enumValue}`, () => {
      let propValue = { true: true, false: false }[enumValue];
      propValue = propValue === undefined ? enumValue : propValue;
      const wrapper = getTimelineDefaultMount({ labelAlign: propValue });
      expect(wrapper.classes(expectedClassName)).toBeTruthy();
    });
  });

  it('props.labelAlign: layout=horizontal labelAlign=top works fine', async () => {
    const wrapper = getTimelineDefaultMount({ layout: 'horizontal', labelAlign: 'top' });
    await wrapper.vm.$nextTick();
    const domWrapper = wrapper.find('.t-timeline');
    expect(domWrapper.classes('t-timeline-top')).toBeTruthy();
  });

  it('props.labelAlign: layout=horizontal labelAlign=bottom works fine', async () => {
    const wrapper = getTimelineDefaultMount({ layout: 'horizontal', labelAlign: 'bottom' });
    await wrapper.vm.$nextTick();
    const domWrapper = wrapper.find('.t-timeline');
    expect(domWrapper.classes('t-timeline-bottom')).toBeTruthy();
  });

  ['horizontal', 'vertical'].forEach((item) => {
    it(`props.layout is equal to ${item}`, () => {
      const wrapper = getTimelineDefaultMount({ layout: item });
      expect(wrapper.classes(`t-timeline-${item}`)).toBeTruthy();
    });
  });

  ['alternate', 'same'].forEach((item) => {
    it(`props.mode is equal to ${item}`, () => {
      const wrapper = mount(<Timeline mode={item}></Timeline>);
      expect(wrapper.classes(`t-timeline-label--${item}`)).toBeTruthy();
    });
  });

  it('props.reverse works fine. `{".t-timeline-item__content":{"text":"Event4"}}` should exist', () => {
    const wrapper = getTimelineDefaultMount({ reverse: true });
    expect(wrapper.find('.t-timeline-item__content').text()).toBe('Event4');
  });

  it('props.theme is equal dot', () => {
    const wrapper = getTimelineDefaultMount({ theme: 'dot' });
    expect(wrapper.findAll('.t-timeline-item__tail--theme-dot').length).toBe(4);
  });
});

describe('TimelineItem Component', () => {
  it('props.content works fine', () => {
    const wrapper = mount(<TimelineItem content={() => <span class="custom-node">TNode</span>}></TimelineItem>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.content works fine', () => {
    const wrapper = mount(
      <TimelineItem v-slots={{ content: () => <span class="custom-node">TNode</span> }}></TimelineItem>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.dot works fine', () => {
    const wrapper = mount(<TimelineItem dot={() => <span class="custom-node">TNode</span>}></TimelineItem>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.dot works fine', () => {
    const wrapper = mount(
      <TimelineItem v-slots={{ dot: () => <span class="custom-node">TNode</span> }}></TimelineItem>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  const dotColorClassNameMap = {
    primary: 't-timeline-item__dot--primary',
    warning: 't-timeline-item__dot--warning',
    error: 't-timeline-item__dot--error',
    default: 't-timeline-item__dot--default',
  };
  Object.entries(dotColorClassNameMap).forEach(([enumValue, expectedClassName]) => {
    it(`props.dotColor is equal to ${enumValue}`, () => {
      let propValue = { true: true, false: false }[enumValue];
      propValue = propValue === undefined ? enumValue : propValue;
      const wrapper = mount(<TimelineItem dotColor={propValue}></TimelineItem>).find('.t-timeline-item__dot');
      expect(wrapper.classes(expectedClassName)).toBeTruthy();
    });
  });

  it(`props.dotColor is equal to yellowgreen`, () => {
    const wrapper = mount(<TimelineItem dotColor={'yellowgreen'}></TimelineItem>);
    const domWrapper = wrapper.find('.t-timeline-item__dot');
    expect(domWrapper.element.style.borderColor).toBe('yellowgreen');
  });

  it('props.label works fine', () => {
    const wrapper = mount(<TimelineItem label={() => <span class="custom-node">TNode</span>}></TimelineItem>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.label works fine', () => {
    const wrapper = mount(
      <TimelineItem v-slots={{ label: () => <span class="custom-node">TNode</span> }}></TimelineItem>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.labelAlign is equal left', () => {
    const wrapper = getTimelineItemMount({ labelAlign: 'left' });
    expect(wrapper.findAll('.t-timeline-item:first-child.t-timeline-item-left').length).toBe(1);
  });

  it('props.loading: TimelineItem contains element `.t-timeline-item__dot .t-loading`', () => {
    // loading default value is
    const wrapper = mount(<TimelineItem></TimelineItem>);
    expect(wrapper.find('.t-timeline-item__dot .t-loading').exists()).toBeFalsy();
    // loading = false
    const wrapper1 = mount(<TimelineItem loading={false}></TimelineItem>);
    expect(wrapper1.find('.t-timeline-item__dot .t-loading').exists()).toBeFalsy();
    // loading = true
    const wrapper2 = mount(<TimelineItem loading={true}></TimelineItem>);
    expect(wrapper2.find('.t-timeline-item__dot .t-loading').exists()).toBeTruthy();
  });
});

describe('TimeLine', () => {
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
    ['vertical', 'horizontal'].map((item) =>
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
    ['left', 'right', 'alternate', 'top', 'bottom'].map((item) =>
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
    ['alternate', 'same'].map((item) =>
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
    ['default', 'dot'].map((item) =>
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
