import TreeStore from '../../../js/tree/tree-store';
import { delay } from './kit';

// 节点延迟加载
describe('tree:lazy', () => {
  describe('treeStore:lazy', () => {
    it('lazy 属性为 true 时，延迟加载节点', async () => {
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

      await pm;
      // promise 触发后，还要再等一个 reflow 事件
      await delay(0);

      nodes = tree.getNodes();
      expect(nodes.length).toBe(2);
      expect(nodes[1].value).toBe('t1.1');
    });

    it('延迟加载的节点，选中属性自动生效', async () => {
      const tree = new TreeStore({
        checkable: true,
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
      tree.getNode('t1').setChecked('t1', {
        directly: true,
      });
      await delay(0);

      let nodes = tree.getNodes();
      expect(nodes.length).toBe(1);
      const pm = new Promise((resolve) => {
        tree.emitter.on('load', resolve);
      });
      tree.getNode('t1').setExpanded(true, {
        directly: true,
      });

      await pm;
      // promise 触发后，还要再等一个 reflow 事件
      await delay(0);

      nodes = tree.getNodes();
      expect(nodes.length).toBe(2);
      expect(nodes[1].value).toBe('t1.1');
      expect(tree.getNode('t1').checked).toBe(true);
      expect(tree.getNode('t1.1').isChecked()).toBe(true);
      expect(tree.getNode('t1.1').checked).toBe(true);
    });
  });
});
