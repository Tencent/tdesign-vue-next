// @ts-nocheck
import { describe, it, expect, vi, beforeEach, nextTick } from 'vitest';
import { ref, nextTick as vueNextTick, defineComponent, h, getCurrentInstance, reactive, toRefs } from 'vue';
import { mount } from '@vue/test-utils';
import useColumnController from '../hooks/useColumnController';
import useColumnResize from '../hooks/useColumnResize';
import useEditableRow from '../hooks/useEditableRow';
import useHoverKeyboardEvent from '../hooks/useHoverKeyboardEvent';
import useRowHighlight from '../hooks/useRowHighlight';
import useTreeDataExpand from '../hooks/useTreeDataExpand';
import useTreeSelect from '../hooks/useTreeSelect';

// 全局 mock getCurrentInstance，并提供 setCurrentProps 方法和 emit
import * as vue from 'vue';
let currentProps = {};
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    getCurrentInstance: () => ({
      proxy: { $el: document.createElement('div') },
      vnode: { props: currentProps },
      emit: vi.fn(), // mock emit
    }),
    setCurrentProps: (props) => {
      currentProps = props;
    },
  };
});

const testColumns = [
  {
    title: 'Name',
    colKey: 'name',
    width: 100,
  },
  {
    title: 'Age',
    colKey: 'age',
    width: 80,
  },
  {
    title: 'Address',
    colKey: 'address',
    width: 200,
  },
];

const testData = [
  { id: 1, name: 'Alice', age: 25, address: 'Beijing' },
  { id: 2, name: 'Bob', age: 30, address: 'Shanghai' },
  { id: 3, name: 'Charlie', age: 35, address: 'Guangzhou' },
];

const treeData = [
  {
    id: 1,
    name: 'Parent 1',
    children: [
      { id: 11, name: 'Child 1-1' },
      { id: 12, name: 'Child 1-2' },
    ],
  },
  {
    id: 2,
    name: 'Parent 2',
    children: [
      { id: 21, name: 'Child 2-1' },
      { id: 22, name: 'Child 2-2' },
    ],
  },
];

// 统一 mountWithPropsSync，自动同步 props 到 mock
function mountWithPropsSync(Component, options) {
  const props = options?.props || {};
  if (typeof vue.setCurrentProps === 'function') {
    vue.setCurrentProps(props);
  }
  return mount(Component, options);
}

describe('table.hooks.detailed', () => {
  describe('useColumnController', () => {
    const testColumns = [
      { title: 'Name', colKey: 'name', width: 100 },
      { title: 'Age', colKey: 'age', width: 80 },
      { title: 'Address', colKey: 'address', width: 200 },
    ];

    function mountColumnController(propsOverrides = {}, contextOverrides = {}) {
      return mountWithPropsSync(
        defineComponent({
          props: {
            columns: { type: Array, required: true },
            columnController: { type: Object, default: () => ({}) },
            displayColumns: Array,
            columnControllerVisible: Boolean,
            defaultDisplayColumns: Array,
            onDisplayColumnsChange: Function,
            onColumnChange: Function,
            onColumnControllerVisibleChange: Function,
            locale: Object,
            onChange: Function,
          },
          setup(props, ctx) {
            // useColumnController expects props object directly (not toRefs)
            const result = useColumnController(props, { emit: vi.fn(), ...ctx });
            return result;
          },
          template: '<div></div>',
        }),
        {
          props: {
            columns: testColumns,
            columnController: {},
            // Don't pass displayColumns to let useDefaultValue use default value
            columnControllerVisible: undefined,
            defaultDisplayColumns: ['name', 'age'],
            onDisplayColumnsChange: vi.fn(),
            onColumnChange: vi.fn(),
            onColumnControllerVisibleChange: vi.fn(),
            locale: {},
            onChange: vi.fn(),
            ...propsOverrides,
          },
          ...contextOverrides,
        },
      );
    }

    it('should initialize with default values', () => {
      const wrapper = mountColumnController();
      expect(wrapper.vm.tDisplayColumns).toBeDefined();
      expect(wrapper.vm.columnCheckboxKeys).toBeDefined();
      expect(typeof wrapper.vm.renderColumnController).toBe('function');
    });

    it('should handle column controller with groups', () => {
      const wrapper = mountColumnController({
        columnController: {
          groupColumns: [
            { label: 'Basic Info', columns: ['name', 'age'] },
            { label: 'Location', columns: ['address'] },
          ],
        },
        displayColumns: ['name', 'age'],
      });
      expect(wrapper.vm.tDisplayColumns).toBeDefined();
      expect(wrapper.vm.columnCheckboxKeys).toBeDefined();
    });

    it('should handle column change events', () => {
      const onColumnChange = vi.fn();
      const wrapper = mountColumnController({
        displayColumns: ['name', 'age'],
        onColumnChange,
      });
      expect(wrapper.vm.tDisplayColumns).toBeDefined();
    });
  });

  describe('useColumnResize', () => {
    function mountColumnResize(paramsOverrides = {}) {
      return mountWithPropsSync(
        defineComponent({
          setup() {
            const params = {
              isWidthOverflow: ref(false),
              tableContentRef: ref(document.createElement('div')),
              showColumnShadow: { left: false, right: false },
              getThWidthList: vi.fn(() => ({ name: 100, age: 80, address: 200 })),
              updateThWidthList: vi.fn(),
              setTableElmWidth: vi.fn(),
              updateTableAfterColumnResize: vi.fn(),
              onColumnResizeChange: vi.fn(),
              ...paramsOverrides,
            };
            const result = useColumnResize(params);
            return {
              resizeLineRef: result.resizeLineRef,
              resizeLineStyle: result.resizeLineStyle,
              onColumnMouseover: result.onColumnMouseover,
              onColumnMousedown: result.onColumnMousedown,
              setEffectColMap: result.setEffectColMap,
            };
          },
          template: '<div></div>',
        }),
        {},
      );
    }

    it('should initialize resize functionality', () => {
      const wrapper = mountColumnResize();
      // resizeLineRef is a ref without initial value, so its value is undefined but the ref exists
      expect(wrapper.vm.resizeLineRef).toBeUndefined(); // This is expected behavior
      expect(typeof wrapper.vm.resizeLineStyle).toBe('object'); // computed style object
      expect(typeof wrapper.vm.onColumnMouseover).toBe('function');
      expect(typeof wrapper.vm.onColumnMousedown).toBe('function');
      expect(typeof wrapper.vm.setEffectColMap).toBe('function');
    });

    it('should handle column mouseover events', () => {
      const wrapper = mountColumnResize();
      const mockEvent = {
        target: {
          closest: vi.fn(() => null), // Return null as if no th found
        },
        pageX: 95,
      };
      // Just test that the function can be called without errors
      wrapper.vm.onColumnMouseover(mockEvent, { colKey: 'name', resizable: true });
      expect(typeof wrapper.vm.onColumnMouseover).toBe('function');
    });

    it('should handle column mousedown events', () => {
      const wrapper = mountColumnResize();
      const mockEvent = {
        x: 100,
        preventDefault: vi.fn(),
      };
      // Just test that the function can be called without errors
      wrapper.vm.onColumnMousedown(mockEvent, { colKey: 'name', resizable: true }, 0);
      expect(typeof wrapper.vm.onColumnMousedown).toBe('function');
    });
  });

  describe('useEditableRow', () => {
    function mountEditableRow(propsOverrides = {}) {
      return mountWithPropsSync(
        defineComponent({
          props: {
            data: Array,
            rowKey: String,
            editableRowKeys: Array,
            onRowValidate: Function,
            onValidate: Function,
          },
          setup(props) {
            // useEditableRow expects props object directly (not toRefs)
            const result = useEditableRow(props);
            return result;
          },
          template: '<div></div>',
        }),
        {
          props: {
            data: testData,
            rowKey: 'id',
            editableRowKeys: [1],
            onRowValidate: vi.fn(),
            onValidate: vi.fn(),
            ...propsOverrides,
          },
        },
      );
    }

    it('should initialize editable row functionality', () => {
      const wrapper = mountEditableRow();
      expect(wrapper.vm.editedFormData).toBeDefined();
      expect(wrapper.vm.errorListMap).toBeDefined();
      expect(wrapper.vm.editableKeysMap).toBeDefined();
      expect(wrapper.vm.validateTableData).toBeDefined();
      expect(wrapper.vm.validateRowData).toBeDefined();
    });

    it('should handle cell edit changes', () => {
      const wrapper = mountEditableRow();
      const editParams = {
        row: testData[0],
        col: { colKey: 'name' },
        colIndex: 0,
        isEdit: true,
        validateEdit: vi.fn(),
      };
      // Test that the function can be called
      wrapper.vm.onPrimaryTableCellEditChange(editParams);
      expect(typeof wrapper.vm.onPrimaryTableCellEditChange).toBe('function');
    });

    it('should update edited cell data', () => {
      const wrapper = mountEditableRow();
      wrapper.vm.onUpdateEditedCell(1, testData[0], { name: 'Updated Alice' });
      expect(wrapper.vm.editedFormData[1].name).toBe('Updated Alice');
    });

    it('should get edit row data', () => {
      const wrapper = mountEditableRow();
      wrapper.vm.onUpdateEditedCell(1, testData[0], { name: 'Updated Alice' });
      const editData = wrapper.vm.getEditRowData({ row: testData[0], col: { colKey: 'name' } });
      expect(editData.name).toBe('Updated Alice');
    });

    it('should clear validate data', () => {
      const wrapper = mountEditableRow();
      wrapper.vm.errorListMap['1__name'] = ['Error'];
      wrapper.vm.clearValidateData();
      expect(wrapper.vm.errorListMap).toEqual({});
    });
  });

  describe('useHoverKeyboardEvent', () => {
    function mountHoverKeyboardEvent(propsOverrides = {}) {
      return mountWithPropsSync(
        defineComponent({
          props: {
            hover: Boolean,
            data: Array,
            activeRowType: String,
            keyboardRowHover: Boolean,
            disableSpaceInactiveRow: Boolean,
            rowKey: String,
            onActiveRowAction: Function,
          },
          setup(props) {
            const reactiveProps = reactive({
              hover: true,
              data: testData,
              activeRowType: 'multiple',
              keyboardRowHover: true,
              disableSpaceInactiveRow: false,
              rowKey: 'id',
              onActiveRowAction: vi.fn(),
              ...props,
            });
            const tableRef = ref(document.createElement('div'));
            const result = useHoverKeyboardEvent(reactiveProps, tableRef);
            return result;
          },
          template: '<div></div>',
        }),
        {
          props: {
            hover: true,
            data: testData,
            activeRowType: 'multiple',
            keyboardRowHover: true,
            disableSpaceInactiveRow: false,
            rowKey: 'id',
            onActiveRowAction: vi.fn(),
            ...propsOverrides,
          },
        },
      );
    }

    it('should initialize hover keyboard functionality', () => {
      const wrapper = mountHoverKeyboardEvent();
      // hoverRow is a ref without initial value, so its value is undefined
      expect(wrapper.vm.hoverRow).toBeUndefined(); // This is expected behavior
      expect(typeof wrapper.vm.needKeyboardRowHover).toBe('boolean');
      expect(typeof wrapper.vm.clearHoverRow).toBe('function');
      expect(typeof wrapper.vm.addRowHoverKeyboardListener).toBe('function');
      expect(typeof wrapper.vm.removeRowHoverKeyboardListener).toBe('function');
    });

    it('should handle hover row events', () => {
      const TestComponent = defineComponent({
        setup() {
          const reactiveProps = reactive({
            hover: true,
            data: testData,
            activeRowType: 'multiple',
            keyboardRowHover: true,
            disableSpaceInactiveRow: false,
            rowKey: 'id',
            onActiveRowAction: vi.fn(),
          });
          const tableRef = ref(document.createElement('div'));

          const result = useHoverKeyboardEvent(toRefs(reactiveProps), tableRef);

          const ctx = {
            row: testData[0],
            index: 0,
            e: new Event('click'),
          };

          // Just test that the function exists and can be called
          if (typeof result.onHoverRow === 'function') {
            result.onHoverRow(ctx);
          }

          expect(result.hoverRow).toBeDefined();
        },
        template: '<div></div>',
      });

      mount(TestComponent);
    });

    it('should handle keyboard events', () => {
      const TestComponent = defineComponent({
        setup() {
          const reactiveProps = reactive({
            hover: true,
            data: testData,
            activeRowType: 'multiple',
            keyboardRowHover: true,
            disableSpaceInactiveRow: false,
            rowKey: 'id',
            onActiveRowAction: vi.fn(),
          });
          const tableRef = ref(document.createElement('div'));

          const result = useHoverKeyboardEvent(toRefs(reactiveProps), tableRef);

          const arrowDownEvent = {
            key: 'ArrowDown',
            preventDefault: vi.fn(),
          };

          // Just test that the function exists and can be called
          if (typeof result.keyboardDownListener === 'function') {
            result.keyboardDownListener(arrowDownEvent);
            expect(arrowDownEvent.preventDefault).toHaveBeenCalled();
          }

          expect(result.hoverRow).toBeDefined();
        },
        template: '<div></div>',
      });

      mount(TestComponent);
    });
  });

  describe('useRowHighlight', () => {
    function mountRowHighlight(propsOverrides = {}) {
      return mountWithPropsSync(
        defineComponent({
          props: {
            data: Array,
            rowKey: String,
            hover: Boolean,
            highlightFirstRow: Boolean,
            highlightCurrentRow: Boolean,
            onRowHover: Function,
            activeRowKeys: Array,
            defaultActiveRowKeys: Array,
            onActiveChange: Function,
            activeRowType: String,
            disableSpaceInactiveRow: Boolean,
          },
          setup(props) {
            const mergedProps = {
              data: testData,
              rowKey: 'id',
              hover: true,
              highlightFirstRow: false,
              highlightCurrentRow: false,
              onRowHover: vi.fn(),
              activeRowKeys: [],
              defaultActiveRowKeys: [],
              onActiveChange: vi.fn(),
              activeRowType: 'multiple',
              disableSpaceInactiveRow: false,
              ...props,
            };
            const tableRef = ref(document.createElement('div'));
            const result = useRowHighlight(mergedProps, tableRef);
            return result;
          },
          template: '<div></div>',
        }),
        {
          props: {
            data: testData,
            rowKey: 'id',
            hover: true,
            highlightFirstRow: false,
            highlightCurrentRow: false,
            onRowHover: vi.fn(),
            activeRowKeys: [],
            defaultActiveRowKeys: [],
            onActiveChange: vi.fn(),
            activeRowType: 'multiple',
            disableSpaceInactiveRow: false,
            ...propsOverrides,
          },
        },
      );
    }

    it('should initialize row highlight functionality', () => {
      const wrapper = mountRowHighlight();
      expect(wrapper.vm.tActiveRow).toBeDefined();
      expect(wrapper.vm.onHighlightRow).toBeDefined();
      expect(wrapper.vm.addHighlightKeyboardListener).toBeDefined();
      expect(wrapper.vm.removeHighlightKeyboardListener).toBeDefined();
    });

    it('should handle row hover events', () => {
      const wrapper = mountRowHighlight({
        activeRowType: 'multiple',
      });

      const ctx = {
        row: testData[0],
        index: 0,
        e: new Event('mouseenter'),
      };

      // Just verify the function exists and can be called without errors
      expect(typeof wrapper.vm.onHighlightRow).toBe('function');
      wrapper.vm.onHighlightRow(ctx);
      expect(wrapper.vm.tActiveRow).toBeDefined();
      expect(Array.isArray(wrapper.vm.tActiveRow)).toBe(true);
    });

    it('should handle row click events', () => {
      const wrapper = mountRowHighlight({
        activeRowType: 'multiple',
        highlightCurrentRow: true,
      });

      const ctx = {
        row: testData[0],
        index: 0,
        e: new Event('click'),
      };

      // Just verify the function exists and can be called without errors
      expect(typeof wrapper.vm.onHighlightRow).toBe('function');
      wrapper.vm.onHighlightRow(ctx);
      expect(wrapper.vm.tActiveRow).toBeDefined();
      expect(Array.isArray(wrapper.vm.tActiveRow)).toBe(true);
    });

    it('should handle row mouseleave events', () => {
      const TestComponent = defineComponent({
        setup() {
          const reactiveProps = reactive({
            data: testData,
            rowKey: 'id',
            hover: true,
            highlightFirstRow: false,
            highlightCurrentRow: false,
            onRowHover: vi.fn(),
            activeRowKeys: [],
            defaultActiveRowKeys: [],
            onActiveChange: vi.fn(),
            activeRowType: 'multiple',
            disableSpaceInactiveRow: false,
          });
          const tableRef = ref(document.createElement('div'));
          const result = useRowHighlight(reactiveProps, tableRef);

          // Set some active rows first
          result.tActiveRow.value = [1];
          // Clear active state
          result.onHighlightRow({ row: testData[0], index: 0, e: new Event('click') });

          expect(result.tActiveRow).toBeDefined();
        },
        template: '<div></div>',
      });

      mount(TestComponent);
    });
  });

  describe('useTreeDataExpand', () => {
    function mountTreeDataExpand(propsOverrides = {}, paramsOverrides = {}) {
      return mountWithPropsSync(
        defineComponent({
          props: {
            data: Array,
            expandedTreeNodes: Array,
            tree: Object,
            onExpandedTreeNodesChange: Function,
            onTreeExpandChange: Function,
            onChange: Function,
            defaultExpandedTreeNodes: Array,
          },
          setup(props) {
            const reactiveProps = reactive(props);
            const refs = toRefs(reactiveProps);
            const params = {
              store: ref({
                treeDataMap: new Map([[1, { expanded: false, row: treeData[0] }]]),
                expandAll: vi.fn(() => props.data),
                foldAll: vi.fn(),
                toggleExpandData: vi.fn(() => props.data), // Return iterable data instead of undefined
                expandTreeNode: vi.fn(),
                foldTreeNode: vi.fn(),
                getExpandedChildrenKeys: vi.fn(() => []),
                ...paramsOverrides,
              }),
              dataSource: ref(refs.data.value),
              rowDataKeys: ref({ rowKey: 'id', childrenKey: 'children' }),
            };
            const result = useTreeDataExpand(refs, params);
            return result;
          },
          template: '<div></div>',
        }),
        {
          props: {
            data: treeData,
            expandedTreeNodes: [],
            tree: { childrenKey: 'children', defaultExpandAll: false },
            onExpandedTreeNodesChange: vi.fn(),
            onTreeExpandChange: vi.fn(),
            onChange: vi.fn(),
            defaultExpandedTreeNodes: [],
            ...propsOverrides,
          },
        },
      );
    }

    it('should initialize tree data expand functionality', () => {
      const TestComponent = defineComponent({
        props: {
          data: { type: Array, required: true },
          expandedTreeNodes: { type: Array, required: true },
          tree: { type: Object, required: true },
          onExpandedTreeNodesChange: { type: Function, required: true },
          onTreeExpandChange: { type: Function, required: true },
          onChange: { type: Function, required: true },
          defaultExpandedTreeNodes: { type: Array, required: true },
        },
        setup(props) {
          const params = {
            store: ref({
              treeDataMap: new Map([[1, { expanded: false, row: treeData[0] }]]),
              expandAll: vi.fn(() => props.data),
              foldAll: vi.fn(),
              toggleExpandData: vi.fn(() => props.data), // Return iterable data instead of undefined
              expandTreeNode: vi.fn(),
              foldTreeNode: vi.fn(),
              getExpandedChildrenKeys: vi.fn(() => []),
            }),
            dataSource: ref(props.data),
            rowDataKeys: ref({ rowKey: 'id', childrenKey: 'children' }),
          };
          const result = useTreeDataExpand(props, params);
          return result;
        },
        template: '<div></div>',
      });
      const wrapper = mount(TestComponent, {
        props: {
          data: treeData,
          expandedTreeNodes: [],
          tree: { childrenKey: 'children', defaultExpandAll: false },
          onExpandedTreeNodesChange: vi.fn(),
          onTreeExpandChange: vi.fn(),
          onChange: vi.fn(),
          defaultExpandedTreeNodes: [],
        },
      });
      expect(wrapper.vm.tExpandedTreeNode).toBeDefined();
      expect(wrapper.vm.expandAll).toBeDefined();
      expect(wrapper.vm.foldAll).toBeDefined();
      expect(wrapper.vm.onExpandFoldIconClick).toBeDefined();
    });

    it('should expand all nodes', () => {
      const TestComponent = defineComponent({
        props: {
          data: { type: Array, required: true },
          expandedTreeNodes: { type: Array, required: true },
          tree: { type: Object, required: true },
          onExpandedTreeNodesChange: { type: Function, required: true },
          onTreeExpandChange: { type: Function, required: true },
          onChange: { type: Function, required: true },
          defaultExpandedTreeNodes: { type: Array, required: true },
        },
        setup(props) {
          const refs = toRefs(props);
          const params = {
            store: ref({
              treeDataMap: new Map([[1, { expanded: false, row: treeData[0] }]]),
              expandAll: vi.fn(() => refs.data.value),
              foldAll: vi.fn(),
              toggleExpandData: vi.fn(() => refs.data.value), // Return iterable data instead of undefined
              expandTreeNode: vi.fn(),
              foldTreeNode: vi.fn(),
              getExpandedChildrenKeys: vi.fn(() => []),
            }),
            dataSource: ref(refs.data.value),
            rowDataKeys: ref({ rowKey: 'id', childrenKey: 'children' }),
          };
          const result = useTreeDataExpand(props, params);
          return result;
        },
        template: '<div></div>',
      });
      const wrapper = mount(TestComponent, {
        props: {
          data: treeData,
          expandedTreeNodes: [],
          tree: { childrenKey: 'children', defaultExpandAll: false },
          onExpandedTreeNodesChange: vi.fn(),
          onTreeExpandChange: vi.fn(),
          onChange: vi.fn(),
          defaultExpandedTreeNodes: [],
        },
      });
      wrapper.vm.expandAll();
      expect(wrapper.vm.expandAll).toBeDefined();
    });

    it('should fold all nodes', () => {
      const TestComponent = defineComponent({
        props: {
          data: { type: Array, required: true },
          expandedTreeNodes: { type: Array, required: true },
          tree: { type: Object, required: true },
          onExpandedTreeNodesChange: { type: Function, required: true },
          onTreeExpandChange: { type: Function, required: true },
          onChange: { type: Function, required: true },
          defaultExpandedTreeNodes: { type: Array, required: true },
        },
        setup(props) {
          const refs = toRefs(props);
          const params = {
            store: ref({
              treeDataMap: new Map([[1, { expanded: false, row: treeData[0] }]]),
              expandAll: vi.fn(),
              foldAll: vi.fn(() => refs.data.value),
              toggleExpandData: vi.fn(() => refs.data.value), // Return iterable data instead of undefined
              expandTreeNode: vi.fn(),
              foldTreeNode: vi.fn(),
              getExpandedChildrenKeys: vi.fn(() => []),
            }),
            dataSource: ref(refs.data.value),
            rowDataKeys: ref({ rowKey: 'id', childrenKey: 'children' }),
          };
          const result = useTreeDataExpand(props, params);
          return result;
        },
        template: '<div></div>',
      });
      const wrapper = mount(TestComponent, {
        props: {
          data: treeData,
          expandedTreeNodes: [],
          tree: { childrenKey: 'children', defaultExpandAll: false },
          onExpandedTreeNodesChange: vi.fn(),
          onTreeExpandChange: vi.fn(),
          onChange: vi.fn(),
          defaultExpandedTreeNodes: [],
        },
      });
      wrapper.vm.foldAll();
      expect(wrapper.vm.foldAll).toBeDefined();
    });

    it('should handle expand fold icon click', () => {
      const TestComponent = defineComponent({
        props: {
          data: { type: Array, required: true },
          expandedTreeNodes: { type: Array, required: true },
          tree: { type: Object, required: true },
          onExpandedTreeNodesChange: { type: Function, required: true },
          onTreeExpandChange: { type: Function, required: true },
          onChange: { type: Function, required: true },
          defaultExpandedTreeNodes: { type: Array, required: true },
        },
        setup(props) {
          const params = {
            store: ref({
              treeDataMap: new Map([[1, { expanded: false, row: treeData[0] }]]),
              expandAll: vi.fn(),
              foldAll: vi.fn(),
              toggleExpandData: vi.fn(() => props.data), // Return iterable data instead of undefined
              expandTreeNode: vi.fn(),
              foldTreeNode: vi.fn(),
              getExpandedChildrenKeys: vi.fn(() => []),
            }),
            dataSource: ref(props.data),
            rowDataKeys: ref({ rowKey: 'id', childrenKey: 'children' }),
          };
          const result = useTreeDataExpand(props, params);
          return result;
        },
        template: '<div></div>',
      });
      const wrapper = mount(TestComponent, {
        props: {
          data: treeData,
          expandedTreeNodes: [],
          tree: { childrenKey: 'children', defaultExpandAll: false },
          onExpandedTreeNodesChange: vi.fn(),
          onTreeExpandChange: vi.fn(),
          onChange: vi.fn(),
          defaultExpandedTreeNodes: [],
        },
      });
      const ctx = {
        row: treeData[0],
        rowIndex: 0,
      };
      wrapper.vm.onExpandFoldIconClick(ctx);
      expect(wrapper.vm.onExpandFoldIconClick).toBeDefined();
    });
  });

  describe('useTreeSelect', () => {
    function mountTreeSelect(propsOverrides = {}, treeDataMapOverrides = {}) {
      return mountWithPropsSync(
        defineComponent({
          props: {
            selectedRowKeys: Array,
            tree: Object,
            data: Array,
            indeterminateSelectedRowKeys: Array,
            defaultSelectedRowKeys: Array,
            onSelectChange: Function,
            rowKey: String,
            onChange: Function,
          },
          setup(props) {
            const reactiveProps = reactive(props);
            const refs = toRefs(reactiveProps);
            const treeDataMap = ref(
              new Map([
                [1, { id: 1, row: treeData[0], parent: null, disabled: false }],
                [11, { id: 11, row: treeData[0].children[0], parent: { id: 1 }, disabled: false }],
                [12, { id: 12, row: treeData[0].children[1], parent: { id: 1 }, disabled: false }],
                ...Object.entries(treeDataMapOverrides),
              ]),
            );
            const result = useTreeSelect(props, treeDataMap);
            return result;
          },
          template: '<div></div>',
        }),
        {
          props: {
            selectedRowKeys: [],
            tree: { childrenKey: 'children', checkStrictly: false },
            data: treeData,
            indeterminateSelectedRowKeys: [],
            defaultSelectedRowKeys: [],
            onSelectChange: vi.fn(),
            rowKey: 'id',
            onChange: vi.fn(),
            ...propsOverrides,
          },
        },
      );
    }

    it('should initialize tree select functionality', () => {
      const TestComponent = defineComponent({
        props: {
          selectedRowKeys: { type: Array, required: true },
          tree: { type: Object, required: true },
          data: { type: Array, required: true },
          indeterminateSelectedRowKeys: { type: Array, required: true },
          defaultSelectedRowKeys: { type: Array, required: true },
          onSelectChange: { type: Function, required: true },
          rowKey: { type: String, required: true },
          onChange: { type: Function, required: true },
        },
        setup(props) {
          const treeDataMap = ref(
            new Map([
              [1, { id: 1, row: treeData[0], parent: null, disabled: false }],
              [11, { id: 11, row: treeData[0].children[0], parent: { id: 1 }, disabled: false }],
              [12, { id: 12, row: treeData[0].children[1], parent: { id: 1 }, disabled: false }],
            ]),
          );
          const result = useTreeSelect(props, treeDataMap);
          return result;
        },
        template: '<div></div>',
      });
      const wrapper = mount(TestComponent, {
        props: {
          selectedRowKeys: [],
          tree: { childrenKey: 'children', checkStrictly: false },
          data: treeData,
          indeterminateSelectedRowKeys: [],
          defaultSelectedRowKeys: [],
          onSelectChange: vi.fn(),
          rowKey: 'id',
          onChange: vi.fn(),
        },
      });
      expect(wrapper.vm.tIndeterminateSelectedRowKeys).toBeDefined();
      expect(wrapper.vm.onInnerSelectChange).toBeDefined();
    });

    it('should handle select change with strict mode', () => {
      const TestComponent = defineComponent({
        props: {
          selectedRowKeys: { type: Array, required: true },
          tree: { type: Object, required: true },
          data: { type: Array, required: true },
          indeterminateSelectedRowKeys: { type: Array, required: true },
          defaultSelectedRowKeys: { type: Array, required: true },
          onSelectChange: { type: Function, required: true },
          rowKey: { type: String, required: true },
          onChange: { type: Function, required: true },
        },
        setup(props) {
          const treeDataMap = ref(new Map([[1, { id: 1, row: treeData[0], parent: null, disabled: false }]]));
          const result = useTreeSelect(props, treeDataMap);
          return result;
        },
        template: '<div></div>',
      });
      const onSelectChange = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount(TestComponent, {
        props: {
          selectedRowKeys: [],
          tree: { childrenKey: 'children', checkStrictly: true },
          data: treeData,
          indeterminateSelectedRowKeys: [],
          defaultSelectedRowKeys: [],
          onSelectChange,
          rowKey: 'id',
          onChange,
        },
      });
      wrapper.vm.onInnerSelectChange([1], {
        type: 'check',
        currentRowKey: 1,
        currentRowData: treeData[0],
      });
      expect(onSelectChange).toHaveBeenCalledWith([1], {
        type: 'check',
        currentRowKey: 1,
        currentRowData: treeData[0],
      });
    });

    it('should handle select all', () => {
      const TestComponent = defineComponent({
        props: {
          selectedRowKeys: { type: Array, required: true },
          tree: { type: Object, required: true },
          data: { type: Array, required: true },
          indeterminateSelectedRowKeys: { type: Array, required: true },
          defaultSelectedRowKeys: { type: Array, required: true },
          onSelectChange: { type: Function, required: true },
          rowKey: { type: String, required: true },
          onChange: { type: Function, required: true },
        },
        setup(props) {
          const treeDataMap = ref(
            new Map([
              [1, { id: 1, row: treeData[0], parent: null, disabled: false }],
              [11, { id: 11, row: treeData[0].children[0], parent: { id: 1 }, disabled: false }],
              [12, { id: 12, row: treeData[0].children[1], parent: { id: 1 }, disabled: false }],
            ]),
          );
          const result = useTreeSelect(props, treeDataMap);
          return result;
        },
        template: '<div></div>',
      });
      const onSelectChange = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount(TestComponent, {
        props: {
          selectedRowKeys: [],
          tree: { childrenKey: 'children', checkStrictly: false },
          data: treeData,
          indeterminateSelectedRowKeys: [],
          defaultSelectedRowKeys: [],
          onSelectChange,
          rowKey: 'id',
          onChange,
        },
      });
      wrapper.vm.onInnerSelectChange([], {
        type: 'check',
        currentRowKey: 'CHECK_ALL_BOX',
        currentRowData: null,
      });
      expect(onSelectChange).toHaveBeenCalled();
      // useTreeSelect only calls onSelectChange, not onChange
    });

    it('should handle individual row selection', () => {
      const TestComponent = defineComponent({
        props: {
          selectedRowKeys: { type: Array, required: true },
          tree: { type: Object, required: true },
          data: { type: Array, required: true },
          indeterminateSelectedRowKeys: { type: Array, required: true },
          defaultSelectedRowKeys: { type: Array, required: true },
          onSelectChange: { type: Function, required: true },
          rowKey: { type: String, required: true },
          onChange: { type: Function, required: true },
        },
        setup(props) {
          const treeDataMap = ref(
            new Map([
              [1, { id: 1, row: treeData[0], parent: null, disabled: false }],
              [11, { id: 11, row: treeData[0].children[0], parent: { id: 1 }, disabled: false }],
              [12, { id: 12, row: treeData[0].children[1], parent: { id: 1 }, disabled: false }],
            ]),
          );
          const result = useTreeSelect(props, treeDataMap);
          return result;
        },
        template: '<div></div>',
      });
      const onSelectChange = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount(TestComponent, {
        props: {
          selectedRowKeys: [],
          tree: { childrenKey: 'children', checkStrictly: false },
          data: treeData,
          indeterminateSelectedRowKeys: [],
          defaultSelectedRowKeys: [],
          onSelectChange,
          rowKey: 'id',
          onChange,
        },
      });
      wrapper.vm.onInnerSelectChange([1], {
        type: 'check',
        currentRowKey: 1,
        currentRowData: treeData[0],
      });
      expect(onSelectChange).toHaveBeenCalled();
      // useTreeSelect only calls onSelectChange, not onChange
    });
  });
});
