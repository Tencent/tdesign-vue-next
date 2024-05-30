import { withInstall } from '@td/adapter-vue';
import type { TdLinkProps } from '@td/components/link/type';
import _Link from './link';

import './style';

export * from '@td/components/link/type';
export type LinkProps = TdLinkProps;

export const Link = withInstall(_Link);
export default Link;
