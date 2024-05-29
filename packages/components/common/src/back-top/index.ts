import { withInstall } from '@td/adapter-vue';
import type { TdBackTopProps } from '@td/intel/back-top/type';
import _BackTop from './back-top';

import './style';

export * from '@td/intel/back-top/type';

export type BackTopProps = TdBackTopProps;

export const BackTop = withInstall(_BackTop);

export default BackTop;
