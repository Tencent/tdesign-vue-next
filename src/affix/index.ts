import withInstall from '../utils/withInstall';

import _Affix from './affix';
import { TdAffixProps } from './type';

import './style';

export * from './type';
export const Affix = withInstall(_Affix);
export type AffixProps = TdAffixProps;
export default Affix;
