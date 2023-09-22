/* eslint-disable vue/order-in-components */
import { mount } from '@vue/test-utils';
import Tree from '@/src/tree/index.ts';
import { defineComponent } from './adapt';

describe('Tree:props:events', () => {
  vi.useRealTimers();
  describe('event:active', () => {
    it('onActive 回调可触发', () =>
      new Promise((resolve) => {
        const data = [{ value: 't1' }, { value: 't2' }];
        mount(
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
              ':onActive="onActive"',
              '></Tree>',
            ].join(' '),
            data() {
              return {
                items: data,
              };
            },
            mounted() {
              this.$refs.tree.setItem('t2', {
                actived: true,
              });
            },
            methods: {
              onActive(actived, context) {
                expect(actived.length).toBe(1);
                expect(actived[0]).toBe('t2');
                expect(context.node.value).toBe('t2');
                resolve();
              },
            },
          }),
        );
      }, 10));

    it('active 事件可触发', () =>
      new Promise((resolve) => {
        const data = [{ value: 't1' }, { value: 't2' }];
        mount(
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
            mounted() {
              this.$refs.tree.setItem('t2', {
                actived: true,
              });
            },
            methods: {
              onActive(actived, context) {
                expect(actived.length).toBe(1);
                expect(actived[0]).toBe('t2');
                expect(context.node.value).toBe('t2');
                resolve();
              },
            },
          }),
        );
      }, 10));
  });

  describe('event:expand', () => {
    it('onExpand 回调可触发', () =>
      new Promise((resolve) => {
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

        mount(
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
            mounted() {
              this.$refs.tree.setItem('t2', {
                expanded: true,
              });
            },
            methods: {
              onExpand(expanded, context) {
                expect(expanded.length).toBe(1);
                expect(expanded[0]).toBe('t2');
                expect(context.node.value).toBe('t2');
                resolve();
              },
            },
          }),
        );
      }, 10));

    it('expand 事件可触发', () =>
      new Promise((resolve) => {
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

        mount(
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
            mounted() {
              this.$refs.tree.setItem('t2', {
                expanded: true,
              });
            },
            methods: {
              onExpand(expanded, context) {
                expect(expanded.length).toBe(1);
                expect(expanded[0]).toBe('t2');
                expect(context.node.value).toBe('t2');
                resolve();
              },
            },
          }),
        );
      }, 10));
  });

  describe('event:change', () => {
    it('onChange 回调可触发', () =>
      new Promise((resolve) => {
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
        const onChange = (checked, context) => {
          expect(checked.length).toBe(1);
          expect(checked[0]).toBe('t2.1');
          expect(context.node.value).toBe('t2');
          resolve();
        };
        mount({
          mounted() {
            this.$refs.tree.setItem('t2', {
              checked: true,
            });
          },
          render() {
            return <Tree ref="tree" transition={false} data={data} checkable onChange={onChange}></Tree>;
          },
        });
      }, 10));
  });

  describe('event:load', () => {
    it('onLoad 回调可触发', () =>
      new Promise((itResolve) => {
        const data = [
          {
            label: '1',
            value: 't1',
            children: true,
          },
        ];

        const loadedValues = [];
        const onLoad = (context) => {
          // 这个事件会被触发多次
          loadedValues.push(context.node.value);
        };

        setTimeout(() => {
          expect(loadedValues[0]).toBe('t1');
          itResolve();
        }, 10);

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
      }, 20));
  });
});
