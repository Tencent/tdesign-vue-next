import { withInstall } from '@td/adapter-vue';
import type { TdCheckTagGroupProps, TdCheckTagProps, TdTagProps } from '@td/components/tag/type';
import _Tag from './tag';
import _CheckTag from './check-tag';
import _CheckTagGroup from './check-tag-group';

import './style';

export * from '@td/components/tag/type';
export type TagProps = TdTagProps;
export type CheckTagProps = TdCheckTagProps;
export type CheckTagGroupProps = TdCheckTagGroupProps;

export const Tag = withInstall(_Tag);
export const CheckTag = withInstall(_CheckTag);
export const CheckTagGroup = withInstall(_CheckTagGroup);

export default Tag;
