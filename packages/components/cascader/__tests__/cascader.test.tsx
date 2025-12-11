// @ts-nocheck
import { mount } from '@vue/test-utils';
import Cascader from '@tdesign/components/cascader';

const options = [
  {
    label: '选项一',
    value: '1',
    children: [
      {
        label: '子选项一',
        value: '1.1',
      },
      {
        label: '子选项二',
        value: '1.2',
      },
      {
        label: '子选项三',
        value: '1.3',
      },
    ],
  },
  {
    label: '选项二',
    value: '2',
    children: [
      {
        label: '子选项一',
        value: '2.1',
      },
      {
        label: '子选项二',
        value: '2.2',
      },
    ],
  },
];

// Options with children: true for lazy loading
const lazyLoadOptions = [
  {
    label: '选项一',
    value: '1',
    children: true,
  },
  {
    label: '选项二',
    value: '2',
    children: true,
  },
  {
    label: '选项三',
    value: '3',
  },
];

describe('Cascader', () => {
  describe(':base', () => {
    it(':render single', async () => {
      const wrapper = mount({
        render() {
          return <Cascader options={options} popupProps={{ visible: false }}></Cascader>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      const panelNode = document.querySelector('.t-cascader__panel');
      expect(wrapper.find('.t-cascader')).toBeTruthy();
      expect(wrapper.find('.t-cascader__panel')).toBeTruthy();
      expect(document.querySelectorAll('.t-cascader__menu').length).toBe(1);
      expect(document.querySelectorAll('.t-cascader__item').length).toBe(2);
      panelNode.parentNode.removeChild(panelNode);
    });

    it(':render multiple', async () => {
      const wrapper = mount({
        render() {
          return <Cascader options={options} multiple popupProps={{ visible: false }}></Cascader>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      const panelNode = document.querySelector('.t-cascader__panel');
      expect(wrapper.find('.t-cascader')).toBeTruthy();
      expect(wrapper.find('.t-cascader__panel')).toBeTruthy();
      expect(document.querySelectorAll('.t-cascader__menu').length).toBe(1);
      expect(document.querySelectorAll('.t-checkbox').length).toBe(2);
      panelNode.parentNode.removeChild(panelNode);
    });

    it(':render empty', async () => {
      const wrapper = mount({
        render() {
          return <Cascader options={options} multiple popupProps={{ visible: false }}></Cascader>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      const panelNode = document.querySelector('.t-cascader__panel');
      await wrapper.setProps({ options: [] });
      expect(wrapper.find('.t-cascader__panel--empty')).toBeTruthy();
      panelNode.parentNode.removeChild(panelNode);
    });

    it(':render disabled', async () => {
      const wrapper = mount({
        render() {
          return <Cascader disabled options={options}></Cascader>;
        },
      });
      expect(wrapper.find('.t-is-disabled').exists()).toBe(true);
    });
  });

  describe(':value', () => {
    it(':single', async () => {
      const wrapper = mount({
        render() {
          return <Cascader value={'1.1'} options={options} popupProps={{ visible: false }}></Cascader>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      const panelNode = document.querySelector('.t-cascader__panel');
      expect(document.querySelectorAll('.t-cascader__menu').length).toBe(2);
      expect(document.querySelectorAll('.t-cascader__item--with-icon').length).toBe(2);
      expect(document.querySelectorAll('.t-cascader__item--leaf').length).toBe(3);
      expect(document.querySelectorAll('.t-cascader__item').length).toBe(5);

      // // TODO: 跟进 tree 调整后出现空字符时子节点后渲染树节点的变化
      // await wrapper.setProps({ value: '' });
      // expect(document.querySelectorAll('.t-cascader__menu').length).toBe(1);
      // expect(document.querySelectorAll('.t-cascader__item--with-icon').length).toBe(2);
      // expect(document.querySelectorAll('.t-cascader__item--leaf').length).toBe(0);
      // expect(document.querySelectorAll('.t-cascader__item').length).toBe(2);
      panelNode.parentNode.removeChild(panelNode);
    });

    it(':multiple', async () => {
      const wrapper = mount({
        render() {
          return <Cascader value={['1.1']} multiple options={options} popupProps={{ visible: false }}></Cascader>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      const panelNode = document.querySelector('.t-cascader__panel');
      expect(document.querySelectorAll('.t-cascader__menu').length).toBe(2);
      expect(document.querySelectorAll('.t-cascader__item--with-icon').length).toBe(2);
      expect(document.querySelectorAll('.t-cascader__item--leaf').length).toBe(3);
      expect(document.querySelectorAll('.t-cascader__item').length).toBe(5);
      expect(document.querySelectorAll('.t-checkbox').length).toBe(5);

      // TODO: tree对空字符的处理逻辑
      // await wrapper.setProps({ value: [] });
      // expect(document.querySelectorAll('.t-cascader__menu').length).toBe(1);
      // expect(document.querySelectorAll('.t-tag').length).toBe(0);
      // expect(document.querySelectorAll('.t-cascader__item--with-icon').length).toBe(2);
      // expect(document.querySelectorAll('.t-cascader__item--leaf').length).toBe(0);
      // expect(document.querySelectorAll('.t-cascader__item').length).toBe(2);
      // expect(document.querySelectorAll('.t-checkbox').length).toBe(2);

      panelNode.parentNode.removeChild(panelNode);
    });
  });

  describe(':size', () => {
    ['small', 'large'].map((item) =>
      it(item, async () => {
        const wrapper = mount({
          render() {
            return <Cascader options={options} size={item} popupProps={{ visible: false }}></Cascader>;
          },
        });
        const sizeMap = {
          small: 's',
          medium: 'm',
          large: 'l',
        };
        await wrapper.setProps({ popupProps: { visible: true } });
        const panelNode = document.querySelector('.t-cascader__panel');
        expect(document.querySelectorAll(`.t-size-${sizeMap[item]}`).length).toBe(2);
        panelNode.parentNode.removeChild(panelNode);
      }),
    );
  });

  describe(':filter with lazy loading', () => {
    it('should filter options with children: true (lazy loading)', async () => {
      const wrapper = mount({
        render() {
          return <Cascader options={lazyLoadOptions} filterable popupProps={{ visible: false }}></Cascader>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      // Simulate input filter
      const inputNode = wrapper.find('input');
      await inputNode.setValue('选项一');

      // Wait for the component to update
      await wrapper.vm.$nextTick();

      const panelNode = document.querySelector('.t-cascader__panel');
      // Should find the option with children: true when filtering
      const items = document.querySelectorAll('.t-cascader__item');
      expect(items.length).toBe(1);
      expect(items[0].textContent).toContain('选项一');

      if (panelNode && panelNode.parentNode) {
        panelNode.parentNode.removeChild(panelNode);
      }
    });

    it('should filter option without children when filtering lazy load options', async () => {
      const wrapper = mount({
        render() {
          return <Cascader options={lazyLoadOptions} filterable popupProps={{ visible: false }}></Cascader>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      // Simulate input filter
      const inputNode = wrapper.find('input');
      await inputNode.setValue('选项三');

      // Wait for the component to update
      await wrapper.vm.$nextTick();

      const panelNode = document.querySelector('.t-cascader__panel');
      // Should find the option without children when filtering
      const items = document.querySelectorAll('.t-cascader__item');
      expect(items.length).toBe(1);
      expect(items[0].textContent).toContain('选项三');

      if (panelNode && panelNode.parentNode) {
        panelNode.parentNode.removeChild(panelNode);
      }
    });
  });
});
