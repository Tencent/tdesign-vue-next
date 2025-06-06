import _Affix from './affix';
import { withInstall } from '@tdesign/shared-utils';
import { TdAffixProps } from './type';

import './style';

export * from './type';
export const Affix = withInstall(_Affix);
export type AffixProps = TdAffixProps;
export default Affix;
