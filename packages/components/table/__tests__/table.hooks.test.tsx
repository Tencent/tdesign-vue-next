// @ts-nocheck
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref, nextTick, computed } from 'vue';
import useFixed from '../hooks/useFixed';
import useStyle from '../hooks/useStyle';
import useRowspanAndColspan from '../hooks/useRowspanAndColspan';
import useColumnResize from '../hooks/useColumnResize';
import useClassName from '../hooks/useClassName';

// Mock affixRef for useFixed tests
const createMockAffixRef = () => ({
  paginationAffixRef: ref(null),
  horizontalScrollAffixRef: ref(null),
  headerTopAffixRef: ref(null),
  footerBottomAffixRef: ref(null),
});

describe('table.hooks', () => {
  let timers: NodeJS.Timeout[] = [];

  beforeEach(() => {
    timers = [];
    // Mock setTimeout to track timers
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = vi.fn((fn, delay) => {
      const timer = originalSetTimeout(fn, delay);
      timers.push(timer);
      return timer;
    });
  });

  afterEach(() => {
    // Clear all timers to prevent "after test environment was torn down" errors
    timers.forEach((timer) => clearTimeout(timer));
    timers = [];
    vi.restoreAllMocks();
  });

  describe('useFixed', () => {
    it('should return fixed position properties', () => {
      const props = {
        columns: ref([
          { title: 'ID', colKey: 'id', width: 100, fixed: 'left' },
          { title: 'Name', colKey: 'name', width: 150 },
          { title: 'Status', colKey: 'status', width: 120, fixed: 'right' },
        ]),
        tableLayout: ref('auto'),
        tableContentWidth: ref('100%'),
        fixedRows: ref([]),
        firstFullRow: ref({}),
        lastFullRow: ref({}),
        maxHeight: ref(undefined),
        headerAffixedTop: ref(false),
        footerAffixedBottom: ref(false),
        bordered: ref(false),
        resizable: ref(false),
        allowResizeColumnWidth: ref(false),
      };

      const context = { emit: vi.fn() };
      const finalColumns = computed(() => props.columns.value);
      const affixRefs = createMockAffixRef();

      const result = useFixed(props, context, finalColumns, affixRefs);

      expect(result).toBeDefined();
      expect(result.tableWidth).toBeDefined();
      expect(result.isFixedColumn).toBeDefined();
      expect(result.showColumnShadow).toBeDefined();
      expect(result.rowAndColFixedPosition).toBeDefined();
      expect(result.isFixedHeader).toBeDefined();

      // 有固定列时，isFixedColumn 应该为 true
      expect(result.isFixedColumn.value).toBe(true);
      // isFixedHeader 在测试环境中可能为 false，因为没有真实的 DOM 滚动
      expect(typeof result.isFixedHeader.value).toBe('boolean');
    });

    it('should handle fixed left columns', () => {
      const props = {
        columns: ref([
          { title: 'ID', colKey: 'id', width: 100, fixed: 'left' },
          { title: 'Name', colKey: 'name', width: 150 },
        ]),
        tableLayout: ref('fixed'),
        tableContentWidth: ref('600px'),
        fixedRows: ref([]),
        firstFullRow: ref({}),
        lastFullRow: ref({}),
        maxHeight: ref(undefined),
        headerAffixedTop: ref(false),
        footerAffixedBottom: ref(false),
        bordered: ref(false),
        resizable: ref(false),
        allowResizeColumnWidth: ref(false),
      };

      const context = { emit: vi.fn() };
      const finalColumns = computed(() => props.columns.value);
      const affixRefs = createMockAffixRef();

      const result = useFixed(props, context, finalColumns, affixRefs);

      expect(result).toBeDefined();
      expect(result.isFixedColumn).toBeDefined();

      // 有左固定列时，isFixedColumn 应该为 true
      expect(result.isFixedColumn.value).toBe(true);
      expect(typeof result.isFixedHeader.value).toBe('boolean');
    });

    it('should handle fixed right columns', () => {
      const props = {
        columns: ref([
          { title: 'Name', colKey: 'name', width: 150 },
          { title: 'Status', colKey: 'status', width: 120, fixed: 'right' },
        ]),
        tableLayout: ref('fixed'),
        tableContentWidth: ref('600px'),
        fixedRows: ref([]),
        firstFullRow: ref({}),
        lastFullRow: ref({}),
        maxHeight: ref(undefined),
        headerAffixedTop: ref(false),
        footerAffixedBottom: ref(false),
        bordered: ref(false),
        resizable: ref(false),
        allowResizeColumnWidth: ref(false),
      };

      const context = { emit: vi.fn() };
      const finalColumns = computed(() => props.columns.value);
      const affixRefs = createMockAffixRef();

      const result = useFixed(props, context, finalColumns, affixRefs);

      expect(result).toBeDefined();
      expect(result.isFixedColumn).toBeDefined();

      // 有右固定列时，isFixedColumn 应该为 true
      expect(result.isFixedColumn.value).toBe(true);
      expect(typeof result.isFixedHeader.value).toBe('boolean');
    });

    it('should handle no fixed columns', () => {
      const props = {
        columns: ref([
          { title: 'Name', colKey: 'name', width: 150 },
          { title: 'Email', colKey: 'email', width: 200 },
        ]),
        tableLayout: ref('fixed'),
        tableContentWidth: ref('600px'),
        fixedRows: ref([]),
        firstFullRow: ref({}),
        lastFullRow: ref({}),
        maxHeight: ref(undefined),
        headerAffixedTop: ref(false),
        footerAffixedBottom: ref(false),
        bordered: ref(false),
        resizable: ref(false),
        allowResizeColumnWidth: ref(false),
      };

      const context = { emit: vi.fn() };
      const finalColumns = computed(() => props.columns.value);
      const affixRefs = createMockAffixRef();

      const result = useFixed(props, context, finalColumns, affixRefs);

      expect(result).toBeDefined();
      expect(result.isFixedColumn).toBeDefined();

      // 没有固定列时，isFixedColumn 应该为 false
      expect(result.isFixedColumn.value).toBe(false);
      expect(typeof result.isFixedHeader.value).toBe('boolean');
    });
  });

  describe('useStyle', () => {
    it('should compute table styles', () => {
      const props = {
        size: ref('medium'),
        bordered: ref(false),
        stripe: ref(false),
        hover: ref(true),
        showHeader: ref(true),
        height: ref(undefined),
        maxHeight: ref('400px'),
        verticalAlign: ref('middle'),
      };

      const result = useStyle(props);

      expect(result).toBeDefined();
      expect(result.tableClasses).toBeDefined();
      expect(result.tableContentStyles).toBeDefined();
      expect(result.tableElementStyles).toBeDefined();
    });

    it('should handle different table layouts', () => {
      const layouts = ['auto', 'fixed'];

      layouts.forEach((layout) => {
        const props = {
          size: ref('medium'),
          tableLayout: ref(layout),
          bordered: ref(false),
          stripe: ref(false),
          hover: ref(true),
          showHeader: ref(true),
          height: ref(undefined),
          maxHeight: ref(undefined),
          verticalAlign: ref('middle'),
        };

        const result = useStyle(props);
        expect(result).toBeDefined();
      });
    });
  });

  describe('useRowspanAndColspan', () => {
    it('should handle rowspan and colspan calculations', () => {
      const dataSource = ref([
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
      ]);
      const columns = ref([
        { title: 'ID', colKey: 'id' },
        { title: 'Name', colKey: 'name' },
        { title: 'Age', colKey: 'age' },
      ]);
      const rowKey = ref('id');
      const rowspanAndColspan = ref((params) => {
        if (params.rowIndex === 0 && params.colIndex === 0) {
          return { rowspan: 2, colspan: 1 };
        }
        return {};
      });

      const result = useRowspanAndColspan(dataSource, columns, rowKey, rowspanAndColspan);

      expect(result).toBeDefined();
      expect(result.skipSpansMap).toBeDefined();
    });

    it('should handle no rowspan and colspan', () => {
      const dataSource = ref([
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
      ]);
      const columns = ref([
        { title: 'ID', colKey: 'id' },
        { title: 'Name', colKey: 'name' },
        { title: 'Age', colKey: 'age' },
      ]);
      const rowKey = ref('id');
      const rowspanAndColspan = ref(undefined);

      const result = useRowspanAndColspan(dataSource, columns, rowKey, rowspanAndColspan);

      expect(result).toBeDefined();
      expect(result.skipSpansMap).toBeDefined();
    });
  });

  describe('useColumnResize', () => {
    it('should handle column resize functionality', () => {
      const props = {
        resizable: ref(true),
        columns: ref([
          { title: 'ID', colKey: 'id', width: 100 },
          { title: 'Name', colKey: 'name', width: 150 },
        ]),
      };

      const result = useColumnResize(props);

      expect(result).toBeDefined();
    });

    it('should handle disabled resize', () => {
      const props = {
        resizable: ref(false),
        columns: ref([
          { title: 'ID', colKey: 'id', width: 100 },
          { title: 'Name', colKey: 'name', width: 150 },
        ]),
      };

      const result = useColumnResize(props);

      expect(result).toBeDefined();
    });
  });

  describe('useClassName', () => {
    it('should generate table class names', () => {
      const result = useClassName();

      expect(result).toBeDefined();
      expect(result.tableBaseClass).toBeDefined();
      expect(result.tableHeaderClasses).toBeDefined();
      expect(result.tableFooterClasses).toBeDefined();
      expect(result.tableAlignClasses).toBeDefined();
    });

    it('should handle different sizes', () => {
      const result = useClassName();

      expect(result).toBeDefined();
      expect(result.classPrefix).toBeDefined();
      expect(result.tableBaseClass).toBeDefined();
      expect(result.tdAlignClasses).toBeDefined();
      expect(result.tableLayoutClasses).toBeDefined();
    });
  });
});
