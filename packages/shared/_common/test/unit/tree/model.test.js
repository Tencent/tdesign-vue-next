import TreeStore from '../../../js/tree/tree-store';
import { delay } from './kit';

// 节点延迟加载
describe('tree:model', () => {
  describe('treeNodeModel:value', () => {
    it('value 取值与 node 保持一致', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      const t1d1 = tree.getNode('t1.1');
      expect(t1d1.getModel().value).toBe(t1d1.value);
    });
  });

  describe('treeNodeModel:label', () => {
    it('label 取值与 node 保持一致', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          label: 't1d1',
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      const t1d1 = tree.getNode('t1.1');
      expect(t1d1.getModel().label).toBe('t1d1');

      t1d1.set({
        label: 'T1D1',
      });
      expect(t1d1.getModel().label).toBe('T1D1');
    });
  });

  describe('treeNodeModel:data', () => {
    it('data 取值与 node 保持一致', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          info: 't1d1',
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      const t1d1 = tree.getNode('t1.1');
      expect(t1d1.getModel().data.info).toBe('t1d1');
    });
  });

  describe('treeNodeModel:actived', () => {
    it('actived 取值与 node 保持一致', async () => {
      const tree = new TreeStore({
        activable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      const t1d1 = tree.getNode('t1.1');
      t1d1.setActived(true, {
        directly: true,
      });
      expect(t1d1.actived).toBe(true);
      expect(t1d1.getModel().actived).toBe(true);
    });
  });

  describe('treeNodeModel:expanded', () => {
    it('expanded 取值与 node 保持一致', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      const t1 = tree.getNode('t1');
      tree.setExpanded(['t1']);
      expect(t1.expanded).toBe(true);
      expect(t1.getModel().expanded).toBe(true);
    });
  });

  describe('treeNodeModel:checked', () => {
    it('checked 取值与 node 保持一致', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');
      t1.setChecked(true, {
        directly: true,
      });
      expect(t1.getModel().checked).toBe(true);
      expect(t1d1.getModel().checked).toBe(true);
      expect(t1d2.getModel().checked).toBe(true);
    });
  });

  describe('treeNodeModel:indeterminate', () => {
    it('indeterminate 取值与 node 保持一致', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');
      t1d1.setChecked(true, {
        directly: true,
      });
      expect(t1.getModel().checked).toBe(false);
      expect(t1.getModel().indeterminate).toBe(true);
      expect(t1d1.getModel().checked).toBe(true);
      expect(t1d2.getModel().checked).toBe(false);
    });
  });

  describe('treeNodeModel:loading', () => {
    it('loading 取值与 node 保持一致', async () => {
      const tree = new TreeStore({
        lazy: true,
        async load() {
          await delay(0);
          return [{
            value: 't1.1',
          }];
        },
      });
      tree.append([{
        value: 't1',
        children: true,
      }]);
      await delay(0);

      let nodes = tree.getNodes();
      expect(nodes.length).toBe(1);
      const pm = new Promise((resolve) => {
        tree.emitter.on('load', resolve);
      });
      tree.getNode('t1').setExpanded(true, {
        directly: true,
      });

      expect(tree.getNode('t1').getModel().loading).toBe(true);
      await pm;
      // promise 触发后，还要再等一个 reflow 事件
      await delay(0);

      nodes = tree.getNodes();
      expect(nodes.length).toBe(2);
      expect(nodes[1].getModel().value).toBe('t1.1');
    });
  });

  describe('treeNodeModel:getLevel()', () => {
    it('getLevel 取值与 node 保持一致', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');
      expect(t1.getModel().getLevel()).toBe(0);
      expect(t1d1.getModel().getLevel()).toBe(1);
      expect(t1d2.getModel().getLevel()).toBe(1);
    });
  });

  describe('treeNodeModel:getIndex()', () => {
    it('getIndex 取值与 node 保持一致', async () => {
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
      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');
      expect(t1.getModel().getIndex()).toBe(0);
      expect(t1d1.getModel().getIndex()).toBe(0);
      expect(t1d2.getModel().getIndex()).toBe(1);
    });
  });

  describe('treeNodeModel:isFirst()', () => {
    it('isFirst 取值与 node 保持一致', async () => {
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
      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');
      expect(t1.getModel().isFirst()).toBe(true);
      expect(t1d1.getModel().isFirst()).toBe(true);
      expect(t1d2.getModel().isFirst()).toBe(false);
    });
  });

  describe('treeNodeModel:isLast()', () => {
    it('isLast 取值与 node 保持一致', async () => {
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
      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');
      expect(t1.getModel().isLast()).toBe(true);
      expect(t1d1.getModel().isLast()).toBe(false);
      expect(t1d2.getModel().isLast()).toBe(true);
    });
  });

  describe('treeNodeModel:isLeaf()', () => {
    it('isLeaf 取值与 node 保持一致', async () => {
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
      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');
      expect(t1.getModel().isLeaf()).toBe(false);
      expect(t1d1.getModel().isLeaf()).toBe(true);
      expect(t1d2.getModel().isLeaf()).toBe(true);
    });
  });

  describe('treeNodeModel:insertBefore()', () => {
    it('insertBefore 方法插入节点到前面', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.getNode('t2').getModel().insertBefore({
        value: 't3',
      });
      tree.getNode('t1').getModel().insertBefore({
        value: 't4',
      });
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(4);
      expect(nodes[0].value).toBe('t4');
      expect(nodes[1].value).toBe('t1');
      expect(nodes[2].value).toBe('t3');
      expect(nodes[3].value).toBe('t2');
    });
  });

  describe('treeNodeModel:insertAfter()', () => {
    it('insertAfter 方法插入节点到后面', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.getNode('t2').getModel().insertAfter({
        value: 't3',
      });
      tree.getNode('t1').getModel().insertAfter({
        value: 't4',
      });
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(4);
      expect(nodes[0].value).toBe('t1');
      expect(nodes[1].value).toBe('t4');
      expect(nodes[2].value).toBe('t2');
      expect(nodes[3].value).toBe('t3');
    });
  });

  describe('treeNodeModel:appendData()', () => {
    it('appendData 方法添加节点数据到另一个节点 children', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.getNode('t1').getModel().appendData({
        value: 't1.1'
      });
      tree.getNode('t2').getModel().appendData({
        value: 't2.1'
      });
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(4);
      expect(tree.getNode('t1.1').getParent().value).toBe('t1');
      expect(tree.getNode('t2.1').getParent().value).toBe('t2');
    });
  });

  describe('treeNodeModel:getPath()', () => {
    it('getPath 方法获取路径节点 model', async () => {
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
      const t1d1 = tree.getNode('t1.1');
      const nodes = t1d1.getModel().getPath();
      expect(nodes.length).toBe(2);
      expect(nodes[0].value).toBe('t1');
      expect(nodes[1].value).toBe('t1.1');
      expect(typeof nodes[0].setData).toBe('function');
    });
  });

  describe('treeNodeModel:getParent()', () => {
    it('getParent 方法获取父节点 model', async () => {
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
      const t1d1 = tree.getNode('t1.1');
      const parent = t1d1.getModel().getParent();
      expect(parent.value).toBe('t1');
      expect(typeof parent.setData).toBe('function');
    });
  });

  describe('treeNodeModel:getParents()', () => {
    it('getParents 方法获取所有父节点 model', async () => {
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
      const t1d1 = tree.getNode('t1.1');
      const parents = t1d1.getModel().getParents();
      expect(parents.length).toBe(1);
      expect(parents[0].value).toBe('t1');
      expect(typeof parents[0].setData).toBe('function');
    });
  });

  describe('treeNodeModel:getRoot()', () => {
    it('getParents 方法获取所有根节点 model', async () => {
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
      const t1d1 = tree.getNode('t1.1');
      const root = t1d1.getModel().getRoot();
      expect(root.value).toBe('t1');
      expect(typeof root.setData).toBe('function');
    });
  });

  describe('treeNodeModel:getSiblings()', () => {
    it('getSiblings 方法获取兄弟节点 model', async () => {
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
      const t1d1 = tree.getNode('t1.1');
      const nodes = t1d1.getModel().getSiblings();
      expect(nodes.length).toBe(2);
      expect(nodes[0].value).toBe('t1.1');
      expect(nodes[1].value).toBe('t1.2');
      expect(typeof nodes[0].setData).toBe('function');
    });
  });

  describe('treeNodeModel:getChildren()', () => {
    it('getChildren 方法获取子节点 model', async () => {
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
      const t1 = tree.getNode('t1');
      const nodes = t1.getModel().getChildren();
      expect(nodes.length).toBe(2);
      expect(nodes[0].value).toBe('t1.1');
      expect(nodes[1].value).toBe('t1.2');
      expect(typeof nodes[0].setData).toBe('function');
    });

    it('getChildren 方法发现没有子节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [],
        }, {
          value: 't1.2',
        }],
      }]);
      await delay(0);
      expect(tree.getNode('t1.1').getModel().getChildren()).toBe(false);
      expect(tree.getNode('t1.2').getModel().getChildren()).toBe(false);
    });

    it('getChildren 方法发现子节点为 true', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
          children: true,
        }],
      }]);
      await delay(0);
      expect(tree.getNode('t1.2').getModel().getChildren()).toBe(true);
    });

    it('getChildren 深度遍历获取子节点 model', async () => {
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
      const t1 = tree.getNode('t1');
      const nodes = t1.getModel().getChildren(true);
      expect(nodes.length).toBe(3);
      expect(nodes[0].value).toBe('t1.1');
      expect(nodes[1].value).toBe('t1.1.1');
      expect(nodes[2].value).toBe('t1.2');
      expect(typeof nodes[1].setData).toBe('function');
    });
  });

  describe('treeNodeModel:remove()', () => {
    it('remove 方法移除根节点', async () => {
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
      const t1 = tree.getNode('t1');
      t1.getModel().remove();
      await delay(0);
      expect(tree.getNodes().length).toBe(0);
      expect(tree.getNode('t1.1')).toBe(null);
    });

    it('remove 方法移除目标节点下的指定节点', async () => {
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
      }, {
        value: 't2',
      }]);
      await delay(0);
      const t1 = tree.getNode('t1');
      t1.getModel().remove('t1.1.1');
      // 日志提示没有该节点
      t1.getModel().remove('t1.1.2');
      // 日志提示节点不在当前节点下
      t1.getModel().remove('t2');
      await delay(0);
      expect(tree.getNodes().length).toBe(4);
      expect(tree.getNode('t1.1.1')).toBe(null);
    });
  });

  describe('treeNodeModel:setData()', () => {
    it('setData 方法用于设置节点数据', async () => {
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
      const t1d1 = tree.getNode('t1.1');
      t1d1.getModel().setData({
        label: 't1d1',
        info: 't1d1-info',
      });
      expect(t1d1.label).toBe('t1d1');
      expect(t1d1.info).toBe('t1d1-info');
      expect(t1d1.data.info).toBe('t1d1-info');
    });
  });
});
