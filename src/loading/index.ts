import { vLoading } from './directive';
import _Loading from './loading';
import withInstall from '../utils/withInstall';
import { TdLoadingProps } from './type';

import './style';

export * from './type';
export * from './plugin';
export type LoadingProps = TdLoadingProps;

export { default as LoadingPlugin } from './plugin';
export const Loading = withInstall(_Loading, _Loading.name, { name: 'loading', comp: vLoading });
export default Loading;
