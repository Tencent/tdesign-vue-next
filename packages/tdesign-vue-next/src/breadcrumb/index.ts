import { withInstall } from '@td/adapter-vue';
import type { TdBreadcrumbItemProps, TdBreadcrumbProps } from './type';
import _Breadcrumb from '@td/components-common/src/breadcrumb/breadcrumb';
import _BreadcrumbItem from '@td/components-common/src/breadcrumb/breadcrumb-item';

import '@td/components-common/src/breadcrumb/style';

export * from './type';
export type BreadcrumbProps = TdBreadcrumbProps;
export type BreadcrumbItemProps = TdBreadcrumbItemProps;

export const Breadcrumb = withInstall(_Breadcrumb);
export const BreadcrumbItem = withInstall(_BreadcrumbItem);

export default Breadcrumb;
