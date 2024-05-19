import TreeStore from '../../../js/tree/tree-store';

// 节点展开状态
describe('tree:expand', () => {
  describe('treeStore:expandAll', () => {
    it('expandAll 为 true 时，默认新增节点为展开状态', async () => {
      const tree = new TreeStore({
        expandAll: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      expect(tree.getNode('t1').isExpanded()).toBe(true);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2').isExpanded()).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);

      tree.appendNodes('t1.1', {
        value: 't1.1.1',
      });
      expect(tree.getNode('t1.1').expanded).toBe(true);
      expect(tree.getNode('t1.1.1').visible).toBe(true);
    });

    it('expandAll 为 false 时，默认新增节点为收起状态', async () => {
      const tree = new TreeStore({
        expandAll: false,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      expect(tree.getNode('t1').visible).toBe(true);
      expect(tree.getNode('t1').isExpanded()).toBe(false);
      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1.1').visible).toBe(false);
      expect(tree.getNode('t2').visible).toBe(true);
      expect(tree.getNode('t2').isExpanded()).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      tree.appendNodes('t1.1', {
        value: 't1.1.1',
      });
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
    });
  });

  describe('treeStore:expandLevel', () => {
    it('expandLevel 指定默认展开层级', async () => {
      const tree = new TreeStore({
        expandLevel: 1,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }],
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
          children: [{
            value: 't2.1.1',
          }],
        }],
      }]);

      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);
      expect(tree.getNode('t2.1').expanded).toBe(false);
      expect(tree.getNode('t2.1.1').expanded).toBe(false);
      expect(tree.getNode('t2.1.1').visible).toBe(false);

      tree.appendNodes([{
        value: 't3',
        children: [{
          value: 't3.1',
          children: [{
            value: 't3.1.1',
          }],
        }],
      }]);
      expect(tree.getNode('t3').expanded).toBe(true);
      expect(tree.getNode('t3.1').visible).toBe(true);
      expect(tree.getNode('t3.1').expanded).toBe(false);
      expect(tree.getNode('t3.1.1').expanded).toBe(false);
      expect(tree.getNode('t3.1.1').visible).toBe(false);
    });
  });

  describe('treeStore:expandMutex', () => {
    it('默认 expandMutex 为 false, 展开状态互不影响', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      tree.getNode('t1').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      tree.getNode('t2').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);
    });

    it('expandMutex 为 true, 同级展开状态互斥', async () => {
      const tree = new TreeStore({
        expandMutex: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }],
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1.1').visible).toBe(false);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(false);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      tree.getNode('t2').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1.1').visible).toBe(false);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(false);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);

      tree.getNode('t1').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').visible).toBe(true);
      expect(tree.getNode('t1.2').expanded).toBe(false);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      tree.getNode('t1.1').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(true);
      expect(tree.getNode('t1.1.1').visible).toBe(true);
      expect(tree.getNode('t1.2').visible).toBe(true);
      expect(tree.getNode('t1.2').expanded).toBe(false);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      tree.getNode('t1.2').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').visible).toBe(true);
      expect(tree.getNode('t1.2').expanded).toBe(true);
      expect(tree.getNode('t1.2.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);
    });

    it('expandMutex 可以在数据中配置', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        expandMutex: true,
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }],
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.getNode('t2').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').isExpandMutex()).toBe(true);
      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1.1').visible).toBe(false);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(false);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);

      tree.getNode('t1').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').visible).toBe(true);
      expect(tree.getNode('t1.2').expanded).toBe(false);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);

      tree.getNode('t1.1').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(true);
      expect(tree.getNode('t1.1.1').visible).toBe(true);
      expect(tree.getNode('t1.2').visible).toBe(true);
      expect(tree.getNode('t1.2').expanded).toBe(false);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);

      tree.getNode('t1.2').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').visible).toBe(true);
      expect(tree.getNode('t1.2').expanded).toBe(true);
      expect(tree.getNode('t1.2.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);
    });
  });

  describe('treeStore:expandParent', () => {
    it('默认 expandParent 为 false, 子节点展开时，不影响父节点展开状态', async () => {
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
          children: [{
            value: 't1.2.1',
          }],
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.getNode('t1.2').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1.1').visible).toBe(false);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(true);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);
    });

    it('expandParent 为 true, 子节点展开时，父节点随之展开', async () => {
      const tree = new TreeStore({
        expandParent: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }],
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.getNode('t1.2').setExpanded(true, {
        directly: true,
      });
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').visible).toBe(true);
      expect(tree.getNode('t1.2').expanded).toBe(true);
      expect(tree.getNode('t1.2.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);
    });
  });

  describe('treeStore:getExpanded()', () => {
    it('getExpanded 方法获取展开节点值', async () => {
      const tree = new TreeStore({
        expandParent: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }],
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.getNode('t1.2').setExpanded(true, {
        directly: true,
      });
      const expanded = tree.getExpanded();
      expect(expanded.length).toBe(2);
      expect(expanded.indexOf('t1') >= 0).toBe(true);
      expect(expanded.indexOf('t1.2') >= 0).toBe(true);
    });
  });

  describe('treeStore:replaceExpanded()', () => {
    it('replaceExpanded 方法替换展开状态', async () => {
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
          children: [{
            value: 't1.2.1',
          }],
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.setExpanded(['t1', 't1.2']);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(true);
      expect(tree.getNode('t1.2.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      tree.replaceExpanded(['t1.1', 't2']);
      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1.1').visible).toBe(false);
      expect(tree.getNode('t1.1').expanded).toBe(true);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(false);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);
    });
  });

  describe('treeStore:setExpanded()', () => {
    it('setExpanded 方法调用会忽略互斥属性', async () => {
      const tree = new TreeStore({
        expandMutex: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.setExpanded(['t1']);
      tree.setExpanded(['t2']);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);
    });

    it('setExpanded 方法批量设置展开节点', async () => {
      const tree = new TreeStore({
        expandMutex: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }],
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.setExpanded(['t1', 't2', 't1.2']);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(true);
      expect(tree.getNode('t1.2.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);
    });
  });

  describe('treeStore:setExpandedDirectly()', () => {
    it('setExpandedDirectly 方法批量设置节点展开状态', async () => {
      const tree = new TreeStore({
        expandMutex: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }],
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.setExpandedDirectly(['t1', 't2', 't1.2'], true);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(true);
      expect(tree.getNode('t1.2.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);

      tree.setExpandedDirectly(['t1', 't2'], false);
      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1.1').visible).toBe(false);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(true);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);
    });
  });

  describe('treeStore:resetExpanded()', () => {
    it('resetExpanded 方法清空展开状态', async () => {
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
          children: [{
            value: 't1.2.1',
          }],
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.setExpanded(['t1', 't1.2']);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(true);
      expect(tree.getNode('t1.2.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      tree.resetExpanded();
      expect(tree.getNode('t1').expanded).toBe(false);
      expect(tree.getNode('t1.1').visible).toBe(false);
      expect(tree.getNode('t1.1').expanded).toBe(false);
      expect(tree.getNode('t1.1.1').visible).toBe(false);
      expect(tree.getNode('t1.2').expanded).toBe(false);
      expect(tree.getNode('t1.2.1').visible).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      const expanded = tree.getExpanded();
      expect(expanded.length).toBe(0);
    });
  });

  describe('treeNode:initExpanded()', () => {
    it('可以在数据中初始化 expanded 状态', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        expanded: true,
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      expect(tree.getNode('t1').isExpanded()).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2').isExpanded()).toBe(false);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);
    });
  });

  describe('treeNode:setExpanded()', () => {
    it('treeNode.setExpanded 方法默认不更新状态', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.setExpanded(['t1']);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      const expanded = tree.getNode('t2').setExpanded(true);
      expect(expanded.length).toBe(2);
      expect(expanded).toContain('t1');
      expect(expanded).toContain('t2');

      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);
    });

    it('treeNode.setExpanded 传递选项来更新状态', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.setExpanded(['t1']);
      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      const expanded = tree.getNode('t2').setExpanded(true, {
        directly: true,
      });
      expect(expanded.length).toBe(2);
      expect(expanded).toContain('t1');
      expect(expanded).toContain('t2');

      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(true);
      expect(tree.getNode('t2.1').visible).toBe(true);
    });
  });

  describe('treeNode:toggleExpanded()', () => {
    it('treeNode.toggleExpanded 方法默认不更新状态', async () => {
      const tree = new TreeStore();
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.setExpanded(['t1']);
      let expanded = tree.getExpanded();
      expect(expanded.length).toBe(1);
      expect(expanded).toContain('t1');

      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      expanded = tree.getNode('t2').toggleExpanded();
      expect(expanded.length).toBe(2);
      expect(expanded).toContain('t1');
      expect(expanded).toContain('t2');

      expect(tree.getNode('t1').expanded).toBe(true);
      expect(tree.getNode('t1.1').visible).toBe(true);
      expect(tree.getNode('t2').expanded).toBe(false);
      expect(tree.getNode('t2.1').visible).toBe(false);

      expanded = tree.getNode('t1').toggleExpanded();
      expect(expanded.length).toBe(0);
    });
  });
});
