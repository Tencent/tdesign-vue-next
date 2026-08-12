import { ref } from 'vue';
import { describe, expect, it } from 'vitest';

import { VMenu } from '../utils';

const createMenu = (isMutex = false, expandValues: Array<string | number> = []) =>
  new VMenu({ isMutex: ref(isMutex), expandValues });

describe('Menu utils', () => {
  describe('VMenu', () => {
    it('adds top-level nodes in insertion order', () => {
      const menu = createMenu();

      menu.add({ value: 'alpha', parent: undefined });
      menu.add({ value: 2, parent: null });

      expect(menu.data.children.map((item) => item.value)).toEqual(['alpha', 2]);
      expect(menu.data.children[0].parent).toBe(menu.data);
      expect(menu.cache.size).toBe(0);
    });

    it('caches a child added before any parent and adopts it later', () => {
      const menu = createMenu();

      menu.add({ value: 'child', parent: 'parent' });

      expect(menu.data.children).toHaveLength(0);
      expect([...menu.cache].map((item) => item.value)).toEqual(['child']);

      menu.add({ value: 'parent', parent: undefined });

      expect(menu.cache.size).toBe(0);
      expect(menu.data.children[0].children.map((item) => item.value)).toEqual(['child']);
    });

    it('caches a child whose parent cannot be found in a non-empty tree', () => {
      const menu = createMenu();
      menu.add({ value: 'root', parent: undefined });

      menu.add({ value: 'orphan', parent: 'missing' });

      expect([...menu.cache].map((item) => item.value)).toEqual(['orphan']);
    });

    it('adds a child to an existing parent', () => {
      const menu = createMenu();
      menu.add({ value: 'parent', parent: undefined });

      menu.add({ value: 'child', parent: 'parent', content: 'Child content' });

      expect(menu.getChild('parent')).toEqual([
        expect.objectContaining({ value: 'child', content: 'Child content', parent: 'parent' }),
      ]);
    });

    it('caches a duplicate child rather than inserting it twice', () => {
      const menu = createMenu();
      menu.add({ value: 'parent', parent: undefined });
      menu.add({ value: 'child', parent: 'parent' });

      menu.add({ value: 'child', parent: 'parent' });

      expect(menu.getChild('parent')).toHaveLength(1);
      expect([...menu.cache].map((item) => item.value)).toEqual(['child']);
    });

    it('selects the full path to a nested value', () => {
      const menu = createMenu();
      menu.add({ value: 'top', parent: undefined });
      menu.add({ value: 'middle', parent: 'top' });
      menu.add({ value: 'leaf', parent: 'middle' });

      expect(menu.select('leaf')).toEqual(['top', 'middle', 'leaf']);
      expect(menu.select('middle')).toEqual(['top', 'middle']);
    });

    it('returns the requested value when it is not registered', () => {
      const menu = createMenu();

      expect(menu.select('missing')).toEqual(['missing']);
    });

    it('selects safely when the tree is absent', () => {
      const menu = createMenu();
      menu.data = null;

      expect(menu.select('missing')).toEqual(['missing']);
    });

    it('expands and collapses values without mutex mode', () => {
      const menu = createMenu(false, ['initial']);

      expect(menu.expand('next')).toEqual(['initial', 'next']);
      expect(menu.expand('initial')).toEqual(['next']);
    });

    it('collapses expanded sibling submenus in mutex mode', () => {
      const menu = createMenu(true);
      menu.add({ value: 'first', parent: undefined });
      menu.add({ value: 'first-child', parent: 'first' });
      menu.add({ value: 'second', parent: undefined });
      menu.add({ value: 'second-child', parent: 'second' });

      expect(menu.expand('first')).toEqual(['first']);
      expect(menu.expand('second')).toEqual(['second']);
    });

    it('keeps expanded values from other levels in mutex mode', () => {
      const menu = createMenu(true, ['top-sibling']);
      menu.add({ value: 'top', parent: undefined });
      menu.add({ value: 'nested-first', parent: 'top' });
      menu.add({ value: 'nested-first-child', parent: 'nested-first' });
      menu.add({ value: 'nested-second', parent: 'top' });
      menu.add({ value: 'nested-second-child', parent: 'nested-second' });

      menu.expand('nested-first');

      expect(menu.expand('nested-second')).toEqual(['top-sibling', 'nested-second']);
    });

    it('does not remove expanded leaf siblings in mutex mode', () => {
      const menu = createMenu(true, ['leaf-one']);
      menu.add({ value: 'parent', parent: undefined });
      menu.add({ value: 'leaf-one', parent: 'parent' });
      menu.add({ value: 'leaf-two', parent: 'parent' });

      expect(menu.expand('leaf-two')).toEqual(['leaf-one', 'leaf-two']);
    });

    it('expands safely in mutex mode when the tree is absent', () => {
      const menu = createMenu(true);
      menu.data = null;

      expect(menu.expand('missing')).toEqual(['missing']);
    });

    it('returns children for a registered node and an empty array otherwise', () => {
      const menu = createMenu();
      menu.add({ value: 'parent', parent: undefined });
      menu.add({ value: 'child', parent: 'parent' });

      expect(menu.getChild('parent').map((item) => item.value)).toEqual(['child']);
      expect(menu.getChild('missing')).toEqual([]);
    });

    it('removes top-level and deeply nested nodes', () => {
      const menu = createMenu();
      menu.add({ value: 'top', parent: undefined });
      menu.add({ value: 'middle', parent: 'top' });
      menu.add({ value: 'leaf', parent: 'middle' });
      menu.add({ value: 'other', parent: undefined });

      menu.remove('leaf');
      expect(menu.getChild('middle')).toEqual([]);

      menu.remove('top');
      expect(menu.data.children.map((item) => item.value)).toEqual(['other']);
    });

    it('removes cached nodes and tolerates missing values', () => {
      const menu = createMenu();
      menu.add({ value: 'orphan', parent: 'missing' });

      menu.remove('orphan');
      menu.remove('still-missing');

      expect(menu.cache.size).toBe(0);
      expect(menu.data.children).toEqual([]);
    });

    it('tolerates an empty tree during removal', () => {
      const menu = createMenu();
      menu.data = null;

      expect(() => menu.remove('missing')).not.toThrow();
    });
  });
});
