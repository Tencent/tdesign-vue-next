// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { getTimelineDefaultMount, getTimelineItemMount } from './mount';
import { Timeline, TimelineItem } from '@tdesign/components/timeline';
import Loading from '@tdesign/components/loading';
import props from '@tdesign/components/timeline/props';
import timelineItemProps from '@tdesign/components/timeline/timeline-item-props';

describe('Timeline', () => {
  describe('props', () => {
    it(':labelAlign[left/right/alternate]', () => {
      const labelAlignClassNameMap = {
        left: 't-timeline-left',
        alternate: 't-timeline-alternate',
        right: 't-timeline-right',
      };
      Object.entries(labelAlignClassNameMap).forEach(([enumValue, expectedClassName]) => {
        let propValue = { true: true, false: false }[enumValue];
        propValue = propValue === undefined ? enumValue : propValue;
        const wrapper = getTimelineDefaultMount({ labelAlign: propValue });
        expect(wrapper.classes(expectedClassName)).toBeTruthy();
      });
    });

    it(':labelAlign[top/bottom]', async () => {
      // horizontal labelAlign=top
      const wrapper1 = getTimelineDefaultMount({ layout: 'horizontal', labelAlign: 'top' });
      await wrapper1.vm.$nextTick();
      const domWrapper1 = wrapper1.find('.t-timeline');
      expect(domWrapper1.classes('t-timeline-top')).toBeTruthy();

      // horizontal labelAlign=bottom
      const wrapper2 = getTimelineDefaultMount({ layout: 'horizontal', labelAlign: 'bottom' });
      await wrapper2.vm.$nextTick();
      const domWrapper2 = wrapper2.find('.t-timeline');
      expect(domWrapper2.classes('t-timeline-bottom')).toBeTruthy();
    });

    it(':layout[horizontal/vertical]', () => {
      (['horizontal', 'vertical'] as const).forEach((layout) => {
        const wrapper = getTimelineDefaultMount({ layout });
        expect(wrapper.classes(`t-timeline-${layout}`)).toBeTruthy();
      });
    });

    it(':mode[alternate/same]', () => {
      (['alternate', 'same'] as const).forEach((mode) => {
        const wrapper = mount(<Timeline mode={mode}></Timeline>);
        expect(wrapper.classes(`t-timeline-label--${mode}`)).toBeTruthy();
      });
    });

    it(':reverse[true/false]', () => {
      // reverse = true
      const wrapper1 = getTimelineDefaultMount({ reverse: true });
      expect(wrapper1.find('.t-timeline-item__content').text()).toBe('Event4');
      expect(wrapper1.classes('t-timeline-reverse')).toBeTruthy();

      // reverse = false (default)
      const wrapper2 = getTimelineDefaultMount({ reverse: false });
      expect(wrapper2.find('.t-timeline-item__content').text()).toBe('Event1');
      expect(wrapper2.classes('t-timeline-reverse')).toBeFalsy();
    });

    it(':theme[default/dot]', () => {
      // theme = default
      const wrapper1 = getTimelineDefaultMount({ theme: 'default' });
      expect(wrapper1.findAll('.t-timeline-item__tail--theme-default').length).toBe(4);

      // theme = dot
      const wrapper2 = getTimelineDefaultMount({ theme: 'dot' });
      expect(wrapper2.findAll('.t-timeline-item__tail--theme-dot').length).toBe(4);
    });

    it(':labelAlign validator', () => {
      const { validator } = props.labelAlign;
      expect(validator('left')).toBeTruthy();
      expect(validator('right')).toBeTruthy();
      expect(validator('alternate')).toBeTruthy();
      expect(validator('top')).toBeTruthy();
      expect(validator('bottom')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();
      expect(validator('')).toBeTruthy();
    });

    it(':layout validator', () => {
      const { validator } = props.layout;
      expect(validator('horizontal')).toBeTruthy();
      expect(validator('vertical')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();
      expect(validator('')).toBeTruthy();
    });

    it(':mode validator', () => {
      const { validator } = props.mode;
      expect(validator('alternate')).toBeTruthy();
      expect(validator('same')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();
      expect(validator('')).toBeTruthy();
    });

    it(':theme validator', () => {
      const { validator } = props.theme;
      expect(validator('default')).toBeTruthy();
      expect(validator('dot')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();
      expect(validator('')).toBeTruthy();
    });

    it(':labelAlign with layout mismatch should show warning', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      // vertical layout with horizontal labelAlign (top/bottom)
      getTimelineDefaultMount({ layout: 'vertical', labelAlign: 'top' });
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockClear();

      getTimelineDefaultMount({ layout: 'vertical', labelAlign: 'bottom' });
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockClear();

      // horizontal layout with vertical labelAlign (left/right)
      getTimelineDefaultMount({ layout: 'horizontal', labelAlign: 'left' });
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockClear();

      getTimelineDefaultMount({ layout: 'horizontal', labelAlign: 'right' });
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('base', () => {
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

  describe('layout', () => {
    (['vertical', 'horizontal'] as const).forEach((layout) => {
      it(layout, () => {
        const wrapper = mount({
          render() {
            return (
              <Timeline layout={layout} labelAlign={layout === 'vertical' ? 'left' : 'top'}>
                <TimelineItem></TimelineItem>
              </Timeline>
            );
          },
        });
        expect(wrapper.find(`.t-timeline-${layout}`).exists()).toBeTruthy();
      });
    });
  });

  describe('labelAlign', () => {
    (['left', 'right', 'alternate', 'top', 'bottom'] as const).forEach((labelAlign) => {
      it(labelAlign, () => {
        const wrapper = mount({
          render() {
            return (
              <Timeline
                labelAlign={labelAlign}
                layout={['top', 'bottom'].includes(labelAlign) ? 'horizontal' : 'vertical'}
              >
                <TimelineItem></TimelineItem>
              </Timeline>
            );
          },
        });
        expect(wrapper.find(`.t-timeline-${labelAlign}`).exists()).toBeTruthy();
      });
    });
  });

  describe('mode', () => {
    (['alternate', 'same'] as const).forEach((mode) => {
      it(mode, () => {
        const wrapper = mount({
          render() {
            return (
              <Timeline mode={mode}>
                <TimelineItem></TimelineItem>
              </Timeline>
            );
          },
        });
        expect(wrapper.find(`.t-timeline-label--${mode}`).exists()).toBeTruthy();
      });
    });
  });

  describe('reverse', () => {
    it('reverse items order', () => {
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

  describe('theme', () => {
    (['default', 'dot'] as const).forEach((theme) => {
      it(theme, () => {
        const wrapper = mount({
          render() {
            return (
              <Timeline theme={theme}>
                <TimelineItem></TimelineItem>
              </Timeline>
            );
          },
        });
        expect(wrapper.find(`.t-timeline-item__tail--theme-${theme}`).exists()).toBeTruthy();
      });
    });
  });

  describe('loading', () => {
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

describe('TimelineItem', () => {
  describe('props', () => {
    it(':content[function]', () => {
      // function
      const wrapper = mount(<TimelineItem content={() => <span class="custom-node">TNode</span>}></TimelineItem>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':content[slot]', () => {
      const wrapper = mount(
        <TimelineItem v-slots={{ content: () => <span class="custom-node">TNode</span> }}></TimelineItem>,
      );
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':dot[function]', () => {
      const wrapper = mount(<TimelineItem dot={() => <span class="custom-node">TNode</span>}></TimelineItem>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':dot[slot]', () => {
      const wrapper = mount(
        <TimelineItem v-slots={{ dot: () => <span class="custom-node">TNode</span> }}></TimelineItem>,
      );
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':dotColor[primary/warning/error/default]', () => {
      const dotColorClassNameMap = {
        primary: 't-timeline-item__dot--primary',
        warning: 't-timeline-item__dot--warning',
        error: 't-timeline-item__dot--error',
        default: 't-timeline-item__dot--default',
      };
      Object.entries(dotColorClassNameMap).forEach(([enumValue, expectedClassName]) => {
        let propValue = { true: true, false: false }[enumValue];
        propValue = propValue === undefined ? enumValue : propValue;
        const wrapper = mount(<TimelineItem dotColor={propValue}></TimelineItem>).find('.t-timeline-item__dot');
        expect(wrapper.classes(expectedClassName)).toBeTruthy();
      });
    });

    it(':dotColor[custom color]', () => {
      const wrapper = mount(<TimelineItem dotColor={'yellowgreen'}></TimelineItem>);
      const domWrapper = wrapper.find('.t-timeline-item__dot');
      expect(domWrapper.element.style.borderColor).toBe('yellowgreen');
    });

    it(':label[function]', () => {
      const wrapper = mount(<TimelineItem label={() => <span class="custom-node">TNode</span>}></TimelineItem>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':label[slot]', () => {
      const wrapper = mount(
        <TimelineItem v-slots={{ label: () => <span class="custom-node">TNode</span> }}></TimelineItem>,
      );
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':labelAlign[left/right/top/bottom]', () => {
      // left
      const wrapper1 = getTimelineItemMount({ labelAlign: 'left' });
      expect(wrapper1.findAll('.t-timeline-item:first-child.t-timeline-item-left').length).toBe(1);

      // right
      const wrapper2 = getTimelineItemMount({ labelAlign: 'right' });
      expect(wrapper2.findAll('.t-timeline-item:first-child.t-timeline-item-right').length).toBe(1);

      // top (horizontal layout)
      const wrapper3 = mount(
        <Timeline layout="horizontal">
          <TimelineItem labelAlign="top" label="2022-01-01">
            Event1
          </TimelineItem>
        </Timeline>,
      );
      expect(wrapper3.find('.t-timeline-item-top').exists()).toBeTruthy();

      // bottom (horizontal layout)
      const wrapper4 = mount(
        <Timeline layout="horizontal">
          <TimelineItem labelAlign="bottom" label="2022-01-01">
            Event1
          </TimelineItem>
        </Timeline>,
      );
      expect(wrapper4.find('.t-timeline-item-bottom').exists()).toBeTruthy();
    });

    it(':labelAlign validator', () => {
      const { validator } = timelineItemProps.labelAlign;
      expect(validator('left')).toBeTruthy();
      expect(validator('right')).toBeTruthy();
      expect(validator('top')).toBeTruthy();
      expect(validator('bottom')).toBeTruthy();
      // @ts-expect-error
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();
      expect(validator('')).toBeTruthy();
    });

    it(':loading[true/false]', () => {
      // default
      const wrapper = mount(<TimelineItem></TimelineItem>);
      expect(wrapper.find('.t-timeline-item__dot .t-loading').exists()).toBeFalsy();

      // loading = false
      const wrapper1 = mount(<TimelineItem loading={false}></TimelineItem>);
      expect(wrapper1.find('.t-timeline-item__dot .t-loading').exists()).toBeFalsy();

      // loading = true
      const wrapper2 = mount(<TimelineItem loading={true}></TimelineItem>);
      expect(wrapper2.find('.t-timeline-item__dot .t-loading').exists()).toBeTruthy();
    });

    it(':dotColor[success]', () => {
      const wrapper = mount(<TimelineItem dotColor="success"></TimelineItem>);
      const domWrapper = wrapper.find('.t-timeline-item__dot');
      expect(domWrapper.classes('t-timeline-item__dot--success')).toBeTruthy();
    });

    it(':mode[same] with label', () => {
      const wrapper = mount(
        <Timeline mode="same">
          <TimelineItem label="2022-01-01">Event1</TimelineItem>
        </Timeline>,
      );
      expect(wrapper.find('.t-timeline-item__label').exists()).toBeTruthy();
      expect(wrapper.find('.t-timeline-item__label--same').exists()).toBeTruthy();
      expect(wrapper.text()).toContain('2022-01-01');
    });

    it(':mode[same] without label', () => {
      const wrapper = mount(
        <Timeline mode="same">
          <TimelineItem>Event1</TimelineItem>
        </Timeline>,
      );
      // label should not exist when no label prop
      expect(wrapper.find('.t-timeline-item__label').exists()).toBeFalsy();
    });

    it(':mode[alternate] with label', () => {
      const wrapper = mount(
        <Timeline mode="alternate">
          <TimelineItem label="2022-01-01">Event1</TimelineItem>
        </Timeline>,
      );
      expect(wrapper.find('.t-timeline-item__label').exists()).toBeTruthy();
      expect(wrapper.find('.t-timeline-item__label--alternate').exists()).toBeTruthy();
    });

    it(':mode[alternate] without label', () => {
      const wrapper = mount(
        <Timeline mode="alternate">
          <TimelineItem>Event1</TimelineItem>
        </Timeline>,
      );
      // label should not exist when no label prop
      expect(wrapper.find('.t-timeline-item__label').exists()).toBeFalsy();
    });

    it(':itemsStatus with reverse', () => {
      const wrapper = mount(
        <Timeline reverse={true}>
          <TimelineItem>Event1</TimelineItem>
          <TimelineItem>Event2</TimelineItem>
        </Timeline>,
      );
      const items = wrapper.findAll('.t-timeline-item__tail');
      // itemsStatus[index] should be applied when reverse is true
      expect(items.length).toBe(2);
      // Check that itemsStatus class is applied
      expect(items[0].classes()).toContain('t-timeline-item__tail--status-');
    });

    it(':getPositionClassName returns empty string for invalid align', () => {
      // This tests the fallback case when align doesn't match any condition
      const wrapper = mount(
        <Timeline>
          <TimelineItem labelAlign={'invalid' as any}>Event</TimelineItem>
        </Timeline>,
      );
      // The component should still render without crashing
      expect(wrapper.find('.t-timeline-item').exists()).toBeTruthy();
    });

    it(':last item class', () => {
      const wrapper = mount(
        <Timeline>
          <TimelineItem>Event1</TimelineItem>
          <TimelineItem>Event2</TimelineItem>
          <TimelineItem>Event3</TimelineItem>
        </Timeline>,
      );
      const items = wrapper.findAllComponents(TimelineItem);
      // Last item should have the last class
      expect(items[items.length - 1].classes('t-timeline-item--last')).toBeTruthy();
      // Other items should not have the last class
      expect(items[0].classes('t-timeline-item--last')).toBeFalsy();
      expect(items[1].classes('t-timeline-item--last')).toBeFalsy();
    });

    it(':onClick event', () => {
      const onClickFn = vi.fn();
      const wrapper = mount(<TimelineItem onClick={onClickFn} content="Test Content"></TimelineItem>);
      const timelineItem = wrapper.find('.t-timeline-item');
      timelineItem.trigger('click');
      expect(onClickFn).toHaveBeenCalledTimes(1);
      expect(onClickFn.mock.calls[0][0]).toHaveProperty('e');
      expect(onClickFn.mock.calls[0][0]).toHaveProperty('item');
      expect(onClickFn.mock.calls[0][0].item).not.toHaveProperty('index');
    });

    it(':dot element adds dot-content class when dot has existing class', () => {
      const wrapper = mount(<TimelineItem dot={() => <span class="my-custom-class">Custom Dot</span>}></TimelineItem>);
      const customNode = wrapper.find('.my-custom-class');
      expect(customNode.exists()).toBeTruthy();
      expect(customNode.classes()).toContain('t-timeline-item__dot-content');
      expect(customNode.classes()).toContain('my-custom-class');
    });
  });
});
