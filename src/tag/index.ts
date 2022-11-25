import _Tag from './tag';
import _CheckTag from './check-tag';
import withInstall from '../utils/withInstall';
import { TdTagProps, TdCheckTagProps } from './type';

import './style';

export * from './type';
export type TagProps = TdTagProps;
export type CheckTagProps = TdCheckTagProps;

export const Tag = withInstall(_Tag);
export const CheckTag = withInstall(_CheckTag);

export default Tag;
