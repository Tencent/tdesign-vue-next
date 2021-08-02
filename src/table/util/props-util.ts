import { BaseTableCol } from '../../../types/base-table/TdBaseTableProps';

export function flatColumns(columns: Array<BaseTableCol>): Array<BaseTableCol> {
  const result: Array<BaseTableCol> = [];
  columns.forEach((column: BaseTableCol) => {
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
}
