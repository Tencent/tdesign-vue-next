import { withInstall } from '@td/adapter-utils';
import type { TdStatisticProps } from '@td/intel/statistic/type';
import _Statistic from './statistic';

import './style';

export * from '@td/intel/statistic/type';
export type StatisticProps = TdStatisticProps;

export const Statistic = withInstall(_Statistic);

export default Statistic;
