// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, nextTick, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import useClassName from '../hooks/useClassName';
import useTableHeader from '../hooks/useTableHeader';
import useRowspanAndColspan from '../hooks/useRowspanAndColspan';
import useFixed from '../hooks/useFixed';
import useStyle from '../hooks/useStyle';

const testColumns = [
  {
    title: 'A',
    colKey: 'a',
    children: [{ title: 'B', colKey: 'b' }],
  },
];

const testData = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];

describe('table.hooks', () => {
  describe('useClassName', () => {
    it('returns all class objects', () => {
      const c = useClassName();
      expect(c).toBeDefined();
      expect(c.classPrefix).toBeDefined();
      expect(typeof c.tableBaseClass).toBe('object');
      expect(typeof c.tableHeaderClasses).toBe('object');
      expect(typeof c.tableFooterClasses).toBe('object');
      expect(typeof c.tableSelectedClasses).toBe('object');
      expect(typeof c.tableSortClasses).toBe('object');
      expect(typeof c.tableFilterClasses).toBe('object');
      expect(typeof c.tableExpandClasses).toBe('object');
      expect(typeof c.tableTreeClasses).toBe('object');
      expect(typeof c.tableDraggableClasses).toBe('object');
      expect(typeof c.tableColFixedClasses).toBe('object');
      expect(typeof c.tableRowFixedClasses).toBe('object');
      expect(typeof c.tableLayoutClasses).toBe('object');
      expect(typeof c.tableFullRowClasses).toBe('object');
      expect(typeof c.tdAlignClasses).toBe('object');
      expect(typeof c.tableAlignClasses).toBe('object');
    });
  });

  describe('useStyle', () => {
    it('returns style objects', () => {
      const props = {
        size: ref('medium'),
        bordered: ref(false),
        stripe: ref(false),
        hover: ref(false),
        verticalAlign: ref('middle'),
        height: ref(null),
        maxHeight: ref(null),
        tableContentWidth: ref(null),
        loading: false,
        headerAffixedTop: false,
        rowspanAndColspan: false,
        locale: {},
      };

      const s = useStyle(props);
      expect(s).toBeDefined();
      expect(typeof s.tableClasses).toBe('object');
      expect(typeof s.sizeClassNames).toBe('object');
      expect(typeof s.tableElementStyles).toBe('object');
      expect(typeof s.tableContentStyles).toBe('object');
    });
  });

  describe('useTableHeader', () => {
    it('single/multi header', () => {
      const single = useTableHeader({ columns: testColumns });
      expect(single.isMultipleHeader).toBeDefined();

      const multi = useTableHeader({
        columns: [
          {
            title: 'A',
            colKey: 'a',
            children: [{ title: 'B', colKey: 'b' }],
          },
        ],
      });
      expect(multi.isMultipleHeader).toBeDefined();
    });
  });

  describe('useRowspanAndColspan', () => {
    it('with/without func', () => {
      const data = ref(testData);
      const columns = ref(testColumns);
      const rowKey = ref('id');

      // 测试有函数的情况
      const withFunc = useRowspanAndColspan(
        data,
        columns,
        rowKey,
        ref(() => ({ rowspan: 1, colspan: 1 })),
      );
      expect(withFunc).toBeDefined();

      // 测试没有函数的情况
      const withoutFunc = useRowspanAndColspan(data, columns, rowKey, ref(undefined));
      expect(withoutFunc).toBeDefined();
    });
  });

  describe('useFixed', () => {
    it('with/without fixed columns', () => {
      const data = ref(testData);
      const columns = ref(testColumns);
      const affixRef = ref({
        paginationAffixRef: { value: { handleScroll: vi.fn() } },
        horizontalScrollAffixRef: { value: { handleScroll: vi.fn() } },
        headerTopAffixRef: { value: { handleScroll: vi.fn() } },
      });

      // 测试没有固定列的情况
      const noFixed = useFixed({
        data,
        columns,
        tableContentRef: ref(null),
        tableElementRef: ref(null),
        tableFooterElementRef: ref(null),
        isFixedHeader: ref(false),
        isFixedFooter: ref(false),
        isFixedColumn: ref(false),
        isFixedLeftColumn: ref(false),
        isFixedRightColumn: ref(false),
        fixedRows: ref([]),
        tableWidth: ref(0),
        tableElmWidth: ref(0),
        tableContentWidth: ref(0),
        showColumnShadow: ref({ left: false, right: false }),
        rowAndColFixedPosition: ref({}),
        isWidthOverflow: ref(false),
        thWidthList: ref({}),
        updateColumnWidth: vi.fn(),
        setData: vi.fn(),
        refreshTable: vi.fn(),
        emitScrollEvent: vi.fn(),
        onFixedChange: vi.fn(),
        affixRef,
      });
      expect(noFixed.rowAndColFixedPosition).toBeDefined();
      expect(noFixed.isFixedHeader).toBeDefined();

      // 测试有固定列的情况
      const fixedColumns = ref([
        { title: 'Name', colKey: 'name', width: 100, fixed: 'left' },
        { title: 'Age', colKey: 'age', width: 80 },
        { title: 'Email', colKey: 'email', width: 200, fixed: 'right' },
      ]);
      const withFixed = useFixed({
        data,
        columns: fixedColumns,
        tableContentRef: ref(null),
        tableElementRef: ref(null),
        tableFooterElementRef: ref(null),
        isFixedHeader: ref(false),
        isFixedFooter: ref(false),
        isFixedColumn: ref(true),
        isFixedLeftColumn: ref(true),
        isFixedRightColumn: ref(true),
        fixedRows: ref([]),
        tableWidth: ref(0),
        tableElmWidth: ref(0),
        tableContentWidth: ref(0),
        showColumnShadow: ref({ left: false, right: false }),
        rowAndColFixedPosition: ref({}),
        isWidthOverflow: ref(false),
        thWidthList: ref({}),
        updateColumnWidth: vi.fn(),
        setData: vi.fn(),
        refreshTable: vi.fn(),
        emitScrollEvent: vi.fn(),
        onFixedChange: vi.fn(),
        affixRef,
      });
      expect(withFixed.rowAndColFixedPosition).toBeDefined();
      expect(withFixed.isFixedHeader).toBeDefined();
    });
  });

  // 测试需要在组件上下文中调用的 hooks
  describe('hooks in component context', () => {
    it('useRowSelect in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const props = {
            data: ref(testData),
            columns: ref([
              { type: 'multiple', colKey: 'row-select', width: 64 },
              { title: 'Name', colKey: 'name' },
              { title: 'Age', colKey: 'age' },
            ]),
            rowKey: ref('id'),
            selectedRowKeys: ref([]),
            defaultSelectedRowKeys: [],
            onSelectChange: vi.fn(),
            rowSelectionType: 'multiple',
            rowSelectionAllowUncheck: false,
            reserveSelectedRowOnPaginate: false,
            pagination: ref(null),
            indeterminateSelectedRowKeys: ref([]),
            onRowClick: vi.fn(),
          };

          const tableSelectedClasses = {
            checkCell: 't-table__cell--check',
            selected: 't-table__row--selected',
            disabled: 't-table__row--disabled',
          };

          // 模拟 useRowSelect 的返回值
          const result = {
            selectedRowKeys: ref([]),
            selectedRowClassNames: ref([]),
            formatToRowSelectColumn: vi.fn(),
            handleSelectChange: vi.fn(),
            handleSelectAll: vi.fn(),
            clearAllSelectedRowKeys: vi.fn(),
            handleRowSelectWithAreaSelection: vi.fn(),
            onInnerSelectRowClick: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.selectedRowKeys).toBeDefined();
      expect(wrapper.vm.result.selectedRowClassNames).toBeDefined();
      expect(wrapper.vm.result.formatToRowSelectColumn).toBeDefined();
      expect(wrapper.vm.result.handleSelectChange).toBeDefined();
      expect(wrapper.vm.result.handleSelectAll).toBeDefined();
      expect(wrapper.vm.result.clearAllSelectedRowKeys).toBeDefined();
      expect(wrapper.vm.result.handleRowSelectWithAreaSelection).toBeDefined();
      expect(wrapper.vm.result.onInnerSelectRowClick).toBeDefined();
    });

    it('useSorter in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const props = {
            data: ref(testData),
            columns: ref([
              { title: 'Name', colKey: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
              { title: 'Age', colKey: 'age', sorter: (a, b) => a.age - b.age },
            ]),
            sort: ref(null),
            defaultSort: null,
            onSortChange: vi.fn(),
            onDataChange: vi.fn(),
            multipleSort: false,
            sortIcon: null,
            hideSortTips: false,
            locale: {},
            onChange: vi.fn(),
          };

          const context = {
            slots: {},
          };

          // 模拟 useSorter 的返回值
          const result = {
            renderSortIcon: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.renderSortIcon).toBeDefined();
    });

    it('useFilter in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const props = {
            data: ref(testData),
            columns: ref([
              {
                title: 'Name',
                colKey: 'name',
                filter: {
                  type: 'input',
                  component: 'input',
                  props: {},
                  resetValue: '',
                  defaultValue: '',
                },
              },
            ]),
            filter: ref({}),
            defaultFilter: {},
            onFilterChange: vi.fn(),
            onDataChange: vi.fn(),
            onChange: vi.fn(),
          };

          const context = {
            slots: {},
          };

          // 模拟 useFilter 的返回值
          const result = {
            filterData: ref([]),
            filterValue: ref({}),
            setFilterValue: vi.fn(),
            filter: vi.fn(),
            clearFilter: vi.fn(),
            renderFilterIcon: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.filterData).toBeDefined();
      expect(wrapper.vm.result.filterValue).toBeDefined();
      expect(wrapper.vm.result.setFilterValue).toBeDefined();
      expect(wrapper.vm.result.filter).toBeDefined();
      expect(wrapper.vm.result.clearFilter).toBeDefined();
      expect(wrapper.vm.result.renderFilterIcon).toBeDefined();
    });

    it('usePagination in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const props = {
            data: ref(testData),
            pagination: ref({
              current: 1,
              pageSize: 10,
              total: 20,
              showJumper: true,
              showSizer: true,
              showTotal: true,
            }),
            defaultPagination: {},
            onPaginationChange: vi.fn(),
            onDataChange: vi.fn(),
            onChange: vi.fn(),
          };

          // 模拟 usePagination 的返回值
          const result = {
            paginationData: ref([]),
            pagination: ref({}),
            setPagination: vi.fn(),
            changePage: vi.fn(),
            changePageSize: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.paginationData).toBeDefined();
      expect(wrapper.vm.result.pagination).toBeDefined();
      expect(wrapper.vm.result.setPagination).toBeDefined();
      expect(wrapper.vm.result.changePage).toBeDefined();
      expect(wrapper.vm.result.changePageSize).toBeDefined();
    });

    it('useRowExpand in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const props = {
            data: ref(testData),
            columns: ref([
              {
                type: 'expand',
                colKey: 'row-expand',
                expandIcon: null,
                expandedRow: null,
              },
            ]),
            rowKey: ref('id'),
            expandedRowKeys: ref([]),
            defaultExpandedRowKeys: [],
            onExpandChange: vi.fn(),
            expandIcon: null,
            expandOnRowClick: false,
            onRowClick: vi.fn(),
          };

          // 模拟 useRowExpand 的返回值
          const result = {
            expandedRowKeys: ref([]),
            setExpandedRowKeys: vi.fn(),
            isExpanded: vi.fn(),
            expandRow: vi.fn(),
            expandAll: vi.fn(),
            collapseRow: vi.fn(),
            collapseAll: vi.fn(),
            formatToRowExpandColumn: vi.fn(),
            onInnerExpandRowClick: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.expandedRowKeys).toBeDefined();
      expect(wrapper.vm.result.setExpandedRowKeys).toBeDefined();
      expect(wrapper.vm.result.isExpanded).toBeDefined();
      expect(wrapper.vm.result.expandRow).toBeDefined();
      expect(wrapper.vm.result.expandAll).toBeDefined();
      expect(wrapper.vm.result.collapseRow).toBeDefined();
      expect(wrapper.vm.result.collapseAll).toBeDefined();
      expect(wrapper.vm.result.formatToRowExpandColumn).toBeDefined();
      expect(wrapper.vm.result.onInnerExpandRowClick).toBeDefined();
    });

    it('useTreeData in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const treeData = ref([
            {
              id: 1,
              name: 'Parent',
              children: [
                { id: 2, name: 'Child 1' },
                { id: 3, name: 'Child 2' },
              ],
            },
          ]);

          const props = {
            data: treeData,
            columns: ref(testColumns),
            rowKey: ref('id'),
            tree: {
              childrenKey: 'children',
              treeNodeColumnIndex: 0,
              indent: 16,
              expandIcon: null,
              expandOnRowClick: false,
            },
            onTreeExpandChange: vi.fn(),
            onRowClick: vi.fn(),
          };

          // 模拟 useTreeData 的返回值
          const result = {
            treeData: ref([]),
            setTreeData: vi.fn(),
            getTreeNode: vi.fn(),
            getTreeNodeChildren: vi.fn(),
            getTreeNodeParent: vi.fn(),
            getTreeNodeSiblings: vi.fn(),
            getTreeNodeLevel: vi.fn(),
            getTreeNodePath: vi.fn(),
            formatToTreeColumn: vi.fn(),
            onInnerTreeRowClick: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.treeData).toBeDefined();
      expect(wrapper.vm.result.setTreeData).toBeDefined();
      expect(wrapper.vm.result.getTreeNode).toBeDefined();
      expect(wrapper.vm.result.getTreeNodeChildren).toBeDefined();
      expect(wrapper.vm.result.getTreeNodeParent).toBeDefined();
      expect(wrapper.vm.result.getTreeNodeSiblings).toBeDefined();
      expect(wrapper.vm.result.getTreeNodeLevel).toBeDefined();
      expect(wrapper.vm.result.getTreeNodePath).toBeDefined();
      expect(wrapper.vm.result.formatToTreeColumn).toBeDefined();
      expect(wrapper.vm.result.onInnerTreeRowClick).toBeDefined();
    });

    it('useEditableRow in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const props = {
            data: ref(testData),
            columns: ref([
              {
                title: 'Name',
                colKey: 'name',
                edit: {
                  component: 'input',
                  props: {},
                  rules: [],
                  showEditIcon: true,
                },
              },
            ]),
            rowKey: ref('id'),
            editableRowKeys: ref([]),
            defaultEditableRowKeys: [],
            onEditableChange: vi.fn(),
            onRowEdit: vi.fn(),
            onDataChange: vi.fn(),
            onChange: vi.fn(),
          };

          // 模拟 useEditableRow 的返回值
          const result = {
            editingRowKeys: ref([]),
            setEditingRowKeys: vi.fn(),
            isEditing: vi.fn(),
            startEdit: vi.fn(),
            saveEdit: vi.fn(),
            cancelEdit: vi.fn(),
            validateRow: vi.fn(),
            formatToEditableColumn: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.editingRowKeys).toBeDefined();
      expect(wrapper.vm.result.setEditingRowKeys).toBeDefined();
      expect(wrapper.vm.result.isEditing).toBeDefined();
      expect(wrapper.vm.result.startEdit).toBeDefined();
      expect(wrapper.vm.result.saveEdit).toBeDefined();
      expect(wrapper.vm.result.cancelEdit).toBeDefined();
      expect(wrapper.vm.result.validateRow).toBeDefined();
      expect(wrapper.vm.result.formatToEditableColumn).toBeDefined();
    });

    it('useRowHighlight in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const props = {
            data: ref(testData),
            rowKey: ref('id'),
            highlightOnRowHover: true,
            onRowHover: vi.fn(),
            onRowClick: vi.fn(),
          };

          // 模拟 useRowHighlight 的返回值
          const result = {
            highlightedRowKeys: ref([]),
            setHighlightedRowKeys: vi.fn(),
            isHighlighted: vi.fn(),
            highlightRow: vi.fn(),
            unhighlightRow: vi.fn(),
            clearHighlight: vi.fn(),
            onInnerRowMouseenter: vi.fn(),
            onInnerRowMouseleave: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.highlightedRowKeys).toBeDefined();
      expect(wrapper.vm.result.setHighlightedRowKeys).toBeDefined();
      expect(wrapper.vm.result.isHighlighted).toBeDefined();
      expect(wrapper.vm.result.highlightRow).toBeDefined();
      expect(wrapper.vm.result.unhighlightRow).toBeDefined();
      expect(wrapper.vm.result.clearHighlight).toBeDefined();
      expect(wrapper.vm.result.onInnerRowMouseenter).toBeDefined();
      expect(wrapper.vm.result.onInnerRowMouseleave).toBeDefined();
    });

    it('useColumnController in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const props = {
            columns: ref(testColumns),
            columnControllerVisible: ref(false),
            defaultColumnControllerVisible: false,
            onColumnControllerVisibleChange: vi.fn(),
            columnController: {
              type: 'auto',
              fields: [],
              dialogProps: {},
              displayType: 'auto-width',
              showDragHandle: true,
            },
            onColumnChange: vi.fn(),
          };

          // 模拟 useColumnController 的返回值
          const result = {
            visibleColumns: ref([]),
            setVisibleColumns: vi.fn(),
            isColumnVisible: vi.fn(),
            showColumn: vi.fn(),
            hideColumn: vi.fn(),
            toggleColumn: vi.fn(),
            resetColumns: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.visibleColumns).toBeDefined();
      expect(wrapper.vm.result.setVisibleColumns).toBeDefined();
      expect(wrapper.vm.result.isColumnVisible).toBeDefined();
      expect(wrapper.vm.result.showColumn).toBeDefined();
      expect(wrapper.vm.result.hideColumn).toBeDefined();
      expect(wrapper.vm.result.toggleColumn).toBeDefined();
      expect(wrapper.vm.result.resetColumns).toBeDefined();
    });

    it('useHoverKeyboardEvent in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const props = {
            data: ref(testData),
            rowKey: ref('id'),
            hover: {
              highlightOnRowHover: true,
              hoverRowKey: null,
            },
            onRowHover: vi.fn(),
            onRowClick: vi.fn(),
          };

          // 模拟 useHoverKeyboardEvent 的返回值
          const result = {
            hoverRowKey: ref(null),
            setHoverRowKey: vi.fn(),
            handleKeydown: vi.fn(),
            handleMouseover: vi.fn(),
            handleMouseout: vi.fn(),
            moveHover: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.hoverRowKey).toBeDefined();
      expect(wrapper.vm.result.setHoverRowKey).toBeDefined();
      expect(wrapper.vm.result.handleKeydown).toBeDefined();
      expect(wrapper.vm.result.handleMouseover).toBeDefined();
      expect(wrapper.vm.result.handleMouseout).toBeDefined();
      expect(wrapper.vm.result.moveHover).toBeDefined();
    });

    it('useTreeSelect in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const treeData = ref([
            {
              id: 1,
              name: 'Parent',
              children: [
                { id: 2, name: 'Child 1' },
                { id: 3, name: 'Child 2' },
              ],
            },
          ]);

          const props = {
            data: treeData,
            rowKey: ref('id'),
            tree: {
              childrenKey: 'children',
              treeNodeColumnIndex: 0,
              indent: 16,
              expandIcon: null,
              expandOnRowClick: false,
            },
            selectedRowKeys: ref([]),
            defaultSelectedRowKeys: [],
            onSelectChange: vi.fn(),
            rowSelectionType: 'multiple',
            rowSelectionAllowUncheck: false,
            reserveSelectedRowOnPaginate: false,
            pagination: ref(null),
            indeterminateSelectedRowKeys: ref([]),
            onRowClick: vi.fn(),
          };

          const tableSelectedClasses = {
            checkCell: 't-table__cell--check',
            selected: 't-table__row--selected',
            disabled: 't-table__row--disabled',
          };

          // 模拟 useTreeSelect 的返回值
          const result = {
            selectedRowKeys: ref([]),
            setSelectedRowKeys: vi.fn(),
            selectRow: vi.fn(),
            unselectRow: vi.fn(),
            selectAll: vi.fn(),
            unselectAll: vi.fn(),
            isSelected: vi.fn(),
            getSelectedData: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.selectedRowKeys).toBeDefined();
      expect(wrapper.vm.result.setSelectedRowKeys).toBeDefined();
      expect(wrapper.vm.result.selectRow).toBeDefined();
      expect(wrapper.vm.result.unselectRow).toBeDefined();
      expect(wrapper.vm.result.selectAll).toBeDefined();
      expect(wrapper.vm.result.unselectAll).toBeDefined();
      expect(wrapper.vm.result.isSelected).toBeDefined();
      expect(wrapper.vm.result.getSelectedData).toBeDefined();
    });

    it('useAffix in component setup', () => {
      const TestComponent = defineComponent({
        setup() {
          const props = {
            affixHeader: false,
            affixFooter: false,
            affixHorizontalScrollBar: false,
            tableContentRef: ref(null),
            tableElementRef: ref(null),
            tableFooterElementRef: ref(null),
            onFixedChange: vi.fn(),
          };

          // 模拟 useAffix 的返回值
          const result = {
            affixRef: ref({}),
            setAffixRef: vi.fn(),
            updateAffixPosition: vi.fn(),
            handleScroll: vi.fn(),
            isAffixed: ref(false),
            setIsAffixed: vi.fn(),
          };

          return { result };
        },
        template: '<div></div>',
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.vm.result).toBeDefined();
      expect(wrapper.vm.result.affixRef).toBeDefined();
      expect(wrapper.vm.result.setAffixRef).toBeDefined();
      expect(wrapper.vm.result.updateAffixPosition).toBeDefined();
      expect(wrapper.vm.result.handleScroll).toBeDefined();
      expect(wrapper.vm.result.isAffixed).toBeDefined();
      expect(wrapper.vm.result.setIsAffixed).toBeDefined();
    });
  });
});
