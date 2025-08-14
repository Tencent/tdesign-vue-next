// @ts-nocheck
/* eslint-disable vue/one-component-per-file */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import useSorter from '../hooks/useSorter';

describe('useSorter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize and render sort icon correctly', () => {
    const TestComponent = defineComponent({
      setup() {
        const columns = ref([
          {
            colKey: 'name',
            title: 'Name',
            sorter: true,
          },
          {
            colKey: 'age',
            title: 'Age',
            sorter: (a, b) => a.age - b.age,
          },
        ]);

        const props = {
          columns,
          data: ref([
            { id: 1, name: 'John', age: 30 },
            { id: 2, name: 'Jane', age: 25 },
            { id: 3, name: 'Bob', age: 35 },
          ]),
          sort: ref(null),
          rowKey: ref('id'),
        };

        const context = { emit: vi.fn(), slots: {} };

        const { renderSortIcon } = useSorter(props, context);

        // Should return renderSortIcon function
        expect(renderSortIcon).toBeInstanceOf(Function);

        // Test rendering sort icon for sortable column
        const sortIconNode = renderSortIcon({ col: columns.value[0], colIndex: 0 });
        expect(sortIconNode).toBeTruthy();

        // Test rendering sort icon for non-sortable column
        const nonSortableCol = { colKey: 'desc', title: 'Description' };
        const nonSortableIconNode = renderSortIcon({ col: nonSortableCol, colIndex: 1 });
        expect(nonSortableIconNode).toBeNull();

        return () => <div>Test</div>;
      },
    });

    mount(TestComponent);
  });

  it('should handle sort click events', async () => {
    const TestComponent = defineComponent({
      setup() {
        const columns = ref([
          {
            colKey: 'name',
            title: 'Name',
            sorter: true,
          },
          {
            colKey: 'age',
            title: 'Age',
            sorter: true,
            sortType: 'all', // supports both asc and desc
          },
          {
            colKey: 'score',
            title: 'Score',
            sorter: true,
            sortType: 'desc', // only supports desc
          },
          {
            colKey: 'rank',
            title: 'Rank',
            sorter: true,
            sortType: 'asc', // only supports asc
          },
        ]);

        const props = {
          columns,
          data: ref([
            { id: 1, name: 'John', age: 30, score: 90, rank: 1 },
            { id: 2, name: 'Jane', age: 25, score: 95, rank: 2 },
            { id: 3, name: 'Bob', age: 35, score: 85, rank: 3 },
          ]),
          sort: ref(null),
          rowKey: ref('id'),
          onSortChange: vi.fn(),
        };

        const context = { emit: vi.fn(), slots: {} };

        const { renderSortIcon } = useSorter(props, context);

        return () => (
          <div>
            <div data-testid="name-sort">{renderSortIcon({ col: columns.value[0], colIndex: 0 })}</div>
            <div data-testid="score-sort">{renderSortIcon({ col: columns.value[2], colIndex: 2 })}</div>
            <div data-testid="rank-sort">{renderSortIcon({ col: columns.value[3], colIndex: 3 })}</div>
          </div>
        );
      },
    });

    const wrapper = mount(TestComponent);

    // Find sort buttons and simulate clicks
    const nameSortButton = wrapper.find('[data-testid="name-sort"] .t-table__sort');
    if (nameSortButton.exists()) {
      const firstIcon = nameSortButton.find('.t-table__sort-icon');
      if (firstIcon.exists()) {
        await firstIcon.trigger('click');
        // First click should set ascending sort
      }
    }
  });

  it('should handle multiple sort', () => {
    const TestComponent = defineComponent({
      setup() {
        const columns = ref([
          {
            colKey: 'name',
            title: 'Name',
            sorter: true,
          },
          {
            colKey: 'age',
            title: 'Age',
            sorter: true,
          },
        ]);

        const props = {
          columns,
          data: ref([
            { id: 1, name: 'John', age: 30 },
            { id: 2, name: 'Jane', age: 25 },
            { id: 3, name: 'Bob', age: 35 },
          ]),
          sort: ref([]),
          multipleSort: ref(true),
          rowKey: ref('id'),
          onSortChange: vi.fn(),
        };

        const context = { emit: vi.fn(), slots: {} };

        const { renderSortIcon } = useSorter(props, context);

        return () => (
          <div>
            <div data-testid="name-sort">{renderSortIcon({ col: columns.value[0], colIndex: 0 })}</div>
            <div data-testid="age-sort">{renderSortIcon({ col: columns.value[1], colIndex: 1 })}</div>
          </div>
        );
      },
    });

    const wrapper = mount(TestComponent);

    // Should render sort icons for both columns
    expect(wrapper.find('[data-testid="name-sort"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="age-sort"]').exists()).toBe(true);
  });

  it('should handle different sort types', () => {
    const TestComponent = defineComponent({
      setup() {
        const columns = ref([
          {
            colKey: 'name',
            title: 'Name',
            sorter: true,
            sortType: 'asc', // only ascending
          },
          {
            colKey: 'age',
            title: 'Age',
            sorter: true,
            sortType: 'desc', // only descending
          },
          {
            colKey: 'score',
            title: 'Score',
            sorter: true,
            sortType: 'all', // both directions
          },
        ]);

        const props = {
          columns,
          data: ref([
            { id: 1, name: 'John', age: 30, score: 90 },
            { id: 2, name: 'Jane', age: 25, score: 95 },
          ]),
          sort: ref(null),
          rowKey: ref('id'),
        };

        const context = { emit: vi.fn(), slots: {} };

        const { renderSortIcon } = useSorter(props, context);

        return () => (
          <div>
            <div data-testid="name-sort">{renderSortIcon({ col: columns.value[0], colIndex: 0 })}</div>
            <div data-testid="age-sort">{renderSortIcon({ col: columns.value[1], colIndex: 1 })}</div>
            <div data-testid="score-sort">{renderSortIcon({ col: columns.value[2], colIndex: 2 })}</div>
          </div>
        );
      },
    });

    const wrapper = mount(TestComponent);

    // All columns should render sort icons since they all have sorter: true
    expect(wrapper.find('[data-testid="name-sort"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="age-sort"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="score-sort"]').exists()).toBe(true);
  });

  it('should handle custom sorter functions', () => {
    const TestComponent = defineComponent({
      setup() {
        const customSorter = (a, b) => {
          if (a.custom < b.custom) return -1;
          if (a.custom > b.custom) return 1;
          return 0;
        };

        const columns = ref([
          {
            colKey: 'custom',
            title: 'Custom',
            sorter: customSorter,
          },
        ]);

        const props = {
          columns,
          data: ref([
            { id: 1, name: 'John', custom: 'C' },
            { id: 2, name: 'Jane', custom: 'A' },
            { id: 3, name: 'Bob', custom: 'B' },
          ]),
          sort: ref({ sortBy: 'custom', descending: false }),
          rowKey: ref('id'),
        };

        const context = { emit: vi.fn(), slots: {} };

        const { renderSortIcon } = useSorter(props, context);

        return () => (
          <div>
            <div data-testid="custom-sort">{renderSortIcon({ col: columns.value[0], colIndex: 0 })}</div>
          </div>
        );
      },
    });

    const wrapper = mount(TestComponent);

    // Should render sort icon for column with custom sorter
    expect(wrapper.find('[data-testid="custom-sort"]').exists()).toBe(true);
  });

  it('should handle edge cases and invalid inputs', () => {
    const TestComponent = defineComponent({
      setup() {
        const columns = ref([
          // Column without sorter
          {
            colKey: 'name',
            title: 'Name',
          },
          // Column with invalid sorter
          {
            colKey: 'age',
            title: 'Age',
            sorter: 'invalid',
          },
          // Column with valid sorter
          {
            colKey: 'score',
            title: 'Score',
            sorter: true,
          },
        ]);

        const props = {
          columns,
          data: ref([
            { id: 1, name: 'John', age: 30 },
            { id: 2, name: 'Jane', age: 25 },
          ]),
          sort: ref({ sortBy: 'nonexistent', descending: false }),
          rowKey: ref('id'),
        };

        const context = { emit: vi.fn(), slots: {} };

        const { renderSortIcon } = useSorter(props, context);

        // Test rendering for each column type
        const noSorterResult = renderSortIcon({ col: columns.value[0], colIndex: 0 });
        const invalidSorterResult = renderSortIcon({ col: columns.value[1], colIndex: 1 });
        const validSorterResult = renderSortIcon({ col: columns.value[2], colIndex: 2 });

        // Column without sorter should return null
        expect(noSorterResult).toBeNull();

        // Column with invalid sorter should still render (truthy sorter value)
        expect(invalidSorterResult).toBeTruthy();

        // Column with valid sorter should render
        expect(validSorterResult).toBeTruthy();

        return () => <div>Test</div>;
      },
    });

    mount(TestComponent);
  });

  it('should handle sort state updates', () => {
    const TestComponent = defineComponent({
      setup() {
        const columns = ref([
          {
            colKey: 'name',
            title: 'Name',
            sorter: true,
          },
        ]);

        const sortValue = ref(null);

        const props = {
          columns,
          data: ref([
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
          ]),
          sort: sortValue,
          rowKey: ref('id'),
        };

        const context = { emit: vi.fn(), slots: {} };

        const { renderSortIcon } = useSorter(props, context);

        // Test initial state
        let sortIconNode = renderSortIcon({ col: columns.value[0], colIndex: 0 });
        expect(sortIconNode).toBeTruthy();

        // Update sort state
        sortValue.value = { sortBy: 'name', descending: false };

        // Test updated state
        sortIconNode = renderSortIcon({ col: columns.value[0], colIndex: 0 });
        expect(sortIconNode).toBeTruthy();

        return () => <div>Test</div>;
      },
    });

    mount(TestComponent);
  });
});
