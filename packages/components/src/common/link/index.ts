import _Link from './link';
import { withInstall } from '@td/adapter-utils';
import type { TdLinkProps } from '@td/intel/components/link/type';

import './style';

export * from '@td/intel/components/link/type';
export type LinkProps = TdLinkProps;

export const Link = withInstall(_Link);
export default Link;
