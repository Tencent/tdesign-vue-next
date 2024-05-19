import TreeStore from '../../../js/tree/tree-store';
import { delay } from './kit';

// 节点选中态
describe('tree:checkable', () => {
  describe('treeStore:checkable', () => {
    it('checkable 属性为 false 时, 无法设置选中项', async () => {
      const tree = new TreeStore({
        checkable: false,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }]);

      tree.setChecked(['t1.1']);
      expect(tree.getChecked().length).toBe(0);
      const t1d1 = tree.getNode('t1.1');
      expect(t1d1.checked).toBe(false);
    });
  });

  describe('treeStore:valueMode', () => {
    it('valueMode 默认配置为 onlyLeaf', async () => {
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

      tree.setChecked(['t1']);
      const checked = tree.getChecked();
      expect(checked.length).toBe(2);
      expect(checked[0]).toBe('t1.1');
      expect(checked[1]).toBe('t1.2');
    });

    it('valueMode 为 onlyLeaf 时的半选状态', async () => {
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
      tree.setChecked(['t1.1']);
      expect(t1.isIndeterminate()).toBe(true);
      const checked = tree.getChecked();
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1.1');
    });

    it('valueMode 为 parentFirst', async () => {
      const tree = new TreeStore({
        checkable: true,
        valueMode: 'parentFirst',
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      tree.setChecked(['t1']);

      const checked = tree.getChecked();
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1');
    });

    it('valueMode 为 parentFirst 的半选状态', async () => {
      const tree = new TreeStore({
        checkable: true,
        valueMode: 'parentFirst',
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }, {
            value: 't1.1.2',
          }]
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }, {
            value: 't1.2.2',
          }]
        }],
      }]);

      tree.setChecked(['t1.1']);

      const checked = tree.getChecked();
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1.1');

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d1d1 = tree.getNode('t1.1.1');
      const t1d1d2 = tree.getNode('t1.1.2');
      const t1d2 = tree.getNode('t1.2');
      const t1d2d1 = tree.getNode('t1.2.1');
      const t1d2d2 = tree.getNode('t1.2.2');

      expect(t1.isChecked()).toBe(false);
      expect(t1.checked).toBe(false);
      expect(t1.isIndeterminate()).toBe(true);
      expect(t1.indeterminate).toBe(true);

      expect(t1d1.isChecked()).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.isIndeterminate()).toBe(false);
      expect(t1d1.indeterminate).toBe(false);

      expect(t1d1d1.isChecked()).toBe(true);
      expect(t1d1d1.checked).toBe(true);
      expect(t1d1d1.isIndeterminate()).toBe(false);
      expect(t1d1d1.indeterminate).toBe(false);

      expect(t1d1d2.isChecked()).toBe(true);
      expect(t1d1d2.checked).toBe(true);
      expect(t1d1d2.isIndeterminate()).toBe(false);
      expect(t1d1d2.indeterminate).toBe(false);

      expect(t1d2.isChecked()).toBe(false);
      expect(t1d2.checked).toBe(false);
      expect(t1d2.isIndeterminate()).toBe(false);
      expect(t1d2.indeterminate).toBe(false);

      expect(t1d2d1.isChecked()).toBe(false);
      expect(t1d2d1.checked).toBe(false);
      expect(t1d2d1.isIndeterminate()).toBe(false);
      expect(t1d2d1.indeterminate).toBe(false);

      expect(t1d2d2.isChecked()).toBe(false);
      expect(t1d2d2.checked).toBe(false);
      expect(t1d2d2.isIndeterminate()).toBe(false);
      expect(t1d2d2.indeterminate).toBe(false);
    });

    it('valueMode 为 all', async () => {
      const tree = new TreeStore({
        checkable: true,
        valueMode: 'all',
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      tree.setChecked(['t1']);

      const checked = tree.getChecked();
      expect(checked.length).toBe(3);
      expect(checked[0]).toBe('t1');
      expect(checked[1]).toBe('t1.1');
      expect(checked[2]).toBe('t1.2');
    });

    it('valueMode 为 all 的半选状态', async () => {
      const tree = new TreeStore({
        checkable: true,
        valueMode: 'all',
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }, {
            value: 't1.1.2',
          }]
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }, {
            value: 't1.2.2',
          }]
        }],
      }]);

      tree.setChecked(['t1.1']);

      const checked = tree.getChecked();
      expect(checked.length).toBe(3);
      expect(checked[0]).toBe('t1.1');
      expect(checked[1]).toBe('t1.1.1');
      expect(checked[2]).toBe('t1.1.2');

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d1d1 = tree.getNode('t1.1.1');
      const t1d1d2 = tree.getNode('t1.1.2');
      const t1d2 = tree.getNode('t1.2');
      const t1d2d1 = tree.getNode('t1.2.1');
      const t1d2d2 = tree.getNode('t1.2.2');

      expect(t1.isChecked()).toBe(false);
      expect(t1.checked).toBe(false);
      expect(t1.isIndeterminate()).toBe(true);
      expect(t1.indeterminate).toBe(true);

      expect(t1d1.isChecked()).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.isIndeterminate()).toBe(false);
      expect(t1d1.indeterminate).toBe(false);

      expect(t1d1d1.isChecked()).toBe(true);
      expect(t1d1d1.checked).toBe(true);
      expect(t1d1d1.isIndeterminate()).toBe(false);
      expect(t1d1d1.indeterminate).toBe(false);

      expect(t1d1d2.isChecked()).toBe(true);
      expect(t1d1d2.checked).toBe(true);
      expect(t1d1d2.isIndeterminate()).toBe(false);
      expect(t1d1d2.indeterminate).toBe(false);

      expect(t1d2.isChecked()).toBe(false);
      expect(t1d2.checked).toBe(false);
      expect(t1d2.isIndeterminate()).toBe(false);
      expect(t1d2.indeterminate).toBe(false);

      expect(t1d2d1.isChecked()).toBe(false);
      expect(t1d2d1.checked).toBe(false);
      expect(t1d2d1.isIndeterminate()).toBe(false);
      expect(t1d2d1.indeterminate).toBe(false);

      expect(t1d2d2.isChecked()).toBe(false);
      expect(t1d2d2.checked).toBe(false);
      expect(t1d2d2.isIndeterminate()).toBe(false);
      expect(t1d2d2.indeterminate).toBe(false);
    });
  });

  describe('treeStore:checkStrictly', () => {
    it('checkStrictly 为 true, valueMode 为 onlyLeaf', async () => {
      const tree = new TreeStore({
        checkStrictly: true,
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

      tree.setChecked(['t1']);

      const checked = tree.getChecked();
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1');

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');

      expect(t1.isChecked()).toBe(true);
      expect(t1.checked).toBe(true);
      expect(t1.isIndeterminate()).toBe(false);
      expect(t1.indeterminate).toBe(false);

      expect(t1d1.isChecked()).toBe(false);
      expect(t1d1.checked).toBe(false);
      expect(t1d1.isIndeterminate()).toBe(false);
      expect(t1d1.indeterminate).toBe(false);

      expect(t1d2.isChecked()).toBe(false);
      expect(t1d2.checked).toBe(false);
      expect(t1d2.isIndeterminate()).toBe(false);
      expect(t1d2.indeterminate).toBe(false);
    });

    it('checkStrictly 为 true, valueMode 为 parentFirst', async () => {
      const tree = new TreeStore({
        checkStrictly: true,
        checkable: true,
        valueMode: 'parentFirst',
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      tree.setChecked(['t1', 't1.1']);

      const checked = tree.getChecked();
      expect(checked.length).toBe(2);
      expect(checked[0]).toBe('t1');
      expect(checked[1]).toBe('t1.1');

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');

      expect(t1.isChecked()).toBe(true);
      expect(t1.checked).toBe(true);
      expect(t1.isIndeterminate()).toBe(false);
      expect(t1.indeterminate).toBe(false);

      expect(t1d1.isChecked()).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.isIndeterminate()).toBe(false);
      expect(t1d1.indeterminate).toBe(false);

      expect(t1d2.isChecked()).toBe(false);
      expect(t1d2.checked).toBe(false);
      expect(t1d2.isIndeterminate()).toBe(false);
      expect(t1d2.indeterminate).toBe(false);
    });

    it('checkStrictly 为 true, valueMode 为 all', async () => {
      const tree = new TreeStore({
        checkStrictly: true,
        checkable: true,
        valueMode: 'all',
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      tree.setChecked(['t1', 't1.1']);

      const checked = tree.getChecked();
      expect(checked.length).toBe(2);
      expect(checked[0]).toBe('t1');
      expect(checked[1]).toBe('t1.1');

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');

      expect(t1.isChecked()).toBe(true);
      expect(t1.checked).toBe(true);
      expect(t1.isIndeterminate()).toBe(false);
      expect(t1.indeterminate).toBe(false);

      expect(t1d1.isChecked()).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.isIndeterminate()).toBe(false);
      expect(t1d1.indeterminate).toBe(false);

      expect(t1d2.isChecked()).toBe(false);
      expect(t1d2.checked).toBe(false);
      expect(t1d2.isIndeterminate()).toBe(false);
      expect(t1d2.indeterminate).toBe(false);
    });
  });

  describe('treeStore:getCheckedNodes()', () => {
    it('获取所有选中节点', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }, {
            value: 't1.1.2',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }, {
            value: 't1.2.2',
          }],
        }],
      }]);

      // getCheckedNodes 方法获取节点时，需要节点先回流排序
      // 节点回流排序是延时操作
      await delay(0);

      tree.setChecked(['t1.1', 't1.2.1']);
      const checkedNodes = tree.getCheckedNodes();
      expect(checkedNodes.length).toBe(4);
      expect(checkedNodes[0].value).toBe('t1.1');
      expect(checkedNodes[1].value).toBe('t1.1.1');
      expect(checkedNodes[2].value).toBe('t1.1.2');
      expect(checkedNodes[3].value).toBe('t1.2.1');
    });

    it('获取目标节点下的选中节点', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }, {
            value: 't1.1.2',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }, {
            value: 't1.2.2',
          }],
        }],
      }]);

      tree.setChecked(['t1.1', 't1.2.1']);

      const checkedNodes = tree.getCheckedNodes('t1.1');
      expect(checkedNodes.length).toBe(3);
      expect(checkedNodes[0].value).toBe('t1.1');
      expect(checkedNodes[1].value).toBe('t1.1.1');
      expect(checkedNodes[2].value).toBe('t1.1.2');
    });

    it('目标节点不存在，则无法取得选中节点', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }, {
            value: 't1.1.2',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }, {
            value: 't1.2.2',
          }],
        }],
      }]);

      tree.setChecked(['t1.1', 't1.2.1']);

      const checkedNodes = tree.getCheckedNodes('t1.3');
      expect(checkedNodes.length).toBe(0);
    });
  });

  describe('treeStore:setChecked()', () => {
    it('setChecked 方法可以修改选中属性', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }]);

      tree.setChecked(['t1']);

      const t1 = tree.getNode('t1');
      const checked = tree.getChecked();
      expect(t1.isChecked()).toBe(true);
      expect(t1.checked).toBe(true);
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1.1');
    });

    // 手动测试中发现，选中节点意外影响了节点的高亮状态
    // 添加此测试排除模型出错的可能性
    it('setChecked 方法不会影响其他属性', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }]);

      tree.setActived(['t1']);
      tree.setChecked(['t1']);

      const t1 = tree.getNode('t1');
      const checked = tree.getChecked();
      const actived = tree.getActived();

      expect(t1.checked).toBe(true);
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1.1');

      expect(t1.actived).toBe(true);
      expect(actived.length).toBe(1);
      expect(actived[0]).toBe('t1');
    });

    it('setChecked 可新增选中节点', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }, {
            value: 't1.1.2',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }, {
            value: 't1.2.2',
          }],
        }],
      }]);

      tree.setChecked(['t1.2.1']);
      tree.setChecked(['t1.1']);
      const checked = tree.getChecked();
      expect(checked.length).toBe(3);
      expect(checked[0]).toBe('t1.1.1');
      expect(checked[1]).toBe('t1.1.2');
      expect(checked[2]).toBe('t1.2.1');
    });
  });

  describe('treeStore:replaceChecked()', () => {
    it('replaceChecked 可重设选中节点', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
          }, {
            value: 't1.1.2',
          }],
        }, {
          value: 't1.2',
          children: [{
            value: 't1.2.1',
          }, {
            value: 't1.2.2',
          }],
        }],
      }]);

      tree.setChecked(['t1.1', 't1.2.1']);
      let checked = tree.getChecked();
      expect(checked.length).toBe(3);
      expect(checked[0]).toBe('t1.1.1');
      expect(checked[1]).toBe('t1.1.2');
      expect(checked[2]).toBe('t1.2.1');

      tree.replaceChecked(['t1.2.2']);
      checked = tree.getChecked();
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1.2.2');
    });
  });

  describe('treeStore:resetChecked()', () => {
    it('resetChecked 可清空选中节点', async () => {
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

      tree.setChecked(['t1']);
      let checked = tree.getChecked();
      expect(checked.length).toBe(2);

      tree.resetChecked();
      checked = tree.getChecked();
      expect(checked.length).toBe(0);
    });
  });

  describe('treeStore:updateAll()', () => {
    it('updateAll 方法更新所有节点的状态', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }]);
      expect(tree.getNode('t1').checked).toBe(false);
      expect(tree.getNode('t1.1').checked).toBe(false);

      tree.checkedMap.set('t1.1', true);
      tree.updateAll();
      expect(tree.getNode('t1').checked).toBe(true);
      expect(tree.getNode('t1.1').checked).toBe(true);
    });
  });

  describe('treeNode:initChecked()', () => {
    it('父节点选中，插入子节点均为选中', async () => {
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

      tree.setChecked(['t1']);

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');

      expect(t1.checked).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d2.checked).toBe(true);

      tree.appendNodes('t1', {
        value: 't1.3'
      });
      expect(tree.getNode('t1.3').checked).toBe(true);

      tree.appendNodes('t1.1', {
        value: 't1.1.1'
      });
      expect(tree.getNode('t1.1.1').checked).toBe(true);

      tree.insertBefore('t1.1', {
        value: 't1.0',
      });
      expect(tree.getNode('t1.0').checked).toBe(true);

      tree.insertAfter('t1.3', {
        value: 't1.4',
      });
      expect(tree.getNode('t1.4').checked).toBe(true);

      tree.appendNodes({
        value: 't2'
      });
      expect(tree.getNode('t2').checked).toBe(false);

      tree.appendNodes('t2', {
        value: 't2.1'
      });
      expect(tree.getNode('t2.1').checked).toBe(false);
    });

    it('初始化节点设置为选中', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        checked: true,
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);
      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');
      expect(t1.checked).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d2.checked).toBe(true);
    });
  });

  describe('treeNode:checked', () => {
    it('关联选中态', async () => {
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

      tree.setChecked(['t1']);

      // 选中状态是延时更新的

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');

      expect(t1.isChecked()).toBe(true);
      expect(t1.checked).toBe(true);
      expect(t1.isIndeterminate()).toBe(false);
      expect(t1.indeterminate).toBe(false);

      expect(t1d1.isChecked()).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.isIndeterminate()).toBe(false);
      expect(t1d1.indeterminate).toBe(false);

      expect(t1d2.isChecked()).toBe(true);
      expect(t1d2.checked).toBe(true);
      expect(t1d2.isIndeterminate()).toBe(false);
      expect(t1d2.indeterminate).toBe(false);
    });

    it('半选状态', async () => {
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

      tree.setChecked(['t1.1']);

      // 选中状态是延时更新的

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');

      expect(t1.isChecked()).toBe(false);
      expect(t1.checked).toBe(false);
      expect(t1.isIndeterminate()).toBe(true);
      expect(t1.indeterminate).toBe(true);

      expect(t1d1.isChecked()).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.isIndeterminate()).toBe(false);
      expect(t1d1.indeterminate).toBe(false);

      expect(t1d2.isChecked()).toBe(false);
      expect(t1d2.checked).toBe(false);
      expect(t1d2.isIndeterminate()).toBe(false);
      expect(t1d2.indeterminate).toBe(false);
    });

    it('选中态补足', async () => {
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
      expect(t1.checked).toBe(false);
      expect(t1.indeterminate).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.indeterminate).toBe(false);
      expect(t1d2.checked).toBe(false);
      expect(t1d2.indeterminate).toBe(false);

      t1d2.setChecked(true, {
        directly: true,
      });
      expect(t1.checked).toBe(true);
      expect(t1.indeterminate).toBe(false);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.indeterminate).toBe(false);
      expect(t1d2.checked).toBe(true);
      expect(t1d2.indeterminate).toBe(false);
    });

    it('选中态转换半选', async () => {
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
      expect(t1.checked).toBe(true);
      expect(t1.indeterminate).toBe(false);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.indeterminate).toBe(false);
      expect(t1d2.checked).toBe(true);
      expect(t1d2.indeterminate).toBe(false);

      t1d2.setChecked(false, {
        directly: true,
      });
      expect(t1.checked).toBe(false);
      expect(t1.indeterminate).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.indeterminate).toBe(false);
      expect(t1d2.checked).toBe(false);
      expect(t1d2.indeterminate).toBe(false);
    });

    it('选中态清空', async () => {
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
      expect(t1.checked).toBe(true);
      expect(t1.indeterminate).toBe(false);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.indeterminate).toBe(false);
      expect(t1d2.checked).toBe(true);
      expect(t1d2.indeterminate).toBe(false);

      t1d1.setChecked(false, {
        directly: true,
      });
      t1d2.setChecked(false, {
        directly: true,
      });
      expect(t1.checked).toBe(false);
      expect(t1.indeterminate).toBe(false);
      expect(t1d1.checked).toBe(false);
      expect(t1d1.indeterminate).toBe(false);
      expect(t1d2.checked).toBe(false);
      expect(t1d2.indeterminate).toBe(false);
    });

    it('深层节点关联', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          children: [{
            value: 't1.1.1',
            children: [{
              value: 't1.1.1.1',
              children: [{
                value: 't1.1.1.1.1',
              }]
            }]
          }]
        }],
      }]);

      tree.setChecked(['t1.1.1']);

      expect(tree.getNode('t1').checked).toBe(true);
      expect(tree.getNode('t1.1').checked).toBe(true);
      expect(tree.getNode('t1.1.1').checked).toBe(true);
      expect(tree.getNode('t1.1.1.1').checked).toBe(true);
      expect(tree.getNode('t1.1.1.1.1').checked).toBe(true);

      tree.getNode('t1.1.1').setChecked(false, {
        directly: true,
      });
      expect(tree.getNode('t1').checked).toBe(false);
      expect(tree.getNode('t1.1').checked).toBe(false);
      expect(tree.getNode('t1.1.1').checked).toBe(false);
      expect(tree.getNode('t1.1.1.1').checked).toBe(false);
      expect(tree.getNode('t1.1.1.1.1').checked).toBe(false);
    });
  });

  describe('treeNode:setChecked()', () => {
    it('不使用选项的时候，仅获取预期状态，不更改节点状态', async () => {
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

      const checked = t1.setChecked(true);
      expect(checked.length).toBe(2);
      expect(checked[0]).toBe('t1.1');
      expect(checked[1]).toBe('t1.2');

      const allChecked = tree.getChecked();
      expect(allChecked.length).toBe(0);

      expect(t1.checked).toBe(false);
      expect(t1.isChecked()).toBe(false);
      expect(t1d1.checked).toBe(false);
      expect(t1d1.isChecked()).toBe(false);
      expect(t1d2.checked).toBe(false);
      expect(t1d2.isChecked()).toBe(false);
    });

    it('使用选项 directly 为 true 时，会修改节点状态', async () => {
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

      const checked = t1.setChecked(true, {
        directly: true,
      });
      expect(checked.length).toBe(2);
      expect(checked[0]).toBe('t1.1');
      expect(checked[1]).toBe('t1.2');

      const allChecked = tree.getChecked();
      expect(allChecked.length).toBe(2);
      expect(allChecked[0]).toBe('t1.1');
      expect(allChecked[1]).toBe('t1.2');

      expect(t1.checked).toBe(true);
      expect(t1.isChecked()).toBe(true);
      expect(t1d1.checked).toBe(true);
      expect(t1d1.isChecked()).toBe(true);
      expect(t1d2.checked).toBe(true);
      expect(t1d2.isChecked()).toBe(true);
    });

    it('checkStrictly 为 true 时，修改节点状态', async () => {
      const tree = new TreeStore({
        checkable: true,
        checkStrictly: true,
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

      const checked = t1.setChecked(true, {
        directly: true,
      });
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1');
      expect(t1.checked).toBe(true);
      expect(t1d1.checked).toBe(false);
      expect(t1d2.checked).toBe(false);

      t1.setChecked(false, {
        directly: true,
      });
      expect(t1.checked).toBe(false);
    });

    it('设置节点状态为未选中，取得返回结果但不更改状态', async () => {
      const tree = new TreeStore({
        checkable: true,
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
        }],
      }]);

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d1d1 = tree.getNode('t1.1.1');
      const t1d2 = tree.getNode('t1.2');

      tree.setChecked(['t1']);

      const checked = t1d1.setChecked(false);
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1.2');

      expect(t1.isChecked()).toBe(true);
      expect(t1d1.isChecked()).toBe(true);
      expect(t1d1d1.isChecked()).toBe(true);
      expect(t1d2.isChecked()).toBe(true);
    });

    it('设置节点状态为未选中，更改状态', async () => {
      const tree = new TreeStore({
        checkable: true,
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
        }],
      }]);

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d1d1 = tree.getNode('t1.1.1');
      const t1d2 = tree.getNode('t1.2');

      tree.setChecked(['t1']);

      const checked = t1d1.setChecked(false, {
        directly: true,
      });
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1.2');

      expect(t1.isChecked()).toBe(false);
      expect(t1.isIndeterminate()).toBe(true);
      expect(t1d1.isChecked()).toBe(false);
      expect(t1d1d1.isChecked()).toBe(false);
      expect(t1d2.isChecked()).toBe(true);
    });

    it('个别节点非可选节点时，视为特殊禁用状态', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          checkable: false,
        }, {
          value: 't1.2',
        }],
      }]);

      const t1 = tree.getNode('t1');
      const t1d1 = tree.getNode('t1.1');
      const t1d2 = tree.getNode('t1.2');

      const checked = t1.setChecked(true);
      expect(checked.length).toBe(1);
      expect(checked[0]).toBe('t1.2');

      t1d1.setChecked(true, {
        directly: true,
      });
      expect(t1.checked).toBe(false);
      expect(t1.indeterminate).toBe(false);
      expect(t1d1.checked).toBe(false);
      expect(t1d2.checked).toBe(false);

      t1.setChecked(true, {
        directly: true,
      });
      expect(t1.checked).toBe(false);
      expect(t1.indeterminate).toBe(true);
      expect(t1d1.checked).toBe(false);
      expect(t1d2.checked).toBe(true);
    });

    it('值与选中态一致，不变更选中态', async () => {
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
      expect(t1.checked).toBe(true);
      expect(t1.indeterminate).toBe(false);
      expect(t1d1.checked).toBe(true);
      expect(t1d2.checked).toBe(true);

      t1d1.setChecked(true, {
        directly: true,
      });
      expect(t1.checked).toBe(true);
      expect(t1.indeterminate).toBe(false);
      expect(t1d1.checked).toBe(true);
      expect(t1d2.checked).toBe(true);
    });
  });

  describe('treeNode:toggleChecked()', () => {
    it('获取节点切换结果，不会更改节点状态', async () => {
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

      tree.setChecked(['t1.1']);
      expect(t1.isChecked()).toBe(false);
      expect(t1.isIndeterminate()).toBe(true);
      expect(t1d1.isChecked()).toBe(true);
      expect(t1d2.isChecked()).toBe(false);

      let checked = t1.toggleChecked();
      expect(checked.length).toBe(2);
      expect(checked[0]).toBe('t1.1');
      expect(checked[1]).toBe('t1.2');

      expect(t1.isChecked()).toBe(false);
      expect(t1.isIndeterminate()).toBe(true);
      expect(t1d1.isChecked()).toBe(true);
      expect(t1d2.isChecked()).toBe(false);

      checked = t1d1.toggleChecked();
      expect(checked.length).toBe(0);

      expect(t1.isChecked()).toBe(false);
      expect(t1.isIndeterminate()).toBe(true);
      expect(t1d1.isChecked()).toBe(true);
      expect(t1d2.isChecked()).toBe(false);
    });
  });

  describe('treeNode:initChecked', () => {
    it('单一子节点选中，父节点为选中态', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          checked: true,
        }],
      }]);

      expect(tree.getChecked().length).toBe(1);
      expect(tree.getChecked()[0]).toBe('t1.1');
      expect(tree.getNode('t1').checked).toBe(true);
      expect(tree.getNode('t1.1').checked).toBe(true);
    });

    it('父节点为选中态，子节点也为选中态', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        checked: true,
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
        }],
      }]);

      expect(tree.getChecked().length).toBe(2);
      expect(tree.getChecked()[0]).toBe('t1.1');
      expect(tree.getChecked()[1]).toBe('t1.2');
      expect(tree.getNode('t1').checked).toBe(true);
      expect(tree.getNode('t1.1').checked).toBe(true);
      expect(tree.getNode('t1.2').checked).toBe(true);
    });

    it('第一个子节点为选中态，父节点为半选', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          checked: true,
        }, {
          value: 't1.2',
        }],
      }]);

      expect(tree.getChecked().length).toBe(1);
      expect(tree.getChecked()[0]).toBe('t1.1');
      expect(tree.getNode('t1').checked).toBe(false);
      expect(tree.getNode('t1').isIndeterminate()).toBe(true);
      expect(tree.getNode('t1.1').checked).toBe(true);
      expect(tree.getNode('t1.2').checked).toBe(false);
    });

    it('末尾子节点为选中态，父节点为半选', async () => {
      const tree = new TreeStore({
        checkable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }, {
          value: 't1.2',
          checked: true,
        }],
      }]);

      expect(tree.getChecked().length).toBe(1);
      expect(tree.getChecked()[0]).toBe('t1.2');
      expect(tree.getNode('t1').checked).toBe(false);
      expect(tree.getNode('t1').isIndeterminate()).toBe(true);
      expect(tree.getNode('t1.1').checked).toBe(false);
      expect(tree.getNode('t1.2').checked).toBe(true);
    });
  });
});
