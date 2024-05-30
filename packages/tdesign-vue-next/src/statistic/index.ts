import { withInstall } from '@td/adapter-vue';
import type { TdStatisticProps } from '@td/components/statistic/type';
import _Statistic from '@td/components-common/src/statistic/statistic';

import '@td/components-common/src/statistic/style';

export * from '@td/components/statistic/type';
export type StatisticProps = TdStatisticProps;

export const Statistic = withInstall(_Statistic);

export default Statistic;
