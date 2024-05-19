import { withInstall } from '@td/adapter-utils';
import type { TdLoadingProps } from '@td/intel/loading/type';
import { vLoading } from './directive';
import _Loading from './loading';

import './style';

export * from '@td/intel/loading/type';
export * from './plugin';

export type LoadingProps = TdLoadingProps;

export { default as LoadingPlugin } from './plugin';
export { default as LoadingDirective } from './directive';

export const Loading = withInstall(_Loading, _Loading.name, { name: 'loading', comp: vLoading });
export default Loading;
