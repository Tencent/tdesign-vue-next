import { Columns, Column, ColumnsMap } from '../types/table';

export const columnClassify =  (columns: Columns, verticalAlign: string): any => {
  const leftFixedColumns: ColumnsMap = {};
  const rightFixedColumns: ColumnsMap = {};
  const mainColumns: ColumnsMap = {};
  columns.forEach((column: Column) => {
    const { fixed, colKey } = column;
    switch (fixed) {
      case 'left': {
        leftFixedColumns[colKey] = {
          ...column,
          verticalAlign,
        };
        break;
      }
      case 'right': {
        rightFixedColumns[colKey] = {
          ...column,
          verticalAlign,
        };
        break;
      }
      default: {
        mainColumns[colKey] = {
          ...column,
          verticalAlign,
        };
      }
    }
  });
  return {
    leftFixedColumns,
    rightFixedColumns,
    mainColumns,
  };
};

export const getDefaultFilters = (columns?: Columns): any => {
  return {
    filters: {},
    sorter: {},
  };
};
