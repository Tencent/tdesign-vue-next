import withInstall from '../utils/withInstall';

import _Link from './link';
import { TdLinkProps } from './type';

import './style';

export * from './type';
export type LinkProps = TdLinkProps;

export const Link = withInstall(_Link);
export default Link;
