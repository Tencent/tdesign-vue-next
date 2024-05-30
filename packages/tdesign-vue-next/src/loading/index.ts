import { withInstall } from '@td/adapter-vue';
import { vLoading } from '@td/components-common/src/loading/directive';
import _Loading from '@td/components-common/src/loading/loading';
import type { TdLoadingProps } from './type';

import '@td/components-common/src/loading/style';

export * from './type';
export * from '@td/components-common/src/loading/plugin';

export type LoadingProps = TdLoadingProps;

export { default as LoadingPlugin } from '@td/components-common/src/loading/plugin';
export { default as LoadingDirective } from '@td/components-common/src/loading/directive';

export const Loading = withInstall(_Loading, _Loading.name, { name: 'loading', comp: vLoading });
export default Loading;
