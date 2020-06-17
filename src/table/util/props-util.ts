import { Columns, Column, ColumnsMap } from '../types/table';

export const columnClassify =  (columns: Columns, verticalAlign: string): any => {
  let leftFixedColumns: ColumnsMap = {};
  let rightFixedColumns: ColumnsMap = {};
  let mainColumns: ColumnsMap = {};
  columns.forEach((column: Column) => {
    const { fixed, colKey, children } = column;
    if (children?.length) {
      const {
        leftFixedColumns: left,
        rightFixedColumns: right,
        mainColumns: main,
      } = columnClassify(children, verticalAlign);
      leftFixedColumns = {
        ...leftFixedColumns,
        ...left,
      };
      rightFixedColumns = {
        ...rightFixedColumns,
        ...right,
      };
      mainColumns = {
        ...mainColumns,
        ...main,
      };
    } else {
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
