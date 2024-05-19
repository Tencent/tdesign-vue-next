import _Link from './link';
import withInstall from '../utils/withInstall';
import { TdLinkProps } from '@td/intel/link/type';

import './style';

export * from '@td/intel/link/type';
export type LinkProps = TdLinkProps;

export const Link = withInstall(_Link);
export default Link;
