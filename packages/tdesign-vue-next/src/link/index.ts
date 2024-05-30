import { withInstall } from '@td/adapter-vue';
import _Link from '@td/components-common/src/link/link';
import type { TdLinkProps } from './type';

import '@td/components-common/src/link/style';

export * from './type';
export type LinkProps = TdLinkProps;

export const Link = withInstall(_Link);
export default Link;
