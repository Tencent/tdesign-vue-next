import { withInstall } from '@td/adapter-vue';
import type { TdBreadcrumbItemProps, TdBreadcrumbProps } from '@td/intel/breadcrumb/type';
import _Breadcrumb from './breadcrumb';
import _BreadcrumbItem from './breadcrumb-item';

import './style';

export * from '@td/intel/breadcrumb/type';
export type BreadcrumbProps = TdBreadcrumbProps;
export type BreadcrumbItemProps = TdBreadcrumbItemProps;

export const Breadcrumb = withInstall(_Breadcrumb);
export const BreadcrumbItem = withInstall(_BreadcrumbItem);

export default Breadcrumb;
