import { Columns, Column, ColumnsMap } from '../types/table';

export const flatColumns = (columns: Array<Column>): any => {
  const result: Array<Column> = [];
  columns.forEach((column: Column) => {
    const { children } = column;
    if (children?.length) {
      result.push(...flatColumns(children));
    } else {
      result.push({
        ...column,
      });
    }
  });
  return result;
};
export const getDefaultFilters = (columns?: Columns): any => {
  return {
    filters: {},
    sorter: {},
  };
};
