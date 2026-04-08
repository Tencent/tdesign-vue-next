import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Skeleton } from '@tdesign/components/skeleton';
import skeletonProps from '@tdesign/components/skeleton/props';

describe('Skeleton', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':loading[boolean]', async () => {
      // true: 显示骨架图
      const wrapper1 = mount(<Skeleton loading />);
      expect(wrapper1.find('.t-skeleton').exists()).toBe(true);
      expect(wrapper1.findAll('.t-skeleton__row').length).toBeGreaterThan(0);
      wrapper1.unmount();

      // false 无 slot: 什么都不渲染
      const wrapper2 = mount(<Skeleton loading={false} />);
      await nextTick();
      expect(wrapper2.find('.t-skeleton').exists()).toBe(false);
      wrapper2.unmount();

      // false 有 slot: 显示 slot 内容
      const wrapper3 = mount(
        <Skeleton loading={false}>
          <div class="real">内容</div>
        </Skeleton>,
      );
      expect(wrapper3.find('.t-skeleton').exists()).toBe(false);
      expect(wrapper3.find('.real').exists()).toBe(true);
      expect(wrapper3.find('.real').text()).toBe('内容');
      wrapper3.unmount();

      // true 有 slot: 隐藏 slot，显示骨架图
      const wrapper4 = mount(
        <Skeleton loading>
          <div class="real">内容</div>
        </Skeleton>,
      );
      expect(wrapper4.find('.t-skeleton').exists()).toBe(true);
      expect(wrapper4.find('.real').exists()).toBe(false);
      wrapper4.unmount();

      // toggle: true → false
      const loading = ref(true);
      const wrapper5 = mount({
        render() {
          return (
            <Skeleton loading={loading.value}>
              <div class="real">加载完成</div>
            </Skeleton>
          );
        },
      });
      expect(wrapper5.findAll('.t-skeleton__row').length).toBe(1);
      loading.value = false;
      await nextTick();
      expect(wrapper5.findAll('.t-skeleton__row').length).toBe(0);
      expect(wrapper5.find('.real').text()).toBe('加载完成');
      wrapper5.unmount();
    });

    it(':theme[text/avatar/paragraph/avatar-text/tab/article]', () => {
      const validator = skeletonProps.theme.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('text')).toBe(true);
      expect(validator('avatar')).toBe(true);
      expect(validator('paragraph')).toBe(true);
      expect(validator('avatar-text')).toBe(true);
      expect(validator('tab')).toBe(true);
      expect(validator('article')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // text: 1 row, 1 col, type text
      const wrapper1 = mount(<Skeleton loading theme="text" />);
      expect(wrapper1.findAll('.t-skeleton__row').length).toBe(1);
      expect(wrapper1.findAll('.t-skeleton__col').length).toBe(1);
      expect(wrapper1.find('.t-skeleton--type-text').exists()).toBe(true);
      wrapper1.unmount();

      // avatar: 1 row, 1 col, type circle, size 56px
      const wrapper2 = mount(<Skeleton loading theme="avatar" />);
      expect(wrapper2.findAll('.t-skeleton__row').length).toBe(1);
      expect(wrapper2.find('.t-skeleton--type-circle').exists()).toBe(true);
      const avatarStyle = (wrapper2.find('.t-skeleton__col').element as HTMLElement).style;
      expect(avatarStyle.width).toBe('56px');
      expect(avatarStyle.height).toBe('56px');
      wrapper2.unmount();

      // paragraph: 3 rows, 3 cols
      const wrapper3 = mount(<Skeleton loading theme="paragraph" />);
      expect(wrapper3.findAll('.t-skeleton__row').length).toBe(3);
      expect(wrapper3.findAll('.t-skeleton__col').length).toBe(3);
      wrapper3.unmount();

      // avatar-text: 1 row, 2 cols (circle + text)
      const wrapper4 = mount(<Skeleton loading theme="avatar-text" />);
      expect(wrapper4.findAll('.t-skeleton__row').length).toBe(1);
      expect(wrapper4.findAll('.t-skeleton__col').length).toBe(2);
      expect(wrapper4.find('.t-skeleton--type-circle').exists()).toBe(true);
      expect(wrapper4.find('.t-skeleton--type-text').exists()).toBe(true);
      wrapper4.unmount();

      // tab: 2 rows, 2 cols
      const wrapper5 = mount(<Skeleton loading theme="tab" />);
      expect(wrapper5.findAll('.t-skeleton__row').length).toBe(2);
      expect(wrapper5.findAll('.t-skeleton__col').length).toBe(2);
      wrapper5.unmount();

      // article: 6 rows, 11 cols, includes rect type
      const wrapper6 = mount(<Skeleton loading theme="article" />);
      expect(wrapper6.findAll('.t-skeleton__row').length).toBe(6);
      expect(wrapper6.findAll('.t-skeleton__col').length).toBe(11);
      expect(wrapper6.findAll('.t-skeleton--type-rect').length).toBe(2);
      wrapper6.unmount();
    });

    it(':animation[gradient/flashed/none]', () => {
      const validator = skeletonProps.animation.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('gradient')).toBe(true);
      expect(validator('flashed')).toBe(true);
      expect(validator('none')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // 默认 none
      const wrapper1 = mount(<Skeleton loading />);
      expect(wrapper1.find('.t-skeleton__col').classes()).toContain('t-skeleton--animation-none');
      wrapper1.unmount();

      // gradient
      const wrapper2 = mount(<Skeleton loading animation="gradient" />);
      expect(wrapper2.find('.t-skeleton__col').classes()).toContain('t-skeleton--animation-gradient');
      wrapper2.unmount();

      // flashed
      const wrapper3 = mount(<Skeleton loading animation="flashed" />);
      expect(wrapper3.find('.t-skeleton__col').classes()).toContain('t-skeleton--animation-flashed');
      wrapper3.unmount();
    });

    it(':delay[number]', async () => {
      // delay > 0: 延迟显示
      const wrapper1 = mount(<Skeleton loading delay={500} />);
      await nextTick();
      expect(wrapper1.find('.t-skeleton').exists()).toBe(false);
      vi.advanceTimersByTime(500);
      await nextTick();
      expect(wrapper1.find('.t-skeleton').exists()).toBe(true);
      wrapper1.unmount();

      // delay 期间 loading 变 false: 取消定时器
      const wrapper2 = mount(Skeleton, { props: { loading: true, delay: 500 } });
      await nextTick();
      expect(wrapper2.find('.t-skeleton').exists()).toBe(false);
      await wrapper2.setProps({ loading: false });
      await nextTick();
      vi.advanceTimersByTime(500);
      await nextTick();
      expect(wrapper2.find('.t-skeleton').exists()).toBe(false);
      wrapper2.unmount();

      // delay = 0: 立即显示
      const wrapper3 = mount(<Skeleton loading delay={0} />);
      expect(wrapper3.find('.t-skeleton').exists()).toBe(true);
      wrapper3.unmount();
    });

    it(':rowCol[array]', () => {
      // number items: [1, 1, 2] → 3 rows, 4 cols
      const wrapper1 = mount(<Skeleton loading rowCol={[1, 1, 2]} />);
      const rows1 = wrapper1.findAll('.t-skeleton__row');
      expect(rows1.length).toBe(3);
      expect(rows1[0].element.children.length).toBe(1);
      expect(rows1[2].element.children.length).toBe(2);
      wrapper1.unmount();

      // object items: type + style
      const wrapper2 = mount(
        <Skeleton
          loading
          rowCol={[
            { width: '100px', height: '30px', type: 'rect' },
            { type: 'circle', size: '48px' },
          ]}
        />,
      );
      expect(wrapper2.find('.t-skeleton--type-rect').exists()).toBe(true);
      expect(wrapper2.find('.t-skeleton--type-circle').exists()).toBe(true);
      const circleStyle = (wrapper2.find('.t-skeleton--type-circle').element as HTMLElement).style;
      expect(circleStyle.width).toBe('48px');
      expect(circleStyle.height).toBe('48px');
      wrapper2.unmount();

      // nested array items
      const wrapper3 = mount(
        <Skeleton
          loading
          rowCol={[
            [
              { type: 'circle', size: '60px' },
              { type: 'text', height: '32px' },
            ],
          ]}
        />,
      );
      expect(wrapper3.findAll('.t-skeleton__row').length).toBe(1);
      expect(wrapper3.findAll('.t-skeleton__col').length).toBe(2);
      wrapper3.unmount();

      // rowCol 优先于 theme
      const wrapper4 = mount(<Skeleton loading theme="avatar" rowCol={[1, 1]} />);
      expect(wrapper4.findAll('.t-skeleton__row').length).toBe(2);
      expect(wrapper4.find('.t-skeleton--type-circle').exists()).toBe(false);
      wrapper4.unmount();

      // 无 type 默认 text
      const wrapper5 = mount(<Skeleton loading rowCol={[{ width: '100px' }]} />);
      expect(wrapper5.find('.t-skeleton--type-text').exists()).toBe(true);
      wrapper5.unmount();
    });

    it(':rowCol style properties', () => {
      // marginRight, marginLeft
      const wrapper1 = mount(
        <Skeleton loading rowCol={[{ width: '100px', height: '30px', marginRight: '10px', marginLeft: '5px' }]} />,
      );
      const style1 = (wrapper1.find('.t-skeleton__col').element as HTMLElement).style;
      expect(style1.width).toBe('100px');
      expect(style1.height).toBe('30px');
      expect(style1.marginRight).toBe('10px');
      expect(style1.marginLeft).toBe('5px');
      wrapper1.unmount();

      // margin
      const wrapper2 = mount(<Skeleton loading rowCol={[{ margin: '20px' }]} />);
      expect((wrapper2.find('.t-skeleton__col').element as HTMLElement).style.margin).toBe('20px');
      wrapper2.unmount();

      // 数值自动加 px
      // @ts-expect-error testing numeric values
      const wrapper3 = mount(<Skeleton loading rowCol={[{ width: 100, height: 30 }]} />);
      const style3 = (wrapper3.find('.t-skeleton__col').element as HTMLElement).style;
      expect(style3.width).toBe('100px');
      expect(style3.height).toBe('30px');
      wrapper3.unmount();
    });

    it(':rowCol content[string]', () => {
      const wrapper = mount(<Skeleton loading rowCol={[{ content: '加载中...' }]} />);
      expect(wrapper.find('.t-skeleton__col').text()).toBe('加载中...');
      wrapper.unmount();
    });

    it(':rowCol content[slot/function]', () => {
      const wrapper = mount(
        <Skeleton loading rowCol={[{ content: () => <span class="custom-loading">自定义</span> }]} />,
      );
      expect(wrapper.find('.custom-loading').exists()).toBe(true);
      expect(wrapper.find('.custom-loading').text()).toBe('自定义');
      wrapper.unmount();
    });

    it('no theme and no rowCol renders default 4-row skeleton', () => {
      const wrapper = mount(Skeleton, { props: { loading: true, theme: '' as any } });
      expect(wrapper.findAll('.t-skeleton__row').length).toBe(4);
      wrapper.unmount();
    });

    it(':content[slot] shows when loading=false', () => {
      const wrapper = mount(Skeleton, {
        props: { loading: false },
        slots: { default: () => <div class="done">完成</div> },
      });
      expect(wrapper.find('.done').exists()).toBe(true);
      expect(wrapper.find('.done').text()).toBe('完成');
      wrapper.unmount();
    });
  });

  describe('edge cases', () => {
    it('delay with loading toggle true→false→true', async () => {
      const wrapper = mount(Skeleton, { props: { loading: false, delay: 300 } });
      await nextTick();
      expect(wrapper.find('.t-skeleton').exists()).toBe(false);

      await wrapper.setProps({ loading: true });
      await nextTick();
      expect(wrapper.find('.t-skeleton').exists()).toBe(false);

      await wrapper.setProps({ loading: false });
      await nextTick();
      vi.advanceTimersByTime(300);
      await nextTick();
      expect(wrapper.find('.t-skeleton').exists()).toBe(false);

      await wrapper.setProps({ loading: true });
      await nextTick();
      vi.advanceTimersByTime(300);
      await nextTick();
      expect(wrapper.find('.t-skeleton').exists()).toBe(true);
      wrapper.unmount();
    });

    it('unmount during delay does not crash', async () => {
      const wrapper = mount(<Skeleton loading delay={1000} />);
      await nextTick();
      wrapper.unmount();
      vi.advanceTimersByTime(1000);
      expect(true).toBe(true);
    });
  });
});
