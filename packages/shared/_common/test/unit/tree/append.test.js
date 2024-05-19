import TreeStore from '../../../js/tree/tree-store';
import { delay } from './kit';

// 节点添加与插入
describe('tree:append', () => {
  describe('treeStore:append()', () => {
    it('append 方法添加多个节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't5'
      }, {
        value: 't6'
      }]);
      await delay(0);
      const nodes = tree.getNodes();
      // 内部生成的唯一 key 不应当绑定测试状态
      // 生成的唯一 key 与节点顺序无关，只需确保唯一
      expect(nodes[0].value).toBe('t5');
      expect(nodes[1].value).toBe('t6');
      expect(nodes.length).toBe(2);
    });

    it('append 方法添加树结构数据', async () => {
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
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(3);
      expect(nodes[0].value).toBe('t1');
      expect(nodes[1].value).toBe('t1.1');
      expect(nodes[2].value).toBe('t1.2');

      // 取根节点列表
      const children = tree.getChildren();
      expect(children.length).toBe(1);
      expect(children[0].value).toBe('t1');
    });

    it('append 方法添加重复节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't1'
      }]);
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes[0].value).toBe('t1');
      expect(nodes[1].value).toBe('t1');
      expect(nodes.length).toBe(2);
    });

    it('append 方法添加空数组', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }]);
      await delay(0);
      tree.append([]);
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(1);
      expect(nodes[0].value).toBe('t1');
    });
  });

  describe('treeStore:appendNodes()', () => {
    it('appendNodes 方法添加节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.appendNodes({
        value: 't3'
      });
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(3);
      expect(nodes[2].value).toBe('t3');
    });

    it('appendNodes 从一个树插入到另一个树', async () => {
      const tree1 = new TreeStore();
      const tree2 = new TreeStore();
      tree1.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree2.append([{
        value: 't3'
      }, {
        value: 't4'
      }]);
      const targetNode = tree2.getNode('t4');
      tree1.appendNodes(targetNode);
      await delay(0);
      const nodes = tree1.getNodes();
      expect(nodes.length).toBe(3);
      expect(nodes[2].value).toBe('t4');
    });

    it('appendNodes 方法添加节点数据到另一个节点 children', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.appendNodes('t1', {
        value: 't1.1'
      });
      tree.appendNodes(tree.getNode('t2'), {
        value: 't2.1'
      });
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(4);
      expect(tree.getNode('t1.1').getParent().value).toBe('t1');
      expect(tree.getNode('t2.1').getParent().value).toBe('t2');
    });

    it('appendNodes 方法添加多个节点数据到另一个节点 children', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
      }, {
        value: 't2',
      }]);
      tree.appendNodes('t1', [{
        value: 't1.1',
      }, {
        value: 't1.2',
      }]);

      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(4);
      expect(tree.getNode('t1.1').getParent().value).toBe('t1');
      expect(tree.getNode('t1.2').getParent().value).toBe('t1');
    });

    it('appendNodes 方法添加节点到另一个节点 children', async () => {
      const tree1 = new TreeStore();
      tree1.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      const tree2 = new TreeStore();
      tree2.append([{
        value: 't3'
      }, {
        value: 't4'
      }]);
      tree1.appendNodes('t1', tree2.getNode('t3'));
      tree1.appendNodes(tree1.getNode('t2'), tree2.getNode('t4'));
      await delay(0);
      const nodes = tree1.getNodes();
      expect(nodes.length).toBe(4);
      expect(tree1.getNode('t3').getParent().value).toBe('t1');
      expect(tree1.getNode('t4').getParent().value).toBe('t2');
    });
  });

  describe('treeStore:insertBefore()', () => {
    it('insertBefore 方法插入节点到前面', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.insertBefore('t2', {
        value: 't3',
      });
      tree.insertBefore('t1', {
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

    it('insertBefore 方法插入节点到不存在位置', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }]
      }]);
      tree.insertBefore('t1.3', {
        value: 't1.4',
      });
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(3);
      expect(tree.getNode('t1.1').getIndex()).toBe(0);
      expect(tree.getNode('t1.2').getIndex()).toBe(1);
    });
  });

  describe('treeStore:insertAfter()', () => {
    it('insertAfter 方法插入节点到后面', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.insertAfter('t2', {
        value: 't3',
      });
      tree.insertAfter('t1', {
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

    it('insertAfter 方法插入节点到不存在位置', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }]
      }]);
      tree.insertAfter('t1.3', {
        value: 't1.4',
      });
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(3);
      expect(tree.getNode('t1.1').getIndex()).toBe(0);
      expect(tree.getNode('t1.2').getIndex()).toBe(1);
    });
  });

  describe('treeStore:reload()', () => {
    it('reload 方法重设 tree 数据为空', async () => {
      const tree = new TreeStore({
        activable: true,
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
      tree.setExpanded(['t1']);
      tree.setActived(['t1.1']);
      tree.setChecked(['t1.2']);
      await delay(0);
      expect(tree.getExpanded().length).toBe(1);
      expect(tree.getChecked().length).toBe(1);
      expect(tree.getActived().length).toBe(1);

      tree.reload([]);
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(0);
      expect(tree.getExpanded().length).toBe(0);
      expect(tree.getChecked().length).toBe(0);
      expect(tree.getActived().length).toBe(0);
    });
  });

  describe('treeStore:remove()', () => {
    it('remove 方法移除指定节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2'
      }]);
      await delay(0);
      tree.remove('t1.1');
      await delay(0);

      const nodes = tree.getNodes();
      expect(nodes.length).toBe(2);
      expect(nodes[0].value).toBe('t1');
      expect(nodes[1].value).toBe('t2');
    });
  });

  describe('treeNode:insertBefore()', () => {
    it('insertBefore 方法插入节点到前面', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.getNode('t2').insertBefore({
        value: 't3',
      });
      tree.getNode('t1').insertBefore({
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

    it('insertBefore 方法插入节点到子节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }]
      }]);
      tree.getNode('t1.2').insertBefore({
        value: 't1.3',
      });
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(4);
      expect(tree.getNode('t1.1').getIndex()).toBe(0);
      expect(tree.getNode('t1.3').getIndex()).toBe(1);
      expect(tree.getNode('t1.2').getIndex()).toBe(2);
      expect(tree.getNode('t1.3').getParent().value).toBe('t1');
    });

    it('insertBefore 方法插入其他树的节点到子节点', async () => {
      const tree1 = new TreeStore();
      tree1.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }]
      }]);
      const tree2 = new TreeStore();
      tree2.append([{
        value: 't1.3',
      }]);
      tree1.getNode('t1.2').insertBefore(tree2.getNode('t1.3'));
      await delay(0);
      const nodes = tree1.getNodes();
      expect(nodes.length).toBe(4);
      expect(tree1.getNode('t1.1').getIndex()).toBe(0);
      expect(tree1.getNode('t1.3').getIndex()).toBe(1);
      expect(tree1.getNode('t1.2').getIndex()).toBe(2);
      expect(tree1.getNode('t1.3').getParent().value).toBe('t1');
    });
  });

  describe('treeNode:insertAfter()', () => {
    it('insertAfter 方法插入节点到后面', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.getNode('t2').insertAfter({
        value: 't3',
      });
      tree.getNode('t1').insertAfter({
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

    it('insertAfter 方法插入节点到子节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }]
      }]);
      tree.getNode('t1.2').insertAfter({
        value: 't1.3',
      });
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(4);
      expect(tree.getNode('t1.1').getIndex()).toBe(0);
      expect(tree.getNode('t1.2').getIndex()).toBe(1);
      expect(tree.getNode('t1.3').getIndex()).toBe(2);
      expect(tree.getNode('t1.3').getParent().value).toBe('t1');
    });

    it('insertAfter 方法同级插入后变更顺序', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }]
      }]);
      tree.getNode('t1.2').insertAfter(tree.getNode('t1.1'));
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(3);
      expect(tree.getNode('t1.1').getIndex()).toBe(1);
      expect(tree.getNode('t1.2').getIndex()).toBe(0);
    });
  });

  describe('treeNode:append()', () => {
    it('append 方法添加节点数据到另一个节点 children', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.getNode('t1').append({
        value: 't1.1'
      });
      tree.getNode('t2').append({
        value: 't2.1'
      });
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(4);
      expect(tree.getNode('t1.1').getParent().value).toBe('t1');
      expect(tree.getNode('t2.1').getParent().value).toBe('t2');
    });

    it('append 方法可以添加多个数据', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.getNode('t1').append([
        { value: 't1.1' },
        { value: 't1.2' },
      ]);
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(4);
      expect(tree.getNode('t1.1').getParent().value).toBe('t1');
      expect(tree.getNode('t1.2').getParent().value).toBe('t1');
    });

    it('append 方法添加节点到另一个节点 children', async () => {
      const tree1 = new TreeStore();
      tree1.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      const tree2 = new TreeStore();
      tree2.append([{
        value: 't3'
      }, {
        value: 't4'
      }]);
      tree1.getNode('t1').append(tree2.getNode('t3'));
      tree1.getNode('t2').append(tree2.getNode('t4'));
      await delay(0);
      const nodes = tree1.getNodes();
      expect(nodes.length).toBe(4);
      expect(tree1.getNode('t3').getParent().value).toBe('t1');
      expect(tree1.getNode('t4').getParent().value).toBe('t2');
    });

    it('append 方法空数据', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }]);
      await delay(0);
      tree.getNode('t1').append([]);
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(1);
      expect(nodes[0].value).toBe('t1');
    });
  });

  describe('treeNode:appendTo()', () => {
    it('appendTo 方法把节点插入到另一个节点 children', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1'
      }, {
        value: 't2'
      }]);
      tree.getNode('t2').appendTo(tree, tree.getNode('t1'));
      await delay(0);
      const nodes = tree.getNodes();
      expect(nodes.length).toBe(2);
      expect(tree.getNode('t2').getParent().value).toBe('t1');
      expect(tree.getNode('t2').isLeaf()).toBe(true);
      expect(tree.getNode('t2').getLevel()).toBe(1);
      expect(tree.children.length).toBe(1);
    });

    it('无法将父节点插入到子节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }]
      }]);
      let error = null;
      try {
        tree.getNode('t1').appendTo(tree, tree.getNode('t1.1'));
      } catch (err) {
        error = err;
      }

      expect(error instanceof Error).toBe(true);
      expect(error.message).toBe('无法将父节点插入到子节点');
    });

    it('无法将节点插入到本节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }]
      }]);
      let error = null;
      try {
        tree.getNode('t1.1').appendTo(tree, tree.getNode('t1.1'));
      } catch (err) {
        error = err;
      }

      expect(error instanceof Error).toBe(true);
      expect(error.message).toBe('无法将节点插入到本节点');
    });

    it('节点插入到原本的位置', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }]
      }]);
      tree.getNode('t1.1').appendTo(tree, tree.getNode('t1'), 0);
      await delay(0);
      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      expect(t1d1.parent.value).toBe('t1');
      expect(t1.getIndex()).toBe(0);
    });

    it('节点插入到错误位置', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }]
      }, {
        value: 't2',
      }]);
      let error = null;
      try {
        // 实际使用中不能这么做，仅用于边界错误兜底验证
        tree.children = null;
        tree.getNode('t1.1').appendTo(tree, null);
      } catch (err) {
        error = err;
        // 奇怪的是, tree.children = null 影响到了后面的测试代码
        // 这里可能存在一个代码编译层面的 bug，后续有空深入调查
        // 现在先用下面的代码补回 children 对象，以保证后续测试代码不报错
        tree.children = [];
      }
      expect(error instanceof Error).toBe(true);
      expect(error.message).toBe('无法插入到目标位置，可插入的节点列表不存在');
    });

    it('被展开的节点，插入其他已展开节点时保留展开状态', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }]
      }, {
        value: 't2',
      }]);
      await delay(0);
      tree.setExpanded(['t1', 't2']);
      tree.getNode('t1').appendTo(tree, tree.getNode('t2'));
      await delay(0);

      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').isVisible()).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1').getParent().value).toBe('t2');
      expect(tree.getChildren().length).toBe(1);
    });
  });

  describe('treeNode:remove()', () => {
    it('remove 方法移除节点', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2'
      }]);
      await delay(0);
      const t1d1 = tree.getNode('t1.1');
      t1d1.remove();
      await delay(0);

      const nodes = tree.getNodes();
      expect(nodes.length).toBe(2);
      expect(nodes[0].value).toBe('t1');
      expect(nodes[1].value).toBe('t2');
    });
  });
});
