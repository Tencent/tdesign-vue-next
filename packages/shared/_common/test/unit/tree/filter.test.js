import TreeStore from '../../../js/tree/tree-store';
import { delay } from './kit';

// 节点过滤
describe('tree:filter', () => {
  describe('treeStore:filter', () => {
    it('filter 命中节点要呈现，默认路径节点必须呈现', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }, {
          value: 't2.2',
        }],
      }]);
      tree.setConfig({
        filter: (node) => {
          const rs = (node.value.indexOf('.1') >= 0);
          return rs;
        },
      });
      await delay(0);

      expect(tree.getNode('t1').visible).toBe(true);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1').vmIsLocked).toBe(true);
      expect(tree.getNode('t1').vmIsRest).toBe(false);

      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').vmIsRest).toBe(true);
      expect(tree.getNode('t1.2').visible).toBe(false);
      expect(tree.getNode('t1.2').vmIsRest).toBe(false);

      expect(tree.getNode('t2').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2').vmIsLocked).toBe(true);
      expect(tree.getNode('t2').vmIsRest).toBe(false);

      expect(tree.getNode('t2.1').visible).toBe(true);
      expect(tree.getNode('t2.1').vmIsRest).toBe(true);
      expect(tree.getNode('t2.2').visible).toBe(false);
      expect(tree.getNode('t2.2').vmIsRest).toBe(false);
    });

    it('filter 命中节点的路径节点，默认无法折叠', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);
      tree.setConfig({
        filter(node) {
          return (node.value === 't1.1');
        },
      });
      await delay(0);

      expect(tree.getNode('t1').visible).toBe(true);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1').vmIsLocked).toBe(true);
      expect(tree.getNode('t1').vmIsRest).toBe(false);

      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').vmIsRest).toBe(true);
      expect(tree.getNode('t1.2').visible).toBe(false);
      expect(tree.getNode('t1.2').vmIsRest).toBe(false);

      tree.getNode('t1').setExpanded(false, {
        directly: true,
      });
      await delay(0);

      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1').vmIsLocked).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
    });

    it('filter 条件清空后，还原原始折叠状态', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);
      tree.setConfig({
        filter(node) {
          return (node.value === 't1.1');
        },
      });
      await delay(0);

      expect(tree.getNode('t1').visible).toBe(true);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1').vmIsLocked).toBe(true);
      expect(tree.getNode('t1').vmIsRest).toBe(false);

      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').vmIsRest).toBe(true);
      expect(tree.getNode('t1.2').visible).toBe(false);
      expect(tree.getNode('t1.2').vmIsRest).toBe(false);

      tree.setConfig({
        filter: null,
      });
      await delay(0);

      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1').vmIsLocked).toBe(false);
      expect(tree.getNode('t1.1').visible).toBe(false);
    });

    it('filter 过滤节点，路径节点全部展开', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
            children: [{
              value: 't1.1.1.1',
            }],
          }],
        }, {
          value: 't1.2',
        }],
      }]);
      tree.setConfig({
        filter(node) {
          return (node.value === 't1.1.1.1');
        },
      });
      await delay(0);

      expect(tree.getNode('t1').visible).toBe(true);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1').vmIsLocked).toBe(true);

      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(true);
      expect(tree.getNode('t1.1').vmIsLocked).toBe(true);

      expect(tree.getNode('t1.1.1').visible).toBe(true);
      expect(tree.getNode('t1.1.1').expanded).toBe(true);
      expect(tree.getNode('t1.1.1').vmIsLocked).toBe(true);

      expect(tree.getNode('t1.1.1.1').visible).toBe(true);
      expect(tree.getNode('t1.1.1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1.1').vmIsRest).toBe(true);
    });
  });

  describe('treeStore:allowFoldNodeOnFilter', () => {
    it('allowFoldNodeOnFilter 为 true 后，路径节点不会自动展开', async () => {
      const tree = new TreeStore({
        allowFoldNodeOnFilter: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
            children: [{
              value: 't1.1.1.1',
            }],
          }],
        }, {
          value: 't1.2',
        }],
      }]);
      tree.setConfig({
        filter(node) {
          return (node.value === 't1.1.1.1');
        },
      });
      await delay(0);

      expect(tree.getNode('t1').visible).toBe(true);
      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1').vmIsLocked).toBe(true);

      expect(tree.getNode('t1.1').visible).toBe(false);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1').vmIsLocked).toBe(true);

      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').vmIsLocked).toBe(true);

      expect(tree.getNode('t1.1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.1.1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1.1').vmIsRest).toBe(true);
    });
  });
});
