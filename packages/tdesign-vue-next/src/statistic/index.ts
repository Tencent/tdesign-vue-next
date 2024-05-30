import { withInstall } from '@td/adapter-vue';
import type { TdStatisticProps } from './type';
import _Statistic from '@td/components-common/src/statistic/statistic';

import '@td/components-common/src/statistic/style';

export * from './type';
export type StatisticProps = TdStatisticProps;

export const Statistic = withInstall(_Statistic);

export default Statistic;
