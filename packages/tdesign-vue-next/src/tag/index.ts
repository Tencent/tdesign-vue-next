import { withInstall } from '@td/adapter-vue';
import _Tag from '@td/components-common/src/tag/tag';
import _CheckTag from '@td/components-common/src/tag/check-tag';
import _CheckTagGroup from '@td/components-common/src/tag/check-tag-group';
import type { TdCheckTagGroupProps, TdCheckTagProps, TdTagProps } from './type';

import '@td/components-common/src/tag/style';

export * from './type';
export type TagProps = TdTagProps;
export type CheckTagProps = TdCheckTagProps;
export type CheckTagGroupProps = TdCheckTagGroupProps;

export const Tag = withInstall(_Tag);
export const CheckTag = withInstall(_CheckTag);
export const CheckTagGroup = withInstall(_CheckTagGroup);

export default Tag;
