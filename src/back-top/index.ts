import _BackTop from './back-top';
import withInstall from '../utils/withInstall';
import { TdBackTopProps } from './type';

import './style';

export * from './type';
export type BackTopProps = TdBackTopProps;

export const BackTop = withInstall(_BackTop);
export default BackTop;
