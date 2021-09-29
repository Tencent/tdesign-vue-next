import _Loading from './loading';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdLoadingProps } from './type';

import './style';

export * from './type';
export * from './plugin';
export type LoadingProps = TdLoadingProps;

export { default as LoadingPlugin } from './plugin';
export const Loading: WithInstallType<typeof _Loading> = withInstall(_Loading);
export default Loading;
