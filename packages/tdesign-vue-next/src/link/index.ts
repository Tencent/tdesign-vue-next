import { withInstall } from '@td/adapter-vue';
import type { TdLinkProps } from '@td/components/link/type';
import _Link from '@td/components-common/src/link/link';

import '@td/components-common/src/link/style';

export * from '@td/components/link/type';
export type LinkProps = TdLinkProps;

export const Link = withInstall(_Link);
export default Link;
