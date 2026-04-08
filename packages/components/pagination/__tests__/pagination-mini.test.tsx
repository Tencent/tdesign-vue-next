import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { PaginationMini } from '@tdesign/components/pagination';
import paginationMiniProps from '@tdesign/components/pagination/pagination-mini-props';

describe('PaginationMini', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('props', () => {
    it(':layout[horizontal/vertical]', () => {
      const validator = paginationMiniProps.layout.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('horizontal')).toBe(true);
      expect(validator('vertical')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // 默认 horizontal，渲染左右箭头
      const wrapper1 = mount(<PaginationMini />);
      expect(wrapper1.find('.t-pagination-mini').exists()).toBe(true);
      expect(wrapper1.find('.t-pagination-mini__prev').exists()).toBe(true);
      expect(wrapper1.find('.t-pagination-mini__next').exists()).toBe(true);
      wrapper1.unmount();

      // vertical 渲染上下箭头
      const wrapper2 = mount(<PaginationMini layout="vertical" />);
      expect(wrapper2.find('.t-pagination-mini').exists()).toBe(true);
      wrapper2.unmount();
    });

    it(':size[small/medium/large]', () => {
      const validator = paginationMiniProps.size.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('small')).toBe(true);
      expect(validator('medium')).toBe(true);
      expect(validator('large')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      const wrapper = mount(<PaginationMini size="small" />);
      expect(wrapper.find('.t-pagination-mini').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':variant[text/outline]', () => {
      const validator = paginationMiniProps.variant.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('text')).toBe(true);
      expect(validator('outline')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // 默认 text，无 outline class
      const wrapper1 = mount(<PaginationMini />);
      expect(wrapper1.find('.t-pagination-mini--outline').exists()).toBe(false);
      wrapper1.unmount();

      // outline 有 outline class
      const wrapper2 = mount(<PaginationMini variant="outline" />);
      expect(wrapper2.find('.t-pagination-mini--outline').exists()).toBe(true);
      wrapper2.unmount();
    });

    it(':showCurrent[boolean]', () => {
      // 默认显示 current 按钮
      const wrapper1 = mount(<PaginationMini />);
      expect(wrapper1.find('.t-pagination-mini__current').exists()).toBe(true);
      wrapper1.unmount();

      // 不显示 current 按钮
      const wrapper2 = mount(<PaginationMini showCurrent={false} />);
      expect(wrapper2.find('.t-pagination-mini__current').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':disabled[boolean]', () => {
      const wrapper = mount(<PaginationMini disabled />);
      const prevBtn = wrapper.find('.t-pagination-mini__prev');
      const currentBtn = wrapper.find('.t-pagination-mini__current');
      const nextBtn = wrapper.find('.t-pagination-mini__next');
      expect(prevBtn.classes()).toContain('t-is-disabled');
      expect(currentBtn.classes()).toContain('t-is-disabled');
      expect(nextBtn.classes()).toContain('t-is-disabled');
      wrapper.unmount();
    });

    it(':disabled[object]', () => {
      // 仅禁用 prev
      const wrapper1 = mount(<PaginationMini disabled={{ prev: true, current: false, next: false }} />);
      expect(wrapper1.find('.t-pagination-mini__prev').classes()).toContain('t-is-disabled');
      expect(wrapper1.find('.t-pagination-mini__current').classes()).not.toContain('t-is-disabled');
      expect(wrapper1.find('.t-pagination-mini__next').classes()).not.toContain('t-is-disabled');
      wrapper1.unmount();

      // 仅禁用 next
      const wrapper2 = mount(<PaginationMini disabled={{ prev: false, current: false, next: true }} />);
      expect(wrapper2.find('.t-pagination-mini__prev').classes()).not.toContain('t-is-disabled');
      expect(wrapper2.find('.t-pagination-mini__next').classes()).toContain('t-is-disabled');
      wrapper2.unmount();
    });

    it(':tips[object]', () => {
      // 对象格式自定义提示文案
      const wrapper = mount(<PaginationMini tips={{ prev: '前一条', current: '当前', next: '后一条' }} />);
      expect(wrapper.find('.t-pagination-mini').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('onChange prev', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<PaginationMini onChange={onChangeFn} />);
      await wrapper.find('.t-pagination-mini__prev').trigger('click');
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toEqual(expect.objectContaining({ trigger: 'prev' }));
      wrapper.unmount();
    });

    it('onChange current', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<PaginationMini onChange={onChangeFn} />);
      await wrapper.find('.t-pagination-mini__current').trigger('click');
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toEqual(expect.objectContaining({ trigger: 'current' }));
      wrapper.unmount();
    });

    it('onChange next', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<PaginationMini onChange={onChangeFn} />);
      await wrapper.find('.t-pagination-mini__next').trigger('click');
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toEqual(expect.objectContaining({ trigger: 'next' }));
      wrapper.unmount();
    });
  });

  describe('rendering', () => {
    it('renders 3 buttons by default', () => {
      const wrapper = mount(<PaginationMini />);
      const buttons = wrapper.findAll('.t-button');
      // prev + current + next = 3
      expect(buttons.length).toBe(3);
      wrapper.unmount();
    });

    it('renders 2 buttons when showCurrent=false', () => {
      const wrapper = mount(<PaginationMini showCurrent={false} />);
      const buttons = wrapper.findAll('.t-button');
      // prev + next = 2
      expect(buttons.length).toBe(2);
      wrapper.unmount();
    });
  });
});
