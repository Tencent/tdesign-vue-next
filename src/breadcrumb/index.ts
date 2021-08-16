import _Breadcrumb from './breadcrumb';
import _BreadcrumbItem from './breadcrumb-item';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdBreadcrumbProps, TdBreadcrumbItemProps } from './type';

export * from './type';
export type BreadcrumbProps = TdBreadcrumbProps;
export type BreadcrumbItemProps = TdBreadcrumbItemProps;

export const Breadcrumb: WithInstallType<typeof _Breadcrumb> = withInstall(_Breadcrumb);
export const BreadcrumbItem: WithInstallType<typeof _BreadcrumbItem> = withInstall(_BreadcrumbItem);

export default Breadcrumb;
