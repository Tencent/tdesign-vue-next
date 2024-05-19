import TreeStore from '../../../js/tree/tree-store';
import TreeNode from '../../../js/tree/tree-node';
import { delay } from './kit';

// 树组件初始化
describe('tree:init', () => {
  describe('treeStore:init()', () => {
    it('TreeStore 初始化空数据', () => {
      const tree = new TreeStore();
      expect(typeof tree).toBe('object');
      expect(typeof tree.config).toBe('object');
    });

    it('TreeNode 初始化空节点', () => {
      const tree = new TreeStore();
      const node = new TreeNode(tree, {});
      expect(typeof node).toBe('object');
      expect(typeof node.value).toBe('string');
    });

    it('TreeNode 初始化正常数据', () => {
      const tree = new TreeStore();
      const node = new TreeNode(tree, {
        value: '1',
        children: [{
          value: '1.1',
        }],
      });
      expect(typeof node).toBe('object');
      expect(node.value).toBe('1');
      expect(Array.isArray(node.children)).toBe(true);
      expect(node.children[0].value).toBe('1.1');
    });
  });

  describe('treeStore:draggable', () => {
    it('可在整个 tree 配置 draggable', async () => {
      const tree = new TreeStore({
        draggable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }]);
      expect(tree.getNode('t1.1').isDraggable()).toBe(true);
    });

    it('单个节点可独立配置 draggable 属性', async () => {
      const tree = new TreeStore({
        draggable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
          draggable: false,
        }],
      }]);
      expect(tree.getNode('t1').isDraggable()).toBe(true);
      expect(tree.getNode('t1.1').isDraggable()).toBe(false);
    });
  });

  describe('treeStore:keys', () => {
    it('可配置节点属性读取位置', async () => {
      const tree = new TreeStore({
        keys: {
          label: 'name',
          value: 'key',
          children: 'list',
        },
      });
      tree.append([{
        name: 't1root',
        key: 't1',
        list: [{
          name: 't1d1',
          key: 't1.1',
        }],
      }]);
      await delay(0);

      expect(tree.getNode('t1').label).toBe('t1root');
      expect(tree.getNode('t1.1').label).toBe('t1d1');
      expect(tree.getNodes().length).toBe(2);
    });
  });

  describe('treeNode:set()', () => {
    it('用 set 方法控制节点属性', async () => {
      const tree = new TreeStore({
        draggable: true,
      });
      tree.append([{
        value: 't1',
        children: [{
          value: 't1.1',
        }],
      }]);
      tree.getNode('t1.1').set({
        draggable: false,
      });
      expect(tree.getNode('t1').isDraggable()).toBe(true);
      expect(tree.getNode('t1.1').isDraggable()).toBe(false);
    });
  });
});
