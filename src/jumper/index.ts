import _Jumper from './jumper';
import withInstall from '../utils/withInstall';
import { TdJumperProps } from './type';

import './style';

export * from './type';
export type JumperProps = TdJumperProps;

export const Jumper = withInstall(_Jumper);

export default Jumper;
