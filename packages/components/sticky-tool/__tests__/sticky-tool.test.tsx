import { Fragment, nextTick } from 'vue';
import type { VNode } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Popup from '@tdesign/components/popup';
import { StickyItem, StickyTool } from '@tdesign/components/sticky-tool';
import stickyToolProps from '@tdesign/components/sticky-tool/props';

const DEFAULT_ITEM = { label: 'Feedback', popup: 'Tell us what you think' };

const getVNodeText = (node: VNode) => {
  if (typeof node.children === 'string') return node.children;
  if (!Array.isArray(node.children)) return '';
  return node.children.map((child) => (typeof child === 'string' ? child : (child as VNode).children)).join('');
};

describe('StickyTool', () => {
  const wrappers: VueWrapper[] = [];

  const mountStickyTool = (options: Parameters<typeof mount>[1] = {}) => {
    const wrapper = mount(StickyTool, options);
    wrappers.push(wrapper);
    return wrapper;
  };

  afterEach(() => {
    wrappers.forEach((wrapper) => wrapper.unmount());
    wrappers.length = 0;
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':list[array]', () => {
      const emptyWrapper = mountStickyTool();
      expect(emptyWrapper.findAll('.t-sticky-item')).toHaveLength(0);

      const wrapper = mountStickyTool({
        props: {
          list: [DEFAULT_ITEM, { label: 'Help', trigger: 'click' }],
        },
      });

      expect(wrapper.findAll('.t-sticky-item')).toHaveLength(2);
      expect(wrapper.findAll('.t-sticky-item__label').map((item) => item.text())).toEqual(['Feedback', 'Help']);
      expect(wrapper.findAllComponents(StickyItem)[1].props('trigger')).toBe('click');
    });

    it(':list[array] takes precedence over the default slot', () => {
      const wrapper = mountStickyTool({
        props: { list: [DEFAULT_ITEM] },
        slots: {
          default: () => <StickyItem label="Slot item" />,
        },
      });

      expect(wrapper.findAll('.t-sticky-item')).toHaveLength(1);
      expect(wrapper.find('.t-sticky-item__label').text()).toBe('Feedback');
    });

    it(':list[array] derives props and named slots from StickyItem children', () => {
      const wrapper = mountStickyTool({
        slots: {
          default: () => (
            <Fragment>
              <div class="ignored-child">ignored</div>
              <StickyItem
                label="Slot item"
                v-slots={{
                  icon: () => <span class="slot-icon">icon</span>,
                  popup: () => <span class="slot-popup">popup</span>,
                }}
              />
            </Fragment>
          ),
        },
      });

      expect(wrapper.findAll('.t-sticky-item')).toHaveLength(1);
      expect(wrapper.find('.slot-icon').text()).toBe('icon');
      expect(wrapper.find('.t-sticky-item__label').text()).toBe('Slot item');
      const content = wrapper.findComponent(Popup).props('content') as () => unknown;
      const popupContent = content() as VNode | VNode[];
      const popupNode = Array.isArray(popupContent) ? popupContent[0] : popupContent;
      expect(popupNode.props?.class).toBe('slot-popup');
      expect(getVNodeText(popupNode)).toBe('popup');
    });

    it(':offset[array<number>]', () => {
      const defaultWrapper = mountStickyTool();
      expect(defaultWrapper.find('.t-sticky-tool').attributes('style')).toContain('right: 80px');
      expect(defaultWrapper.find('.t-sticky-tool').attributes('style')).toContain('bottom: 24px');

      const wrapper = mountStickyTool({ props: { offset: [-10, 20] } });
      expect(wrapper.find('.t-sticky-tool').attributes('style')).toContain('right: 70px');
      expect(wrapper.find('.t-sticky-tool').attributes('style')).toContain('bottom: 44px');
    });

    it(':offset[array<string>]', () => {
      const wrapper = mountStickyTool({ props: { offset: ['10em', '8rem'] } });
      const style = wrapper.find('.t-sticky-tool').attributes('style');

      expect(style).toContain('right: calc( 80px + 10em)');
      expect(style).toContain('bottom: calc( 24px + 8rem)');
    });

    it(':offset[array<string>] preserves numeric-string concatenation [current behavior]', () => {
      const wrapper = mountStickyTool({ props: { offset: ['10', '8'] } });
      const style = wrapper.find('.t-sticky-tool').attributes('style');

      // Numeric strings currently concatenate with the defaults instead of being added numerically.
      expect(style).toContain('right: 8010px');
      expect(style).toContain('bottom: 248px');
    });

    it.each([
      ['right-top', ['right: 80px', 'top: 24px']],
      ['right-center', ['right: 80px', 'top: 50%', 'transform: translate(0, -50%)']],
      ['right-bottom', ['right: 80px', 'bottom: 24px']],
      ['left-top', ['left: 80px', 'top: 24px']],
      ['left-center', ['left: 80px', 'top: 50%', 'transform: translate(0, -50%)']],
      ['left-bottom', ['left: 80px', 'bottom: 24px']],
    ] as const)(':placement[string] %s', (placement, expectedStyles) => {
      const wrapper = mountStickyTool({ props: { placement, list: [DEFAULT_ITEM] } });
      const style = wrapper.find('.t-sticky-tool').attributes('style');

      expectedStyles.forEach((expectedStyle) => expect(style).toContain(expectedStyle));
      expect(wrapper.findComponent(StickyItem).props('placement')).toBe(placement);
    });

    it(':placement[string] validates supported values', () => {
      const validator = stickyToolProps.placement.validator;

      expect(validator(undefined as never)).toBe(true);
      expect(validator(null as never)).toBe(true);
      expect(validator('left-center')).toBe(true);
      expect(validator('center' as never)).toBe(false);
    });

    it(':popupProps[object]', () => {
      const wrapper = mountStickyTool({
        props: {
          list: [
            DEFAULT_ITEM,
            {
              label: 'Item override',
              popupProps: { showArrow: false, overlayInnerClassName: 'item-popup' },
            },
          ],
          popupProps: { disabled: true, showArrow: true, overlayInnerClassName: 'tool-popup' },
        },
      });
      const popups = wrapper.findAllComponents(Popup);

      expect(popups[0].props('disabled')).toBe(true);
      expect(popups[0].props('showArrow')).toBe(true);
      expect(popups[0].props('overlayInnerClassName')).toBe('tool-popup');
      expect(popups[1].props('disabled')).toBe(true);
      expect(popups[1].props('showArrow')).toBe(false);
      expect(popups[1].props('overlayInnerClassName')).toBe('item-popup');
    });

    it(':shape[string]', async () => {
      const wrapper = mountStickyTool({ props: { list: [DEFAULT_ITEM] } });
      const validator = stickyToolProps.shape.validator;

      expect(validator(undefined as never)).toBe(true);
      expect(validator(null as never)).toBe(true);
      expect(validator('square')).toBe(true);
      expect(validator('pill' as never)).toBe(false);
      expect(wrapper.find('.t-sticky-tool').classes()).toContain('t-sticky-tool--square');
      expect(wrapper.find('.t-sticky-item').classes()).toContain('t-sticky-item--square');

      await wrapper.setProps({ shape: 'round' });
      expect(wrapper.find('.t-sticky-tool').classes()).toContain('t-sticky-tool--round');
      expect(wrapper.find('.t-sticky-item').classes()).toContain('t-sticky-item--round');
    });

    it(':type[string]', async () => {
      const wrapper = mountStickyTool({ props: { list: [DEFAULT_ITEM] } });
      const validator = stickyToolProps.type.validator;

      expect(validator(undefined as never)).toBe(true);
      expect(validator(null as never)).toBe(true);
      expect(validator('normal')).toBe(true);
      expect(validator('mini' as never)).toBe(false);
      expect(wrapper.find('.t-sticky-item').classes()).toContain('t-sticky-item--normal');
      expect(wrapper.find('.t-sticky-item__label').exists()).toBe(true);

      await wrapper.setProps({ type: 'compact' });
      expect(wrapper.find('.t-sticky-item').classes()).toContain('t-sticky-item--compact');
      expect(wrapper.find('.t-sticky-item__label').exists()).toBe(false);
    });

    it(':width[number]', () => {
      const wrapper = mountStickyTool({ props: { list: [DEFAULT_ITEM], width: 120 } });

      expect((wrapper.find('.t-sticky-tool').element as HTMLElement).style.width).toBe('120px');
      expect(wrapper.findComponent(StickyItem).props('baseWidth')).toBe('120px');
    });

    it(':width[string]', () => {
      const wrapper = mountStickyTool({ props: { list: [DEFAULT_ITEM], width: '10rem', type: 'compact' } });

      expect((wrapper.find('.t-sticky-tool').element as HTMLElement).style.width).toBe('10rem');
      expect(wrapper.findComponent(StickyItem).props('baseWidth')).toBe('10rem');
    });

    it(':width[number] ignores zero [current behavior]', () => {
      const wrapper = mountStickyTool({ props: { list: [DEFAULT_ITEM], width: 0 } });

      // The implementation uses a truthiness check, so zero is currently not forwarded to the DOM or child item.
      expect((wrapper.find('.t-sticky-tool').element as HTMLElement).style.width).toBe('');
      expect(wrapper.find('.t-sticky-item').attributes('style')).toBeUndefined();
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mountStickyTool({ props: { list: [DEFAULT_ITEM], onClick } });

      await wrapper.find('.t-sticky-item').trigger('click');

      expect(onClick).toHaveBeenCalledTimes(1);
      const context = onClick.mock.calls[0][0];
      expect(context.e).toBeInstanceOf(MouseEvent);
      expect(context.item).toMatchObject({ label: 'Feedback', popup: 'Tell us what you think', trigger: 'hover' });
    });

    it('hover', async () => {
      const onHover = vi.fn();
      const wrapper = mountStickyTool({ props: { list: [DEFAULT_ITEM], onHover } });

      await wrapper.find('.t-sticky-item').trigger('mouseenter');

      expect(onHover).toHaveBeenCalledTimes(1);
      const context = onHover.mock.calls[0][0];
      expect(context.e).toBeInstanceOf(MouseEvent);
      expect(context.item).toMatchObject({ label: 'Feedback', popup: 'Tell us what you think', trigger: 'hover' });
    });
  });

  describe('lifecycle', () => {
    it('reacts to list replacement and removes rendered content on unmount', async () => {
      const wrapper = mountStickyTool({ props: { list: [DEFAULT_ITEM] }, attachTo: document.body });
      expect(document.querySelectorAll('.t-sticky-item')).toHaveLength(1);

      await wrapper.setProps({ list: [{ label: 'One' }, { label: 'Two' }] });
      await nextTick();
      expect(wrapper.findAll('.t-sticky-item__label').map((item) => item.text())).toEqual(['One', 'Two']);

      wrapper.unmount();
      expect(document.querySelector('.t-sticky-tool')).toBeNull();
    });
  });
});
