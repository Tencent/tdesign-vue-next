import _Breadcrumb from './breadcrumb';
import _BreadcrumbItem from './breadcrumb-item';
import { withInstall } from '@td/adapter-utils';
import type { TdBreadcrumbProps, TdBreadcrumbItemProps } from '@td/intel/components/breadcrumb/type';

import './style';

export * from '@td/intel/components/breadcrumb/type';
export type BreadcrumbProps = TdBreadcrumbProps;
export type BreadcrumbItemProps = TdBreadcrumbItemProps;

export const Breadcrumb = withInstall(_Breadcrumb);
export const BreadcrumbItem = withInstall(_BreadcrumbItem);

export default Breadcrumb;
