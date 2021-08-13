import _Loading from './loading';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { LoadingProps as TdLoadingProps } from './type';

export * from './type';
export type LoadingProps = TdLoadingProps;
export * from './plugin';

export { default as LoadingPlugin } from './plugin';
export const Loading: WithInstallType<typeof _Loading> = withInstall(_Loading);
export default Loading;
