import { mount } from '@vue/test-utils';
import Transfer from '@/src/transfer/index.ts';

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
  pageSize: 20,
  total: 20,
  current: 1,
};
const checkedValue = ['1', '2', '5'];
const targetValue = ['1'];

describe('Transfer', () => {
  // test for props
  describe('Props', () => {
    describe('checked', () => {
      it(':checked', async () => {
        const wrapper = await mount({
          render() {
            return <Transfer data={data} checked={checkedValue} pagination={pagination} />;
          },
        });
        await wrapper.vm.$nextTick();

        const domLabels = wrapper.vm.$el.querySelectorAll('.t-transfer__list-content')[0].querySelectorAll('label');

        checkedValue.forEach((item) => {
          const i = Number(item);
          const dom = domLabels[i];
          expect(dom.className.indexOf('t-is-checked') > -1).toBe(true);
        });
      });

      it(':checked.sync', async () => {
        const wrapper = mount({
          components: {
            Transfer,
          },
          template: `
            <Transfer :data="data" :checked.sync="checkedValue" />
          `,
          data() {
            return {
              data,
              checkedValue: ['1', '2', '5'],
            };
          },
        });
        await wrapper.vm.$nextTick();
        await wrapper.findAll('.t-checkbox-group input[type="checkbox"]').at(2).setChecked(false);
        expect(wrapper.vm.$data.checkedValue).toEqual(['1', '5']);
      });
    });

    describe('defaultChecked', () => {
      it(':defaultChecked', async () => {
        const wrapper = await mount({
          render() {
            return <Transfer data={data} defaultChecked={checkedValue} pagination={pagination} />;
          },
        });
        await wrapper.vm.$nextTick();
        const domLabels = wrapper.vm.$el.querySelectorAll('.t-transfer__list-content')[0].querySelectorAll('label');

        checkedValue.forEach((item) => {
          const i = Number(item);
          const dom = domLabels[i];
          expect(dom.className.indexOf('t-is-checked') > -1).toBe(true);
        });
      });
    });

    describe('data', () => {
      it('empty', () => {
        const wrapper = mount(Transfer);
        expect(wrapper.exists()).toBe(true);
      });

      it('data length', async () => {
        const wrapper = await mount({
          render() {
            return <Transfer data={data} pagination={pagination}></Transfer>;
          },
        });

        const len = wrapper.vm.$el.querySelectorAll('.t-transfer__list-item').length;
        expect(len).toBe(data.length);
        expect(wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled').length).toBe(8);
      });

      it('data label', async () => {
        const wrapper = await mount({
          render() {
            return <Transfer data={data} pagination={pagination}></Transfer>;
          },
        });

        wrapper.vm.$el.querySelectorAll('.t-transfer__list-item').forEach((el, index) => {
          expect(el.innerHTML.indexOf(data[index].label) > 0).toEqual(true);
        });
      });
    });

    describe('direction', () => {
      it('left', async () => {
        const wrapper = await mount({
          render() {
            return <Transfer data={data} checked={checkedValue} direction="left"></Transfer>;
          },
        });

        const [el] = wrapper.vm.$el.querySelectorAll('.t-transfer__operations button');
        expect([...el.classList]).toContain('t-is-disabled');
      });

      it('right', async () => {
        const wrapper = await mount({
          render() {
            return <Transfer data={data} checked={checkedValue} value={targetValue} direction="right"></Transfer>;
          },
        });

        const [, el] = wrapper.vm.$el.querySelectorAll('.t-transfer__operations button');
        expect([...el.classList]).toContain('t-is-disabled');
      });

      it('both', async () => {
        const wrapper = await mount({
          render() {
            return <Transfer data={data} checked={checkedValue} value={targetValue} direction="both"></Transfer>;
          },
        });

        const [right, left] = wrapper.vm.$el.querySelectorAll('.t-transfer__operations button');
        expect([...right.classList]).not.toContain('t-is-disabled');
        expect([...left.classList]).not.toContain('t-is-disabled');
      });
    });

    describe('disabled', () => {
      it(':disabled', async () => {
        const fn = vi.fn();
        const wrapper = await mount({
          render() {
            return <Transfer data={data} disabled={true} on-checked-change={fn} pagination={pagination}></Transfer>;
          },
        });

        wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled')[0].click();
        expect(fn).not.toHaveBeenCalled();

        const doms = wrapper.vm.$el.getElementsByClassName('t-checkbox t-is-disabled');
        expect(doms.length).toBe(data.length + 2);
      });
    });

    describe('empty', () => {
      it('没有数据~', async () => {
        const wrapper = await mount({
          render() {
            return <Transfer empty="没有数据~"></Transfer>;
          },
        });

        expect(wrapper.vm.$el.querySelector('.t-transfer__empty').innerHTML).toEqual('没有数据~');
      });

      it('function', async () => {
        // eslint-disable-next-line
        const empty = (h) => (
          <div>
            <button>数据为空</button>
          </div>
        );

        const wrapper = await mount({
          render() {
            return <Transfer empty={empty}></Transfer>;
          },
        });
        expect(wrapper.vm.$el.querySelector('.t-transfer__empty').outerHTML).toEqual(
          '<div class="t-transfer__empty"><div><button>数据为空</button></div></div>',
        );
      });
    });

    describe('footer', () => {
      it('function', async () => {
        const footer = (h, { type }) => h('div', `render footer: ${type}`);
        const wrapper = await mount({
          render() {
            return <Transfer footer={footer}></Transfer>;
          },
        });

        expect(wrapper.vm.$el.querySelector('.t-transfer__list-source > div:last-child').innerHTML).toEqual(
          'render footer: source',
        );
      });

      it('slot', async () => {
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
        expect(wrapper.vm.$el.querySelector('.t-transfer__list-source').lastChild.querySelector('p').innerHTML).toBe(
          'source源',
        );
      });
    });

    describe('keys', () => {
      const otherData = data.map((item) => ({
        name: item.label,
        key: item.value,
      }));
      let wrapper;

      beforeEach(async () => {
        wrapper = await mount({
          render() {
            return <Transfer data={otherData} keys={{ value: 'key', label: 'name' }}></Transfer>;
          },
        });
      });

      it('data length', async () => {
        const len = wrapper.vm.$el.querySelectorAll('.t-transfer__list-item').length;
        expect(len).toBe(otherData.length);
      });

      it('key label', async () => {
        wrapper.vm.$el.querySelectorAll('.t-transfer__list-item').forEach((el, index) => {
          expect(el.innerHTML.indexOf(otherData[index].name) > 0).toEqual(true);
        });
      });
    });

    describe('operation', () => {
      it('string', async () => {
        const operation = ['to left', 'to right'];
        const wrapper = await mount({
          render() {
            return <Transfer data={data} operation={operation}></Transfer>;
          },
        });

        expect(wrapper.vm.$el.querySelectorAll('.t-transfer__operations .t-button__text')[0].innerHTML).toEqual(
          'to right',
        );
      });

      it('function', async () => {
        const operation = (h, { direction }) => h('div', `go to ${direction}`);
        const wrapper = await mount({
          render() {
            return <Transfer operation={operation}></Transfer>;
          },
        });
        expect(wrapper.vm.$el.querySelector('.t-transfer__operations button').innerHTML).toEqual(
          '<span class="t-button__text"><div>go to right</div></span>',
        );
      });
    });

    describe('pagination', () => {
      it('pageSize', async () => {
        const pageConfig = {
          pageSize: 8,
          total: 20,
          current: 1,
        };
        const { pageSize } = pageConfig;
        const wrapper = await mount({
          render() {
            return <Transfer data={data} pagination={pageConfig}></Transfer>;
          },
        });
        const el = wrapper.vm.$el;

        const len = el.querySelectorAll('.t-transfer__list-item').length;
        expect(len).toBe(pageSize);
      });

      it('current', async () => {
        const pageConfig = {
          pageSize: 8,
          total: 20,
          current: 2,
        };
        const wrapper = await mount({
          render() {
            return <Transfer data={data} pagination={pageConfig}></Transfer>;
          },
        });

        const [el] = wrapper.vm.$el.querySelectorAll('.t-transfer__list-item');

        expect(el.querySelector('input').value).toBe(data[(pageConfig.current - 1) * pageConfig.pageSize].value);
      });
    });

    describe('search', () => {
      it(':search', async () => {
        const wrapper = await mount({
          render() {
            return <Transfer data={data} search={true}></Transfer>;
          },
        });
        expect(wrapper.vm.$el.getElementsByClassName('t-input__inner').length).toBe(2);
      });
    });

    describe('targetSort', () => {
      it('original', async () => {
        const wrapper = await mount({
          components: {
            Transfer,
          },
          template: `
          <Transfer :data="data" :checked="checkedValue" v-model="targetValue" />
          `,
          data() {
            return {
              data,
              checkedValue: ['2'],
              targetValue: ['1', '5'],
            };
          },
        });

        wrapper.vm.$el.querySelectorAll('.t-transfer__operations button')[0].click();
        expect(wrapper.vm.$data.targetValue).toEqual(['1', '2', '5']);

        await wrapper.vm.$nextTick();
        const targetColumn = wrapper.vm.$el.querySelectorAll(
          '.t-transfer__list-target .t-transfer__list-item input[type=checkbox]',
        );
        const targetColumnValues = Array.prototype.map.call(targetColumn, (item) => item.value);
        expect(targetColumnValues).toEqual(['1', '2', '5']);
      });

      it('push', async () => {
        const wrapper = await mount({
          components: {
            Transfer,
          },
          template: `
          <Transfer :data="data" :checked="checkedValue" targetSort="push" v-model="targetValue" />
          `,
          data() {
            return {
              data,
              checkedValue: ['2'],
              targetValue: ['1', '5'],
            };
          },
        });

        wrapper.vm.$el.querySelectorAll('.t-transfer__operations button')[0].click();
        expect(wrapper.vm.$data.targetValue).toEqual(['1', '5', '2']);

        await wrapper.vm.$nextTick();
        const targetColumn = wrapper.vm.$el.querySelectorAll(
          '.t-transfer__list-target .t-transfer__list-item input[type=checkbox]',
        );
        const targetColumnValues = Array.prototype.map.call(targetColumn, (item) => item.value);
        expect(targetColumnValues).toEqual(['1', '5', '2']);
      });

      it('unshift', async () => {
        const wrapper = await mount({
          components: {
            Transfer,
          },
          template: `
          <Transfer :data="data" :checked="checkedValue"  targetSort="unshift" v-model="targetValue" />
          `,
          data() {
            return {
              data,
              checkedValue: ['2'],
              targetValue: ['1', '5'],
            };
          },
        });

        wrapper.vm.$el.querySelectorAll('.t-transfer__operations button')[0].click();
        expect(wrapper.vm.$data.targetValue).toEqual(['2', '1', '5']);

        await wrapper.vm.$nextTick();
        const targetColumn = wrapper.vm.$el.querySelectorAll(
          '.t-transfer__list-target .t-transfer__list-item input[type=checkbox]',
        );
        const targetColumnValues = Array.prototype.map.call(targetColumn, (item) => item.value);
        expect(targetColumnValues).toEqual(['2', '1', '5']);
      });
    });

    describe('title', () => {
      it(':title', () => {
        const wrapper = mount(Transfer, {
          propsData: {
            title: ['源列表', '目标列表'],
          },
        });
        const doms = wrapper.vm.$el.querySelectorAll('.t-transfer__list-header');
        expect(doms[0].lastChild.innerHTML).toEqual('源列表');
        expect(doms[1].lastChild.innerHTML).toEqual('目标列表');
      });
    });

    describe('transferItem', () => {
      it('function', async () => {
        const transferItem = (h, { data }) => (
          <div class="transfer-item">
            {data.value}:{data.label}
          </div>
        );
        const wrapper = await mount({
          render() {
            return <Transfer data={data} transfer-item={transferItem}></Transfer>;
          },
        });

        const allTransferItem = wrapper.vm.$el.querySelectorAll(
          '.t-transfer__list-source .t-transfer__list-item .transfer-item',
        );

        allTransferItem.forEach((item, index) => {
          expect(item.innerHTML).toEqual(`${data[index].value}:${data[index].label}`);
        });
      });

      it('slot', async () => {
        const wrapper = await mount({
          components: {
            Transfer,
          },
          template: `
            <Transfer :data="data">
              <template v-slot:transferItem="transferItemProps">
                <div class="transfer-item">{{transferItemProps.data.value}}:{{transferItemProps.data.label}}</div>
              </template>
            </Transfer>
          `,
          data() {
            return {
              data,
            };
          },
        });

        const allTransferItem = wrapper.vm.$el.querySelectorAll(
          '.t-transfer__list-source .t-transfer__list-item .transfer-item',
        );

        allTransferItem.forEach((item, index) => {
          expect(item.innerHTML).toEqual(`${data[index].value}:${data[index].label}`);
        });
      });
    });

    describe('value', () => {
      it(':value', async () => {
        const wrapper = await mount({
          render() {
            return <Transfer data={data} value={targetValue} pagination={pagination}></Transfer>;
          },
        });

        let count = 0;
        const domLabels = wrapper.vm.$el
          .querySelectorAll('.t-transfer__list-target .t-transfer__list-content')[0]
          .querySelectorAll('.t-checkbox__label');

        targetValue.forEach((item) => {
          const i = Number(item);
          const dom = domLabels[count].querySelectorAll('span')[0];

          expect(dom.innerHTML).toBe(`内容${i + 1}`);
          count += 1;
        });
      });

      it('v-model', async () => {
        const wrapper = await mount({
          components: {
            Transfer,
          },
          template: `
          <Transfer :data="data" :checked="checkedValue" v-model="targetValue" />
          `,
          data() {
            return {
              data,
              checkedValue: ['2'],
              targetValue: ['1', '5'],
            };
          },
        });

        wrapper.vm.$el.querySelectorAll('.t-transfer__operations button')[0].click();
        expect(wrapper.vm.$data.targetValue).toEqual(['1', '2', '5']);
      });
    });
  });

  describe('Events', () => {
    it('onChange', async () => {
      const fn = vi.fn();
      const wrapper = await mount({
        render() {
          return <Transfer data={data} pagination={pagination} checked={checkedValue} onChange={fn} />;
        },
      });

      wrapper.vm.$el.querySelectorAll('.t-transfer__operations button')[0].click();

      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled();
      expect(fn.mock.calls[0][0]).toEqual(checkedValue);
      expect(fn.mock.calls[0][1]).toEqual({
        type: 'target',
        movedValue: checkedValue,
      });
    });

    describe('checked-change', () => {
      it('onCheckedChange', async () => {
        const fn = vi.fn();
        const wrapper = mount({
          render() {
            return <Transfer data={data} value={targetValue} pagination={pagination} on-checked-change={fn} />;
          },
        });
        const sourceCheckboxes = wrapper.findAll('.t-transfer__list-source .t-checkbox-group input[type="checkbox"]');
        await sourceCheckboxes.at(3).setChecked();
        const targetSourceCheckboxes = wrapper.findAll(
          '.t-transfer__list-target .t-checkbox-group input[type="checkbox"]',
        );
        await targetSourceCheckboxes.at(0).setChecked();
        expect(fn).toHaveBeenCalledTimes(2);

        expect(fn.mock.calls[0][0]).toEqual({
          checked: ['4'],
          sourceChecked: ['4'],
          targetChecked: [],
          type: 'source',
        });
        expect(fn.mock.calls[1][0]).toEqual({
          checked: ['4', '1'],
          sourceChecked: ['4'],
          targetChecked: ['1'],
          type: 'target',
        });
      });
    });
  });
});
