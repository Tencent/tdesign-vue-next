import _Statistic from './statistic';
import withInstall from '../utils/withInstall';
import { TdStatisticProps } from '@td/intel/statistic/type';

import './style';

export * from '@td/intel/statistic/type';
export type StatisticProps = TdStatisticProps;

export const Statistic = withInstall(_Statistic);

export default Statistic;
