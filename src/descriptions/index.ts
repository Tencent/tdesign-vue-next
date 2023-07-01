import _Descriptions from './descriptions';
import _DescriptionsItem from './descriptionsItem';
import withInstall from '../utils/withInstall';
import { TdDescriptionsProps, TdDescriptionItemProps } from './type';

import './style';

export * from './type';
export type DescriptionsProps = TdDescriptionsProps;
export type DescriptionItemProps = TdDescriptionItemProps;

export const DescriptionsItem = withInstall(_DescriptionsItem);

export const Descriptions = withInstall(_Descriptions);
export default Descriptions;
