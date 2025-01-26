import _Breadcrumb from './breadcrumb';
import _BreadcrumbItem from './breadcrumb-item';
import withInstall from '../utils/withInstall';
import { TdBreadcrumbProps, TdBreadcrumbItemProps } from './type';

import './style';

export * from './type';
export type BreadcrumbProps = TdBreadcrumbProps;
export type BreadcrumbItemProps = TdBreadcrumbItemProps;

export const Breadcrumb = withInstall(_Breadcrumb);
export const BreadcrumbItem = withInstall(_BreadcrumbItem);

export default Breadcrumb;
