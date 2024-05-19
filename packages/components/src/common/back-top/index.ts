import { withInstall } from '@td/adapter-utils';
import _BackTop from './back-top';
import type { TdBackTopProps } from '@td/intel/components/back-top/type';

import './style';

export * from '@td/intel/components/back-top/type';

export type BackTopProps = TdBackTopProps;

export const BackTop = withInstall(_BackTop);

export default BackTop;
