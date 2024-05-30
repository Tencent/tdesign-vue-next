import { withInstall } from '@td/adapter-vue';
import type { TdBackTopProps } from './type';
import _BackTop from '@td/components-common/src/back-top/back-top';

import '@td/components-common/src/back-top/style';

export * from './type';

export type BackTopProps = TdBackTopProps;

export const BackTop = withInstall(_BackTop);

export default BackTop;
