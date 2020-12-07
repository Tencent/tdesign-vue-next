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

const timeoutPromise = (cb, timeout = 80) => new Promise((resolve) => {
  setTimeout(() => {
    cb && cb();
    resolve();
  }, timeout);
});

const pagination = {
  pageSize: 20,
  total: 20,
  current: 1,
};
const checkedValue = ['1', '2', '5'];
const targetValue = ['1'];
describe('Transfer', () => {
  // test for props
  describe('Transfer:props', () => {
    it('empty', () => {
      const wrapper = mount(Transfer);
      expect(wrapper.isEmpty()).toBe(false);
    });

    it(':data', async () => {
      const wrapper = mount({
        render() {
          return <Transfer data={data} pagination={pagination}></Transfer>;
        },
      });
      await timeoutPromise(() => {
        const len = wrapper.vm.$el.getElementsByTagName('li').length; // wrapper.vm.$el.getElementsByTagName('li').length
        expect(len).toBe(data.length);
        expect(wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled').length).toBe(7);
      });
    });

    it(':checkedValue', async () => {
      const wrapper = mount({
        render() {
          return <Transfer data={data} checkedValue={checkedValue} pagination={pagination} />;
        },
      });

      await timeoutPromise(() => {
        checkedValue.forEach((item) => {
          const i = Number(item);
          const domLi = wrapper.vm.$el.querySelectorAll('.t-transfer-list-source')[0].querySelectorAll('li');
          const [dom] = domLi[i].querySelectorAll('label');
          expect(dom.className.indexOf('t-is-checked') > -1).toBe(true);
        });
      });
    });

    it(':targetValue', async () => {
      const wrapper = mount({
        render() {
          return <Transfer data={data} targetValue={targetValue} pagination={pagination}></Transfer>;
        },
      });

      await timeoutPromise(() => {
        let count = 0;
        targetValue.forEach((item) => {
          const i = Number(item);
          const domLi = wrapper.vm.$el.querySelectorAll('.t-transfer-list-target')[0].querySelectorAll('li');
          const dom = domLi[count].querySelectorAll('span');
          expect(dom[2].innerHTML).toBe(`内容${i + 1}`);
          count = count + 1;
        });
      });
    });

    it(':disabled', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Transfer data={data} disabled={true} checkChange={fn} pagination={pagination}></Transfer>;
        },
      });

      await timeoutPromise(() => {
        wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled')[0].click();
        expect(fn).not.toHaveBeenCalled();

        const doms = wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled');
        expect(doms.length).toBe(data.length + 2);
      });
    });

    it(':search', () => {
      const wrapper = mount(Transfer, {
        propsData: {
          search: false,
        },
      });
      expect(wrapper.vm.$el.getElementsByClassName('t-input__inner').length).toBe(0);

      const wrapper2 = mount(Transfer, {
        propsData: {
          search: true,
        },
      });
      expect(wrapper2.vm.$el.getElementsByClassName('t-input__inner').length).toBe(2);
    });

    it(':empty', () => {
      const empty = 'empty 空';
      const wrapper = mount(Transfer, {
        propsData: {
          empty,
        },
      });
      expect(wrapper.vm.$el.getElementsByClassName('t-transfer-empty')[0].innerHTML === empty).toBe(true);
    });
  });

  describe('@event', () => {
    it('@oncheckChange', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Transfer data={data} pagination={pagination} oncheckChange={fn} />;
        },
      });
      wrapper.vm.$el.getElementsByClassName('t-checkbox')[2].click();

      await timeoutPromise(() => {
        expect(fn).toHaveBeenCalled();
        const doms = wrapper.vm.$el.getElementsByClassName('t-checkbox');
        expect(doms[2].className).toBe('t-checkbox t-is-checked');
      }, 2000);
    });

    it('@change', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return (
            <Transfer
              data={data}
              pagination={pagination}
              checkedValue={checkedValue}
              onChange={fn}
              checkedValue={checkedValue}
              change={fn}
            />
          );
        },
      });

      await timeoutPromise(async () => {
        wrapper.vm.$el.getElementsByClassName('t-button t-button--primary t-button--icon-only')[0].click();

        await timeoutPromise(() => {
          expect(fn).toHaveBeenCalled();
          let count = 0;
          checkedValue.forEach((item) => {
            const i = Number(item);
            const domLi = wrapper.vm.$el.querySelectorAll('.t-transfer-list-target')[0].querySelectorAll('li');
            const doms = domLi[count].querySelectorAll('span');
            expect(doms[2].innerHTML).toBe(`内容${i + 1}`);
            expect(domLi.length).toBe(checkedValue.length);
            count = count + 1;
          });
        });
      });
    });
  });
});
