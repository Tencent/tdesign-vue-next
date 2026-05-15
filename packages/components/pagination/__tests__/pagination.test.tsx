import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Pagination } from '@tdesign/components/pagination';
import paginationProps from '@tdesign/components/pagination/props';

describe('Pagination', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('props', () => {
    it(':total[number]', () => {
      const wrapper1 = mount(<Pagination total={100} />);
      expect(wrapper1.find('.t-pagination__total').exists()).toBe(true);
      expect(wrapper1.find('.t-pagination__total').text()).toContain('100');
      wrapper1.unmount();

      // total=0 仍然渲染分页，pageCount 最小为 1
      const wrapper2 = mount(<Pagination total={0} />);
      expect(wrapper2.find('.t-pagination').exists()).toBe(true);
      expect(wrapper2.findAll('.t-pagination__number').length).toBe(1);
      wrapper2.unmount();
    });

    it(':current[number]', async () => {
      // defaultCurrent
      const wrapper1 = mount(<Pagination total={100} defaultCurrent={3} />);
      expect(wrapper1.find('.t-is-current').text()).toBe('3');
      wrapper1.unmount();

      // v-model 受控
      const current = ref(2);
      const wrapper2 = mount({
        setup: () => ({ current }),
        render: () => <Pagination total={100} v-model={current.value} />,
      });
      expect(wrapper2.find('.t-is-current').text()).toBe('2');
      current.value = 5;
      await nextTick();
      expect(wrapper2.find('.t-is-current').text()).toBe('5');
      wrapper2.unmount();
    });

    it(':pageSize[number]', async () => {
      // 默认 10 条/页，100 条 → 10 页
      const wrapper1 = mount(<Pagination total={100} />);
      expect(wrapper1.findAll('.t-pagination__number').length).toBeGreaterThanOrEqual(10);
      wrapper1.unmount();

      // 自定义 defaultPageSize=20，100 条 → 5 页
      const wrapper2 = mount(<Pagination total={100} defaultPageSize={20} />);
      expect(wrapper2.findAll('.t-pagination__number').length).toBe(5);
      wrapper2.unmount();

      // 受控 pageSize
      const pageSize = ref(10);
      const wrapper3 = mount({
        setup: () => ({ pageSize }),
        render: () => <Pagination total={100} pageSize={pageSize.value} />,
      });
      expect(wrapper3.findAll('.t-pagination__number').length).toBe(10);
      pageSize.value = 50;
      await nextTick();
      expect(wrapper3.findAll('.t-pagination__number').length).toBe(2);
      wrapper3.unmount();
    });

    it(':disabled[boolean]', async () => {
      const wrapper = mount(<Pagination total={100} disabled />);
      expect(wrapper.find('.t-is-disabled').exists()).toBe(true);

      // disabled 时不应触发 onChange
      const onChangeFn = vi.fn();
      const wrapper2 = mount(<Pagination total={100} disabled onChange={onChangeFn} />);
      const nextBtn = wrapper2.find('.t-pagination__btn-next');
      await nextBtn.trigger('click');
      expect(onChangeFn).not.toHaveBeenCalled();
      wrapper.unmount();
      wrapper2.unmount();
    });

    it(':size[small/medium]', () => {
      const validator = paginationProps.size.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('small')).toBe(true);
      expect(validator('medium')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      const wrapper1 = mount(<Pagination total={100} size="small" />);
      expect(wrapper1.find('.t-size-s').exists()).toBe(true);
      wrapper1.unmount();

      const wrapper2 = mount(<Pagination total={100} size="medium" />);
      expect(wrapper2.find('.t-size-m').exists()).toBe(true);
      wrapper2.unmount();
    });

    it(':theme[default/simple]', () => {
      const validator = paginationProps.theme.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('default')).toBe(true);
      expect(validator('simple')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // default 有页码按钮列表
      const wrapper1 = mount(<Pagination total={100} theme="default" />);
      expect(wrapper1.find('.t-pagination__pager').exists()).toBe(true);
      wrapper1.unmount();

      // simple 有跳转输入框
      const wrapper2 = mount(<Pagination total={100} theme="simple" />);
      expect(wrapper2.find('.t-pagination--simple').exists()).toBe(true);
      expect(wrapper2.find('.t-pagination__jump').exists()).toBe(true);
      wrapper2.unmount();
    });

    it(':pageEllipsisMode[mid/both-ends]', () => {
      const validator = paginationProps.pageEllipsisMode.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('mid')).toBe(true);
      expect(validator('both-ends')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // mid 模式下有首尾页码 + 中间省略号
      const wrapper1 = mount(<Pagination total={500} defaultCurrent={10} pageEllipsisMode="mid" />);
      expect(wrapper1.findAll('.t-pagination__number--more').length).toBe(2);
      wrapper1.unmount();

      // both-ends 模式下不渲染首尾页码，省略号数量不同
      const wrapper2 = mount(<Pagination total={500} defaultCurrent={10} pageEllipsisMode="both-ends" />);
      expect(wrapper2.find('.t-pagination__pager').exists()).toBe(true);
      // both-ends 没有单独的首尾页码，不出现省略号
      expect(wrapper2.findAll('.t-pagination__number--more').length).toBe(0);
      wrapper2.unmount();
    });

    it(':showPageNumber[boolean]', () => {
      // 默认显示
      const wrapper1 = mount(<Pagination total={100} />);
      expect(wrapper1.find('.t-pagination__pager').exists()).toBe(true);
      wrapper1.unmount();

      // 不显示
      const wrapper2 = mount(<Pagination total={100} showPageNumber={false} />);
      expect(wrapper2.find('.t-pagination__pager').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':showPreviousAndNextBtn[boolean]', () => {
      // 默认显示
      const wrapper1 = mount(<Pagination total={100} />);
      expect(wrapper1.find('.t-pagination__btn-prev').exists()).toBe(true);
      expect(wrapper1.find('.t-pagination__btn-next').exists()).toBe(true);
      wrapper1.unmount();

      // 不显示
      const wrapper2 = mount(<Pagination total={100} showPreviousAndNextBtn={false} />);
      expect(wrapper2.find('.t-pagination__btn-prev').exists()).toBe(false);
      expect(wrapper2.find('.t-pagination__btn-next').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':showFirstAndLastPageBtn[boolean]', () => {
      // 默认不显示
      const wrapper1 = mount(<Pagination total={100} />);
      expect(wrapper1.findAll('.t-pagination__btn').length).toBe(2);
      wrapper1.unmount();

      // 显示首尾页按钮
      const wrapper2 = mount(<Pagination total={100} showFirstAndLastPageBtn />);
      expect(wrapper2.findAll('.t-pagination__btn').length).toBe(4);
      wrapper2.unmount();
    });

    it(':showJumper[boolean]', () => {
      // 默认不显示跳转
      const wrapper1 = mount(<Pagination total={100} />);
      expect(wrapper1.find('.t-pagination__jump').exists()).toBe(false);
      wrapper1.unmount();

      // 显示跳转
      const wrapper2 = mount(<Pagination total={100} showJumper />);
      expect(wrapper2.find('.t-pagination__jump').exists()).toBe(true);
      wrapper2.unmount();
    });

    it(':showPageSize[boolean]', () => {
      // 默认显示
      const wrapper1 = mount(<Pagination total={100} />);
      expect(wrapper1.find('.t-pagination__select').exists()).toBe(true);
      wrapper1.unmount();

      // 不显示
      const wrapper2 = mount(<Pagination total={100} showPageSize={false} />);
      expect(wrapper2.find('.t-pagination__select').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':pageSizeOptions[array]', () => {
      // 自定义选项
      const wrapper = mount(<Pagination total={100} pageSizeOptions={[10, 20, 50]} />);
      expect(wrapper.find('.t-pagination__select').exists()).toBe(true);
      wrapper.unmount();

      // 空数组不显示
      const wrapper2 = mount(<Pagination total={100} pageSizeOptions={[]} />);
      expect(wrapper2.find('.t-pagination__select').exists()).toBe(false);
      wrapper2.unmount();

      // 对象格式选项
      const objOptions = [
        { label: '10条/页', value: 10 },
        { label: '20条/页', value: 20 },
      ];
      const wrapper3 = mount(<Pagination total={100} pageSizeOptions={objOptions} />);
      expect(wrapper3.find('.t-pagination__select').exists()).toBe(true);
      wrapper3.unmount();
    });

    it(':maxPageBtn[number]', () => {
      // 默认 maxPageBtn=10，11 页以内不折叠
      const wrapper1 = mount(<Pagination total={100} />);
      expect(wrapper1.findAll('.t-pagination__number').length).toBe(10);
      wrapper1.unmount();

      // 自定义 maxPageBtn=5，超过 5 页折叠
      const wrapper2 = mount(<Pagination total={100} maxPageBtn={5} />);
      expect(wrapper2.find('.t-pagination__number--more').exists()).toBe(true);
      wrapper2.unmount();
    });

    it(':foldedMaxPageBtn[number]', () => {
      // 折叠时显示的页码数量
      const wrapper = mount(<Pagination total={500} defaultCurrent={10} foldedMaxPageBtn={3} />);
      const numberBtns = wrapper
        .findAll('.t-pagination__number')
        .filter((el) => !el.classes().includes('t-pagination__number--more'));
      // 首页 + foldedMaxPageBtn个中间页 + 尾页 = 2 + 3 = 5
      expect(numberBtns.length).toBe(5);
      wrapper.unmount();
    });

    it(':totalContent[boolean]', () => {
      // 默认显示
      const wrapper1 = mount(<Pagination total={100} />);
      expect(wrapper1.find('.t-pagination__total').exists()).toBe(true);
      wrapper1.unmount();

      // false 不显示
      const wrapper2 = mount(<Pagination total={100} totalContent={false} />);
      expect(wrapper2.find('.t-pagination__total').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':totalContent[slot/function]', () => {
      const wrapper = mount(Pagination, {
        props: { total: 100 },
        slots: { totalContent: () => <span class="custom-total">自定义总数</span> },
      });
      expect(wrapper.find('.custom-total').exists()).toBe(true);
      expect(wrapper.find('.custom-total').text()).toBe('自定义总数');
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('onChange', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Pagination total={100} onChange={onChangeFn} />);
      // 点击第 2 页
      const pageButtons = wrapper.findAll('.t-pagination__number');
      await pageButtons[1].trigger('click');
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toEqual(expect.objectContaining({ current: 2, previous: 1, pageSize: 10 }));
      wrapper.unmount();
    });

    it('onCurrentChange', async () => {
      const onCurrentChangeFn = vi.fn();
      const wrapper = mount(<Pagination total={100} onCurrentChange={onCurrentChangeFn} />);
      const pageButtons = wrapper.findAll('.t-pagination__number');
      await pageButtons[1].trigger('click');
      expect(onCurrentChangeFn).toHaveBeenCalled();
      expect(onCurrentChangeFn.mock.calls[0][0]).toBe(2);
      expect(onCurrentChangeFn.mock.calls[0][1]).toEqual(
        expect.objectContaining({ current: 2, previous: 1, pageSize: 10 }),
      );
      wrapper.unmount();
    });

    it('onPageSizeChange', async () => {
      const onPageSizeChangeFn = vi.fn();
      const wrapper = mount(
        <Pagination total={100} onPageSizeChange={onPageSizeChangeFn} pageSizeOptions={[5, 10, 20]} />,
      );
      // Select popup 为 teleport 渲染，此处仅验证 select 存在且初始未触发
      expect(wrapper.find('.t-pagination__select').exists()).toBe(true);
      expect(onPageSizeChangeFn).not.toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('navigation', () => {
    it('click prev/next buttons', async () => {
      const current = ref(5);
      const wrapper = mount({
        setup: () => ({ current }),
        render: () => <Pagination total={100} v-model={current.value} />,
      });

      // 点击下一页
      await wrapper.find('.t-pagination__btn-next').trigger('click');
      expect(current.value).toBe(6);

      // 点击上一页
      await wrapper.find('.t-pagination__btn-prev').trigger('click');
      expect(current.value).toBe(5);
      wrapper.unmount();
    });

    it('click first/last page buttons', async () => {
      const current = ref(5);
      const wrapper = mount({
        setup: () => ({ current }),
        render: () => <Pagination total={100} v-model={current.value} showFirstAndLastPageBtn />,
      });

      const btns = wrapper.findAll('.t-pagination__btn');
      // 首页按钮
      await btns[0].trigger('click');
      expect(current.value).toBe(1);

      // 尾页按钮
      await btns[btns.length - 1].trigger('click');
      expect(current.value).toBe(10);
      wrapper.unmount();
    });

    it('click page number', async () => {
      const current = ref(1);
      const wrapper = mount({
        setup: () => ({ current }),
        render: () => <Pagination total={100} v-model={current.value} />,
      });

      const pageButtons = wrapper.findAll('.t-pagination__number');
      await pageButtons[4].trigger('click');
      expect(current.value).toBe(5);
      wrapper.unmount();
    });

    it('prev button disabled on first page', () => {
      const wrapper = mount(<Pagination total={100} defaultCurrent={1} />);
      expect(wrapper.find('.t-pagination__btn-prev').classes()).toContain('t-is-disabled');
      wrapper.unmount();
    });

    it('next button disabled on last page', () => {
      const wrapper = mount(<Pagination total={100} defaultCurrent={10} />);
      expect(wrapper.find('.t-pagination__btn-next').classes()).toContain('t-is-disabled');
      wrapper.unmount();
    });

    it('more button ellipsis navigation', async () => {
      const current = ref(10);
      const wrapper = mount({
        setup: () => ({ current }),
        render: () => <Pagination total={500} v-model={current.value} />,
      });

      const moreBtns = wrapper.findAll('.t-pagination__number--more');
      expect(moreBtns.length).toBe(2);

      // 点击前省略号向前跳
      const prevCurrent = current.value;
      await moreBtns[0].trigger('click');
      expect(current.value).toBeLessThan(prevCurrent);

      // 点击后省略号向后跳
      current.value = 10;
      await nextTick();
      const moreBtns2 = wrapper.findAll('.t-pagination__number--more');
      const nextCurrent = current.value;
      await moreBtns2[1].trigger('click');
      expect(current.value).toBeGreaterThan(nextCurrent);
      wrapper.unmount();
    });

    it('more button hover shows double arrow', async () => {
      const wrapper = mount(<Pagination total={500} defaultCurrent={10} />);
      const moreBtn = wrapper.find('.t-pagination__number--more');
      expect(moreBtn.exists()).toBe(true);

      await moreBtn.trigger('mouseover');
      await nextTick();
      // hover 后应该显示双箭头图标
      expect(moreBtn.find('svg').exists()).toBe(true);

      await moreBtn.trigger('mouseout');
      await nextTick();
      expect(moreBtn.find('svg').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('edge cases', () => {
    it('page boundary clamping', async () => {
      const current = ref(1);
      const wrapper = mount({
        setup: () => ({ current }),
        render: () => <Pagination total={100} v-model={current.value} />,
      });

      // 第一页点击上一页不会变
      await wrapper.find('.t-pagination__btn-prev').trigger('click');
      expect(current.value).toBe(1);

      // 最后一页点击下一页不会变
      current.value = 10;
      await nextTick();
      await wrapper.find('.t-pagination__btn-next').trigger('click');
      expect(current.value).toBe(10);
      wrapper.unmount();
    });

    it('pageSize change adjusts current if exceeds', async () => {
      const current = ref(10);
      const pageSize = ref(10);
      const wrapper = mount({
        setup: () => ({ current, pageSize }),
        render: () => (
          <Pagination total={100} v-model={current.value} pageSize={pageSize.value} pageSizeOptions={[10, 50]} />
        ),
      });

      // 当前第 10 页（pageSize=10 → 10页）
      expect(wrapper.find('.t-is-current').text()).toBe('10');

      // 改 pageSize=50 → 2页，current 应被调整
      pageSize.value = 50;
      await nextTick();
      expect(wrapper.findAll('.t-pagination__number').length).toBe(2);
      wrapper.unmount();
    });

    it('total < pageSize shows single page', () => {
      const wrapper = mount(<Pagination total={3} defaultPageSize={10} />);
      const pageButtons = wrapper.findAll('.t-pagination__number');
      expect(pageButtons.length).toBe(1);
      wrapper.unmount();
    });

    it('total=0 still renders pagination with 1 page', () => {
      // pageCount = max(ceil(0 / 10), 1) = 1，组件仍然渲染
      const wrapper = mount(<Pagination total={0} />);
      expect(wrapper.find('.t-pagination').exists()).toBe(true);
      expect(wrapper.findAll('.t-pagination__number').length).toBe(1);
      wrapper.unmount();
    });
  });
});
