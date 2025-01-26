import _Statistic from './statistic';
import withInstall from '../utils/withInstall';
import { TdStatisticProps } from './type';

import './style';

export * from './type';
export type StatisticProps = TdStatisticProps;

export const Statistic = withInstall(_Statistic);

export default Statistic;
