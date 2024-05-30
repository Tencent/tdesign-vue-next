import { withInstall } from '@td/adapter-vue';
import type { TdAffixProps } from '@td/components/affix/type';
import _Affix from './affix';

import './style';

export * from '@td/components/affix/type';
export const Affix = withInstall(_Affix);
export type AffixProps = TdAffixProps;
export default Affix;
