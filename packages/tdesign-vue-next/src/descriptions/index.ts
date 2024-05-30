import { withInstall } from '@td/adapter-vue';
import type { TdDescriptionItemProps, TdDescriptionsProps } from '@td/components/descriptions/type';
import _Descriptions from '@td/components-common/src/descriptions/descriptions';
import _DescriptionsItem from '@td/components-common/src/descriptions/descriptions-item';

import '@td/components-common/src/descriptions/style';

export * from '@td/components/descriptions/type';
export type DescriptionsProps = TdDescriptionsProps;
export type DescriptionsItemProps = TdDescriptionItemProps;

export const Descriptions = withInstall(_Descriptions);
export const DescriptionsItem = withInstall(_DescriptionsItem);
export default Descriptions;
