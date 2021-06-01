import _Divider from './divider';
import { TdDividerProps } from '@TdTypes/divider/TdDividerProps';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Divider: WithInstallType<typeof _Divider> = withInstall(_Divider);

export type DividerProps = TdDividerProps;

export { Divider };
export default Divider;
