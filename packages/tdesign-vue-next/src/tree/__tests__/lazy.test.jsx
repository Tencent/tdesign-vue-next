import { mount } from '@vue/test-utils';
import { Tree } from 'tdesign-vue-next';
import { delay, step } from './kit';

describe('tree:lazy-load', () => {
  vi.useRealTimers();
  describe('props.load', () => {
    it('可以定义 load 方法延迟加载数据', async () => {
      const data = [
        {
          value: 't1',
          children: true,
        },
      ];

      let wrapper = null;
      const pm = new Promise((resolve) => {
        let loadIndex = 0;
        wrapper = mount({
          data() {
            return {
              data,
            };
          },
          methods: {
            async load(node) {
              await delay(10);
              let nodes = [];
              if (node.level < 2) {
                nodes = [
                  {
                    value: `${node.value}.1`,
                    children: true,
                  },
                  {
                    value: `${node.value}.2`,
                    children: true,
                  },
                ];
              }
              return nodes;
            },
            onLoad() {
              loadIndex += 1;
              if (loadIndex >= 7) {
                resolve();
              }
            },
          },
          render() {
            return (
              <Tree
                data={this.data}
                expandAll
                load={this.load}
                onLoad={this.onLoad}
                lazy={false}
                transition={false}
              >
              </Tree>
            );
          },
        });
      });
      await pm;
      await delay(1);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1.1.1"]').exists()).toBe(false);
      expect(wrapper.find('[data-value="t1.2.2"]').exists()).toBe(true);
    });

    it('延迟加载的节点，也能响应预设的 value', async () => {
      const data = [
        {
          value: 't1',
          children: true,
        },
      ];

      let wrapper = null;
      let loadIndex = 0;
      const pm = new Promise((resolve) => {
        wrapper = mount({
          data() {
            return {
              data,
              value: ['t1.1.1'],
            };
          },
          methods: {
            async load(node) {
              await delay(10);
              let nodes = [];
              if (node.level < 2) {
                nodes = [
                  {
                    value: `${node.value}.1`,
                    children: true,
                  },
                  {
                    value: `${node.value}.2`,
                    children: true,
                  },
                ];
              }
              return nodes;
            },
            onLoad() {
              loadIndex += 1;
              if (loadIndex >= 7) {
                resolve();
              }
            },
          },
          render() {
            return (
              <Tree
                data={this.data}
                value={this.value}
                load={this.load}
                onLoad={this.onLoad}
                expandAll
                checkable
                lazy={false}
                transition={false}
              >
              </Tree>
            );
          },
        });
      });

      await pm;
      await delay(1);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(true);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-indeterminate')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1.1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
    });

    it('checkStrictly 为 true 时，延迟加载的节点状态不影响上游节点', async () => {
      const data = [
        {
          value: 't1',
          children: true,
        },
      ];

      let wrapper = null;
      let loadIndex = 0;
      const pm = new Promise((resolve) => {
        wrapper = mount({
          data() {
            return {
              data,
              value: ['t1.1.1'],
            };
          },
          methods: {
            async load(node) {
              await delay(10);
              let nodes = [];
              if (node.level < 2) {
                nodes = [
                  {
                    value: `${node.value}.1`,
                    children: true,
                  },
                  {
                    value: `${node.value}.2`,
                    children: true,
                  },
                ];
              }
              return nodes;
            },
            onLoad() {
              loadIndex += 1;
              if (loadIndex >= 7) {
                resolve();
              }
            },
          },
          render() {
            return (
              <Tree
                data={this.data}
                value={this.value}
                load={this.load}
                onLoad={this.onLoad}
                expandAll
                checkable
                checkStrictly
                lazy={false}
                transition={false}
              >
              </Tree>
            );
          },
        });
      });

      await pm;
      await delay(1);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(false);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-indeterminate')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1.1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
    });
  });

  describe('props.lazy', () => {
    it('lazy 属性为 true 时，点击展开节点时加载数据', async () => {
      const data = [
        {
          value: 't1',
          children: true,
        },
      ];

      const step1 = step();
      const step2 = step();

      let loadIndex = 0;
      const wrapper = mount({
        data() {
          return {
            data,
          };
        },
        methods: {
          async load(node) {
            await delay(10);
            let nodes = [];
            if (node.level < 2) {
              nodes = [
                {
                  value: `${node.value}.1`,
                  children: true,
                },
                {
                  value: `${node.value}.2`,
                  children: true,
                },
              ];
            }
            return nodes;
          },
          onLoad() {
            loadIndex += 1;
            if (loadIndex >= 1) {
              step1.ready();
            }
            if (loadIndex >= 2) {
              step2.ready();
            }
          },
        },
        render() {
          return (
            <Tree
              data={this.data}
              expandAll
              load={this.load}
              onLoad={this.onLoad}
              lazy={true}
              transition={false}
            >
            </Tree>
          );
        },
      });

      await delay(10);

      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
      wrapper.find('[data-value="t1"] .t-tree__icon').trigger('click');

      // 数据被加载
      await step1;
      // 留给 dom 渲染时间
      await delay(10);

      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1.1"]').exists()).toBe(false);
      wrapper.find('[data-value="t1.1"] .t-tree__icon').trigger('click');

      await step2;
      // 留给 dom 渲染时间
      await delay(10);

      expect(wrapper.find('[data-value="t1.1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1.2"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.2.1"]').exists()).toBe(false);
    });

    it('延迟加载的可选节点，默认继承父节点选中态', async () => {
      const data = [
        {
          value: 't1',
          children: true,
        },
      ];

      const step1 = step();

      let loadIndex = 0;
      const wrapper = mount({
        data() {
          return {
            data,
          };
        },
        methods: {
          async load(node) {
            await delay(10);
            let nodes = [];
            if (node.level < 2) {
              nodes = [
                {
                  value: `${node.value}.1`,
                  children: true,
                },
              ];
            }
            return nodes;
          },
          onLoad() {
            loadIndex += 1;
            if (loadIndex >= 1) {
              step1.ready();
            }
          },
        },
        mounted() {
          const { tree } = this.$refs;
          tree.setItem('t1', {
            checked: true,
          });
        },
        render() {
          return (
            <Tree
              ref="tree"
              data={this.data}
              load={this.load}
              onLoad={this.onLoad}
              lazy={true}
              checkable={true}
              transition={false}
              valueMode="all"
            >
            </Tree>
          );
        },
      });

      await delay(10);

      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      wrapper.find('[data-value="t1"] .t-tree__icon').trigger('click');

      await step1;
      await delay(10);

      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
    });

    it('checkStrictly 为 true 时，延迟加载的节点不继承父节点选中态', async () => {
      const data = [
        {
          value: 't1',
          children: true,
        },
      ];

      const step1 = step();

      let loadIndex = 0;
      const wrapper = mount({
        data() {
          return {
            data,
          };
        },
        methods: {
          async load(node) {
            await delay(10);
            let nodes = [];
            if (node.level < 2) {
              nodes = [
                {
                  value: `${node.value}.1`,
                  children: true,
                },
              ];
            }
            return nodes;
          },
          onLoad() {
            loadIndex += 1;
            if (loadIndex >= 1) {
              step1.ready();
            }
          },
        },
        mounted() {
          const { tree } = this.$refs;
          tree.setItem('t1', {
            checked: true,
          });
        },
        render() {
          return (
            <Tree
              ref="tree"
              data={this.data}
              load={this.load}
              onLoad={this.onLoad}
              lazy={true}
              checkable={true}
              checkStrictly={true}
              transition={false}
              valueMode="all"
            >
            </Tree>
          );
        },
      });

      await delay(10);

      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      wrapper.find('[data-value="t1"] .t-tree__icon').trigger('click');

      await step1;
      await delay(10);

      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
    });
  });
});
