import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  FILTER_INACTIVE_LEVEL,
  calculateExpand,
  checkOptionMatchKeyword,
  closeIconClickEffect,
  expandClickEffect,
  filterOptions,
  getCascaderItemClass,
  getCascaderItemIconClass,
  getCascaderValue,
  getFakeArrowIconClass,
  getFullPathLabel,
  getMultipleContent,
  getNodeStatusClass,
  getPanels,
  getSingleContent,
  getTreeValue,
  handleRemoveTagEffect,
  isEmptyValues,
  isFilterActive,
  isFilterLevelActive,
  isValueInvalid,
  treeNodesEffect,
  treeStoreExpendEffect,
  valueChangeEffect,
} from '@tdesign/components/cascader/utils';
import type { CascaderContextType, TreeNode, TreeNodeModel } from '@tdesign/components/cascader/types';

const STATUS = {
  disabled: 't-is-disabled',
  expanded: 't-is-expanded',
  selected: 't-is-selected',
};
const SIZE = { small: 't-size-s', medium: 't-size-m', large: 't-size-l' };

const asNode = (node: Record<string, unknown>) => node as unknown as TreeNode;
const asContext = (context: Record<string, unknown>) => context as unknown as CascaderContextType;

const createPathNodes = () => {
  const parent = asNode({ label: 'Parent', value: 'parent' });
  const child = asNode({
    data: { label: 'Child', value: 'child' },
    label: 'Child',
    value: 'child',
    getPath: () => [parent, child],
  });
  return { parent, child };
};

describe('Cascader utils', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('helper', () => {
    it('getSingleContent() handles empty, multiple, array, and missing-node values', () => {
      const treeStore = { getNodes: vi.fn(() => []) };

      expect(getSingleContent(asContext({ multiple: true, value: 'child', treeStore }))).toBe('');
      expect(getSingleContent(asContext({ multiple: false, value: '', treeStore }))).toBe('');
      expect(getSingleContent(asContext({ multiple: false, value: ['child'], treeStore }))).toBe('');
      expect(getSingleContent(asContext({ multiple: false, value: 0, treeStore }))).toBe(0);
      expect(getSingleContent(asContext({ multiple: false, value: 'unknown', treeStore }))).toBe('unknown');
    });

    it('getSingleContent() returns either the full path or leaf label', () => {
      const { child } = createPathNodes();
      const treeStore = { getNodes: vi.fn(() => [child]) };

      expect(getSingleContent(asContext({ multiple: false, value: 'child', treeStore, showAllLevels: true }))).toBe(
        'Parent / Child',
      );
      expect(getSingleContent(asContext({ multiple: false, value: 'child', treeStore, showAllLevels: false }))).toBe(
        'Child',
      );

      const pathlessNode = asNode({ getPath: (): TreeNode[] => [], label: 'Pathless' });
      treeStore.getNodes.mockReturnValue([pathlessNode]);
      expect(getSingleContent(asContext({ multiple: false, value: 'raw', treeStore, showAllLevels: true }))).toBe(
        'raw',
      );
    });

    it('getMultipleContent() handles incompatible and missing values', () => {
      expect(getMultipleContent(asContext({ multiple: false, value: [] }))).toEqual([]);
      expect(getMultipleContent(asContext({ multiple: true, value: 'child' }))).toEqual([]);
      expect(getMultipleContent(asContext({ multiple: true, value: ['child'], treeStore: undefined }))).toEqual([]);
    });

    it('getMultipleContent() returns leaf labels or full paths and drops unknown values', () => {
      const { child } = createPathNodes();
      const treeStore = {
        getNodes: vi.fn((value: string | string[]) => {
          if (Array.isArray(value)) return [child];
          return value === 'child' ? [child] : [];
        }),
      };

      expect(
        getMultipleContent(asContext({ multiple: true, value: ['child', 'unknown'], treeStore, showAllLevels: false })),
      ).toEqual(['Child']);
      expect(
        getMultipleContent(asContext({ multiple: true, value: ['child'], treeStore, showAllLevels: true })),
      ).toEqual(['Parent/Child']);
    });

    it('getPanels() groups sparse tree levels', () => {
      const nodes = [
        asNode({ level: 0, value: 'a' }),
        asNode({ level: 1, value: 'b' }),
        asNode({ level: 0, value: 'c' }),
      ];

      expect(getPanels(nodes).map((panel) => panel.map((node) => node.value))).toEqual([['a', 'c'], ['b']]);
    });

    it('getFullPathLabel() supports custom separators and missing nodes', () => {
      const { child } = createPathNodes();

      expect(getFullPathLabel(child)).toBe('Parent/Child');
      expect(getFullPathLabel(child, ' > ')).toBe('Parent > Child');
      expect(getFullPathLabel(undefined as unknown as TreeNode)).toBeUndefined();
    });

    it.each([
      [[], []],
      [
        ['a', 'b'],
        ['a', 'b'],
      ],
      [[{ label: 'A', value: 'a' }], ['a']],
      ['a', ['a']],
      [0, [0]],
      [{ label: 'A', value: 'a' }, ['a']],
      ['', []],
      [null, []],
      [Number.NaN, []],
    ])('getTreeValue(%j)', (value, expected) => {
      expect(getTreeValue(value)).toEqual(expected);
    });

    it('getCascaderValue() handles single and full value modes', () => {
      expect(getCascaderValue('leaf', 'single', false)).toBe('leaf');
      expect(getCascaderValue(['parent', 'leaf'], 'full', false)).toBe('leaf');
      expect(
        getCascaderValue(
          [
            ['parent', 'first'],
            ['parent', 'second'],
          ],
          'full',
          true,
        ),
      ).toEqual(['first', 'second']);
    });

    it.each([
      [0, false],
      [1, false],
      ['', true],
      [[], true],
      [{}, true],
      [Number.NaN, true],
    ])('isEmptyValues(%j)', (value, expected) => {
      expect(isEmptyValues(value)).toBe(expected);
    });

    it('isValueInvalid() validates single and multiple shapes', () => {
      expect(isValueInvalid('one', asContext({ multiple: true }))).toBe(true);
      expect(isValueInvalid(['one'], asContext({ multiple: true }))).toBe(false);
      expect(
        isValueInvalid(['parent', 'leaf'], asContext({ multiple: false, valueType: 'single', showAllLevels: false })),
      ).toBe(true);
      expect(
        isValueInvalid(['parent', 'leaf'], asContext({ multiple: false, valueType: 'full', showAllLevels: true })),
      ).toBe(false);
    });

    it('filter helpers handle inactive, string, and function filters', () => {
      const nodes = [
        asNode({ data: { label: 'Alpha', value: 'a' }, label: 'Alpha' }),
        asNode({ data: { label: '', value: 'empty' }, label: '' }),
        asNode({ data: { label: 'Beta', value: 'b' }, label: 'Beta' }),
      ];

      expect(FILTER_INACTIVE_LEVEL).toBe(-1);
      expect(isFilterLevelActive(-1)).toBe(false);
      expect(isFilterLevelActive(0)).toBe(true);
      expect(isFilterActive(undefined)).toBe(false);
      expect(isFilterActive('   ')).toBe(false);
      expect(isFilterActive('alpha')).toBe(true);
      expect(isFilterActive(() => true)).toBe(true);
      expect(checkOptionMatchKeyword(nodes[0], 'alpha')).toBe(true);
      expect(checkOptionMatchKeyword(nodes[1], 'alpha')).toBe(false);
      expect(checkOptionMatchKeyword(nodes[0], '')).toBe(false);
      expect(filterOptions(nodes, ' ALPHA ', 0)).toEqual([nodes[0]]);
      expect(filterOptions(nodes, '  ', 0)).toEqual(nodes);
      expect(filterOptions(nodes, (option, index) => option.value === 'b' && index === 2, 2)).toEqual([nodes[2]]);
    });
  });

  describe('className', () => {
    it('getFakeArrowIconClass() reflects disabled state', () => {
      expect(getFakeArrowIconClass('t', STATUS, asContext({ disabled: true }))).toEqual([
        't-cascader__icon',
        { 't-is-disabled': true },
      ]);
    });

    it('getNodeStatusClass() reflects selected, expanded, and disabled states', () => {
      const parent = asNode({ checked: false, disabled: false, expanded: true, isLeaf: () => false });
      expect(
        getNodeStatusClass(
          parent,
          STATUS,
          asContext({ checkStrictly: false, multiple: true, value: [], max: 0, isParentFilterable: false }),
        ),
      ).toEqual([{ 't-is-disabled': false, 't-is-expanded': true, 't-is-selected': true }]);

      const strictParent = asNode({ checked: true, disabled: false, expanded: true, isLeaf: () => false });
      expect(
        getNodeStatusClass(
          strictParent,
          STATUS,
          asContext({ checkStrictly: true, multiple: false, value: 'a', max: 0, isParentFilterable: false }),
        ),
      ).toEqual([{ 't-is-disabled': false, 't-is-expanded': true, 't-is-selected': true }]);

      const limitedLeaf = asNode({ checked: true, disabled: false, expanded: false, isLeaf: () => true });
      expect(
        getNodeStatusClass(
          limitedLeaf,
          STATUS,
          asContext({ checkStrictly: false, multiple: true, value: ['a'], max: 1, isParentFilterable: false }),
        ),
      ).toEqual([{ 't-is-disabled': true, 't-is-expanded': false, 't-is-selected': false }]);
    });

    it('getCascaderItemClass() and getCascaderItemIconClass() compose item state', () => {
      const node = asNode({
        checked: false,
        children: [],
        disabled: false,
        expanded: false,
        isLeaf: () => true,
      });
      const context = asContext({
        checkStrictly: false,
        isParentFilterable: false,
        max: 0,
        multiple: false,
        size: 'small',
        value: '',
      });

      expect(getCascaderItemClass('t', node, SIZE, STATUS, context)).toEqual([
        't-cascader__item',
        { 't-is-disabled': false, 't-is-expanded': false, 't-is-selected': false },
        't-size-s',
        { 't-cascader__item--leaf': true, 't-cascader__item--with-icon': true },
      ]);
      expect(getCascaderItemIconClass('t', node, STATUS, context)).toEqual([
        't-cascader__item-icon',
        't-icon',
        { 't-is-disabled': false, 't-is-expanded': false, 't-is-selected': false },
      ]);
    });
  });

  describe('effect', () => {
    const createEffectFixture = (overrides: Record<string, unknown> = {}) => {
      const treeStore = {
        getExpanded: vi.fn(() => ['parent']),
        getNode: vi.fn(),
        getNodes: vi.fn(() => []),
        refreshNodes: vi.fn(),
        replaceChecked: vi.fn(),
        replaceExpanded: vi.fn(),
        resetChecked: vi.fn(),
      };
      const context = asContext({
        checkStrictly: false,
        disabled: false,
        inputVal: '',
        isParentFilterable: false,
        max: 0,
        multiple: false,
        reserveKeyword: true,
        setExpand: vi.fn(),
        setInputVal: vi.fn(),
        setTreeNodes: vi.fn(),
        setValue: vi.fn(),
        setVisible: vi.fn(),
        treeNodes: [],
        treeStore,
        value: '',
        valueType: 'single',
        ...overrides,
      });
      return { context, treeStore };
    };

    const createEffectNode = (overrides: Record<string, unknown> = {}) => {
      const node = asNode({
        checked: false,
        disabled: false,
        getModel: vi.fn(() => ({ value: 'child' })),
        getPath: vi.fn(() => [{ value: 'parent' }, { value: 'child' }]),
        isChecked: vi.fn(() => false),
        isLeaf: vi.fn(() => true),
        setChecked: vi.fn(() => ['child']),
        setExpanded: vi.fn(() => ['parent']),
        value: 'child',
        ...overrides,
      });
      return node;
    };

    it('expandClickEffect() ignores disabled and max-limited nodes', () => {
      const node = createEffectNode({ disabled: true });
      const { context } = createEffectFixture();
      expandClickEffect('click', 'click', node, context);
      expect(node.setExpanded).not.toHaveBeenCalled();

      const limitedNode = createEffectNode();
      const limited = createEffectFixture({ max: 1, multiple: true, value: ['selected'] });
      expandClickEffect('click', 'click', limitedNode, limited.context);
      expect(limitedNode.setExpanded).not.toHaveBeenCalled();
    });

    it('expandClickEffect() expands visible nodes and tracks multi-select expansion', () => {
      const node = createEffectNode({ isLeaf: vi.fn(() => false) });
      const visibleNode = createEffectNode({ visible: true });
      const { context, treeStore } = createEffectFixture({ multiple: true, treeNodes: [visibleNode], value: [] });
      treeStore.getNodes.mockReturnValue([visibleNode]);

      expandClickEffect('click', 'click', node, context);
      expect(treeStore.replaceExpanded).toHaveBeenCalledWith(['parent']);
      expect(context.setTreeNodes).toHaveBeenCalledWith([visibleNode]);
      expect(context.setExpand).toHaveBeenCalledWith(['parent']);
    });

    it('expandClickEffect() refreshes filtered nodes without tracking parent-filter expansion', () => {
      const node = createEffectNode({ isLeaf: vi.fn(() => false) });
      const { context, treeStore } = createEffectFixture({
        inputVal: 'child',
        isParentFilterable: true,
        multiple: true,
        value: [],
      });

      expandClickEffect('hover', 'hover', node, context);
      expect(treeStore.refreshNodes).toHaveBeenCalledOnce();
      expect(context.setExpand).not.toHaveBeenCalled();
    });

    it('expandClickEffect() selects a single leaf in single and full value modes', () => {
      const node = createEffectNode();
      const single = createEffectFixture();

      expandClickEffect('click', 'click', node, single.context);
      expect(single.treeStore.resetChecked).toHaveBeenCalledOnce();
      expect(single.context.setValue).toHaveBeenCalledWith('child', 'check', { value: 'child' });
      expect(single.context.setVisible).toHaveBeenCalledWith(false, {});

      const fullNode = createEffectNode();
      const full = createEffectFixture({ checkStrictly: true, valueType: 'full' });
      expandClickEffect('click', 'click', fullNode, full.context);
      expect(full.context.setValue).toHaveBeenCalledWith(['parent', 'child'], 'check', { value: 'child' });
      expect(full.context.setVisible).not.toHaveBeenCalled();
    });

    it('expandClickEffect() closes a click selection when hover trigger or filtering is active', () => {
      const node = createEffectNode();
      const hover = createEffectFixture({ checkStrictly: true });
      expandClickEffect('hover', 'click', node, hover.context);
      expect(hover.context.setVisible).toHaveBeenCalledWith(false, {});

      const filtered = createEffectFixture({ checkStrictly: true, inputVal: 'child' });
      expandClickEffect('click', 'click', createEffectNode(), filtered.context);
      expect(filtered.context.setVisible).toHaveBeenCalledWith(false, {});
    });

    it('valueChangeEffect() ignores unavailable nodes', () => {
      const fixture = createEffectFixture();
      valueChangeEffect(undefined as unknown as TreeNode, fixture.context);
      valueChangeEffect(createEffectNode(), createEffectFixture({ disabled: true }).context);
      valueChangeEffect(createEffectNode({ disabled: true }), fixture.context);
      expect(fixture.context.setValue).not.toHaveBeenCalled();
    });

    it('valueChangeEffect() warns for negative max and stops values over a positive max', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const negative = createEffectFixture({ max: -1 });
      valueChangeEffect(createEffectNode(), negative.context);
      expect(warn).toHaveBeenCalledWith('TDesign Warn:', 'max should > 0');

      const limited = createEffectFixture({ max: 1 });
      valueChangeEffect(createEffectNode({ setChecked: vi.fn(() => ['a', 'b']) }), limited.context);
      expect(limited.context.setValue).not.toHaveBeenCalled();
    });

    it('valueChangeEffect() restores expansion after clearing the final value', () => {
      vi.useFakeTimers();
      const { context, treeStore } = createEffectFixture();
      valueChangeEffect(createEffectNode({ setChecked: vi.fn(() => []) }), context);

      vi.runAllTimers();
      expect(treeStore.replaceExpanded).toHaveBeenCalledWith(['parent']);
      expect(treeStore.refreshNodes).toHaveBeenCalledOnce();
      expect(context.setValue).toHaveBeenCalledWith([], 'check', { value: 'child' });
    });

    it('valueChangeEffect() closes a fully selected filter result and clears an unreserved keyword', () => {
      const first = createEffectNode({ value: 'first' });
      const second = createEffectNode({ value: 'second' });
      const node = createEffectNode({ checked: true, setChecked: vi.fn(() => ['first', 'second']) });
      const { context } = createEffectFixture({
        inputVal: 'query',
        reserveKeyword: false,
        treeNodes: [first, second],
      });

      valueChangeEffect(node, context);
      expect(context.setVisible).toHaveBeenCalledWith(false, {});
      expect(context.setValue).toHaveBeenCalledWith(['first', 'second'], 'uncheck', { value: 'child' });
      expect(context.setInputVal).toHaveBeenCalledWith('');
    });

    it('valueChangeEffect() emits full paths', () => {
      const first = createEffectNode({ value: 'first' });
      const { context, treeStore } = createEffectFixture({ treeNodes: [first], valueType: 'full' });
      treeStore.getNode.mockReturnValue(first);

      valueChangeEffect(createEffectNode({ setChecked: vi.fn(() => ['first']) }), context);
      expect(context.setValue).toHaveBeenCalledWith([['parent', 'child']], 'check', { value: 'child' });
    });

    it('closeIconClickEffect() clears single and multiple values', () => {
      const single = createEffectFixture();
      closeIconClickEffect(single.context);
      expect(single.context.setVisible).toHaveBeenCalledWith(false, {});
      expect(single.context.setValue).toHaveBeenCalledWith('', 'clear');

      const multiple = createEffectFixture({ multiple: true });
      closeIconClickEffect(multiple.context);
      expect(multiple.context.setValue).toHaveBeenCalledWith([], 'clear');
    });

    it('handleRemoveTagEffect() ignores disabled state and handles clear notifications', () => {
      const onRemove = vi.fn();
      const disabled = createEffectFixture({ disabled: true });
      handleRemoveTagEffect(disabled.context, 0, onRemove);
      expect(disabled.context.setValue).not.toHaveBeenCalled();

      const clear = createEffectFixture({ value: ['a'] });
      handleRemoveTagEffect(clear.context, undefined, onRemove);
      expect(onRemove).toHaveBeenCalledWith({ value: ['a'], node: undefined });
      expect(() => handleRemoveTagEffect(clear.context, undefined, undefined)).not.toThrow();
    });

    it('handleRemoveTagEffect() removes single and full path values', () => {
      const onRemove = vi.fn();
      const node = createEffectNode({ checked: true, setChecked: vi.fn(() => ['second']) });
      const single = createEffectFixture({ value: ['first', 'second'] });
      single.treeStore.getNodes.mockReturnValue([node]);

      handleRemoveTagEffect(single.context, 0, onRemove);
      expect(single.context.setValue).toHaveBeenCalledWith(['second'], 'uncheck', { value: 'child' });
      expect(onRemove).toHaveBeenCalledWith({ value: ['second'], node });

      const full = createEffectFixture({ value: [['parent', 'child']], valueType: 'full' });
      full.treeStore.getNodes.mockReturnValue([node]);
      full.treeStore.getNode.mockReturnValue(node);
      handleRemoveTagEffect(full.context, 0, undefined);
      expect(full.context.setValue).toHaveBeenCalledWith([['parent', 'child']], 'uncheck', { value: 'child' });
    });

    it('treeNodesEffect() handles missing stores, visible nodes, string filters, parent filters, and function filters', () => {
      const setTreeNodes = vi.fn();
      expect(() => treeNodesEffect('', undefined, setTreeNodes, undefined, false)).not.toThrow();

      const parent = createEffectNode({
        getPath: vi.fn(() => [{ label: 'Parent' }]),
        isLeaf: vi.fn(() => false),
        visible: true,
      });
      const leaf = createEffectNode({
        getPath: vi.fn(() => [{ label: 'Parent' }, { label: 'Leaf' }]),
        isLeaf: vi.fn(() => true),
        visible: true,
      });
      const hidden = createEffectNode({ isLeaf: vi.fn(() => true), visible: false });
      const treeStore = { getNodes: vi.fn(() => [parent, leaf, hidden]), nodes: [parent, leaf, hidden] };

      treeNodesEffect('', treeStore as never, setTreeNodes, undefined, false);
      expect(setTreeNodes).toHaveBeenLastCalledWith([parent, leaf]);
      treeNodesEffect('ParentLeaf', treeStore as never, setTreeNodes, undefined, false);
      expect(setTreeNodes).toHaveBeenLastCalledWith([leaf]);
      treeNodesEffect('Parent', treeStore as never, setTreeNodes, undefined, true);
      expect(setTreeNodes).toHaveBeenLastCalledWith([parent, leaf]);

      const filter = vi.fn(
        (keyword: string, node: TreeNodeModel) => keyword === 'custom' && node === (leaf as unknown as TreeNodeModel),
      );
      treeNodesEffect('custom', treeStore as never, setTreeNodes, filter, false);
      expect(filter).toHaveBeenCalled();
      expect(setTreeNodes).toHaveBeenLastCalledWith([leaf]);
    });

    it('calculateExpand() returns empty, refreshes unknown nodes, and includes ancestors', () => {
      const { parent, child } = createPathNodes();
      child.getParents = vi.fn(() => [parent]);
      const treeStore = { getNode: vi.fn(), refreshNodes: vi.fn() };

      expect(calculateExpand(treeStore as never, [])).toEqual([]);
      treeStore.getNode.mockReturnValue(undefined);
      expect(calculateExpand(treeStore as never, ['unknown'])).toEqual([]);
      expect(treeStore.refreshNodes).toHaveBeenCalledOnce();
      treeStore.getNode.mockReturnValue(child);
      expect(calculateExpand(treeStore as never, ['child'])).toEqual(['child', 'parent']);
    });

    it('treeStoreExpendEffect() initializes and replaces tracked expansion', () => {
      expect(() => treeStoreExpendEffect(undefined, 'child', [])).not.toThrow();
      const { parent, child } = createPathNodes();
      child.getParents = vi.fn(() => [parent]);
      const treeStore = {
        getExpanded: vi.fn(() => ['child']),
        getNode: vi.fn(() => child),
        refreshNodes: vi.fn(),
        replaceExpanded: vi.fn(),
      };

      treeStoreExpendEffect(treeStore as never, 'child', []);
      expect(treeStore.replaceExpanded).toHaveBeenCalledWith(['child', 'parent']);

      treeStoreExpendEffect(treeStore as never, 'child', ['parent']);
      expect(treeStore.replaceExpanded).toHaveBeenLastCalledWith(['parent']);
      expect(treeStore.refreshNodes).toHaveBeenCalledTimes(2);

      treeStore.getExpanded.mockReturnValue([]);
      treeStoreExpendEffect(treeStore as never, '', ['parent']);
      // getExpanded() returns an array, and even an empty array is truthy in the current implementation.
      expect(treeStore.replaceExpanded).toHaveBeenCalledTimes(3);
    });
  });
});
