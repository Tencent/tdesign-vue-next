import _Descriptions from './descriptions';
import _DescriptionsItem from './descriptions-item';
import { withInstall } from '@adapter/utils';
import type { TdDescriptionsProps, TdDescriptionItemProps } from '@td/intel/components/descriptions/type';

import './style';

export * from '@td/intel/components/descriptions/type';

export type DescriptionsProps = TdDescriptionsProps;
export type DescriptionsItemProps = TdDescriptionItemProps;

export const Descriptions = withInstall(_Descriptions);
export const DescriptionsItem = withInstall(_DescriptionsItem);
export default Descriptions;
