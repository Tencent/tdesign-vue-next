import _Affix from './affix';
import { withInstall } from '@td/adapter-utils';
import type { TdAffixProps } from '@td/intel/components/affix/type';

import './style';

export * from '@td/intel/components/affix/type';
export const Affix = withInstall(_Affix);
export type AffixProps = TdAffixProps;
export default Affix;
