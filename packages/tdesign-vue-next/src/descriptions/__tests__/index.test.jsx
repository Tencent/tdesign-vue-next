import { expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Descriptions, { DescriptionsItem } from 'tdesign-vue-next';
import { getDescriptionsMount } from './mount';
import CustomComp from './custom-comp.vue';

const sizeList = ['small', 'medium', 'large'];
const layout = {
  H: 'horizontal',
  V: 'vertical',
};

describe('descriptions', () => {
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
      const wrapper = getDescriptionsMount({ layout: layout.H, column: 3 });
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
      const wrapper = getDescriptionsMount({ itemLayout: layout.V, column: 3 });
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

      const firstTrTd = firstTr.findAll('td')[7];
      // 检查第 1 个 tr 元素中的第 7 个 td 元素是否具有 colspan 属性，并检查其值是否为 1
      expect(firstTrTd.element.getAttribute('colspan')).toBe('1');
    });

    it(':items', () => {
      const items = [
        { label: 'Name', content: 'TDesign' },
        { label: 'Telephone Number', content: '139****0609' },
      ];
      const wrapper = mount({
        render() {
          return <Descriptions items={items} />;
        },
      });

      const tbody = wrapper.find('tbody');
      // 检查 tbody 下面是否只有 1 个 tr 元素
      expect(tbody.findAll('tr')).toHaveLength(1);

      const firstTr = tbody.findAll('tr')[0];
      // 检查第 1 个 tr 元素中是否只有 4 个 td 元素
      expect(firstTr.findAll('td')).toHaveLength(4);
    });

    it(':items:undefined:null', () => {
      const items = [
        { label: undefined, content: 'TDesign' },
        { label: 'Telephone Number', content: null },
      ];
      const wrapper = mount({
        render() {
          return <Descriptions items={items} />;
        },
      });

      const tbody = wrapper.find('tbody');
      const firstTr = tbody.findAll('tr')[0];
      // 检查 第 1 个 td 是否为空
      expect(firstTr.findAll('td')[0].text()).toBe('');

      // 检查 第 4 个 td 是否为空
      expect(firstTr.findAll('td')[3].text()).toBe('');
    });
  });

  describe(':slots', () => {
    it(':title', () => {
      const titleSlotsClassName = 'titleSlotsClassName';
      const titleContent = 'titleContent';
      const wrapper = mount({
        render() {
          return <Descriptions v-slots={{ title: () => <div class={titleSlotsClassName}>{titleContent}</div> }} />;
        },
      });
      const titleElement = wrapper.find(`.${titleSlotsClassName}`);
      expect(titleElement.exists()).toBeTruthy();
      expect(titleElement.text()).toBe(titleContent);
    });

    it(':label', () => {
      const labelSlotsClassName = 'labelSlotsClassName';
      const labelContent = 'labelContent';
      const wrapper = mount({
        render() {
          return (
            <Descriptions>
              <DescriptionsItem v-slots={{ label: () => <div class={labelSlotsClassName}>{labelContent}</div> }}>
                TDesign
              </DescriptionsItem>
            </Descriptions>
          );
        },
      });

      // 检查 label 是否正常渲染在单元格中
      const tbody = wrapper.find('tbody');
      const firstTr = tbody.findAll('tr')[0];
      const firstTrTd = firstTr.findAll('td')[0];

      // 检查元素是否正常渲染
      const labelElement = firstTrTd.find(`.${labelSlotsClassName}`);
      expect(labelElement.exists()).toBeTruthy();
      expect(labelElement.text()).toBe(labelContent);
    });

    it(':content', () => {
      const contentSlotsClassName = 'contentSlotsClassName';
      const contentContent = 'contentContent';
      const wrapper = mount({
        render() {
          return (
            <Descriptions>
              <DescriptionsItem
                label="Name"
                v-slots={{ content: () => <div class={contentSlotsClassName}>{contentContent}</div> }}
              />
            </Descriptions>
          );
        },
      });

      // 检查 content 是否正常渲染在单元格中
      const tbody = wrapper.find('tbody');
      const firstTr = tbody.findAll('tr')[0];
      const firstTrTd = firstTr.findAll('td')[1];

      // 检查元素是否正常渲染
      const labelElement = firstTrTd.find(`.${contentSlotsClassName}`);
      expect(labelElement.exists()).toBeTruthy();
      expect(labelElement.text()).toBe(contentContent);
    });
  });

  describe(':functions', () => {
    it(':renderCustomNode', () => {
      const label = 'Name';
      const items = [
        { label: () => label, content: 'TDesign' },
        { label: CustomComp, content: 'TDesign' },
        { label: [1, 2], content: 'TDesign' },
      ];
      const wrapper = mount({
        render() {
          return <Descriptions items={items} />;
        },
      });

      const tbody = wrapper.find('tbody');
      const firstTr = tbody.findAll('tr')[0];
      const secondTr = tbody.findAll('tr')[1];

      const firstTd = firstTr.findAll('td')[0];
      expect(firstTd.text()).toBe(label);

      const thirdTd = firstTr.findAll('td')[2];
      expect(thirdTd.text()).toBe('custom-comp');

      const secondTrFirstTd = secondTr.findAll('td')[0];
      expect(secondTrFirstTd.text()).toBe('12');
    });

    it(':renderVNodeTNode', () => {
      const wrapper = mount({
        render() {
          return (
            <Descriptions>
              <DescriptionsItem />
            </Descriptions>
          );
        },
      });

      const tbody = wrapper.find('tbody');
      const firstTr = tbody.findAll('tr')[0];
      const firstTrTd = firstTr.findAll('td')[0];

      expect(firstTrTd.text()).toBe('');
    });
  });
});
