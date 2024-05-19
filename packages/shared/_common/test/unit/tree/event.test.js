import TreeStore from '../../../js/tree/tree-store';
import { delay } from './kit';

// tree 事件
describe('tree:event', () => {
  describe('treeStore:onLoad', () => {
    it('节点延迟加载时，触发 onLoad 事件', async () => {
      const pm = new Promise((resolve) => {
        const tree = new TreeStore({
          async load() {
            await delay(1);
            return {
              value: 't1.1',
            };
          },
          onLoad(info) {
            resolve(info);
          }
        });
        tree.append([{
          value: 't1',
          children: true,
        }]);
      });

      const info = await pm;
      expect(info.node.value).toBe('t1');
      expect(info.data.value).toBe('t1.1');
    });

    it('节点延迟加载时，onLoad 事件也可以从事件对象绑定', async () => {
      const tree = new TreeStore({
        async load() {
          await delay(1);
          return {
            value: 't1.1',
          };
        },
      });
      const pm = new Promise((resolve) => {
        tree.emitter.on('load', resolve);
        tree.append([{
          value: 't1',
          children: true,
        }]);
      });

      const info = await pm;
      expect(info.node.value).toBe('t1');
      expect(info.data.value).toBe('t1.1');
    });
  });

  describe('treeStore:onReflow', () => {
    it('连续多次节点操作，仅触发一次 reflow 事件', async () => {
      let reflowCount = 0;
      let tree = null;
      const pm = new Promise((resolve) => {
        tree = new TreeStore({
          onReflow() {
            reflowCount += 1;
            resolve();
          }
        });
        tree.append([{
          value: 't1',
        }]);
        tree.append([{
          value: 't2',
        }]);
      });

      await pm;
      expect(reflowCount).toBe(1);
      expect(tree.getNodes()[0].value).toBe('t1');
      expect(tree.getNodes()[1].value).toBe('t2');
    });

    it('reflow 事件 可以从事件对象绑定', async () => {
      let reflowCount = 0;
      const tree = new TreeStore();
      const pm = new Promise((resolve) => {
        tree.emitter.on('reflow', () => {
          reflowCount += 1;
          resolve();
        });
        tree.append([{
          value: 't1',
        }]);
        tree.insertAfter('t1', {
          value: 't2',
        });
        tree.insertBefore('t1', {
          value: 't0',
        });
      });

      await pm;
      expect(reflowCount).toBe(1);
      expect(tree.getNodes()[0].value).toBe('t0');
      expect(tree.getNodes()[1].value).toBe('t1');
      expect(tree.getNodes()[2].value).toBe('t2');
    });
  });

  describe('treeStore:onUpdate', () => {
    it('连续多次属性操作，值触发一次 update 事件', async () => {
      let updateCount = 0;
      const pm = new Promise((resolve) => {
        const tree = new TreeStore({
          activable: true,
          onUpdate(info) {
            updateCount += 1;
            resolve(info);
          }
        });
        tree.append([{
          value: 't1',
        }, {
          value: 't2',
        }]);
        tree.getNode('t2').setActived(true, {
          directly: true,
        });
      });
      const info = await pm;
      await delay(1);
      expect(updateCount).toBe(1);
      expect(info.nodes.length).toBe(2);
      expect(info.nodes[0].value).toBe('t1');
    });

    it('可以通过 emitter 对象绑定 update 事件', async () => {
      let updateCount = 0;
      const tree = new TreeStore({
        activable: true,
        activeMultiple: true,
      });
      tree.append([{
        value: 't1',
      }, {
        value: 't2',
      }, {
        value: 't3',
      }]);
      await delay(0);
      const pm = new Promise((resolve) => {
        tree.emitter.on('update', (info) => {
          updateCount += 1;
          resolve(info);
        });
        tree.setActived(['t1', 't2']);
      });
      const info = await pm;
      await delay(1);
      expect(updateCount).toBe(1);
      expect(info.nodes.length).toBe(2);
      expect(info.nodes[0].value).toBe('t1');
      expect(info.nodes[1].value).toBe('t2');
    });
  });
});
