import { withInstall } from '@tdesign/shared-utils';
import _BackTop from './back-top';
import { TdBackTopProps } from './type';

import './style';

export * from './type';

export type BackTopProps = TdBackTopProps;

export const BackTop = withInstall(_BackTop);

export default BackTop;
