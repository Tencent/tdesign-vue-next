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
      const wrapper = await mount({
        render() {
          return <Transfer data={data} pagination={pagination}></Transfer>;
        },
      });

      const len = wrapper.vm.$el.querySelectorAll('.t-transfer-list__item').length; // wrapper.vm.$el.getElementsByTagName('li').length
      expect(len).toBe(data.length);
      expect(wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled').length).toBe(7);
    });

    it(':checkedValue', async () => {
      const wrapper = await mount({
        render() {
          return <Transfer data={data} checkedValue={checkedValue} pagination={pagination} />;
        },
      });

      checkedValue.forEach((item) => {
        const i = Number(item);
        const domLi = wrapper.vm.$el.querySelectorAll('.t-transfer-list-source')[0].querySelectorAll('li');
        const [dom] = domLi[i].querySelectorAll('label');
        expect(dom.className.indexOf('t-is-checked') > -1).toBe(true);
      });
    });

    it(':targetValue', async () => {
      const wrapper = await mount({
        render() {
          return <Transfer data={data} targetValue={targetValue} pagination={pagination}></Transfer>;
        },
      });

      let count = 0;
      targetValue.forEach((item) => {
        const i = Number(item);
        const domLi = wrapper.vm.$el.querySelectorAll('.t-transfer-list-target')[0].querySelectorAll('li');
        const dom = domLi[count].querySelectorAll('span');
        expect(dom[2].innerHTML).toBe(`内容${i + 1}`);
        count = count + 1;
      });
    });

    it(':disabled', async () => {
      const fn = jest.fn();
      const wrapper = await mount({
        render() {
          return <Transfer data={data} disabled={true} checkChange={fn} pagination={pagination}></Transfer>;
        },
      });

      wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled')[0].click();
      expect(fn).not.toHaveBeenCalled();

      const doms = wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled');
      expect(doms.length).toBe(data.length + 2);
    });

    it(':search', async () => {
      const wrapper = await mount({
        render() {
          return <Transfer data={data} search={true}></Transfer>;
        },
      });
      expect(wrapper.vm.$el.getElementsByClassName('t-input__inner').length).toBe(2);
    });

    it(':titles', () => {
      const wrapper = mount(Transfer, {
        propsData: {
          titles: ['源列表', '目标列表'],
        },
      });
      const doms = wrapper.vm.$el.querySelectorAll('.t-transfer-list__header');
      expect(doms[0].lastChild.innerHTML === '源列表').toBe(true);
      expect(doms[1].lastChild.innerHTML === '目标列表').toBe(true);
    });

    it(':pagination', async () => {
      const pagConfig = {
        pageSize: 8,
        total: 20,
        current: 1,
      };
      const { pageSize } = pagConfig;
      const wrapper = await mount({
        render() {
          return <Transfer data={data} pagination={pagConfig}></Transfer>;
        },
      });
      const el = wrapper.vm.$el;

      const len = el.querySelectorAll('.t-transfer-list__item').length; // wrapper.vm.$el.getElementsByTagName('li').length
      expect(len).toBe(pageSize);
    });

    it(':empty', async () => {
      const empty = 'empty 空';
      const wrapper = await mount({
        render() {
          return <Transfer empty={empty}></Transfer>;
        },
      });
      expect(wrapper.vm.$el.getElementsByClassName('t-transfer-empty')[0].innerHTML === empty).toBe(true);
    });
  });

  describe(':slots', () => {
    it('footer', async () => {
      const wrapper = await mount({
        render() {
          return (
            <Transfer data={data}>
              <div slot="footer" slot-scope="props">
                <p style="padding: 10px;border-top: 1px solid #eee">source源</p>
              </div>
            </Transfer>
          );
        },
      });
      expect(wrapper.vm.$el.querySelector('.t-transfer-list-source').lastChild.querySelector('p').innerHTML).toBe('source源');
    });
  });

  describe('@event', () => {
    it('@oncheckChange', async () => {
      const fn = jest.fn();
      const wrapper = await mount({
        render() {
          return <Transfer data={data} pagination={pagination} oncheckChange={fn} />;
        },
      });
      wrapper.vm.$el.getElementsByClassName('t-checkbox')[2].click();

      await timeoutPromise(() => {
        expect(fn).toHaveBeenCalled();
        const doms = wrapper.vm.$el.getElementsByClassName('t-checkbox');
        expect(doms[2].className).toBe('t-checkbox t-is-checked');
      }, 1000);
    });

    it('@change', async () => {
      const fn = jest.fn();
      const wrapper = await mount({
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
