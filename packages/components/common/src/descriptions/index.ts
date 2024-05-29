import { withInstall } from '@td/adapter-vue';
import type { TdDescriptionItemProps, TdDescriptionsProps } from '@td/components/descriptions/type';
import _Descriptions from './descriptions';
import _DescriptionsItem from './descriptions-item';

import './style';

export * from '@td/components/descriptions/type';
export type DescriptionsProps = TdDescriptionsProps;
export type DescriptionsItemProps = TdDescriptionItemProps;

export const Descriptions = withInstall(_Descriptions);
export const DescriptionsItem = withInstall(_DescriptionsItem);
export default Descriptions;
