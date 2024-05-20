import { withInstall } from '@td/adapter-utils';
import type { TdDescriptionItemProps, TdDescriptionsProps } from '@td/intel/descriptions/type';
import _Descriptions from './descriptions';
import _DescriptionsItem from './descriptions-item';

import './style';

export * from '@td/intel/descriptions/type';
export type DescriptionsProps = TdDescriptionsProps;
export type DescriptionsItemProps = TdDescriptionItemProps;

export const Descriptions = withInstall(_Descriptions);
export const DescriptionsItem = withInstall(_DescriptionsItem);
export default Descriptions;
