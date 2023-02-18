import _Backtop from './back-top';
import withInstall from '../utils/withInstall';
import { TdBackTopProps } from './type';

import './style';

export * from './type';

export type BacktopProps = TdBackTopProps;

export const Backtop = withInstall(_Backtop);

export default Backtop;
