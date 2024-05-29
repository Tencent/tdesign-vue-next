import { nextTick, ref } from '@td/adapter-vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { Transfer } from 'tdesign-vue-next';

const data = [];
(() => {
  for (let i = 0; i < 20; i++) {
    data.push({
      value: i.toString(),
      label: `内容${i + 1}`,
      disabled: i % 3 < 1,
    });
  }
})();

const pagination = {
  pageSize: 5,
  total: 20,
  current: 1,
};
const checkedValue = ['1', '2', '5'];
const targetValue = ['1'];

describe('transfer', () => {
  // test for props
  describe('props', () => {
    it(':data', () => {
      const wrapper = mount(() => <Transfer data={data} />);
      const transfer = wrapper.find('.t-transfer');
      expect(transfer.exists()).toBeTruthy();
      const list = wrapper.findAll('.t-transfer__list');
      expect(list.length).toBe(2);
      const operations = wrapper.find('.t-transfer__operations');
      expect(operations.exists()).toBeTruthy();
      expect(list[0].findAll('.t-transfer__list-item').length).toBe(20);
      expect(list[1].findAll('.t-transfer__list-item').length).toBe(0);
      expect(list[1].find('.t-transfer__empty').exists()).toBeTruthy();
      expect(list[1].find('.t-transfer__empty').text()).toBe('暂无数据');
    });

    it(':checked', () => {
      const checked = ref(['2']);
      const wrapper = mount(() => <Transfer data={data} checked={checked.value} />);
      const list = wrapper.findAll('.t-transfer__list');
      const items = list[0].findAll('.t-transfer__list-item');
      expect(items[2].classes()).toContain('t-is-checked');
      const header = wrapper.find('.t-transfer__list-header');
      const checkbox = header.find('.t-checkbox');
      expect(checkbox.classes()).toContain('t-is-indeterminate');
      const text = header.findAll('span')[2];
      expect(text.exists()).toBeTruthy();
      expect(text.text()).toBe('1 / 20 项');
    });

    it(':defaultChecked', () => {
      const checked = ref(['2']);
      const wrapper = mount(() => <Transfer data={data} checked={checked.value} />);
      const list = wrapper.findAll('.t-transfer__list');
      const items = list[0].findAll('.t-transfer__list-item');
      expect(items[2].classes()).toContain('t-is-checked');
      const header = wrapper.find('.t-transfer__list-header');
      const checkbox = header.find('.t-checkbox');
      expect(checkbox.classes()).toContain('t-is-indeterminate');
      const text = header.findAll('span')[2];
      expect(text.exists()).toBeTruthy();
      expect(text.text()).toBe('1 / 20 项');
    });

    it(':direction:left', () => {
      const checked = ref(['2']);
      const wrapper = mount(() => <Transfer data={data} checked={checked.value} direction="left" />);
      const transfer = wrapper.find('.t-transfer');
      const btns = transfer.findAll('button');
      expect(btns[0].classes()).toContain('t-is-disabled');
      expect(btns[1].classes()).toContain('t-is-disabled');
    });

    it(':direction:right', async () => {
      const checked = ref(['2']);
      const targetValue = ref(['3']);
      const wrapper = mount(() => (
        <Transfer data={data} checked={checked.value} direction="right" v-model={targetValue.value} />
      ));
      const transfer = wrapper.find('.t-transfer');
      const list = transfer.findAll('.t-transfer__list');
      const item = list[1].find('.t-transfer__list-item');
      const checkbox = item.find('input');
      const btns = transfer.findAll('button');
      await checkbox.trigger('change');
      expect(btns[1].classes()).toContain('t-is-disabled');
    });

    it(':disabled', async () => {
      const checked = ref(['2']);
      const targetValue = ref(['3']);
      const wrapper = mount(() => (
        <Transfer data={data} checked={checked.value} disabled v-model={targetValue.value} />
      ));
      const transfer = wrapper.find('.t-transfer');
      const list = transfer.findAll('.t-transfer__list');
      const checkboxGroup = list[0].find('.t-transfer__list-content .t-checkbox-group');
      const btns = transfer.findAll('button');
      const labels = checkboxGroup.findAll('label');
      labels.forEach((label) => {
        expect(label.classes()).toContain('t-is-disabled');
      });
      btns.forEach((label) => {
        expect(label.classes()).toContain('t-is-disabled');
      });
    });

    it(':empty', () => {
      const wrapper = mount(() => <Transfer data={data} empty="暂无可用数据" />);
      const transfer = wrapper.find('.t-transfer');
      const list = transfer.findAll('.t-transfer__list');
      expect(list[1].find('.t-transfer__empty').exists()).toBeTruthy();
      expect(list[1].find('.t-transfer__empty').text()).toBe('暂无可用数据');
    });

    it(':footer', () => {
      const slots = {
        footer: () => <div class="footer">footer</div>,
      };
      const wrapper = mount(() => <Transfer data={data} v-slots={slots} />);
      const list = wrapper.findAll('.t-transfer__list');
      expect(list[0].find('.footer').exists()).toBeTruthy();
      expect(list[0].find('.footer').text()).toBe('footer');
      expect(list[1].find('.footer').exists()).toBeTruthy();
      expect(list[1].find('.footer').text()).toBe('footer');
    });

    it(':title', () => {
      const slots = {
        title: () => <div class="title">title</div>,
      };
      const wrapper = mount(() => <Transfer data={data} v-slots={slots} />);
      const list = wrapper.findAll('.t-transfer__list .t-transfer__list-header');
      expect(list[0].find('.title').exists()).toBeTruthy();
      expect(list[0].find('.title').text()).toBe('title');
      expect(list[1].find('.title').exists()).toBeTruthy();
      expect(list[1].find('.title').text()).toBe('title');
    });

    it(':operation', () => {
      const operation = ['向左', '向右'];
      const wrapper = mount(() => <Transfer data={data} operation={operation} />);
      const operations = wrapper.find('.t-transfer__operations');
      const btns = operations.findAll('button');
      expect(btns[0].find('.t-button__text').text()).toBe('向右');
      expect(btns[1].find('.t-button__text').text()).toBe('向左');
    });

    it(':pagination', () => {
      const wrapper = mount(() => <Transfer data={data} pagination={pagination} />);
      const paginationDom = wrapper.find('.t-pagination');
      expect(paginationDom.exists()).toBeTruthy();
    });

    it(':search', () => {
      const wrapper = mount(() => <Transfer data={data} search />);
      const search = wrapper.findAll('.t-transfer__search-wrapper input');
      expect(search.length).toBe(2);
    });

    it(':showCheckAll', () => {
      const wrapper = mount(() => <Transfer data={data} search />);
      const checkAll = wrapper.findAll('.t-transfer__list-header .t-checkbox');
      expect(checkAll.length).toBe(2);
    });
  });

  describe(':events', () => {
    it(':onChange', async () => {
      const fn = vi.fn();
      const checked = ref(['1']);
      const wrapper = mount(() => <Transfer data={data} defaultChecked={checked.value} onChange={fn} />);
      const operations = wrapper.find('.t-transfer__operations');
      const btns = operations.findAll('button');
      await btns[0].trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onPageChange', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Transfer data={data} pagination={pagination} onPageChange={fn} />);
      const next = wrapper.find('.t-pagination__btn-next');
      await next.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onSearch', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Transfer data={data} search onSearch={fn} />);
      const input = wrapper.find('.t-transfer__search-wrapper input');
      await input.trigger('input');
      expect(fn).toBeCalled();
    });

    it(':onCheckedChange', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Transfer data={data} onCheckedChange={fn} />);
      const list = wrapper.findAll('.t-transfer__list');
      const input = list[0].findAll('.t-checkbox input');
      await input[0].trigger('change');
      expect(fn).toBeCalled();
    });

    it(':onScroll', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Transfer data={data} onScroll={fn} />);
      const list = wrapper.findAll('.t-transfer__list');
      const content = list[0].find('.t-transfer__list-content');
      await content.trigger('scroll');
      expect(fn).toBeCalled();
    });
  });
});
