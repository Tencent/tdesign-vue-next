import _Tag from './tag';
import _CheckTag from './check-tag';
import withInstall from '../utils/withInstall';
import { TdTagProps } from './type';

import './style';

export * from './type';
export type TagProps = TdTagProps;

export const Tag = withInstall(_Tag);
export const CheckTag = withInstall(_CheckTag);

export default Tag;
