import _Affix from './affix';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdAffixProps } from './type';

import './style';

export * from './type';
export const Affix: WithInstallType<typeof _Affix> = withInstall(_Affix);
export type AffixProps = TdAffixProps;
export default Affix;
