import { mount } from '@vue/test-utils';
import { Checkbox } from '@/src/checkbox/index.ts';

function getAjaxTableData(total, currentPage = 1, pageSize = 5) {
  return new Array(total).fill(null).map((item, index) => ({
    id: Math.random() + index + 100,
    instance: `Instance${index + currentPage * 10}_${pageSize}`,
    status: index % 2,
    owner: 'jenny;peter',
    description: 'test',
  }));
}

const SIMPLE_COLUMNS = [
  { title: 'SerialNumber', colKey: 'serial-number' },
  { title: 'ID', colKey: 'id' },
  { title: 'Instance', colKey: 'instance', className: 'custom-instance-class-name' },
  { title: 'Status', colKey: 'status' },
];

/** 远程数据分页；分页属性为受控属性 */
export function getAjaxDataTableMount(TTable) {
  const DATA_TOTAL = 5;
  return mount({
    data() {
      return {
        data: getAjaxTableData(DATA_TOTAL),
        pagination: {
          current: 1,
          pageSize: 5,
          total: 38,
        },
      };
    },
    methods: {
      // props change
      goToPrevPage() {
        this.pagination.current = Math.max(this.pagination.current - 1, 1);
        this.data = getAjaxTableData(DATA_TOTAL, this.pagination.current);
      },
      // props change
      goToNextPage() {
        const { current, total, pageSize } = this.pagination;
        this.pagination.current = Math.min(current + 1, Math.ceil(total / pageSize));
        this.data = getAjaxTableData(DATA_TOTAL, this.pagination.current);
      },
      // props change
      changePageSize() {
        const newPageSize = 10;
        this.pagination.pageSize = newPageSize;
        this.data = getAjaxTableData(DATA_TOTAL, this.pagination.current, newPageSize);
      },
      // inner change
      onPaginationChange(pageInfo) {
        this.pagination.current = pageInfo.current;
        this.pagination.pageSize = pageInfo.pageSize;
        this.data = getAjaxTableData(pageInfo.pageSize, pageInfo.current, pageInfo.pageSize);
      },
    },
    render() {
      return (
        <div>
          <button class="prev-page" onClick={this.goToPrevPage}>
            PrevPage
          </button>
          <button class="next-page" onClick={this.goToNextPage}>
            NextPage
          </button>
          <button class="change-page-size" onClick={this.changePageSize}>
            NextPage
          </button>
          <TTable
            rowKey="id"
            data={this.data}
            columns={SIMPLE_COLUMNS}
            pagination={this.pagination}
            on={{
              'page-change': this.onPaginationChange,
            }}
          ></TTable>
        </div>
      );
    },
  });
}

export function getSwitchPaginationTableMount(TTable) {
  const DATA_TOTAL = 38;
  return mount({
    data() {
      return {
        showPagination: false,
        data: getLocalTableData(DATA_TOTAL),
      };
    },
    computed: {
      pagination() {
        return this.showPagination
          ? {
            current: 1,
            pageSize: 5,
            total: DATA_TOTAL,
          }
          : undefined;
      },
    },
    methods: {
      // inner change
      onPaginationChange(pageInfo) {
        this.pagination.current = pageInfo.current;
        this.pagination.pageSize = pageInfo.pageSize;
      },
      onCheckboxChange(val) {
        this.showPagination = val;
      },
    },
    render() {
      return (
        <div>
          <Checkbox class="toggle-pagination" checked={this.showPagination} on={{ change: this.onCheckboxChange }}>
            Toggle Pagination
          </Checkbox>
          <TTable
            rowKey="id"
            data={this.data}
            columns={SIMPLE_COLUMNS}
            pagination={this.pagination}
            on={{
              'page-change': this.onPaginationChange,
            }}
          ></TTable>
        </div>
      );
    },
  });
}

/** 远程数据分页；分页属性为非受控属性 */
export function getDefaultPaginationAjaxDataTableMount(TTable) {
  const DATA_TOTAL = 5;
  return mount({
    data() {
      return {
        data: getAjaxTableData(DATA_TOTAL),
        pagination: {
          defaultCurrent: 1,
          defaultPageSize: 5,
          total: 38,
        },
      };
    },
    methods: {
      // inner change
      onPaginationChange(pageInfo) {
        this.pagination.current = pageInfo.current;
        this.pagination.pageSize = pageInfo.pageSize;
        this.data = getAjaxTableData(pageInfo.pageSize, pageInfo.current, pageInfo.pageSize);
      },
    },
    render() {
      return (
        <div>
          <TTable
            rowKey="id"
            data={this.data}
            columns={SIMPLE_COLUMNS}
            pagination={this.pagination}
            on={{
              'page-change': this.onPaginationChange,
            }}
          ></TTable>
        </div>
      );
    },
  });
}

function getLocalTableData(total) {
  return new Array(total).fill(null).map((item, index) => ({
    id: Math.random() + index + 100,
    instance: `Instance${index}`,
    status: index % 2,
    owner: 'jenny;peter',
    description: 'test',
  }));
}

export function getLocalDataTableMount(TTable) {
  const DATA_TOTAL = 38;
  return mount({
    data() {
      return {
        data: getLocalTableData(DATA_TOTAL),
        pagination: {
          current: 1,
          pageSize: 5,
          total: DATA_TOTAL,
        },
      };
    },
    methods: {
      // props change
      goToPrevPage() {
        this.pagination.current = Math.max(this.pagination.current - 1, 1);
      },
      // props change
      goToNextPage() {
        const { current, total, pageSize } = this.pagination;
        this.pagination.current = Math.min(current + 1, Math.ceil(total / pageSize));
      },
      // props change
      changePageSize() {
        const newPageSize = 10;
        this.pagination.pageSize = newPageSize;
      },
      // inner change
      onPaginationChange(pageInfo) {
        this.pagination.current = pageInfo.current;
        this.pagination.pageSize = pageInfo.pageSize;
      },
    },
    render() {
      return (
        <div>
          <button class="prev-page" onClick={this.goToPrevPage}>
            PrevPage
          </button>
          <button class="next-page" onClick={this.goToNextPage}>
            NextPage
          </button>
          <button class="change-page-size" onClick={this.changePageSize}>
            NextPage
          </button>
          <TTable
            rowKey="id"
            data={this.data}
            columns={SIMPLE_COLUMNS}
            pagination={this.pagination}
            on={{
              'page-change': this.onPaginationChange,
            }}
          ></TTable>
        </div>
      );
    },
  });
}

export function getDefaultPaginationLocalDataTableMount(TTable) {
  const DATA_TOTAL = 38;
  return mount({
    data() {
      return {
        data: getLocalTableData(DATA_TOTAL),
        pagination: {
          defaultCurrent: 1,
          defaultPageSize: 5,
          total: DATA_TOTAL,
        },
      };
    },
    methods: {
      // inner change
      onPaginationChange(pageInfo) {
        this.pagination.current = pageInfo.current;
        this.pagination.pageSize = pageInfo.pageSize;
      },
    },
    render() {
      return (
        <div>
          <TTable
            rowKey="id"
            data={this.data}
            columns={SIMPLE_COLUMNS}
            pagination={this.pagination}
            on={{
              'page-change': this.onPaginationChange,
            }}
          ></TTable>
        </div>
      );
    },
  });
}

export function getSwitchDefaultPaginationTableMount(TTable) {
  const DATA_TOTAL = 36;
  return mount({
    data() {
      return {
        showPagination: false,
        data: getLocalTableData(DATA_TOTAL),
      };
    },
    computed: {
      pagination() {
        return this.showPagination
          ? {
            defaultCurrent: 1,
            defaultPageSize: 5,
            total: DATA_TOTAL,
          }
          : undefined;
      },
    },
    methods: {
      onCheckboxChange(val) {
        this.showPagination = val;
      },
    },
    render() {
      return (
        <div>
          <Checkbox class="toggle-pagination" checked={this.showPagination} on={{ change: this.onCheckboxChange }}>
            Toggle Pagination
          </Checkbox>
          <TTable rowKey="id" data={this.data} columns={SIMPLE_COLUMNS} pagination={this.pagination}></TTable>
        </div>
      );
    },
  });
}
