import { mount } from '@vue/test-utils';
import Transfer from '@/src/transfer/index.ts';

const data = [];
(() => {
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i.toString(),
      title: `内容${i + 1}`,
      description: `第${i + 1}段信息`,
      disabled: i % 3 < 1,
    });
  }
})();

// const checkedValue = [1, 3, 5, 6];
// const targetValue = [1, 3, 5, 6];
describe('Transfer', () => {
  // test for props
  describe('Transfer:props', () => {
    it('empty', () => {
      const wrapper = mount(Transfer);
      expect(wrapper.isEmpty()).toBe(false);
    });

    it(':theme:default', () => {
      const wrapper = mount(Transfer, {
        propsData: {
          theme: 'primary',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':data', () => {
      const wrapper = mount(Transfer, {
        propsData: {
          data,
        },
      });
      const len = wrapper.vm.$el.getElementsByTagName('li').length; // wrapper.vm.$el.getElementsByTagName('li').length
      expect(len).toBe(data.length);
      expect(wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled').length).toBe(7);
    });

    it(':disabled', async () => {
      const fn = jest.fn();
      const wrapper = mount(Transfer, {
        propsData: {
          data,
          disabled: true,
        },
      });

      wrapper.setMethods({ checkChange: fn });
      await wrapper.trigger('checkChange');
      const doms = wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
      expect(doms.length).toBe(data.length);
    });

    // it(':listStyle', () => {
    //   const wrapper = mount({
    //     render() {
    //       return <Transfer data={data} listStyle={{ height: '600px' }}></Transfer>;
    //     },
    //   });
    //   expect(wrapper).toMatchSnapshot();
    // });

    // it(':operations', () => {
    //   const wrapper = mount({
    //     render() {
    //       return <Transfer data={data} operations={['>', '<']}></Transfer>;
    //     },
    //   });
    //   expect(wrapper).toMatchSnapshot();
    //   expect(wrapper.vm.$el.getElementsByTagName('i')[0].className.indexOf('t-icon-arrow-left')).toBe(true);
    // });

    // it(':checkedValue', () => {
    //   const wrapper = mount({
    //     render() {
    //       return <Transfer data={data} checkedValue={checkedValue}></Transfer>;
    //     },
    //   });
    //   checkedValue.forEach((i) => {
    //     expect(wrapper.vm.$el.getElementsByTagName('label')[i].className.indexOf('t-is-checked')).toBe(true);
    //   });
    // });

    // it(':showSearch', () => {
    //   const wrapper = mount({
    //     render() {
    //       return <Transfer data={data} showSearch={true}></Transfer>;
    //     },
    //   });
    //   expect(wrapper.vm.$el.getElementsByClassName('t-icon-search').length > 0).toBe(true);
    // });

    // it(':showSelectAll', () => {
    //   const wrapper = mount({
    //     render() {
    //       return <Transfer data={data} showSelectAll={true}></Transfer>;
    //     },
    //   });
    //   expect(wrapper.vm.$el.getElementsByClassName('t-checkbox').some(item => item.className.indexOf('t-is-checked') === -1)).toBe(false);
    // });

    // it(':targetValue', () => {
    //   const wrapper = mount({
    //     render() {
    //       return <Transfer data={data} targetValue={targetValue}></Transfer>;
    //     },
    //   });

    // expect(wrapper.vm.$el.getElementsByClassName('t-transfer-list-right').getElementsByTagName('span')
    //   .some((item, index) => {
    //     if (targetValue.indexOf(index % 2)) {
    //       return item.textContent !== targetValue.indexOf(index % 2);
    //     }
    //     return false;
    //   })).toBe(false);
    // });
  });

  // describe('@event', () => {
  //   it('@change', async () => {
  //     const fn = jest.fn();
  //     const wrapper = mount({
  //       render() {
  //         return <Transfer onChange={fn} />;
  //       },
  //     });

  //     wrapper.find(Transfer).trigger('click');
  //     expect(fn).toHaveBeenCalled();
  //   });

  //   it('@change', async () => {
  //     const fn = jest.fn();
  //     const wrapper = mount({
  //       render() {
  //         return <Transfer onChange={fn} checkedValue={checkedValue} />;
  //       },
  //     });

  //     wrapper.find(Transfer).trigger('add');
  //     expect(fn).toHaveBeenCalled();
  //     expect(wrapper.vm.$el.getElementsByClassName('t-transfer-list-right').getElementsByTagName('span')
  //       .some((item, index) => {
  //         if (checkedValue.indexOf(index % 2)) {
  //           return item.textContent !== targetValue.indexOf(index % 2);
  //         }
  //         return false;
  //       })).toBe(false);
  //   });

  //   it('@search', async () => {
  //     const fn = jest.fn();
  //     const wrapper = mount({
  //       render() {
  //         return <Transfer onSearch={fn} />;
  //       },
  //     });
  //     wrapper.find(Transfer).trigger('search');
  //     expect(fn).toHaveBeenCalled();
  //   });
  // });
});
