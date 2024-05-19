import _Affix from './affix';
import { withInstall } from '@td/adapter-utils';
import { TdAffixProps } from '@td/intel/affix/type';

import './style';

export * from '@td/intel/affix/type';
export const Affix = withInstall(_Affix);
export type AffixProps = TdAffixProps;
export default Affix;
