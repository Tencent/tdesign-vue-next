import _Divider from './divider';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdDividerProps } from './type';

import './style';

export * from './type';
export type DividerProps = TdDividerProps;

export const Divider: WithInstallType<typeof _Divider> = withInstall(_Divider);
export default Divider;
