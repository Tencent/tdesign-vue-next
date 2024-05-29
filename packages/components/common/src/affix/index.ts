import { withInstall } from '@td/adapter-vue';
import type { TdAffixProps } from '@td/intel/affix/type';
import _Affix from './affix';

import './style';

export * from '@td/intel/affix/type';
export const Affix = withInstall(_Affix);
export type AffixProps = TdAffixProps;
export default Affix;
