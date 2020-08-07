import BaseTable from './BaseTable/index';
import PrimaryTable from './PrimaryTable/index';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Table', BaseTable);
setInstallFn('Table', PrimaryTable);

// 扩展输出
export { BaseTable, PrimaryTable };

// 默认输出
export default PrimaryTable;
