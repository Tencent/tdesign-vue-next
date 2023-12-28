import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { vi, it, expect } from 'vitest';
import Descriptions from '@/src/descriptions/index.ts';
import { getDescriptionsMount } from './mount';

const sizeList = ['small', 'medium', 'large'];
const layout = {
  H: 'horizontal',
  V: 'vertical',
};

describe('Descriptions', () => {
  describe(':props', () => {
    it(':bordered', () => {
      const wrapper = getDescriptionsMount({ bordered: true });
      expect(wrapper.find('.t-descriptions__body.t-descriptions__body--border').exists()).toBeTruthy();
    });

    it(':colon', () => {
      const wrapper = getDescriptionsMount({ colon: true });
      const label = wrapper.find('.t-descriptions__label');
      expect(label.text()).toMatch(/:$/);
    });

    it(':size', () => {
      sizeList.forEach((size) => {
        const wrapper = getDescriptionsMount({ size });
        const body = wrapper.find('.t-descriptions__body');
        expect(body.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });

    it(':layout:horizontal', () => {
      const wrapper = getDescriptionsMount({ layout: layout.H });
      const tbody = wrapper.find('tbody');
      // 检查 tbody 下面是否只有 2 个 tr 元素
      expect(tbody.findAll('tr')).toHaveLength(2);

      const firstTr = tbody.findAll('tr')[0];
      // 检查第 1 个 tr 元素中是否只有 6 个 td 元素
      expect(firstTr.findAll('td')).toHaveLength(6);

      const secondTr = tbody.findAll('tr')[1];
      // 检查第 2 个 tr 元素中是否只有 2 个 td 元素
      expect(secondTr.findAll('td')).toHaveLength(2);

      const secondTrTd = secondTr.findAll('td')[1];
      // 检查第 2 个 tr 元素中的第 2 个 td 元素是否具有 colspan 属性，并检查其值是否为 5
      expect(secondTrTd.element.getAttribute('colspan')).toBe('5');
    });

    it(':layout:vertical', () => {
      const wrapper = getDescriptionsMount({ layout: layout.V });
      const tbody = wrapper.find('tbody');
      // 检查 tbody 下面是否只有 4 个 tr 元素
      expect(tbody.findAll('tr')).toHaveLength(4);

      const firstTr = tbody.findAll('tr')[0];
      // 检查第 1 个 tr 元素中是否只有 2 个 td 元素
      expect(firstTr.findAll('td')).toHaveLength(2);

      const thirdTr = tbody.findAll('tr')[2];
      // 检查第 3 个 tr 元素中是否只有 2 个 td 元素
      expect(thirdTr.findAll('td')).toHaveLength(2);

      const thirdTrTd = thirdTr.findAll('td')[0];
      // 检查第 3 个 tr 元素中的第 1 个 td 元素是否具有 colspan 属性，并检查其值是否为 1
      expect(thirdTrTd.element.getAttribute('colspan')).toBe('1');
    });

    it(':itemLayout:vertical', () => {
      const wrapper = getDescriptionsMount({ itemLayout: layout.V });
      const tbody = wrapper.find('tbody');
      // 检查 tbody 下面是否只有 4 个 tr 元素
      expect(tbody.findAll('tr')).toHaveLength(4);

      const firstTr = tbody.findAll('tr')[0];
      // 检查第 1 个 tr 元素中是否只有 3 个 td 元素
      expect(firstTr.findAll('td')).toHaveLength(3);

      const thirdTr = tbody.findAll('tr')[2];
      // 检查第 3 个 tr 元素中是否只有 1 个 td 元素
      expect(thirdTr.findAll('td')).toHaveLength(1);

      const thirdTrTd = thirdTr.findAll('td')[0];
      // 检查第 3 个 tr 元素中的第 1 个 td 元素是否具有 colspan 属性，并检查其值是否为 3
      expect(thirdTrTd.element.getAttribute('colspan')).toBe('3');
    });

    it(':layout:vertical:itemLayout:vertical', () => {
      const wrapper = getDescriptionsMount({ layout: layout.V, itemLayout: layout.V });
      const tbody = wrapper.find('tbody');
      // 检查 tbody 下面是否只有 8 个 tr 元素
      expect(tbody.findAll('tr')).toHaveLength(8);

      const firstTr = tbody.findAll('tr')[0];
      // 检查第 1 个 tr 元素中是否只有 1 个 td 元素
      expect(firstTr.findAll('td')).toHaveLength(1);

      const thirdTr = tbody.findAll('tr')[2];
      // 检查第 7 个 tr 元素中是否只有 1 个 td 元素
      expect(thirdTr.findAll('td')).toHaveLength(1);

      const thirdTrTd = thirdTr.findAll('td')[0];
      // 检查第 7 个 tr 元素中的第 1 个 td 元素是否具有 colspan 属性，并检查其值是否为 1
      expect(thirdTrTd.element.getAttribute('colspan')).toBe('1');
    });

    it(':column:2', () => {
      const wrapper = getDescriptionsMount({ column: 2 });
      const tbody = wrapper.find('tbody');
      // 检查 tbody 下面是否只有 2 个 tr 元素
      expect(tbody.findAll('tr')).toHaveLength(2);

      const secondTr = tbody.findAll('tr')[1];
      // 检查第 2 个 tr 元素中是否只有 4 个 td 元素
      expect(secondTr.findAll('td')).toHaveLength(4);

      const secondTrTd = secondTr.findAll('td')[3];
      // 检查第 2 个 tr 元素中的第 4 个 td 元素是否具有 colspan 属性，并检查其值是否为 1
      expect(secondTrTd.element.getAttribute('colspan')).toBe('1');
    });

    it(':column:4', () => {
      const wrapper = getDescriptionsMount({ column: 4 });
      const tbody = wrapper.find('tbody');
      // 检查 tbody 下面是否只有 1 个 tr 元素
      expect(tbody.findAll('tr')).toHaveLength(1);

      const firstTr = tbody.findAll('tr')[0];
      // 检查第 1 个 tr 元素中是否只有 8 个 td 元素
      expect(firstTr.findAll('td')).toHaveLength(8);

      const firstTrTd = secondTr.findAll('td')[7];
      // 检查第 1 个 tr 元素中的第 7 个 td 元素是否具有 colspan 属性，并检查其值是否为 1
      expect(firstTrTd.element.getAttribute('colspan')).toBe('1');
    });
  });
});
