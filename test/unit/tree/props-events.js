import { mount } from '@vue/test-utils';
import Tree from '@/src/tree/index.ts';

describe('Tree:props:events', () => {
  describe('props.onActive', () => {
    it('onActive get callback', (done) => {
      const data = [
        { value: 't1' },
        { value: 't2' },
      ];
      const onActive = (actived, context) => {
        expect(actived.length).toBe(1);
        expect(actived[0]).toBe('t2');
        expect(context.node.value).toBe('t2');
        done();
      };
      mount({
        mounted() {
          this.$refs.tree.setItem('t2', {
            actived: true,
          });
        },
        render() {
          return (
            <Tree
              ref="tree"
              data={data}
              activable
              onActive={onActive}
            ></Tree>
          );
        },
      });
    }, 10);
  });

  describe('props.onExpand', () => {
    it('onExpand get callback', (done) => {
      const data = [{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      },
      ];
      const onExpand = (expanded, context) => {
        expect(expanded.length).toBe(1);
        expect(expanded[0]).toBe('t2');
        expect(context.node.value).toBe('t2');
        done();
      };
      mount({
        mounted() {
          this.$refs.tree.setItem('t2', {
            expanded: true,
          });
        },
        render() {
          return (
            <Tree
              ref="tree"
              data={data}
              onExpand={onExpand}
            ></Tree>
          );
        },
      });
    }, 10);
  });

  describe('props.onChange', () => {
    it('onChange get callback', (done) => {
      const data = [{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }];
      const onChange = (checked, context) => {
        expect(checked.length).toBe(1);
        expect(checked[0]).toBe('t2.1');
        expect(context.node.value).toBe('t2');
        done();
      };
      mount({
        mounted() {
          this.$refs.tree.setItem('t2', {
            checked: true,
          });
        },
        render() {
          return (
            <Tree
              ref="tree"
              data={data}
              checkable
              onChange={onChange}
            ></Tree>
          );
        },
      });
    }, 10);
  });

  describe('props.onLoad', () => {
    it('onLoad get callback', (done) => {
      const data = [{
        lablel: '1',
        value: 't1',
        children: true,
      }];

      const onLoad = (context) => {
        expect(context.node.value).toBe('t1');
        done();
      };

      const loadData = (node) => new Promise((resolve) => {
        setTimeout(() => {
          let nodes = [];
          if (node.level < 1) {
            nodes = [{
              value: `${node.value}.1`,
              label: `${node.label}.1`,
              children: true,
            }];
          }
          resolve(nodes);
        }, 1);
      });

      mount({
        render() {
          return (
            <Tree
              ref="tree"
              data={data}
              expand-all
              lazy={false}
              load={loadData}
              onLoad={onLoad}
            ></Tree>
          );
        },
      });
    }, 10);
  });
});
