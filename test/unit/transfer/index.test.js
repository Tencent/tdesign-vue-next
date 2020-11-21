import { mount } from '@vue/test-utils';
import Transfer from '@/src/transfer/index.ts';

const dataSource = [];
(() => {
  for (let i = 0; i < 20; i++) {
    dataSource.push({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      disabled: i % 3 < 1,
    });
  }
})();
const selectedKeys = [1, 3, 5, 6];
const targetKeys = [1, 3, 5, 6];
describe('Transfer', () => {
  // test for props
  describe(':Transfer:props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Transfer />;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });

    it(':dataSource', () => {
      const wrapper = mount({
        render() {
          return <Transfer dataSource={dataSource} />;
        },
      });
      expect(wrapper.vm.$el.getElementsByTagName('li').length).toBe(dataSource.length + 1);
    });

    it(':disabled', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Transfer disabled onClick={fn}></Transfer>;
        },
      });
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });

    it(':listStyle', () => {
      const wrapper = mount({
        render() {
          return <Transfer dataSource={dataSource} listStyle={{ height: '600px' }}></Transfer>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':operations', () => {
      const wrapper = mount({
        render() {
          return <Transfer dataSource={dataSource} operations={['>', '<']}></Transfer>;
        },
      });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.vm.$el.getElementsByTagName('i')[0].className.indexOf('t-icon-arrow-left')).toBe(true);
    });

    it(':selectedKeys', () => {
      const wrapper = mount({
        render() {
          return <Transfer dataSource={dataSource} selectedKeys={selectedKeys}></Transfer>;
        },
      });
      selectedKeys.forEach((i) => {
        expect(wrapper.vm.$el.getElementsByTagName('label')[i].className.indexOf('t-is-checked')).toBe(true);
      });
    });

    it(':showSearch', () => {
      const wrapper = mount({
        render() {
          return <Transfer dataSource={dataSource} showSearch={true}></Transfer>;
        },
      });
      expect(wrapper.vm.$el.getElementsByClassName('t-icon-search').length > 0).toBe(true);
    });

    it(':showSelectAll', () => {
      const wrapper = mount({
        render() {
          return <Transfer dataSource={dataSource} showSelectAll={true}></Transfer>;
        },
      });
      expect(
        wrapper.vm.$el
          .getElementsByClassName('t-checkbox')
          .some((item) => item.className.indexOf('t-is-checked') === -1),
      ).toBe(false);
    });

    it(':targetKeys', () => {
      const wrapper = mount({
        render() {
          return <Transfer dataSource={dataSource} targetKeys={targetKeys}></Transfer>;
        },
      });
      expect(
        wrapper.vm.$el
          .getElementsByClassName('t-transfer-list-right')
          .getElementsByTagName('span')
          .some((item, index) => {
            if (targetKeys.indexOf(index % 2)) {
              return item.textContent != targetKeys.indexOf(index % 2);
            }
          }),
      ).toBe(false);
    });
  });

  describe('@event', () => {
    it('@change', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Transfer onChange={fn} />;
        },
      });
      wrapper.find(Transfer).trigger('click');
      expect(fn).toHaveBeenCalled();
    });

    it('@change', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Transfer onChange={fn} selectedKeys={selectedKeys} />;
        },
      });
      wrapper.find(Transfer).trigger('add');
      expect(fn).toHaveBeenCalled();
      expect(
        wrapper.vm.$el
          .getElementsByClassName('t-transfer-list-right')
          .getElementsByTagName('span')
          .some((item, index) => {
            if (selectedKeys.indexOf(index % 2)) {
              return item.textContent != targetKeys.indexOf(index % 2);
            }
          }),
      ).toBe(false);
    });

    it('@search', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Transfer onSearch={fn} />;
        },
      });
      wrapper.find(Transfer).trigger('search');
      expect(fn).toHaveBeenCalled();
    });
  });
});
