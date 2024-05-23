import { mount } from '@vue/test-utils';
import { expect, it } from 'vitest';
import { nextTick, ref } from '@td/adapter-vue';
import { Skeleton } from 'tdesign-vue-next';

// every component needs four parts: props/events/slots/functions.
describe('skeleton', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount(() => <Skeleton />);
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain('t-skeleton');
      expect(rows.length).toBe(4);
      expect(cols.length).toBe(4);
    });

    it(':theme:text', () => {
      const wrapper = mount(() => <Skeleton theme="text" />);
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      const text = wrapper.find('.t-skeleton--type-text');
      expect(rows.length).toBe(1);
      expect(cols.length).toBe(1);
      expect(text.exists()).toBeTruthy();
    });

    it(':theme:text', () => {
      const wrapper = mount(() => <Skeleton theme="avatar" />);
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      const text = wrapper.find('.t-skeleton--type-circle');
      expect(rows.length).toBe(1);
      expect(cols.length).toBe(1);
      expect(text.exists()).toBeTruthy();
    });

    it(':theme:paragraph', () => {
      const wrapper = mount(() => <Skeleton theme="paragraph" />);
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      const texts = wrapper.findAll('.t-skeleton--type-text');
      expect(rows.length).toBe(3);
      expect(cols.length).toBe(3);
      expect(texts.length).toBe(3);
    });

    it(':theme:avatar-text', () => {
      const wrapper = mount(() => <Skeleton theme="avatar-text" />);
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      const avatar = wrapper.find('.t-skeleton--type-circle');
      const text = wrapper.find('.t-skeleton--type-text');
      expect(rows.length).toBe(1);
      expect(cols.length).toBe(2);
      expect(avatar.exists()).toBeTruthy();
      expect(text.exists()).toBeTruthy();
    });

    it(':theme:tab', () => {
      const wrapper = mount(() => <Skeleton theme="tab" />);
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      const texts = wrapper.findAll('.t-skeleton--type-text');
      expect(rows.length).toBe(2);
      expect(cols.length).toBe(2);
      expect(texts.length).toBe(2);
      expect(getComputedStyle(texts[0].element, null).height).toBe('30px');
      expect(getComputedStyle(texts[1].element, null).height).toBe('200px');
    });

    it(':theme:article', () => {
      const wrapper = mount(() => <Skeleton theme="article" />);
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(rows.length).toBe(6);
      expect(cols.length).toBe(11);
      expect(rows[0].element.children.length).toBe(1);
      expect(getComputedStyle(cols[0].element, null).width).toBe('100%');
      expect(getComputedStyle(cols[0].element, null).height).toBe('30px');
      expect(rows[1].element.children.length).toBe(1);
      expect(getComputedStyle(cols[1].element, null).width).toBe('100%');
      expect(getComputedStyle(cols[1].element, null).height).toBe('200px');
      expect(rows[2].element.children.length).toBe(3);
      expect(getComputedStyle(cols[2].element, null).height).toBe('30px');
      expect(getComputedStyle(cols[3].element, null).height).toBe('30px');
      expect(getComputedStyle(cols[4].element, null).height).toBe('30px');
      expect(rows[3].element.children.length).toBe(2);
      expect(getComputedStyle(cols[5].element, null).height).toBe('30px');
      expect(getComputedStyle(cols[6].element, null).height).toBe('30px');
      expect(rows[4].element.children.length).toBe(2);
      expect(getComputedStyle(cols[7].element, null).height).toBe('30px');
      expect(getComputedStyle(cols[8].element, null).height).toBe('30px');
      expect(rows[5].element.children.length).toBe(2);
      expect(getComputedStyle(cols[9].element, null).height).toBe('30px');
      expect(getComputedStyle(cols[10].element, null).height).toBe('30px');
    });

    it(':animation:none', () => {
      const wrapper = mount(() => <Skeleton animation="none" />);
      const col = wrapper.find('.t-skeleton__col');
      expect(col.classes()).toContain('t-skeleton--animation-none');
    });

    it(':animation:gradient', () => {
      const wrapper = mount(() => <Skeleton animation="gradient" />);
      const col = wrapper.find('.t-skeleton__col');
      expect(col.classes()).toContain('t-skeleton--animation-gradient');
    });

    it(':animation:flashed', () => {
      const wrapper = mount(() => <Skeleton animation="flashed" />);
      const col = wrapper.find('.t-skeleton__col');
      expect(col.classes()).toContain('t-skeleton--animation-flashed');
    });

    it(':loading', async () => {
      const loading = ref(true);
      const wrapper = mount(() => (
        <Skeleton loading={loading.value}>
          <div class="text">加载完成的内容</div>
        </Skeleton>
      ));
      expect(wrapper.findAll('.t-skeleton__row').length).toBe(4);
      loading.value = false;
      await nextTick();
      expect(wrapper.findAll('.t-skeleton__row').length).toBe(0);
      expect(wrapper.find('.text').exists()).toBeTruthy();
      expect(wrapper.find('.text').text()).toBe('加载完成的内容');
    });

    it(':delay', async () => {
      const loading = ref(false);
      const wrapper = mount(() => (
        <Skeleton loading={loading.value} delay={3000}>
          <div class="text">加载完成的内容</div>
        </Skeleton>
      ));
      expect(wrapper.findAll('.t-skeleton__row').length).toBe(0);
      expect(wrapper.find('.text').exists()).toBeTruthy();
      expect(wrapper.find('.text').text()).toBe('加载完成的内容');
      loading.value = true;
      await nextTick();
      setTimeout(() => {
        expect(wrapper.findAll('.t-skeleton__row').length).toBe(4);
      }, 3000);
    });

    it(':rowCol', async () => {
      const wrapper = mount(() => <Skeleton rowCol={[1, 1, 2]} />);
      const rows = wrapper.findAll('.t-skeleton__row');
      const cols = wrapper.findAll('.t-skeleton__col');
      expect(rows.length).toBe(3);
      expect(cols.length).toBe(4);
      expect(rows[0].element.children.length).toBe(1);
      expect(rows[1].element.children.length).toBe(1);
      expect(rows[2].element.children.length).toBe(2);
    });
  });
});
