import withInstall from '../utils/withInstall';
import _BackTop from './back-top';
import { TdBackTopProps } from '@td/intel/back-top/type';

import './style';

export * from '@td/intel/back-top/type';

export type BackTopProps = TdBackTopProps;

export const BackTop = withInstall(_BackTop);

export default BackTop;
