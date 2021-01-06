import Divider from './divider';
import setInstallFn from '../utils/setInstallFn';
import { TdDividerProps } from '@TdTypes/divider/TdDividerProps';

setInstallFn('Divider', Divider);

export type DividerProps = TdDividerProps;

export default Divider;
export {
  Divider,
};
