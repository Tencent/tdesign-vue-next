import { mount } from '@vue/test-utils';
import { AutoComplete } from 'tdesign-vue-next';

const options = ['第一个默认联想词', '第二个默认联想词', '第三个默认联想词'];
describe('anchor', () => {
  describe(':base', () => {
    it('render', async () => {
      const wrapper = mount({
        render() {
          return <AutoComplete popupProps={{ visible: false }} options={options}></AutoComplete>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      expect(wrapper.find('.t-auto-complete').exists()).toBeTruthy();
      const panelNode = document.querySelector('.t-autocomplete__panel');
      expect(document.querySelectorAll('.t-select-option').length).toBe(3);
      expect(document.querySelector('.t-autocomplete__panel')).toBeTruthy();
      panelNode.parentNode.removeChild(panelNode);
    });
  });

  describe(':highlightKeyword', () => {
    it('render', async () => {
      const wrapper = mount({
        render() {
          return <AutoComplete value="默认联想词" popupProps={{ visible: false }} options={options}></AutoComplete>;
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });

      const optionsNode = document.querySelector('.t-select-option');
      expect(optionsNode.querySelector('b').innerHTML).toBe('默认联想词');
    });
  });

  describe(':disabled', () => {
    it('render', () => {
      const wrapper = mount({
        render() {
          return <AutoComplete disabled value="默认联想词" options={options}></AutoComplete>;
        },
      });
      const inputDom = wrapper.find('.t-input');
      expect(inputDom.classes('t-is-disabled')).toBeTruthy();
    });
  });

  describe(':placeholder', () => {
    it('render', async () => {
      const wrapper = mount({
        render() {
          return <AutoComplete placeholder="请输入关键词搜索" options={options}></AutoComplete>;
        },
      });

      const input = wrapper.find('.t-input input');
      expect(input.element.getAttribute('placeholder')).toBe('请输入关键词搜索');
    });
  });
});
