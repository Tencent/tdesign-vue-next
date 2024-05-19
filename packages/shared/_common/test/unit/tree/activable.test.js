import TreeStore from '../../../js/tree/tree-store';
import { delay } from './kit';

// 节点激活状态
describe('tree:activable', () => {
  describe('treeStore:activable', () => {
    it('可激活的节点，默认只能激活一个', async () => {
      const tree = new TreeStore({
        activable: true,
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

      tree.getNode('t1.1').setActived(true, {
        directly: true,
      });
      expect(tree.getNode('t1').isActived()).toBe(false);
      expect(tree.getNode('t1').actived).toBe(false);
      expect(tree.getNode('t1.1').isActived()).toBe(true);
      expect(tree.getNode('t1.1').actived).toBe(true);

      tree.getNode('t1').setActived(true, {
        directly: true,
      });
      expect(tree.getNode('t1').isActived()).toBe(true);
      expect(tree.getNode('t1').actived).toBe(true);
      expect(tree.getNode('t1.1').isActived()).toBe(false);
      expect(tree.getNode('t1.1').actived).toBe(false);
    });

    it('activable 为 false, 无法激活节点', async () => {
      const tree = new TreeStore({
        activable: false,
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

      tree.getNode('t1.1').setActived(true, {
        directly: true,
      });
      expect(tree.getNode('t1.1').isActived()).toBe(false);
      expect(tree.getNode('t1.1').actived).toBe(false);
    });
  });

  describe('treeStore:activeMultiple', () => {
    it('activeMultiple 为 true, 可激活多个节点', async () => {
      const tree = new TreeStore({
        activable: true,
        activeMultiple: true,
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

      tree.getNode('t1.1').setActived(true, {
        directly: true,
      });
      tree.getNode('t1').setActived(true, {
        directly: true,
      });
      expect(tree.getNode('t1').actived).toBe(true);
      expect(tree.getNode('t1.1').actived).toBe(true);
    });
  });

  describe('treeStore:getActived()', () => {
    it('activeMultiple 为 true, 可激活多个节点', async () => {
      const tree = new TreeStore({
        activable: true,
        activeMultiple: true,
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

      tree.setActived(['t1.1', 't2.1']);
      const actived = tree.getActived();
      expect(actived.length).toBe(2);
      expect(actived).toContain('t1.1');
      expect(actived).toContain('t2.1');
    });
  });

  describe('treeStore:getActivedNodes()', () => {
    it('getActivedNodes 可以获取激活节点', async () => {
      const tree = new TreeStore({
        activable: true,
        activeMultiple: true,
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
      await delay(0);

      tree.setActived(['t1', 't1.1', 't2', 't2.1']);
      const activedNodes = tree.getActivedNodes();
      expect(activedNodes.length).toBe(4);
    });

    it('getActivedNodes 可以选取指定节点下的激活节点', async () => {
      const tree = new TreeStore({
        activable: true,
        activeMultiple: true,
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

      tree.setActived(['t1', 't1.1', 't2', 't2.1']);
      const activedNodes = tree.getActivedNodes('t1');
      expect(activedNodes.length).toBe(2);
      expect(activedNodes[0].value).toBe('t1');
      expect(activedNodes[1].value).toBe('t1.1');
    });
  });

  describe('treeStore:replaceActived()', () => {
    it('replaceActived 可替换激活节点', async () => {
      const tree = new TreeStore({
        activable: true,
        activeMultiple: true,
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

      tree.setActived(['t1', 't1.1']);
      expect(tree.getNode('t1').actived).toBe(true);
      expect(tree.getNode('t1.1').actived).toBe(true);
      expect(tree.getNode('t2').actived).toBe(false);
      expect(tree.getNode('t2.1').actived).toBe(false);

      tree.replaceActived(['t2', 't2.1']);
      expect(tree.getNode('t1').actived).toBe(false);
      expect(tree.getNode('t1.1').actived).toBe(false);
      expect(tree.getNode('t2').actived).toBe(true);
      expect(tree.getNode('t2.1').actived).toBe(true);
    });
  });

  describe('treeStore:setActived()', () => {
    it('setActived 设置激活节点，未受到 activable 属性影响', async () => {
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

      tree.setActived(['t1', 't1.1']);
      expect(tree.getNode('t1').actived).toBe(true);
      expect(tree.getNode('t1.1').actived).toBe(false);
      expect(tree.getNode('t2').actived).toBe(false);
      expect(tree.getNode('t2.1').actived).toBe(false);
    });

    // todo: setActived 设置激活节点，应当受到 activable 属性影响
    // todo: 子节点 activable 属性影响力高于 store 的 activable 属性
    // todo: activeMultiple 为 false, 则取能够设置 actived 为 true 的第一个节点为激活节点

    it('setActived 可设置多个节点激活属性', async () => {
      const tree = new TreeStore({
        activable: true,
        activeMultiple: true,
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

      tree.setActived(['t1', 't1.1']);
      expect(tree.getNode('t1').actived).toBe(true);
      expect(tree.getNode('t1.1').actived).toBe(true);
      expect(tree.getNode('t2').actived).toBe(false);
      expect(tree.getNode('t2.1').actived).toBe(false);
    });
  });

  describe('treeStore:resetActived()', () => {
    it('resetActived 可清空多个节点激活属性', async () => {
      const tree = new TreeStore({
        activable: true,
        activeMultiple: true,
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

      tree.setActived(['t1', 't1.1']);
      expect(tree.getNode('t1').actived).toBe(true);
      expect(tree.getNode('t1.1').actived).toBe(true);
      expect(tree.getNode('t2').actived).toBe(false);
      expect(tree.getNode('t2.1').actived).toBe(false);

      tree.resetActived();
      expect(tree.getNode('t1').actived).toBe(false);
      expect(tree.getNode('t1.1').actived).toBe(false);
      expect(tree.getNode('t2').actived).toBe(false);
      expect(tree.getNode('t2.1').actived).toBe(false);
    });
  });

  describe('treeNode:initActived()', () => {
    it('数据初始化时可安排单个节点是否允许激活', async () => {
      const tree = new TreeStore({
        activable: true,
        activeMultiple: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          activable: false,
          value: 't1.1',
        }],
      }, {
        value: 't2',
        children: [{
          value: 't2.1',
        }],
      }]);

      tree.getNode('t1').setActived(true, {
        directly: true,
      });
      tree.getNode('t1.1').setActived(true, {
        directly: true,
      });
      expect(tree.getNode('t1').actived).toBe(true);
      expect(tree.getNode('t1.1').actived).toBe(false);
    });

    it('数据初始化节点激活状态', async () => {
      const tree = new TreeStore({
        activable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          actived: true,
        }],
      }]);
      expect(tree.getNode('t1.1').isActived()).toBe(true);
    });
  });

  describe('treeNode:setActived()', () => {
    it('setActived 方法默认不改变状态', async () => {
      const tree = new TreeStore({
        activable: true,
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

      const actived = tree.getNode('t1').setActived(true);
      expect(actived.length).toBe(1);
      expect(tree.getNode('t1').isActived()).toBe(false);
    });

    it('setActived 方法配置选项来改变状态', async () => {
      const tree = new TreeStore({
        activable: true,
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

      let actived = tree.getNode('t1').setActived(true, {
        directly: true,
      });
      expect(actived.length).toBe(1);
      expect(tree.getNode('t1').isActived()).toBe(true);

      actived = tree.getNode('t1').setActived(false);
      expect(actived.length).toBe(0);
      expect(tree.getNode('t1').isActived()).toBe(true);
    });
  });

  describe('treeNode:toggleActived()', () => {
    it('toggleActived 切换选中态，不改变状态', async () => {
      const tree = new TreeStore({
        activable: true,
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

      tree.getNode('t1').setActived(true, {
        directly: true,
      });
      const actived = tree.getNode('t1').toggleActived();
      expect(actived.length).toBe(0);
      expect(tree.getNode('t1').isActived()).toBe(true);
    });
  });
});
