import { withInstall } from '@td/adapter-vue';
import type { TdBreadcrumbItemProps, TdBreadcrumbProps } from '@td/components/breadcrumb/type';
import _Breadcrumb from './breadcrumb';
import _BreadcrumbItem from './breadcrumb-item';

import './style';

export * from '@td/components/breadcrumb/type';
export type BreadcrumbProps = TdBreadcrumbProps;
export type BreadcrumbItemProps = TdBreadcrumbItemProps;

export const Breadcrumb = withInstall(_Breadcrumb);
export const BreadcrumbItem = withInstall(_BreadcrumbItem);

export default Breadcrumb;
