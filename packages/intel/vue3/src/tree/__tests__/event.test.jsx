/* eslint-disable vue/order-in-components */
import { mount } from '@vue/test-utils';
import Tree from 'tdesign-vue-next'
import { defineComponent } from './adapt';
import { delay, step } from './kit';

// 2023.09.27 测试逻辑变更
// 直接操作数据的动作，不再触发 onChange, onActive, onExpand 事件
// 仅用户操作视图时的点击等动作，会触发 onChange, onActive, onExpand 事件

describe('Tree:props:events', () => {
  vi.useRealTimers();
  describe('event:active', () => {
    it('onActive 回调可触发', async () => {
      const data = [{ value: 't1' }, { value: 't2' }];
      const step1 = step();
      let rsActived = [];
      let rsContext = null;
      const wrapper = mount(
        // eslint-disable-next-line vue/one-component-per-file
        defineComponent({
          components: {
            Tree,
          },
          // 使用 template 写法是为了 vue2, vue3 统一测试用例
          template: [
            '<Tree',
            ':transition="false"',
            'ref="tree"',
            ':data="items"',
            'activable',
            ':onActive="onActive"',
            '></Tree>',
          ].join(' '),
          data() {
            return {
              items: data,
            };
          },
          methods: {
            onActive(actived, context) {
              rsActived = actived;
              rsContext = context;
              step1.ready();
            },
          },
        }),
      );

      await delay(1);
      wrapper.find('[data-value="t2"] .t-tree__label').trigger('click');
      await step1;

      expect(rsActived.length).toBe(1);
      expect(rsActived[0]).toBe('t2');
      expect(rsContext.node.value).toBe('t2');
      expect(rsContext.node.actived).toBe(true);
    }, 300);

    it('active 事件可触发', async () => {
      const data = [{ value: 't1' }, { value: 't2' }];
      const step1 = step();
      let rsActived = [];
      let rsContext = null;
      const wrapper = mount(
        // eslint-disable-next-line vue/one-component-per-file
        defineComponent({
          components: {
            Tree,
          },
          template: [
            '<Tree',
            ':transition="false"',
            'ref="tree"',
            ':data="items"',
            'activable',
            '@active="onActive"',
            '></Tree>',
          ].join(' '),
          data() {
            return {
              items: data,
            };
          },
          methods: {
            onActive(actived, context) {
              rsActived = actived;
              rsContext = context;
              step1.ready();
            },
          },
        }),
      );

      await delay(1);
      wrapper.find('[data-value="t2"] .t-tree__label').trigger('click');
      await step1;

      expect(rsActived.length).toBe(1);
      expect(rsActived[0]).toBe('t2');
      expect(rsContext.node.value).toBe('t2');
      expect(rsContext.node.actived).toBe(true);
    }, 300);
  });

  describe('event:expand', () => {
    it('onExpand 回调可触发', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
          ],
        },
        {
          value: 't2',
          children: [
            {
              value: 't2.1',
            },
          ],
        },
      ];

      const step1 = step();
      let rsExpanded = [];
      let rsContext = null;
      const wrapper = mount(
        // eslint-disable-next-line vue/one-component-per-file
        defineComponent({
          components: {
            Tree,
          },
          template: [
            '<Tree',
            ':transition="false"',
            'ref="tree"',
            ':data="items"',
            ':onExpand="onExpand"',
            '></Tree>',
          ].join(' '),
          data() {
            return {
              items: data,
            };
          },
          methods: {
            onExpand(expanded, context) {
              rsExpanded = expanded;
              rsContext = context;
              step1.ready();
            },
          },
        }),
      );

      await delay(1);
      wrapper.find('[data-value="t2"] .t-tree__icon').trigger('click');
      await step1;

      expect(rsExpanded.length).toBe(1);
      expect(rsExpanded[0]).toBe('t2');
      expect(rsContext.node.value).toBe('t2');
      expect(rsContext.node.expanded).toBe(true);
    }, 300);

    it('expand 事件可触发', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
          ],
        },
        {
          value: 't2',
          children: [
            {
              value: 't2.1',
            },
          ],
        },
      ];

      const step1 = step();
      let rsExpanded = [];
      let rsContext = null;
      const wrapper = mount(
        // eslint-disable-next-line vue/one-component-per-file
        defineComponent({
          components: {
            Tree,
          },
          template: [
            '<Tree',
            ':transition="false"',
            'ref="tree"',
            ':data="items"',
            '@expand="onExpand"',
            '></Tree>',
          ].join(' '),
          data() {
            return {
              items: data,
            };
          },
          methods: {
            onExpand(expanded, context) {
              rsExpanded = expanded;
              rsContext = context;
              step1.ready();
            },
          },
        }),
      );

      await delay(1);
      wrapper.find('[data-value="t2"] .t-tree__icon').trigger('click');
      await step1;

      expect(rsExpanded.length).toBe(1);
      expect(rsExpanded[0]).toBe('t2');
      expect(rsContext.node.value).toBe('t2');
      expect(rsContext.node.expanded).toBe(true);
    }, 300);
  });

  describe('event:change', async () => {
    it('onChange 回调可触发', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
          ],
        },
        {
          value: 't2',
          children: [
            {
              value: 't2.1',
            },
          ],
        },
      ];

      const step1 = step();
      let rsValue = [];
      let rsContext = null;
      const wrapper = mount(
        // eslint-disable-next-line vue/one-component-per-file
        defineComponent({
          components: {
            Tree,
          },
          template: [
            '<Tree',
            'ref="tree"',
            ':transition="false"',
            ':data="items"',
            'checkable',
            ':onChange="onChange"',
            '></Tree>',
          ].join(' '),
          data() {
            return {
              items: data,
            };
          },
          methods: {
            onChange(value, context) {
              rsValue = value;
              rsContext = context;
              step1.ready();
            },
          },
        }),
      );

      await delay(1);
      wrapper.find('[data-value="t2"] input[type="checkbox"]').setChecked();
      await step1;

      expect(rsValue.length).toBe(1);
      expect(rsValue[0]).toBe('t2.1');
      expect(rsContext.node.value).toBe('t2');
      expect(rsContext.node.checked).toBe(true);
    }, 300);

    it('change 事件可触发', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
          ],
        },
        {
          value: 't2',
          children: [
            {
              value: 't2.1',
            },
          ],
        },
      ];

      const step1 = step();
      let rsValue = [];
      let rsContext = null;
      const wrapper = mount(
        // eslint-disable-next-line vue/one-component-per-file
        defineComponent({
          components: {
            Tree,
          },
          template: [
            '<Tree',
            'ref="tree"',
            ':transition="false"',
            ':data="items"',
            'checkable',
            '@change="onChange"',
            '></Tree>',
          ].join(' '),
          data() {
            return {
              items: data,
            };
          },
          methods: {
            onChange(value, context) {
              rsValue = value;
              rsContext = context;
              step1.ready();
            },
          },
        }),
      );

      await delay(1);
      wrapper.find('[data-value="t2"] input[type="checkbox"]').setChecked();
      await step1;

      expect(rsValue.length).toBe(1);
      expect(rsValue[0]).toBe('t2.1');
      expect(rsContext.node.value).toBe('t2');
      expect(rsContext.node.checked).toBe(true);
    }, 300);
  });

  describe('event:load', () => {
    it('onLoad 回调可触发', async () => {
      const data = [
        {
          label: '1',
          value: 't1',
          children: true,
        },
      ];

      const step1 = step();
      const loadedValues = [];
      const onLoad = (context) => {
        // 这个事件会被触发多次
        loadedValues.push(context.node.value);
        step1.ready();
      };

      const loadData = (node) =>
        new Promise((resolve) => {
          setTimeout(() => {
            let nodes = [];
            if (node.level < 1) {
              nodes = [
                {
                  value: `${node.value}.1`,
                  label: `${node.label}.1`,
                  children: true,
                },
              ];
            }
            resolve(nodes);
          }, 1);
        });

      mount({
        render() {
          return (
            <Tree
              ref="tree"
              transition={false}
              data={data}
              expand-all
              lazy={false}
              load={loadData}
              onLoad={onLoad}
            ></Tree>
          );
        },
      });

      await delay(1);
      await step1;
      expect(loadedValues[0]).toBe('t1');
    }, 300);
  });
});
