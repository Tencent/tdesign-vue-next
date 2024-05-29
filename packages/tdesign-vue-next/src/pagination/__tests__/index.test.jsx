import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Pagination } from 'tdesign-vue-next';
import { Select } from 'tdesign-vue-next'
import { Input } from 'tdesign-vue-next'

const defaultPaginationProps = {
  total: 100,
  pageSize: 2,
};

describe('pagination', () => {
  describe(':props', () => {
    it(':current', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          current: 1,
        },
      });
      expect(wrapper.find('.t-is-current').text()).toEqual('1');
      await wrapper.setProps({
        current: 2,
      });
      expect(wrapper.find('.t-is-current').text()).toEqual('2');
    });

    it(':current__model', async () => {
      const wrapper = mount({
        data() {
          return { current: 1 };
        },
        render() {
          return <Pagination {...defaultPaginationProps} v-model={this.current} />;
        },
      });
      await wrapper.find('.t-pagination__number:nth-child(2)').trigger('click');
      expect(wrapper.vm.$data.current).toEqual(2);
    });

    it(':defaultCurrent', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          defaultCurrent: 2,
        },
      });
      expect(wrapper.find('.t-is-current').text()).toEqual('2');
    });

    it(':disabled', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          disabled: true,
        },
      });
      expect(wrapper.classes()).toContain('t-is-disabled');
      await wrapper.setProps({
        disabled: false,
      });
      expect(wrapper.classes()).not.toContain('t-is-disabled');
    });

    it(':foldedMaxPageBtn', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          foldedMaxPageBtn: 2,
        },
      });
      const pager = wrapper.find('.t-pagination__pager');
      const more = wrapper.find('.t-pagination__pager .t-pagination__number--more');
      expect([...pager.element.children].indexOf(more.element)).toEqual(2);
      await wrapper.setProps({
        foldedMaxPageBtn: 3,
      });
      expect([...pager.element.children].indexOf(more.element)).toEqual(3);
    });

    it(':maxPageBtn', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          maxPageBtn: 10,
        },
      });
      expect(wrapper.find('.t-pagination__number--more').exists()).toEqual(true);
      await wrapper.setProps({
        maxPageBtn: 99999,
      });
      expect(wrapper.find('.t-pagination__number--more').exists()).toEqual(false);
    });

    it(':pageEllipsisMode', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          current: 5,
          pageEllipsisMode: 'both-ends',
        },
      });
      expect(wrapper.find('.t-pagination__number--more').exists()).toEqual(false);
      await wrapper.setProps({
        pageEllipsisMode: 'mid',
      });
      expect(wrapper.find('.t-pagination__number--more').exists()).toEqual(true);
    });

    it(':pageSize', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          pageSize: 10,
        },
      });
      expect(wrapper.find('.t-input__input-pre').text()).toEqual('10 条/页');
      await wrapper.setProps({
        pageSize: 20,
      });
      expect(wrapper.find('.t-input__input-pre').text()).toEqual('20 条/页');
    });

    it(':pageSize__model', async () => {
      const wrapper = mount({
        data() {
          return { pageSize: 20 };
        },
        render() {
          return <Pagination {...defaultPaginationProps} v-model:pageSize={this.pageSize} />;
        },
      });
      const select = wrapper.findComponent(Select);
      select.vm.onChange(50);
      expect(wrapper.vm.$data.pageSize).toEqual(50);
    });

    it(':defaultPageSize', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          defaultPageSize: 20,
        },
      });
      expect(wrapper.find('.t-input__input-pre').text()).toEqual('20 条/页');
    });

    it(':pageSizeOptions', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
        },
      });
      expect(wrapper.find('.t-pagination__select').exists()).toEqual(true);
      await wrapper.setProps({
        pageSizeOptions: [],
      });
      expect(wrapper.find('.t-pagination__select').exists()).toEqual(false);
    });

    it(':showFirstAndLastPageBtn', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          showFirstAndLastPageBtn: true,
        },
      });
      expect(wrapper.find('.t-icon-page-last').exists()).toEqual(true);
      expect(wrapper.find('.t-icon-page-first').exists()).toEqual(true);
      await wrapper.setProps({
        showFirstAndLastPageBtn: false,
      });
      expect(wrapper.find('.t-icon-page-last').exists()).toEqual(false);
      expect(wrapper.find('.t-icon-page-first').exists()).toEqual(false);
    });

    it(':showJumper', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          showJumper: true,
        },
      });
      expect(wrapper.find('.t-pagination__jump').exists()).toEqual(true);
      await wrapper.setProps({
        showJumper: false,
      });
      expect(wrapper.find('.t-pagination__jump').exists()).toEqual(false);
    });

    it(':showPageNumber', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          showPageNumber: true,
        },
      });
      expect(wrapper.find('.t-pagination__pager').exists()).toEqual(true);
      await wrapper.setProps({
        showPageNumber: false,
      });
      expect(wrapper.find('.t-pagination__pager').exists()).toEqual(false);
    });

    it(':showPageSize', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          showPageSize: true,
        },
      });
      expect(wrapper.find('.t-pagination__select').exists()).toEqual(true);
      await wrapper.setProps({
        showPageSize: false,
      });
      expect(wrapper.find('.t-pagination__select').exists()).toEqual(false);
    });

    it(':showPreviousAndNextBtn', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          showPreviousAndNextBtn: true,
        },
      });
      expect(wrapper.find('.t-pagination__btn-prev').exists()).toEqual(true);
      expect(wrapper.find('.t-pagination__btn-next').exists()).toEqual(true);
      await wrapper.setProps({
        showPreviousAndNextBtn: false,
      });
      expect(wrapper.find('.t-pagination__btn-prev').exists()).toEqual(false);
      expect(wrapper.find('.t-pagination__btn-next').exists()).toEqual(false);
    });

    it(':size', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          size: 'medium',
        },
      });
      expect(wrapper.classes()).toContain('t-size-m');
      await wrapper.setProps({
        size: 'small',
      });
      expect(wrapper.classes()).toContain('t-size-s');
    });

    it(':theme', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          theme: 'default',
        },
      });
      expect(wrapper.find('.t-pagination__pager').exists()).toEqual(true);
      expect(wrapper.find('.t-pagination__jump').exists()).toEqual(false);
      await wrapper.setProps({
        theme: 'simple',
      });
      expect(wrapper.find('.t-pagination__pager').exists()).toEqual(false);
      expect(wrapper.find('.t-pagination__jump').exists()).toEqual(true);
    });

    it(':total', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          total: 10,
          pageSize: 10,
        },
      });
      expect(wrapper.findAll('.t-pagination__number').length).toEqual(1);
      await wrapper.setProps({
        total: 11,
      });
      expect(wrapper.findAll('.t-pagination__number').length).toEqual(2);
    });

    it(':totalContent', async () => {
      const wrapper = mount(Pagination, {
        propsData: {
          totalContent: true,
        },
      });
      expect(wrapper.find('.t-pagination__total').exists()).toEqual(true);
      await wrapper.setProps({
        totalContent: false,
      });
      expect(wrapper.find('.t-pagination__total').exists()).toEqual(false);

      await wrapper.setProps({
        totalContent: () => <div data-testid="total-content">TOTAL</div>,
      });
      expect(wrapper.find('[data-testid="total-content"]').text()).toEqual('TOTAL');
    });
  });

  describe('@event', () => {
    it('@change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          onChange,
          showJumper: true,
        },
      });
      await wrapper.find('.t-pagination__number:nth-child(2)').trigger('click');
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          current: 2,
          pageSize: 2,
          previous: 1,
        }),
      );

      await wrapper.find('.t-pagination__input input').setValue(3);
      await wrapper.find('.t-pagination__input input').trigger('blur');
      expect(onChange).toHaveBeenCalledTimes(2);

      await wrapper.find('.t-pagination__btn-next').trigger('click');
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it('@current-change', async () => {
      const onCurrentChange = vi.fn();
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          onCurrentChange,
        },
      });
      await wrapper.find('.t-pagination__number:nth-child(2)').trigger('click');
      expect(onCurrentChange).toHaveBeenLastCalledWith(
        2,
        expect.objectContaining({
          current: 2,
          pageSize: 2,
          previous: 1,
        }),
      );
    });

    it('@page-size-change', async () => {
      const onPageSizeChange = vi.fn();
      const wrapper = mount(Pagination, {
        propsData: {
          ...defaultPaginationProps,
          current: 10,
          onPageSizeChange,
        },
      });
      const select = wrapper.findComponent(Select);
      select.vm.onChange(50);
      expect(onPageSizeChange).toHaveBeenLastCalledWith(
        50,
        expect.objectContaining({
          current: 2,
          pageSize: 50,
          previous: 10,
        }),
      );
    });
  });

  describe('<slot>', () => {
    it(':totalContent', async () => {
      const wrapper = mount(Pagination, {
        slots: {
          totalContent: <div data-testid="total-content">TOTAL</div>,
        },
      });
      expect(wrapper.find('[data-testid="total-content"]').text()).toEqual('TOTAL');
    });
  });
});
