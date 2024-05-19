import TreeStore from '../../../js/tree/tree-store';
import { delay } from './kit';

// 节点获取
describe('tree:getNode', () => {
  describe('treeStore:getNode()', () => {
    it('getNode 方法通过 value 获取节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);
      await delay(0);
      expect(tree.getNode('t1.1').value).toBe('t1.1');
    });

    it('getNode 方法识别节点是否在当前树中', async () => {
      const tree1 = new TreeStore();
      const tree2 = new TreeStore();
      tree1.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);
      tree2.append([{
        value: 'x1',
        children: [{
          value: 'x1.1',
        }, {
          value: 'x1.2',
        }],
      }]);
      await delay(0);
      const t2x1d1 = tree2.getNode('x1.1');
      expect(t2x1d1.tree).toBe(tree2);
      expect(tree1.getNode(t2x1d1)).toBe(null);
    });
  });

  describe('treeStore:getNodes()', () => {
    it('getNodes 方法指定节点范围获取节点', async () => {
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
      await delay(0);

      const nodes = tree.getNodes(tree.getNode('t1'));
      expect(nodes.length).toBe(3);
      expect(nodes[0].value).toBe('t1');
      expect(nodes[1].value).toBe('t1.1');
      expect(nodes[2].value).toBe('t1.2');
    });

    it('getNodes 方法按条件过滤节点', async () => {
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
      await delay(0);

      const nodes = tree.getNodes('t1', {
        filter(node) {
          return node.value.indexOf('t1.') >= 0;
        },
      });
      expect(nodes.length).toBe(2);
      expect(nodes[0].value).toBe('t1.1');
      expect(nodes[1].value).toBe('t1.2');
    });

    it('getNodes 方法按级别过滤节点', async () => {
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
      await delay(0);

      const nodes = tree.getNodes('t1', {
        level: 0,
      });
      expect(nodes.length).toBe(1);
      expect(nodes[0].value).toBe('t1');
    });

    it('getNodes 方法按属性过滤节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          checkable: true,
        }, {
          value: 't1.2',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }, {
          value: 't2.2',
          checkable: true,
        }],
      }]);
      await delay(0);

      const nodes = tree.getNodes('t2', {
        props: {
          checkable: true,
        },
      });
      expect(nodes.length).toBe(1);
      expect(nodes[0].value).toBe('t2.2');
    });
  });

  describe('treeStore:getChildren()', () => {
    it('getChildren 方法取根节点列表', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);
      await delay(0);

      const children = tree.getChildren();
      expect(children.length).toBe(1);
      expect(children[0].value).toBe('t1');
    });
  });

  describe('treeStore:getIndex()', () => {
    it('getIndex 方法取节点在总列表中序号', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);
      await delay(0);

      // 取节点在总列表中的序号
      const index = tree.getIndex(tree.getNode('t1.1'));
      expect(index).toBe(1);
    });
  });

  describe('treeStore:getParent()', () => {
    it('getParent 方法取节点的父节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);
      await delay(0);

      // 取节点在总列表中的序号
      const node = tree.getParent('t1.1');
      expect(node.value).toBe('t1');
    });
  });

  describe('treeStore:getParents()', () => {
    it('getParents 方法取节点的所有父级节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }],
        }, {
          value: 't1.2',
        }],
      }]);
      await delay(0);

      // 取节点在总列表中的序号
      const parents = tree.getParents('t1.1.1');
      expect(parents.length).toBe(2);
      expect(parents[0].value).toBe('t1.1');
      expect(parents[1].value).toBe('t1');
    });
  });

  describe('treeStore:getNodeIndex()', () => {
    it('getNodeIndex 方法取节点在兄弟节点中的序号', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);
      await delay(0);

      const index = tree.getNodeIndex(tree.getNode('t1.1'));
      expect(index).toBe(0);
    });
  });

  describe('treeNode:getRoot()', () => {
    it('getRoot 方法取节点的根节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }],
        }],
      }]);
      await delay(0);

      const root = tree.getNode('t1.1.1').getRoot();
      expect(root.value).toBe('t1');
    });
  });

  describe('treeNode:getPath()', () => {
    it('getPath 方法获取路径节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }],
        }],
      }]);
      await delay(0);

      const pathNodes = tree.getNode('t1.1.1').getPath();
      expect(pathNodes.length).toBe(3);
      expect(pathNodes[0].value).toBe('t1');
      expect(pathNodes[1].value).toBe('t1.1');
      expect(pathNodes[2].value).toBe('t1.1.1');
    });
  });
});
