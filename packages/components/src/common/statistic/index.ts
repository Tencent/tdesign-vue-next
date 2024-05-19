import _Statistic from './statistic';
import { withInstall } from '@td/adapter-utils';
import type { TdStatisticProps } from '@td/intel/components/statistic/type';

import './style';

export * from '@td/intel/components/statistic/type';
export type StatisticProps = TdStatisticProps;

export const Statistic = withInstall(_Statistic);

export default Statistic;
