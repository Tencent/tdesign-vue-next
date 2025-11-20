import _Descriptions from './descriptions';
import _DescriptionsItem from './descriptions-item';
import { withInstall } from '@tdesign/shared-utils';
import { TdDescriptionsProps, TdDescriptionsItemProps } from './type';

import './style';

export * from './type';
export type DescriptionsProps = TdDescriptionsProps;
export type DescriptionsItemProps = TdDescriptionsItemProps;

export const Descriptions = withInstall(_Descriptions);
export const DescriptionsItem = withInstall(_DescriptionsItem);
export default Descriptions;
